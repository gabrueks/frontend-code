import React, { ChangeEventHandler, FC, ReactElement } from "react";

import {
    Footer as FooterTag,
    CheckoutButton,
    CommentInput,
    CommentLabel,
    FeesAndTaxes,
    Subtotal,
} from "./styles";

import { useCheckoutContext } from "../../contexts/Checkout";

import formatMoney from "../../helpers/format/formatMoney";

import { routes } from "../../routes";
import { useTranslation } from "react-i18next";

export type TFooter = {
    isEmpty: boolean;
    needUpdate: boolean;
    onCommentChange: ChangeEventHandler<HTMLTextAreaElement>;
    handleGoToStore: () => void;
    handleUpdateCart: () => void;
};

const Footer: FC<TFooter> = ({
    isEmpty,
    needUpdate,
    onCommentChange,
    handleGoToStore,
    handleUpdateCart,
}): ReactElement => {
    const { t } = useTranslation();
    const {
        checkoutInfo,
        loading: {
            attributesUpdateLoading,
            lineItemsRemoveLoading,
            lineItemsUpdateLoading,
        },
    } = useCheckoutContext();

    const handleGoToCheckout = () => {
        window.location.href = routes.CHECKOUT;
    };

    return (
        <FooterTag isEmpty={isEmpty}>
            {!isEmpty && (
                <div>
                    <CommentLabel>{t("cart.addComment")}</CommentLabel>
                    <CommentInput
                        defaultValue={checkoutInfo?.note ?? ""}
                        onChange={onCommentChange}
                    />
                </div>
            )}
            <div>
                {!isEmpty && (
                    <>
                        <Subtotal>
                            {t("cart.subtotal")}
                            <b>{formatMoney(checkoutInfo?.subtotalPrice)}</b>
                        </Subtotal>
                        <FeesAndTaxes>{t("cart.feesAndTaxes")}</FeesAndTaxes>
                    </>
                )}
                <CheckoutButton
                    isEmpty={isEmpty}
                    disabled={
                        !isEmpty &&
                        !needUpdate &&
                        (parseFloat(checkoutInfo?.subtotalPrice ?? "0") < 150 ||
                            lineItemsUpdateLoading ||
                            lineItemsRemoveLoading ||
                            attributesUpdateLoading)
                    }
                    onClick={
                        isEmpty
                            ? handleGoToStore
                            : needUpdate
                            ? handleUpdateCart
                            : handleGoToCheckout
                    }>
                    <span>
                        {isEmpty
                            ? t("cart.goToStore")
                            : needUpdate
                            ? t("cart.updateCart")
                            : t("cart.goToCheckout")}
                    </span>
                    {isEmpty && (
                        <img
                            src="/icons/arrow-right.svg"
                            alt="arrow"
                            width="20px"
                            height="20px"
                            style={{
                                marginLeft: "7px",
                                filter: "invert(1)",
                            }}
                        />
                    )}
                </CheckoutButton>
            </div>
        </FooterTag>
    );
};

export default Footer;
