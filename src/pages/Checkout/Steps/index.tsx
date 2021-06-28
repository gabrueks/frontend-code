import React, {
    FC,
    ReactElement,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";

import Info from "./Info";
import ShippingMethod from "./ShippingMethod";
import Payment from "./Payment";
import Success from "./Success";

import {
    DataAction,
    DataInfo,
    DataResume,
    StepsContainer,
    StepsHeader,
} from "./styles";
import { Content, Logo } from "../styles";

import { useCheckoutContext } from "../../../contexts/Checkout";

import formatMoney from "../../../helpers/format/formatMoney";

import useUpToDataRef from "../../../hooks/useUpToDataRef";

import {
    routes,
    routeSearch,
    composeRoute,
    useSearch,
    composeSearch,
} from "../../../routes";

import {
    getCountriesAndProvinces,
    TGetCountriesAndProvincesResponse,
} from "../../../services/address";

import colors from "../../../theme/colors";

type TSteps = Exclude<routeSearch[routes.CHECKOUT]["step"], undefined>;

const stepsBreadcrumbs = {
    contact_information: true,
    shipping_method: true,
    payment_method: true,
    success: false,
};

const Steps: FC = (): ReactElement => {
    const { t } = useTranslation();
    const { checkoutInfo, orderData } = useCheckoutContext();

    const history = useHistory();

    const location = useLocation();
    const search = useSearch<routes.CHECKOUT>(location);
    const stepRef = useUpToDataRef(search.step);

    const [
        countryData,
        setCountryData,
    ] = useState<TGetCountriesAndProvincesResponse>();

    useEffect(() => {
        (async () => {
            const response = await getCountriesAndProvinces();
            setCountryData(response);
        })();
    }, []);

    const orderDataRef = useRef(orderData);
    useEffect(() => {
        if (checkoutInfo) {
            if (
                !stepRef.current ||
                (stepRef.current === "success" && !orderDataRef.current)
            ) {
                const { shippingAddress, shippingLine } = checkoutInfo;
                history.replace({
                    pathname: routes.CHECKOUT,
                    search: composeSearch<routes.CHECKOUT>({
                        step: !shippingAddress
                            ? "contact_information"
                            : !shippingLine
                            ? "shipping_method"
                            : "payment_method",
                    }),
                });
            } else if (stepRef.current !== "success" && orderDataRef.current) {
                history.replace(routes.HOME);
            }
        } else {
            history.replace(routes.HOME);
        }
    }, [history, stepRef, checkoutInfo]);

    const handleGoToCart = () => {
        window.location.href = routes.CART;
    };

    const handleGoToHome = () => {
        history.push(routes.HOME);
    };

    const handleGoBack = useCallback(
        (step?: TSteps) => () => {
            if (typeof step === "undefined") {
                window.location.href = routes.CART;
            } else {
                history.replace(
                    composeRoute(routes.CHECKOUT, {
                        search: {
                            step,
                        },
                    }),
                );
            }
        },
        [history],
    );

    const handleGoNext = useCallback(
        (step: TSteps) => () => {
            history.replace(
                composeRoute(routes.CHECKOUT, {
                    search: {
                        step,
                    },
                }),
            );
        },
        [history],
    );

    const checkAvaiableSteps = (): TSteps[] => {
        const temp: TSteps[] = ["contact_information"];
        if (checkoutInfo?.shippingAddress) temp.push("shipping_method");
        if (checkoutInfo?.shippingAddress && checkoutInfo?.shippingLine)
            temp.push("payment_method");
        return temp;
    };

    const breadcrumbStyle = (step: string) => {
        const commonStyle = {
            color: colors.dark_grey3,
            fontWeight: 500,
            cursor: "default",
        };

        const temp = step as TSteps;

        if (temp === search.step) return commonStyle;
        if (!checkAvaiableSteps().includes(temp))
            return {
                ...commonStyle,
                color: colors.grey3,
            };

        return {};
    };

    const breadcrombCallback = (key: string) => {
        if (checkAvaiableSteps().includes(key as TSteps)) {
            handleGoNext(key as TSteps)();
        }
    };

    const renderStep = () => {
        switch (search.step) {
            case "contact_information":
                return (
                    <Info
                        countryData={countryData}
                        handleGoBack={handleGoBack()}
                        handleGoNext={handleGoNext("shipping_method")}
                    />
                );
            case "shipping_method":
                return (
                    <ShippingMethod
                        handleGoBack={handleGoBack("contact_information")}
                        handleGoNext={handleGoNext("payment_method")}
                    />
                );
            case "payment_method":
                return (
                    <Payment
                        countryData={countryData}
                        handleGoBack={handleGoBack("shipping_method")}
                        handleGoNext={handleGoNext("success")}
                    />
                );
            case "success":
                return <Success />;
            default:
                return <div />;
        }
    };

    return (
        <StepsContainer>
            <Content style={{ margin: "14px auto" }}>
                <StepsHeader>
                    <Logo onClick={handleGoToHome}>{t("checkout.logo")}</Logo>
                    {search.step !== "success" && (
                        <div>
                            <span onClick={handleGoToCart}>
                                {t("checkout.cartBreadcrumb")}
                            </span>
                            {Object.entries(stepsBreadcrumbs).map(
                                ([key, shouldRender], idx) => {
                                    return (
                                        shouldRender && (
                                            <span
                                                key={idx}
                                                style={breadcrumbStyle(key)}
                                                onClick={() =>
                                                    breadcrombCallback(key)
                                                }>
                                                {t(
                                                    `checkout.steps.${key}.breadcrumb`,
                                                )}
                                            </span>
                                        )
                                    );
                                },
                            )}
                        </div>
                    )}
                </StepsHeader>

                {search.step &&
                    !["contact_information", "success"].includes(
                        search.step,
                    ) && (
                        <DataResume>
                            <div>
                                <DataInfo>
                                    <label>{t("checkout.contactLabel")}</label>
                                    <span>{checkoutInfo?.email}</span>
                                </DataInfo>
                                <DataAction>
                                    <span
                                        onClick={handleGoNext(
                                            "contact_information",
                                        )}>
                                        {t("checkout.change")}
                                    </span>
                                </DataAction>
                            </div>
                            <div>
                                <DataInfo>
                                    <label>
                                        {t("checkout.shippingAddressLabel")}
                                    </label>
                                    <span>
                                        {(
                                            checkoutInfo?.shippingAddress
                                                ?.formatted ?? []
                                        ).join(", ")}
                                    </span>
                                </DataInfo>
                                <DataAction>
                                    <span
                                        onClick={handleGoNext(
                                            "contact_information",
                                        )}>
                                        {t("checkout.change")}
                                    </span>
                                </DataAction>
                            </div>
                            {checkoutInfo?.shippingLine &&
                                search.step === "payment_method" && (
                                    <div>
                                        <DataInfo>
                                            <label>
                                                {t(
                                                    "checkout.shippingMethodLabel",
                                                )}
                                            </label>
                                            <span>
                                                {`${checkoutInfo.shippingLine.title} · `}
                                                <b>
                                                    {parseFloat(
                                                        checkoutInfo
                                                            .shippingLine.price,
                                                    )
                                                        ? formatMoney(
                                                              checkoutInfo
                                                                  .shippingLine
                                                                  .price,
                                                          )
                                                        : t("checkout.free")}
                                                </b>
                                            </span>
                                        </DataInfo>
                                        <DataAction>
                                            <span
                                                onClick={handleGoNext(
                                                    "shipping_method",
                                                )}>
                                                {t("checkout.change")}
                                            </span>
                                        </DataAction>
                                    </div>
                                )}
                        </DataResume>
                    )}

                {renderStep()}
            </Content>
        </StepsContainer>
    );
};

export default Steps;
