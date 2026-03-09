import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Auth = ({ onLogin, mode = "login" }) => {
    const [isLogin, setIsLogin] = useState(mode === "login");

    return (
        <div className="auth-container">
            {isLogin ? (
                <Login
                    onLogin={onLogin}
                    onSwitchToSignup={() => setIsLogin(false)}
                />
            ) : (
                <Signup
                    onSignUpSuccess={() => setIsLogin(true)}
                    onSwitchToLogin={() => setIsLogin(true)}
                />
            )}
        </div>
    );
};

export default Auth;