import { Address } from "../../AccountAddress/interface";
import { TUseCustomerInfo } from "../useCustomerInfo/interface";

export const INITIAL_DEFAULT_ADDRESS = {
    address1: "",
    address2: "",
    city: "",
    company: "",
    country: "",
    countryCodeV2: "",
    firstName: "",
    id: "",
    lastName: "",
    phone: "",
    province: "",
    provinceCode: "",
    zip: "",
    formatted: [],
    __typename: "",
};

export type TProps = {
    customer: TUseCustomerInfo["customer"];
};

export type TUseCustomerAddress = {
    defaultAddress: Address;
    countAddresses: number;
    addresses: Address[];
};
