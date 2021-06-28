import { ApolloError } from "@apollo/client";

import { TCheckout } from "../interface";

import { TCheckoutDefaultResponse } from "../../../graphql/Checkout/interface";
import { TLineItemInput } from "../../../graphql/Checkout/LineItems";

export type TUseCheckoutLineItemsProps = {
    checkoutInfo?: TCheckout;
    onCompleted: (data: Record<string, TCheckoutDefaultResponse>) => void;
};

export type TUseCheckoutLineItemsResponse = {
    loading: {
        lineItemsAddLoading: boolean;
        lineItemsUpdateLoading: boolean;
        lineItemsRemoveLoading: boolean;
    };
    error: {
        lineItemsAddError?: ApolloError;
        lineItemsUpdateError?: ApolloError;
        lineItemsRemoveError?: ApolloError;
    };
    addLineItems: (lineItems: TLineItemInput[]) => Promise<void>;
    updateLineItems: (
        lineItems: (Partial<TLineItemInput> & { id: string })[],
    ) => Promise<void>;
    removeLineItems: (lineItemIds: string[]) => Promise<void>;
};
