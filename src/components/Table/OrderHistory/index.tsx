import React from "react";
import { useTranslation } from "react-i18next";

import { AccountRenderer, TextRenderer } from "../Renderers";

import { TColumn, TProps } from "./interface";
import { Wrapper } from "./styles";

const OrderHistory: React.FC<TProps> = ({ orders }) => {
    const { t } = useTranslation();

    const columns: TColumn[] = [
        {
            acessor: t("table.orderHistory.id"),
            allocation: "name",
            renderItem: AccountRenderer,
        },
        {
            acessor: t("table.orderHistory.createdAt"),
            allocation: "createdAt",
            renderItem: TextRenderer,
        },
        {
            acessor: t("table.orderHistory.financialStatus"),
            allocation: "financialStatus",
            renderItem: TextRenderer,
        },
        {
            acessor: t("table.orderHistory.fulfillmentStatus"),
            allocation: "fulfillmentStatus",
            renderItem: TextRenderer,
        },
        {
            acessor: t("table.orderHistory.totalPrice"),
            allocation: "totalPrice",
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
                    {orders.map((order, idx) => {
                        return (
                            <tr key={`cell=${idx}`}>
                                {columns.map(
                                    (
                                        { renderItem, allocation, acessor },
                                        cellId,
                                    ) => {
                                        const alloc = order[allocation];
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
                </tbody>
            </table>
        </Wrapper>
    );
};

export default OrderHistory;
