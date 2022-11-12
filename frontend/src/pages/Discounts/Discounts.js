import React from "react"
import { Helmet } from 'react-helmet';
import "./discounts.css"
const Discounts = () => {
    function inIframe() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }
    if (inIframe()) {
        return (
            <div></div>
        )
    } else {


        return <div>
            <Helmet>
                <title>Modifier Image promotion</title>
            </Helmet>
            <div className="discounts">
                <h3>Promotions</h3>
            </div>
        </div>

    }
}

export default Discounts;