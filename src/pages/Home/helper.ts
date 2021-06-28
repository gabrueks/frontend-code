import { TFunction } from "react-i18next";

export type THeroData = {
    heroWithPicture: {
        img: string;
        title: string;
        subTitle: string;
    }[];
    heroWithoutPicture: {
        title: string;
        subTitle: string;
    }[];
};

export const getHeroData = (t: TFunction<"translation">): THeroData => ({
    heroWithPicture: [
        {
            img: "mobile-contact-us-form_360x.jpg",
            title: t("home.heroWithPicture.signIn.title"),
            subTitle: t("home.heroWithPicture.signIn.subTitle"),
        },
        {
            img: "shopping-gift-wrap_360x.jpg",
            title: t("home.heroWithPicture.shop.title"),
            subTitle: t("home.heroWithPicture.shop.subTitle"),
        },
        {
            img: "online-shopping_360x.jpg",
            title: t("home.heroWithPicture.delivery.title"),
            subTitle: t("home.heroWithPicture.delivery.subTitle"),
        },
    ],
    heroWithoutPicture: [
        {
            title: t("home.heroWithoutPicture.price.title"),
            subTitle: t("home.heroWithoutPicture.price.subTitle"),
        },
        {
            title: t("home.heroWithoutPicture.time.title"),
            subTitle: t("home.heroWithoutPicture.time.subTitle"),
        },
        {
            title: t("home.heroWithoutPicture.news.title"),
            subTitle: t("home.heroWithoutPicture.news.subTitle"),
        },
    ],
});
