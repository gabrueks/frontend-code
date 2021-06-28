import styled, { css, FlattenSimpleInterpolation } from "styled-components";

const DESKTOP_WIDTH = 368;

export const slideDown = css`
    animation: slideDown 0.5s;
    -webkit-animation: slideDown 0.5s;
    @keyframes slideDown {
        0% {
            top: -100%;
        }
        100% {
            top: 0px;
        }
    }
`;

export const slideUp = css`
    animation: slideUp 0.5s;
    -webkit-animation: slideUp 0.5s;
    @keyframes slideUp {
        0% {
            top: 0px;
        }
        100% {
            top: -100%;
            visibility: hidden;
        }
    }
`;

export type TAnimation = FlattenSimpleInterpolation | undefined;
type TContainer = {
    animation?: TAnimation;
    visibility?: "hidden" | "visible";
};
export const Container = styled.div<TContainer>`
    position: fixed;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    padding: 6px 22px 14px;
    box-sizing: border-box;
    z-index: 1;
    background-color: white;
    right: 0;
    visibility: ${({ visibility }) => visibility ?? undefined};
    box-shadow: 1px 1px 10px 2px rgb(235 235 235 / 50%);
    border: 1px solid ${({ theme }) => theme.colors.light_grey3};

    > div {
        width: 100%;
    }

    > img {
        cursor: pointer;
    }

    ${({ animation }) => (animation ? animation : undefined)}

    @media (min-width: 750px) {
        width: ${DESKTOP_WIDTH}px;
        transition: width 0.5s;
    }
    @media (max-width: 749px) {
        width: 100%;
        transition: width 0.5s;
        padding: 6px 24px 16px;
    }
`;

export const Title = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: ${({ theme }) => `${theme.colors.dark_grey2}`};
    border-bottom: 1px solid ${({ theme }) => theme.colors.light_grey3};

    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_light,
            fontSize: "14px",
        })}

    > div {
        padding: 8px 0px;
        letter-spacing: 0.3px;
    }

    > img {
        padding: 8px 10px;
        margin-right: -14px;

        width: 28px;
        height: 32px;
        cursor: pointer;
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin: 16px 0px;
`;

type TImage = {
    src: string;
};
export const Image = styled.div<TImage>`
    width: 57px;
    max-height: 120px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    ${({ src }) => `background-image: url(${src});`}
    margin-right: 16px;
`;

export const ProductTitle = styled.div`
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-right: 16px;
    text-align: left;

    > div {
        ${({ theme }) => theme.fonts.family.roboto_slab_regular}
        font-size: 18px;
        color: ${({ theme }) => theme.colors.dark_grey2};
        line-height: 1.2;
        word-wrap: break-word;
        margin: 0 0 17.5px;
        letter-spacing: 0;
    }

    > span {
        ${({ theme }) => theme.fonts.family.roboto_slab_regular}
        font-weight: 700;
        font-size: 14px;
        line-height: 1.5;
        color: ${({ theme }) => theme.colors.dark_grey3};
        > span {
            ${({ theme }) => theme.fonts.family.roboto_light}
            font-size: 14px;
            line-height: 1.5;
        }
    }

    @media (max-width: 749px) {
        flex-grow: 1;
    }
`;

export const Quantity = styled.div`
    width: 77px;
    flex: 1;
    text-align: right;
    ${({ theme }) => theme.fonts.family.roboto_light}
    font-size: 14px;
    color: ${({ theme }) => theme.colors.dark_grey3};
`;

export const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
`;

export const CartButton = styled.button`
    display: block;
    width: 100%;
    line-height: 1.4;
    padding: 0px 18px;
    white-space: normal;
    min-height: 44px;
    background-color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.colors.blue};
    border-radius: 2px;
    box-sizing: border-box;

    span {
        ${({ theme }) => theme.fonts.family.roboto_slab_regular}
        font-size: 14px;
        color: ${({ theme }) => theme.colors.blue};
        letter-spacing: 1px;
    }
`;

export const StoreButton = styled.button`
    border: none;
    line-height: 1.5;
    border-bottom: 1px solid ${({ theme }) => theme.colors.blue};
    background-color: transparent;
    margin-top: 8px;
    padding: 0px;
    cursor: pointer;

    span {
        ${({ theme }) => theme.fonts.family.roboto_light}
        font-size: 14px;
        color: ${({ theme }) => theme.colors.blue};
    }
`;
