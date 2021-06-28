export interface Props {
    children: React.ReactNode;
}

export type TResult = {
    node: {
        title: string;
        description: string;
        handle: string;
        images: {
            edges: {
                node: {
                    altText: string | undefined;
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
    };
};

export interface TProducts {
    description: string;
    title: string;
    handle: string;
    image: {
        altText: string;
        originalSrc: string;
    };
    variants: {
        price: string;
        compareAtPrice: string;
    };
}

export type ContextType = {
    handleSubmit: ({ query }: IHandleSubmit) => any;
    loading: boolean;
    result: TProducts[];
};

export interface IHandleSubmit {
    query: string | unknown;
    first: number;
}
