import styled from "styled-components";

import { navLayout } from "../../constants";
interface Props {
    open?: boolean;
}

export const StyledBurger = styled.div`
    width: 2rem;
    height: 2rem;
    position: fixed;
    top: 15px;
    right: 20px;
    z-index: 20;
    display: none;
    @media (max-width: 750px) {
        display: flex;
        justify-content: space-around;
        flex-flow: column nowrap;
    }
    div {
        width: 2rem;
        height: 0.25rem;
        background-color: ${({ open }: Props) => (open ? "#ccc" : "#333")};
        border-radius: 10px;
        transform-origin: 1px;
        transition: all 0.3s linear;
        &:nth-child(1) {
            transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
        }
        &:nth-child(2) {
            transform: ${({ open }) =>
                open ? "translateX(100%)" : "translateX(0)"};
            opacity: ${({ open }) => (open ? 0 : 1)};
        }
        &:nth-child(3) {
            transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
        }
    }
`;

export const Nav = styled.nav`
    width: 100%;
    border-bottom: 1px solid #f1f1f1;
    display: grid;
    grid-template-columns: 0.8fr 0.9fr 0.1fr;
    justify-content: space-between;
    .logo {
        padding: 15px 15px;
    }
    ul li {
        display: inline-block;
    }
    ul li a {
        display: block;
        text-decoration: none;
        color: #3a3a3a;
    }
    ul li a:after,
    ul li a:before {
        transition: all 0.5s;
    }
    ul li a:hover {
        color: #555;
    }
    ul li a {
        position: relative;
    }
    ul li a:after {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 0%;
        content: ".";
        color: transparent;
        background: #aaa;
        height: 1px;
    }
    ul li a:hover:after {
        width: 100%;
    }
    ul li a {
        transition: all 2s;
    }
    ul li a:after {
        text-align: left;
        content: ".";
        margin: 0;
        opacity: 0;
    }
    ul li a:hover {
        color: #5555;
        z-index: 1;
    }
    ul li a:hover:after {
        z-index: -10;
        animation: fill 1s forwards;
        -webkit-animation: fill 1s forwards;
        -moz-animation: fill 1s forwards;
        opacity: 1;
    }
    @media (min-width: 750px) {
        height: ${navLayout.desktop.HEIGHT};
    }
    @media (max-width: 749px) {
        height: ${navLayout.mobile.HEIGHT};
        grid-template-columns: 2.9fr 0.9fr;
    }
`;

export const Ul = styled.ul`
    font-weight: 100;
    list-style: none;
    cursor: pointer;
    display: flex;
    flex-flow: row nowrap;
    li {
        padding: 18px 10px;
    }
    @media (max-width: 749px) {
        flex-flow: column nowrap;
        margin-top: 80px;
        position: fixed;
        transform: ${({ open }: Props) =>
            open ? "translateX(0)" : "translateX(100%)"};
        top: 0;
        right: 0;
        width: 400px;
        transition: transform 0.3s ease-in-out;
        li {
            color: #fff;
        }
    }
`;

export const Icon = styled.img`
    display: inline-block;
    width: 24px;
    height: 24px;
    vertical-align: middle;
    fill: currentColor;
    :hover {
        opacity: 0.8;
    }
`;

export const Ol = styled.ol`
    list-style: none;
    cursor: pointer;
    display: flex;
    flex-flow: row nowrap;
    margin-top: 10px;
    li {
        position: relative;
        padding: 18px 10px;
    }
    @media (min-width: 750px) {
        margin-right: 3rem;
    }
    @media (max-width: 380px) {
        margin-left: -4rem;
    }
`;

export const Badge = styled.div`
    position: absolute;
    top: calc(50% - 10px);
    left: calc(50% + 10px);
    transform: translate(-50%, -50%);
    width: max-content;
    height: 16px;
    border-radius: 8px;
    padding: 0 5px;
    background-color: ${({ theme }) => theme.colors.blue};

    display: flex;
    justify-content: center;
    align-items: center;

    & span {
        width: max-content;
        height: 100%;
        font-size: 11px;
        font-weight: 800;
        line-height: 1.6;
        color: ${({ theme }) => theme.colors.white};
    }
`;

export const Logo = styled.img`
    width: 115px;
    height: 50px;
    margin-left: 38px;
    @media (max-width: 750px) {
        margin-left: 10px;
    }
    @media (max-width: 280px) {
        margin-left: -5px;
        width: 81px;
        height: 42px;
    }
`;

export const Container = styled.div``;

export const BoxToggle = styled.div`
    margin-right: 10px;
    @media (min-width: 750px) {
        display: none;
    }
`;

export const BoxExpand = styled.div`
    max-width: 300px;
    color: #fff;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    background-color: #12b47d;
    border-radius: 4px;
    margin: 20px;
    flex: auto;
`;

export const ExpandBoxes = styled.div`
    @media (min-width: 751px) {
        display: none;
    }
    justify-content: space-around;
    height: 10.4rem;
    margin-right: -217px;
    margin-top: -17px;
    @media (max-width: 400px) {
        margin-right: -156px;
        margin-top: -17px;
    }
`;

export const UlMobile = styled.ul`
    @media (min-width: 750px) {
        display: none;
    }
    font-weight: 100;
    list-style: none;
    cursor: pointer;
    display: flex;
    flex-flow: row nowrap;
    margin-top: 10px;
    width: 100%;
    margin-left: -2.4rem;
    flex-direction: column;
    li {
        padding: 18px 25px;
    }
`;
