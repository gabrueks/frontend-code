import styled, { css } from "styled-components";
import theme from "../../../theme";

export const DataResume = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.light_grey2};
    border-radius: 4px;
    padding: 12px 16px;

    display: flex;
    flex-direction: column;

    & > div {
        display: flex;

        &:not(:first-child) {
            margin-top: 12px;
            border-top: 1px solid ${({ theme }) => theme.colors.light_grey3};
            padding-top: 12px;
        }
    }
`;

export const DataInfo = styled.div`
    flex: 1;
    padding-right: 16px;

    display: flex;
    flex-direction: column;

    & label {
        width: 75px;
        min-width: 75px;
        margin: 0 16px 4px 0;
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_light,
                color: theme.colors.grey3,
            })}
        font-size: 14px;
    }

    & span {
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_light,
                color: theme.colors.dark_grey1,
            })}
        font-size: 14px;
        word-wrap: normal;
    }

    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        flex-direction: row;
        align-items: center;

        & label {
            margin: 0 16px 0 0;
        }
    }
`;

export const DataAction = styled.div`
    width: max-content;

    & span {
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_light,
                color: theme.colors.blue2,
            })}
        font-size: 12px;
        cursor: pointer;
    }
`;

export const Error = styled.div`
    background-color: ${({ theme }) => theme.colors.red_1}3;
    margin-bottom: 20px;
    border: 1px solid ${({ theme }) => theme.colors.dark_grey1};
    border-radius: 4px;
    padding: 12px;

    display: flex;

    ${({ theme }) => css(theme.fonts.family.roboto_regular)}
    font-size: 14px;

    & div {
        flex: 1;
    }
    & img {
        width: 24px;
        height: 24px;
        margin-top: -3px;
        margin-right: 10px;
        filter: invert(18%) sepia(95%) saturate(7421%) hue-rotate(10deg)
            brightness(97%) contrast(124%);
    }
`;

export const RadioIcon = styled.div<{ selected?: boolean }>`
    width: 18px;
    min-width: 18px;
    height: 18px;
    margin-right: 10px;
    border: 1px solid ${({ theme }) => theme.colors.light_grey2};
    border-radius: 50%;
    ${({ selected, theme }) =>
        css({
            boxShadow: `inset 0 0 0 ${selected ? "7px" : 0} ${
                theme.colors.blue2
            }`,
        })};

    transition: box-shadow 0.2s ease;
`;

export const RadioItem = styled.button<{ extra?: boolean }>`
    background-color: transparent;
    border: none;
    text-align: left;

    padding: 16px;
    ${({ extra, theme }) =>
        extra && css({ backgroundColor: theme.colors.white2 })}

    cursor: ${({ disabled }) => (disabled ? "no-drop" : "pointer")};

    display: flex;
    align-items: center;

    & p {
        margin: 0;
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_regular,
                color: theme.colors.grey4,
            })}
        font-size: 14px;
        line-height: 1.5em;
    }

    & h3 {
        margin: 0;
        ${({ theme, disabled }) =>
            css({
                ...theme.fonts.family.roboto_medium,
                color: disabled
                    ? theme.colors.light_grey1
                    : theme.colors.dark_grey3,
            })}
        font-size: 14px;
    }

    & > div.content {
        flex: 1;
        display: flex;
        flex-direction: column;

        & p {
            margin-top: 3.5px;
        }

        & > div {
            margin: 6px;
        }
    }

    & *:nth-child(2) {
        flex: 1;
    }

    &:not(:first-child) {
        border-top: 1px solid ${({ theme }) => theme.colors.light_grey2};
    }
`;

export const RadioList = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.light_grey2};
    border-radius: 4px;

    overflow: hidden;

    display: flex;
    flex-direction: column;
`;

export const StepsContainer = styled.div`
    padding: 0 14px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.lg}px) {
        padding: 56px 66px 0 0;
    }
`;

export const StepsFooter = styled.div`
    width: 100%;
    margin-top: 21px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    & span {
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_light,
                color: theme.colors.blue2,
            })}
        font-size: 14px;

        cursor: pointer;

        ::before {
            content: "";
            background-image: url("/icons/chevron-left.svg");
            background-size: 100% auto;
            background-position: center;
            background-repeat: no-repeat;
            padding: 10px;
            filter: invert(42%) sepia(23%) saturate(7124%) hue-rotate(183deg)
                brightness(82%) contrast(81%);
        }
    }
    @media (max-width: 750px) {
        flex-direction: column-reverse;
    }
`;

export const StepsHeader = styled.div`
    padding-bottom: 21px;

    & div {
        display: flex;
        align-items: center;

        & span {
            ${({ theme }) => css(theme.fonts.family.roboto_light)}
            font-size: 12px;
            color: ${({ theme }) => theme.colors.blue2};

            cursor: pointer;

            &:not(:last-child)::after {
                content: "";
                z-index: -1;
                background-image: url("/icons/chevron-right.svg");
                background-size: 100% auto;
                background-position: center;
                background-repeat: no-repeat;
                padding: 12px;
                filter: invert(0.6);
            }
        }
    }

    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.lg}px) {
        padding-bottom: 28px;

        & div {
            margin-top: 14px;
        }
    }
`;

export const Topic = styled.div<{ spaced?: boolean; hasInfo?: boolean }>`
    width: 100%;
    ${({ spaced }) => spaced && css({ paddingTop: "42px" })}

    display: flex;
    flex-direction: column;

    & > h2 {
        margin: 0;
        ${({ hasInfo }) => !hasInfo && css({ marginBottom: "20px" })}
        padding: 2px;
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_regular,
                color: theme.colors.dark_grey3,
            })}
        font-size: 18px;
    }
    & > span {
        margin: 3.5px 0 20px;
        padding: 2px;
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_light,
                color: theme.colors.grey4,
            })}
        font-size: 14px;
    }
`;
