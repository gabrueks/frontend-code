import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import productsCachePolicy from "../contexts/Products/cachePolicy";

const httpLink = createHttpLink({
    uri: `https://${process.env.REACT_APP_SHOPIFY_STOREFRONT_DOMAIN}.myshopify.com/api/2021-04/graphql.json`,
});

const middlewareLink = setContext(() => ({
    headers: {
        "X-Shopify-Storefront-Access-Token":
            process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        Accept: "application/json",
    },
}));

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                ...productsCachePolicy,
            },
        },
    },
});

const client = new ApolloClient({
    link: middlewareLink.concat(httpLink),
    cache,
});

export default client;
