import styled, { css } from "styled-components";

export const Container = styled.div`
    min-height: 90vh;
    margin-bottom: 30px;

    display: flex;
    flex-direction: column;
`;

export const ProductsContainer = styled.ul`
    width: calc(100% - 14px);
    max-width: 1120px;
    margin: 0 auto;
    padding: 0;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        width: calc(100% - 80px);
    }
`;

export const ActionsContainer = styled.div`
    width: 100%;
    margin: 30px 0 0;
    border-top: 1px solid ${({ theme }) => theme.colors.light_grey2};
    border-bottom: 1px solid ${({ theme }) => theme.colors.light_grey2};

    & div {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    & > div {
        width: calc(100% - 15px);
        max-width: 1120px;
        margin: 0 auto;
        justify-content: space-between;
    }

    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        margin: 30px 0 55px;
        & > div {
            width: calc(100% - 55px);
        }
    }
`;

export const Action = styled.div`
    @media only screen and (max-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        flex-direction: column;
        align-items: flex-start !important;
    }
`;

export const ActionLabel = styled.label`
    margin-left: 15px;
    margin-bottom: 0;
    ${({ theme }) => css(theme.fonts.family.roboto_light)}
    font-size: 12px;
    text-transform: uppercase;

    @media only screen and (max-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        margin-top: 10px;
    }
`;

export const TotalLabel = styled.span<{ mobile?: boolean }>`
    ${({ mobile }) => mobile && css({ margin: "15px" })}
    margin-right: 15px;
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_light_italic,
            color: theme.colors.grey1,
        })}
    font-size: 15px;

    ${({ mobile, theme }) => css`
        @media only screen and (${mobile ? "min" : "max"}-width: ${theme
                .breakpoints.md}px) {
            display: none;
        }
    `}
`;

export const BannerContainer = styled.div<{ src: string }>`
    background-image: url("${({ src }) => src}");
    background-size: 100% auto;
    width: 100%;
    height: ${({ src }) => (src ? "300px" : "100px")};
    ${({ src }) => !src && css({ marginTop: "20px" })}

    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.8;
    background-position: 0px;
    background-repeat: no-repeat;

    @media only screen and (max-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        height: 180px;
    }
`;

export const Title = styled.h1<{ hasBanner: boolean }>`
    ${({ hasBanner, theme }) =>
        css({
            ...theme.fonts.family.roboto_slab_regular,
            color: hasBanner ? theme.colors.white : theme.colors.black,
        })};
    font-size: 35px;
    text-align: center;
`;

export const PaginationContainer = styled.div`
    width: 100%;
    margin: 15px 0;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const PageButton = styled.button`
    background-color: ${({ theme }) => theme.colors.white};
    width: 52px;
    height: 38px;
    border: 1px solid
        ${({ disabled, theme }) =>
            disabled ? theme.colors.light_grey1 : theme.colors.black};
    border-radius: 2px;

    cursor: pointer;
    outline: none;

    display: flex;
    justify-content: center;
    align-items: center;

    :disabled {
        & > img {
            filter: invert(0.7);
        }
    }

    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        height: 42px;
    }
`;

export const PageText = styled.span`
    margin: 0 27px;
    ${({ theme }) =>
        css({ ...theme.fonts.family.roboto_light, color: theme.colors.grey1 })}
    font-size: 15px;
`;
