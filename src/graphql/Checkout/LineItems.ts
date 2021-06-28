import { gql } from "@apollo/client";

import {
    CheckoutFragment,
    TAttributeInput,
    TCheckoutDefaultResponse,
} from "./interface";

import { Address } from "../../contexts/AccountAddress/interface";

// _______________________ CREATE CHECKOUT _________________________

export type TLineItemInput = {
    customAttributes?: TAttributeInput[];
    quantity: number;
    variantId: string;
};

export type TCreateCheckoutVariables = {
    input: {
        allowPartialAddresses?: boolean;
        customAttributes?: TAttributeInput[];
        email?: string;
        lineItems?: TLineItemInput[];
        note?: string;
        presentmentCurrencyCode?: "BRL";
        shippingAddress?: Address;
    };
};

export type TCreateCheckoutResponse = {
    checkoutCreate: TCheckoutDefaultResponse;
};

export const CREATE_CHECKOUT = gql`
    mutation CheckoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
            checkoutUserErrors {
                message
                field
            }
            checkout {
                ...CheckoutFragment
            }
        }
    }
    ${CheckoutFragment}
`;

// _______________________ CHECKOUT LINE ITEMS ADD _________________________
export type TCheckoutLineItemsAddVariable = {
    checkoutId: string;
    lineItems: TLineItemInput[];
};

export type TCheckoutLineItemsAddResponse = {
    checkoutLineItemsAdd: TCheckoutDefaultResponse;
};

export const CHECKOUT_LINE_ITEMS_ADD = gql`
    mutation CheckoutLineItemsAdd(
        $checkoutId: ID!
        $lineItems: [CheckoutLineItemInput!]!
    ) {
        checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
            checkoutUserErrors {
                message
                field
            }
            checkout {
                ...CheckoutFragment
            }
        }
    }
    ${CheckoutFragment}
`;

// ______________________ CHECKOUT LINE ITEMS UPDATE ________________________
export type TCheckoutLineItemsUpdateVariable = {
    checkoutId: string;
    lineItems: (Partial<TLineItemInput> & { id: string })[];
};

export type TCheckoutLineItemsUpdateResponse = {
    checkoutLineItemsUpdate: TCheckoutDefaultResponse;
};

export const CHECKOUT_LINE_ITEMS_UPDATE = gql`
    mutation CheckoutLineItemsUpdate(
        $checkoutId: ID!
        $lineItems: [CheckoutLineItemUpdateInput!]!
    ) {
        checkoutLineItemsUpdate(
            checkoutId: $checkoutId
            lineItems: $lineItems
        ) {
            checkoutUserErrors {
                message
                field
            }
            checkout {
                ...CheckoutFragment
            }
        }
    }
    ${CheckoutFragment}
`;

// ______________________ CHECKOUT LINE ITEMS REMOVE ________________________
export type TCheckoutLineItemsRemoveVariables = {
    checkoutId: string;
    lineItemIds: string[];
};

export type TCheckoutLineItemsRemoveResponse = {
    checkoutLineItemsRemove: TCheckoutDefaultResponse;
};

export const CHECKOUT_LINE_ITEMS_REMOVE = gql`
    mutation CheckoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
        checkoutLineItemsRemove(
            checkoutId: $checkoutId
            lineItemIds: $lineItemIds
        ) {
            checkoutUserErrors {
                message
                field
            }
            checkout {
                ...CheckoutFragment
            }
        }
    }
    ${CheckoutFragment}
`;
