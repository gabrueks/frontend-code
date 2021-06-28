import React, { FC, ReactElement, useState } from "react";

import { Carousel, CarouselItem, ImageZoom } from "./styles";

import Skeleton from "../../components/Skeleton";

import { useProductDetailContext } from "../../contexts/ProductDetail";

const Image: FC = (): ReactElement => {
    const { data, loadingData } = useProductDetailContext();

    const [selectedIdx, setSelectedidx] = useState(0);

    const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");
    const [backgroundImage, setBackgroundImage] = useState("");

    const handleMouseMove = (e: any) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setBackgroundPosition(`${x}% ${y}%`);
    };

    const handleMouseEnter = () => {
        setBackgroundImage(`url(${selectedSrc})`);
    };

    const handleMouseLeave = () => {
        setBackgroundImage("");
    };

    const handleSelect = (idx: number) => {
        setSelectedidx(idx);
    };

    if (loadingData) {
        return (
            <>
                <Skeleton
                    width="100%"
                    height="80%"
                    minHeight="300px"
                    marginBottom="20px"
                />
                <Skeleton width="100%" height="100px" marginBottom="20px" />
            </>
        );
    }

    const selectedSrc =
        (data?.images[selectedIdx] && data?.images[selectedIdx].originalSrc) ??
        "";

    return (
        <>
            <ImageZoom
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ backgroundPosition, backgroundImage }}>
                <img src={selectedSrc} />
            </ImageZoom>
            {data?.images && data.images.length > 1 && (
                <Carousel>
                    {data.images.map((img, idx) => (
                        <CarouselItem
                            key={idx}
                            selected={idx === selectedIdx}
                            onClick={() => handleSelect(idx)}>
                            <img src={img.originalSrc} alt={img.altText} />
                        </CarouselItem>
                    ))}
                </Carousel>
            )}
        </>
    );
};

export default Image;
