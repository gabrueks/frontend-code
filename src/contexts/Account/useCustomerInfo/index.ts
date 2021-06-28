import { useCookiesContext } from "../../../contexts/Cookies";
import { useQuery } from "@apollo/client";

import { GET_CUSTOMER_INFO } from "../../../graphql/Account";
import { useCallback } from "react";

import { INITIAL_CUSTOMER_STATE, TUseCustomerInfo } from "./interface";

const useCustomerInfo = (): TUseCustomerInfo => {
    const { cookies } = useCookiesContext();

    const { data, loading } = useQuery(GET_CUSTOMER_INFO, {
        variables: {
            customerAccessToken: cookies.customerAccessTokenCreate,
        },
    });

    const processedCustomer = useCallback(() => {
        if (data && data.customer) {
            const { firstName, lastName, id, email } = data.customer;
            return {
                ...data.customer,
                firstName,
                lastName,
                id,
                email,
            };
        }
        return INITIAL_CUSTOMER_STATE;
    }, [data]);

    return {
        customer: processedCustomer(),
        loading,
    };
};

export default useCustomerInfo;
