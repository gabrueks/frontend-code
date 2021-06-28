import styled, { css } from "styled-components";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";

type TButtonProps = Pick<LayoutProps, "height"> & Pick<SpaceProps, "margin">;

export const Button = styled.button.attrs<TButtonProps>((props) => ({
    ...props,
    height: props.height ?? "46px",
}))<TButtonProps>`
    background-color: ${({ disabled, theme }) =>
        disabled ? theme.colors.light_grey1 : theme.colors.blue2};
    ${layout}
    ${space}
    border: none;
    border-radius: 5px;
    padding: 0 24px;

    outline: none;
    ${({ disabled }) => !disabled && css({ cursor: "pointer" })}

    display: flex;
    align-items: center;

    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_medium,
            color: theme.colors.white,
        })}
    font-size: 14px;

    :hover {
        ${({ disabled, theme }) =>
            !disabled && css({ backgroundColor: theme.colors.dark_blue2 })};
    }

    @media (max-width: 750px) {
        margin-bottom: 15px;
        width: 100%;
        justify-content: center;
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    overflow: hidden;
`;

export const Content = styled.div`
    width: 100%;
    @media only screen and (max-width: ${({ theme }) =>
            theme.breakpoints.lg}px) {
        max-width: 560px;
        margin: 0 auto;
    }
`;

export const Discount = styled.div`
    background-color: ${({ theme }) => theme.colors.light_grey3};
    border-radius: 4px;
    padding: 10px;

    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_bold,
            color: theme.colors.dark_grey3,
        })}
    font-size: 14px;

    display: flex;
    align-items: center;

    img {
        width: 18px;
        height: 18px;
        transform: rotateY(180deg);
        filter: invert(0.5);

        &:first-child {
            margin-right: 5px;
        }
        &:last-child {
            width: 20px;
            height: 20px;
            margin-left: 8px;

            cursor: pointer;

            &:hover {
                filter: invert(0);
            }
        }
    }
`;

export const Divider = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.light_grey3};
`;

export const Input = styled.div<{ error?: boolean }>`
    flex: 1;
    position: relative;

    display: flex;
    flex-direction: column;

    ${({ theme }) => css(theme.fonts.family.roboto_regular)}

    & span {
        margin: 8px 4px 4px;
        color: ${({ theme }) => theme.colors.red_1};
        font-size: 13px;
    }

    & label {
        position: absolute;
        top: 23px;
        left: 12px;
        transform: translate(0, -50%);
        z-index: 5;

        color: ${({ theme }) => theme.colors.grey3};
        font-size: 12px;

        opacity: 0;
        transition: all 0.2s ease-out;
    }

    & input {
        position: relative;
        z-index: 10;
        background-color: transparent;
        width: 100%;
        height: 46px;
        ${({ error, theme }) =>
            css({
                border: `${error ? 2 : 1}px solid ${
                    error ? theme.colors.red_1 : theme.colors.light_grey2
                }`,
            })}
        border-radius: 5px;
        padding: 13px 11px;

        color: ${({ theme }) => theme.colors.dark_grey1};
        font-size: 14px;

        outline: none;
        box-sizing: border-box;

        transition: padding 0.2s ease-out, border 0.1s ease;
    }
    & input:focus {
        border: 2px solid
            ${({ error, theme }) =>
                error ? theme.colors.red_1 : theme.colors.blue2};
    }
    & input:not(:placeholder-shown) {
        padding: 21px 11px 5px;

        & ~ label {
            opacity: 1;
            top: 15px;
        }
    }

    ::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 46px;
        border-radius: 5px;
        background-color: white;
    }
`;

export const Logo = styled.a<{ mobile?: boolean }>`
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_regular,
            color: theme.colors.dark_grey3,
        })}
    font-size: 28px;

    cursor: pointer;

    @media only screen and (max-width: ${({ theme }) =>
            theme.breakpoints.lg - 1}px) {
        ${({ mobile }) => !mobile && css({ display: "none" })}
        width: calc(100% - 28px);
        max-width: 560px;
        margin: 21px auto;
    }

    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.lg}px) {
        ${({ mobile }) => mobile && css({ display: "none" })}
    }
`;

export const Price = styled.span<{ large?: boolean }>`
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_bold,
            color: theme.colors.dark_grey1,
        })}
    font-size: ${({ large }) => (large ? "24px" : "14px")};
    ${({ large }) => large && css({ fontWeight: 500 })};
`;

export const Select = styled.div<{ error?: boolean }>`
    flex: 1;
    position: relative;

    ${({ theme }) => css(theme.fonts.family.roboto_regular)}

    & span {
        margin: 8px 4px 4px;
        color: ${({ theme }) => theme.colors.red_1};
        font-size: 13px;
    }

    & label {
        position: absolute;
        top: 15px;
        left: 12px;
        transform: translate(0, -50%);
        z-index: 5;

        color: ${({ theme }) => theme.colors.grey3};
        font-size: 12px;
    }

    & select {
        position: relative;
        z-index: 10;
        width: 100%;
        height: 46px;
        margin-bottom: 0;
        ${({ error, theme }) =>
            css({
                border: `${error ? 2 : 1}px solid ${
                    error ? theme.colors.red_1 : theme.colors.light_grey2
                }`,
            })}
        border-radius: 5px;
        padding: 21px 29px 5px 11px;

        color: ${({ theme }) => theme.colors.dark_grey1};
        font-size: 14px;

        outline: none;
        box-sizing: border-box;

        appearance: none !important;
        background-image: none !important;
        background-color: transparent;
    }
    & select:focus {
        border: 2px solid
            ${({ error, theme }) =>
                error ? theme.colors.red_1 : theme.colors.blue2};
    }

    ::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 46px;
        border-radius: 5px;
        background-color: white;
    }

    ::after {
        content: "";
        position: absolute;
        top: 23px;
        right: 6px;
        transform: translate(0, -50%);
        z-index: 5;
        width: 24px;
        height: 24px;
        background-image: url("/icons/menu-down.svg");
        background-size: cover;
        border-left: 1px solid black;
        filter: invert(0.7);
    }
`;

export const Wrapper = styled.div`
    width: 100%;
    max-width: 1100px;
    min-height: 100vh;
    margin: 0 auto;

    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-end;

    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.lg}px) {
        width: calc(100% - 110px);
        display: grid;
        grid-template-columns: 58% 42%;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;

    & > div {
        display: flex;
    }

    & ${Input}, & ${Select} {
        margin: 6px;
    }

    @media only screen and (max-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        & > div {
            flex-direction: column;
        }
    }
`;
