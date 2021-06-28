import React, { lazy, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import {
    useAccountAddressContext,
    withAccountAddressContext,
} from "../../contexts/AccountAddress";

import AddressComponent from "./Address";

import {
    Container,
    Title,
    GoBack,
    ButtonAddress,
    SectionHeader,
    ListOfAddresses,
} from "./styles";

const Form = lazy(() => import("./Form"));

const AccountAddresses: React.FC = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const {
        handleSubmit,
        loading,
        userError,
        defaultAddress,
        setDefaultAddress,
        handleDelete,
        handleUpdate,
        addresses,
    } = useAccountAddressContext();

    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="page-width">
            <Container>
                <SectionHeader>
                    <Title>{t("account.addresses.title")}</Title>

                    <GoBack onClick={() => history.goBack()}>
                        <span>{t("account.addresses.goBack")}</span>
                    </GoBack>

                    <ButtonAddress onClick={() => setIsVisible(!isVisible)}>
                        <span>{t("account.addresses.addNewAddress")}</span>
                    </ButtonAddress>
                </SectionHeader>

                {isVisible && (
                    <Form
                        handleSubmit={handleSubmit}
                        loading={loading}
                        userError={userError}
                        defaultAddress={defaultAddress}
                        setDefaultAddress={setDefaultAddress}
                    />
                )}

                {Array.isArray(addresses) &&
                    addresses.map((item, index) => (
                        <ListOfAddresses key={index}>
                            <AddressComponent
                                data={item}
                                handleDelete={handleDelete}
                                handleUpdate={handleUpdate}
                            />
                        </ListOfAddresses>
                    ))}
            </Container>
        </div>
    );
};

export default withAccountAddressContext(AccountAddresses);
