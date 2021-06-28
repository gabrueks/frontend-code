import React, {
    ChangeEventHandler,
    FC,
    Fragment,
    ReactElement,
    useEffect,
    useRef,
    useState,
} from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Background, MobileOnly, Spinner, ErrorSlip15Days } from "./styles";

import { RadioIcon, RadioItem, RadioList, Topic, StepsFooter } from "../styles";
import { Button, Form, Input } from "../../styles";
import DiscountInput from "../../DiscountInput";

import AddressForm, {
    validateAddressForm,
    TAddressFields,
    TAddressFormProps,
} from "../../AddressForm";

import { useAccountContext } from "../../../../contexts/Account";
import { useCheckoutContext, TCheckout } from "../../../../contexts/Checkout";

import cardMask from "../../../../helpers/mask/cardMask";
import dateMask from "../../../../helpers/mask/dateMask";
import documentMask from "../../../../helpers/mask/documentMask";
import onlyDigitsMask from "../../../../helpers/mask/onlyDigitsMask";
import onlyLetterMask from "../../../../helpers/mask/onlyLetterMask";
import {
    validateCNPJ,
    validateCPF,
} from "../../../../helpers/validate/documents";

import { composeRoute, routes } from "../../../../routes";

const PURCHASE_LIMIT: number = parseFloat(
    process.env.REACT_APP_PURCHASE_LIMIT ?? "0",
);

export type TPaymentData = {
    paymentMethod?: "creditCard" | "paperSlip15Days" | "paperSlip7Days";
    cardInfo?: {
        cardNumber?: string;
        cardName?: string;
        cardExpireDate?: string;
        cardSecurityCode?: string;
    };
    addressType?: "useSame" | "useDifferent";
    address?: TAddressFields;
    document?: string;
};

type CardInfoKeys = keyof Exclude<TPaymentData["cardInfo"], undefined>;

export type TPaymentProps = {
    countryData?: TAddressFormProps["countryData"];
    handleGoBack: () => void;
    handleGoNext: () => void;
};

function validateExpireDate(expDate: string): boolean {
    if (expDate.length !== 7) return false;
    const temp = expDate.split("/").map((item) => parseInt(item, 10));
    if (temp[0] > 12) return false;
    const now = new Date();
    const yearDiff = temp[1] - now.getFullYear();
    const monthDiff = temp[0] - (now.getMonth() + 1);
    if (yearDiff < 0 || (yearDiff === 0 && monthDiff < 0) || yearDiff > 80)
        return false;
    return true;
}

function validateCardInfo(cardInfo: TPaymentData["cardInfo"]): CardInfoKeys[] {
    const temp: CardInfoKeys[] = [];
    if (!cardInfo?.cardNumber || cardInfo.cardNumber.length !== 19) {
        temp.push("cardNumber");
    }
    if (!cardInfo?.cardName) {
        temp.push("cardName");
    }
    if (
        !cardInfo?.cardExpireDate ||
        !validateExpireDate(cardInfo.cardExpireDate)
    ) {
        temp.push("cardExpireDate");
    }
    if (!cardInfo?.cardSecurityCode || cardInfo.cardSecurityCode.length < 3) {
        temp.push("cardSecurityCode");
    }
    return temp;
}

const Payment: FC<TPaymentProps> = ({
    countryData,
    handleGoBack,
    handleGoNext,
}): ReactElement => {
    const { t } = useTranslation();
    const {
        checkoutInfo,
        userError,
        completeCheckout,
        updateAttributes,
        loading: { attributesUpdateLoading },
        error: { attributesUpdateError },
    } = useCheckoutContext();
    const {
        addresses,
        defaultAddress,
        hasFinancialStatusPending,
    } = useAccountContext();

    const history = useHistory();

    useEffect(() => {
        if (checkoutInfo && !checkoutInfo.shippingLine) {
            history.replace(
                composeRoute(routes.CHECKOUT, {
                    search: {
                        step: "shipping_method",
                    },
                }),
            );
        }
    }, [checkoutInfo, history]);

    const currentPaymentData = useRef<TPaymentData>({});
    const [processing, setProcessing] = useState(false);
    const [calledUpdate, setCalledUpdate] = useState(false);
    const [addressError, setAddressError] = useState<Set<keyof TAddressFields>>(
        new Set(),
    );
    const [cardError, setCardError] = useState<Set<CardInfoKeys>>(new Set());
    const [documentError, setDocumentError] = useState(false);

    const [selectedPayment, setSelectedPayment] = useState<string>();
    const [selectedPaymentAddress, setSelectedPaymentAddress] = useState<
        "useDifferent" | "useSame" | undefined
    >();

    const validateStep = async () => {
        const {
            address,
            addressType,
            cardInfo,
            document,
            paymentMethod,
        } = currentPaymentData.current;

        if (!paymentMethod || !addressType) return;
        if (paymentMethod === "creditCard") {
            const result1 = validateCardInfo(cardInfo);
            if (result1.length) {
                setCardError(new Set(result1));
                return;
            }
        }
        setCardError(new Set());
        if (addressType === "useDifferent") {
            const result2 = validateAddressForm(address);
            if (Array.isArray(result2)) {
                setAddressError(new Set(result2));
                return;
            }
        }
        setAddressError(new Set());
        if (!document || (!validateCNPJ(document) && !validateCPF(document))) {
            setDocumentError(true);
            return;
        }

        setProcessing(true);

        const countryInfo = (countryData ?? []).find((ct) =>
            addressType === "useDifferent"
                ? ct.name === address?.country
                : ct.name === checkoutInfo?.shippingAddress?.country,
        );

        await updateAttributes({
            customAttributes: {
                document: document.replace(/[+./-]/g, ""),
                paymentMethod: t(
                    `checkout.steps.payment_method.paymentMethods.${paymentMethod}`,
                ) as TCheckout["customAttributes"]["paymentMethod"],
                ...(paymentMethod === "creditCard" && cardInfo
                    ? cardInfo
                    : {
                          cardNumber: undefined,
                          cardName: undefined,
                          cardExpireDate: undefined,
                          cardSecurityCode: undefined,
                      }),
                billingAddress: addressType,
                ...(addressType === "useDifferent"
                    ? {
                          billingAddress_address1: `${address?.address1.trim()} ${
                              address?.addressNumber
                          }`,
                          billingAddress_address2: address?.address2,
                          billingAddress_city: address?.city,
                          billingAddress_company: address?.company,
                          billingAddress_country: address?.country,
                          billingAddress_countryCodeV2: countryInfo?.code,
                          billingAddress_firstName: address?.firstName,
                          billingAddress_lastName: address?.lastName,
                          billingAddress_phone: address?.phone,
                          billingAddress_province: address?.province,
                          billingAddress_provinceCode: (
                              countryInfo?.provinces ?? []
                          ).find((prv) => prv.name === address?.province)?.code,
                          billingAddress_zip: address?.zip,
                      }
                    : {
                          billingAddress_address1:
                              checkoutInfo?.shippingAddress?.address1,
                          billingAddress_address2:
                              checkoutInfo?.shippingAddress?.address2,
                          billingAddress_city:
                              checkoutInfo?.shippingAddress?.city,
                          billingAddress_company:
                              checkoutInfo?.shippingAddress?.company,
                          billingAddress_country:
                              checkoutInfo?.shippingAddress?.country,
                          billingAddress_countryCodeV2: countryInfo?.code,
                          billingAddress_firstName:
                              checkoutInfo?.shippingAddress?.firstName,
                          billingAddress_lastName:
                              checkoutInfo?.shippingAddress?.lastName,
                          billingAddress_phone:
                              checkoutInfo?.shippingAddress?.phone,
                          billingAddress_province:
                              checkoutInfo?.shippingAddress?.province,
                          billingAddress_provinceCode: (
                              countryInfo?.provinces ?? []
                          ).find(
                              (prv) =>
                                  prv.name ===
                                  checkoutInfo?.shippingAddress?.province,
                          )?.code,
                          billingAddress_zip:
                              checkoutInfo?.shippingAddress?.zip,
                      }),
            },
        });

        setCalledUpdate(true);
    };

    useEffect(() => {
        (async () => {
            if (calledUpdate && !attributesUpdateLoading) {
                setCalledUpdate(false);
                if (attributesUpdateError || userError.length) {
                    setDocumentError(true);
                    setProcessing(false);
                    return;
                }
                const response = await completeCheckout();
                if (!response) {
                    // setDocumentError(true);
                    setProcessing(false);
                    return;
                }
                handleGoNext();
            }
        })();
    }, [
        calledUpdate,
        attributesUpdateLoading,
        attributesUpdateError,
        userError,
        completeCheckout,
        handleGoNext,
    ]);

    const handlePaymentUpdate = (data: TPaymentData) => {
        currentPaymentData.current = {
            ...currentPaymentData.current,
            ...data,
        };
    };

    const handleDocumentChange: ChangeEventHandler<HTMLInputElement> = (
        event,
    ) => {
        setDocumentError(false);
        handlePaymentUpdate({ document: event.target.value });
    };

    const handlePaymentMethodChange = (
        newPayment: TPaymentData["paymentMethod"],
    ) => {
        handlePaymentUpdate({ paymentMethod: newPayment });
        setSelectedPayment(newPayment);
    };

    const handlePaymentDataChange: ChangeEventHandler<HTMLInputElement> = (
        event,
    ) => {
        setCardError((prev) => {
            const temp = new Set([...prev]) as Set<CardInfoKeys>;
            temp.delete(event.target.name as CardInfoKeys);
            return temp;
        });
        handlePaymentUpdate({
            cardInfo: {
                ...(currentPaymentData.current.cardInfo ?? {}),
                [event.target.name]: event.target.value,
            },
        });
    };

    const handlePaymentAddressTypeChange = (
        newAddressType: "useDifferent" | "useSame",
    ) => {
        handlePaymentUpdate({
            addressType: newAddressType,
            ...(newAddressType === "useDifferent"
                ? { address: addresses[0] }
                : { address: undefined }),
        });
        setSelectedPaymentAddress(newAddressType);
    };

    const handlePaymentAddressChange: TAddressFormProps["callback"] = (
        data,
    ) => {
        handlePaymentUpdate({ address: data });
    };

    useEffect(() => {
        if (window.fbq && checkoutInfo) {
            window.fbq("track", "AddPaymentInfo", {
                currency: "BRL",
                value: checkoutInfo?.totalPrice,
            });
        }
    }, [checkoutInfo]);

    const renderCardForm = () => {
        return (
            <RadioItem extra>
                <div className="content">
                    <Form noValidate>
                        <div>
                            <Input error={cardError.has("cardNumber")}>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    name="cardNumber"
                                    placeholder={t(
                                        "checkout.fields.cardNumber",
                                    )}
                                    onChange={(event) =>
                                        handlePaymentDataChange(cardMask(event))
                                    }
                                />
                                <label>{t("checkout.fields.cardNumber")}</label>
                                {cardError.has("cardNumber") && (
                                    <span>
                                        {t("checkout.errors.cardNumber")}
                                    </span>
                                )}
                            </Input>
                        </div>
                        <div>
                            <Input error={cardError.has("cardName")}>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    name="cardName"
                                    placeholder={t("checkout.fields.cardName")}
                                    onChange={(event) =>
                                        handlePaymentDataChange(
                                            onlyLetterMask()(event),
                                        )
                                    }
                                />
                                <label>{t("checkout.fields.cardName")}</label>
                                {cardError.has("cardName") && (
                                    <span>{t("checkout.errors.cardName")}</span>
                                )}
                            </Input>
                        </div>
                        <div>
                            <Input error={cardError.has("cardExpireDate")}>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    name="cardExpireDate"
                                    placeholder={t(
                                        "checkout.fields.cardExpireDate",
                                    )}
                                    onChange={(event) =>
                                        handlePaymentDataChange(
                                            dateMask()(event),
                                        )
                                    }
                                />
                                <label>
                                    {t("checkout.fields.cardExpireDate")}
                                </label>
                                {cardError.has("cardExpireDate") && (
                                    <span>
                                        {t("checkout.errors.cardExpireDate")}
                                    </span>
                                )}
                            </Input>
                            <Input error={cardError.has("cardSecurityCode")}>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    name="cardSecurityCode"
                                    placeholder={t(
                                        "checkout.fields.cardSecurityCode",
                                    )}
                                    onChange={(event) =>
                                        handlePaymentDataChange(
                                            onlyDigitsMask({ max: 4 })(event),
                                        )
                                    }
                                />
                                <label>
                                    {t("checkout.fields.cardSecurityCode")}
                                </label>
                                {cardError.has("cardSecurityCode") && (
                                    <span>
                                        {t("checkout.errors.cardSecurityCode")}
                                    </span>
                                )}
                            </Input>
                        </div>
                    </Form>
                </div>
            </RadioItem>
        );
    };

    const renderPaymentMethods = () => {
        const methods: ReactElement[] = [];
        methods.push(
            <Fragment key={1}>
                <RadioItem
                    onClick={() => handlePaymentMethodChange("creditCard")}>
                    <RadioIcon selected={"creditCard" === selectedPayment} />
                    <h3>
                        {t(
                            "checkout.steps.payment_method.paymentMethods.creditCard",
                        )}
                    </h3>
                </RadioItem>
                {selectedPayment === "creditCard" && renderCardForm()}
            </Fragment>,
        );
        if (checkoutInfo) {
            if (parseFloat(checkoutInfo.subtotalPrice) < PURCHASE_LIMIT) {
                methods.push(
                    <div
                        style={{ display: "flex", flexDirection: "column" }}
                        key={2}>
                        <RadioItem
                            disabled={hasFinancialStatusPending}
                            onClick={() =>
                                handlePaymentMethodChange("paperSlip15Days")
                            }>
                            <RadioIcon
                                selected={"paperSlip15Days" === selectedPayment}
                            />
                            <h3>
                                {t(
                                    "checkout.steps.payment_method.paymentMethods.paperSlip15Days",
                                )}
                            </h3>
                        </RadioItem>
                        {hasFinancialStatusPending && (
                            <ErrorSlip15Days>
                                {t(
                                    "checkout.steps.payment_method.paymentMethods.errorSlip15Days",
                                )}
                            </ErrorSlip15Days>
                        )}
                    </div>,
                );
            }
        }
        return methods;
    };

    if (processing) {
        return (
            <Background>
                <Spinner />
                <h3>{t("checkout.steps.payment_method.processingLabel")}</h3>
            </Background>
        );
    }

    return (
        <>
            <MobileOnly>
                <Topic spaced>
                    <h2 style={{ margin: "0" }}>{t("checkout.discount")}</h2>
                    <DiscountInput />
                </Topic>
            </MobileOnly>

            <Topic spaced>
                <h2>{t("checkout.steps.payment_method.aditionalInfoLabel")}</h2>
                <Input error={documentError}>
                    <input
                        type="text"
                        name="document"
                        defaultValue={
                            currentPaymentData.current?.document ?? ""
                        }
                        placeholder={t("checkout.fields.document")}
                        onChange={(event) =>
                            handleDocumentChange(documentMask(event))
                        }
                    />
                    <label>{t("checkout.fields.document")}</label>
                    {documentError && (
                        <span>{t("checkout.errors.document")}</span>
                    )}
                </Input>
            </Topic>

            <Topic spaced hasInfo>
                <h2>{t("checkout.steps.payment_method.paymentLabel")}</h2>
                <span>{t("checkout.steps.payment_method.paymentInfo")}</span>
                <RadioList>{renderPaymentMethods()}</RadioList>
            </Topic>

            <Topic spaced hasInfo>
                <h2>
                    {t("checkout.steps.payment_method.paymentAddressLabel")}
                </h2>
                <span>
                    {t("checkout.steps.payment_method.paymentAddressInfo")}
                </span>
                <RadioList>
                    <RadioItem
                        onClick={() =>
                            handlePaymentAddressTypeChange("useSame")
                        }>
                        <RadioIcon
                            selected={selectedPaymentAddress === "useSame"}
                        />
                        <h3>
                            {t(
                                "checkout.steps.payment_method.paymentAddressMethods.useSame",
                            )}
                        </h3>
                    </RadioItem>
                    <RadioItem
                        onClick={() =>
                            handlePaymentAddressTypeChange("useDifferent")
                        }>
                        <RadioIcon
                            selected={selectedPaymentAddress === "useDifferent"}
                        />
                        <h3>
                            {t(
                                "checkout.steps.payment_method.paymentAddressMethods.useDifferent",
                            )}
                        </h3>
                    </RadioItem>
                    {selectedPaymentAddress === "useDifferent" && (
                        <RadioItem extra>
                            <div className="content">
                                <AddressForm
                                    countryData={countryData}
                                    initAddress={
                                        currentPaymentData.current?.address ??
                                        defaultAddress
                                    }
                                    savedAddresses={addresses}
                                    callback={handlePaymentAddressChange}
                                    errors={addressError}
                                    setErrors={setAddressError}
                                />
                            </div>
                        </RadioItem>
                    )}
                </RadioList>
            </Topic>

            <StepsFooter>
                <span onClick={handleGoBack}>
                    {t("checkout.steps.shipping_method.goBackLabel")}
                </span>
                <Button disabled={false} height="60px" onClick={validateStep}>
                    {t("checkout.steps.payment_method.goNextLabel")}
                </Button>
            </StepsFooter>
        </>
    );
};

export default Payment;
