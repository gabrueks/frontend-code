import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { composePathName, routes } from "../../../../routes";

import { Button } from "./styles";

const AccountRenderer = function AccountRenderer(
    id: string,
    acessor: string,
    idx: number,
): ReactElement {
    return <AccountId key={idx} acessor={acessor} id={id} />;
};
export default AccountRenderer;

const AccountId: React.FC<{ id: string; acessor: string }> = ({
    id,
    acessor,
}) => {
    const history = useHistory();
    const redirectToDetails = () => {
        history.push(
            composePathName(routes.ACCOUNT_ORDER_DETAIL, {
                id: encodeURIComponent(id),
            }),
        );
    };
    return (
        <td
            {...(acessor === "hidden"
                ? { id: acessor }
                : { data: `${acessor}:` })}>
            <Button onClick={redirectToDetails}>
                <span>{id}</span>
            </Button>
        </td>
    );
};
