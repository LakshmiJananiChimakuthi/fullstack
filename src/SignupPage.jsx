import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import "./SignupPage.css";

function SignupPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState(''); // 'student' or 'therapist'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [specialization, setSpecialization] = useState(''); // For therapists
  const [experience, setExperience] = useState(''); // For therapists
  const [error, setError] = useState('');

  const therapySpecializations = [
    'General Counseling',
    'Anxiety & Depression',
    'Relationship Therapy',
    'Trauma & PTSD',
    'Stress Management',
    'Cognitive Behavioral Therapy',
    'Family Therapy',
    'Child Psychology'
  ];

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');

    if (!role) {
      setError('Please select your role');
      return;
    }

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (role === 'therapist' && (!specialization || !experience)) {
      setError('Please fill in specialization and experience');
      return;
    }

    // Save to localStorage
    const userData = {
      name,
      email,
      password,
      role,
    };

    if (role === 'therapist') {
      userData.specialization = specialization;
      userData.experience = experience;
      userData.ratings = 0;
      userData.reviews = [];
      userData.availability = true;
      userData.bookings = [];
      localStorage.setItem(`therapist_${email}`, JSON.stringify(userData));
    } else {
      userData.bookings = [];
      userData.assessmentScores = {};
      localStorage.setItem(`student_${email}`, JSON.stringify(userData));
    }

    alert(`Account created successfully as ${role}!`);
    navigate(role === 'student' ? '/login-student' : '/login-therapist');
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-header">
          <h2>Create Your Account</h2>
          <p>Join ZenFlow and start your wellness journey</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {!role ? (
          <div className="role-selection">
            <h3>Please select your role:</h3>
            <div className="role-buttons">
              <button 
                type="button"
                className="role-btn student-role"
                onClick={() => setRole('student')}
              >
                <div className="role-icon">🎓</div>
                <h4>Student</h4>
              </button>
              <button 
                type="button"
                className="role-btn therapist-role"
                onClick={() => setRole('therapist')}
              >
                <div className="role-icon">👨‍⚕️</div>
                <h4>Therapist</h4>
              </button>
            </div>

            <div className="role-descriptions">
              <div className="description-card">
                <p>Access therapy, mindfulness & support</p>
              </div>
              <div className="description-card">
                <p>Create your professional profile</p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSignup} className="signup-form">
            <button 
              type="button"
              className="back-btn"
              onClick={() => setRole('')}
            >
              ← Back to role selection
            </button>

            <div className="signup-role-badge">
              {role === 'student' ? '🎓 Student Registration' : '👨‍⚕️ Therapist Registration'}
            </div>

            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>

            {role === 'therapist' && (
              <>
                <div className="form-group">
                  <label htmlFor="specialization">Specialization *</label>
                  <select
                    id="specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                  >
                    <option value="">Select your specialization</option>
                    {therapySpecializations.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="experience">Years of Experience *</label>
                  <input
                    type="number"
                    id="experience"
                    min="0"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="Enter years of experience"
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
              />
            </div>

            <button type="submit" className="signup-btn">
              Create Account
            </button>
          </form>
        )}

        {role && (
          <div className="signup-footer">
            <p>Already have an account? <Link to={role === 'student' ? '/login-student' : '/login-therapist'}>Login here</Link></p>
          </div>
        )}

        <div className="signup-footer bottom-footer">
          <p><Link to="/">← Back to Home</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;