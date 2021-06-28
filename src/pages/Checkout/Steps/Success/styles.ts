import styled, { css } from "styled-components";

export const Confirmation = styled.div`
    display: flex;
    flex-direction: column;

    & h2,
    & h3 {
        margin: 0;
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_regular,
                color: theme.colors.dark_grey3,
            })}
    }

    & h2 {
        font-size: 18px;
    }

    & h3 {
        font-size: 22px;
    }

    & p,
    & span {
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_light,
                color: theme.colors.grey4,
            })}
        font-size: 14px;
    }

    & p {
        margin-top: 10px;
    }

    & span {
        margin: 0 0 3.5px 0;
    }
`;

export const IconContainer = styled.div`
    width: 100%;
    display: flex;

    ::before {
        content: "";
        width: 48px;
        height: 48px;
        margin-right: 10px;
        border: 2px solid ${({ theme }) => theme.colors.black};
        border-radius: 50%;
        box-sizing: border-box;
        background-image: url("/icons/check.svg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 50%;
        filter: invert(42%) sepia(23%) saturate(7124%) hue-rotate(183deg)
            brightness(82%) contrast(81%);
    }

    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.xl + 50}px) {
        margin-left: -58px;
    }
`;

export const PinMap = styled.div`
    position: relative;
    z-index: 1;
    transform: translate(-50%, calc(-100% - 44px));
    width: 190px;
    border-radius: 8px;
    box-shadow: 0 2px 7px 1px rgb(0 0 0 / 30%);
    padding: 8px 12px;
    background-color: ${({ theme }) => theme.colors.white};

    display: flex;
    flex-direction: column;
    align-items: center;

    ::before {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        z-index: -1;
        transform: translate(-50%, -50%) rotateZ(45deg);
        width: 20px;
        height: 20px;
        background-color: ${({ theme }) => theme.colors.white};
    }

    & img {
        position: absolute;
        top: calc(100% + 18px);
        left: 50%;
        transform: translate(-50%, 0);
        width: 26px;
        height: 26px;
        filter: invert(51%) sepia(62%) saturate(4584%) hue-rotate(333deg)
            brightness(93%) contrast(108%);
    }

    & p {
        margin: 0;
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_regular,
                color: theme.colors.dark_grey3,
            })}
        font-size: 12px;
    }

    & h3 {
        margin: 0;
        margin-top: 7px;
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_bold,
                color: theme.colors.dark_grey3,
            })}
        font-size: 14px;
    }
`;

export const UserInfo = styled.div`
    width: 100%;
    display: flex;

    & > div {
        flex: 1;
        display: flex;
        flex-direction: column;

        &:first-child {
            padding-right: 20px;
        }

        & > * {
            flex: 0 !important;
        }
    }

    & h3 {
        margin: 0;
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_regular,
                color: theme.colors.dark_grey1,
            })}
        font-size: 14px;

        &:not(:first-child) {
            margin-top: 20px;
        }
    }

    & p {
        margin: 8.5px 0 0;
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_light,
                color: theme.colors.dark_grey3,
            })}
        font-size: 14px;
        line-height: 1.5em;
    }

    @media only screen and (max-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        flex-direction: column;

        & > div:not(:first-child) {
            padding-top: 20px;
        }
    }
`;

export const UserInfoLabel = styled.h2`
    margin: 0;
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_regular,
            color: theme.colors.grey4,
        })}
    font-size: 18px;
`;
