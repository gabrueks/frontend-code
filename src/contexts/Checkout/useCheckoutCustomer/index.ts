import { useEffect } from "react";
import { useMutation } from "@apollo/client";

import {
    TUseCheckoutCustomerProps,
    TUseCheckoutCustomerResponse,
} from "./interface";

import * as Graphql from "../../../graphql/Checkout/Customer";

export default function useCheckoutLineItems({
    checkoutInfo,
    customerAccessTokenCreate,
    currentCustomer,
    onCompleted,
}: TUseCheckoutCustomerProps): TUseCheckoutCustomerResponse {
    const [emailUpdate, emailUpdateResult] = useMutation<
        Graphql.TCheckoutEmailUpdateResponse,
        Graphql.TCheckoutEmailUpdateVariable
    >(Graphql.CHECKOUT_EMAIL_UPDATE, { fetchPolicy: "no-cache", onCompleted });

    const [customerAssociate, customerAssociateResult] = useMutation<
        Graphql.TCheckoutCustomerAssociateResponse,
        Graphql.TCheckoutCustomerAssociateVariable
    >(Graphql.CHECKOUT_CUSTOMER_ASSOCIATE, {
        fetchPolicy: "no-cache",
        onCompleted,
    });

    const [customerDisassociate, customerDisassociateResult] = useMutation<
        Graphql.TCheckoutCustomerDisassociateResponse,
        Graphql.TCheckoutCustomerDisassociateVariable
    >(Graphql.CHECKOUT_CUSTOMER_DISASSOCIATE, {
        fetchPolicy: "no-cache",
        onCompleted,
    });

    const updateEmail: TUseCheckoutCustomerResponse["updateEmail"] = async (
        newEmail,
    ) => {
        try {
            if (checkoutInfo) {
                await emailUpdate({
                    variables: {
                        checkoutId: checkoutInfo.id,
                        email: newEmail,
                    },
                });
            }
        } catch {
            //
        }
    };

    const associateCustomer = async () => {
        try {
            if (checkoutInfo && customerAccessTokenCreate) {
                await customerAssociate({
                    variables: {
                        checkoutId: checkoutInfo.id,
                        customerAccessToken: customerAccessTokenCreate,
                    },
                });
            }
        } catch {
            //
        }
    };

    const disassociateCustomer = async () => {
        try {
            if (checkoutInfo) {
                currentCustomer.current = undefined;
                await emailUpdate({
                    variables: {
                        checkoutId: checkoutInfo.id,
                        email: "",
                    },
                });
                await customerDisassociate({
                    variables: { checkoutId: checkoutInfo.id },
                });
            }
        } catch {
            //
        }
    };

    useEffect(() => {
        if (checkoutInfo) {
            if (customerAccessTokenCreate && !currentCustomer.current) {
                customerAssociate({
                    variables: {
                        checkoutId: checkoutInfo.id,
                        customerAccessToken: customerAccessTokenCreate,
                    },
                });
            } else if (!customerAccessTokenCreate && currentCustomer.current) {
                currentCustomer.current = undefined;
                customerDisassociate({
                    variables: { checkoutId: checkoutInfo.id },
                });
            }
        }
    }, [
        customerAccessTokenCreate,
        currentCustomer,
        checkoutInfo,
        customerAssociate,
        customerDisassociate,
    ]);

    return {
        loading: {
            customerAssociateLoading: customerAssociateResult.loading,
            customerDisassociateLoading: customerDisassociateResult.loading,
            emailUpdateLoading: emailUpdateResult.loading,
        },
        error: {
            customerAssociateError: customerAssociateResult.error,
            customerDisassociateError: customerDisassociateResult.error,
            emailUpdateError: emailUpdateResult.error,
        },
        updateEmail,
        associateCustomer,
        disassociateCustomer,
    };
}
