import { createContext } from "react";

import { TProduct } from "../Products";

export type TProductDetail = {
    id: string;
    title: string;
    description: string;
    vendor: string;
    images: {
        altText: string;
        originalSrc: string;
    }[];
    variants: {
        id: string;
        title: string;
        price: string;
        compareAtPrice: string;
    }[];
    productType: string;
};

export type TProductDetailContext = {
    handle: string;
    data?: TProductDetail;
    loadingData: boolean;
    similar?: TProduct[];
    loadingSimilar: boolean;
};

export const ProductDetailContext = createContext<TProductDetailContext>({
    handle: "",
    loadingData: true,
    loadingSimilar: true,
});
