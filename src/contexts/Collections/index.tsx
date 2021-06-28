import { useQuery } from "@apollo/client";
import React, { useContext, FC, ComponentType } from "react";
import { GET_COLLECTIONS } from "../../graphql/Collections";
import {
    CollectionsContext,
    TCollectionsContext,
    TCollectionsResponse,
} from "./interface";

interface Props {
    children: React.ReactNode;
}

export default function CollectionsContextProvider({
    children,
}: Props): React.ReactElement {
    const { data } = useQuery(GET_COLLECTIONS);

    const processedCollections = data?.collections.edges.map(
        ({ node }: TCollectionsResponse) => ({
            id: node.id,
            title: node.title,
            image: {
                id: node.image?.id,
                originalSrc: node.image?.originalSrc,
            },
        }),
    );
    return (
        <CollectionsContext.Provider
            value={{
                collections: processedCollections,
            }}>
            {children}
        </CollectionsContext.Provider>
    );
}
export function withCollectionsContext<T>(Component: ComponentType<T>): FC<T> {
    const withCollectionsContextFC: FC<T> = (props: T) => (
        <CollectionsContextProvider>
            <Component {...props} />
        </CollectionsContextProvider>
    );
    return withCollectionsContextFC;
}

export function useCollectionsContext(): TCollectionsContext {
    return useContext(CollectionsContext);
}
