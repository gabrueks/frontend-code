import React from "react";
import { useTranslation } from "react-i18next";

import {
    Card,
    ContainerList,
    Image,
    TitlePage,
    ContainerCard,
    TextCollection,
    ContainerText,
    GridLink,
    GridItem,
} from "./styles";

import {
    useCollectionsContext,
    withCollectionsContext,
} from "../../contexts/Collections/index";

function Collections(): React.ReactElement {
    const { t } = useTranslation();
    const { collections } = useCollectionsContext();
    const CollectionsAlphabetical = collections?.sort((a, b) =>
        a.title.localeCompare(b.title),
    );

    return (
        <div className="page-width">
            <ContainerCard>
                <TitlePage>{t("collections.title")}</TitlePage>
                <Card>
                    {CollectionsAlphabetical?.map((collection, index) => (
                        <ContainerList key={index}>
                            <GridItem>
                                <GridLink
                                    to={{
                                        pathname: `/collections/${collection?.title
                                            .toLowerCase()
                                            .normalize("NFD")
                                            .replace(/[\u0300-\u036f]/g, "")}`,
                                        state: collection?.image.originalSrc,
                                    }}>
                                    <Image
                                        src={collection?.image.originalSrc}
                                        alt={collection?.title}
                                    />
                                    <ContainerText>
                                        <TextCollection>
                                            {collection?.title}
                                        </TextCollection>
                                    </ContainerText>
                                </GridLink>
                            </GridItem>
                        </ContainerList>
                    ))}
                </Card>
            </ContainerCard>
        </div>
    );
}

export default withCollectionsContext(Collections);
