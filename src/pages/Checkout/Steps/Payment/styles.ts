import styled, { css } from "styled-components";

export const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.white};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & h3 {
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_bold,
                color: theme.colors.dark_grey1,
            })}
        font-size: 16px;
    }
`;

export const ErrorSlip15Days = styled.span`
    padding: 10px 16px 10px 16px;
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_regular,
            color: theme.colors.grey2,
            background: theme.colors.yellow,
        })}
    font-size: 12px;
`;

export const MobileOnly = styled.div`
    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.lg}px) {
        display: none;
    }
`;

export const Spinner = styled.div`
    @keyframes Rotate {
        from {
            transform: rotateZ(0deg);
        }
        to {
            transform: rotateZ(360deg);
        }
    }

    width: 60px;
    height: 60px;
    border-top: 2px solid ${({ theme }) => theme.colors.white};
    border-bottom: 2px solid ${({ theme }) => theme.colors.blue2};
    border-left: 2px solid ${({ theme }) => theme.colors.blue2};
    border-right: 2px solid ${({ theme }) => theme.colors.blue2};
    border-radius: 50%;
    box-sizing: border-box;

    animation-name: Rotate;
    animation-duration: 900ms;
    animation-direction: normal;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
`;
