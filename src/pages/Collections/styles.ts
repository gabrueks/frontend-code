import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const ContainerCard = styled.div`
    min-height: 90vh;
    align-items: center;
    position: relative;
    padding: 0;
    margin: 0;
    text-align: center;
`;

export const GridLink = styled(Link)`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`;

export const GridItem = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 100%;
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.9;
    filter: brightness(65%);
    background: #6db3f2;
`;

export const Card = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    margin-left: -30px;

    @media (max-width: 1200px) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    @media only screen and (max-width: 749px) {
        margin-left: -22px;
    }
`;

export const Title = styled.h2`
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_light,
            color: theme.colors.white,
        })};
    font-size: 37px;
    font-weight: 100;
    text-shadow: 0 0 4px rgb(0 0 0 / 40%);
    margin-bottom: 8px;
    @media only screen and (max-width: 749px) {
        font-size: 35px;
    }
`;

export const ContainerList = styled.li`
    float: left;
    width: 25%;
    padding-left: 30px;
    max-width: 250px;
    max-height: 250px;
    margin-bottom: 30px;

    @media only screen and (max-width: 749px) {
        width: 50%;
        padding-left: 22px;
    }

    ::after,
    ::before {
        box-sizing: border-box;
    }

    /* @media (max-width: 1025px) {
        max-width: 206px;
        max-height: 206px;
    }

    @media (max-width: 769px) {
        max-width: 142px;
        max-height: 142px;
        padding-left: 22px;
        width: 50%;
    }

    @media (max-width: 500px) {
        max-width: 179.5px;
        max-height: 179.5px;
    }

    @media (max-width: 425px) {
        max-width: 127px;
        max-height: 127px;
    } */

    :hover {
        img {
            opacity: 0.8;
            filter: brightness(40%);
        }
    }
`;

export const TitlePage = styled.h1`
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_slab_regular,
            color: theme.colors.dark_grey2,
        })};

    font-weight: 400;
    font-size: 37px;
    margin-bottom: 55px;
    text-align: center;
    padding-top: 30px;

    @media (max-width: 749px) {
        margin-bottom: 35px;
    }
`;

export const TextCollection = styled.h1`
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_slab_regular,
        })};

    color: white;
    font-size: 25px;
    margin: 0;
    padding: 0 15px;
    width: inherit;
    text-shadow: rgb(0 0 0 / 40%) 0px 0px 4px;
    font-weight: 500;
    overflow-wrap: break-word;

    @media (max-width: 750px) {
        font-size: 20px;
    }

    @media only screen and (max-width: 320px) {
        top: 25%;
        margin: 0px;
    }
`;

export const ContainerText = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    align-items: center;

    ${Image}:hover {
        opacity: 0.8;
        filter: brightness(40%);
    }
`;
