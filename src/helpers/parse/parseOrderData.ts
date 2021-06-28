import formatMoney from "../format/formatMoney";
import formatString from "../format/formatString";

import {
    TOrder,
    TOrderQuery,
} from "../../contexts/Account/useOrderHistory/interface";

export default (edges: TOrderQuery["customer"]["orders"]["edges"]): TOrder[] =>
    edges.map(
        ({
            node: {
                financialStatus,
                fulfillmentStatus,
                name,
                processedAt,
                cancelReason,
                canceledAt,
                totalPriceV2,
                subtotalPriceV2,
                totalShippingPriceV2,
                shippingAddress,
                lineItems,
            },
        }) => ({
            financialStatus: formatString(financialStatus),
            fulfillmentStatus: formatString(fulfillmentStatus),
            name,
            createdAt: new Date(processedAt).toLocaleDateString(),
            canceledAt: canceledAt
                ? new Date(canceledAt).toLocaleDateString()
                : "",
            cancelReason,
            totalPrice: formatMoney(totalPriceV2.amount),
            subtotalPrice: formatMoney(subtotalPriceV2.amount),
            totalShippingPrice: formatMoney(totalShippingPriceV2.amount),
            shippingAddress,
            lineItems: lineItems.edges.map(
                ({
                    node: {
                        title,
                        quantity,
                        discountedTotalPrice,
                        customAttributes,
                        variant: { id, sku, priceV2 },
                    },
                }) => ({
                    id,
                    sku,
                    title,
                    quantity,
                    buySimilar: customAttributes.find(
                        ({ key }) => key === "buySimilar",
                    ),
                    totalPrice: formatMoney(discountedTotalPrice.amount),
                    price: formatMoney(priceV2.amount),
                }),
            ),
        }),
    );
