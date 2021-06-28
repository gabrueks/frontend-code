import React, { FC, ReactNode, ReactElement, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
    ProductData,
    ProductImage,
    ProductList,
    ProductQuantity,
    ResumeContainer,
    ResumeRow,
    ResumeTable,
    ResumeToggle,
} from "./styles";
import { Content, Divider, Price } from "../styles";
import DiscountInput from "../DiscountInput";

import { useCheckoutContext } from "../../../contexts/Checkout";

import formatMoney from "../../../helpers/format/formatMoney";

import { routes, useSearch } from "../../../routes";

import colors from "../../../theme/colors";

const Resume: FC = (): ReactElement => {
    const { t } = useTranslation();
    const {
        checkoutInfo,
        shippingRatePreview,
        discountCodeApplied,
    } = useCheckoutContext();

    const location = useLocation();
    const search = useSearch<routes.CHECKOUT>(location);

    const [resumeToggle, setResumeToggle] = useState(false);

    const renderMoney = (str?: string): string | undefined => {
        return (
            str &&
            (parseFloat(str ?? "0") ? formatMoney(str) : t("checkout.free"))
        );
    };

    const renderProductList = () => {
        if (!checkoutInfo?.lineItems) return null;

        const products = checkoutInfo.lineItems.map((prd, idx) => (
            <tr key={idx}>
                <td>
                    <ProductImage>
                        <img
                            src={prd.imageSrc.originalSrc}
                            alt={prd.imageSrc.altText}
                        />
                        <ProductQuantity>
                            <span>{prd.quantity}</span>
                        </ProductQuantity>
                    </ProductImage>
                </td>
                <td>
                    <ProductData>
                        <h3>{prd.title}</h3>
                        {search.step !== "success" && (
                            <span>{`${prd.properties[0].key} ${prd.properties[0].value}`}</span>
                        )}
                    </ProductData>
                </td>
                <td>
                    <Price>{renderMoney(prd.price)}</Price>
                </td>
            </tr>
        ));
        return (
            <ProductList>
                <tbody>{products}</tbody>
            </ProductList>
        );
    };

    const processDiscount = ({
        amount,
        percentage,
    }: {
        amount?: string;
        percentage?: number;
    }) => {
        if (!checkoutInfo) return "";
        return (
            amount ??
            (
                ((percentage ?? 0) / 100) *
                parseFloat(checkoutInfo.subtotalPrice)
            ).toFixed(2)
        );
    };

    const renderResume = () => {
        if (!checkoutInfo) return null;
        const { shippingLine, subtotalPrice, totalTax } = checkoutInfo;

        let shipping: ReactNode | ReactElement = "_____";
        if (search.step === "contact_information") {
            shipping = "Calculado na próxima etapa";
        } else if (shippingRatePreview || shippingLine?.price) {
            shipping = (
                <Price>
                    {renderMoney(shippingRatePreview ?? shippingLine?.price)}
                </Price>
            );
        }

        return (
            <ResumeTable>
                <tbody>
                    <tr>
                        <td>{t("checkout.cartSubtotal")}</td>
                        <td>
                            <Price>{renderMoney(subtotalPrice)}</Price>
                        </td>
                    </tr>
                    {checkoutInfo.discounts.map((disc, idx) => (
                        <tr key={idx}>
                            <td>
                                <span>{t("checkout.discount")}</span>
                                <img
                                    src="/icons/tag-multiple.svg"
                                    alt="tag"
                                    width="18px"
                                    height="18px"
                                    style={{
                                        margin: "0 5px",
                                        transform: "rotateY(180deg)",
                                        filter: "invert(0.5)",
                                    }}
                                />
                                <span>
                                    {discountCodeApplied &&
                                        discountCodeApplied[idx]}
                                </span>
                            </td>
                            <td>
                                <Price>
                                    - {renderMoney(processDiscount(disc.value))}
                                </Price>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td>{t("checkout.shipping")}</td>
                        <td>{shipping}</td>
                    </tr>
                    {parseFloat(totalTax) > 0 && (
                        <tr>
                            <td>{t("checkout.cartTaxes")}</td>
                            <td>
                                <Price>{renderMoney(totalTax)}</Price>
                            </td>
                        </tr>
                    )}
                </tbody>
            </ResumeTable>
        );
    };

    const renderOriginalTotal = () => {
        if (!checkoutInfo) return null;
        const { subtotalPrice, totalTax, shippingLine } = checkoutInfo;
        let temp = [subtotalPrice, totalTax, shippingLine?.price ?? "0"];
        if (typeof shippingRatePreview !== "undefined") {
            temp = [subtotalPrice, totalTax, shippingRatePreview ?? "0"];
        }
        return renderMoney(
            temp.reduce((tol, item) => tol + parseFloat(item), 0).toString(),
        );
    };

    const renderTotal = () => {
        if (!checkoutInfo) return null;
        const { discounts, subtotalPrice, totalPrice, totalTax } = checkoutInfo;
        let temp = totalPrice;
        if (typeof shippingRatePreview !== "undefined") {
            temp = [
                subtotalPrice,
                totalTax,
                shippingRatePreview ?? "0",
                ...discounts.map(({ value }) => `-${processDiscount(value)}`),
            ]
                .reduce((tol, item) => tol + parseFloat(item), 0)
                .toString();
        }
        return renderMoney(temp);
    };

    return (
        <>
            <ResumeContainer toggled={resumeToggle}>
                <Content>
                    {renderProductList()}

                    {search.step !== "success" && (
                        <>
                            <Divider />
                            <DiscountInput />
                        </>
                    )}

                    <Divider />

                    <ResumeRow>{renderResume()}</ResumeRow>

                    <Divider />

                    <ResumeRow>
                        <ResumeTable>
                            <tbody>
                                <tr>
                                    <td
                                        style={{
                                            color: colors.dark_grey1,
                                            fontSize: "18px",
                                        }}>
                                        {t("checkout.cartTotal")}
                                    </td>
                                    <td>
                                        <Price large>{renderTotal()}</Price>
                                    </td>
                                </tr>
                            </tbody>
                        </ResumeTable>
                    </ResumeRow>
                </Content>
            </ResumeContainer>
            <ResumeToggle
                toggled={resumeToggle}
                onClick={() => setResumeToggle((prev) => !prev)}>
                <Content>
                    <div className="toggleRow">
                        <p>
                            {resumeToggle
                                ? t("checkout.resumeToggle.toggled")
                                : t("checkout.resumeToggle.untoggled")}
                        </p>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-end",
                            }}>
                            {discountCodeApplied && (
                                <Price
                                    style={{
                                        color: colors.light_grey1,
                                        fontWeight: 400,
                                        textDecoration: "line-through",
                                    }}>
                                    {renderOriginalTotal()}
                                </Price>
                            )}
                            <Price large style={{ fontSize: "22px" }}>
                                {renderTotal()}
                            </Price>
                        </div>
                    </div>
                </Content>
            </ResumeToggle>
        </>
    );
};

export default Resume;
