import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("user"); // "user" or "doctor"
  const [error, setError] = useState("");

  // Demo doctor credentials
  const doctorCredentials = [
    {
      email: "priya.sharma@therapymail.com",
      password: "doctor123",
      name: "Dr. Priya Sharma",
      id: 1
    },
    {
      email: "rohan.kumar@therapymail.com",
      password: "doctor123",
      name: "Dr. Rohan Kumar",
      id: 2
    },
    {
      email: "sneha.iyer@therapymail.com",
      password: "doctor123",
      name: "Dr. Sneha Iyer",
      id: 3
    }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (email.trim() === "" || password.trim() === "") {
      setError("Please enter both email and password");
      return;
    }

    if (loginType === "user") {
      // User login - simple validation for demo
      nav("/"); // Navigate to home
    } else {
      // Doctor login - validate credentials
      const doctor = doctorCredentials.find(
        doc => doc.email === email && doc.password === password
      );

      if (doctor) {
        // Store authentication data
        const authData = {
          isAuthenticated: true,
          doctorId: doctor.id,
          doctorName: doctor.name,
          doctorEmail: doctor.email,
          loginTime: new Date().toISOString()
        };

        localStorage.setItem('doctorAuth', JSON.stringify(authData));
        nav("/doctor-dashboard");
      } else {
        setError("Invalid doctor credentials. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to continue to MindWell Connect</p>

        {/* Role Selector */}
        <div className="role-selector">
          <button
            type="button"
            className={`role-btn ${loginType === "user" ? "active" : ""}`}
            onClick={() => { setLoginType("user"); setError(""); setEmail(""); setPassword(""); }}
          >
            👤 User
          </button>
          <button
            type="button"
            className={`role-btn ${loginType === "doctor" ? "active" : ""}`}
            onClick={() => { setLoginType("doctor"); setError(""); setEmail(""); setPassword(""); }}
          >
            👨‍⚕️ Doctor / Therapist
          </button>
        </div>

        <form onSubmit={handleLogin}>
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              required
              autoComplete="email"
            />
            <label>Email</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              required
              autoComplete="current-password"
            />
            <label>Password</label>
          </div>

          <button type="submit" className="login-button">
            Sign In as {loginType === "user" ? "User" : "Doctor"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <a onClick={() => nav("/signup")}>Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;