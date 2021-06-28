import React, { useContext, FC, ComponentType } from "react";

import { useLazyQuery } from "@apollo/client";

import { ContextType, IHandleSubmit, TResult, Props } from "./interface";

import { SEARCH_PRODUCT } from "../../graphql/Search";

const SearchContext = React.createContext<ContextType>({
    handleSubmit: () => true,
    loading: false,
    result: [],
});

export default function SearchContextProvider({
    children,
}: Props): React.ReactElement {
    const [getProducts, { loading, data }] = useLazyQuery(SEARCH_PRODUCT, {
        fetchPolicy: "no-cache",
    });

    const handleSubmit = ({ query, first }: IHandleSubmit) => {
        getProducts({
            variables: {
                qtt: first,
                value: query,
            },
        });
    };

    const processedSearch = data?.products.edges.map((node: TResult) => ({
        description: node?.node.description,
        title: node?.node.title,
        handle: node?.node.handle,
        image: {
            altText: node?.node.images?.edges[0]?.node.altText,
            originalSrc: node?.node.images?.edges[0]?.node.originalSrc,
        },
        variants: {
            price: node?.node.variants.edges[0].node.price,
            compareAtPrice: node?.node.variants.edges[0].node.compareAtPrice,
        },
    }));

    return (
        <SearchContext.Provider
            value={{
                handleSubmit,
                loading,
                result: processedSearch,
            }}>
            {children}
        </SearchContext.Provider>
    );
}

export function withSearchContext<T>(Component: ComponentType<T>): FC<T> {
    const withSearchContext: FC<T> = (props: T) => (
        <SearchContextProvider>
            <Component {...props} />
        </SearchContextProvider>
    );
    return withSearchContext;
}

export const useForgotPasswordContext = (): ContextType =>
    useContext(SearchContext);
