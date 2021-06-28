import React, { FC, lazy, LazyExoticComponent, ReactElement } from "react";
import GoogleMapReact, { Props } from "google-map-react";

import { Container, TMapStyle } from "./styles";

import { TMarker } from "./Marker/interface";

export type TMapProps = Pick<
    Props,
    | "center"
    | "zoom"
    | "draggable"
    | "options"
    | "hoverDistance"
    | "onChange"
    | "onClick"
    | "onChildClick"
> &
    TMapStyle;

export type TMap = FC<TMapProps> & {
    Marker: LazyExoticComponent<TMarker>;
};

const Map: TMap = ({
    center = {
        lat: -23.498934,
        lng: -46.625435,
    },
    zoom = 15,
    draggable = false,
    hoverDistance = 10,
    options,
    onChange,
    onClick,
    onChildClick,
    children,
    ...style
}): ReactElement => {
    return (
        <Container {...style}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "",
                }}
                options={options}
                defaultCenter={center}
                defaultZoom={zoom}
                draggable={draggable}
                hoverDistance={hoverDistance}
                onChange={onChange}
                onClick={onClick}
                onChildClick={onChildClick}>
                {children}
            </GoogleMapReact>
        </Container>
    );
};

Map.Marker = lazy(() => import("./Marker"));

export default Map;
