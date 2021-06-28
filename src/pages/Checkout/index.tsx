import React, { FC, ReactElement, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Resume from "./Resume";
import Steps from "./Steps";

import { Container, Logo, Wrapper } from "./styles";

import { useAccountContext, withAccountContext } from "../../contexts/Account";
import { useCheckoutContext } from "../../contexts/Checkout";

import { routes } from "../../routes";

const Checkout: FC = (): ReactElement => {
    const { checkoutInfo, updateEmail } = useCheckoutContext();
    const { customer } = useAccountContext();

    const history = useHistory();

    useEffect(() => {
        if (!checkoutInfo?.email && customer?.email) {
            updateEmail(customer.email);
        }
    }, [checkoutInfo?.email, customer?.email, updateEmail]);

    return (
        <Container>
            <Wrapper>
                <Steps />
                <Resume />
                <Logo mobile onClick={() => history.push(routes.HOME)}>
                    dolado
                </Logo>
            </Wrapper>
        </Container>
    );
};

export default withAccountContext(Checkout);
