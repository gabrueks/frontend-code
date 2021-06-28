import { TLineItem, TOrder } from "../useOrderHistory/interface";

export type TProps = {
    orders: TOrder[];
};

export type TOrderAddress = {
    name: string;
    address1: string;
    address2: string;
    city: string;
    provinceCode: string;
    zip: string;
    country: string;
    company: string;
};

export type TUseOrderDetail = {
    orderData?: {
        id: string;
        createdAt: string;
        canceledAt: string | null;
        cancelReason: string | null;
        lineItems: TLineItem[];
        totalPrice: string;
        subtotalPrice: string;
        totalShippingPrice: string;
        financialStatus: string;
        fulfillmentStatus: string;
        shippingAddress: TOrderAddress;
        billingAddress: TOrderAddress;
    };
};
