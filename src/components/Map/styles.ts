import styled from "styled-components";
import { layout, LayoutProps } from "styled-system";

export type TMapStyle = Pick<LayoutProps, "height">;

export const Container = styled.div<TMapStyle>`
    width: 100%;
    ${layout}
`;
