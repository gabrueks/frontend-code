import { gql } from "@apollo/client";

import {
    CheckoutFragment,
    TAttributeInput,
    TCheckoutDefaultResponse,
} from "./interface";

// _______________________ CHECKOUT ATTRIBUTES UPDATE _________________________
export type TCheckoutAttributesUpdateVariable = {
    checkoutId: string;
    input: {
        allowPartialAddresses?: boolean;
        customAttributes?: TAttributeInput[];
        note?: string;
    };
};

export type TCheckoutAttributesUpdateResponse = {
    checkoutAttributesUpdateV2: TCheckoutDefaultResponse;
};

export const CHECKOUT_ATTRIBUTES_UPDATE = gql`
    mutation CheckoutAttributesUpdateV2(
        $checkoutId: ID!
        $input: CheckoutAttributesUpdateV2Input!
    ) {
        checkoutAttributesUpdateV2(checkoutId: $checkoutId, input: $input) {
            checkoutUserErrors {
                field
                message
            }
            checkout {
                ...CheckoutFragment
            }
        }
    }
    ${CheckoutFragment}
`;

// _____________________ CHECKOUT DISCOUNT CODE APPLY _________________________
export type TCheckoutDiscountCodeApplyVariable = {
    checkoutId: string;
    discountCode: string;
};

export type TCheckoutDiscountCodeApplyResponse = {
    checkoutDiscountCodeApplyV2: TCheckoutDefaultResponse;
};

export const CHECKOUT_DISCOUNT_CODE_APPLY = gql`
    mutation CheckoutDiscountCodeApplyV2(
        $discountCode: String!
        $checkoutId: ID!
    ) {
        checkoutDiscountCodeApplyV2(
            discountCode: $discountCode
            checkoutId: $checkoutId
        ) {
            checkoutUserErrors {
                field
                message
            }
            checkout {
                ...CheckoutFragment
            }
        }
    }
    ${CheckoutFragment}
`;

// _____________________ CHECKOUT DISCOUNT CODE REMOVE _________________________
export type TCheckoutDiscountCodeRemoveVariable = {
    checkoutId: string;
};

export type TCheckoutDiscountCodeRemoveResponse = {
    checkoutDiscountCodeRemove: TCheckoutDefaultResponse;
};

export const CHECKOUT_DISCOUNT_CODE_REMOVE = gql`
    mutation CheckoutDiscountCodeRemove($checkoutId: ID!) {
        checkoutDiscountCodeRemove(checkoutId: $checkoutId) {
            checkoutUserErrors {
                field
                message
            }
            checkout {
                ...CheckoutFragment
            }
        }
    }
    ${CheckoutFragment}
`;
