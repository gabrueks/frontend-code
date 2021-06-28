import React, { useEffect, useMemo, useRef, useState } from "react";
import { useHistory } from "react-router";

import { useTranslation } from "react-i18next";
import { useCheckoutContext } from "../../contexts/Checkout";

import {
    Container,
    slideDown,
    slideUp,
    TAnimation,
    Title,
    Content,
    ProductTitle,
    Image,
    Buttons,
    CartButton,
    StoreButton,
    Quantity,
} from "./styles";
import { useOnClickOutside } from "../../hooks";
import { composePathName, routes } from "../../routes";

const DELAY = 500;

const CartModal: React.FC = () => {
    const { t } = useTranslation();
    const history = useHistory();

    const [animation, setAnimation] = useState<TAnimation | undefined>(
        undefined,
    );
    const animationMemo = useMemo(() => animation, [animation]);

    const { modalItem, setModalItem, checkoutInfo } = useCheckoutContext();

    const ref = useRef<HTMLDivElement | null>(null);
    useOnClickOutside(ref, () => {
        if (modalItem) {
            setModalItem(undefined);
        }
    });

    useEffect(() => {
        if (!modalItem && animationMemo) {
            setAnimation(slideUp);
            setTimeout(() => setAnimation(undefined), DELAY);
        } else if (modalItem) {
            setAnimation(slideDown);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalItem]);

    const handleGoToCart = () => {
        history.push(routes.CART);
        setModalItem(undefined);
    };

    const handleGoToStore = () => {
        history.push(composePathName(routes.COLLECTION, { collection: "all" }));
        setModalItem(undefined);
    };

    return (
        <Container
            visibility={animation ? "visible" : "hidden"}
            animation={animationMemo}
            ref={ref}>
            <div>
                <Title>
                    <div>{t("cart.cartModal.title")}</div>
                    <img
                        onClick={() => setModalItem(undefined)}
                        src="/icons/close.svg"
                        alt="close"
                    />
                </Title>
                <Content>
                    <Image src={String(modalItem?.images[0].originalSrc)} />
                    <ProductTitle>
                        <div>{modalItem?.title}</div>
                        <span>
                            {t("cart.cartModal.buySimilar")}
                            <span>{` ${
                                modalItem?.buySimilar ? "Sim" : "Não"
                            }`}</span>
                        </span>
                    </ProductTitle>
                    <Quantity>{`${t("cart.cartModal.quantityLabel")}: ${
                        modalItem?.quantity
                    }`}</Quantity>
                </Content>
            </div>
            <Buttons>
                <CartButton onClick={handleGoToCart}>
                    <span>
                        {t("cart.cartModal.goToCart").concat(
                            `  (${checkoutInfo?.lineItems.length})`,
                        )}
                    </span>
                </CartButton>
                <StoreButton onClick={handleGoToStore}>
                    <span>{t("cart.cartModal.goToStore")}</span>
                </StoreButton>
            </Buttons>
        </Container>
    );
};

export default CartModal;
