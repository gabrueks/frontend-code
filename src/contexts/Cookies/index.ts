import { useEffect, useLayoutEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import constate from "constate";
import Cookies, { CookieSetOptions } from "universal-cookie";

import { CUSTOMER_RENEW_TOKEN } from "../../graphql/Login";
import { CUSTOMER_ACCESS_TOKEN_NAME } from "../../constants";

import { IRefresher, IRefreshToken } from "./interface";

const MAX_TIMEOUT_VALUE = 0x7fffffff; // 32 bit max integer

const globalCookies = new Cookies();

const setGlobalCookie = globalCookies.set.bind(globalCookies);
const removeGlobalCookie = globalCookies.remove.bind(globalCookies);

const setRefreshToken: IRefreshToken = (name, _, options, refresher) => {
    if (options?.expires) {
        localStorage.setItem(name, JSON.stringify(options));
        const timeout = new Date(options.expires).getTime() - Date.now();

        if (timeout < MAX_TIMEOUT_VALUE) {
            setTimeout(() => {
                if (refresher) {
                    refresher({
                        onError: () => {
                            localStorage.removeItem(name);
                            removeGlobalCookie(name);
                        },
                    });
                }
            }, timeout - 1000);
        }
    }
};

function useCookies() {
    const [cookies, setCookies] = useState(globalCookies.getAll());

    const [customerAccessTokenRenew, { data: newData }] = useMutation(
        CUSTOMER_RENEW_TOKEN,
    );

    const handleRefresh: IRefresher = ({ onError }) => {
        const oldToken = globalCookies.get(CUSTOMER_ACCESS_TOKEN_NAME);
        if (oldToken) {
            customerAccessTokenRenew({
                variables: {
                    customerAccessToken: oldToken,
                },
            });
        } else {
            onError();
        }
    };

    useLayoutEffect(() => {
        function onChange() {
            const newCookies = globalCookies.getAll();
            setCookies(newCookies);
        }
        globalCookies.addChangeListener(onChange);
        return () => {
            globalCookies.removeChangeListener(onChange);
        };
    }, []);

    useLayoutEffect(() => {
        const accessToken = globalCookies.get(CUSTOMER_ACCESS_TOKEN_NAME);
        const options = localStorage.getItem(CUSTOMER_ACCESS_TOKEN_NAME);
        if (accessToken && options) {
            setRefreshToken(
                CUSTOMER_ACCESS_TOKEN_NAME,
                accessToken,
                JSON.parse(options),
                handleRefresh,
            );
        } else if (!accessToken) {
            localStorage.removeItem(CUSTOMER_ACCESS_TOKEN_NAME);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setGlobalCookieWrapper = (
        name: string,
        value: any,
        options?: CookieSetOptions | undefined,
    ) => {
        // set refresh token before expiration
        setRefreshToken(name, value, options, handleRefresh);
        setGlobalCookie(name, value, options);
    };

    const removeGlobalCookieWrapper = (
        name: string,
        options?: CookieSetOptions | undefined,
    ) => {
        localStorage.removeItem(CUSTOMER_ACCESS_TOKEN_NAME);
        removeGlobalCookie(name, options);
    };

    useEffect(() => {
        const { customerAccessToken: newCustomerAccessToken } =
            newData?.customerAccessTokenRenew || {};
        if (newCustomerAccessToken && newCustomerAccessToken.accessToken) {
            setGlobalCookieWrapper(
                CUSTOMER_ACCESS_TOKEN_NAME,
                newCustomerAccessToken.accessToken,
                {
                    path: "/",
                    expires: new Date(newCustomerAccessToken.expiresAt),
                },
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newData]);

    return {
        setCookies: setGlobalCookieWrapper,
        removeCookie: removeGlobalCookieWrapper,
        cookies,
    };
}

export const [CookiesProvider, useCookiesContext] = constate(useCookies);
