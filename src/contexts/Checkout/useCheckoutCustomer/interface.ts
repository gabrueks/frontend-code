import { MutableRefObject } from "react";
import { ApolloError } from "@apollo/client";

import { Cookies, TCheckout } from "../interface";

import { TCheckoutDefaultResponse } from "../../../graphql/Checkout/interface";
import { TCheckoutEmailUpdateVariable } from "../../../graphql/Checkout/Customer";

export type TUseCheckoutCustomerProps = {
    checkoutInfo?: TCheckout;
    customerAccessTokenCreate: Cookies["customerAccessTokenCreate"];
    currentCustomer: MutableRefObject<{ id: string } | undefined>;
    onCompleted: (data: Record<string, TCheckoutDefaultResponse>) => void;
};

export type TUseCheckoutCustomerResponse = {
    loading: {
        customerAssociateLoading: boolean;
        customerDisassociateLoading: boolean;
        emailUpdateLoading: boolean;
    };
    error: {
        customerAssociateError?: ApolloError;
        customerDisassociateError?: ApolloError;
        emailUpdateError?: ApolloError;
    };
    updateEmail: (
        newEmail: TCheckoutEmailUpdateVariable["email"],
    ) => Promise<void>;
    associateCustomer: () => Promise<void>;
    disassociateCustomer: () => Promise<void>;
};
