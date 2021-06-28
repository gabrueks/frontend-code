import { gql } from "@apollo/client";

export const ADDRESS_CREATE = gql`
    mutation customerAddressCreate(
        $customerAccessToken: String!
        $address: MailingAddressInput!
    ) {
        customerAddressCreate(
            customerAccessToken: $customerAccessToken
            address: $address
        ) {
            customerAddress {
                id
            }
            customerUserErrors {
                code
                field
                message
            }
        }
    }
`;

export const SET_DEFAULT_ADDRESS = gql`
    mutation customerDefaultAddressUpdate(
        $customerAccessToken: String!
        $addressId: ID!
    ) {
        customerDefaultAddressUpdate(
            customerAccessToken: $customerAccessToken
            addressId: $addressId
        ) {
            customer {
                id
            }
            customerUserErrors {
                code
                field
                message
            }
        }
    }
`;

export const DELETE_ADDRESS = gql`
    mutation customerAddressDelete($id: ID!, $customerAccessToken: String!) {
        customerAddressDelete(
            id: $id
            customerAccessToken: $customerAccessToken
        ) {
            customerUserErrors {
                code
                field
                message
            }
            deletedCustomerAddressId
        }
    }
`;

export const UPDATE_ADDRESS = gql`
    mutation customerAddressUpdate(
        $customerAccessToken: String!
        $id: ID!
        $address: MailingAddressInput!
    ) {
        customerAddressUpdate(
            customerAccessToken: $customerAccessToken
            id: $id
            address: $address
        ) {
            customerAddress {
                id
            }
            customerUserErrors {
                code
                field
                message
            }
        }
    }
`;

export const GET_CUSTOMER_INFO = gql`
    query($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
            id
            firstName
            lastName
            email
            addresses(first: 15) {
                edges {
                    node {
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
                    }
                }
            }
            defaultAddress {
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
            }
        }
    }
`;

export const GET_CUSTOMER_ADDRESSES = gql`
    query($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
            addresses(first: 15) {
                edges {
                    node {
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
                    }
                }
            }
            defaultAddress {
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
            }
        }
    }
`;

export const ORDER_DATA_LINE_ITEMS_FRAGMENT = gql`
    fragment OrderDataLineItemsFragment on OrderLineItem {
        title
        quantity
        customAttributes {
            key
            value
        }
        discountedTotalPrice {
            amount
        }
        variant {
            id
            sku
            title
            priceV2 {
                amount
            }
        }
    }
`;
export const ORDER_DATA_FRAGMENT = gql`
    fragment OrderDataFragment on Order {
        id
        name
        financialStatus
        fulfillmentStatus
        processedAt
        canceledAt
        cancelReason
        shippingAddress {
            address1
            address2
            city
            company
            country
            name
            provinceCode
            zip
        }
        totalPriceV2 {
            amount
        }
        totalShippingPriceV2 {
            amount
        }
        subtotalPriceV2 {
            amount
        }
        lineItems(first: 15) {
            edges {
                node {
                    ...OrderDataLineItemsFragment
                }
            }
        }
    }
    ${ORDER_DATA_LINE_ITEMS_FRAGMENT}
`;
export const GET_CUSTOMER_ORDER_HISTORY = gql`
    query getCustomerOrderHistory($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
            orders(first: 15) {
                edges {
                    node {
                        ...OrderDataFragment
                    }
                }
            }
        }
    }
    ${ORDER_DATA_FRAGMENT}
`;
