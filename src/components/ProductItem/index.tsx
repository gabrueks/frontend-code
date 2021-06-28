import React, { FC, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
    Container,
    Image,
    TextContainer,
    Title,
    Vendor,
    Price,
    PromoLabel,
} from "./styles";

import { TProduct } from "../../contexts/Products";

import formatMoney from "../../helpers/format/formatMoney";

import { composeRoute, routes } from "../../routes";

export type TProductItemProps = {
    data?: TProduct;
};

const ProductItem: FC<TProductItemProps> = ({ data }): ReactElement => {
    const { t } = useTranslation();

    const history = useHistory();

    const onClick = () => {
        history.push(
            composeRoute(routes.PRODUCT, {
                params: { handle: data?.handle ?? "" },
            }),
        );
    };

    return (
        <Container onClick={onClick}>
            <Image
                src={data?.featuredImage.originalSrc}
                alt={data?.featuredImage.altText}
            />
            <TextContainer>
                <Title>{data?.title}</Title>
                <Vendor>{data?.vendor}</Vendor>
                <div>
                    <Price>{formatMoney(data?.price ?? "")}</Price>
                    {data?.compareAtPrice && (
                        <Price crossed>
                            {formatMoney(data?.compareAtPrice)}
                        </Price>
                    )}
                </div>
                {data?.compareAtPrice && (
                    <PromoLabel>{t("labels.promotion")}</PromoLabel>
                )}
            </TextContainer>
        </Container>
    );
};

export default ProductItem;
