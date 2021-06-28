import React, {
    ChangeEventHandler,
    FC,
    ReactElement,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { NoSupport } from "./styles";
import {
    Error,
    RadioIcon,
    RadioItem,
    RadioList,
    Topic,
    StepsFooter,
} from "../styles";
import { Button, Input, Price } from "../../styles";

import { useCheckoutContext } from "../../../../contexts/Checkout";

import formatMoney from "../../../../helpers/format/formatMoney";
import phoneMask, {
    phoneMaskEventHandler,
} from "../../../../helpers/mask/phoneMask";

import { composeRoute, routes } from "../../../../routes";

const cepList = JSON.parse(process.env.REACT_APP_CEP_LIST ?? "") as number[][];

export type TShippingMethodData = {
    handle?: string;
    shippingMethodPhone?: string;
    shippingMethodInstructions?: string;
};

export type TShippingMethodProps = {
    handleGoBack: () => void;
    handleGoNext: () => void;
};

const ShippingMethod: FC<TShippingMethodProps> = ({
    handleGoBack,
    handleGoNext,
}): ReactElement => {
    const { t } = useTranslation();
    const {
        checkoutInfo,
        availableShippingRates,
        fetchAvailableShippingRates,
        setShippingRatePreview,
        updateAttributes,
        updateShippingLine,
        loading: { attributesUpdateLoading, shippingLineUpdateLoading },
        error: { attributesUpdateError, shippingLineUpdateError },
    } = useCheckoutContext();

    const history = useHistory();

    useEffect(() => {
        if (checkoutInfo && !checkoutInfo.shippingAddress) {
            history.replace(
                composeRoute(routes.CHECKOUT, {
                    search: {
                        step: "contact_information",
                    },
                }),
            );
        }
    }, [checkoutInfo, history]);

    const currentShippingMethod = useRef<TShippingMethodData>({
        handle: checkoutInfo?.shippingLine?.handle,
        shippingMethodInstructions:
            checkoutInfo?.customAttributes.shippingMethodInstructions,
        shippingMethodPhone: checkoutInfo?.customAttributes.shippingMethodPhone,
    });

    const changed = useRef(false);
    const [called, setCalled] = useState(false);
    const [error, setError] = useState(false);
    const [selected, setSelected] = useState(
        currentShippingMethod.current?.handle ??
            checkoutInfo?.shippingLine?.handle ??
            "",
    );

    const hasSupport = useMemo(() => {
        const currentCep = parseInt(
            (checkoutInfo?.shippingAddress?.zip ?? "0").replace("-", ""),
        );
        return cepList.some((cep) => {
            return currentCep >= cep[0] && currentCep <= cep[1];
        });
    }, [checkoutInfo?.shippingAddress?.zip]);

    const fetchAvailableShippingRatesRef = useRef(fetchAvailableShippingRates);
    useEffect(() => {
        if (!availableShippingRates) fetchAvailableShippingRatesRef.current();
    }, [availableShippingRates]);

    const validateStep = async () => {
        const {
            handle,
            shippingMethodInstructions,
            shippingMethodPhone,
        } = currentShippingMethod.current;

        if (!handle) return;
        if (!shippingMethodPhone) {
            setError(true);
            return;
        }
        setError(false);

        if (changed.current) {
            await updateAttributes({
                customAttributes: {
                    shippingMethodPhone,
                    shippingMethodInstructions:
                        shippingMethodInstructions ?? "",
                },
            });
            await updateShippingLine(handle);

            setCalled(true);
            return;
        }

        handleGoNext();
    };

    useEffect(() => {
        if (
            called &&
            !attributesUpdateLoading &&
            !attributesUpdateError &&
            !shippingLineUpdateLoading
        ) {
            setCalled(false);
            if (shippingLineUpdateError) {
                setError(true);
                return;
            }
            changed.current = false;
            handleGoNext();
        }
    }, [
        called,
        attributesUpdateLoading,
        attributesUpdateError,
        shippingLineUpdateLoading,
        shippingLineUpdateError,
        handleGoNext,
    ]);

    const handleSelect = (handle: string) => {
        setSelected(handle);
        if (availableShippingRates) {
            const price = availableShippingRates.find(
                (sprt) => sprt.handle === handle,
            )?.price;
            setShippingRatePreview(price);
        }
        currentShippingMethod.current = {
            ...currentShippingMethod.current,
            handle,
        };
        changed.current = true;
    };

    const handleShippingMethodChange: ChangeEventHandler<HTMLInputElement> = (
        event,
    ) => {
        currentShippingMethod.current = {
            ...currentShippingMethod.current,
            [event.target.name]: event.target.value,
        };
        changed.current = true;
    };

    return (
        <>
            <Topic spaced>
                <h2>{t("checkout.steps.shipping_method.label")}</h2>
                {!hasSupport && (
                    <>
                        <Error>
                            <img
                                src="/icons/alert-circle-outline.svg"
                                alt="alert"
                            />
                            <div>
                                <span>
                                    {t(
                                        "checkout.steps.shipping_method.noSupportError",
                                    )}
                                </span>
                            </div>
                        </Error>
                        <RadioList>
                            <NoSupport>
                                <img
                                    src="/images/package-alert.svg"
                                    alt="alert"
                                    width="70px"
                                    height="65px"
                                />
                                <span>
                                    {t(
                                        "checkout.steps.shipping_method.noSupportMessage",
                                    )}
                                </span>
                            </NoSupport>
                        </RadioList>
                    </>
                )}
                {hasSupport && availableShippingRates && (
                    <RadioList>
                        {availableShippingRates.map((sprt, idx) => (
                            <RadioItem
                                key={idx}
                                onClick={() => handleSelect(sprt.handle)}>
                                <RadioIcon
                                    selected={selected === sprt.handle}
                                />
                                <p>{sprt.title}</p>
                                <Price>
                                    {parseFloat(sprt.price)
                                        ? formatMoney(sprt.price)
                                        : t("checkout.free")}
                                </Price>
                            </RadioItem>
                        ))}
                        <RadioItem extra>
                            <div className="content">
                                <div>
                                    <Input error={error}>
                                        <input
                                            type="text"
                                            name="shippingMethodPhone"
                                            defaultValue={phoneMask(
                                                currentShippingMethod.current
                                                    ?.shippingMethodPhone ?? "",
                                            )}
                                            placeholder={t(
                                                "checkout.fields.shippingMethodPhone",
                                            )}
                                            onChange={(event) =>
                                                handleShippingMethodChange(
                                                    phoneMaskEventHandler(
                                                        event,
                                                    ),
                                                )
                                            }
                                        />
                                        <label>
                                            {t(
                                                "checkout.fields.shippingMethodPhone",
                                            )}
                                        </label>
                                        {error && (
                                            <span>
                                                {t(
                                                    "checkout.errors.shippingMethodPhone",
                                                )}
                                            </span>
                                        )}
                                    </Input>
                                    <p>
                                        {t(
                                            "checkout.steps.shipping_method.phoneInfo",
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <Input>
                                        <input
                                            type="text"
                                            name="shippingMethodInstructions"
                                            defaultValue={
                                                currentShippingMethod.current
                                                    ?.shippingMethodInstructions ??
                                                ""
                                            }
                                            placeholder={t(
                                                "checkout.fields.shippingMethodInstructions",
                                            )}
                                            onChange={
                                                handleShippingMethodChange
                                            }
                                        />
                                        <label>
                                            {t(
                                                "checkout.fields.shippingMethodInstructions",
                                            )}
                                        </label>
                                    </Input>
                                    <p>
                                        {t(
                                            "checkout.steps.shipping_method.instructionsInfo",
                                        )}
                                    </p>
                                </div>
                            </div>
                        </RadioItem>
                    </RadioList>
                )}
            </Topic>

            <StepsFooter>
                <span onClick={handleGoBack}>
                    {t("checkout.steps.shipping_method.goBackLabel")}
                </span>
                <Button
                    disabled={
                        shippingLineUpdateLoading ||
                        attributesUpdateLoading ||
                        !availableShippingRates
                    }
                    height="60px"
                    onClick={validateStep}>
                    {t("checkout.steps.shipping_method.goNextLabel")}
                </Button>
            </StepsFooter>
        </>
    );
};

export default ShippingMethod;
