import { gql } from "@apollo/client";

import { PRODUCT_DATA_FRAGMENT, TProductData } from "./Products";

export type TGetProductByHandleVariables = {
    handle: string;
};

export type TGetProductByHandleResponse = {
    productDetail: {
        id: string;
        title: string;
        descriptionHtml: string;
        vendor: string;
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
                    id: string;
                    title: string;
                    price: string;
                    compareAtPrice: string;
                };
            }[];
        };
        productType: string;
    };
};

export const GET_PRODUCT_BY_HANDLE = gql`
    query GetProductByHandle($handle: String!) {
        productDetail: productByHandle(handle: $handle) {
            id
            title
            descriptionHtml
            productType
            images(first: 250) {
                edges {
                    node {
                        altText
                        originalSrc
                    }
                }
            }
            variants(first: 250) {
                edges {
                    node {
                        id
                        title
                        price
                        compareAtPrice
                    }
                }
            }
            vendor
        }
    }
`;

export type TGetSimilarProductsResponse = {
    similarProducts: {
        collections: {
            edges: {
                node: {
                    products: {
                        edges: {
                            node: TProductData;
                        }[];
                    };
                };
            }[];
        };
    };
};

export const GET_SIMILAR_PRODUCTS = gql`
    query GetSimilarProducts($handle: String!) {
        similarProducts: productByHandle(handle: $handle) {
            collections(first: 1) {
                edges {
                    node {
                        products(first: 5, sortKey: BEST_SELLING) {
                            edges {
                                node {
                                    ...ProductDataFragment
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    ${PRODUCT_DATA_FRAGMENT}
`;
