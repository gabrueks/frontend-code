import { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";

import {
    TUseCheckoutShippingProps,
    TUseCheckoutShippingResponse,
} from "./interface";

import * as Graphql from "../../../graphql/Checkout/Shipping";

import { Cookies } from "../interface";

import { useCookiesContext } from "../../Cookies";

const mockedAvailableShippingRates = {
    node: {
        __typename: "Checkout",
        availableShippingRates: {
            __typename: "AvailableShippingRates",
            shippingRates: [
                {
                    __typename: "ShippingRate",
                    handle: "shopify-Entrega%20Local-0.00",
                    priceV2: {
                        __typename: "MoneyV2",
                        amount: "0.0",
                    },
                    title: "Entrega Local",
                },
            ],
        },
    },
};

export default function useCheckoutLineItems({
    checkoutInfo,
    onCompleted,
}: TUseCheckoutShippingProps): TUseCheckoutShippingResponse {
    const { cookies, setCookies } = useCookiesContext();
    const { shippingLine }: Cookies = cookies;

    const [shippingRatePreview, setShippingRatePreview] = useState<string>();

    const [
        availableShippingRates,
        availableShippingRatesResults,
    ] = useLazyQuery<
        Graphql.TCheckoutAvailableShippingRatesResponse,
        Graphql.TCheckoutAvailableShippingRatesVariable
    >(Graphql.CHECKOUT_AVAILABLE_SHIPPING_RATES);

    const [shippingAddressUpdate, shippingAddressUpdateResult] = useMutation<
        Graphql.TCheckoutShippingAddressUpdateResponse,
        Graphql.TCheckoutShippingAddressUpdateVariable
    >(Graphql.CHECKOUT_SHIPPING_ADDRESS_UPDATE, {
        fetchPolicy: "no-cache",
        onCompleted,
    });

    const [shippingLineUpdate, shippingLineUpdateResult] = useMutation<
        Graphql.TCheckoutShippingLineUpdateResponse,
        Graphql.TCheckoutShippingLineUpdateVariable
    >(Graphql.CHECKOUT_SHIPPING_LINE_UPDATE, {
        fetchPolicy: "no-cache",
        onCompleted: (data) => {
            setShippingRatePreview(undefined);
            onCompleted(data);
        },
    });

    const fetchAvailableShippingRates: TUseCheckoutShippingResponse["fetchAvailableShippingRates"] = async () => {
        try {
            if (checkoutInfo) {
                await availableShippingRates({
                    variables: {
                        checkoutId: checkoutInfo.id,
                    },
                });
            }
        } catch {
            //
        }
    };

    const updateShippingAddress: TUseCheckoutShippingResponse["updateShippingAddress"] = async (
        newAddress,
    ) => {
        try {
            if (checkoutInfo) {
                await shippingAddressUpdate({
                    variables: {
                        checkoutId: checkoutInfo.id,
                        shippingAddress: newAddress,
                    },
                });
            }
        } catch {
            //
        }
    };

    const updateShippingLine: TUseCheckoutShippingResponse["updateShippingLine"] = async (
        shippingRateHandle,
    ) => {
        try {
            const temp = mockedAvailableShippingRates.node.availableShippingRates.shippingRates.find(
                (sprt) => sprt.handle === shippingRateHandle,
            );
            if (temp) {
                setCookies(
                    "shippingLine",
                    {
                        handle: temp.handle,
                        price: temp.priceV2.amount,
                        title: temp.title,
                    },
                    { path: "/" },
                );
            }
            // if (checkoutInfo) {
            //     await shippingLineUpdate({
            //         variables: {
            //             checkoutId: checkoutInfo.id,
            //             shippingRateHandle,
            //         },
            //     });
            // }
        } catch {
            //
        }
    };

    const parseAvailableShippingRates = (): TUseCheckoutShippingResponse["availableShippingRates"] => {
        return (
            mockedAvailableShippingRates &&
            mockedAvailableShippingRates.node.availableShippingRates.shippingRates.map(
                (sprt) => ({
                    handle: sprt.handle,
                    price: sprt.priceV2.amount,
                    title: sprt.title,
                }),
            )
        );
        // return (
        //     availableShippingRatesResults.data &&
        //     availableShippingRatesResults.data.node.availableShippingRates.shippingRates.map(
        //         (sprt) => ({
        //             handle: sprt.handle,
        //             price: sprt.priceV2.amount,
        //             title: sprt.title,
        //         }),
        //     )
        // );
    };

    return {
        loading: {
            availableShippingRatesLoading:
                availableShippingRatesResults.loading,
            shippingAddressUpdateLoading: shippingAddressUpdateResult.loading,
            shippingLineUpdateLoading: shippingLineUpdateResult.loading,
        },
        error: {
            availableShippingRatesError: availableShippingRatesResults.error,
            shippingAddressUpdateError: shippingAddressUpdateResult.error,
            shippingLineUpdateError: shippingLineUpdateResult.error,
        },
        availableShippingRates: parseAvailableShippingRates(),
        shippingRatePreview,
        shippingLine,
        fetchAvailableShippingRates,
        setShippingRatePreview,
        updateShippingAddress,
        updateShippingLine,
    };
}
