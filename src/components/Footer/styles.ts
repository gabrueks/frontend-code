import styled, { css } from "styled-components";

interface Props {
    paddingLeft?: boolean;
}

export const Container = styled.footer`
    color: #333232;
    background-color: #f6f6f6;
    padding: 45px 0 55px 0;
    width: 100%;
    overflow: hidden;

    @media (max-width: 750px) {
        padding: 25px 0 35px 0;
    }
`;

export const FooterContent = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: nowrap;

    @media (max-width: 750px) {
        flex-direction: column;
        padding: 0 18px;
    }
`;

export const FooterItem = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 50%;

    > a:hover {
        text-decoration: underline;
    }

    a {
        cursor: pointer;
    }

    @media only screen and (min-width: 750px) {
        ${({ paddingLeft }: Props) =>
            paddingLeft
                ? css`
                      padding: 0 0px 0 15px;
                  `
                : css`
                      padding: 0 15px 0 0px;
                  `}

        margin-bottom: 45px;
    }
`;

export const Text = styled.h4`
    color: #333232;
    font-size: 16px;
    font-family: "Roboto";
    font-weight: normal;
    margin: 5px 0px;
    font-weight: 300;

    @media (max-width: 750px) {
        font-size: 15px;
    }
`;

export const TextBold = styled.p`
    color: #333232;
    font-size: 19px;
    font-family: "Roboto Slab";
    margin-bottom: 25px;

    @media (max-width: 750px) {
        font-size: 17px;
    }
`;

export const FooterAbout = styled.div`
    display: flex;
    padding-top: 10px;

    @media (max-width: 750px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const Flags = styled.div`
    display: flex;
    align-items: center;
    flex: 1 1 50%;

    img {
        margin-right: 5px;
    }

    @media (max-width: 750px) {
        padding-bottom: 30px;
    }
`;

export const FooterName = styled.div`
    display: flex;
    flex: 1 1 50%;
    justify-content: flex-end;

    span {
        color: #333232;
        font-size: 13px;
        font-family: "Roboto";

        a {
            text-decoration: none;
            color: #333232;
            cursor: pointer;
        }

        a:hover {
            text-decoration: underline;
        }
    }
`;
