import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const nav = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      alert("Please enter all details");
      return;
    }

    alert(`Signing up with Name: ${name}, Email: ${email}`);

    // 👉 After signup, go to homepage
    nav("/");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Create Account</h1>
        <p className="login-subtitle">Get started with MindWell Connect</p>

        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
            />
          </div>

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
            Sign Up
          </button>
        </form>

        <div className="login-footer">
          <p>
            Already have an account?{" "}
            <a onClick={() => nav("/login")}>Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;