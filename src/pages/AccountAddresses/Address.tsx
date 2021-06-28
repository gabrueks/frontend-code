import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Form from "./Form";
import { PropsAddressComponent } from "./interface";
import { Content, Button } from "./styles";

import { IHandleSubmit } from "../../contexts/AccountAddress/interface";

const AddressComponent: React.FC<PropsAddressComponent> = ({
    data,
    handleDelete,
    handleUpdate,
}) => {
    const { t } = useTranslation();
    const [defaultAddress, setDefaultAddress] = useState(false);

    const [isVisible, setIsVisible] = useState(false);
    const confirmDelete = () => {
        const answer = window.confirm(t("account.addresses.component.alert"));

        if (answer) {
            handleDelete(data.id);
        }
    };

    const confirmUpdate = (
        id: string,
        address: IHandleSubmit,
        defaultEdit: boolean,
    ) => {
        handleUpdate(id, address, defaultEdit);
    };

    return (
        <Content key={data.id}>
            {data?.default && (
                <h2>{t("account.addresses.component.default")}</h2>
            )}

            <p>{`${data.firstName} ${data.lastName}`}</p>
            <p>{data.address1}</p>
            <p>{data.address2}</p>
            <p>{`${data.city} ${data.provinceCode}`}</p>
            <p>{data.zip}</p>
            <p>{data.country}</p>

            <div className="row" style={{ justifyContent: "center" }}>
                <Button onClick={() => setIsVisible(!isVisible)}>
                    <span>{t("account.addresses.component.edit")}</span>
                </Button>
                <Button onClick={confirmDelete} secondary>
                    <span>{t("account.addresses.component.delete")}</span>
                </Button>
            </div>

            {isVisible && (
                <Form
                    addressToUpdate={data}
                    handleUpdate={confirmUpdate}
                    loading={false}
                    userError={null}
                    defaultAddress={defaultAddress}
                    setDefaultAddress={setDefaultAddress}
                />
            )}
        </Content>
    );
};

export default AddressComponent;
