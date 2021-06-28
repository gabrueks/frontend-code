import React, {
    ComponentType,
    FC,
    ReactElement,
    useContext,
    useMemo,
} from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import {
    ProductDetailContext,
    TProductDetail,
    TProductDetailContext,
} from "./interface";

import { TProduct } from "../Products";

import parseProductData from "../../helpers/parse/parseProductData";

import {
    GET_PRODUCT_BY_HANDLE,
    GET_SIMILAR_PRODUCTS,
    TGetProductByHandleResponse,
    TGetProductByHandleVariables,
    TGetSimilarProductsResponse,
} from "../../graphql/ProductDetail";

import { routeParams, routes } from "../../routes";

const ProductDetailContextProvider: FC<TGetProductByHandleVariables> = ({
    handle,
    children,
}): ReactElement => {
    const { data, loading: loadingData } = useQuery<
        TGetProductByHandleResponse,
        TGetProductByHandleVariables
    >(GET_PRODUCT_BY_HANDLE, { variables: { handle } });
    const { data: similar, loading: loadingSimilar } = useQuery<
        TGetSimilarProductsResponse,
        TGetProductByHandleVariables
    >(GET_SIMILAR_PRODUCTS, { variables: { handle } });

    const processedData = useMemo<TProductDetail | undefined>(() => {
        return (
            data?.productDetail && {
                id: data.productDetail.id,
                title: data.productDetail.title,
                description: data.productDetail.descriptionHtml,
                vendor: data.productDetail.vendor,
                images: data.productDetail.images.edges.map(({ node }) => ({
                    ...node,
                    altText: node.altText ?? "",
                })),
                variants: data.productDetail.variants.edges.map(
                    ({ node }) => node,
                ),
                productType: data.productDetail.productType,
            }
        );
    }, [data]);

    const processedSimilar = useMemo<TProduct[] | undefined>(() => {
        return (
            similar?.similarProducts &&
            similar?.similarProducts.collections.edges[0] &&
            similar?.similarProducts.collections.edges[0].node.products.edges
                .map(({ node }) => parseProductData(node))
                .filter((prd) => prd.handle !== handle)
        );
    }, [similar, handle]);

    return (
        <ProductDetailContext.Provider
            value={{
                handle,
                data: processedData,
                loadingData,
                similar: processedSimilar,
                loadingSimilar,
            }}>
            {children}
        </ProductDetailContext.Provider>
    );
};

export default ProductDetailContextProvider;

export function withProductDetailContext<T>(
    Component: ComponentType<T>,
): FC<T> {
    const ResultComponent: FC<T> = (props) => {
        const { handle } = useParams<routeParams[routes.PRODUCT]>();
        return (
            <ProductDetailContextProvider handle={handle ?? ""}>
                <Component {...props} />
            </ProductDetailContextProvider>
        );
    };
    return ResultComponent;
}

export function useProductDetailContext(): TProductDetailContext {
    return useContext(ProductDetailContext);
}

export * from "./interface";
