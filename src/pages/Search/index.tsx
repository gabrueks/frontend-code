import React, {
    FC,
    ReactElement,
    useState,
    ChangeEvent,
    useEffect,
} from "react";
import { useTranslation } from "react-i18next";
import Loading from "../../components/Loading";

import ProductSearch from "../../components/ProductSearch";
import { useHistory, useLocation } from "react-router";

import {
    Container,
    TitleSecondary,
    Subtitle,
    Icon,
    BtnSearch,
    InputSearch,
    Body,
    ListDivisor,
    ClearInput,
    Image,
    TextContainer,
    SectionType,
    StyledSubModal,
    Title,
    SearchFor,
    ListDivisorSubmodal,
    PaginationContainer,
    PageButton,
    PageText,
} from "./styles";
import {
    withSearchContext,
    useForgotPasswordContext,
} from "../../contexts/Search/index";
import { TProducts } from "../../contexts/Search/interface";
import { composeRoute, routes } from "../../routes";

const SearchProduct: FC = (): ReactElement => {
    const location = useLocation();
    const { t } = useTranslation();
    const history = useHistory();
    const [data, setData] = useState({ search: "" });
    const [resultPage, setResultPage] = useState<TProducts[]>([]);
    const [page, setPage] = useState<any>(0);
    const [itemsPerPage] = useState<number>(9);
    const [pages, setPages] = useState<number>(0);
    const [resultNumber, setResultNumber] = useState<number>(0);
    const { handleSubmit, result, loading } = useForgotPasswordContext();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        if (data.search.trim()) handleSubmit({ query: data.search, first: 4 });
    };

    const openProduct = (handle: string) => {
        setData({ search: "" });
        history.push(
            composeRoute(routes.PRODUCT, {
                params: { handle: handle ?? "" },
            }),
        );
    };

    function clearInput() {
        setData({ search: "" });
    }

    const handleSearch = () => {
        if (data.search.trim()) {
            history.push({
                pathname: "/search",
                state: data.search,
            });
            setData({ search: "" });
        }
        window.location.reload();
    };

    const loadProducts = () => {
        if (location.state !== undefined) {
            handleSubmit({ query: location.state, first: 250 });
        }
    };

    const setProducts = () => {
        if (result !== undefined) {
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(result.length / itemsPerPage); i++) {
                pageNumbers.push(i);
            }
            setPages(pageNumbers.length);
            showItemsPage();
        }
    };

    const showItemsPage = () => {
        const indexOfLastResult = (page + 1) * itemsPerPage;
        const indexOfFirstResult = indexOfLastResult - itemsPerPage;
        const currentTodos = result?.slice(
            indexOfFirstResult,
            indexOfLastResult,
        );
        setResultPage(currentTodos);
        setResultNumber(result?.length);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        setProducts();
    }, [result]);

    useEffect(() => {
        showItemsPage();
    }, [page]);

    useEffect(() => {
        if (window.fbq) {
            const search_string =
                data.search === "" ? location?.state : data.search;

            window.fbq("track", "Search", {
                search_string,
            });
        }
    }, [data.search, location?.state]);

    return (
        <div>
            {data.search === "" && location.state === undefined ? (
                <TitleSecondary>{t("search.message.title2")}</TitleSecondary>
            ) : (
                <>
                    <TitleSecondary>
                        {resultNumber} {t("search.message.title")} &quot;
                        {location?.state}&quot;
                    </TitleSecondary>
                    {resultPage?.length === 0 && (
                        <Subtitle>{t("search.message.subtitle")}</Subtitle>
                    )}
                </>
            )}
            <Body>
                <InputSearch
                    onChange={handleChange}
                    placeholder={t("search.message.placeHolder")}
                    name="search"
                    value={data.search}
                />
                {data.search.trim() && (
                    <>
                        <ClearInput onClick={clearInput}>
                            <Icon src="/close.svg" alt="close" />
                        </ClearInput>
                        <StyledSubModal>
                            <SectionType>Produtos</SectionType>
                            <ListDivisorSubmodal />
                            {loading ? (
                                <Loading />
                            ) : (
                                <>
                                    {result
                                        ?.slice(0, 4)
                                        .map((Strings, index) => (
                                            <Container
                                                key={index}
                                                onClick={() =>
                                                    openProduct(Strings.handle)
                                                }>
                                                <TextContainer>
                                                    <Image
                                                        src={
                                                            Strings?.image
                                                                ?.originalSrc
                                                        }
                                                        alt={Strings?.title}
                                                    />
                                                    <Title>
                                                        {Strings?.title}
                                                    </Title>
                                                </TextContainer>
                                                <ListDivisorSubmodal />
                                            </Container>
                                        ))}
                                </>
                            )}
                            <SearchFor onClick={handleSearch}>
                                {t("search.message.placeHolder")} &quot;
                                {data.search}&quot;
                            </SearchFor>
                        </StyledSubModal>
                    </>
                )}
                <BtnSearch onClick={handleSearch}>
                    <Icon src="/icons/search-icon.svg" alt="search" />
                </BtnSearch>
            </Body>
            <ListDivisor />
            {resultPage?.map((Strings, index) => (
                <ProductSearch key={index} data={Strings} />
            ))}
            {pages !== 0 && (
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
            )}
        </div>
    );
};

export default withSearchContext(SearchProduct);
