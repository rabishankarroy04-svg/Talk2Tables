import React, { useState } from "react";
import logo from "./Talk2Tables_logo.png";
import "./Login.css";

const Login = ({ onLogin, onSwitchToSignup }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getApiBase = () => {
        const hostname = window.location.hostname;
        return `http://${hostname}:5000`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const API_BASE = getApiBase();

        try {
            const response = await fetch(`${API_BASE}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                onLogin(data.user);
            } else {
                setError(data.message || "Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("Cannot connect to server. 1. Run 'python app.py'. 2. If it still fails, run 'python diagnose.py' to check for errors.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-modal">
                <div className="auth-header">
                    <div className="logo-icon">
                        <img src={logo} alt="logo" />
                    </div>
                    <h2>Welcome Back</h2>
                    <p>Log in to access your Talk2Table</p>
                </div>

                {error && <div className="auth-alert error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@company.com"
                            required
                        />
                    </div>

                    <div className="auth-input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="auth-submit-btn" disabled={loading}>
                        {loading ? "Processing..." : "Log In"}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Don't have an account?{" "}
                        <span onClick={onSwitchToSignup}>Sign Up</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
