import React, { Children, cloneElement, isValidElement } from "react";

import { TMarker } from "./interface";

const Marker: TMarker = ({ lat, lng, $hover, hoverContent, children }) => {
    if (typeof children === "function") return children({ lat, lng, $hover });
    return (
        <>
            {Children.map(
                children,
                (child) =>
                    isValidElement(child) &&
                    cloneElement(child, { lat, lng, $hover }),
            )}
            {$hover &&
                hoverContent &&
                cloneElement(hoverContent, { lat, lng, $hover })}
        </>
    );
};

export default Marker;
