import React, {
    FC,
    ReactElement,
    useRef,
    useCallback,
    useEffect,
    useState,
} from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import {
    Action,
    ActionsContainer,
    ActionLabel,
    BannerContainer,
    Container,
    PaginationContainer,
    PageButton,
    PageText,
    ProductsContainer,
    Title,
    TotalLabel,
} from "./styles";

import ProductItem from "../../components/ProductItem";
import Select, { TSelectProps } from "../../components/Select";
import Skeleton from "../../components/Skeleton";

import {
    useProductsContext,
    withProductsContext,
} from "../../contexts/Products";

import {
    routes,
    routeParams,
    composePathName,
    composeSearch,
    useSearch,
} from "../../routes";
import { useTranslation } from "react-i18next";
import { getFilterOptions } from "./helper";

const Collection: FC = (): ReactElement => {
    const { t } = useTranslation();
    const {
        products,
        loading,
        page,
        pages,
        total,
        setPage,
        updateQuery,
    } = useProductsContext();

    const [bannerSrc, setBannerSrc] = useState("");

    const history = useHistory();
    const params = useParams<routeParams[routes.COLLECTION]>();
    const collectionRef = useRef(params.collection);

    const location = useLocation();
    const search = useSearch<routes.COLLECTION>(location);
    const sortByRef = useRef(search.sort_by);

    const filterOptions = getFilterOptions(t);

    useEffect(() => {
        if (typeof search.sort_by === "undefined") {
            history.push({
                pathname: history.location.pathname,
                search: composeSearch<routes.COLLECTION>({
                    sort_by: filterOptions.orderBy[2].value,
                }),
                state: location.state,
            });
        }
    }, [search.sort_by, history]);

    const updateQueryRef = useRef(updateQuery);
    const fetchData = useCallback(async () => {
        const collectionQuery =
            filterOptions.collection.find(
                (item) => item.value === collectionRef.current,
            )?.query ?? {};
        const orderByQuery =
            filterOptions.orderBy.find(
                (item) => item.value === sortByRef.current,
            )?.query ?? {};
        const filters = {
            ...collectionQuery,
            ...orderByQuery,
        };
        updateQueryRef.current(filters);
    }, []);

    const fetchBanner = useCallback(async () => {
        await new Promise((resolve) => {
            setTimeout(() => resolve(null), 1000);
        });

        setBannerSrc(
            collectionRef.current === "all" ? "" : `${location.state}`,
        );
    }, []);

    useEffect(() => {
        fetchData();
        fetchBanner();
    }, [fetchData, fetchBanner]);

    useEffect(() => {
        if (
            params.collection !== collectionRef.current ||
            search.sort_by !== sortByRef.current
        ) {
            collectionRef.current = params.collection;
            sortByRef.current = search.sort_by;
            fetchData();
            fetchBanner();
        }
    }, [params.collection, search.sort_by, fetchData, fetchBanner]);

    const onCollectionChang: TSelectProps["onChange"] = (event) => {
        if (event.target.value !== params.collection) {
            history.push({
                pathname: composePathName(routes.COLLECTION, {
                    collection: event.target.value,
                }),
                search: location.search,
                state: location.state,
            });
        }
    };

    const onOrderByChange: TSelectProps["onChange"] = (event) => {
        if (event.target.value !== search.sort_by) {
            history.push({
                pathname: location.pathname,
                search: composeSearch<routes.COLLECTION>({
                    sort_by: event.target.value,
                }),
                state: location.state,
            });
        }
    };

    return (
        <Container>
            <BannerContainer src={bannerSrc}>
                <Title hasBanner={!!bannerSrc}>
                    {
                        filterOptions.collection.find(
                            (item) => item.value === params.collection,
                        )?.label
                    }
                </Title>
            </BannerContainer>
            <ActionsContainer>
                <div>
                    <div>
                        <Action>
                            <ActionLabel>filtrar por</ActionLabel>
                            <Select
                                data={filterOptions.collection}
                                initValue={params.collection}
                                onChange={onCollectionChang}
                            />
                        </Action>
                        <Action>
                            <ActionLabel>organizar por</ActionLabel>
                            <Select
                                data={filterOptions.orderBy}
                                initValue={search.sort_by}
                                onChange={onOrderByChange}
                            />
                        </Action>
                    </div>
                    <TotalLabel>{!loading && `${total} produtos`}</TotalLabel>
                </div>
            </ActionsContainer>
            <TotalLabel mobile>{!loading && `${total} produtos`}</TotalLabel>
            <ProductsContainer>
                {loading
                    ? new Array(10)
                          .fill(null)
                          .map((_, idx) => (
                              <Skeleton
                                  key={idx}
                                  flex={1}
                                  minWidth="158px"
                                  maxWidth="220px"
                                  height="300px"
                                  margin="0 15px 30px"
                              />
                          ))
                    : products.map((prd, idx) => (
                          <ProductItem key={idx} data={prd} />
                      ))}
            </ProductsContainer>
            <PaginationContainer>
                <PageButton
                    disabled={page <= 0}
                    onClick={() => !loading && setPage(page - 1)}>
                    <img src="/icons/arrow-left.svg" alt="prev" />
                </PageButton>
                <PageText>
                    {`Página ${loading ? "_" : page + 1} de ${pages}`}
                </PageText>
                <PageButton
                    disabled={page + 1 >= pages}
                    onClick={() => !loading && setPage(page + 1)}>
                    <img src="/icons/arrow-right.svg" alt="next" />
                </PageButton>
            </PaginationContainer>
        </Container>
    );
};

export default withProductsContext(Collection);
