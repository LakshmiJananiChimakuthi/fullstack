import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Pages
import IntroPage from "./IntroPage";
import StudentLoginPage from "./StudentLoginPage";
import TherapistLoginPage from "./TherapistLoginPage";
import SignupPage from "./SignupPage";
import StudentDashboard from "./StudentDashboard";
import LoginPage from "./LoginPage";

// Services
import TherapySessions from "./pages/TherapySessions";
import Mindfulness from "./pages/Mindfulness";
import SupportGroups from "./pages/SupportGroups";
import SelfAssessment from "./pages/SelfAssessment";
import DoctorDashboard from "./pages/DoctorDashboard";
import TherapistDashboard from "./pages/TherapistDashboard";
import HomePage from "./HomePage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Landing & Auth Routes */}
        <Route path="/" element={<IntroPage />} />
        <Route path="/login-student" element={<StudentLoginPage />} />
        <Route path="/login-therapist" element={<TherapistLoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Dashboards */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/therapist-dashboard" element={<TherapistDashboard />} />

        {/* Services & Pages */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/therapy-sessions" element={<TherapySessions />} />
        <Route path="/mindfulness" element={<Mindfulness />} />
        <Route path="/support-groups" element={<SupportGroups />} />
        <Route path="/self-assessment" element={<SelfAssessment />} />

        {/* Legacy Routes */}
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
