import React, { useState } from "react";
import "./index.css";

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    company_name: "",
    designation: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePhone = (phone) => {
    // Basic validation for 10+ digits with optional + prefix
    return String(phone).match(/^\+?[\d\s-]{10,15}$/);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = isLogin ? "http://127.0.0.1:5000/api/login" : "http://127.0.0.1:5000/api/register";
    
    if (!isLogin) {
      if (!validateEmail(formData.email)) {
        setError("Invalid email address. This email format does not exist.");
        setLoading(false);
        return;
      }
      if (formData.phone && !validatePhone(formData.phone)) {
        setError("Invalid phone number. This phone format does not exist.");
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        if (isLogin) {
          onLogin(data.user);
        } else {
          setIsLogin(true);
          setError("Registration successful! Please login.");
        }
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-modal">
        <div className="auth-header">
          <div className="logo-icon">⚡</div>
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p>{isLogin ? "Log in to access your DashAI" : "Join DashAI to generate interactive dashboards"}</p>
        </div>

        {error && <div className={`auth-alert ${error.includes("successful") ? "success" : "error"}`}>{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="auth-grid">
              <div className="auth-input-group">
                <label>Full Name</label>
                <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="John Doe" required />
              </div>
              <div className="auth-input-group">
                <label>Phone Number</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
              </div>
              <div className="auth-input-group">
                <label>Company Name</label>
                <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} placeholder="Acme Inc." />
              </div>
              <div className="auth-input-group">
                <label>Designation</label>
                <input type="text" name="designation" value={formData.designation} onChange={handleChange} placeholder="Executive Manager" />
              </div>
            </div>
          )}

          <div className="auth-input-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@company.com" required />
          </div>

          <div className="auth-input-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Processing..." : isLogin ? "Log In" : "Register"}
          </button>
        </form>

        <div className="auth-footer">
          {isLogin ? (
            <p>Don't have an account? <span onClick={() => setIsLogin(false)}>Sign Up</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setIsLogin(true)}>Log In</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
