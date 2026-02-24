import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      alert("Enter details");
      return;
    }

    nav("/"); // 👉 Navigate to home
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to continue to MindWell Connect</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Sign In
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