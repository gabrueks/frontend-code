import styled from "styled-components";
import {
    border,
    BorderProps,
    flexbox,
    FlexboxProps,
    layout,
    LayoutProps,
    margin,
    MarginProps,
} from "styled-system";

type TSkeletonProps = LayoutProps &
    BorderProps &
    MarginProps &
    Pick<FlexboxProps, "flex">;

const Skeleton = styled.div.attrs<TSkeletonProps>((props) => ({
    ...props,
    id: Math.floor(Math.random() * 100000),
}))<TSkeletonProps>`
    @keyframes ${({ id }) => `Sliding_${id}`} {
        from {
            background-position-x: -40%;
        }
        to {
            background-position-x: 140%;
        }
    }

    background-color: #eeeeee;
    background-image: linear-gradient(to right, #eeeeee, white, #eeeeee);
    background-size: 20%;
    background-repeat: no-repeat;
    background-position-x: -40%;
    ${layout}
    ${margin}
    ${border}
    ${flexbox}

    animation-name: ${({ id }) => `Sliding_${id}`};
    animation-duration: 2s;
    animation-direction: normal;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
`;

export default Skeleton;
