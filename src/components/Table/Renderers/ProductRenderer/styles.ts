import styled from "styled-components";

export const ProductTitle = styled.p`
    cursor: pointer;
    box-sizing: border-box;

    span {
        ${({ theme }) => theme.fonts.family.roboto_slab_regular}
        font-size: 16px;
        color: ${({ theme }) => theme.colors.dark_grey2};
        line-height: 1.5;
        padding-bottom: 1px;
        border-bottom: 1px solid ${({ theme }) => theme.colors.dark_grey2};
    }
    p {
        ${({ theme }) => theme.fonts.family.roboto_light}
        color: ${({ theme }) => theme.colors.dark_grey2};
        font-weight: 400;
        font-size: 15px;
    }
`;
