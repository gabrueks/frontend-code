import React from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    margin-top: -10px;

    img {
        width: 14px;
        height: auto;
        margin-right: 10px;
    }

    span {
        color: ${({ theme }) => theme.colors.dark_grey3};
        font-size: 14px;
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_regular,
            })}
        font-weight: 300;
    }
`;

interface Props {
    message: string | boolean | undefined;
}

const Error: React.FC<Props> = ({ message }) => {
    return (
        <Container>
            <img src="/warning.svg" alt="warning" />
            <span>{message}</span>
        </Container>
    );
};

export default Error;
