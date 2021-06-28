import styled, { css } from "styled-components";

export const NoSupport = styled.div`
    margin: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;

    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_regular,
            color: theme.colors.grey1,
        })}
    font-size: 14px;
    text-align: center;

    & span {
        margin-top: 20px;
    }
`;
