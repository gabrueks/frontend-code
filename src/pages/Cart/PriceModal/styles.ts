import styled, { css } from "styled-components";

import { navLayout } from "../../../constants";

const SAFE_MARGIN = 12;

export const Background = styled.div`
    position: fixed;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: ${({ theme }) => `${theme.colors.blackOpacity}`};

    @media (min-width: 750px) {
        height: calc(100% + ${navLayout.desktop.HEIGHT + SAFE_MARGIN}px);
        margin-top: -${navLayout.desktop.HEIGHT + SAFE_MARGIN}px;
    }
    @media (max-width: 749px) {
        height: calc(100% + ${navLayout.mobile.HEIGHT + SAFE_MARGIN}px);
        margin-top: -${navLayout.mobile.HEIGHT + SAFE_MARGIN}px;
    }
`;

export const Container = styled.div`
    position: relative;
    box-sizing: border-box;
    z-index: 2;
    width: 500px;
    max-width: 100%;
    margin: 18px;
    padding: 18px;
    min-height: 177px;
    background-color: ${({ theme }) => `${theme.colors.white}`};
    line-height: 1.5;
`;

export const Title = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: ${({ theme }) => `${theme.colors.dark_grey2}`};

    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_light,
        })}

    img {
        width: 18px;
        height: 18px;
        cursor: pointer;
    }
`;

export const Text = styled.div`
    box-sizing: border-box;
    padding-left: 32px;
    margin-bottom: 48px;
    color: ${({ theme }) => `${theme.colors.dark_grey2}`};

    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_light,
        })}
`;

export const Button = styled.button`
    position: absolute;
    cursor: pointer;
    width: 62px;
    height: 37px;
    bottom: 18px;
    right: 18px;
    padding: 8px 20px;
    text-transform: uppercase;
    background-color: ${({ theme }) => theme.colors.blue4};
    border: none;

    color: ${({ theme }) => theme.colors.white};
    text-align: center;
    font-family: "Montserrat", "HelveticaNeue", "Helvetica Neue", sans-serif;
    font-size: "14px";
    font-weight: 400;
`;
