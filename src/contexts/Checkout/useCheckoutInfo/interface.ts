import { ApolloError } from "@apollo/client";

import { TCheckout } from "../interface";

import { TCheckoutDefaultResponse } from "../../../graphql/Checkout/interface";
import {
    TCheckoutAttributesUpdateVariable,
    TCheckoutDiscountCodeApplyVariable,
} from "../../../graphql/Checkout/Info";

export type TUseCheckoutInfoProps = {
    checkoutInfo?: TCheckout;
    onCompleted: (data: Record<string, TCheckoutDefaultResponse>) => void;
};

export type TUseCheckoutInfoResponse = {
    loading: {
        attributesUpdateLoading: boolean;
        discountCodeApplyLoading: boolean;
        discountCodeRemoveLoading: boolean;
    };
    error: {
        attributesUpdateError?: ApolloError;
        discountCodeApplyError?: ApolloError;
        discountCodeRemoveError?: ApolloError;
    };
    discountCodeApplied?: string[];
    applyDiscount: (
        discountCode: TCheckoutDiscountCodeApplyVariable["discountCode"],
    ) => Promise<void>;
    removeDiscount: () => Promise<void>;
    updateAttributes: (
        input: Omit<
            TCheckoutAttributesUpdateVariable["input"],
            "customAttributes"
        > & { customAttributes?: TCheckout["customAttributes"] },
    ) => Promise<void>;
};
