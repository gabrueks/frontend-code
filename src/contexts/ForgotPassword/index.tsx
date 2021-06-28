import React, { ComponentType, FC, useContext } from "react";
import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";

import { CUSTOMER_FORGOT } from "../../graphql/Login";
interface ISuccess {
    key: string;
    value: string;
}

type ContextType = {
    handleSubmit: ({ email }: IHandleSubmit) => any;
    loading: boolean;
    userError: "";
    success: ISuccess[] | null;
};

const MyContext = React.createContext<ContextType>({
    handleSubmit: () => true,
    loading: false,
    userError: "",
    success: [],
});

interface Props {
    children: React.ReactNode;
}

interface IHandleSubmit {
    email: string;
}

export default function ForgotPasswordContextProvider({
    children,
}: Props): React.ReactElement {
    const { t } = useTranslation();
    const [customerCreate, { data, loading }] = useMutation(CUSTOMER_FORGOT);

    const handleSubmit = ({ email }: IHandleSubmit) => {
        customerCreate({
            variables: {
                email,
            },
        });
    };

    const handleMutationError = () => {
        if (data?.customerRecover?.customerUserErrors[0]) {
            const errorDetect = data?.customerRecover?.customerUserErrors[0];

            if (errorDetect.__typename === "CustomerUserError") {
                return errorDetect.message;
            } else {
                return null;
            }
        } else {
            return null;
        }
    };

    const handleMutationSuccess = () => {
        if (data?.customerRecover?.__typename) {
            const errorDetect = data?.customerRecover;
            if (
                errorDetect.__typename === "CustomerRecoverPayload" &&
                errorDetect.customerUserErrors.length === 0
            ) {
                return [
                    {
                        key: t("login.recoverPassword.key"),
                        value: t("login.recoverPassword.value"),
                    },
                ];
            } else {
                return null;
            }
        } else {
            return null;
        }
    };

    return (
        <MyContext.Provider
            value={{
                handleSubmit,
                loading,
                userError: handleMutationError(),
                success: handleMutationSuccess(),
            }}>
            {children}
        </MyContext.Provider>
    );
}

export function withForgotPasswordContext<T>(
    Component: ComponentType<T>,
): FC<T> {
    const withForgotPasswordContextFC: FC<T> = (props: T) => (
        <ForgotPasswordContextProvider>
            <Component {...props} />
        </ForgotPasswordContextProvider>
    );
    return withForgotPasswordContextFC;
}

export const useForgotPasswordContext = (): ContextType =>
    useContext(MyContext);
