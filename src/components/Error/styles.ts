import styled, { css } from "styled-components";

export const Container = styled.div`
    color: ${({ theme }) => theme.colors.red_2};
    border: 1px solid ${({ theme }) => theme.colors.red_1};
    background-color: ${({ theme }) => theme.colors.cream};
    padding: 1rem 1.3rem;
    text-align: left;
    margin: 0 0 27.5px;

    h2 {
        margin: 0px;
        margin-bottom: 15px;
        font-size: 19px;

        ${({ theme }) => theme.fonts.family.roboto_slab_regular};
    }

    ul {
        padding: 0;

        li {
            list-style-type: disc;
            list-style-position: inside;
            margin-bottom: 5px;

            span {
                display: inline-block;
                text-decoration: underline;
                text-decoration-skip-ink: auto;
                color: ${({ theme }) => theme.colors.red_2};
                ${({ theme }) => theme.fonts.family.roboto_regular};
                font-weight: 300;
            }
        }
    }

    ${({ type }: { type: string }) =>
        type === "error" &&
        css`
            background-color: ${({ theme }) => theme.colors.red_3};
            border-color: ${({ theme }) => theme.colors.red_1};
            color: ${({ theme }) => theme.colors.dark_grey2};

            ul {
                li {
                    span {
                        color: ${({ theme }) => theme.colors.dark_grey2};
                    }
                }
            }
        `};

    ${({ type }: { type: string }) =>
        type === "Confirmation" &&
        css`
            background-color: ${({ theme }) => theme.colors.cream};
            border: 1px solid ${({ theme }) => theme.colors.green};
            color: ${({ theme }) => theme.colors.green};

            ul {
                li {
                    span {
                        color: ${({ theme }) => theme.colors.dark_grey2};
                    }
                }
            }
        `};
`;

export const InfoText = styled.span`
    color: ${({ theme }) => theme.colors.green};
    font-weight: 100;
`;
