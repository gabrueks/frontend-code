import styled from "styled-components";

export const Wrapper = styled.div`
    max-width: 100%;
    overflow: scroll;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
        display: none;
    }

    box-sizing: border-box;

    table,
    th,
    td {
        border: 1px solid ${({ theme }) => theme.colors.light_grey3};
        padding: 10px 14px;
    }

    table {
        display: table;
        text-indent: initial;
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
    }

    th {
        min-width: 75px;
        min-height: 46px;
        text-align: left;
        ${({ theme }) => theme.fonts.family.roboto_slab_regular}
        font-weight: 700;
        color: ${({ theme }) => theme.colors.dark_grey2};
    }

    td {
        min-width: 75px;
        min-height: 46px;
        ${({ theme }) => theme.fonts.family.roboto_light}
        color: ${({ theme }) => theme.colors.dark_grey2};
    }

    @media only screen and (max-width: ${({ theme }) =>
            theme.breakpoints.md}px) {
        margin-bottom: 20px;

        thead th {
            display: none;
        }

        td,
        th {
            display: block;
        }

        td[data]:before {
            content: attr(data);
            margin-right: 15px;
        }

        #hidden {
            display: none;
        }

        table,
        th,
        td {
            border: none;
        }

        thead tr {
            border-bottom: 1px solid ${({ theme }) => theme.colors.dark_grey3};
        }
        tbody {
            > tr {
                border-bottom: 1px solid
                    ${({ theme }) => theme.colors.dark_grey3};
            }
            > #no-border {
                border: 0 !important;
            }
            > :last-child {
                border: 0 !important;
            }
        }
    }
`;
