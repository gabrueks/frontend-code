import { TFunction } from "react-i18next";

export type TFilterOptions = {
    collection: {
        query: {
            collection: string;
        };
        value: string;
        label: string;
    }[];
    orderBy: {
        query: {
            orderBy: string;
            reverse: boolean;
        };
        value: string;
        label: string;
    }[];
};

export const getFilterOptions = (
    t: TFunction<"translation">,
): TFilterOptions => ({
    collection: [
        {
            query: {
                collection: t(
                    "collection.filters.collection.all.queryCollection",
                ),
            },
            value: t("collection.filters.collection.all.value"),
            label: t("collection.filters.collection.all.label"),
        },
        {
            query: {
                collection: t(
                    "collection.filters.collection.acessories.queryCollection",
                ),
            },
            value: t("collection.filters.collection.acessories.value"),
            label: t("collection.filters.collection.acessories.label"),
        },
        {
            query: {
                collection: t(
                    "collection.filters.collection.adapters.queryCollection",
                ),
            },
            value: t("collection.filters.collection.adapters.value"),
            label: t("collection.filters.collection.adapters.label"),
        },
        {
            query: {
                collection: t(
                    "collection.filters.collection.cables.queryCollection",
                ),
            },
            value: t("collection.filters.collection.cables.value"),
            label: t("collection.filters.collection.cables.label"),
        },
        {
            query: {
                collection: t(
                    "collection.filters.collection.speakers.queryCollection",
                ),
            },
            value: t("collection.filters.collection.speakers.value"),
            label: t("collection.filters.collection.speakers.label"),
        },
        {
            query: {
                collection: t(
                    "collection.filters.collection.capes.queryCollection",
                ),
            },
            value: t("collection.filters.collection.capes.value"),
            label: t("collection.filters.collection.capes.label"),
        },
        {
            query: {
                collection: t(
                    "collection.filters.collection.chargers.queryCollection",
                ),
            },
            value: t("collection.filters.collection.chargers.value"),
            label: t("collection.filters.collection.chargers.label"),
        },
        {
            query: {
                collection: t(
                    "collection.filters.collection.headsets.queryCollection",
                ),
            },
            value: t("collection.filters.collection.headsets.value"),
            label: t("collection.filters.collection.headsets.label"),
        },
        {
            query: {
                collection: t(
                    "collection.filters.collection.screenProtector.queryCollection",
                ),
            },
            value: t("collection.filters.collection.screenProtector.value"),
            label: t("collection.filters.collection.screenProtector.label"),
        },
        {
            query: {
                collection: t(
                    "collection.filters.collection.supports.queryCollection",
                ),
            },
            value: t("collection.filters.collection.supports.value"),
            label: t("collection.filters.collection.supports.label"),
        },
    ],
    orderBy: [
        {
            query: {
                orderBy: t("collection.filters.orderBy.relevance.key"),
                reverse: false,
            },
            value: t("collection.filters.orderBy.relevance.value"),
            label: t("collection.filters.orderBy.relevance.label"),
        },
        {
            query: {
                orderBy: t("collection.filters.orderBy.titleAsc.key"),
                reverse: false,
            },
            value: t("collection.filters.orderBy.titleAsc.value"),
            label: t("collection.filters.orderBy.titleAsc.label"),
        },
        {
            query: {
                orderBy: t("collection.filters.orderBy.titleDesc.key"),
                reverse: true,
            },
            value: t("collection.filters.orderBy.titleDesc.value"),
            label: t("collection.filters.orderBy.titleDesc.label"),
        },
        {
            query: {
                orderBy: t("collection.filters.orderBy.createdAtAsc.key"),
                reverse: false,
            },
            value: t("collection.filters.orderBy.createdAtAsc.value"),
            label: t("collection.filters.orderBy.createdAtAsc.label"),
        },
        {
            query: {
                orderBy: t("collection.filters.orderBy.createdAtDesc.key"),
                reverse: true,
            },
            value: t("collection.filters.orderBy.createdAtDesc.value"),
            label: t("collection.filters.orderBy.createdAtDesc.label"),
        },
    ],
});
