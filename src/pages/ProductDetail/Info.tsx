import React, {
    ChangeEventHandler,
    FC,
    ReactElement,
    useEffect,
    useRef,
    useState,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
    Button,
    Description,
    Input,
    ModelSelector,
    Price,
    Promotion,
    Social,
    Title,
} from "./styles";

import Skeleton from "../../components/Skeleton";

import { useCheckoutContext } from "../../contexts/Checkout";
import { useProductDetailContext } from "../../contexts/ProductDetail";

import formatMoney from "../../helpers/format/formatMoney";

import { routes, composeSearch, useSearch } from "../../routes";

const Info: FC = (): ReactElement => {
    const { t } = useTranslation();
    const {
        addLineItems,
        setModalItem,
        loading: { lineItemsAddLoading },
        error: { lineItemsAddError },
    } = useCheckoutContext();
    const { handle, data, loadingData } = useProductDetailContext();

    const quantityRef = useRef<HTMLInputElement>(null);
    const buySimilarRef = useRef<HTMLInputElement>(null);

    const location = useLocation();
    const search = useSearch<routes.PRODUCT>(location);

    const history = useHistory();

    const variantId = search.variant ?? data?.variants[0]?.id ?? "";
    const variant =
        data?.variants && data.variants.find((vrt) => vrt.id === variantId);

    const handleChangeVariant: ChangeEventHandler<HTMLSelectElement> = (
        event,
    ) => {
        history.push({
            pathname: location.pathname,
            search: composeSearch<routes.PRODUCT>({
                variant: event.target.value,
            }),
        });
    };

    const [called, setCalled] = useState(false);
    const handleAddToCart = async () => {
        await addLineItems([
            {
                variantId,
                quantity: parseInt(quantityRef.current?.value ?? "0", 10),
                customAttributes: [
                    {
                        key: t("productDetail.buySimilar.label"),
                        value: buySimilarRef.current?.checked
                            ? t("productDetail.buySimilar.yes")
                            : t("productDetail.buySimilar.no"),
                    },
                    {
                        key: "handle",
                        value: handle,
                    },
                ],
            },
        ]);
        if (window.fbq && data?.id) {
            window.fbq("track", "AddToCart", {
                content_name: data?.title,
                content_category: data?.productType,
                num_items: parseInt(quantityRef.current?.value ?? "0", 10),
                content_ids: [parseInt(atob(data?.id).split("/")[4])],
                content_type: "product_group",
                value: variant?.price,
                currency: "BRL",
            });
        }

        setCalled(true);
    };

    useEffect(() => {
        if (called && !lineItemsAddLoading && !lineItemsAddError && data) {
            setCalled(false);
            setModalItem({
                ...data,
                buySimilar: Boolean(buySimilarRef.current?.checked),
                quantity: parseInt(quantityRef.current?.value ?? "0", 10),
            });
        }
    }, [called, lineItemsAddLoading, lineItemsAddError, data, setModalItem]);

    useEffect(() => {
        if (window.fbq && data?.id) {
            window.fbq("track", "ViewContent", {
                value: variant?.price,
                currency: "BRL",
                content_name: data?.title,
                content_ids: [parseInt(atob(data?.id).split("/")[4])],
                content_category: data?.productType,
                content_type: "product_group",
            });
        }
    }, [data?.id, data?.productType, data?.title, variant?.price]);

    if (loadingData) {
        return (
            <>
                <Skeleton width="100%" height="60px" marginBottom="15px" />
                <Skeleton width="60%" height="35px" marginBottom="18px" />
                <Skeleton width="25%" height="65px" marginBottom="20px" />
                <Skeleton width="90%" height="20px" marginBottom="15px" />
                <Skeleton width="90%" height="40px" marginBottom="50px" />
                <Skeleton width="100%" height="120px" marginBottom="30px" />
                <Skeleton width="80%" height="30px" marginBottom="10px" />
            </>
        );
    }

    return (
        <>
            <Title>{data?.title}</Title>
            <div className="row" style={{ marginBottom: 25 }}>
                <Price>{formatMoney(variant?.price ?? "")}</Price>
                {variant?.compareAtPrice && (
                    <Price discount>
                        {formatMoney(variant.compareAtPrice)}
                    </Price>
                )}

                {variant?.compareAtPrice && (
                    <Promotion>
                        <span>{t("productDetail.promotion")}</span>
                    </Promotion>
                )}
            </div>
            {data?.variants && data?.variants.length > 1 && (
                <>
                    <label>{t("productDetail.models")}</label>
                    <ModelSelector
                        value={
                            data.variants.find((vrt) => vrt.id === variantId)
                                ?.id
                        }
                        onChange={handleChangeVariant}>
                        {data.variants.map((vrt, idx) => (
                            <option key={idx} value={vrt.id}>
                                {vrt.title}
                            </option>
                        ))}
                    </ModelSelector>
                </>
            )}
            <label>{t("productDetail.quantity")}</label>
            <Input
                ref={quantityRef}
                type="number"
                name="quantity"
                defaultValue="1"
                min="1"
                pattern="[0-9]*"
                step="1"
            />
            <div className="row">
                <Input
                    ref={buySimilarRef}
                    style={{
                        marginBottom: 4,
                        padding: 0,
                        marginRight: 10,
                    }}
                    type="checkbox"
                />
                <label style={{ margin: 0 }}>
                    {t("productDetail.checkboxText")}
                </label>
            </div>
            <Button disabled={lineItemsAddLoading} onClick={handleAddToCart}>
                <span>{t("productDetail.addCart")}</span>
            </Button>
            {data?.description && (
                <Description
                    dangerouslySetInnerHTML={{ __html: data.description }}
                />
            )}
            <div className="row">
                <ul className="social-ul">
                    <li>
                        <Social
                            target="_blank"
                            href={`https://www.facebook.com/sharer.php?u=https://compras.dolado.com.br/products/${handle}`}>
                            <img src="/facebook.svg" alt="facebook" />
                            <span>{t("productDetail.share")}</span>
                        </Social>
                    </li>

                    <li>
                        <Social
                            target="_blank"
                            href={`https://twitter.com/share?text=${encodeURI(
                                data?.title ?? "",
                            )}&url=https://compras.dolado.com.br/products/${handle}`}
                            style={{ minWidth: 70 }}>
                            <img src="/twitter.svg" alt="twitter" />
                            <span>{t("productDetail.twitter")}</span>
                        </Social>
                    </li>

                    <li>
                        <Social
                            target="_blank"
                            href={`https://pinterest.com/pin/create/button/?url=https://compras.dolado.com.br/products/${handle}&media=${(
                                data?.images[0]?.originalSrc ?? ""
                            ).replace("https:", "")}&description=${encodeURI(
                                data?.title ?? "",
                            )}`}
                            style={{ minWidth: 90 }}>
                            <img src="/pinterest.svg" alt="pinterest" />
                            <span>{t("productDetail.pinterest")}</span>
                        </Social>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Info;
