import React, { ChangeEventHandler, FC, ReactElement } from "react";
import { useHistory } from "react-router-dom";

import {
    CartTable,
    CartTableRow,
    DesktopOnly,
    MobileOnly,
    ProductDetails,
    ProductImage,
    Quantity,
    QuantityLabel,
    RemovedProduct,
    Row,
} from "./styles";

import { useCheckoutContext } from "../../contexts/Checkout";

import formatMoney from "../../helpers/format/formatMoney";

import { composeRoute, routes } from "../../routes";
import { useTranslation } from "react-i18next";

export type TCardTableProps = {
    removedProduct: {
        handle: string;
        variantId: string;
        title: string;
        quantity: number;
    } | null;
    onQuantityChange: (id: string) => ChangeEventHandler<HTMLInputElement>;
    removeProduct: (id: string) => () => void;
};

const CardTable: FC<TCardTableProps> = ({
    removedProduct,
    onQuantityChange,
    removeProduct,
}): ReactElement => {
    const { t } = useTranslation();
    const {
        checkoutInfo,
        loading: {
            attributesUpdateLoading,
            lineItemsRemoveLoading,
            lineItemsUpdateLoading,
        },
        error: { lineItemsRemoveError },
    } = useCheckoutContext();

    const history = useHistory();

    const handleGoToProductDetail = (handle: string, variantId: string) => {
        history.push(
            composeRoute(routes.PRODUCT, {
                params: { handle },
                search: { variant: variantId },
            }),
        );
    };

    return (
        <CartTable>
            <thead>
                <CartTableRow>
                    <th>{t("cart.headers.products")}</th>
                    <th>{t("cart.headers.price")}</th>
                    <DesktopOnly as="th">
                        {t("cart.headers.quantity")}
                    </DesktopOnly>
                    <DesktopOnly as="th">{t("cart.headers.total")}</DesktopOnly>
                </CartTableRow>
            </thead>
            <tbody>
                {removedProduct &&
                    !lineItemsRemoveLoading &&
                    !lineItemsRemoveError && (
                        <tr>
                            <RemovedProduct colSpan={4}>
                                <span>
                                    {`(${removedProduct.quantity}) `}
                                    <a
                                        onClick={() =>
                                            handleGoToProductDetail(
                                                removedProduct.handle,
                                                removedProduct.variantId,
                                            )
                                        }>
                                        {removedProduct.title}
                                    </a>
                                </span>
                                {` ${t("cart.removedProduct")}`}
                            </RemovedProduct>
                        </tr>
                    )}
                {checkoutInfo?.lineItems &&
                    checkoutInfo.lineItems.map((item, idx) => (
                        <CartTableRow key={idx}>
                            <td>
                                <Row alignItems="flex-start">
                                    <ProductImage>
                                        <img
                                            src={item.imageSrc.originalSrc}
                                            alt={item.imageSrc.altText}
                                        />
                                    </ProductImage>
                                    <ProductDetails>
                                        <a
                                            onClick={() =>
                                                handleGoToProductDetail(
                                                    item.handle,
                                                    item.variantId,
                                                )
                                            }>
                                            {item.title}
                                        </a>
                                        <ul>
                                            {!!item.variant.length && (
                                                <li>{`${t(
                                                    "cart.productVariant",
                                                )}: ${item.variant.join(
                                                    ", ",
                                                )}`}</li>
                                            )}
                                            {!!item.properties.length &&
                                                item.properties.map(
                                                    (pr, idx2) => (
                                                        <li key={idx2}>
                                                            <span>
                                                                {`${pr.key}: `}
                                                            </span>
                                                            {pr.value}
                                                        </li>
                                                    ),
                                                )}
                                        </ul>
                                        <p onClick={removeProduct(item.id)}>
                                            {t("cart.removeProduct")}
                                        </p>
                                    </ProductDetails>
                                </Row>
                            </td>
                            <MobileOnly>
                                <Row
                                    justifyContent="flex-end"
                                    marginBottom="5px">
                                    {formatMoney(item.price)}
                                </Row>
                                <Row flexWrap="wrap" justifyContent="flex-end">
                                    <QuantityLabel>Qtde</QuantityLabel>
                                    <Quantity
                                        disabled={
                                            lineItemsUpdateLoading ||
                                            lineItemsRemoveLoading ||
                                            attributesUpdateLoading
                                        }
                                        type="number"
                                        defaultValue={item.quantity}
                                        min="1"
                                        pattern="[0-9]*"
                                        step="1"
                                        onChange={onQuantityChange(item.id)}
                                    />
                                </Row>
                            </MobileOnly>
                            <DesktopOnly>{formatMoney(item.price)}</DesktopOnly>
                            <DesktopOnly>
                                <Quantity
                                    disabled={
                                        lineItemsUpdateLoading ||
                                        lineItemsRemoveLoading ||
                                        attributesUpdateLoading
                                    }
                                    type="number"
                                    defaultValue={item.quantity}
                                    min="1"
                                    pattern="[0-9]*"
                                    step="1"
                                    onChange={onQuantityChange(item.id)}
                                />
                            </DesktopOnly>
                            <DesktopOnly>
                                {formatMoney(
                                    parseFloat(item.price) * item.quantity,
                                )}
                            </DesktopOnly>
                        </CartTableRow>
                    ))}
            </tbody>
        </CartTable>
    );
};

export default CardTable;
