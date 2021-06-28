import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div``;

export const ContainerCard = styled.div`
    min-height: 90vh;
`;

export const Card = styled.div`
    width: calc(100% - 7px);
    max-width: 1120px;
    margin: 0 auto;
    padding: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 7rem;

    @media only screen and (max-width: 750px) {
        display: grid;
        flex-direction: column;
        margin-top: 55px;
        width: calc(100% - 7px);
        margin-bottom: 55px;
    }
`;

export const HeroMedium = styled.div`
    position: relative;
    display: table;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    height: 357px;

    @media only screen and (min-width: 750px) {
        height: 475px;
    }

    ::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #685858;
        opacity: 0.4;
        z-index: 1;
    }
`;

export const CardsBackground = styled.div`
    position: relative;
    display: table;
    width: 100%;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
`;

export const HeroInner = styled.div`
    position: relative;
    display: table-cell;
    vertical-align: middle;
    padding: 55px 0;
    z-index: 2;
`;

export const Title = styled.h2`
    color: #fff;
    font-size: 37px;
    font-family: "Roboto Slab";
    font-weight: 100;
    text-shadow: 0 0 4px rgb(0 0 0 / 40%);
    margin-bottom: 8px;

    @media only screen and (max-width: 749px) {
        font-size: 35px;
    }
`;

export const SubTitle = styled.span`
    color: #fff;
    font-size: 20px;
    font-family: "Roboto";
    font-weight: 300;

    @media only screen and (min-width: 750px) {
        max-width: 75%;
    }

    @media only screen and (max-width: 749px) {
        font-size: 15px;
    }
`;

export const Button = styled(Link)`
    background-color: #1767f5;
    padding: 10px 18px;
    margin-top: 27.5px;
    width: fit-content;
    cursor: pointer;
    text-decoration: none;

    :hover {
        background-color: #0951d0;
    }
`;

export const ButtonText = styled.span`
    color: #fff;
    font-size: 14px;
    font-family: "Roboto Slab";
    font-weight: 400;
    text-decoration: none;
`;

export const ContainerList = styled.li`
    flex: 1;
    min-width: 158px;
    padding: 0 15px 30px;
    list-style: none;

    @media only screen and (min-width: 768px) {
        max-width: 342px;
    }
`;

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

export const TitleCard = styled.h4`
    margin: 4px;
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_slab_regular,
            color: theme.colors.dark_grey1,
        })}
    font-size: 15px;

    @media only screen and (min-width: 768px) {
        font-size: 18px;
    }
`;

export const SubTitleCard = styled.h4`
    margin: 4px;
    color: #333232;
    font-size: 16px;
    font-family: "Roboto";
    font-weight: normal;
    font-weight: 300;

    @media (max-width: 750px) {
        font-size: 15px;
    }
`;
