import { TFunction } from "react-i18next";
import { Address } from "../../contexts/AccountAddress/interface";
interface Provinces {
    code: string;
    country_id: number;
    id: number;
    name: string;
    shipping_zone_id: null | number;
    tax: number;
    tax_name: string;
    tax_percentage: number;
    tax_type: null | string;
}

export interface Country {
    code: string;
    id: number;
    name: string;
    provinces: Provinces[];
    tax: number;
    tax_name: string;
}

export interface IUserError {
    key: string;
    value: string;
}

export interface IHandleSubmit {
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    city: string;
    country: string;
    province: string;
    zip: string;
    phone: string;
}
export interface PropsAddressComponent {
    data: Address;
    handleDelete: (id: string) => true;
    handleUpdate: (
        id: string,
        address: IHandleSubmit,
        defaultEdit: boolean,
    ) => true;
}

export function validationData(
    data: IHandleSubmit,
    t: TFunction<"translation">,
): any[] {
    const valid = [];

    if (data.address1 === "" || !data.address1)
        valid.push({
            key: "address",
            value: t("account.addresses.form.address"),
        });

    if (data.firstName === "" || !data.firstName)
        valid.push({
            key: "firstName",
            value: t("account.addresses.form.firstName"),
        });

    if (data.lastName === "" || !data.lastName)
        valid.push({
            key: "lastName",
            value: t("account.addresses.form.lastName"),
        });

    if (data.city === "" || !data.city)
        valid.push({
            key: "city",
            value: t("account.addresses.form.city"),
        });

    if (data.country === "" || !data.country)
        valid.push({
            key: "country",
            value: t("account.addresses.form.country"),
        });

    if (data.province === "" || !data.province)
        valid.push({
            key: "province",
            value: t("account.addresses.form.province"),
        });

    if (data.zip === "" || !data.zip)
        valid.push({
            key: "zip",
            value: t("account.addresses.form.zip"),
        });

    if (data.phone === "" || !data.phone)
        valid.push({
            key: "phone",
            value: t("account.addresses.form.phone"),
        });

    return valid;
}
