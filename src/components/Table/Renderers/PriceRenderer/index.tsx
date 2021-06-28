import React, { ReactElement } from "react";
import formatMoney from "../../../../helpers/format/formatMoney";

function PriceRenderer(
    [price, quantity]: number[],
    acessor: string,
    idx: number,
): ReactElement {
    return <PriceData key={idx} price={price * quantity} acessor={acessor} />;
}
export default PriceRenderer;

const PriceData: React.FC<{
    price: number;
    acessor: string;
}> = ({ price, acessor }) => {
    return (
        <td
            {...(acessor === "hidden"
                ? { id: acessor }
                : { data: `${acessor}:` })}>
            {formatMoney(price)}
        </td>
    );
};
