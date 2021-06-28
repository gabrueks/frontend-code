import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { composePathName, routes } from "../../../../routes";

import { ProductTitle } from "./styles";

const ProductRenderer = function AccountRenderer(
    [title, buySimilar]: (string | boolean)[],
    acessor: string,
    idx: number,
): ReactElement {
    return (
        <ProductData
            key={idx}
            title={String(title)}
            acessor={acessor}
            buySimilar={Boolean(buySimilar)}
        />
    );
};
export default ProductRenderer;

const ProductData: React.FC<{
    title: string;
    acessor: string;
    buySimilar: boolean;
}> = ({ title, acessor, buySimilar }) => {
    const history = useHistory();
    const redirectToDetails = () => {
        history.push(
            composePathName(routes.PRODUCT, {
                handle: "TODO", // TODO
            }),
        );
    };
    return (
        <td
            {...(acessor === "hidden"
                ? { id: acessor }
                : { data: `${acessor}:` })}>
            <ProductTitle onClick={redirectToDetails}>
                <span>{title}</span>
                <p>{`Comprar um similar, caso não achem o produto da foto: ${
                    buySimilar ? "Sim" : "Não"
                }`}</p>
            </ProductTitle>
        </td>
    );
};
