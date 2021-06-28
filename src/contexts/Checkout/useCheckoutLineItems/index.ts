import { useMutation } from "@apollo/client";

import {
    TUseCheckoutLineItemsProps,
    TUseCheckoutLineItemsResponse,
} from "./interface";

import * as Graphql from "../../../graphql/Checkout/LineItems";

export default function useCheckoutLineItems({
    checkoutInfo,
    onCompleted,
}: TUseCheckoutLineItemsProps): TUseCheckoutLineItemsResponse {
    const [createCheckout, createCheckoutResult] = useMutation<
        Graphql.TCreateCheckoutResponse,
        Graphql.TCreateCheckoutVariables
    >(Graphql.CREATE_CHECKOUT, { fetchPolicy: "no-cache", onCompleted });

    const [lineItemsAdd, lineItemsAddResult] = useMutation<
        Graphql.TCheckoutLineItemsAddResponse,
        Graphql.TCheckoutLineItemsAddVariable
    >(Graphql.CHECKOUT_LINE_ITEMS_ADD, {
        fetchPolicy: "no-cache",
        onCompleted,
    });

    const [lineItemsUpdate, lineItemsUpdateResult] = useMutation<
        Graphql.TCheckoutLineItemsUpdateResponse,
        Graphql.TCheckoutLineItemsUpdateVariable
    >(Graphql.CHECKOUT_LINE_ITEMS_UPDATE, {
        fetchPolicy: "no-cache",
        onCompleted,
    });

    const [lineItemsRemove, lineItemsRemoveResult] = useMutation<
        Graphql.TCheckoutLineItemsRemoveResponse,
        Graphql.TCheckoutLineItemsRemoveVariables
    >(Graphql.CHECKOUT_LINE_ITEMS_REMOVE, {
        fetchPolicy: "no-cache",
        onCompleted,
    });

    const addLineItems: TUseCheckoutLineItemsResponse["addLineItems"] = async (
        lineItems,
    ) => {
        try {
            if (!checkoutInfo) {
                await createCheckout({
                    variables: {
                        input: {
                            lineItems,
                        },
                    },
                });
                return;
            }
            await lineItemsAdd({
                variables: {
                    checkoutId: checkoutInfo.id,
                    lineItems,
                },
            });
        } catch {
            //
        }
    };

    const updateLineItems: TUseCheckoutLineItemsResponse["updateLineItems"] = async (
        lineItems,
    ) => {
        try {
            if (checkoutInfo) {
                await lineItemsUpdate({
                    variables: {
                        checkoutId: checkoutInfo.id,
                        lineItems,
                    },
                });
            }
        } catch {
            //
        }
    };

    const removeLineItems: TUseCheckoutLineItemsResponse["removeLineItems"] = async (
        lineItemIds,
    ) => {
        try {
            if (checkoutInfo) {
                await lineItemsRemove({
                    variables: {
                        checkoutId: checkoutInfo.id,
                        lineItemIds,
                    },
                });
            }
        } catch {
            //
        }
    };

    return {
        loading: {
            lineItemsAddLoading:
                createCheckoutResult.loading || lineItemsAddResult.loading,
            lineItemsRemoveLoading: lineItemsRemoveResult.loading,
            lineItemsUpdateLoading: lineItemsUpdateResult.loading,
        },
        error: {
            lineItemsAddError:
                createCheckoutResult.error || lineItemsAddResult.error,
            lineItemsRemoveError: lineItemsRemoveResult.error,
            lineItemsUpdateError: lineItemsUpdateResult.error,
        },
        addLineItems,
        removeLineItems,
        updateLineItems,
    };
}
