import { useQuery } from "@apollo/client";

import { GET_CUSTOMER_ORDER_HISTORY } from "../../../graphql/Account";
import parseOrderData from "../../../helpers/parse/parseOrderData";
import { useCookiesContext } from "../../Cookies";

import { TOrderQuery, TUseOrderHistory } from "./interface";

const useOrderHistory = (): TUseOrderHistory => {
    const { cookies } = useCookiesContext();
    const { data, loading, error } = useQuery<TOrderQuery>(
        GET_CUSTOMER_ORDER_HISTORY,
        {
            variables: {
                customerAccessToken: cookies.customerAccessTokenCreate,
            },
        },
    );

    const processedOrderHist = () => {
        if (error) {
            console.log(error);
        }
        if (data?.customer?.orders) {
            return parseOrderData(data.customer.orders.edges);
        }
        return [];
    };
    return {
        orders: processedOrderHist(),
        loading,
    };
};

export default useOrderHistory;
