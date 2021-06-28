import React from "react";
import { useTranslation } from "react-i18next";

import { Container, InfoText } from "./styles";

interface IErrorItem {
    value: string;
    key: string;
}
interface Props {
    errors?: IErrorItem[];
    type?: string;
    success?: IErrorItem[];
    customTitle?: string;
}

const Info: React.FC<Props> = ({
    type = "error",
    errors = [],
    success = [],
    customTitle,
}) => {
    const { t } = useTranslation();
    return (
        <Container type={success[0]?.key || type}>
            {success[0]?.key !== "Confirmation" ? (
                <div>
                    <h2>{customTitle ?? t("errors.default")}</h2>
                    <ul>
                        {errors.length > 0 &&
                            errors?.map((item) => (
                                <li key={item.key}>
                                    <span>{item.value}</span>
                                </li>
                            ))}
                    </ul>
                </div>
            ) : (
                <InfoText>{success[0].value}</InfoText>
            )}
        </Container>
    );
};

export default Info;
