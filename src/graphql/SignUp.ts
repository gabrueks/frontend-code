import { gql } from "@apollo/client";

export const CUSTOMER_CREATE = gql`
    mutation customerCreate(
        $firstName: String
        $email: String!
        $lastName: String
        $password: String!
    ) {
        customerCreate(
            input: {
                email: $email
                firstName: $firstName
                lastName: $lastName
                password: $password
            }
        ) {
            customer {
                id
            }
            userErrors {
                field
                message
            }
        }
    }
`;
