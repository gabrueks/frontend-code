import styled, { css } from "styled-components";

export const StyledSubModal = styled.div`
    z-index: 100;
    position: absolute;
    margin: auto;
    text-align: -webkit-center;
    ${({ theme }) =>
        css({
            background: theme.colors.white,
        })}
    left: 0;
    right: 50px;
    width: 34.4%;
    border: 1px solid #cccccc;
    min-width: 22rem;
    max-width: 54.3rem;

    @media (max-width: 750px) {
        width: 64.2%;
        min-width: 15.5rem;
    }
`;

export const Title = styled.h4`
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_slab_regular,
            color: theme.colors.dark_grey1,
        })}
    font-size: 15px;
    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        font-size: 15px;
    }
    width: 90%;
    margin-top: 20px;
    margin-left: 10px;
`;

export const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    line-height: 1.5;
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_regular,
            color: theme.colors.dark_grey2,
        })}
    font-weight: 300;
    font-size: 16px;

    @media (max-width: 750px) {
        font-size: 14px;
    }
`;

export const TitleSecondary = styled.h1`
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_slab_regular,
            color: theme.colors.dark_grey2,
        })}
    font-weight: 400;
    font-size: 21px;
    margin-bottom: 18px;
    text-align: center;
    letter-spacing: 0.1em;
    margin-bottom: 5px;
    margin-top: 50px;

    @media (max-width: 750px) {
        font-size: 18px;
    }
`;

export const Subtitle = styled.h3`
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_regular,
            color: theme.colors.dark_grey2,
        })}
    font-weight: 300;
    font-size: 16px;
    text-align: center;
    text-decoration: none;
`;

export const Body = styled.div`
    flex: 1;
    text-align: center;
    width: 100%;
`;

export const InputSearch = styled.input`
    width: 33%;
    min-height: 38px;
    margin-top: 10px;
    border: none;
    font-size: 16px;
    font-family: Roboto;
    font-weight: 100;
    border: 1px solid #cccccc;
    padding-left: 22px;
    ${({ theme }) =>
        css({
            backgroundColor: theme.colors.white,
            color: theme.colors.black,
        })}
    @media (max-width: 750px) {
        width: 60%;
        max-width: 28.5rem;
        min-width: 14rem;
    }
    @media (min-width: 751px) {
        min-width: 20.5rem;
    }
`;

export const BtnSearch = styled.a`
    z-index: 1;
    right: 0;
    display: inline-block;
    padding: 0 12px;
    vertical-align: middle;
    border: 0;
    margin: 0;
    align-items: center;
    ${({ theme }) =>
        css({
            backgroundColor: theme.colors.blue,
        })}
    width: 26px;
    height: 42px;
    margin-top: -3px;
    cursor: pointer;
`;

export const Icon = styled.img`
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    fill: currentColor;
    margin-top: 10px;
    :hover {
        opacity: 0.8;
    }
`;

export const ListDivisor = styled.hr`
    margin: 55px 0;
    border: 0;
    border-bottom: 1px solid #ebebeb;
`;

export const ListDivisorSubmodal = styled.hr`
    margin: 25px 0;
    border: 0;
    border-bottom: 1px solid #ebebeb;
`;

export const Image = styled.img`
    width: 10%;
    height: auto;
    object-fit: cover;
    margin-top: 10px;
    @media (max-width: 750px) {
        width: 30%;
        height: 80%;
        object-fit: cover;
    }
`;

export const SearchFor = styled.h3`
    font-size: 18px;
    padding-left: 18px;
    text-align: initial;
    font-weight: 300;
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_slab_regular,
            color: theme.colors.dark_grey2,
        })}
    margin-top: -15px;
    word-wrap: break-word;
    cursor: pointer;
    :hover {
        opacity: 0.6;
    }
`;

export const ClearInput = styled.a`
    z-index: 1;
    position: absolute;
    display: inline-block;
    padding: 0 -9px;
    margin-left: -32px;
    height: 72%;
    vertical-align: middle;
    margin-right: 0%;
    margin-top: 10px;
    cursor: pointer;
`;

export const Container = styled.li`
    flex: 1;
    list-style: none;
    cursor: pointer;

    :hover {
        & ${Title} {
            text-decoration: underline;
        }

        & ${Image} {
            filter: opacity(0.5);
        }
        background-color: #ebebeb;
        filter: opacity(1);
        transition: background-color 100ms ease-in-out;
    }

    width: 100%;
`;

export const SectionType = styled.h3`
    font-size: 16px;
    padding-left: 18px;
    text-align: initial;
    font-weight: 100;
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_slab_regular,
            color: theme.colors.grey5,
        })}
`;

export const TextContainer = styled.div`
    width: auto;
    margin-top: 9px;
    display: flex;
    flex-direction: row;
    margin-left: 3%;
    text-align: initial;
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
