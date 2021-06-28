import styled, { css } from "styled-components";

export const ProductData = styled.div`
    display: flex;
    flex-direction: column;

    line-height: 1.3em;

    & h3 {
        margin: 0;
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_bold,
                color: theme.colors.dark_grey1,
            })}
        font-size: 14px;
    }
    & span {
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_light,
                color: theme.colors.grey3,
            })}
        font-size: 13px;
    }
`;

export const ProductImage = styled.div`
    position: relative;
    background-color: ${({ theme }) => theme.colors.white};
    width: 65px;
    height: 65px;
    border: 1px solid ${({ theme }) => theme.colors.light_grey3};
    border-radius: 8px;

    & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

export const ProductList = styled.table`
    width: 100%;
    margin: 15px 0;

    border-collapse: collapse;
    border-spacing: 0;

    & tr {
        height: 78px;
    }

    & td {
        vertical-align: middle;
    }
    & td:nth-child(1) {
        width: 65px;
    }
    & td:nth-child(2) {
        width: 70%;
        padding: 14px 0 14px 14px;
    }
    & td:nth-child(3) {
        width: 30%;
        padding-left: 14px;
        text-align: right;
    }
`;

export const ProductQuantity = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(7px, -50%);
    width: max-content;
    height: 21px;
    border-radius: 10.5px;
    padding: 0 7px;
    background-color: ${({ theme }) => theme.colors.grey3};

    display: flex;
    justify-content: center;
    align-items: center;

    & span {
        width: max-content;
        height: 100%;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.6;
        color: ${({ theme }) => theme.colors.white};
    }
`;

export const ResumeContainer = styled.div<{ toggled?: boolean }>`
    position: relative;
    background-color: ${({ theme }) => theme.colors.white4};
    padding: 0 14px;

    display: flex;
    flex-direction: column;

    @media only screen and (max-width: ${({ theme }) =>
            theme.breakpoints.lg - 1}px) {
        ${({ toggled, theme }) =>
            toggled
                ? css({
                      maxHeight: "1000px",
                      borderBottom: `1px solid ${theme.colors.light_grey2}`,
                  })
                : css({ maxHeight: 0 })}

        overflow: hidden;
        transition: max-height 0.5s ease;
    }

    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.lg}px) {
        border-left: 1px solid ${({ theme }) => theme.colors.light_grey2};
        padding: 56px 0 0 44px;

        ::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: -1;
            background-color: ${({ theme }) => theme.colors.white4};
            width: 300%;
            height: 100%;
        }
    }
`;

export const ResumeRow = styled.div`
    width: 100%;
    padding: 21px 0;

    display: flex;
`;

export const ResumeTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;

    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_light,
            color: theme.colors.grey4,
        })}
    font-size: 14px;

    & td img {
        vertical-align: middle;
    }
    & tr:not(:first-child) td {
        padding-top: 10.5px;
    }
    & td:not(:first-child) {
        padding-left: 21px;
        text-align: right;
    }
`;

export const ResumeToggle = styled.div<{ toggled?: boolean }>`
    ${({ theme }) =>
        css({
            backgroundColor: theme.colors.white4,
            borderBottom: `1px solid ${theme.colors.light_grey2}`,
            borderTop: `1px solid ${theme.colors.light_grey2}`,
        })}
    padding: 17.5px 14px;

    & p {
        margin: 0 20px 0 0;
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_light,
                color: theme.colors.blue2,
            })}
        font-size: 14px;

        ::before {
            content: "";
            background-image: url("/icons/cart-outline.svg");
            background-size: 100% auto;
            background-position: center;
            background-repeat: no-repeat;
            padding: 12px;
            margin-right: 8px;
            filter: invert(42%) sepia(23%) saturate(7124%) hue-rotate(183deg)
                brightness(82%) contrast(81%);
        }
        ::after {
            content: "";
            background-image: ${({ toggled }) =>
                `url("/icons/chevron-${toggled ? "up" : "down"}.svg")`};
            background-size: 100% auto;
            background-position: center;
            background-repeat: no-repeat;
            padding: 10px;
            filter: invert(42%) sepia(23%) saturate(7124%) hue-rotate(183deg)
                brightness(82%) contrast(81%);
        }
    }

    cursor: pointer;

    & div.toggleRow {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.lg}px) {
        display: none;
    }
`;
