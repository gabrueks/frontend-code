import React from "react";
import { useTranslation } from "react-i18next";
import theme from "../../../theme";

import { ProductRenderer, TextRenderer } from "../Renderers";

import { TColumn, TProps } from "./interface";
import { Wrapper } from "./styles";

const OrderProducts: React.FC<TProps> = ({
    totalPrice,
    subtotalPrice,
    totalShippingPrice,
    products,
}) => {
    const { t } = useTranslation();

    const columns: TColumn[] = [
        {
            acessor: t("table.orderProducts.productTitle"),
            allocation: ["title", "buySimilar"],
            renderItem: ProductRenderer,
        },
        {
            acessor: t("table.orderProducts.sku"),
            allocation: "sku",
            renderItem: TextRenderer,
        },
        {
            acessor: t("table.orderProducts.price"),
            allocation: "price",
            renderItem: TextRenderer,
        },
        {
            acessor: t("table.orderProducts.quantity"),
            allocation: "quantity",
            renderItem: TextRenderer,
        },
        {
            acessor: t("table.orderProducts.total"),
            allocation: "price",
            renderItem: TextRenderer,
        },
    ];

    return (
        <Wrapper>
            <table>
                <thead>
                    <tr>
                        {columns.map(({ acessor }, idx) => (
                            <th key={`col=${idx}`}>{acessor}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {products.map((pr, idx) => {
                        return (
                            <tr key={`cell=${idx}`}>
                                {columns.map(
                                    (
                                        { renderItem, allocation, acessor },
                                        cellId,
                                    ) => {
                                        let alloc;
                                        if (Array.isArray(allocation)) {
                                            alloc = allocation
                                                .map((index) => pr[index])
                                                .filter(Boolean);
                                        } else {
                                            alloc = pr[allocation];
                                        }
                                        return renderItem(
                                            alloc,
                                            acessor,
                                            cellId,
                                        );
                                    },
                                )}
                            </tr>
                        );
                    })}
                    <tr id="no-border">
                        {columns.map((_, idx) => {
                            if (idx === 0) {
                                return TextRenderer("Subtotal", "hidden", idx, {
                                    ...theme.fonts.family.roboto_slab_regular,
                                    fontSize: "16px",
                                    lineHeight: 1.5,
                                    color: theme.colors.dark_grey2,
                                    padding: "20px 14px",
                                });
                            } else if (idx === columns.length - 1) {
                                return TextRenderer(
                                    subtotalPrice,
                                    "Subtotal",
                                    idx,
                                );
                            }
                            return TextRenderer("", "hidden", idx);
                        })}
                    </tr>
                    <tr>
                        {columns.map((_, idx) => {
                            if (idx === 0) {
                                return TextRenderer(
                                    "Frete (Local Delivery)",
                                    "hidden",
                                    idx,
                                    {
                                        ...theme.fonts.family
                                            .roboto_slab_regular,
                                        fontSize: "16px",
                                        lineHeight: 1.5,
                                        color: theme.colors.dark_grey2,
                                        padding: "10px 14px",
                                    },
                                );
                            } else if (idx === columns.length - 1) {
                                return TextRenderer(
                                    totalShippingPrice,
                                    "Frete (Local Delivery)",
                                    idx,
                                );
                            }
                            return TextRenderer("", "hidden", idx);
                        })}
                    </tr>
                    <tr>
                        {columns.map((_, idx) => {
                            if (idx === 0) {
                                return TextRenderer("Total", "hidden", idx, {
                                    ...theme.fonts.family.roboto_slab_regular,
                                    textTransform: "uppercase",
                                    fontWeight: 700,
                                    color: theme.colors.dark_grey2,
                                });
                            } else if (idx === columns.length - 1) {
                                return TextRenderer(totalPrice, "Total", idx, {
                                    ...theme.fonts.family.roboto_slab_regular,
                                    textTransform: "uppercase",
                                    fontWeight: 700,
                                    color: theme.colors.dark_grey2,
                                    padding: "20px 14px",
                                });
                            }
                            return TextRenderer("", "hidden", idx);
                        })}
                    </tr>
                </tbody>
            </table>
        </Wrapper>
    );
};

export default OrderProducts;
