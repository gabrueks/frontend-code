import { gql } from "@apollo/client";

export const GET_COLLECTIONS = gql`
    query {
        collections(first: 20) {
            edges {
                node {
                    id
                    title
                    image {
                        id
                        originalSrc
                    }
                }
            }
        }
    }
`;
