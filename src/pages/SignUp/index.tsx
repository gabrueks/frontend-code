import React, { ChangeEvent, useState } from "react";

import { Container, Title, Label, Input, Button } from "./styles";

import { useSignUpContext, withSignUpContext } from "../../contexts/SignUp";

import Warning from "../../components/Error/Warning";
import Info from "../../components/Error/Info";
import Loading from "../../components/Loading";
import { useTranslation } from "react-i18next";

interface IErrorItem {
    value: string;
    key: string;
}

const SignUp = () => {
    const { t } = useTranslation();
    const { handleSubmit, loading, userError } = useSignUpContext();

    const [error, setError] = useState<IErrorItem[]>([]);
    const invalidEmail = error.find((res) => res.key === "email");
    const invalidPassword = error.find((res) => res.key === "password");

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const sendForm = () => {
        let validEmail = true;
        let validPassword = true;
        const errorPayload = [];

        if (!data.email) {
            validEmail = false;

            errorPayload.push({
                key: "email",
                value: t("signUp.errors.email"),
            });
        }

        if (!data.password) {
            validPassword = false;

            errorPayload.push({
                key: "password",
                value: t("signUp.errors.password"),
            });
        } else {
            if (data.password.length < 5) {
                validPassword = false;

                errorPayload.push({
                    key: "password",
                    value: t("signUp.errors.password_2"),
                });
            }
        }

        if (!validEmail || !validPassword) {
            setError(errorPayload);
        } else {
            setError([]);
            handleSubmit(data);
        }
    };

    return (
        <div className="page-width">
            <Container>
                <Title>{t("signUp.title")}</Title>

                {userError && <Info type="warning" errors={userError} />}

                {error.find((res) => res.key === "email" || "password") && (
                    <Info errors={error} />
                )}

                <Label>{t("signUp.name")}</Label>
                <Input
                    name="firstName"
                    value={data.firstName}
                    onChange={handleChange}
                />

                <Label>{t("signUp.lastName")}</Label>
                <Input
                    name="lastName"
                    value={data.lastName}
                    onChange={handleChange}
                />

                <Label>{t("signUp.email")}</Label>
                <Input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={invalidEmail?.value}
                />
                {invalidEmail && <Warning message={invalidEmail?.value} />}

                <Label>{t("signUp.password")}</Label>
                <Input
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    error={invalidPassword?.value}
                />
                {invalidPassword && (
                    <Warning message={invalidPassword?.value} />
                )}

                {loading ? (
                    <Loading />
                ) : (
                    <Button disabled={loading} onClick={sendForm}>
                        <span>{t("signUp.button")}</span>
                    </Button>
                )}
            </Container>
        </div>
    );
};

export default withSignUpContext(SignUp);
