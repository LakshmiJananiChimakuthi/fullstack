import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import HomePage from "./HomePage";

import TherapySessions from "./pages/TherapySessions";
import Mindfulness from "./pages/Mindfulness";
import SupportGroups from "./pages/SupportGroups";
import SelfAssessment from "./pages/SelfAssessment";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* SIGNUP */}
        <Route path="/signup" element={<SignupPage />} />

        {/* HOME */}
        <Route path="/" element={<HomePage />} />

        {/* SERVICES */}
        <Route path="/therapy-sessions" element={<TherapySessions />} />
        <Route path="/mindfulness" element={<Mindfulness />} />
        <Route path="/support-groups" element={<SupportGroups />} />
        <Route path="/self-assessment" element={<SelfAssessment />} />

      </Routes>
    </Router>
  );
}
