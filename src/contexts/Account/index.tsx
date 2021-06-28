import React, { useContext, FC, ComponentType } from "react";

import { ContextType } from "./interface";

import useCustomerInfo from "./useCustomerInfo";
import useCustomerAddress from "./useCustomerAddress";
import { INITIAL_CUSTOMER_STATE } from "./useCustomerInfo/interface";
import { INITIAL_DEFAULT_ADDRESS } from "./useCustomerAddress/interface";
import useOrderHistory from "./useOrderHistory";
import useOrderDetail from "./useOrderDetail";

interface Props {
    children: React.ReactNode;
}

const AccountContext = React.createContext<ContextType>({
    customer: INITIAL_CUSTOMER_STATE,
    defaultAddress: INITIAL_DEFAULT_ADDRESS,
    countAddresses: 0,
    addresses: [],
    orders: [],
    orderData: undefined,
    loading: true,
    hasFinancialStatusPending: false,
});

export default function AccountContextProvider({
    children,
}: Props): React.ReactElement {
    const { customer, loading } = useCustomerInfo();
    const { addresses, defaultAddress, countAddresses } = useCustomerAddress({
        customer,
    });
    const { orders, loading: loadingOrderHist } = useOrderHistory();
    const { orderData } = useOrderDetail({ orders });

    const existPaymentPending = (): boolean => {
        return orders?.some((element) => {
            return element.financialStatus === "Pending";
        });
    };

    return (
        <AccountContext.Provider
            value={{
                customer,
                addresses,
                defaultAddress,
                countAddresses,
                orders,
                orderData,
                loading: loading || loadingOrderHist,
                hasFinancialStatusPending: existPaymentPending(),
            }}>
            {children}
        </AccountContext.Provider>
    );
}

export function withAccountContext<T>(Component: ComponentType<T>): FC<T> {
    const withAccountContext: FC<T> = (props: T) => (
        <AccountContextProvider>
            <Component {...props} />
        </AccountContextProvider>
    );
    return withAccountContext;
}

export const useAccountContext = (): ContextType => useContext(AccountContext);
