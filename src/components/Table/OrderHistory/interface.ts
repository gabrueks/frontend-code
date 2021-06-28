import { ReactElement } from "react";

export type TColumn = {
    acessor: string;
    allocation: keyof TOrder;
    renderItem: (args: any, acessor: string, idx: number) => ReactElement; // TODO: tirar any
};

export type TOrder = {
    name: string;
    createdAt: string;
    financialStatus: string;
    fulfillmentStatus: string;
    totalPrice: string;
};
export type TProps = {
    orders: TOrder[];
};
