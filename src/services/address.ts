import api from "../config/api";

import mockedData from "./addressData.json";

export type TGetCountriesAndProvincesResponse = {
    code: string;
    id: number;
    name: string;
    provinces: {
        id: number;
        country_id: number;
        name: string;
        code: string;
        tax: number;
        tax_name: string;
        tax_type: string | null;
        shipping_zone_id: number | null;
        tax_percentage: number;
    }[];
    tax: number;
    tax_name: string;
}[];

export async function getCountriesAndProvinces(): Promise<TGetCountriesAndProvincesResponse> {
    try {
        // const { data } = await api.get(`/countries?isProduction=${"true"}`);

        // if (data.data.countries) return data.data.countries;

        // return [];
        return mockedData;
    } catch (error) {
        return error;
    }
}
