import { AxiosResponse } from "axios";

import api from "../config/api";
import { Address } from "../contexts/AccountAddress/interface";

export type TCreateOrderProps = {
    billing_address: Omit<
        Address,
        | "countryCodeV2"
        | "default"
        | "firstName"
        | "formatted"
        | "id"
        | "lastName"
        | "provinceCode"
        | "__typename"
    > & {
        country_code: string;
        province_code: string;
        first_name: string;
        last_name: string;
    };
    customer: {
        id: number;
    };
    email: string;
    financial_status: "pending";
    line_items: {
        variant_id: number;
        quantity: number;
        price: number;
        properties: {
            name: string;
            value: string | null;
        }[];
    }[];
    note: string;
    note_attributes: {
        name: string;
        value: boolean | string | null;
    }[];
    phone: string;
    shipping_address: Omit<
        Address,
        | "countryCodeV2"
        | "default"
        | "firstName"
        | "formatted"
        | "id"
        | "lastName"
        | "provinceCode"
        | "__typename"
    > & {
        country_code: string;
        province_code: string;
        first_name: string;
        last_name: string;
    };
    // shipping_lines: {
    //     code: string;
    // }[];
    transactions: {
        gateway:
            | "Cartão de crédito"
            | "Boleto para 15 dias"
            | "Boleto para 7 dias";
        kind: "sale";
        amount: string;
    }[];
    discount_codes?: {
        code: string;
        amount: string;
        type: "fixed_amount" | "percentage" | "shipping";
    }[];
};

export type TCreateOrderResponse = {
    id: number;
    name: string;
} | null;

export default async function getCountriesAndProvinces(
    payload: TCreateOrderProps,
): Promise<TCreateOrderResponse> {
    try {
        const response = await api.post<
            TCreateOrderProps,
            AxiosResponse<TCreateOrderResponse>
        >("/orders", { order: payload });
        if (response.status < 300) {
            return response.data;
        }
        throw new Error("Bad Request");
    } catch {
        return null;
    }
}
