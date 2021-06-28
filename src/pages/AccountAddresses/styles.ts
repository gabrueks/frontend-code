import styled, { css } from "styled-components";

export const Container = styled.div`
    padding-top: 35px;
    padding-bottom: 35px;

    @media only screen and (min-width: 750px) {
        padding-top: 55px;
        padding-bottom: 55px;
    }
`;

export const SectionHeader = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    margin-bottom: 35px;

    @media only screen and (min-width: 750px) {
        margin-bottom: 55px;
    }
`;

export const GoBack = styled.button`
    background-color: transparent;
    cursor: pointer;
    border: none;
    margin: 0 0 19.44444px;

    span {
        font-size: 16px;

        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_regular,
                color: theme.colors.dark_grey2,
            })}

        font-weight: 300;
    }

    @media only screen and (max-width: 749px) {
        span {
            font-size: 15px;
        }
    }
`;

export const Title = styled.h1`
    margin: 0;
    margin-bottom: 8px;
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_slab_regular,
            color: theme.colors.dark_grey2,
        })}
    font-size: 35px;

    @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        margin-bottom: 16px;
        font-size: 37px;
    }
`;

export const ButtonAddress = styled.button`
    width: fit-content;
    background-color: ${({ theme }) => theme.colors.blue};
    padding: 8px 15px;
    border: 1px solid transparent;
    border-radius: 2px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    letter-spacing: 0.08em;

    span {
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_slab_regular,
                color: theme.colors.white,
            })}
        font-size: 14px;
        text-decoration: none;
    }

    :hover {
        background-color: ${({ theme }) => theme.colors.dark_blue};
    }

    @media only screen and (min-width: 750px) {
        padding: 10px 18px;
    }

    @media only screen and (max-width: 750px) {
        span {
            font-size: 12px;
        }
    }
`;

export const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    line-height: 1.5;
    color: #3a3a3a;
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_regular,
        })};
    font-weight: 300;
    font-size: 16px;

    @media (max-width: 750px) {
        font-size: 14px;
    }
`;

export const Input = styled.input`
    display: block;
    width: auto;
    margin-bottom: 19.44444px;
    padding: 10px 18px;
    max-width: 100%;
    line-height: 1.2;
    border-radius: 2px;
    border: 1px solid #ccc;
    color: #000;
    background-color: #fff;
    font-weight: 300;
    font-size: 16px;
    ${({ theme }) =>
        css({
            ...theme.fonts.family.roboto_regular,
        })};

    ${({ error }: { error?: boolean }) =>
        error &&
        css`
            border-color: #d20000;
            background-color: #fff8f8;
            color: #d20000;
        `}
`;

export const AddressForm = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    text-align: left;
    margin-left: auto;
    margin-right: auto;

    h2 {
        font-size: 21px;
        letter-spacing: 0.1em;
        text-transform: uppercase;

        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_slab_regular,
                color: theme.colors.dark_grey2,
            })}
    }

    @media only screen and (max-width: 749px) {
        width: 100%;

        h2 {
            font-size: 19px;
        }
    }
`;

export const WrapperInput = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;

    @media only screen and (max-width: 749px) {
        width: 100%;
        padding: 0 !important;
    }
`;

export const ListOfAddresses = styled.ul`
    margin: 0;
    padding: 0;
`;

export const Content = styled.li`
    text-align: center;
    margin-bottom: 55px;

    h2 {
        margin: 0 0 17.5px;
        letter-spacing: 0.1em;
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_slab_regular,
                color: theme.colors.dark_grey2,
            })}
        font-size: 19px;
        font-weight: 400;
    }

    p {
        margin: 3px 0px;
        font-size: 16px;

        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_regular,
                color: theme.colors.dark_grey3,
            })}

        font-weight: 300;
    }
`;

export const Button = styled.button`
    width: fit-content;

    padding: 8px 10px;
    margin: 15px 3px;
    border: 1px solid transparent;
    border-radius: 2px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    letter-spacing: 0.08em;

    span {
        ${({ theme }) =>
            css({
                ...theme.fonts.family.roboto_slab_regular,
                color: theme.colors.white,
            })}
        font-size: 12px;
        text-decoration: none;
    }

    :hover {
        background-color: ${({ theme }) => theme.colors.dark_blue};
    }

    ${({ secondary }: { secondary?: boolean }) =>
        secondary
            ? css`
                  border-color: ${({ theme }) => theme.colors.blue};
                  background-color: ${({ theme }) => theme.colors.white};

                  span {
                      color: ${({ theme }) => theme.colors.blue};
                  }

                  :hover {
                      background-color: ${({ theme }) => theme.colors.white};
                  }
              `
            : css`
                  background-color: ${({ theme }) => theme.colors.blue};
              `}
`;
