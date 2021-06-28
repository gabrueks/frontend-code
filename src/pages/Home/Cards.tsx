import React from "react";

import {
    CardsBackground,
    Card,
    ContainerList,
    Image,
    TextContainer,
    TitleCard,
    SubTitleCard,
} from "./styles";

interface Props {
    data: any;
    hasImage?: boolean;
    height?: string;
}

function Cards({ data, hasImage = false, height }: Props): React.ReactElement {
    return (
        <CardsBackground style={{ height: `${height}` }}>
            <Card>
                {data.map((hero: any, idx: number) => (
                    <ContainerList key={idx}>
                        {hasImage ? (
                            <Image
                                src={require(`../../assets/imgs/${hero?.img}`)}
                            />
                        ) : (
                            ""
                        )}
                        <TextContainer>
                            <TitleCard>{hero.title}</TitleCard>
                            <SubTitleCard>{hero.subTitle}</SubTitleCard>
                        </TextContainer>
                    </ContainerList>
                ))}
            </Card>
        </CardsBackground>
    );
}

export default Cards;
