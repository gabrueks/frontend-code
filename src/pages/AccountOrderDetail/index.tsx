import React from "react";
import { useHistory } from "react-router-dom";

import { useAccountContext, withAccountContext } from "../../contexts/Account";
import Table from "../../components/Table";

import {
    Container,
    SectionHeader,
    Title,
    Return,
    DoubleColumnDesktop,
    DesktopColumn,
    OrderTitle,
    Address,
    Status,
} from "./styles";
import { useTranslation } from "react-i18next";

const AccountOrderDetail: React.FC = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const { orderData } = useAccountContext();

    if (!orderData) {
        return <></>; // TODO: skeleton
    }
    return (
        <div className="page-width">
            <Container>
                <SectionHeader>
                    <Title>{t("account.orderDetail.title")}</Title>
                    <Return onClick={() => history.goBack()}>
                        <span>{t("account.orderDetail.return")}</span>
                    </Return>
                </SectionHeader>
                <DoubleColumnDesktop>
                    <DesktopColumn width="70%">
                        <OrderTitle>{`${t("account.orderDetail.orderTitle")} ${
                            orderData.id
                        }`}</OrderTitle>
                        <p>{`${t("account.orderDetail.createdAt")} ${
                            orderData.createdAt
                        }`}</p>
                        {orderData.canceledAt && (
                            <p>{`${t("account.orderDetail.closedAt")} ${
                                orderData.canceledAt
                            }`}</p>
                        )}
                        {orderData.cancelReason && (
                            <p>
                                {t("account.orderDetail.cancelReason.text", {
                                    reason:
                                        orderData.cancelReason === "customer"
                                            ? t(
                                                  "account.orderDetail.cancelReason.customer",
                                              )
                                            : t(
                                                  "account.orderDetail.cancelReason.store",
                                              ),
                                })}
                            </p>
                        )}
                        <Table.OrderProducts
                            totalPrice={orderData.totalPrice}
                            subtotalPrice={orderData.subtotalPrice}
                            totalShippingPrice={orderData.totalShippingPrice}
                            products={orderData.lineItems}
                        />
                    </DesktopColumn>
                    <DesktopColumn width="30%">
                        <Address>
                            <div>
                                {t("account.orderDetail.shippingAddress.title")}
                            </div>
                            <Status>
                                <span>
                                    {t(
                                        "account.orderDetail.shippingAddress.status",
                                    )}
                                </span>
                                {orderData.financialStatus}
                            </Status>
                            <p>{orderData.shippingAddress.name}</p>
                            <p>{orderData.shippingAddress.company}</p>
                            <p>
                                {orderData.shippingAddress.address1}{" "}
                                {orderData.shippingAddress.address2}
                            </p>
                            <p>
                                {orderData.shippingAddress.city}{" "}
                                {orderData.shippingAddress.provinceCode}
                            </p>
                            <p>{orderData.shippingAddress.zip}</p>
                            <p>{orderData.shippingAddress.country}</p>
                        </Address>
                        <Address>
                            <div>
                                {t("account.orderDetail.deliveryAddress.title")}
                            </div>
                            <Status>
                                <span>
                                    {t(
                                        "account.orderDetail.deliveryAddress.status",
                                    )}
                                </span>
                                {orderData.fulfillmentStatus}
                            </Status>
                            <p>{orderData.shippingAddress.name}</p>
                            <p>{orderData.shippingAddress.company}</p>
                            <p>
                                {orderData.shippingAddress.address1}{" "}
                                {orderData.shippingAddress.address2}
                            </p>
                            <p>
                                {orderData.shippingAddress.city}{" "}
                                {orderData.shippingAddress.provinceCode}
                            </p>
                            <p>{orderData.shippingAddress.zip}</p>
                            <p>{orderData.shippingAddress.country}</p>
                        </Address>
                    </DesktopColumn>
                </DoubleColumnDesktop>
            </Container>
        </div>
    );
};

export default withAccountContext(AccountOrderDetail);
