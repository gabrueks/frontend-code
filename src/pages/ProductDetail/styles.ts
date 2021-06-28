import styled, { css } from "styled-components";

interface Props {
    discount?: boolean;
}

export const Container = styled.div`
    display: block;
    padding-top: 35px;

    @media only screen and (min-width: 750px) {
        padding-top: 55px;
    }
`;

export const Content = styled.div`
    display: flex;

    @media (max-width: 750px) {
        flex-direction: column;
    }
`;

export const GridItem = styled.div`
    float: left;
    padding-left: 30px;
    width: 100%;

    @media only screen and (min-width: 750px) {
        width: 50%;
    }

    @media (max-width: 750px) {
        padding-left: 0px;
    }
`;

export const Title = styled.h1`
    margin: 0 0 17.5px;
    font-size: 37px;
    color: ${(props) => props.theme.colors.dark_grey2};
    ${(props) => props.theme.fonts.family.roboto_slab_regular};

    @media only screen and (max-width: 749px) {
        font-size: 35px;
    }
`;

export const Price = styled.span`
    font-size: 20px;

    ${(props: Props) =>
        props.discount
            ? css`
                  color: ${(props) => props.theme.colors.dark_grey2};
                  text-decoration: line-through;
                  margin: 0px 10px;
              `
            : css`
                  color: ${(props) => props.theme.colors.blue};
              `}
`;

export const Promotion = styled.div`
    display: flex;
    width: fit-content;
    border-radius: 2px;
    padding: 3.2px 8px;
    align-self: center;
    text-align: center;
    margin-left: 15px;

    background-color: ${(props) => props.theme.colors.blue};
    border-color: ${(props) => props.theme.colors.blue};

    span {
        color: ${(props) => props.theme.colors.white};
        font-size: 10px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
`;

export const ImageZoom = styled.figure`
    position: relative;
    background-repeat: no-repeat;
    overflow: hidden;
    margin: 0 auto;
    min-height: 1px;
    width: 100%;
    height: 80%;
    max-height: 530px;

    img {
        display: block;
        margin: 0 auto;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;

        :hover {
            opacity: 0;
        }
    }

    @media (max-width: 750px) {
        img {
            position: relative;
        }
    }
`;

export const Carousel = styled.ul`
    width: 100%;
    margin: 20px 0;
    padding: 0;

    display: flex;
    flex-wrap: wrap;

    @media (max-width: 750px) {
        justify-content: center;
    }
`;

export const CarouselItem = styled.li<{ selected: boolean }>`
    width: 20%;
    max-width: 100px;
    height: 20%;
    max-height: 100px;
    ${({ selected, theme }) =>
        selected && css({ border: `2px solid ${theme.colors.dark_grey1}` })}

    list-style: none;
    cursor: pointer;

    & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    @media (max-width: 750px) {
        max-width: 60px;
        max-height: 60px;
    }
`;

export const ModelSelector = styled.select`
    min-height: 44px;
    margin-bottom: 15px;
    border: 1px solid ${(props) => props.theme.colors.light_grey1};
    padding: 10px 28px 10px 18px;

    ${({ theme }) => css(theme.fonts.family.roboto_light)}
    font-size: 16px;

    appearance: none;
    background-image: url("/icons/chevron-down.svg");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 18px;

    cursor: pointer;
`;

export const Input = styled.input`
    display: block;
    width: auto;
    margin-bottom: 19.44444px;
    padding: 10px 18px;
    max-width: 5rem;
    line-height: 1.2;
    border-radius: 2px;
    border: 1px solid #ccc;
    color: #000;
    background-color: #fff;
    font-family: "Roboto";
    font-weight: 300;
    font-size: 16px;
`;

export const Button = styled.button`
    display: block;
    width: 100%;
    line-height: 1.4;
    padding-left: 5px;
    padding-right: 5px;
    white-space: normal;
    margin-top: 15px;
    margin-bottom: 50px;
    min-height: 44px;
    background-color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    border: 1px solid
        ${({ disabled, theme }) =>
            disabled ? theme.colors.light_grey1 : theme.colors.blue};
    border-radius: 2px;
    max-width: 390px;

    span {
        ${({ theme }) => theme.fonts.family.roboto_slab_regular}
        font-size: 14px;
        color: ${({ disabled, theme }) =>
            disabled ? theme.colors.grey2 : theme.colors.blue};
        letter-spacing: 1px;
    }
`;

export const Description = styled.div`
    margin-bottom: 30px;
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_light,
            color: theme.colors.dark_grey2,
        })}
`;

export const Social = styled.a`
    appearance: none;
    display: inline-block;
    width: auto;

    text-decoration: none;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    border: 1px solid ${(props) => props.theme.colors.light_grey3};
    background-color: transparent;
    padding: 8px 10px;
    margin-right: 5px;
    margin-bottom: 10px;
    border-radius: 2px;
    align-items: center;

    :hover {
        border-color: ${(props) => props.theme.colors.light_grey4};
    }

    span {
        font-size: 12px;
        ${(props) => props.theme.fonts.family.roboto_slab_regular}
        color: ${(props) => props.theme.colors.dark_grey2};
    }

    img {
        max-width: 15px;
        max-height: 15px;

        vertical-align: middle;
        margin-right: 4px;
    }
`;

export const Footer = styled.div`
    padding: 55px 0;

    ul {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        padding: 0px;

        li {
            min-width: auto;
        }
    }

    @media (max-width: 750px) {
        ul {
            justify-content: flex-start;
        }
    }
`;

export const AnotherProducts = styled.h2`
    font-size: 21px;
    margin-bottom: 35px;
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 0.1em;

    color: ${(props) => props.theme.colors.dark_grey2};
    ${(props) => props.theme.fonts.family.roboto_slab_regular};

    @media only screen and (min-width: 750px) {
        margin-bottom: 55px;
    }

    @media only screen and (max-width: 749px) {
        font-size: 19px;
    }
`;
