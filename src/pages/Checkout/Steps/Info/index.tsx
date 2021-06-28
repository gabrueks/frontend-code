import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import { useCookiesContext } from "../../../../contexts/Cookies";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

import { UserConteiner, UserInfo, UserLogo } from "./styles";

import { Topic, StepsFooter } from "../styles";

import { Button } from "../../styles";

import AddressForm, {
    validateAddressForm,
    TAddressFields,
    TAddressFormProps,
} from "../../AddressForm";

import { useAccountContext } from "../../../../contexts/Account";
import { useCheckoutContext } from "../../../../contexts/Checkout";

import deepEqual from "../../../../helpers/object/deepEqual";

import { CUSTOMER_ACCESS_TOKEN_NAME } from "../../../../constants";

import { routes, composeRoute } from "../../../../routes";

export type TInfoProps = {
    countryData?: TAddressFormProps["countryData"];
    handleGoBack: () => void;
    handleGoNext: () => void;
};

const Info: FC<TInfoProps> = ({
    countryData,
    handleGoBack,
    handleGoNext,
}): ReactElement => {
    const { t } = useTranslation();
    const {
        checkoutInfo,
        updateShippingAddress,
        loading: { shippingAddressUpdateLoading },
        error: { shippingAddressUpdateError },
    } = useCheckoutContext();
    const {
        customer,
        addresses,
        defaultAddress,
        loading: accountLoading,
    } = useAccountContext();

    const currentShippingAddress = useRef<TAddressFields | undefined>(
        checkoutInfo?.shippingAddress,
    );
    const changed = useRef(false);
    const [called, setCalled] = useState(false);
    const [errors, setErrors] = useState<Set<keyof TAddressFields>>(new Set());

    const { removeCookie } = useCookiesContext();

    const history = useHistory();

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
            window.fbq("track", "InitiateCheckout", {
                content_ids: returnLineItensId(checkoutInfo?.lineItems),
                content_type: "product_group",
                currency: "BRL",
                value: checkoutInfo?.totalPrice,
                num_items: calculateQuantity(checkoutInfo?.lineItems),
            });
        }
    }, [checkoutInfo]);

    const validateStep = async () => {
        const result = validateAddressForm(currentShippingAddress.current);
        if (Array.isArray(result)) {
            setErrors(new Set(result));
            return;
        }
        setErrors(new Set());

        if (currentShippingAddress.current && changed.current) {
            const {
                address1,
                address2,
                addressNumber,
                city,
                company,
                country,
                firstName,
                lastName,
                phone,
                province,
                zip,
            } = currentShippingAddress.current;
            await updateShippingAddress({
                address1: `${address1.trim()} ${addressNumber}`,
                address2,
                city,
                company,
                country,
                firstName,
                lastName,
                phone,
                province,
                zip,
            });
            setCalled(true);
            return;
        }

        handleGoNext();
    };

    useEffect(() => {
        if (called && !shippingAddressUpdateLoading) {
            setCalled(false);
            if (shippingAddressUpdateError) {
                setErrors((prev) => new Set([...prev, "phone"]));
                return;
            }
            changed.current = false;
            handleGoNext();
        }
    }, [
        called,
        shippingAddressUpdateLoading,
        shippingAddressUpdateError,
        handleGoNext,
    ]);

    const doLogout = () => {
        removeCookie(CUSTOMER_ACCESS_TOKEN_NAME, { path: "/" });
        history.push(
            composeRoute(routes.LOGIN, {
                state: { from: { pathname: routes.CHECKOUT } },
            }),
        );
    };

    const handleShippingAddressUpdate: TAddressFormProps["callback"] = (
        data,
    ) => {
        if (!deepEqual(currentShippingAddress.current, data))
            changed.current = true;
        currentShippingAddress.current = data;
    };

    return (
        <>
            <Topic>
                <h2>{t("checkout.steps.contact_information.contactLabel")}</h2>
                <UserConteiner>
                    <div>
                        <UserLogo />
                        <UserInfo>
                            {customer && (
                                <>
                                    <span>{`${customer.firstName} ${customer.lastName} `}</span>
                                    <span>{` (${checkoutInfo?.email})`}</span>
                                </>
                            )}
                            <a onClick={doLogout}>
                                {t("checkout.steps.contact_information.logout")}
                            </a>
                        </UserInfo>
                    </div>
                </UserConteiner>
            </Topic>

            <Topic spaced>
                <h2>
                    {t(
                        "checkout.steps.contact_information.shippingAddressLabel",
                    )}
                </h2>
                {!accountLoading && (
                    <AddressForm
                        countryData={countryData}
                        initAddress={
                            currentShippingAddress.current ?? defaultAddress
                        }
                        savedAddresses={addresses}
                        callback={handleShippingAddressUpdate}
                        errors={errors}
                        setErrors={setErrors}
                    />
                )}
            </Topic>

            <StepsFooter>
                <span onClick={handleGoBack}>
                    {t("checkout.steps.contact_information.goBackLabel")}
                </span>
                <Button
                    disabled={shippingAddressUpdateLoading}
                    height="60px"
                    onClick={validateStep}>
                    {t("checkout.steps.contact_information.goNextLabel")}
                </Button>
            </StepsFooter>
        </>
    );
};

export default Info;
