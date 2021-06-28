import React, { ComponentType, FC, useContext, useState } from "react";
import { useCookiesContext } from "../Cookies";
import { useMutation, useQuery } from "@apollo/client";

import {
    IHandleSubmit,
    IUserError,
    processedAddresses,
    Props,
    Address,
} from "./interface";
import {
    ADDRESS_CREATE,
    DELETE_ADDRESS,
    SET_DEFAULT_ADDRESS,
    UPDATE_ADDRESS,
    GET_CUSTOMER_ADDRESSES,
} from "../../graphql/Account";

type ContextType = {
    handleSubmit: (data: IHandleSubmit) => any;
    loading: boolean;
    userError: IUserError[] | null;
    defaultAddress: boolean;
    setDefaultAddress: any;
    handleDelete: (id: string) => any;
    handleUpdate: (
        id: string,
        address: IHandleSubmit,
        defaultEdit: boolean,
    ) => any;
    addresses: Address[];
};

const MyContext = React.createContext<ContextType>({
    handleSubmit: () => true,
    loading: false,
    userError: [],
    defaultAddress: false,
    setDefaultAddress: () => true,
    handleDelete: () => true,
    handleUpdate: () => true,
    addresses: [],
});

export default function AccountAddressContextProvider({
    children,
}: Props): React.ReactElement {
    const { cookies } = useCookiesContext();
    const [defaultAddress, setDefaultAddress] = useState(false);

    const { data: dataAddress } = useQuery(GET_CUSTOMER_ADDRESSES, {
        variables: {
            customerAccessToken: cookies.customerAccessTokenCreate,
        },
    });

    const [customerAddressCreate, { data, loading }] = useMutation(
        ADDRESS_CREATE,
    );

    const [
        customerDefaultAddressUpdate,
        { loading: loadingDefaultAddressUpdate },
    ] = useMutation(SET_DEFAULT_ADDRESS);

    const [
        customerAddressDelete,
        { loading: loadingAddressDelete },
    ] = useMutation(DELETE_ADDRESS);

    const [
        customerAddressUpdate,
        { loading: loadingAddressUpdate },
    ] = useMutation(UPDATE_ADDRESS);

    const handleSubmit = (data: IHandleSubmit) => {
        customerAddressCreate({
            variables: {
                customerAccessToken: cookies.customerAccessTokenCreate,
                address: data,
            },
        });
    };

    const handleDelete = (id: string) => {
        customerAddressDelete({
            variables: {
                id,
                customerAccessToken: cookies.customerAccessTokenCreate,
            },
        });

        window.location.reload();
    };

    const handleUpdate = (
        id: string,
        address: IHandleSubmit,
        defaultEdit: boolean,
    ) => {
        customerAddressUpdate({
            variables: {
                id,
                address,
                customerAccessToken: cookies.customerAccessTokenCreate,
            },
        });

        if (defaultEdit) {
            customerDefaultAddressUpdate({
                variables: {
                    customerAccessToken: cookies.customerAccessTokenCreate,
                    addressId: id,
                },
            });
        }

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const handleMutationError = () => {
        if (data?.customerAddressCreate?.customerUserErrors[0]) {
            const errorDetect =
                data?.customerAddressCreate?.customerUserErrors[0];
            return [
                {
                    key: errorDetect.__typename,
                    value: errorDetect.message,
                },
            ];
        } else {
            return null;
        }
    };

    if (data && data.customerAddressCreate) {
        const { customerAddress } = data.customerAddressCreate;

        if (customerAddress && customerAddress.id) {
            if (defaultAddress) {
                customerDefaultAddressUpdate({
                    variables: {
                        customerAccessToken: cookies.customerAccessTokenCreate,
                        addressId: customerAddress.id,
                    },
                });
            }
            window.location.reload();
        }
    }

    return (
        <MyContext.Provider
            value={{
                addresses: processedAddresses(dataAddress),
                handleSubmit,
                loading:
                    loading ||
                    loadingAddressUpdate ||
                    loadingAddressDelete ||
                    loadingDefaultAddressUpdate,
                userError: handleMutationError(),
                setDefaultAddress,
                defaultAddress,
                handleDelete,
                handleUpdate,
            }}>
            {children}
        </MyContext.Provider>
    );
}

export function withAccountAddressContext<T>(
    Component: ComponentType<T>,
): FC<T> {
    const withAccountAddressContext: FC<T> = (props: T) => (
        <AccountAddressContextProvider>
            <Component {...props} />
        </AccountAddressContextProvider>
    );
    return withAccountAddressContext;
}

export const useAccountAddressContext = (): ContextType =>
    useContext(MyContext);
