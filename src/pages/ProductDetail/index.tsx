import React, { FC, ReactElement } from "react";
import { useTranslation } from "react-i18next";

import Image from "./Image";
import Info from "./Info";

import {
    Container,
    Content,
    GridItem,
    Footer,
    AnotherProducts,
} from "./styles";

import Error from "../../components/Error/Info";
import ProductItem from "../../components/ProductItem";

import {
    withProductDetailContext,
    useProductDetailContext,
} from "../../contexts/ProductDetail";

import { useCheckoutContext } from "../../contexts/Checkout";

const ProductDetail: FC = (): ReactElement => {
    const { t } = useTranslation();
    const { similar, loadingSimilar } = useProductDetailContext();
    const {
        error: { lineItemsAddError },
    } = useCheckoutContext();

    return (
        <Container>
            <div className="page-width">
                {lineItemsAddError && (
                    <Error
                        customTitle={t("errors.internal")}
                        errors={[
                            {
                                key: "addLineItem",
                                value: lineItemsAddError.message,
                            },
                        ]}
                    />
                )}
                <Content>
                    <GridItem>
                        <Image />
                    </GridItem>
                    <GridItem>
                        <Info />
                    </GridItem>
                </Content>

                <Footer>
                    <AnotherProducts>
                        {t("productDetail.anotherProducts")}
                    </AnotherProducts>
                    {!loadingSimilar && !!similar && (
                        <ul>
                            {similar.map((prd, idx) => (
                                <ProductItem key={idx} data={prd} />
                            ))}
                        </ul>
                    )}
                </Footer>
            </div>
        </Container>
    );
};

export default withProductDetailContext(ProductDetail);
