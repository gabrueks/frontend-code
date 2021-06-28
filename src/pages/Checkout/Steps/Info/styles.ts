import styled, { css } from "styled-components";

export const UserConteiner = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;

    & > div {
        display: flex;

        &:not(:first-child) {
            margin-top: 20px;
        }
    }
`;

export const UserInfo = styled.div`
    flex: 1;
    padding: 3.5px 0;

    display: flex;
    flex-direction: column;
    justify-content: space-around;

    & span {
        width: max-content;
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_regular,
                color: theme.colors.grey4,
            })}
        font-size: 14px;
    }

    & a {
        width: max-content;
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_regular,
                color: theme.colors.blue2,
            })}
        font-size: 14px;

        cursor: pointer;
    }
`;

export const UserLogo = styled.div`
    position: relative;
    min-width: 50px;
    height: 50px;
    border-radius: 8px;
    margin-right: 14px;
    background-color: ${({ theme }) => theme.colors.light_grey2};

    ::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 95%;
        height: 95%;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.colors.blue3};
    }
    ::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 95%;
        height: 95%;
        border-radius: 50%;
        background-image: url("/icons/user.svg");
        background-position: bottom -7px center;
        background-size: 100%;
        background-repeat: no-repeat;
        filter: invert(1);
    }
`;
