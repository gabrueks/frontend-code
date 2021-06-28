import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useDebounce, useOnClickOutside } from "../../../hooks";
import { useCheckoutContext } from "../../../contexts/Checkout";

import { Background, Container, Title, Text, Button } from "./styles";

const MIN_PRICE = 150; // ? get from shopify

const PriceModal: React.FC = () => {
    const { t } = useTranslation();
    const { checkoutInfo } = useCheckoutContext();
    const debouncedPrice = useDebounce(
        Number(checkoutInfo?.subtotalPrice),
        1000,
    );
    const [open, setOpen] = useState<boolean>(false);

    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, () => {
        setOpen(false);
    });

    useEffect(() => {
        if (debouncedPrice && debouncedPrice < MIN_PRICE) {
            setOpen(true);
        }
    }, [debouncedPrice]);

    return open ? (
        <Background>
            <Container ref={ref}>
                <Title>
                    <div>{t("cart.priceModal.title")}</div>
                    <img
                        onClick={() => setOpen(false)}
                        src="/icons/close.svg"
                    />
                </Title>
                <Text>{t("cart.priceModal.content")}</Text>
                <Button onClick={() => setOpen(false)}>
                    {t("cart.priceModal.continue")}
                </Button>
            </Container>
        </Background>
    ) : (
        <></>
    );
};

export default PriceModal;
