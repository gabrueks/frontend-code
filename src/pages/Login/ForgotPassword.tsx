import React, { useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import {
    withForgotPasswordContext,
    useForgotPasswordContext,
} from "../../contexts/ForgotPassword/index";

import Info from "../../components/Error/Info";
import Warning from "../../components/Error/Warning";
import Loading from "../../components/Loading";

import {
    Button,
    ForgotPassword,
    Container,
    Label,
    Input,
    TitleSecondary,
    Subtitle,
} from "./styles";

interface Props {
    goBackToLogin: () => void;
}

function ForgotPasswordFlow({ goBackToLogin }: Props): React.ReactElement {
    const { t } = useTranslation();
    const {
        handleSubmit,
        userError,
        success,
        loading,
    } = useForgotPasswordContext();
    const [error, setError] = useState("");

    const [data, setData] = useState({ email: "" });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const sendForm = () => {
        const emailValid = data.email.match(
            /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
        );
        if (emailValid === null) {
            setError(t("login.errors.email_2"));
        } else {
            setError("");
            handleSubmit(data);
        }
    };
    return (
        <div className="page-width">
            <Container>
                {success && <Info success={success} />}

                <TitleSecondary>{t("forgotPassword.title")}</TitleSecondary>

                <Subtitle>{t("forgotPassword.subtitle")}</Subtitle>

                <Label>{t("forgotPassword.email")}</Label>

                <Input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                />

                {error && <Warning message={error} />}

                {userError && <Warning message={userError} />}

                {loading ? (
                    <Loading />
                ) : (
                    <Button
                        onClick={sendForm}
                        style={{ marginTop: 0, marginBottom: 30 }}>
                        <span>{t("forgotPassword.send")}</span>
                    </Button>
                )}

                <ForgotPassword onClick={goBackToLogin}>
                    <span>{t("forgotPassword.cancel")}</span>
                </ForgotPassword>
            </Container>
        </div>
    );
}

export default withForgotPasswordContext(ForgotPasswordFlow);
