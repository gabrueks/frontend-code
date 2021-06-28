import { createContext, Dispatch, SetStateAction } from "react";

import { TFetchProductsVariables } from "../../graphql/Products";

export type TProduct = {
    featuredImage: {
        altText: string;
        originalSrc: string;
    };
    id: string;
    title: string;
    handle: string;
    price: string;
    compareAtPrice?: string;
    vendor: string;
};

export type TProductsContext = {
    products: TProduct[];
    loading: boolean;
    page: number;
    pages: number;
    pageSize: number;
    total: number;
    setPage: Dispatch<SetStateAction<number>>;
    updateQuery: (
        filters: Pick<
            TFetchProductsVariables,
            "collection" | "orderBy" | "reverse"
        >,
    ) => void;
};

export const ProductsContext = createContext<TProductsContext>({
    products: [],
    loading: true,
    page: 0,
    pages: 0,
    pageSize: 0,
    total: 0,
    setPage: () => {
        return;
    },
    updateQuery: () => {
        return;
    },
});
