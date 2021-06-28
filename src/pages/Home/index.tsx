import React from "react";
import { useTranslation } from "react-i18next";

import BannerInfo from "./BannerInfo";
import Cards from "./Cards";
import { getHeroData } from "./helper";

import { Container } from "./styles";

function Home(): React.ReactElement {
    const { t } = useTranslation();
    const data = getHeroData(t);

    return (
        <Container>
            <BannerInfo
                hasSubtitle
                hasButton
                title={t("home.heroCollections.title")}
                subtitle={t("home.heroCollections.subtitle")}
                buttonText={t("home.heroCollections.buttonText")}
                buttonLink={"/collections"}
                backgroundImage="dolado-supply.jpg"
            />

            <Cards hasImage data={data.heroWithPicture} height="535px" />

            <BannerInfo
                hasSubtitle
                title={t("home.heroDolado.title")}
                subtitle={t("home.heroDolado.subtitle")}
                backgroundImage="bluebackground.png"
            />

            <Cards data={data.heroWithoutPicture} height="400px" />

            <BannerInfo
                hasButton
                title={t("home.heroGroup.title")}
                buttonText={t("home.heroGroup.buttonText")}
                buttonLink={"/collections"}
                backgroundImage="money-in-the-bank.jpg"
            />
        </Container>
    );
}

export default Home;
