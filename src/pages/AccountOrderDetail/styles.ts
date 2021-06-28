import styled, { css } from "styled-components";

export const Container = styled.div`
    padding-top: 35px;
    padding-bottom: 35px;

    @media only screen and (min-width: 750px) {
        padding-top: 55px;
        padding-bottom: 55px;
    }
`;

export const SectionHeader = styled.div`
    text-align: center;
    margin-bottom: 35px;

    @media only screen and (min-width: 750px) {
        margin-bottom: 55px;
    }
`;

export const Title = styled.h1`
    margin: 0;
    margin-bottom: 8px;
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_slab_regular,
            color: theme.colors.dark_grey2,
        })}
    font-size: 35px;

    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        margin-bottom: 16px;
        font-size: 37px;
    }
`;

export const Return = styled.button`
    background-color: transparent;
    cursor: pointer;
    border: none;

    span {
        font-size: 16px;

        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_regular,
                color: theme.colors.dark_grey2,
            })}

        font-weight: 300;
    }
`;

export const DoubleColumnDesktop = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        > :last-child {
            padding-left: 30px;
        }
    }
`;

type TDesktopColumn = {
    width: string;
};
export const DesktopColumn = styled.div<TDesktopColumn>`
    box-sizing: border-box;

    > p {
        ${({ theme }) => theme.fonts.family.roboto_light}
        color: ${({ theme }) => theme.colors.dark_grey3};
        margin-bottom: 20px;
    }

    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        width: ${({ width }) => width};
    }
    @media only screen and (max-width: ${({ theme }) =>
            theme.breakpoints.md - 1}px) {
        width: 100%;
    }
`;

export const OrderTitle = styled.div`
    width: 100%;
    justify-content: flex-start;

    ${({ theme }) => theme.fonts.family.roboto_slab_regular}
    color: ${({ theme }) => theme.colors.dark_grey2};
    font-size: 20px;
    line-height: 1.2;
    word-wrap: break-word;
    letter-spacing: 0.1em;
    text-transform: uppercase;
`;

export const Address = styled.div`
    margin-bottom: 20px;

    > div {
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_slab_regular,
                color: theme.colors.dark_grey2,
                fontSize: "26px",
            })}
        @media only screen and (max-width: ${({ theme }) =>
            theme.breakpoints.md - 1}px) {
            font-size: 22px;
        }
    }

    > p {
        ${({ theme }) => theme.fonts.family.roboto_light}
        color: ${({ theme }) => theme.colors.dark_grey3};
        margin: 0px;
        line-height: 1.4;
    }
`;
export const Status = styled.p`
    ${({ theme }) => theme.fonts.family.roboto_light}
    color: ${({ theme }) => theme.colors.dark_grey2};
    margin: 20px 0px !important;

    > span {
        font-weight: 400;
    }
`;
