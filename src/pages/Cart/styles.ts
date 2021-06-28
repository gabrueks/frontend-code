import styled, { css } from "styled-components";
import { flexbox, FlexboxProps, space, SpaceProps } from "styled-system";

export const CartTable = styled.table`
    width: 100%;
    box-sizing: border-box;
    border-collapse: collapse;

    & tbody tr {
        border-bottom: 1px solid ${({ theme }) => theme.colors.light_grey2};
    }

    & tbody tr:first-child {
        border-top: 1px solid ${({ theme }) => theme.colors.light_grey2};
    }
`;

export const CartTableRow = styled.tr`
    & th {
        padding: 27.5px 22px;
    }

    & td {
        padding: 22px 14px;
    }

    & th,
    & td {
        width: 50%;
        text-align: right;
        vertical-align: top;

        ${({ theme }) => css(theme.fonts.family.roboto_light)}
    }

    & th:first-child,
    & td:first-child {
        padding-left: 0;
        text-align: left;
    }

    & th:last-child,
    & td:last-child {
        padding-right: 0;
    }

    & th {
        color: ${({ theme }) => theme.colors.dark_grey2};
        font-size: 14px;
        text-transform: uppercase;
    }

    & td {
        color: ${({ theme }) => theme.colors.dark_grey1};
        font-size: 16px;
    }

    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        & td {
            padding: 22px;
        }

        & th,
        & td {
            width: 20%;
            vertical-align: middle;
        }

        & th:first-child,
        & td:first-child {
            width: 45%;
        }

        & th:last-child,
        & td:last-child {
            width: 15%;
        }
    }
`;

export const CheckoutButton = styled.button<{ isEmpty?: boolean }>`
    border: none;
    border-radius: 2px;
    padding: 10px 18px;

    ${({ disabled, theme }) =>
        css({
            ...theme.fonts.family.roboto_slab_regular,
            color: theme.colors.white,
            backgroundColor: disabled ? theme.colors.grey1 : theme.colors.blue,
        })}
    font-size: 16px;
    text-transform: uppercase;

    cursor: pointer;

    display: flex;
    align-items: center;

    @media only screen and (max-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        min-height: 44px;
        ${({ isEmpty }) => !isEmpty && css({ padding: "8px 50px" })}
    }
`;

export const CommentInput = styled.textarea`
    width: 100%;
    max-width: 384px;
    min-height: 35px;
    border: 1px solid ${({ theme }) => theme.colors.light_grey1};
    padding: 10px 18px;
    resize: vertical;

    ${({ theme }) => css(theme.fonts.family.roboto_light)}
    font-size: 14px;
`;

export const CommentLabel = styled.label`
    margin-bottom: 15px;
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_light,
            color: theme.colors.dark_grey1,
        })}
    font-size: 16px;

    @media only screen and (max-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        font-size: 14px;
        text-align: center;
    }
`;

export const Container = styled.div<{ isEmpty?: boolean }>`
    width: calc(100% - 44px);
    max-width: 1120px;
    min-height: 70vh;
    margin: 55px auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    ${({ isEmpty }) => isEmpty && css({ justifyContent: "center" })}

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpoints.md}px) {
        width: calc(100% - 110px);
    }
`;

export const DesktopOnly = styled.td`
    @media only screen and (max-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        display: none !important;
    }
`;

export const FeesAndTaxes = styled.span`
    margin-bottom: 25px;
    padding: 10px 0 20px;
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_light,
            color: theme.colors.dark_grey1,
        })}
    font-size: 14px;
`;

export const Footer = styled.div<{ isEmpty?: boolean }>`
    width: 100%;
    margin-top: ${({ isEmpty }) => (isEmpty ? 0 : "50px")};

    display: flex;

    & > div {
        flex: 1;
        margin-bottom: 15px;
        display: flex;
        flex-direction: column;
    }

    & > div:last-child {
        ${({ isEmpty }) =>
            css({ alignItems: isEmpty ? "center" : "flex-end" })};
    }

    @media only screen and (max-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        flex-direction: column;
        align-items: center;

        & > div,
        & > div:last-child {
            align-items: center;
        }
    }
`;

export const GoToStore = styled.a`
    border-bottom: 1px solid ${({ theme }) => theme.colors.blue};
    padding-bottom: 1px;
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_light,
            color: theme.colors.blue,
        })}
    font-size: 16px;
    cursor: pointer;
`;

export const EmptyCartLabel = styled.p`
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_light,
            color: theme.colors.dark_grey1,
        })}
    font-size: 16px;
`;

export const MobileOnly = styled.td`
    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.md + 1}px) {
        display: none !important;
    }
`;

export const ProductDetails = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

    & a {
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_slab_regular,
                color: theme.colors.dark_grey1,
            })}
        font-size: 16px;

        cursor: pointer;

        :hover {
            text-decoration: underline;
        }
    }

    & ul {
        margin: 8px 0;
        padding: 0;

        & li:not(:last-child) {
            margin-bottom: 10px;
        }
    }

    & li {
        list-style: none;
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_light,
                color: theme.colors.dark_grey1,
            })}
        font-size: 14px;
    }

    & span {
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_bold,
                color: theme.colors.dark_grey1,
            })}
        font-size: 14px;
    }

    & p {
        width: max-content;
        border-bottom: 1px solid ${({ theme }) => theme.colors.blue};
        padding-bottom: 1px;
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_light,
                color: theme.colors.blue,
            })}
        font-size: 15px;
        cursor: pointer;
    }

    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.lg}px) {
        & a {
            font-size: 18px;
        }

        & p {
            font-size: 16px;
        }
    }
`;

export const ProductImage = styled.div`
    width: 60px;
    box-sizing: border-box;
    padding-right: 15px;

    & > img {
        width: 100%;
        height: auto;
    }

    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.sm}px) {
        width: 80px;
        padding-right: 24px;
    }
    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        width: 128px;
        padding-right: 40px;
    }
    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.lg}px) {
        width: 144px;
        padding-right: 48px;
    }
`;

export const Quantity = styled.input`
    width: 60px;
    height: 37px;
    border: 1px solid ${({ theme }) => theme.colors.light_grey1};
    border-radius: 2px;
    box-sizing: border-box;
    padding: 10px 5px;

    text-align: center;

    :focus {
        border: 1px solid ${({ theme }) => theme.colors.black};
    }

    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        height: 42px;
    }
`;

export const QuantityLabel = styled.label`
    margin-right: 10px;
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_light,
            color: theme.colors.dark_grey1,
        })}
    font-size: 12px;
`;

export const RemovedProduct = styled.td`
    padding: 16px 8px 16px 0;
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_light,
            color: theme.colors.dark_grey1,
        })}
    font-size: 16px;
    line-height: 1.5;

    & span {
        ${({ theme }) => css(theme.fonts.family.roboto_bold)}
    }

    & a {
        border-bottom: 1px solid ${({ theme }) => theme.colors.blue};
        padding-bottom: 1px;
        color: ${({ theme }) => theme.colors.blue};
        cursor: pointer;
    }
`;

export const Row = styled.div<
    SpaceProps &
        Pick<
            FlexboxProps,
            | "flex"
            | "justifyContent"
            | "alignItems"
            | "flexDirection"
            | "flexWrap"
        >
>`
    ${space}
    display: flex;
    align-items: center;
    ${flexbox}
`;

export const Subtotal = styled.span`
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_light,
            color: theme.colors.dark_grey1,
        })}
    font-size: 18px;

    & b {
        padding-left: 27.5px;
        font-weight: 300;
        font-size: 16px;
    }

    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        & b {
            padding-left: 55px;
        }
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
