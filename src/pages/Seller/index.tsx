import React, { useEffect } from "react";
import "./index.css";

const Seller: React.FC = () => {
    useEffect(() => {
        const script = document.createElement("script");

        script.src = "https://sp-seller.webkul.com/js/vc_seller_profile.min.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <main
            className="main-content js-focus-hidden"
            id="MainContent"
            role="main"
            tabIndex={-1}>
            <div className="rte">
                <div className="mp_sp_page" data-cust=""></div>
                <div className="wk_cstm_email" data-cust=""></div>
                <div className="wk_cstm_name" data-cust=""></div>
            </div>
            <div className="mp-loader">
                <div className="mp-spinner"></div>
                <div className="title-text">Carregando...</div>
            </div>
        </main>
    );
};

export default Seller;
