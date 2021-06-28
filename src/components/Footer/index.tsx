import React from "react";
import { useHistory } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { routes } from "../../routes";
import {
    Container,
    FooterContent,
    FooterItem,
    Text,
    TextBold,
    FooterAbout,
    Flags,
    FooterName,
} from "./styles";

function Footer(): React.ReactElement {
    const { t } = useTranslation();
    const history = useHistory();

    return (
        <Container>
            <div className="page-width">
                <FooterContent>
                    <FooterItem>
                        <TextBold>{t("footer.textDolado")}</TextBold>
                        <Text>{t("footer.doladoNumber")}</Text>
                        <Text>{t("footer.doladoEmail")}</Text>
                    </FooterItem>

                    <FooterItem paddingLeft>
                        <Text style={{ marginTop: 50, marginBottom: 20 }}>
                            {t("footer.doladoAddress")}
                        </Text>
                        <Text>{t("footer.doladoCnpj")}</Text>
                    </FooterItem>

                    <FooterItem paddingLeft>
                        <TextBold>{t("footer.links")}</TextBold>
                        <a onClick={() => history.push(routes.SEARCH)}>
                            <Text>{t("footer.search")}</Text>
                        </a>
                        <a
                            onClick={() =>
                                history.push(routes.TERMS_OF_SERVICE)
                            }>
                            <Text>{t("footer.termsOfService")}</Text>
                        </a>
                        <a onClick={() => history.push(routes.REFUND_POLICY)}>
                            <Text>{t("footer.refundPolicy")}</Text>
                        </a>
                        <a onClick={() => history.push(routes.PRIVACY_POLICY)}>
                            <Text>{t("footer.privacyPolicy")}</Text>
                        </a>
                    </FooterItem>
                </FooterContent>
            </div>
            <hr className="site-footer__hr" />
            <div className="page-width">
                <FooterAbout>
                    <Flags>
                        <img src="/amex.svg" alt="amex" />
                        <img src="/mastercard.svg" alt="mastercard" />
                        <img src="/paypal.svg" alt="paypal" />
                        <img src="/visa.svg" alt="visa" />
                    </Flags>
                    <FooterName>
                        <span>
                            {t("footer.copyrightDolado")}{" "}
                            <a
                                target="_blank"
                                href="https://pt.shopify.com/?utm_campaign=poweredby&utm_medium=shopify&utm_source=onlinestore"
                                rel="noreferrer">
                                {t("footer.shopify")}
                            </a>
                        </span>
                    </FooterName>
                </FooterAbout>
            </div>
        </Container>
    );
}

export default Footer;
