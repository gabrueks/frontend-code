import React, {
    ChangeEventHandler,
    Dispatch,
    FC,
    ReactElement,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";
import { TFunction, useTranslation } from "react-i18next";

import { Form, Input, Select } from "./styles";

import { Address } from "../../contexts/AccountAddress/interface";

import deepEqual from "../../helpers/object/deepEqual";
import cepMask, { cepMaskEventHandler } from "../../helpers/mask/cepMask";
import phoneMask, { phoneMaskEventHandler } from "../../helpers/mask/phoneMask";

import useUpToDataRef from "../../hooks/useUpToDataRef";

import { TGetCountriesAndProvincesResponse } from "../../services/address";

export type TAddressFields = Omit<
    Address,
    "__typename" | "countryCodeV2" | "provinceCode"
> & { addressNumber?: string };

export type TAddressFormProps = {
    countryData?: TGetCountriesAndProvincesResponse;
    initAddress: TAddressFields | null;
    savedAddresses: TAddressFields[];
    callback?: (formData: TAddressFields) => void;
    errors: Set<keyof TAddressFields>;
    setErrors: Dispatch<SetStateAction<Set<keyof TAddressFields>>>;
};

const emptyAddress = (t: TFunction<"translation">): TAddressFields => ({
    address1: "",
    address2: "",
    addressNumber: "",
    city: "",
    company: "",
    country: "",
    firstName: "",
    formatted: [],
    id: t("checkout.fields.id.useNewAddress.value"),
    lastName: "",
    phone: "",
    province: "",
    zip: "",
});

export function validateAddressForm(
    data?: TAddressFields,
): boolean | (keyof TAddressFields)[] {
    if (!data) return false;

    const fieldsNeeded = [
        "address1",
        "addressNumber",
        "city",
        "company",
        "country",
        "firstName",
        "lastName",
        "phone",
        "province",
        "zip",
    ] as (keyof TAddressFields)[];
    if (fieldsNeeded.some((fld) => !data[fld])) {
        const fieldsList: (keyof TAddressFields)[] = [];
        fieldsNeeded.forEach((fld) => {
            if (!data[fld]) fieldsList.push(fld);
        });
        return fieldsList;
    }
    return true;
}

function parseData(data: TAddressFields) {
    let temp: keyof TAddressFields;
    for (temp in data) {
        if (data[temp] === null) data[temp] = "";
    }
    if (data.address1) {
        const match = data.address1.match(/\d+$/g);
        if (match) {
            const newAddress = data.address1.replace(match[0], "").trimEnd();
            data.address1 = newAddress;
            data.addressNumber = match[0];
        }
    }
    if (data.phone) data.phone = phoneMask(data.phone);
    if (data.zip) data.zip = cepMask(data.zip);
}

function checkIfExists(
    t: TFunction<"translation">,
    data: TAddressFields,
    savedAddresses: TAddressFields[],
) {
    let changed = false;
    const common = {
        id: null,
        formatted: null,
        addressNumber: null,
        countryCodeV2: null,
        latitude: null,
        longitude: null,
    };
    const parseAddress1 = ({ address1, addressNumber }: TAddressFields) =>
        `${address1}${addressNumber ? ` ${addressNumber}` : ""}`;
    savedAddresses.forEach((addr) => {
        if (
            deepEqual(
                {
                    ...addr,
                    ...common,
                    address1: parseAddress1(addr),
                },
                {
                    ...data,
                    ...common,
                    address1: parseAddress1(data),
                },
            )
        ) {
            data.id = addr.id;
            data.formatted = addr.formatted;
            changed = true;
        }
    });
    if (!changed) data.id = t("checkout.fields.id.useNewAddress.value");
}

const AddressForm: FC<TAddressFormProps> = ({
    countryData,
    initAddress,
    savedAddresses,
    callback,
    errors,
    setErrors,
}): ReactElement => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<TAddressFields>(() => {
        const temp = {
            ...(initAddress ?? savedAddresses[0] ?? emptyAddress(t)),
        };
        parseData(temp);
        checkIfExists(t, temp, savedAddresses);
        return temp;
    });

    const formDataRef = useUpToDataRef(formData);
    const callbackRef = useRef(callback);
    useEffect(() => {
        if (callbackRef.current) callbackRef.current(formData);
    }, [formData]);

    const handleChange: ChangeEventHandler<
        HTMLInputElement | HTMLSelectElement
    > = (event) => {
        let newFormData = {
            ...formDataRef.current,
            [event.target.name]: event.target.value,
        };
        setErrors((prev) => {
            const temp = new Set([...prev]);
            temp.delete(event.target.name as keyof TAddressFields);
            return temp;
        });
        if (newFormData.id !== formDataRef.current.id) {
            newFormData = {
                ...(savedAddresses.find((addr) => addr.id === newFormData.id) ??
                    emptyAddress(t)),
            };
            parseData(newFormData);
        } else if (
            newFormData.id === t("checkout.fields.id.useNewAddress.value")
        ) {
            checkIfExists(t, newFormData, savedAddresses);
        } else {
            newFormData.id = t("checkout.fields.id.useNewAddress.value");
            newFormData.formatted = [];
        }

        setFormData(newFormData);
    };

    const renderCountries = () => {
        return (
            countryData &&
            countryData.map((ct, idx) => (
                <option key={idx} value={ct.name}>
                    {ct.name}
                </option>
            ))
        );
    };

    const renderProvinces = () => {
        return (
            countryData &&
            formData.country &&
            (
                countryData.find((ct) => ct.name === formData.country)
                    ?.provinces ?? []
            ).map((prv, idx) => (
                <option key={idx} value={prv.name}>
                    {prv.name}
                </option>
            ))
        );
    };

    return (
        <Form noValidate>
            <div>
                <Select>
                    <label>{t("checkout.fields.id.label")}</label>
                    <select
                        name="id"
                        value={formData.id}
                        onChange={handleChange}>
                        {savedAddresses.map((addr, idx) => (
                            <option key={idx} value={addr.id}>
                                {addr.formatted.join(", ")}
                            </option>
                        ))}
                        <option
                            value={String(
                                t("checkout.fields.id.useNewAddress.value"),
                            )}>
                            {t("checkout.fields.id.useNewAddress.label")}
                        </option>
                    </select>
                </Select>
            </div>
            <div>
                <Input error={!!errors && !!errors.has("firstName")}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder={t("checkout.fields.firstName")}
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <label>{t("checkout.fields.firstName")}</label>
                    {errors && errors.has("firstName") && (
                        <span>{t("checkout.errors.firstName")}</span>
                    )}
                </Input>
                <Input error={!!errors && !!errors.has("lastName")}>
                    <input
                        type="text"
                        name="lastName"
                        placeholder={t("checkout.fields.lastName")}
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <label>{t("checkout.fields.lastName")}</label>
                    {errors && errors.has("lastName") && (
                        <span>{t("checkout.errors.lastName")}</span>
                    )}
                </Input>
            </div>
            <div>
                <Input error={!!errors && !!errors.has("company")}>
                    <input
                        type="text"
                        name="company"
                        placeholder={t("checkout.fields.company")}
                        value={formData.company}
                        onChange={handleChange}
                    />
                    <label>{t("checkout.fields.company")}</label>
                    {errors && errors.has("company") && (
                        <span>{t("checkout.errors.company")}</span>
                    )}
                </Input>
            </div>
            <div>
                <Input error={!!errors && !!errors.has("address1")}>
                    <input
                        type="text"
                        name="address1"
                        placeholder={t("checkout.fields.address1")}
                        value={formData.address1}
                        onChange={handleChange}
                    />
                    <label>{t("checkout.fields.address1")}</label>
                    {errors && errors.has("address1") && (
                        <span>{t("checkout.errors.address1")}</span>
                    )}
                </Input>
            </div>
            <div>
                <Input error={!!errors && !!errors.has("addressNumber")}>
                    <input
                        type="text"
                        name="addressNumber"
                        placeholder={t("checkout.fields.addressNumber")}
                        value={formData.addressNumber}
                        onChange={handleChange}
                    />
                    <label>{t("checkout.fields.addressNumber")}</label>
                    {errors && errors.has("addressNumber") && (
                        <span>{t("checkout.errors.addressNumber")}</span>
                    )}
                </Input>
                <Input>
                    <input
                        type="text"
                        name="address2"
                        placeholder={t("checkout.fields.address2")}
                        value={formData.address2}
                        onChange={handleChange}
                    />
                    <label>{t("checkout.fields.address2")}</label>
                </Input>
            </div>
            <div>
                <Input error={!!errors && !!errors.has("city")}>
                    <input
                        type="text"
                        name="city"
                        placeholder={t("checkout.fields.city")}
                        value={formData.city}
                        onChange={handleChange}
                    />
                    <label>{t("checkout.fields.city")}</label>
                    {errors && errors.has("city") && (
                        <span>{t("checkout.errors.city")}</span>
                    )}
                </Input>
            </div>
            <div>
                <Select>
                    <label>{t("checkout.fields.country")}</label>
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}>
                        <option value="" disabled></option>
                        {renderCountries()}
                    </select>
                </Select>
                <Select>
                    <label>{t("checkout.fields.province")}</label>
                    <select
                        name="province"
                        value={formData.province}
                        onChange={handleChange}>
                        <option value="" disabled></option>
                        {renderProvinces()}
                    </select>
                </Select>
                <Input>
                    <input
                        type="text"
                        name="zip"
                        placeholder={t("checkout.fields.zip")}
                        value={formData.zip}
                        onChange={(event) =>
                            handleChange(cepMaskEventHandler(event))
                        }
                    />
                    <label>{t("checkout.fields.zip")}</label>
                </Input>
            </div>
            <div>
                <Input error={!!errors && !!errors.has("phone")}>
                    <input
                        type="text"
                        name="phone"
                        placeholder={t("checkout.fields.phone")}
                        value={formData.phone}
                        onChange={(event) =>
                            handleChange(phoneMaskEventHandler(event))
                        }
                    />
                    <label>{t("checkout.fields.phone")}</label>
                    {errors && errors.has("phone") && (
                        <span>{t("checkout.errors.phone")}</span>
                    )}
                </Input>
            </div>
        </Form>
    );
};

export default AddressForm;
