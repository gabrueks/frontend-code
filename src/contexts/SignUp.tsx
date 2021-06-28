import { useMutation } from "@apollo/client";
import React, { ComponentType, FC, useContext } from "react";
import { useHistory } from "react-router";
import { CUSTOMER_CREATE } from "../graphql/SignUp";

interface IUserError {
    key: string;
    value: string;
}

type ContextType = {
    handleSubmit: ({
        firstName,
        lastName,
        email,
        password,
    }: IHandleSubmit) => any;
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
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export default function SignUpContextProvider({
    children,
}: Props): React.ReactElement {
    const [customerCreate, { data, loading }] = useMutation(CUSTOMER_CREATE);
    const history = useHistory();

    const handleMutationError = () => {
        if (data?.customerCreate?.userErrors[0]) {
            const errorDetect = data?.customerCreate?.userErrors[0];

            if (errorDetect.__typename === "UserError") {
                return [
                    {
                        key: errorDetect.__typename,
                        value: errorDetect.message,
                    },
                ];
            } else {
                return null;
            }
        } else {
            return null;
        }
    };

    const handleSubmit = ({
        firstName,
        lastName,
        email,
        password,
    }: IHandleSubmit) => {
        customerCreate({
            variables: {
                firstName,
                lastName,
                email,
                password,
            },
        });
    };

    if (data && data.customerCreate) {
        const { customer } = data.customerCreate;

        if (customer) {
            history.push("/account/login");
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

export function withSignUpContext<T>(Component: ComponentType<T>): FC<T> {
    const withProductsContextFC: FC<T> = (props: T) => (
        <SignUpContextProvider>
            <Component {...props} />
        </SignUpContextProvider>
    );
    return withProductsContextFC;
}

export const useSignUpContext = (): ContextType => useContext(MyContext);
