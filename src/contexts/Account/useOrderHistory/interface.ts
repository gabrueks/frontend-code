import { TOrderAddress } from "../useOrderDetail/interface";

export type TLineItem = {
    id: string;
    sku: string;
    title: string;
    quantity: number;
    buySimilar:
        | {
              key: string;
              value: string;
          }
        | undefined;
    totalPrice: string;
    price: string;
};

export type TOrder = {
    name: string;
    createdAt: string;
    canceledAt: string | null;
    cancelReason: string | null;
    financialStatus: string;
    fulfillmentStatus: string;
    totalPrice: string;
    subtotalPrice: string;
    totalShippingPrice: string;
    shippingAddress: TOrderAddress;
    lineItems: TLineItem[];
};

export type TOrderQuery = {
    customer: {
        orders: {
            edges: {
                node: {
                    financialStatus: string;
                    fulfillmentStatus: string;
                    name: string;
                    processedAt: string;
                    canceledAt: string | null;
                    cancelReason: string | null;
                    totalPriceV2: {
                        amount: string;
                    };
                    totalShippingPriceV2: {
                        amount: string;
                    };
                    subtotalPriceV2: {
                        amount: string;
                    };
                    shippingAddress: {
                        address1: string;
                        address2: string;
                        city: string;
                        company: string;
                        country: string;
                        name: string;
                        provinceCode: string;
                        zip: string;
                    };
                    lineItems: {
                        edges: {
                            node: {
                                title: string;
                                quantity: number;
                                customAttributes: {
                                    // TODO: conferir se buySimilar vem aqui mesmo
                                    key: string;
                                    value: string;
                                }[];
                                discountedTotalPrice: {
                                    amount: string;
                                };
                                variant: {
                                    id: string;
                                    sku: string;
                                    title: string;
                                    priceV2: {
                                        amount: string;
                                    };
                                };
                            };
                        }[];
                    };
                };
            }[];
        };
    };
};

export type TUseOrderHistory = {
    orders: TOrder[];
    loading: boolean;
    hasFinancialStatusPending?: boolean;
};
