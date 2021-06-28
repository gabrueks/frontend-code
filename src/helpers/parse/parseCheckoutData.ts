import { TCheckout } from "../../contexts/Checkout/interface";
import { TCheckoutDefaultResponse } from "../../graphql/Checkout/interface";

export default function parseCheckoutData(
    { checkout, checkoutUserErrors, customer }: TCheckoutDefaultResponse,
    oldData?: TCheckout,
): TCheckout {
    let temp: Partial<TCheckout> = {
        userError: (checkoutUserErrors ?? []).map((err) => err.message),
        customer,
    };
    if (!checkout) {
        temp = {
            ...temp,
            ...oldData,
        };
    } else {
        const {
            email,
            customAttributes,
            lineItems,
            note,
            shippingAddress,
            shippingLine,
            lineItemsSubtotalPrice,
            discountApplications,
            ...rest
        } = checkout;
        temp = {
            ...temp,
            ...rest,
            note: note ?? "",
            email: email ?? "",
            subtotalPrice: lineItemsSubtotalPrice.amount ?? "",
            customAttributes: customAttributes.reduce(
                (obj, field) => ({ ...obj, [field.key]: field.value }),
                {},
            ),
            shippingAddress: shippingAddress ?? undefined,
            shippingLine: shippingLine
                ? {
                      handle: shippingLine.handle,
                      price: shippingLine.priceV2.amount,
                      title: shippingLine.title,
                  }
                : undefined,
            lineItems: lineItems.edges.map(({ node }) => ({
                id: node.id,
                variantId: node.variant.id,
                title: node.title,
                handle:
                    node.customAttributes.find((cust) => cust.key === "handle")
                        ?.value ?? "",
                imageSrc: {
                    altText: "image",
                    originalSrc: node.variant.image.src,
                },
                price: node.variant.price,
                properties: node.customAttributes.filter(
                    (cust) => cust.key !== "handle",
                ),
                quantity: node.quantity,
                variant:
                    node.variant.title !== "Default Title"
                        ? [node.variant.title]
                        : [],
            })),
            discounts: (discountApplications?.edges ?? []).map(({ node }) => ({
                ...node,
            })),
        };
    }
    return temp as TCheckout;
}
