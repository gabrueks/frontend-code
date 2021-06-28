import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Container = styled.div`
    width: 100%;
    justify-content: center;
    display: flex;
`;

const LDSRing = styled.div`
    display: flex;
    position: relative;
    width: 80px;
    height: 80px;
    justify-content: center;
    align-items: center;

    div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 50px;
        height: 50px;
        margin: 5px;
        border: 5px solid ${({ theme }) => theme.colors.blue};
        border-radius: 50%;
        animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: ${({ theme }) => theme.colors.blue} transparent
            transparent transparent;

        &:nth-child(1) {
            animation-delay: -0.45s;
        }
        &:nth-child(2) {
            animation-delay: -0.3s;
        }
        &:nth-child(3) {
            animation-delay: -0.15s;
        }
    }
`;

const Loading: React.FC = () => {
    return (
        <Container>
            <LDSRing>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </LDSRing>
        </Container>
    );
};

export default Loading;
