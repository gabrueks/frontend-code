import React, { FC, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
    Container,
    Image,
    TextContainer,
    Title,
    Price,
    PromoLabel,
    PriceContainer,
    ListDivisor,
} from "./styles";

import { composeRoute, routes } from "../../routes";
import { TProducts } from "../../contexts/Search/interface";
import formatMoney from "../../helpers/format/formatMoney";

export type TProductItemProps = {
    data?: TProducts;
};

const ProductSearch: FC<TProductItemProps> = ({ data }): ReactElement => {
    const { t } = useTranslation();

    const history = useHistory();

    const goProduct = () => {
        history.push(
            composeRoute(routes.PRODUCT, {
                params: { handle: data?.handle ?? "" },
            }),
        );
    };

    return (
        <Container onClick={goProduct}>
            <TextContainer>
                <Image src={data?.image?.originalSrc} alt={data?.title} />
                <Title>{data?.title}</Title>
                <PriceContainer>
                    <Price>{formatMoney(data?.variants.price ?? "")}</Price>
                    {data?.variants.compareAtPrice && (
                        <Price crossed>
                            {formatMoney(data?.variants.compareAtPrice)}
                        </Price>
                    )}
                    <div></div>
                    {data?.variants.compareAtPrice && (
                        <PromoLabel>{t("labels.promotion")}</PromoLabel>
                    )}
                </PriceContainer>
            </TextContainer>
            <ListDivisor />
        </Container>
    );
};

export default ProductSearch;
