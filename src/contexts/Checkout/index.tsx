import React, {
    ComponentType,
    FC,
    ReactElement,
    useContext,
    useRef,
} from "react";
// import { useTranslation } from "react-i18next";

import { useCookiesContext } from "../Cookies";

import useCheckoutCustomer from "./useCheckoutCustomer";
import useCheckoutInfo from "./useCheckoutInfo";
import useCheckoutLineItems from "./useCheckoutLineItems";
import useCheckoutShipping from "./useCheckoutShipping";
import useModal from "./useModal";
import { CheckoutContext, Cookies, TCheckoutContext } from "./interface";

import { TCheckoutDefaultResponse } from "../../graphql/Checkout/interface";

import encrypt from "../../helpers/cryptography/encrypt";
import parseCheckoutData from "../../helpers/parse/parseCheckoutData";

import useUpToDateRef from "../../hooks/useUpToDataRef";

import createOrder, { TCreateOrderProps } from "../../services/createOrder";

const CheckoutContextProvider: FC = ({ children }): ReactElement => {
    // const { t } = useTranslation();
    const { cookies, setCookies } = useCookiesContext();
    const {
        customerAccessTokenCreate,
        checkoutInfo,
        orderData,
    }: Cookies = cookies;

    const checkoutInfoRef = useUpToDateRef(checkoutInfo);
    const currentCustomer = useRef(checkoutInfo?.customer);

    const { modalItem, setModalItem } = useModal();

    // ______________________________ MUTATIONS _________________________________
    const onCompleted = <
        T extends Record<string, TCheckoutDefaultResponse>,
        K extends keyof T
    >(
        data: T,
    ): void => {
        if (data) {
            const fieldName = Object.keys(data)[0] as K;
            const { checkout, checkoutUserErrors, customer } = data[fieldName];
            currentCustomer.current = customer ?? currentCustomer.current;
            setCookies(
                "checkoutInfo",
                parseCheckoutData(
                    {
                        checkout: checkout,
                        customer: currentCustomer.current,
                        checkoutUserErrors,
                    },
                    checkoutInfoRef.current,
                ),
                {
                    path: "/",
                },
            );
        }
    };

    const {
        loading: customerLoading,
        error: customerError,
        ...customerCallbacks
    } = useCheckoutCustomer({
        checkoutInfo,
        customerAccessTokenCreate,
        currentCustomer,
        onCompleted,
    });

    const {
        loading: infoLoading,
        error: infoError,
        discountCodeApplied,
        ...infoCallbacks
    } = useCheckoutInfo({ checkoutInfo, onCompleted });

    const {
        loading: lineItemsLoading,
        error: lineItemsError,
        ...lineItemsCallbacks
    } = useCheckoutLineItems({ checkoutInfo, onCompleted });

    const {
        loading: shippingLoading,
        error: shippingError,
        availableShippingRates,
        shippingRatePreview,
        shippingLine,
        ...shippingCallbacks
    } = useCheckoutShipping({ checkoutInfo, onCompleted });

    // ________________________________ CALLBACKS ___________________________________

    const completeCheckout = async (): Promise<boolean> => {
        if (checkoutInfo) {
            const {
                customer,
                customAttributes: {
                    billingAddress_address1,
                    billingAddress_address2,
                    billingAddress_city,
                    billingAddress_company,
                    billingAddress_country,
                    billingAddress_countryCodeV2,
                    billingAddress_firstName,
                    billingAddress_lastName,
                    billingAddress_phone,
                    billingAddress_province,
                    billingAddress_provinceCode,
                    billingAddress_zip,
                    paymentMethod,
                    shippingMethodPhone,
                    cardExpireDate,
                    cardName,
                    cardNumber,
                    cardSecurityCode,
                    document,
                    shippingMethodInstructions,
                },
                discounts,
                email,
                lineItems,
                note,
                shippingAddress,
                // shippingLine,
                totalPrice,
            } = checkoutInfo;

            const payload: TCreateOrderProps = {
                billing_address: {
                    address1: billingAddress_address1 as string,
                    address2: billingAddress_address2 as string,
                    city: billingAddress_city as string,
                    company: billingAddress_company as string,
                    country: billingAddress_country as string,
                    country_code: billingAddress_countryCodeV2 as string,
                    first_name: billingAddress_firstName as string,
                    last_name: billingAddress_lastName as string,
                    phone: billingAddress_phone as string,
                    province: billingAddress_province as string,
                    province_code: billingAddress_provinceCode as string,
                    zip: billingAddress_zip as string,
                },
                customer: {
                    id: parseInt(
                        atob(customer?.id ?? "")
                            .split("/")
                            .slice(-1)[0] ?? "0",
                        10,
                    ),
                },
                email,
                financial_status: "pending",
                line_items: lineItems.map((ln) => ({
                    variant_id: parseInt(
                        atob(ln.variantId).split("/").slice(-1)[0] ?? "0",
                        10,
                    ),
                    quantity: ln.quantity,
                    price: parseFloat(ln.price),
                    properties: ln.properties.map(({ key, value }) => ({
                        name: key,
                        value,
                    })),
                })),
                note,
                note_attributes: [
                    {
                        name: "fromReact",
                        value: true,
                    },
                    {
                        name: "document",
                        value: (document as string).replace(/[/.-\s]/g, ""),
                    },
                ],
                phone: shippingMethodPhone as string,
                shipping_address: {
                    address1: shippingAddress?.address1 as string,
                    address2: shippingAddress?.address2 as string,
                    city: shippingAddress?.city as string,
                    company: shippingAddress?.company as string,
                    country: shippingAddress?.country as string,
                    country_code: shippingAddress?.countryCodeV2 as string,
                    first_name: shippingAddress?.firstName as string,
                    last_name: shippingAddress?.lastName as string,
                    phone: shippingAddress?.phone as string,
                    province: shippingAddress?.province as string,
                    province_code: shippingAddress?.provinceCode as string,
                    zip: shippingAddress?.zip as string,
                },
                // shipping_lines: [
                //     {
                //         code: shippingLine?.handle as string,
                //     },
                // ],
                transactions: [
                    {
                        gateway: paymentMethod as Exclude<
                            typeof paymentMethod,
                            undefined
                        >,
                        kind: "sale",
                        amount: totalPrice,
                    },
                ],
            };

            if (shippingMethodInstructions) {
                payload.note_attributes.push({
                    name: "shippingMethodInstructions",
                    value: shippingMethodInstructions,
                });
            }

            if (paymentMethod === "Cartão de crédito") {
                const cardInfo = await encrypt(
                    JSON.stringify({
                        card_due_date: cardExpireDate as string,
                        card_name: cardName as string,
                        card_number: (cardNumber as string).replace(
                            /[/.-\s]/g,
                            "",
                        ),
                        card_cvv: cardSecurityCode as string,
                    }),
                );
                payload.note_attributes.push({
                    name: "cardInfo",
                    value: cardInfo,
                });
            }

            if (discounts.length && discountCodeApplied) {
                payload.discount_codes = discounts.map(({ value }, idx) => ({
                    code: discountCodeApplied[idx],
                    amount: value.amount ?? (value.percentage ?? 0)?.toFixed(2),
                    type: value.amount ? "fixed_amount" : "percentage",
                }));
            }

            const response = await createOrder(payload);

            if (response !== null) {
                const now = new Date();
                now.setSeconds(now.getSeconds() + 40);
                setCookies("checkoutInfo", checkoutInfoRef.current, {
                    path: "/",
                    expires: now,
                });
                setCookies("orderData", response, {
                    path: "/",
                    expires: now,
                });
                setCookies("discountCodeApplied", discountCodeApplied, {
                    path: "/",
                    expires: now,
                });
                return true;
            }
        }
        return false;
    };

    // ________________________________ PARSERS ___________________________________
    const parseLoading = (): TCheckoutContext["loading"] => ({
        ...customerLoading,
        ...infoLoading,
        ...lineItemsLoading,
        ...shippingLoading,
    });

    const parseError = (): TCheckoutContext["error"] => ({
        ...customerError,
        ...infoError,
        ...lineItemsError,
        ...shippingError,
    });

    const parseCheckout = () => {
        if (checkoutInfo) {
            const { userError, ...rest } = checkoutInfo;
            return {
                checkoutInfo: {
                    ...rest,
                    ...(!!shippingLine && { shippingLine }),
                },
                userError: userError ?? [],
            };
        }
        return {
            userError: [],
        };
    };

    return (
        <CheckoutContext.Provider
            value={{
                ...parseCheckout(),
                orderData: orderData,
                loading: parseLoading(),
                error: parseError(),
                availableShippingRates,
                shippingRatePreview,
                discountCodeApplied,
                ...customerCallbacks,
                ...infoCallbacks,
                ...lineItemsCallbacks,
                ...shippingCallbacks,
                completeCheckout,
                modalItem,
                setModalItem,
            }}>
            {children}
        </CheckoutContext.Provider>
    );
};

export default CheckoutContextProvider;

export function withCheckoutContext<T>(Component: ComponentType<T>): FC<T> {
    const withCheckoutContextFC: FC<T> = (props) => {
        return (
            <CheckoutContextProvider>
                <Component {...props} />
            </CheckoutContextProvider>
        );
    };
    return withCheckoutContextFC;
}

export function useCheckoutContext(): TCheckoutContext {
    return useContext(CheckoutContext);
}

export * from "./interface";
