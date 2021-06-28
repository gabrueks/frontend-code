import { Link } from "react-router-dom";
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

export const Logout = styled.button`
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

export const ButtonAddress = styled(Link)`
    width: auto;
    background-color: ${({ theme }) => theme.colors.blue};
    padding: 8px 10px;
    border: 1px solid transparent;
    border-radius: 2px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    letter-spacing: 0.08em;

    span {
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_slab_regular,
                color: theme.colors.white,
            })}
        font-size: 12px;
        text-decoration: none;
    }

    :hover {
        background-color: ${({ theme }) => theme.colors.dark_blue};
    }
`;

export const GridMyAccount = styled.div`
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;
    margin-left: -30px;
`;

export const GridItem = styled.div`
    float: left;
    padding-left: 30px;
    width: 100%;

    ${({ history }: { history?: boolean }) =>
        history
            ? css`
                  @media only screen and (min-width: 990px) {
                      flex: 0.6;
                  }
              `
            : css`
                  @media only screen and (min-width: 990px) {
                      flex: 0.4;
                  }
              `}

    h2 {
        font-size: 21px;
        letter-spacing: 0.1em;
        text-transform: uppercase;

        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_slab_regular,
                color: theme.colors.dark_grey2,
            })}
    }

    p {
        font-size: 16px;

        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_regular,
                color: theme.colors.dark_grey3,
            })}

        font-weight: 300;
    }

    @media only screen and (max-width: 749px) {
        h2 {
            font-size: 19px;
        }

        p {
            font-size: 15px;
        }
    }
`;

export const DefaultAddress = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    margin-bottom: 20px;

    p {
        margin: 3px 0px;
    }
`;
