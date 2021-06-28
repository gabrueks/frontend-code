import React, { useEffect, useRef, useState } from "react";
import Expand from "react-expand-animated";
import { useHistory } from "react-router-dom";
import Modal from "../../components/Search/index";
import { useModal } from "../../components/Search/useModal";
import { useCookiesContext } from "../../contexts/Cookies";

import CenterNav from "./CenterNav";

import LogoSrc from "../../assets/imgs/dolado_logo.png";

import { useCheckoutContext } from "../../contexts/Checkout";

import {
    BoxToggle,
    ExpandBoxes,
    UlMobile,
    Nav,
    Logo,
    Icon,
    Ol,
    Badge,
} from "./styles";

import { composeRoute, routes } from "../../routes";
import { useTranslation } from "react-i18next";

const Navbar = () => {
    const { t } = useTranslation();

    const { checkoutInfo, associateCustomer } = useCheckoutContext();
    const { isShown, toggleSearch } = useModal();
    const {
        cookies: { customerAccessTokenCreate },
    } = useCookiesContext();

    const token = useRef(customerAccessTokenCreate);
    useEffect(() => {
        token.current = customerAccessTokenCreate;
    }, [customerAccessTokenCreate]);

    const history = useHistory();
    const [open, setOpen] = useState(false);
    const path = window.location.pathname;

    function toggle() {
        setOpen(!open);
    }
    const transitions = ["height", "opacity", "background"];

    const calculateQuantity = (lineItems) => {
        return lineItems.reduce((tol, li) => tol + li.quantity, 0);
    };

    const handleGoToAccount = () => {
        history.push(token.current ? routes.ACCOUNT : routes.LOGIN);
    };

    const handleGoToCart = () => {
        if (!checkoutInfo || (checkoutInfo && !checkoutInfo.lineItems.length)) {
            history.push(routes.CART);
        } else if (token.current) {
            if (checkoutInfo && !checkoutInfo.customer) {
                associateCustomer();
            }
            history.push(routes.CART);
        } else {
            history.push(
                composeRoute(routes.LOGIN, {
                    state: {
                        from: { pathname: routes.CART },
                    },
                }),
            );
        }
    };

    const options = [
        { name: t("header.options.init"), route: "/" },
        { name: t("header.options.categories"), route: "/collections" },
        { name: t("header.options.products"), route: "/collections/all" },
    ];

    return (
        <Nav className="stroke">
            <Modal isShown={isShown} hide={toggleSearch} />
            <div className="logo">
                <Logo onClick={() => history.push(routes.HOME)} src={LogoSrc} />
            </div>
            <CenterNav options={options} />
            <Ol>
                <li>
                    <a onClick={toggleSearch}>
                        <Icon src="/search.svg" alt="search" />
                    </a>
                </li>
                <li>
                    <Icon
                        src="/user.svg"
                        alt="user"
                        onClick={handleGoToAccount}
                    />
                </li>
                <li onClick={handleGoToCart}>
                    <Icon src="/bag.svg" alt="bag" />
                    {checkoutInfo && !!checkoutInfo.lineItems.length && (
                        <Badge>
                            <span>
                                {calculateQuantity(checkoutInfo.lineItems)}
                            </span>
                        </Badge>
                    )}
                </li>
                <li>
                    <BoxToggle>
                        {!open ? (
                            <Icon
                                onClick={toggle}
                                src="/hamburguer.svg"
                                alt="hamburguer"
                            />
                        ) : (
                            <Icon
                                onClick={toggle}
                                src="/close.svg"
                                alt="close"
                            />
                        )}
                    </BoxToggle>
                </li>
            </Ol>
            <Expand open={open} duration={350} transitions={transitions}>
                <ExpandBoxes>
                    <UlMobile>
                        {options.map((option, i) => (
                            <div className="menuBorder" key={i}>
                                <li key={i}>
                                    {option.route === path ? (
                                        <a
                                            className="stroke"
                                            onClick={() =>
                                                history.push(`${option.route}`)
                                            }>
                                            {option.name}
                                        </a>
                                    ) : (
                                        <a
                                            onClick={() =>
                                                history.push(`${option.route}`)
                                            }>
                                            {option.name}
                                        </a>
                                    )}
                                </li>
                            </div>
                        ))}
                    </UlMobile>
                </ExpandBoxes>
            </Expand>
        </Nav>
    );
};

export default Navbar;
