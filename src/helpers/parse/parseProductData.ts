import { TProduct } from "../../contexts/Products";
import { TProductData } from "../../graphql/Products";

export default function parseProductData({
    id,
    title,
    handle,
    vendor,
    images,
    variants,
}: TProductData): TProduct {
    return {
        featuredImage: {
            altText: images.edges[0]?.node.altText ?? "",
            originalSrc: images.edges[0]?.node.originalSrc ?? "",
        },
        id: id,
        title: title,
        handle: handle,
        price: variants.edges[0]?.node.price,
        compareAtPrice: variants.edges[0]?.node.compareAtPrice,
        vendor: vendor,
    };
}
