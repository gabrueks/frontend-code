import React, { ReactElement } from "react";
import { CSSObject } from "styled-components";

import { Cell } from "./styles";

function TextRenderer(
    text: string,
    acessor: string,
    idx: number,
    softConfig?: CSSObject,
): ReactElement {
    return (
        <TextData
            key={idx}
            text={text}
            acessor={acessor}
            softConfig={softConfig}
        />
    );
}
export default TextRenderer;

const TextData: React.FC<{
    text: string;
    acessor: string;
    softConfig?: CSSObject;
}> = ({ text, acessor, softConfig }) => {
    return (
        <Cell
            softConfig={softConfig}
            {...(acessor === "hidden"
                ? { id: acessor }
                : { data: `${acessor}:` })}>
            {text}
        </Cell>
    );
};
