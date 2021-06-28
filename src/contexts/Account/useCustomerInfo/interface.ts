import { Address } from "../../AccountAddress/interface";

export const INITIAL_CUSTOMER_STATE = {
    firstName: "",
    lastName: "",
    id: "",
    email: "",
};

export type TCustomerInfoAddress = {
    defaultAddress?: Address;
    addresses?: {
        edges: {
            node: Address;
        }[];
    };
};

export type TCustomerInfo = {
    firstName: string;
    lastName: string;
    id: string;
    email: string;
};

export type TUseCustomerInfo = {
    customer: TCustomerInfo & TCustomerInfoAddress;
    loading: boolean;
};
