import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";

export default function TherapistLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Pre-registered therapist accounts from booking sessions
  const registeredTherapists = [
    {
      name: "Dr. Priya Sharma",
      email: "priya.sharma@therapymail.com",
      password: "priya@123",
      phone: "+91 9876543210",
      experience: "10",
      specialization: "Anxiety & Stress Specialist",
      age: 36,
      qualification: "Ph.D. in Clinical Psychology",
      graduation: "University of Delhi",
      message: "Your mental well-being is my priority. Let's work together to overcome challenges.",
      ratings: 4.8,
      reviews: [
        { studentName: "Rahul K.", rating: 5, text: "Excellent therapist! Very compassionate and helpful." },
        { studentName: "Ananya M.", rating: 5, text: "Best therapy sessions I've had. Highly recommended!" },
        { studentName: "Vikram S.", rating: 4, text: "Good approach and great listening skills." }
      ],
      availability: true,
      bookings: [],
    },
    {
      name: "Dr. Rohan Kumar",
      email: "rohan.kumar@therapymail.com",
      password: "rohan@123",
      phone: "+91 9123456780",
      experience: "12",
      specialization: "Depression & Mood Disorders",
      age: 40,
      qualification: "M.D. Psychiatry",
      graduation: "AIIMS, New Delhi",
      message: "Together we can find ways to manage and heal emotional struggles.",
      ratings: 4.6,
      reviews: [
        { studentName: "Akshita P.", rating: 5, text: "Very knowledgeable and patient. Helped me understand depression better." },
        { studentName: "Nikhil T.", rating: 4, text: "Professional and caring approach to treatment." }
      ],
      availability: true,
      bookings: [],
    },
    {
      name: "Dr. Sneha Iyer",
      email: "sneha.iyer@therapymail.com",
      password: "sneha@123",
      phone: "+91 9988776655",
      experience: "8",
      specialization: "Student Counseling Expert",
      age: 34,
      qualification: "M.Sc. Counseling Psychology",
      graduation: "JNU, New Delhi",
      message: "I am here to guide students to overcome stress and achieve their potential.",
      ratings: 4.7,
      reviews: [
        { studentName: "Shreya D.", rating: 5, text: "Life-changing sessions! She understands student problems so well." },
        { studentName: "Arjun V.", rating: 5, text: "Very supportive and created a safe space for me to open up." }
      ],
      availability: true,
      bookings: [],
    },
  ];

  // Initialize registered therapist accounts in localStorage on mount
  useEffect(() => {
    registeredTherapists.forEach(therapist => {
      const therapistKey = `therapist_${therapist.email}`;
      const existingUser = localStorage.getItem(therapistKey);
      
      if (!existingUser) {
        // Create new therapist profile
        localStorage.setItem(therapistKey, JSON.stringify(therapist));
      } else {
        // Update existing profile to ensure availability field exists
        const userData = JSON.parse(existingUser);
        if (userData.availability === undefined) {
          userData.availability = true; // Default to available
          localStorage.setItem(therapistKey, JSON.stringify(userData));
        }
      }
    });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Simple validation - in real app, this would connect to backend
    const storedUser = localStorage.getItem(`therapist_${email}`);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.password === password) {
        localStorage.setItem("authUser", JSON.stringify({ ...user, role: "therapist" }));
        navigate("/therapist-dashboard");
      } else {
        setError("Invalid email or password");
      }
    } else {
      setError("No account found. Please sign up first.");
    }
  };

  return (
    <div className="login-container therapist-login">
      <div className="login-box">
        <div className="login-header therapist-header">
          <h2>Therapist Login</h2>
          <p>Access your professional dashboard</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-btn therapist-login-btn">
            Login
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
          <p><Link to="/">Back to Home</Link></p>
        </div>
      </div>
    </div>
  );
}
