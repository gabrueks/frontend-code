import { gql } from "@apollo/client";

export type TFetchProductsVariables = {
    type: "ids" | "data";
    cursor?: string;
    collection?: string;
    orderBy?: string;
    reverse?: boolean;
};

export type TProductData = {
    id: string;
    title: string;
    handle: string;
    images: {
        edges: {
            node: {
                altText: string | null;
                originalSrc: string;
            };
        }[];
    };
    variants: {
        edges: {
            node: {
                price: string;
                compareAtPrice: string;
            };
        }[];
    };
    vendor: string;
};

export type TFetchProductsResponse = {
    products: {
        edges: {
            node: TProductData;
        }[];
    };
};

export type TFetchProductsIdsResponse = {
    products: {
        edges: {
            cursor: string;
            node: {
                id: string;
            };
        }[];
        pageInfo: {
            hasNextPage: boolean;
        };
    };
};

export const FETCH_PRODUCTS_IDS = gql`
    query ProductsIDs(
        $cursor: String
        $collection: String
        $orderBy: ProductSortKeys
        $reverse: Boolean = false
    ) {
        products(
            first: 250
            after: $cursor
            query: $collection
            sortKey: $orderBy
            reverse: $reverse
        ) {
            edges {
                cursor
                node {
                    id
                }
            }
            pageInfo {
                hasNextPage
            }
        }
    }
`;

export const pageSize = 20;

export const PRODUCT_DATA_FRAGMENT = gql`
    fragment ProductDataFragment on Product {
        id
        title
        handle
        images(first: 1) {
            edges {
                node {
                    altText
                    originalSrc
                }
            }
        }
        variants(first: 1) {
            edges {
                node {
                    price
                    compareAtPrice
                }
            }
        }
        vendor
    }
`;

export const GET_PRODUCTS = gql`
    query ProductsIDs(
        $cursor: String
        $collection: String
        $orderBy: ProductSortKeys
        $reverse: Boolean = false
    ) {
        products(
            first: ${pageSize}
            after: $cursor
            query: $collection
            sortKey: $orderBy
            reverse: $reverse
        ) {
            edges {
                node {
                    ...ProductDataFragment
                }
            }
        }
    }
    ${PRODUCT_DATA_FRAGMENT}
`;
