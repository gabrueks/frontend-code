import styled from "styled-components";

export const Container = styled.div`
    box-sizing: border-box;
    margin: 0 auto 40px auto;
    max-width: 65ch;
`;

export const Title = styled.div`
    padding-top: 20px;
    ${({ theme }) => theme.fonts.family.roboto_slab_regular}
    font-size: 36px;
    line-height: 1.2;
    margin: 20px 0px;
    word-wrap: break-word;
    color: ${({ theme }) => theme.colors.dark_grey2};

    text-align: center;
`;

export const Body = styled.div`
    ${({ theme }) => theme.fonts.family.roboto_light}
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.dark_grey3};
`;
