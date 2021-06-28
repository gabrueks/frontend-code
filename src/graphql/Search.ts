import { gql } from "@apollo/client";

export const SEARCH_PRODUCT = gql`
    query getProducts($qtt: Int, $value: String) {
        products(first: $qtt, query: $value) {
            edges {
                node {
                    title
                    description
                    handle
                    variants(first: 1) {
                        edges {
                            node {
                                price
                                compareAtPrice
                            }
                        }
                    }
                    images(first: 1) {
                        edges {
                            node {
                                altText
                                originalSrc
                            }
                        }
                    }
                }
            }
        }
    }
`;
