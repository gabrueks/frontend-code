import { createContext } from "react";

export interface TCollectionsResponse {
    node: {
        id: string;
        title: string;
        image: {
            id: string;
            originalSrc: string;
        };
    };
}
export interface TCollections {
    id: string;
    title: string;
    image: {
        id: string;
        originalSrc: string;
    };
}

export type TCollectionsContext = {
    collections: TCollections[];
};

export const CollectionsContext = createContext<TCollectionsContext>({
    collections: [],
});
