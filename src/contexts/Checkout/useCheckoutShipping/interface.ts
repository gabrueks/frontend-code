import { Dispatch, SetStateAction } from "react";
import { ApolloError } from "@apollo/client";

import { TCheckout } from "../interface";

import { TCheckoutDefaultResponse } from "../../../graphql/Checkout/interface";
import {
    TCheckoutShippingAddressUpdateVariable,
    TCheckoutShippingLineUpdateVariable,
} from "../../../graphql/Checkout/Shipping";

export type TUseCheckoutShippingProps = {
    checkoutInfo?: TCheckout;
    onCompleted: (data: Record<string, TCheckoutDefaultResponse>) => void;
};

export type TUseCheckoutShippingResponse = {
    loading: {
        availableShippingRatesLoading: boolean;
        shippingAddressUpdateLoading: boolean;
        shippingLineUpdateLoading: boolean;
    };
    error: {
        availableShippingRatesError?: ApolloError;
        shippingAddressUpdateError?: ApolloError;
        shippingLineUpdateError?: ApolloError;
    };
    availableShippingRates?: {
        handle: string;
        price: string;
        title: string;
    }[];
    shippingRatePreview?: string;
    shippingLine?: {
        handle: string;
        price: string;
        title: string;
    };
    fetchAvailableShippingRates: () => Promise<void>;
    setShippingRatePreview: Dispatch<SetStateAction<string | undefined>>;
    updateShippingAddress: (
        newAddress: TCheckoutShippingAddressUpdateVariable["shippingAddress"],
    ) => Promise<void>;
    updateShippingLine: (
        shippingRateHandle: TCheckoutShippingLineUpdateVariable["shippingRateHandle"],
    ) => Promise<void>;
};
