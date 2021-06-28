import React, {
    FC,
    ComponentType,
    ReactElement,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useLazyQuery, NetworkStatus } from "@apollo/client";

import { ProductsContext, TProductsContext } from "./interface";

import parseProductData from "../../helpers/parse/parseProductData";

import {
    FETCH_PRODUCTS_IDS,
    GET_PRODUCTS,
    pageSize,
    TFetchProductsIdsResponse,
    TFetchProductsResponse,
    TFetchProductsVariables,
} from "../../graphql/Products";

export default function ProductsContextProvider({
    children,
}: {
    children: ReactNode;
}): ReactElement {
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(0);
    const filters = useRef<
        Pick<TFetchProductsVariables, "collection" | "orderBy" | "reverse">
    >({});

    const [loading, setLoading] = useState(true);
    const [loadingInit, setLoadingInit] = useState(false);
    const [
        startPagination,
        {
            called: pagCalled,
            data: pagination,
            fetchMore: updatePagData,
            networkStatus: pagStatus,
        },
    ] = useLazyQuery<TFetchProductsIdsResponse, TFetchProductsVariables>(
        FETCH_PRODUCTS_IDS,
        {
            notifyOnNetworkStatusChange: true,
            variables: { type: "ids" },
        },
    );
    const [
        startFetchProducts,
        {
            called: productsCalled,
            data: products,
            fetchMore: updateProducts,
            networkStatus: productsStatus,
        },
    ] = useLazyQuery<TFetchProductsResponse, TFetchProductsVariables>(
        GET_PRODUCTS,
        {
            notifyOnNetworkStatusChange: true,
            variables: { type: "data" },
        },
    );

    const paginationRef = useRef(pagination);
    useEffect(() => {
        paginationRef.current = pagination;
        const newTotal = pagination?.products.edges.length ?? 0;
        setTotal(newTotal);
        setPages(Math.ceil(newTotal / pageSize));
        setPage(0);
    }, [pagination]);
    const productsRef = useRef(products);
    useEffect(() => {
        productsRef.current = products;
    }, [products]);

    useEffect(() => {
        if (pagStatus !== NetworkStatus.ready && !loadingInit) {
            setLoadingInit(true);
        }
    }, [pagStatus, loadingInit]);
    useEffect(() => {
        if (productsStatus !== NetworkStatus.ready && !loading) {
            setLoading(true);
        }
    }, [productsStatus, loading]);

    useEffect(() => {
        if (pagStatus === NetworkStatus.ready && loadingInit) {
            if (paginationRef.current?.products.pageInfo.hasNextPage) {
                if (updatePagData) {
                    updatePagData({
                        variables: {
                            type: "ids",
                            cursor: paginationRef.current.products.edges.slice(
                                -1,
                            )[0].cursor,
                            ...filters.current,
                        },
                    });
                }
            } else if (!paginationRef.current?.products.pageInfo.hasNextPage) {
                setLoadingInit(false);
            }
        }
    }, [pagStatus, loadingInit, updatePagData]);

    useEffect(() => {
        (async () => {
            if (
                !loadingInit &&
                productsStatus === NetworkStatus.ready &&
                paginationRef.current &&
                productsRef.current
            ) {
                setLoading(true);
                if (paginationRef.current.products.edges.length) {
                    const selector = page * pageSize;
                    const firstOfPage =
                        paginationRef.current.products.edges[selector];
                    const idx = productsRef.current.products.edges.findIndex(
                        (prd) => prd.node.id === firstOfPage.node.id,
                    );
                    if (idx < 0) {
                        const lastOfPrevPage =
                            paginationRef.current.products.edges[selector - 1];
                        if (updateProducts) {
                            await updateProducts({
                                variables: {
                                    type: "data",
                                    cursor: lastOfPrevPage.cursor,
                                    ...filters.current,
                                },
                            });
                        }
                    }
                }
                setLoading(false);
            }
        })();
    }, [loadingInit, productsStatus, page, updateProducts]);

    const updateQuery: TProductsContext["updateQuery"] = (newFilters) => {
        filters.current = newFilters;

        const pagFn = pagCalled ? updatePagData : startPagination;
        if (pagFn) {
            pagFn({
                variables: {
                    type: "ids",
                    ...newFilters,
                },
            });
        }

        const productsFn = productsCalled ? updateProducts : startFetchProducts;
        if (productsFn) {
            productsFn({
                variables: {
                    type: "data",
                    ...newFilters,
                },
            });
        }
    };

    const processedProducts = useMemo(() => {
        return typeof products === "undefined"
            ? []
            : products.products.edges
                  .map(({ node }) => parseProductData(node))
                  .slice(page * pageSize, (page + 1) * pageSize);
    }, [products, page]);

    return (
        <ProductsContext.Provider
            value={{
                loading: loading || loadingInit,
                products: processedProducts,
                page,
                pageSize,
                pages,
                total,
                setPage,
                updateQuery,
            }}>
            {children}
        </ProductsContext.Provider>
    );
}

export function withProductsContext<T>(Component: ComponentType<T>): FC<T> {
    const withProductsContextFC: FC<T> = (props: T) => (
        <ProductsContextProvider>
            <Component {...props} />
        </ProductsContextProvider>
    );
    return withProductsContextFC;
}

export function useProductsContext(): TProductsContext {
    return useContext(ProductsContext);
}

export * from "./interface";
