import { gql } from "@apollo/client";

export const CUSTOMER_FORGOT = gql`
    mutation customerRecover($email: String!) {
        customerRecover(email: $email) {
            customerUserErrors {
                code
                field
                message
            }
        }
    }
`;

export const CUSTOMER_LOGIN = gql`
    mutation customerAccessTokenCreate($email: String!, $password: String!) {
        customerAccessTokenCreate(
            input: { email: $email, password: $password }
        ) {
            customerAccessToken {
                accessToken
                expiresAt
            }
            userErrors {
                field
                message
            }
        }
    }
`;

export const CUSTOMER_RENEW_TOKEN = gql`
    mutation customerAccessTokenRenew($customerAccessToken: String!) {
        customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
            customerAccessToken {
                accessToken
                expiresAt
            }
            userErrors {
                field
                message
            }
        }
    }
`;
