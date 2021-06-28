import { ReactElement, ReactNode } from "react";
import { ChildComponentProps } from "google-map-react";

export type TMarkerProps = ChildComponentProps & {
    hoverContent?: ReactElement;
    children: ((props: ChildComponentProps) => ReactElement) | ReactNode;
};

export type TMarker = (props: TMarkerProps) => ReactElement;
