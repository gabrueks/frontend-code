import React, { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import Loading from "../../components/Loading";
import Warning from "../../components/Error/Warning";

import { useLoginContext, withLoginContext } from "../../contexts/Login";

import {
    Container,
    Title,
    Label,
    Input,
    Link,
    Button,
    ForgotPassword,
} from "./styles";
import Info from "../../components/Error/Info";

interface IErrorItem {
    value: string;
    key: string;
}

interface Props {
    goToForgotPassword: () => void;
}

function Login({ goToForgotPassword }: Props): React.ReactElement {
    const { t } = useTranslation();
    const { handleSubmit, loading, userError } = useLoginContext();

    const [error, setError] = useState<IErrorItem[]>([]);
    const invalidEmail = error.find((res) => res.key === "email");
    const invalidPassword = error.find((res) => res.key === "password");

    const [data, setData] = useState({
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
                value: t("login.errors.email"),
            });
        }

        if (!data.password) {
            validPassword = false;

            errorPayload.push({
                key: "password",
                value: t("login.errors.password"),
            });
        } else {
            if (data.password.length < 5) {
                validPassword = false;

                errorPayload.push({
                    key: "password",
                    value: t("login.errors.password_2"),
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
                <Title>{t("login.title")}</Title>

                {userError && <Info errors={userError} />}

                <Label>{t("login.email")}</Label>
                <Input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={invalidEmail?.value}
                />
                {invalidEmail && <Warning message={invalidEmail?.value} />}

                <Label>{t("login.password")}</Label>
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

                <ForgotPassword onClick={goToForgotPassword}>
                    <span>{t("login.forgotPassword")}</span>
                </ForgotPassword>

                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <Button disabled={loading} onClick={sendForm}>
                            <span>{t("login.doLogin")}</span>
                        </Button>

                        <Link to="/account/register">
                            {t("login.createAccount")}
                        </Link>
                    </>
                )}
            </Container>
        </div>
    );
}

export default withLoginContext(Login);
