import React, { FunctionComponent, useState, ChangeEvent } from "react";
import { useHistory } from "react-router";
import ReactDOM from "react-dom";
import Loading from "../../components/Loading";
import {
    Wrapper,
    Header,
    StyledModal,
    StyledSubModal,
    CloseButton,
    Backdrop,
    Body,
    FormSearch,
    InputSearch,
    BtnSearch,
    Icon,
    ListDivisor,
    SectionType,
    Container,
    TextContainer,
    Image,
    Title,
    SearchFor,
} from "./styles";

import {
    withSearchContext,
    useForgotPasswordContext,
} from "../../contexts/Search/index";
import { composeRoute, routes } from "../../routes";

import { useTranslation } from "react-i18next";
export interface ModalProps {
    isShown: boolean;
    hide: () => void;
    modalContent: JSX.Element;
    headerText: string;
}
const Modal: FunctionComponent<ModalProps> = ({ isShown, hide }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const [data, setData] = useState({ search: "" });
    const { handleSubmit, result, loading } = useForgotPasswordContext();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        if (data.search.trim()) handleSubmit({ query: data.search, first: 4 });
    };

    const handleSearch = () => {
        if (data.search.trim()) {
            hide();
            history.push({
                pathname: "/search",
                state: data.search,
            });
            setData({ search: "" });
        }
    };

    const handleClose = () => {
        hide();
        setData({ search: "" });
    };

    const openProduct = (handle: string) => {
        hide();
        setData({ search: "" });
        history.push(
            composeRoute(routes.PRODUCT, {
                params: { handle: handle ?? "" },
            }),
        );
    };

    const modal = (
        <React.Fragment>
            <Backdrop />
            <Wrapper>
                <StyledModal>
                    <Header></Header>
                    <FormSearch>
                        <Body>
                            <InputSearch
                                onChange={handleChange}
                                placeholder={t("search.message.placeHolder")}
                                name="search"
                                value={data.search}
                            />
                            <BtnSearch />
                            <BtnSearch onClick={handleSearch}>
                                <Icon src="/search.svg" alt="search" />
                            </BtnSearch>
                            <CloseButton>
                                <Icon
                                    onClick={handleClose}
                                    src="/close.svg"
                                    alt="close"
                                />
                            </CloseButton>
                        </Body>
                        {data.search.trim() && (
                            <StyledSubModal>
                                <SectionType>Produtos</SectionType>
                                <ListDivisor />
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
                                                        openProduct(
                                                            Strings.handle,
                                                        )
                                                    }>
                                                    <TextContainer>
                                                        <Image
                                                            src={
                                                                Strings.image
                                                                    .originalSrc
                                                            }
                                                            alt={Strings.title}
                                                        />
                                                        <Title>
                                                            {Strings.title}
                                                        </Title>
                                                    </TextContainer>
                                                    <ListDivisor />
                                                </Container>
                                            ))}
                                    </>
                                )}
                                <SearchFor onClick={handleSearch}>
                                    {t("search.message.placeHolder")} &quot;
                                    {data.search}&quot;
                                </SearchFor>
                            </StyledSubModal>
                        )}
                    </FormSearch>
                </StyledModal>
            </Wrapper>
        </React.Fragment>
    );
    return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};

export default withSearchContext(Modal);
