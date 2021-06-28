import React, {
    ChangeEventHandler,
    FC,
    ReactElement,
    useEffect,
    useRef,
    useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import PriceModal from "./PriceModal";
import CartTable from "./CartTable";
import Footer from "./Footer";

import { Container, EmptyCartLabel, GoToStore, Row, Title } from "./styles";

import { TCheckout, useCheckoutContext } from "../../contexts/Checkout";

import { composePathName, routes } from "../../routes";

const Cart: FC = (): ReactElement => {
    const { t } = useTranslation();
    const {
        checkoutInfo,
        updateAttributes,
        updateLineItems,
        removeLineItems,
        loading: { attributesUpdateLoading, lineItemsUpdateLoading },
    } = useCheckoutContext();

    const history = useHistory();

    const [removedProduct, setRemovedProduct] = useState<{
        handle: string;
        variantId: string;
        title: string;
        quantity: number;
    } | null>(null);
    const [needUpdate, setNeedUpdate] = useState(false);
    const needUpdateRef = useRef(needUpdate);
    useEffect(() => {
        needUpdateRef.current = needUpdate;
    }, [needUpdate]);

    const lineItemsChanged = useRef<
        Pick<TCheckout["lineItems"][number], "id" | "quantity">[]
    >([]);
    const commentRef = useRef<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout>();

    const [emptyCart, setEmptyCart] = useState(
        !checkoutInfo?.lineItems || !checkoutInfo.lineItems.length,
    );
    useEffect(() => {
        setEmptyCart(
            !checkoutInfo?.lineItems || !checkoutInfo.lineItems.length,
        );
    }, [checkoutInfo?.lineItems]);

    useEffect(() => {
        if (!lineItemsUpdateLoading && !attributesUpdateLoading) {
            setNeedUpdate(false);
        }
    }, [lineItemsUpdateLoading, attributesUpdateLoading]);

    const handleGoToStore = () => {
        history.push(composePathName(routes.COLLECTION, { collection: "all" }));
    };

    const handleUpdateCart = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (needUpdateRef.current) {
            if (lineItemsChanged.current.length) {
                updateLineItems(lineItemsChanged.current);
                lineItemsChanged.current = [];
            }
            if (commentRef.current !== null) {
                updateAttributes({
                    note: commentRef.current,
                });
                commentRef.current = null;
            }
        }
    };

    const onQuantityChange = (
        id: string,
    ): ChangeEventHandler<HTMLInputElement> => (event) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        const newQuantity = parseInt(event.target.value ?? "0", 10);

        const item = lineItemsChanged.current.find((li) => li.id === id);
        if (item) {
            item.quantity = newQuantity;
        } else {
            lineItemsChanged.current.push({ id, quantity: newQuantity });
        }

        setNeedUpdate(true);

        timeoutRef.current = setTimeout(() => {
            handleUpdateCart();
        }, 2000);
    };

    const onCommentChange: ChangeEventHandler<HTMLTextAreaElement> = (
        event,
    ) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        commentRef.current = event.target.value;

        setNeedUpdate(true);

        timeoutRef.current = setTimeout(() => {
            handleUpdateCart();
        }, 2000);
    };

    const removeProduct = (id: string) => () => {
        if (checkoutInfo) {
            const item = checkoutInfo.lineItems.find((ln) => ln.id === id);
            if (item) {
                removeLineItems([item.id]);
                setRemovedProduct({
                    handle: item.handle,
                    variantId: item.variantId,
                    title: item.title,
                    quantity: item.quantity,
                });
            }
        }
    };

    return (
        <>
            <PriceModal />
            <Container isEmpty={emptyCart}>
                <Row marginBottom="30px" flexDirection="column">
                    <Title>{t("cart.title")}</Title>
                    {emptyCart ? (
                        <EmptyCartLabel onClick={handleGoToStore}>
                            {t("cart.emptyCart")}
                        </EmptyCartLabel>
                    ) : (
                        <GoToStore onClick={handleGoToStore}>
                            {t("cart.goToStore")}
                        </GoToStore>
                    )}
                </Row>
                {!emptyCart && (
                    <CartTable
                        onQuantityChange={onQuantityChange}
                        removeProduct={removeProduct}
                        removedProduct={removedProduct}
                    />
                )}
                <Footer
                    isEmpty={emptyCart}
                    needUpdate={needUpdate}
                    onCommentChange={onCommentChange}
                    handleGoToStore={handleGoToStore}
                    handleUpdateCart={handleUpdateCart}
                />
            </Container>
        </>
    );
};

export default Cart;
