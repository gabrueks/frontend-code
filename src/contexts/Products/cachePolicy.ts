import { FieldPolicy } from "@apollo/client";

import {
    TFetchProductsIdsResponse,
    TFetchProductsResponse,
    TFetchProductsVariables,
} from "../../graphql/Products";

export type TProductdCachePolicy = {
    products: FieldPolicy<
        {
            ids: Record<string, TFetchProductsIdsResponse["products"] | null>;
            data: Record<string, TFetchProductsResponse["products"] | null>;
        },
        | TFetchProductsIdsResponse["products"]
        | TFetchProductsResponse["products"],
        | TFetchProductsIdsResponse["products"]
        | TFetchProductsResponse["products"]
        | null
    >;
};

const buildKey = ({
    collection,
    orderBy,
    reverse,
}: Pick<TFetchProductsVariables, "collection" | "orderBy" | "reverse">) => {
    return [collection ?? "", orderBy ?? "", reverse].join("/");
};

const productsCachePolicy: TProductdCachePolicy = {
    products: {
        keyArgs: false,
        merge(existing, incoming, { variables }) {
            const { type, ...filters } = variables as TFetchProductsVariables;
            const filtersKey = buildKey(filters);
            if (!existing) {
                return {
                    ids: {
                        [filtersKey]:
                            type === "ids"
                                ? (incoming as TFetchProductsIdsResponse["products"])
                                : null,
                    },
                    data: {
                        [filtersKey]:
                            type === "data"
                                ? (incoming as TFetchProductsResponse["products"])
                                : null,
                    },
                };
            }

            if (!type) return existing;

            const merged = existing[type][filtersKey];
            if (!merged) {
                return {
                    ...existing,
                    [type]: {
                        ...existing[type],
                        [filtersKey]: incoming,
                    },
                };
            }

            const newEdges = [...merged.edges];
            incoming.edges.forEach((edge: any) => {
                newEdges.push(edge);
            });

            const newPageInfo = type === "ids" && {
                pageInfo: (incoming as TFetchProductsIdsResponse["products"])
                    .pageInfo,
            };

            return {
                ...existing,
                [type]: {
                    ...existing[type],
                    [filtersKey]: {
                        edges: newEdges,
                        ...newPageInfo,
                    },
                },
            };
        },
        read(existing, { variables }) {
            if (!existing) return undefined;
            const { type, ...filters } = variables as TFetchProductsVariables;
            const filtersKey = buildKey(filters);
            const selected = existing[type][filtersKey];
            if (!selected) return undefined;
            return selected;
        },
    },
};

export default productsCachePolicy;
