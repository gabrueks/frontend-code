import React, { useState } from "react";

import Login from "./Login";
import ForgotPassword from "./ForgotPassword";

function LoginFlow(): React.ReactElement {
    const [step, setStep] = useState(0);

    const handleStep = () => {
        switch (step) {
            case 0:
                return <Login goToForgotPassword={() => setStep(1)} />;
            case 1:
                return <ForgotPassword goBackToLogin={() => setStep(0)} />;
            default:
                return <Login goToForgotPassword={() => setStep(1)} />;
        }
    };

    return <div>{handleStep()}</div>;
}

export default LoginFlow;
