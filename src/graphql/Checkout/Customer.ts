import { gql } from "@apollo/client";

import { CheckoutFragment, TCheckoutDefaultResponse } from "./interface";

// _____________________ CHECKOUT EMAIL UPDATE _________________________
export type TCheckoutEmailUpdateVariable = {
    checkoutId: string;
    email: string;
};

export type TCheckoutEmailUpdateResponse = {
    checkoutEmailUpdateV2: TCheckoutDefaultResponse;
};

export const CHECKOUT_EMAIL_UPDATE = gql`
    mutation CheckoutEmailUpdateV2($checkoutId: ID!, $email: String!) {
        checkoutEmailUpdateV2(checkoutId: $checkoutId, email: $email) {
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

// _______________________ CHECKOUT CUSTOMER ASSOCIATE _________________________
export type TCheckoutCustomerAssociateVariable = {
    checkoutId: string;
    customerAccessToken: string;
};

export type TCheckoutCustomerAssociateResponse = {
    checkoutCustomerAssociateV2: TCheckoutDefaultResponse;
};

export const CHECKOUT_CUSTOMER_ASSOCIATE = gql`
    mutation CheckoutCustomerAssociateV2(
        $checkoutId: ID!
        $customerAccessToken: String!
    ) {
        checkoutCustomerAssociateV2(
            checkoutId: $checkoutId
            customerAccessToken: $customerAccessToken
        ) {
            checkoutUserErrors {
                field
                message
            }
            checkout {
                ...CheckoutFragment
            }
            customer {
                id
            }
        }
    }
    ${CheckoutFragment}
`;

// _______________________ CHECKOUT CUSTOMER DISASSOCIATE _________________________
export type TCheckoutCustomerDisassociateVariable = {
    checkoutId: string;
};

export type TCheckoutCustomerDisassociateResponse = {
    checkoutCustomerDisassociateV2: TCheckoutDefaultResponse;
};

export const CHECKOUT_CUSTOMER_DISASSOCIATE = gql`
    mutation CheckoutCustomerDisassociateV2($checkoutId: ID!) {
        checkoutCustomerDisassociateV2(checkoutId: $checkoutId) {
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
