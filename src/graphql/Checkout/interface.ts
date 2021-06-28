import { gql } from "@apollo/client";

import { Address } from "../../contexts/AccountAddress/interface";

export type TAttributeInput = {
    key: string;
    value: string;
};

export type TCheckoutFragment = {
    id: string;
    completedAt: string | null;
    totalTax: string;
    lineItemsSubtotalPrice: {
        amount: string;
    };
    totalPrice: string;
    email: string | null;
    note: string | null;
    customAttributes: {
        key: string;
        value: string;
    }[];
    shippingAddress:
        | (Address & {
              latitude: number;
              longitude: number;
          })
        | null;
    shippingLine: {
        handle: string;
        priceV2: {
            amount: string;
        };
        title: string;
    } | null;
    lineItems: {
        edges: {
            node: {
                id: string;
                title: string;
                customAttributes: {
                    key: string;
                    value: string | null;
                }[];
                variant: {
                    id: string;
                    title: string;
                    image: {
                        src: string;
                    };
                    price: string;
                };
                quantity: number;
            };
        }[];
    };
    order: {
        name: string;
    } | null;
    discountApplications: {
        edges: {
            node: {
                allocationMethod: string;
                targetSelection: string;
                targetType: string;
                value: {
                    amount?: string;
                    percentage?: number;
                };
            };
        }[];
    } | null;
};

export type TCheckoutDefaultResponse = {
    checkoutUserErrors: {
        message: string;
        field: string;
    }[];
    checkout: TCheckoutFragment | null;
    customer?: {
        id: string;
    };
};

export const CheckoutFragment = gql`
    fragment CheckoutFragment on Checkout {
        id
        completedAt
        totalTax
        lineItemsSubtotalPrice {
            amount
        }
        totalPrice
        email
        note
        customAttributes {
            key
            value
        }
        shippingAddress {
            address1
            address2
            city
            company
            country
            countryCodeV2
            firstName
            id
            lastName
            phone
            province
            provinceCode
            zip
            formatted
            latitude
            longitude
        }
        shippingLine {
            handle
            priceV2 {
                amount
            }
            title
        }
        lineItems(first: 250) {
            edges {
                node {
                    id
                    title
                    customAttributes {
                        key
                        value
                    }
                    variant {
                        id
                        title
                        image {
                            src
                        }
                        price
                    }
                    quantity
                }
            }
        }
        order {
            name
        }
        discountApplications(first: 5) {
            edges {
                node {
                    allocationMethod
                    targetSelection
                    targetType
                    value {
                        ... on MoneyV2 {
                            amount
                        }
                        ... on PricingPercentageValue {
                            percentage
                        }
                    }
                }
            }
        }
    }
`;
