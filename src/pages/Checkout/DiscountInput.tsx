import React, {
    ChangeEventHandler,
    FC,
    ReactElement,
    useEffect,
    useState,
} from "react";
import { useTranslation } from "react-i18next";

import { Button, Discount, Input } from "./styles";
import { ResumeRow } from "./Resume/styles";

import { useCheckoutContext } from "../../contexts/Checkout";

const DiscountInput: FC = (): ReactElement => {
    const { t } = useTranslation();
    const {
        userError,
        discountCodeApplied,
        applyDiscount,
        removeDiscount,
        loading: { discountCodeApplyLoading },
        error: { discountCodeApplyError },
    } = useCheckoutContext();

    const [called, setCalled] = useState(false);
    const [discountCode, setDiscountCode] = useState("");
    const [discountError, setDiscountError] = useState(false);

    useEffect(() => {
        if (called && !discountCodeApplyLoading) {
            if (discountCodeApplyError || userError.length)
                setDiscountError(true);
            else setDiscountCode("");
            setCalled(false);
        }
    }, [called, discountCodeApplyLoading, discountCodeApplyError, userError]);

    const handleDiscountChange: ChangeEventHandler<HTMLInputElement> = (
        event,
    ) => {
        if (discountError) setDiscountError(false);
        setDiscountCode(event.target.value);
    };

    const submitDiscount = async () => {
        await applyDiscount(discountCode);
        setCalled(true);
    };

    return (
        <>
            <ResumeRow>
                <Input error={discountError}>
                    <input
                        type="text"
                        name="discountCode"
                        placeholder={t("checkout.fields.discountCode")}
                        value={discountCode}
                        onChange={handleDiscountChange}
                    />
                    <label>{t("checkout.fields.discountCode")}</label>
                    {discountError && (
                        <span>{t("checkout.errors.discountCode")}</span>
                    )}
                </Input>
                <Button
                    disabled={!discountCode || discountCodeApplyLoading}
                    margin="0 0 0 12px"
                    style={{ maxWidth: "max-content", marginBottom: "0" }}
                    onClick={submitDiscount}>
                    {t("checkout.applyDiscount")}
                </Button>
            </ResumeRow>
            {discountCodeApplied && (
                <ResumeRow style={{ paddingTop: "0" }}>
                    <Discount>
                        <img src="/icons/tag-multiple.svg" alt="tag" />
                        <span>{discountCodeApplied}</span>
                        <img
                            src="/icons/close.svg"
                            alt="remove"
                            onClick={removeDiscount}
                        />
                    </Discount>
                </ResumeRow>
            )}
        </>
    );
};

export default DiscountInput;
