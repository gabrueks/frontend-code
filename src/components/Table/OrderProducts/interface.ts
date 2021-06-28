import { ReactElement } from "react";
import { TLineItem } from "../../../contexts/Account/useOrderHistory/interface";

export type TColumn = {
    acessor: string;
    allocation: keyof TLineItem | (keyof TLineItem)[];
    renderItem: (args: any, acessor: string, idx: number) => ReactElement; // TODO: tirar any
};

export type TProps = {
    totalPrice: string;
    subtotalPrice: string;
    totalShippingPrice: string;
    products: TLineItem[];
};
