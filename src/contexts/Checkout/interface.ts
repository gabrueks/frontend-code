import { createContext } from "react";

import { TUseCheckoutCustomerResponse } from "./useCheckoutCustomer/interface";
import { TUseCheckoutInfoResponse } from "./useCheckoutInfo/interface";
import { TUseCheckoutLineItemsResponse } from "./useCheckoutLineItems/interface";
import { TUseCheckoutShippingResponse } from "./useCheckoutShipping/interface";
import { TUseModal } from "./useModal/interface";

import { Address } from "../AccountAddress/interface";

type TBillingAddress = {
    [K in keyof Omit<
        Address,
        "default" | "formatted" | "id" | "__typename"
    > as `billingAddress_${K}`]+?: Address[K];
} & {
    billingAddress?: "useSame" | "useDifferent";
    country_code?: string;
    province_code?: string;
};

export type TCheckout = {
    id: string;
    totalTax: string;
    subtotalPrice: string;
    totalPrice: string;
    note: string;
    email: string;
    customAttributes: TBillingAddress & {
        shippingMethodPhone?: string;
        shippingMethodInstructions?: string;
        document?: string;
        paymentMethod?:
            | "Cartão de crédito"
            | "Boleto para 15 dias"
            | "Boleto para 7 dias";
        cardNumber?: string;
        cardName?: string;
        cardExpireDate?: string;
        cardSecurityCode?: string;
    };
    shippingAddress?: Address & {
        latitude: number;
        longitude: number;
    };
    shippingLine?: {
        handle: string;
        price: string;
        title: string;
    };
    customer?: {
        id: string;
    };
    lineItems: {
        id: string;
        variantId: string;
        title: string;
        handle: string;
        variant: string[];
        properties: {
            key: string;
            value: string | null;
        }[];
        quantity: number;
        price: string;
        imageSrc: {
            altText: string;
            originalSrc: string;
        };
    }[];
    discounts: {
        allocationMethod: string;
        targetSelection: string;
        targetType: string;
        value: {
            amount?: string;
            percentage?: number;
        };
    }[];
    userError: string[];
};

export type TCheckoutOrderData = {
    id: number;
    name: string;
};

export type Cookies = {
    customerAccessTokenCreate?: string;
    checkoutInfo?: TCheckout;
    discountCodeApplied?: string[];
    shippingLine?: {
        handle: string;
        price: string;
        title: string;
    };
    orderData?: TCheckoutOrderData;
};

export type TCheckoutContext = TUseModal &
    Omit<TUseCheckoutCustomerResponse, "loading" | "error"> &
    Omit<TUseCheckoutInfoResponse, "loading" | "error"> &
    Omit<TUseCheckoutLineItemsResponse, "loading" | "error"> &
    Omit<TUseCheckoutShippingResponse, "loading" | "error"> & {
        loading: TUseCheckoutCustomerResponse["loading"] &
            TUseCheckoutInfoResponse["loading"] &
            TUseCheckoutLineItemsResponse["loading"] &
            TUseCheckoutShippingResponse["loading"];
        error: TUseCheckoutCustomerResponse["error"] &
            TUseCheckoutInfoResponse["error"] &
            TUseCheckoutLineItemsResponse["error"] &
            TUseCheckoutShippingResponse["error"];
        checkoutInfo?: Omit<TCheckout, "userError">;
        userError: string[];
        orderData?: TCheckoutOrderData;
        completeCheckout: () => Promise<boolean>;
    };

export const CheckoutContext = createContext<TCheckoutContext>({
    modalItem: undefined,
    loading: {
        lineItemsAddLoading: true,
        lineItemsUpdateLoading: true,
        lineItemsRemoveLoading: true,
        customerAssociateLoading: true,
        customerDisassociateLoading: true,
        attributesUpdateLoading: true,
        shippingAddressUpdateLoading: true,
        availableShippingRatesLoading: true,
        emailUpdateLoading: true,
        shippingLineUpdateLoading: true,
        discountCodeApplyLoading: true,
        discountCodeRemoveLoading: true,
    },
    error: {},
    userError: [],
    addLineItems: () => Promise.resolve(),
    updateLineItems: () => Promise.resolve(),
    removeLineItems: () => Promise.resolve(),
    associateCustomer: () => Promise.resolve(),
    disassociateCustomer: () => Promise.resolve(),
    updateAttributes: () => Promise.resolve(),
    setModalItem: () => Promise.resolve(),
    updateShippingAddress: () => Promise.resolve(),
    fetchAvailableShippingRates: () => Promise.resolve(),
    setShippingRatePreview: () => {
        return;
    },
    updateEmail: () => Promise.resolve(),
    updateShippingLine: () => Promise.resolve(),
    completeCheckout: () => Promise.resolve(true),
    applyDiscount: () => Promise.resolve(),
    removeDiscount: () => Promise.resolve(),
});
