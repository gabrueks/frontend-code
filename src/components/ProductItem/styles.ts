import styled, { css } from "styled-components";

export const Image = styled.img`
    width: 100%;
    height: auto;
`;

export const TextContainer = styled.div`
    width: 100%;
    margin-top: 10px;

    display: flex;
    flex-direction: column;
`;

export const Title = styled.h4`
    margin: 0;
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_slab_regular,
            color: theme.colors.dark_grey1,
        })}
    font-size: 15px;

    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        font-size: 18px;
    }
`;

export const Vendor = styled.h4`
    margin: 5px 0 7px;
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_light,
            color: theme.colors.dark_grey1,
        })}
    font-size: 15px;
    letter-spacing: 1px;
`;

export const Price = styled.span<{ crossed?: boolean }>`
    margin-right: 7px;
    ${({ crossed, theme }) =>
        css({
            ...theme.fonts.family.roboto_regular,
            color: crossed ? theme.colors.dark_grey1 : theme.colors.blue,
            textDecoration: crossed ? "line-through" : "",
        })}
    font-size: 15px;

    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        font-size: 17px;
    }
`;

export const PromoLabel = styled.span`
    width: max-content;
    margin-top: 7px;
    box-sizing: border-box;
    border-radius: 2px;
    padding: 3px 8px;

    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_black,
            color: theme.colors.white,
            backgroundColor: theme.colors.blue,
        })}
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
`;

export const Container = styled.li`
    flex: 1;
    min-width: 158px;
    padding: 0 15px 30px;

    list-style: none;
    cursor: pointer;

    :hover {
        & ${Title} {
            text-decoration: underline;
        }

        & ${Image} {
            filter: opacity(0.5);
        }
    }

    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        max-width: 195px;
    }
`;
