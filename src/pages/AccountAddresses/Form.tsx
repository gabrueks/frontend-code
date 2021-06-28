import React, { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import Info from "../../components/Error/Info";
import Loading from "../../components/Loading";
import { Address } from "../../contexts/AccountAddress/interface";

import { getCountriesAndProvinces } from "../../services/address";
import {
    Country,
    IUserError,
    IHandleSubmit,
    validationData,
} from "./interface";

import {
    Label,
    Input,
    GoBack,
    ButtonAddress,
    AddressForm,
    WrapperInput,
} from "./styles";
interface Props {
    addressToUpdate?: Address;
    handleUpdate?: (
        id: string,
        address: IHandleSubmit,
        defaultEdit: boolean,
    ) => any;
    handleSubmit?: (data: IHandleSubmit) => any;
    loading: boolean;
    userError: IUserError[] | null;
    defaultAddress: boolean;
    setDefaultAddress: any;
}

const Form: React.FC<Props> = ({
    addressToUpdate,
    handleSubmit,
    handleUpdate,
    loading,
    userError,
    defaultAddress,
    setDefaultAddress,
}) => {
    const { t } = useTranslation(); //.addresses.form
    const history = useHistory();

    const [selectData, setSelectData] = useState<Country[]>([]);
    const [fieldsError, setFieldsError] = useState<IUserError[]>([]);

    const [data, setData] = useState({
        firstName: addressToUpdate?.firstName ?? "",
        lastName: addressToUpdate?.lastName ?? "",
        company: addressToUpdate?.company ?? "",
        address1: addressToUpdate?.address1 ?? "",
        address2: addressToUpdate?.address2 ?? "",
        city: addressToUpdate?.city ?? "",
        country: addressToUpdate?.country ?? "",
        province: addressToUpdate?.province ?? "",
        zip: addressToUpdate?.zip ?? "",
        phone: addressToUpdate?.phone ?? "",
    });

    const countrySelect =
        Array.isArray(selectData) &&
        selectData?.filter((country) => country?.name === data.country);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        if (Array.isArray(fieldsError) && fieldsError.length > 0)
            setFieldsError([]);

        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const submitForm = () => {
        const validation = validationData(data, t);

        if (Array.isArray(validation) && validation.length > 0) {
            setFieldsError(validation);
        } else {
            if (handleSubmit) handleSubmit(data);
            if (handleUpdate)
                handleUpdate(addressToUpdate?.id || "", data, defaultAddress);
        }
    };

    const handleShowInfo = () => {
        if (Array.isArray(fieldsError) && fieldsError.length > 0)
            return <Info errors={fieldsError} />;

        if (userError) return <Info errors={userError} />;
    };

    useEffect(() => {
        async function getDate() {
            const response = await getCountriesAndProvinces();
            setSelectData(response);
        }

        getDate();
    }, []);

    return (
        <AddressForm>
            <h2>
                {addressToUpdate
                    ? t("account.addresses.form.titleUpdate")
                    : t("account.addresses.form.title")}
            </h2>

            {handleShowInfo()}

            <div className="row columnMobile">
                <WrapperInput>
                    <Label>{t("account.addresses.form.firstName")}</Label>
                    <Input
                        value={data.firstName}
                        onChange={handleChange}
                        name="firstName"
                        required
                    />
                </WrapperInput>

                <WrapperInput style={{ paddingLeft: 30 }}>
                    <Label>{t("account.addresses.form.lastName")}</Label>
                    <Input
                        value={data.lastName}
                        onChange={handleChange}
                        name="lastName"
                        required
                    />
                </WrapperInput>
            </div>

            <Label>{t("account.addresses.form.company")}</Label>
            <Input
                value={data.company}
                onChange={handleChange}
                name="company"
            />

            <Label>{t("account.addresses.form.addressStore")}</Label>
            <Input
                value={data.address1}
                onChange={handleChange}
                name="address1"
                required
            />

            <Label>{t("account.addresses.form.type")}</Label>
            <Input
                value={data.address2}
                onChange={handleChange}
                name="address2"
            />

            <div className="row columnMobile">
                <WrapperInput>
                    <Label>{t("account.addresses.form.city")}</Label>
                    <Input
                        value={data.city}
                        onChange={handleChange}
                        name="city"
                        required
                    />
                </WrapperInput>

                <WrapperInput style={{ paddingLeft: 30 }}>
                    <Label>{t("account.addresses.form.country")}</Label>
                    <select
                        onChange={handleChange}
                        name="country"
                        value={data?.country}>
                        <option key={0} value="" disabled>
                            {t("account.addresses.form.country")}
                        </option>
                        {Array.isArray(selectData) &&
                            selectData?.map((country) => (
                                <option key={country.id} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                    </select>
                </WrapperInput>
            </div>

            <Label>{t("account.addresses.form.state")}</Label>
            <select
                style={{ marginBottom: 19 }}
                onChange={handleChange}
                name="province"
                value={data?.province}
                disabled={!data.country || data.country === ""}>
                <option key={0} value="" disabled>
                    {t("account.addresses.form.state")}
                </option>

                {Array.isArray(countrySelect) &&
                    countrySelect[0]?.provinces.map((province) => (
                        <option key={province.id} value={province.name}>
                            {province.name}
                        </option>
                    ))}
            </select>

            <Label>{t("account.addresses.form.zipCode")}</Label>
            <Input
                pattern="[0-9]*"
                onChange={handleChange}
                name="zip"
                required
                value={data.zip}
            />

            <Label>{t("account.addresses.form.phone")}</Label>
            <Input
                type="number"
                pattern="[0-9]*"
                onChange={handleChange}
                name="phone"
                required
                value={data.phone}
            />

            <div className="row" style={{ marginBottom: 10 }}>
                <Input
                    checked={defaultAddress}
                    onChange={(e) => setDefaultAddress(e.target.checked)}
                    style={{
                        marginBottom: 4,
                        padding: 0,
                        marginRight: 10,
                    }}
                    type="checkbox"
                />
                <label style={{ margin: 0 }}>
                    {t("account.addresses.form.checkboxText")}
                </label>
            </div>

            {loading ? (
                <Loading />
            ) : (
                <ButtonAddress onClick={submitForm}>
                    <span>
                        {addressToUpdate
                            ? t("account.addresses.form.updateAddress")
                            : t("account.addresses.form.addAddress")}
                    </span>
                </ButtonAddress>
            )}

            <GoBack
                style={{ marginTop: 20, width: "fit-content" }}
                onClick={() => history.goBack()}>
                <span>{t("account.addresses.form.cancel")}</span>
            </GoBack>

            <hr />
        </AddressForm>
    );
};

export default Form;
