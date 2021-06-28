import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "./services/i18n";
import "./index.css";

declare global {
    interface Window {
        fbq: any;
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
