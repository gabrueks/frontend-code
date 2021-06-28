import styled, { css } from "styled-components";

import { Link as LinkRouter } from "react-router-dom";

interface InputProps {
    error?: string | boolean | null;
}

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    position: relative;
    padding: 55px 0px;

    @media (min-width: 750px) {
        left: 25%;
        width: 50%;
    }
`;

export const Title = styled.h1`
    font-family: "Roboto Slab";
    font-weight: 400;
    font-size: 37px;
    color: #3a3a3a;
    margin-bottom: 18px;
    text-align: center;
`;

export const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    line-height: 1.5;
    color: #3a3a3a;
    font-family: "Roboto";
    font-weight: 300;
    font-size: 16px;

    @media (max-width: 750px) {
        font-size: 14px;
    }
`;

export const Input = styled.input`
    display: block;
    width: auto;
    margin-bottom: 19.44444px;
    padding: 10px 18px;
    max-width: 100%;
    line-height: 1.2;
    border-radius: 2px;
    border: 1px solid #ccc;
    color: #000;
    background-color: #fff;
    font-family: "Roboto";
    font-weight: 300;
    font-size: 16px;

    ${({ error }: InputProps) =>
        error &&
        css`
            border-color: #d20000;
            background-color: #fff8f8;
            color: #d20000;
        `}
`;

export const Link = styled(LinkRouter)`
    color: #3a3a3a;
    font-family: "Roboto";
    font-weight: 300;
    font-size: 16px;
    text-align: center;
    text-decoration: none;

    :hover {
        color: #606060;
    }
`;

export const ForgotPassword = styled.button`
    background-color: transparent;
    cursor: pointer;
    border: none;

    span {
        color: #3a3a3a;
        font-family: "Roboto";
        font-weight: 300;
        font-size: 16px;
        text-align: center;
        text-decoration: none;

        :hover {
            color: #606060;
        }
    }
`;

export const Button = styled.button`
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    cursor: pointer;
    width: max-content;
    background-color: #1767f5;
    padding: 10px 18px;
    border: 1px solid transparent;
    border-radius: 2px;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;

    span {
        font-family: "Roboto Slab";
        font-weight: 400;
        color: #fff;
        text-decoration: none;
    }

    :hover {
        background-color: #0951d0;
    }
`;

export const TitleSecondary = styled.h1`
    font-family: "Roboto Slab";
    font-weight: 400;
    font-size: 21px;
    color: #3a3a3a;
    margin-bottom: 18px;
    text-align: center;
    letter-spacing: 0.1em;
    margin-bottom: 5px;

    @media (max-width: 750px) {
        font-size: 18px;
    }
`;

export const Subtitle = styled.h3`
    color: #3a3a3a;
    font-family: "Roboto";
    font-weight: 300;
    font-size: 16px;
    text-align: center;
    text-decoration: none;
`;
