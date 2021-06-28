import { useMutation } from "@apollo/client";
import React, { ComponentType, FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";
import { useCookiesContext } from "../contexts/Cookies";
import { CUSTOMER_LOGIN } from "../graphql/Login";

import { CUSTOMER_ACCESS_TOKEN_NAME } from "../constants";

import { routes, routeState } from "../routes";

interface IUserError {
    key: string;
    value: string;
}

type ContextType = {
    handleSubmit: ({ email, password }: IHandleSubmit) => any;
    loading: boolean;
    userError: IUserError[] | null;
};

const MyContext = React.createContext<ContextType>({
    handleSubmit: () => true,
    loading: false,
    userError: [],
});

interface Props {
    children: React.ReactNode;
}

interface IHandleSubmit {
    email: string;
    password: string;
}

export default function LoginContextProvider({
    children,
}: Props): React.ReactElement {
    const { t } = useTranslation();
    const { setCookies } = useCookiesContext();

    const [customerAccessTokenCreate, { data, loading }] = useMutation(
        CUSTOMER_LOGIN,
    );

    const history = useHistory();

    const location = useLocation<routeState[routes.LOGIN]>();

    const handleMutationError = () => {
        if (data?.customerAccessTokenCreate?.userErrors[0]) {
            const errorDetect = data?.customerAccessTokenCreate?.userErrors[0];

            if (errorDetect.message === "Unidentified customer") {
                return [
                    {
                        key: errorDetect.__typename,
                        value: t("login.errors.userNotFound"),
                    },
                ];
            } else {
                return null;
            }
        } else {
            return null;
        }
    };

    const handleSubmit = ({ email, password }: IHandleSubmit) => {
        customerAccessTokenCreate({
            variables: {
                email,
                password,
            },
        });
    };

    if (data && data.customerAccessTokenCreate) {
        const { customerAccessToken } = data.customerAccessTokenCreate;

        if (customerAccessToken && customerAccessToken?.accessToken) {
            setCookies(
                CUSTOMER_ACCESS_TOKEN_NAME,
                customerAccessToken?.accessToken,
                {
                    path: "/",
                    expires: new Date(customerAccessToken?.expiresAt),
                },
            );

            history.push(location.state?.from ?? routes.ACCOUNT);
        }
    }

    return (
        <MyContext.Provider
            value={{
                handleSubmit,
                loading,
                userError: handleMutationError(),
            }}>
            {children}
        </MyContext.Provider>
    );
}

export function withLoginContext<T>(Component: ComponentType<T>): FC<T> {
    const withProductsContextFC: FC<T> = (props: T) => (
        <LoginContextProvider>
            <Component {...props} />
        </LoginContextProvider>
    );
    return withProductsContextFC;
}

export const useLoginContext = (): ContextType => useContext(MyContext);
