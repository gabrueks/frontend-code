import styled, { css } from "styled-components";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";

export type TSelectTagProps = LayoutProps & SpaceProps;

export const SelectTag = styled.select.attrs<TSelectTagProps>((props) => ({
    ...props,
    height: props.height ?? "55px",
    padding: props.padding ?? "10px 20px 10px 18px",
}))<TSelectTagProps>`
    ${layout}
    ${space}
    border: none;
    ${({ theme }) => css(theme.fonts.family.roboto_light)}
    font-size: 15px;
`;

export const OptionTag = styled.option``;
