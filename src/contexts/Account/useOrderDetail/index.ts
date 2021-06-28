import { routeParams, routes } from "../../../routes";
import { useParams } from "react-router-dom";

import { TProps, TUseOrderDetail } from "./interface";
import { useMemo } from "react";

const useOrderDetail = ({ orders }: TProps): TUseOrderDetail => {
    const { id: encodedOrderName } = useParams<
        routeParams[routes.ACCOUNT_ORDER_DETAIL]
    >();
    const orderName = decodeURIComponent(encodedOrderName);

    const order = useMemo(() => orders.find(({ name }) => name === orderName), [
        orderName,
        orders,
    ]);

    return {
        orderData: order
            ? {
                  id: order?.name,
                  createdAt: order?.createdAt,
                  totalPrice: order?.totalPrice,
                  subtotalPrice: order?.subtotalPrice,
                  totalShippingPrice: order?.totalShippingPrice,
                  financialStatus: order?.financialStatus,
                  fulfillmentStatus: order?.fulfillmentStatus,
                  canceledAt: order?.canceledAt,
                  cancelReason: order?.cancelReason,
                  shippingAddress: order?.shippingAddress,
                  billingAddress: order?.shippingAddress, // TODO: nao existe billingAddress...
                  lineItems: order?.lineItems,
              }
            : undefined,
    };
};

export default useOrderDetail;
