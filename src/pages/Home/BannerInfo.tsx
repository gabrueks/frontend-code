import React from "react";

import {
    HeroMedium,
    HeroInner,
    Title,
    SubTitle,
    Button,
    ButtonText,
    Column,
} from "./styles";

interface Props {
    hasSubtitle?: boolean;
    hasButton?: boolean;
    title: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string | undefined;
    backgroundImage?: string;
}

function BannerInfo({
    hasButton = false,
    hasSubtitle = false,
    title,
    subtitle,
    buttonText,
    buttonLink = "",
    backgroundImage,
}: Props): React.ReactElement {
    return (
        <HeroMedium style={{ backgroundImage: `url(${backgroundImage})` }}>
            <HeroInner>
                <div className="page-width">
                    <Column>
                        <Title>{title}</Title>
                        {hasSubtitle && <SubTitle>{subtitle}</SubTitle>}
                        {hasButton && (
                            <Button to={buttonLink}>
                                <ButtonText>{buttonText}</ButtonText>
                            </Button>
                        )}
                    </Column>
                </div>
            </HeroInner>
        </HeroMedium>
    );
}

export default BannerInfo;
