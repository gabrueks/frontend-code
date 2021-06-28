import React from "react";
import { useCookiesContext } from "../../contexts/Cookies";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

import Table from "../../components/Table";
import {
    Container,
    Title,
    Logout,
    ButtonAddress,
    GridItem,
    SectionHeader,
    GridMyAccount,
    DefaultAddress,
} from "./styles";

import { useAccountContext, withAccountContext } from "../../contexts/Account";

// TODO: pagination ?
const Account: React.FC = () => {
    const { t } = useTranslation();
    const history = useHistory();

    const { defaultAddress, countAddresses, orders } = useAccountContext();

    const { removeCookie } = useCookiesContext();

    const doLogout = () => {
        removeCookie("customerAccessTokenCreate", { path: "/" });
        history.push("/");
    };

    return (
        <div className="page-width">
            <Container>
                <SectionHeader>
                    <Title>{t("account.title")}</Title>

                    <Logout onClick={doLogout}>
                        <span>{t("account.logout")}</span>
                    </Logout>
                </SectionHeader>

                <GridMyAccount>
                    <GridItem history>
                        <h2>{t("account.history")}</h2>
                        {orders ? (
                            <Table.OrderHistory orders={orders} />
                        ) : (
                            <p>{t("account.empty")}</p>
                        )}
                    </GridItem>

                    <GridItem>
                        <h2>{t("account.infoAccount")}</h2>

                        {defaultAddress && (
                            <DefaultAddress>
                                <p>{`${defaultAddress?.firstName} ${defaultAddress?.lastName}`}</p>
                                <p>{defaultAddress?.address1}</p>
                                <p>{defaultAddress?.address2}</p>
                                <p>{`${defaultAddress?.city} ${defaultAddress?.provinceCode}`}</p>
                                <p>{defaultAddress?.zip}</p>
                                <p>{defaultAddress?.country}</p>
                            </DefaultAddress>
                        )}

                        <ButtonAddress to="/account/addresses">
                            <span>{`${t(
                                "account.seeAddresses",
                            )} (${countAddresses})`}</span>
                        </ButtonAddress>
                    </GridItem>
                </GridMyAccount>
            </Container>
        </div>
    );
};

export default withAccountContext(Account);
