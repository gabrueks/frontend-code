import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import { Ul } from "./styles";

type TProps = {
    options: {
        name: string;
        route: string;
    }[];
};

const CenterNav: React.FC<TProps> = ({ options }) => {
    const history = useHistory();
    const location = useLocation();

    return (
        <Ul>
            {options.map((option, i) => (
                <li key={i}>
                    {option.route === location.pathname ? (
                        <a
                            className="stroke"
                            onClick={() => history.push(`${option.route}`)}>
                            {option.name}
                        </a>
                    ) : (
                        <a onClick={() => history.push(`${option.route}`)}>
                            {option.name}
                        </a>
                    )}
                </li>
            ))}
        </Ul>
    );
};

export default CenterNav;
