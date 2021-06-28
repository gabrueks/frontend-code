import React, { FC, ReactElement } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/client/react";

import CartModal from "./components/CartModal";

import clientGraphQL from "./config/graphql";

import CheckoutContextProvider from "./contexts/Checkout";
import { CookiesProvider } from "./contexts/Cookies";

import Routes from "./routes";

import theme from "./theme";

const App: FC = (): ReactElement => {
    return (
        <ApolloProvider client={clientGraphQL}>
            <CookiesProvider>
                <ThemeProvider theme={theme}>
                    <CheckoutContextProvider>
                        <Router>
                            <CartModal />
                            <Routes />
                        </Router>
                    </CheckoutContextProvider>
                </ThemeProvider>
            </CookiesProvider>
        </ApolloProvider>
    );
};

export default App;
