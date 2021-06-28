import React, { FC, ReactElement, useMemo } from "react";
import { Suspense } from "react";
import { useCookiesContext } from "../contexts/Cookies";
import { Switch, Redirect, Route, useLocation } from "react-router-dom";

import {
    routes,
    routeParams,
    routeProps,
    routeSearch,
    routeState,
} from "./interface";

import Footer from "../components/Footer";
import Header from "../components/Header/Navbar";

const PrivateRoute = ({
    component: Component,
    ...rest
}: {
    component: any;
}) => {
    const { cookies } = useCookiesContext();

    return (
        <Route
            {...rest}
            render={(props) =>
                cookies?.customerAccessTokenCreate ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: routes.LOGIN,
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

function renderRoutes(): ReactElement[] {
    const temp = [];
    let route: keyof typeof routeProps;

    for (route in routeProps) {
        if (routeProps[route].private) {
            temp.push(<PrivateRoute {...routeProps[route]} />);
        } else {
            temp.push(<Route {...routeProps[route]} />);
        }
    }
    return temp;
}

const Routes: FC = (): ReactElement => {
    const location = useLocation();
    return (
        <>
            {location.pathname !== routes.CHECKOUT && (
                <>
                    <Header />
                </>
            )}

            <Suspense fallback={<div />}>
                <Switch>
                    {renderRoutes()}
                    <Redirect to={routes.HOME} />
                </Switch>
            </Suspense>
            {location.pathname !== routes.CHECKOUT && <Footer />}
        </>
    );
};

export default Routes;

export function composeSearch<T extends routes>(
    search: routeSearch[Extract<T, keyof routeSearch>],
): string {
    const temp = new URLSearchParams();
    Object.entries(search).forEach(([key, value]) => {
        temp.append(key, value ?? "");
    });
    return temp.toString();
}

export function composePathName<T extends routes>(
    route: T,
    params: routeParams[Extract<T, keyof routeParams>],
): string {
    let temp = route as string;
    Object.entries(params).forEach(([key, value]) => {
        temp = temp.replace(`:${key}`, value);
    });
    return temp;
}

export function composeRoute<T extends routes>(
    route: T,
    {
        params,
        search,
        state,
    }: {
        params?: routeParams[Extract<T, keyof routeParams>];
        search?: routeSearch[Extract<T, keyof routeSearch>];
        state?: routeState[Extract<T, keyof routeState>];
    },
): {
    pathname: string;
    search: string;
    state?: routeState[Extract<T, keyof routeState>];
} {
    return {
        pathname: params ? composePathName(route, params) : route,
        search: search ? composeSearch<T>(search) : "",
        state,
    };
}

export function extractSearch<T extends Record<string, any>>(
    search: string,
): T {
    return Object.fromEntries(new URLSearchParams(search).entries()) as T;
}

export function useSearch<T extends keyof routeSearch>(location: {
    search: string;
}): routeSearch[T] {
    return useMemo(() => extractSearch<routeSearch[T]>(location.search), [
        location.search,
    ]);
}

export * from "./interface";
