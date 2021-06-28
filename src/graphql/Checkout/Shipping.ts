import { gql } from "@apollo/client";

import { CheckoutFragment, TCheckoutDefaultResponse } from "./interface";

import { Address } from "../../contexts/AccountAddress/interface";

// _____________________ CHECKOUT AVAILABLE SHIPPING RATES _________________________
export type TCheckoutAvailableShippingRatesVariable = {
    checkoutId: string;
};

export type TCheckoutAvailableShippingRatesResponse = {
    node: {
        availableShippingRates: {
            shippingRates: {
                handle: string;
                priceV2: {
                    amount: string;
                };
                title: string;
            }[];
        };
    };
};

export const CHECKOUT_AVAILABLE_SHIPPING_RATES = gql`
    query CheckoutAvailableShippingRates($checkoutId: ID!) {
        node(id: $checkoutId) {
            ... on Checkout {
                availableShippingRates {
                    shippingRates {
                        handle
                        priceV2 {
                            amount
                        }
                        title
                    }
                }
            }
        }
    }
`;

// _____________________ CHECKOUT SHIPPING ADDRESS UPDATE _________________________
export type TCheckoutShippingAddressUpdateVariable = {
    checkoutId: string;
    shippingAddress: Partial<
        Pick<
            Address,
            | "address1"
            | "address2"
            | "city"
            | "company"
            | "country"
            | "firstName"
            | "lastName"
            | "phone"
            | "province"
            | "zip"
        >
    >;
};

export type TCheckoutShippingAddressUpdateResponse = {
    checkoutShippingAddressUpdateV2: TCheckoutDefaultResponse;
};

export const CHECKOUT_SHIPPING_ADDRESS_UPDATE = gql`
    mutation CheckoutShippingAddressUpdateV2(
        $shippingAddress: MailingAddressInput!
        $checkoutId: ID!
    ) {
        checkoutShippingAddressUpdateV2(
            shippingAddress: $shippingAddress
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

// _____________________ CHECKOUT SHIPPING LINE UPDATE _________________________
export type TCheckoutShippingLineUpdateVariable = {
    checkoutId: string;
    shippingRateHandle: string;
};

export type TCheckoutShippingLineUpdateResponse = {
    checkoutShippingLineUpdate: TCheckoutDefaultResponse;
};

export const CHECKOUT_SHIPPING_LINE_UPDATE = gql`
    mutation CheckoutShippingLineUpdate(
        $checkoutId: ID!
        $shippingRateHandle: String!
    ) {
        checkoutShippingLineUpdate(
            checkoutId: $checkoutId
            shippingRateHandle: $shippingRateHandle
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
