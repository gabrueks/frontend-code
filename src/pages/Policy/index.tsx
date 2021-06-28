import React, { useEffect } from "react";

import policies from "../../policies/pt-br";

import { Container, Title, Body } from "./styles";
import { useLocation } from "react-router";

const Policy: React.FC = () => {
    const { pathname } = useLocation();
    const { 2: policy } = pathname.split("/");

    const { title, body } = policies[policy as keyof typeof policies] || {};

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="page-width">
            <Container>
                <Title>{title}</Title>
                <Body
                    dangerouslySetInnerHTML={{
                        __html: body,
                    }}
                />
            </Container>
        </div>
    );
};

export default Policy;
