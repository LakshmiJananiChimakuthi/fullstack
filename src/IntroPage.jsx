import React from "react";
import { useNavigate } from "react-router-dom";
import "./IntroPage.css";

export default function IntroPage() {
  const navigate = useNavigate();

  return (
    <div className="intro-container">
      <div className="intro-header-nav">
        <div className="header-brand">
          <h1 className="header-logo">ZenFlow</h1>
          <span className="header-logo-icon">🧠</span>
        </div>
        <div className="header-buttons">
          <button 
            className="intro-btn login-btn"
            onClick={() => navigate("/login-student")}
          >
            Login as Student
          </button>
          <button 
            className="intro-btn therapist-btn"
            onClick={() => navigate("/login-therapist")}
          >
            Login as Therapist
          </button>
          <button 
            className="intro-btn signup-btn"
            onClick={() => navigate("/signup")}
          >
            Create New Account
          </button>
        </div>
      </div>

      <div className="intro-content">
        <div className="empty-state">
          <svg className="wellness-illustration" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            {/* Lotus flower - symbol of peace and mental wellness */}
            {/* Center circle */}
            <circle cx="100" cy="100" r="12" fill="rgba(255, 200, 0, 0.95)" />
            
            {/* Inner petals */}
            <ellipse cx="100" cy="75" rx="8" ry="15" fill="rgba(255, 255, 255, 0.9)" />
            <ellipse cx="125" cy="85" rx="8" ry="15" fill="rgba(255, 255, 255, 0.9)" transform="rotate(45 125 85)" />
            <ellipse cx="125" cy="115" rx="8" ry="15" fill="rgba(255, 255, 255, 0.9)" transform="rotate(90 125 115)" />
            <ellipse cx="100" cy="125" rx="8" ry="15" fill="rgba(255, 255, 255, 0.9)" transform="rotate(135 100 125)" />
            <ellipse cx="75" cy="115" rx="8" ry="15" fill="rgba(255, 255, 255, 0.88)" transform="rotate(180 75 115)" />
            <ellipse cx="75" cy="85" rx="8" ry="15" fill="rgba(255, 255, 255, 0.88)" transform="rotate(225 75 85)" />
            
            {/* Outer petals */}
            <ellipse cx="100" cy="55" rx="10" ry="18" fill="rgba(255, 255, 255, 0.8)" />
            <ellipse cx="135" cy="68" rx="10" ry="18" fill="rgba(255, 255, 255, 0.8)" transform="rotate(60 135 68)" />
            <ellipse cx="145" cy="100" rx="10" ry="18" fill="rgba(255, 255, 255, 0.8)" transform="rotate(90 145 100)" />
            <ellipse cx="135" cy="132" rx="10" ry="18" fill="rgba(255, 255, 255, 0.8)" transform="rotate(120 135 132)" />
            <ellipse cx="100" cy="145" rx="10" ry="18" fill="rgba(255, 255, 255, 0.75)" transform="rotate(150 100 145)" />
            <ellipse cx="65" cy="132" rx="10" ry="18" fill="rgba(255, 255, 255, 0.75)" transform="rotate(180 65 132)" />
            <ellipse cx="55" cy="100" rx="10" ry="18" fill="rgba(255, 255, 255, 0.75)" transform="rotate(210 55 100)" />
            <ellipse cx="65" cy="68" rx="10" ry="18" fill="rgba(255, 255, 255, 0.8)" transform="rotate(240 65 68)" />
            
            {/* Radial glow */}
            <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="2" />
            <circle cx="100" cy="100" r="55" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
          </svg>
          <h2>Welcome to ZenFlow</h2>
          <p>Your Mental Health, Our Priority</p>
        </div>
      </div>
    </div>
  );
}
