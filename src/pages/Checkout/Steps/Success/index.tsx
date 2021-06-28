import React, { FC, ReactElement, ReactNode, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
    Confirmation,
    IconContainer,
    PinMap,
    UserInfo,
    UserInfoLabel,
} from "./styles";

import { RadioItem, RadioList, StepsFooter } from "../styles";

import { Button } from "../../styles";

import Map from "../../../../components/Map";

import { useAccountContext } from "../../../../contexts/Account";
import { useCheckoutContext } from "../../../../contexts/Checkout";
import { useCookiesContext } from "../../../../contexts/Cookies";

import { routes } from "../../../../routes";
import { useTranslation } from "react-i18next";

const Success: FC = (): ReactElement => {
    const { t } = useTranslation();
    const { customer } = useAccountContext();
    const { checkoutInfo, orderData } = useCheckoutContext();
    const { removeCookie } = useCookiesContext();

    const history = useHistory();

    useEffect(() => {
        return () => {
            if (orderData) removeCookie("checkoutInfo", { path: "/" });
        };
    }, [orderData, removeCookie]);

    const handleGoToStore = () => {
        history.push(routes.HOME);
    };

    const formatShippingAddress = (): (ReactNode | ReactElement)[] => {
        if (!checkoutInfo?.shippingAddress) return [];
        const {
            address1,
            address2,
            city,
            country,
            firstName,
            lastName,
            province,
            zip,
        } = checkoutInfo.shippingAddress;
        return [
            `${firstName} ${lastName}`,
            <br key={1} />,
            address1,
            <br key={2} />,
            address2,
            <br key={3} />,
            `${city} ${province}`,
            <br key={4} />,
            zip,
            <br key={5} />,
            country,
        ];
    };

    const formatBillingAddress = (): (ReactNode | ReactElement)[] => {
        if (!checkoutInfo?.shippingAddress) return [];
        const {
            billingAddress_address1,
            billingAddress_address2,
            billingAddress_city,
            billingAddress_country,
            billingAddress_firstName,
            billingAddress_lastName,
            billingAddress_province,
            billingAddress_zip,
        } = checkoutInfo.customAttributes;
        return [
            `${billingAddress_firstName} ${billingAddress_lastName}`,
            <br key={1} />,
            billingAddress_address1,
            <br key={2} />,
            billingAddress_address2,
            <br key={3} />,
            `${billingAddress_city} ${billingAddress_province}`,
            <br key={4} />,
            billingAddress_zip,
            <br key={5} />,
            billingAddress_country,
        ];
    };

    const renderMapMarker = () => {
        if (!checkoutInfo?.shippingAddress) return null;
        const {
            address1,
            latitude,
            longitude,
            province,
        } = checkoutInfo.shippingAddress;
        return (
            <Map.Marker lat={latitude} lng={longitude}>
                <PinMap>
                    <img src="/icons/map-marker.svg" alt="pin" />
                    <p>{t("checkout.steps.success.shippingAddress")}</p>
                    <h3>{`${address1}, ${province}`}</h3>
                </PinMap>
            </Map.Marker>
        );
    };

    const renderPaymentMethod = () => {
        if (!checkoutInfo?.customAttributes.paymentMethod) return null;
        return checkoutInfo.customAttributes.paymentMethod;
    };

    const calculateQuantity = (lineItems: any) => {
        return lineItems.reduce((tol: any, li: any) => tol + li.quantity, 0);
    };

    const returnLineItensId = (lineItems: any) => {
        const newArray: number[] = [];
        lineItems.map((item: any) =>
            newArray.push(parseInt(atob(item.id).split("/")[4])),
        );
        return newArray;
    };

    useEffect(() => {
        if (window.fbq && checkoutInfo) {
            window.fbq("track", "Purchase", {
                currency: "BRL",
                value: checkoutInfo?.totalPrice,
                num_items: calculateQuantity(checkoutInfo?.lineItems),
                content_ids: returnLineItensId(checkoutInfo?.lineItems),
                content_type: "product_group",
            });
        }
    }, [checkoutInfo]);

    return (
        <>
            <IconContainer>
                <Confirmation>
                    <span>{`${t("checkout.steps.success.order")}${
                        orderData?.name
                    }`}</span>
                    <h3>{`${t("checkout.steps.success.thanks")}${
                        customer.firstName
                    }`}</h3>
                </Confirmation>
            </IconContainer>
            <RadioList style={{ marginTop: "42px" }}>
                <Map
                    height="200px"
                    draggable
                    zoom={14}
                    center={
                        checkoutInfo?.shippingAddress && {
                            lat: checkoutInfo.shippingAddress.latitude + 0.005,
                            lng: checkoutInfo.shippingAddress.longitude,
                        }
                    }>
                    {renderMapMarker()}
                </Map>
                <RadioItem>
                    <Confirmation>
                        <h2>{t("checkout.steps.success.orderConfirmed")}</h2>
                        <p>{t("checkout.steps.success.emailSent")}</p>
                        <p>
                            <b>{t("checkout.steps.success.orderInfo.title")}</b>
                            {t("checkout.steps.success.orderInfo.details")}
                        </p>
                    </Confirmation>
                </RadioItem>
            </RadioList>
            <RadioList style={{ marginTop: "42px" }}>
                <RadioItem>
                    <UserInfoLabel>
                        {t("checkout.steps.success.customerInfo")}
                    </UserInfoLabel>
                </RadioItem>
                <RadioItem>
                    <UserInfo>
                        <div>
                            <h3>{t("checkout.steps.success.contactInfo")}</h3>
                            <p>{checkoutInfo?.email}</p>
                            <h3>
                                {t("checkout.steps.success.shippingAddress")}
                            </h3>
                            <p>{formatShippingAddress()}</p>
                            <h3>
                                {t("checkout.steps.success.shippingMethod")}
                            </h3>
                            <p>{checkoutInfo?.shippingLine?.title}</p>
                        </div>
                        <div>
                            <h3>{t("checkout.steps.success.paymentMethod")}</h3>
                            <p>{renderPaymentMethod()}</p>
                            <h3>
                                {t("checkout.steps.success.billingAddress")}
                            </h3>
                            <p>{formatBillingAddress()}</p>
                        </div>
                    </UserInfo>
                </RadioItem>
            </RadioList>

            <StepsFooter>
                <Button height="60px" onClick={handleGoToStore}>
                    {t("checkout.steps.success.goNextLabel")}
                </Button>
            </StepsFooter>
        </>
    );
};

export default Success;
