import styled, { css } from "styled-components";

export const Image = styled.img`
    width: 75%;
    height: auto;
    object-fit: cover;
    align-self: center;

    @media (max-width: 750px) {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
`;

export const TextContainer = styled.div`
    width: auto;
    margin-top: 10px;
    display: grid;
    grid-template-columns: 0.3fr 2fr 0.4fr;
    height: 130px;
    margin-left: 13%;
    margin-right: 19%;
    @media (max-width: 750px) {
        margin-left: 5%;
        margin-right: 5%;
        height: 170px;
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
        font-size: 18px;
    }
    width: 70%;
    margin-top: 60px;
`;

export const Price = styled.span<{ crossed?: boolean }>`
    ${({ crossed, theme }) =>
        css({
            ...theme.fonts.family.roboto_regular,
            color: crossed ? theme.colors.dark_grey1 : theme.colors.blue,
            textDecoration: crossed ? "line-through" : "",
        })}
    font-size: 15px;
    @media (max-width: 750px) {
        font-size: 17px;
        margin-top: -15px;
    }
`;

export const PromoLabel = styled.span`
    width: max-content;
    margin-top: -15px;
    height: 19px;
    box-sizing: border-box;
    border-radius: 2px;
    padding: 3px 7px;
    margin-left: -35px;

    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_black,
            color: theme.colors.white,
            backgroundColor: theme.colors.blue,
        })}
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    @media (max-width: 750px) {
        margin-top: -35px;
    }
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
    }

    width: 100%;
`;

export const PriceContainer = styled.div`
    display: grid;
    flex-direction: row;
    grid-template-columns: 1fr 1fr;
    text-align: center;
    margin-top: 60px;
    @media (max-width: 750px) {
        grid-template-columns: 1fr;
    }
`;
export const ListDivisor = styled.hr`
    width: 65%;
    border: 0;
    border-bottom: 1px solid #ebebeb;
    margin-left: 17%;
`;
