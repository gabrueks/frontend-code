import styled, { css } from "styled-components";

export const Wrapper = styled.div`
    position: fixed;
    top: 4%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 700;
    width: 100%;
    outline: 0;
`;

export const Backdrop = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgb(0 0 0 / 59%);
    z-index: 500;
`;

export const StyledModal = styled.div`
    z-index: 100;
    position: relative;
    margin: auto;
    text-align: -webkit-center;
    height: 110px;
    ${({ theme }) =>
        css({
            background: theme.colors.white,
        })}
`;

export const StyledSubModal = styled.div`
    z-index: 100;
    position: absolute;
    margin: auto;
    text-align: -webkit-center;
    height: auto;
    background: #ffffff;
    margin-top: 73.5px;
    margin-left: 6.5%;
    width: 82%;

    @media (max-width: 750px) {
        margin-left: -1%;
        width: 102%;
    }
`;

export const Header = styled.div`
    border-radius: 8px 8px 0 0;
    display: flex;
    justify-content: space-between;
    padding: 0.3rem;
`;

export const CloseButton = styled.a`
    padding-left: 17px;
    margin-top: 20px;
    :hover {
        cursor: pointer;
        @media (max-width: 500px) {
            margin-right: 0px;
            padding-left: 0px;
        }
    }
`;

export const Body = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 7px;
    padding-right: 10px;
    margin-top: 10px;
`;

export const FormSearch = styled.form`
    flex: 1 1 100%;
    position: relative;
    max-width: 930px;
    border: 1px solid transparent;
    margin-top: 0px;
`;

export const InputSearch = styled.input`
    width: 80%;
    min-height: 38px;
    margin-top: 22px;
    border: none;
    font-size: 16px;
    font-weight: 100;
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_regular,
            color: theme.colors.black,
            backgroundColor: theme.colors.white,
        })}
    border: 1px solid #cccccc;
    padding-left: 22px;
    @media (max-width: 500px) {
        width: 80%;
    }
`;

export const BtnSearch = styled.a`
    z-index: 1;
    position: absolute;
    right: 0;
    display: inline-block;
    padding: 0 12px;
    height: 72%;
    vertical-align: middle;
    border: 0;
    margin: 0;
    margin-right: 13%;
    top: 42px;
    cursor: pointer;
`;

export const Icon = styled.img`
    display: inline-block;
    width: 24px;
    height: 24px;
    vertical-align: middle;
    fill: currentColor;
    :hover {
        opacity: 0.8;
    }
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
    cursor: pointer;
    :hover {
        opacity: 0.6;
    }
`;

export const ListDivisor = styled.hr`
    margin: 10px 25px 25px 20px;
    border: 0;
    border-bottom: 1px solid #ebebeb;
`;

export const Image = styled.img`
    width: 10%;
    height: auto;
    object-fit: cover;
    margin-top: 10px;
`;

export const TextContainer = styled.div`
    width: auto;
    margin-top: 9px;
    display: flex;
    flex-direction: row;
    margin-left: 3%;
    margin-right: 21%;
    text-align: initial;
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
    margin-top: 23px;
    margin-left: 10px;
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
