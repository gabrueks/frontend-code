import { useRef } from "react";
import { useMutation } from "@apollo/client";

import { TUseCheckoutInfoProps, TUseCheckoutInfoResponse } from "./interface";

import { Cookies } from "../interface";

import { useCookiesContext } from "../../Cookies";

import { TAttributeInput } from "../../../graphql/Checkout/interface";
import * as Graphql from "../../../graphql/Checkout/Info";

export default function useCheckoutLineItems({
    checkoutInfo,
    onCompleted,
}: TUseCheckoutInfoProps): TUseCheckoutInfoResponse {
    const { cookies, setCookies, removeCookie } = useCookiesContext();
    const { discountCodeApplied }: Cookies = cookies;

    const tempDiscountCode = useRef("");

    const [attributesUpdate, attributesUpdateResult] = useMutation<
        Graphql.TCheckoutAttributesUpdateResponse,
        Graphql.TCheckoutAttributesUpdateVariable
    >(Graphql.CHECKOUT_ATTRIBUTES_UPDATE, {
        fetchPolicy: "no-cache",
        onCompleted,
    });

    const [discountCodeApply, discountCodeApplyResult] = useMutation<
        Graphql.TCheckoutDiscountCodeApplyResponse,
        Graphql.TCheckoutDiscountCodeApplyVariable
    >(Graphql.CHECKOUT_DISCOUNT_CODE_APPLY, {
        fetchPolicy: "no-cache",
        onCompleted: (data) => {
            onCompleted(data);
            if (!data.checkoutDiscountCodeApplyV2.checkoutUserErrors.length) {
                setCookies("discountCodeApplied", [tempDiscountCode.current], {
                    path: "/",
                });
            }
        },
    });

    const [discountCodeRemove, discountCodeRemoveResult] = useMutation<
        Graphql.TCheckoutDiscountCodeRemoveResponse,
        Graphql.TCheckoutDiscountCodeRemoveVariable
    >(Graphql.CHECKOUT_DISCOUNT_CODE_REMOVE, {
        fetchPolicy: "no-cache",
        onCompleted: (data) => {
            onCompleted(data);
            if (!data.checkoutDiscountCodeRemove.checkoutUserErrors.length) {
                tempDiscountCode.current = "";
                removeCookie("discountCodeApplied", {
                    path: "/",
                });
            }
        },
    });

    const updateAttributes: TUseCheckoutInfoResponse["updateAttributes"] = async (
        input,
    ) => {
        try {
            if (checkoutInfo) {
                const newCustomAttributes = {
                    ...checkoutInfo.customAttributes,
                    ...(input.customAttributes ?? {}),
                };
                const temp = Object.entries(newCustomAttributes)
                    .map(([key, value]) => ({
                        key,
                        value,
                    }))
                    .filter((attr) => attr.value) as TAttributeInput[];
                await attributesUpdate({
                    variables: {
                        checkoutId: checkoutInfo.id,
                        input: {
                            ...input,
                            customAttributes: temp,
                        },
                    },
                });
            }
        } catch {
            //
        }
    };

    const applyDiscount: TUseCheckoutInfoResponse["applyDiscount"] = async (
        discountCode,
    ) => {
        try {
            if (checkoutInfo) {
                tempDiscountCode.current = discountCode;
                await discountCodeApply({
                    variables: {
                        checkoutId: checkoutInfo.id,
                        discountCode,
                    },
                });
            }
        } catch {
            //
        }
    };

    const removeDiscount: TUseCheckoutInfoResponse["removeDiscount"] = async () => {
        try {
            if (checkoutInfo) {
                await discountCodeRemove({
                    variables: {
                        checkoutId: checkoutInfo.id,
                    },
                });
            }
        } catch {
            //
        }
    };

    return {
        loading: {
            attributesUpdateLoading: attributesUpdateResult.loading,
            discountCodeApplyLoading: discountCodeApplyResult.loading,
            discountCodeRemoveLoading: discountCodeRemoveResult.loading,
        },
        error: {
            attributesUpdateError: attributesUpdateResult.error,
            discountCodeApplyError: discountCodeApplyResult.error,
            discountCodeRemoveError: discountCodeRemoveResult.error,
        },
        discountCodeApplied,
        applyDiscount,
        removeDiscount,
        updateAttributes,
    };
}
