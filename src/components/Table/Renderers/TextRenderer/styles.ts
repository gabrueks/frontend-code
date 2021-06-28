import styled, { css, CSSObject } from "styled-components";

type TCell = { softConfig?: CSSObject };
export const Cell = styled.td<TCell>`
    ${({ softConfig }) =>
        softConfig &&
        css`
            &&& {
                ${softConfig}
            }
        `}
`;
