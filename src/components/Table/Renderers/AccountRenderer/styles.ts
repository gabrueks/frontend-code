import styled from "styled-components";

export const Button = styled.button`
    width: 100%;
    max-width: 120px;
    height: 100%;
    line-height: 1.4;
    padding: 8px 10px;
    white-space: normal;
    background-color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.colors.blue};
    border-radius: 2px;
    box-sizing: border-box;
    span {
        ${({ theme }) => theme.fonts.family.roboto_slab_regular}
        font-size: 12px;
        color: ${({ theme }) => theme.colors.blue};
        letter-spacing: 1px;
    }
`;
