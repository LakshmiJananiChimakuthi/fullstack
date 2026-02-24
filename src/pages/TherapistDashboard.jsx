import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorDashboard.css";
import { getDoctorBookings, updateBookingStatus, generateGoogleMeetLink, getDoctorCompletedSessions, saveCompletedSession } from "../bookingUtils.jsx";

export default function TherapistDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAvailable, setIsAvailable] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const [previousSessions, setPreviousSessions] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState(4.5);

  // Get user info from localStorage
  const userStr = localStorage.getItem("authUser");
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    if (!user || user.role !== "therapist") {
      navigate("/login-therapist");
      return;
    }

    // Load real bookings from localStorage
    loadTherapistBookings();

    // Load reviews and availability from therapist profile
    const userKey = `therapist_${user.email}`;
    const userData = JSON.parse(localStorage.getItem(userKey) || "{}");
    setReviews(userData.reviews || []);
    
    // Load availability status (default to true if not set)
    if (userData.availability !== undefined) {
      setIsAvailable(userData.availability);
    }
  }, [user, navigate]);

  const loadTherapistBookings = () => {
    if (user && user.email) {
      const allBookings = getDoctorBookings(user.email);
      console.log(`👨‍⚕️ Doctor (${user.email}) loaded ${allBookings.length} bookings`);
      
      const pending = allBookings.filter(b => b.status === 'pending');
      const confirmed = allBookings.filter(b => b.status === 'confirmed');
      const previous = getDoctorCompletedSessions(user.email);
      
      console.log(`📊 Breakdown - Pending: ${pending.length}, Confirmed: ${confirmed.length}, Completed: ${previous.length}`);
      console.log('✅ Confirmed bookings:', confirmed);
      
      setBookings(allBookings);
      setPendingBookings(pending);
      setConfirmedBookings(confirmed);
      setPreviousSessions(previous);
    }
  };

  if (!user || user.role !== "therapist") {
    return null;
  }

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("authUser");
      navigate("/");
    }
  };

  const handleAvailabilityToggle = () => {
    const newAvailability = !isAvailable;
    setIsAvailable(newAvailability);
    
    // Save to localStorage
    const userKey = `therapist_${user.email}`;
    const userData = JSON.parse(localStorage.getItem(userKey) || "{}");
    userData.availability = newAvailability;
    localStorage.setItem(userKey, JSON.stringify(userData));
    
    console.log(`🔄 Availability updated for ${user.email}:`, newAvailability);
    alert(`✅ Status updated to: ${newAvailability ? "Available" : "Busy"}\n\nStudents will see this change when booking sessions.`);
  };

  const confirmBooking = (id) => {
    const meetLink = generateGoogleMeetLink();
    console.log('🔍 Doctor confirming booking:', { id, meetLink });
    const updated = updateBookingStatus(id, 'confirmed', meetLink);
    console.log('✅ Updated booking in localStorage:', updated);
    loadTherapistBookings();
    alert("Booking confirmed! Google Meet link has been generated and student has been notified.");
  };

  const rejectBooking = (id) => {
    if (window.confirm("Are you sure you want to reject this booking?")) {
      updateBookingStatus(id, 'rejected');
      loadTherapistBookings();
      alert("Booking rejected. Student has been notified.");
    }
  };

  const markSessionCompleted = (session) => {
    if (window.confirm("Mark this session as completed?")) {
      saveCompletedSession({
        ...session,
        doctorName: user.name,
        doctorEmail: user.email
      });
      updateBookingStatus(session.id, 'completed');
      loadTherapistBookings();
      alert("Session marked as completed!");
    }
  };

  const upcomingSessions = confirmedBookings.slice(0, 3);
  const totalSessionsThisMonth = bookings.length;
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "No ratings yet";

  return (
    <div className="therapist-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>👨‍⚕️ Therapist Dashboard</h1>
          <p>Welcome, Dr. {user.name}</p>
        </div>
        <div className="header-actions">
          <button 
            className={`availability-btn ${isAvailable ? 'available' : 'busy'}`}
            onClick={handleAvailabilityToggle}
          >
            {isAvailable ? "🟢 Available" : "🔴 Busy"}
          </button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          📊 Dashboard
        </button>
        <button 
          className={`tab-btn ${activeTab === "bookings" ? "active" : ""}`}
          onClick={() => setActiveTab("bookings")}
        >
          📅 Bookings ({bookings.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          ⭐ Reviews ({reviews.length})
        </button>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-main">
        {activeTab === "dashboard" && (
          <div className="tab-content">
            <h2>Dashboard Overview</h2>
            
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <h3>Total Sessions</h3>
                <p className="stat-value">{totalSessionsThisMonth}</p>
                <p className="stat-label">This Month</p>
              </div>

              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <h3>Average Rating</h3>
                <p className="stat-value">{averageRating}</p>
                <p className="stat-label">Based on {reviews.length} reviews</p>
              </div>

              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <h3>Total Patients</h3>
                <p className="stat-value">{new Set(bookings.map(b => b.studentEmail)).size}</p>
                <p className="stat-label">Unique students</p>
              </div>

              <div className="stat-card">
                <div className="stat-icon">{isAvailable ? "🟢" : "🔴"}</div>
                <h3>Current Status</h3>
                <p className="stat-value">{isAvailable ? "Available" : "Busy"}</p>
                <p className="stat-label">Toggle your availability</p>
              </div>
            </div>

            <div className="upcoming-section">
              <h3>📅 Upcoming Confirmed Sessions</h3>
              {upcomingSessions.length > 0 ? (
                <div className="sessions-list">
                  {upcomingSessions.map(session => (
                    <div key={session.id} className="session-item">
                      <div className="session-info">
                        <h4>{session.patientName}</h4>
                        <p>📅 {session.date} at {session.time}</p>
                      </div>
                      <div className="session-actions">
                        <a href={session.meetLink} target="_blank" rel="noopener noreferrer" className="zoom-btn">
                          🎥 Join Meeting
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-state">No upcoming sessions scheduled</p>
              )}
            </div>

            <div className="profile-section">
              <h3>👨‍⚕️ Your Profile Information</h3>
              <div className="profile-info">
                <p><strong>Name:</strong> Dr. {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Specialization:</strong> {user.specialization}</p>
                <p><strong>Experience:</strong> {user.experience} years</p>
                <p><strong>Availability:</strong> {isAvailable ? "✅ Currently Available" : "❌ Currently Busy"}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="tab-content">
            <h2>Session Bookings</h2>
            
            {bookings.length > 0 ? (
              <div className="bookings-container">
                {/* Pending Bookings */}
                {pendingBookings.length > 0 && (
                  <div className="bookings-section">
                    <h3>⏳ Pending Confirmations ({pendingBookings.length})</h3>
                    <div className="bookings-grid">
                      {pendingBookings.map(booking => (
                        <div key={booking.id} className="booking-card pending">
                          <div className="booking-header">
                            <h4>{booking.patientName}</h4>
                            <span className="status-badge pending">Pending</span>
                          </div>
                          <p className="booking-detail">📧 {booking.patientEmail}</p>
                          <p className="booking-detail">📅 {booking.date}</p>
                          <p className="booking-detail">🕐 {booking.time}</p>
                          <div className="booking-actions">
                            <button className="btn-confirm" onClick={() => confirmBooking(booking.id)}>
                              ✅ Confirm & Generate Link
                            </button>
                            <button className="btn-reject" onClick={() => rejectBooking(booking.id)}>
                              ❌ Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Confirmed Bookings */}
                {confirmedBookings.length > 0 && (
                  <div className="bookings-section">
                    <h3>✅ Confirmed Sessions ({confirmedBookings.length})</h3>
                    <div className="bookings-grid">
                      {confirmedBookings.map(booking => (
                        <div key={booking.id} className="booking-card confirmed">
                          <div className="booking-header">
                            <h4>{booking.patientName}</h4>
                            <span className="status-badge confirmed">Confirmed</span>
                          </div>
                          <p className="booking-detail">📧 {booking.patientEmail}</p>
                          <p className="booking-detail">📅 {booking.date}</p>
                          <p className="booking-detail">🕐 {booking.time}</p>
                          <div className="zoom-link-section">
                            <p className="zoom-label">🎥 Meeting Link:</p>
                            <a href={booking.meetLink} target="_blank" rel="noopener noreferrer" className="zoom-link">
                              {booking.meetLink}
                            </a>
                          </div>
                          <div className="booking-actions">
                            <button className="btn-completed" onClick={() => markSessionCompleted(booking)}>
                              ✅ Mark as Completed
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Previous Sessions */}
                {previousSessions.length > 0 && (
                  <div className="bookings-section">
                    <h3>📋 Previous Sessions ({previousSessions.length})</h3>
                    <div className="bookings-grid">
                      {previousSessions.map(session => (
                        <div key={session.id} className="booking-card previous">
                          <div className="booking-header">
                            <h4>{session.patientName}</h4>
                            <span className="status-badge completed">Completed</span>
                          </div>
                          <p className="booking-detail">📅 {session.date}</p>
                          <p className="booking-detail">🕐 {session.time}</p>
                          <p className="booking-detail completed-at">Completed: {new Date(session.completedAt).toLocaleDateString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="empty-state">
                <p>No bookings yet. Students will be able to book sessions with you soon!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="tab-content">
            <h2>Student Reviews & Ratings</h2>
            
            {reviews.length > 0 ? (
              <div className="reviews-container">
                <div className="rating-summary">
                  <div className="average-rating">
                    <p className="rating-number">{averageRating}</p>
                    <p className="rating-label">out of 5.0</p>
                    <p className="rating-count">Based on {reviews.length} reviews</p>
                  </div>
                </div>

                <div className="reviews-list">
                  {reviews.map(review => (
                    <div key={review.id} className="review-card">
                      <div className="review-header">
                        <h4>{review.studentName}</h4>
                        <div className="review-rating">
                          {"⭐".repeat(review.rating)}{review.rating < 5 ? "☆" : ""}
                        </div>
                      </div>
                      <p className="review-date">📅 {review.date}</p>
                      <p className="review-text">"{review.reviewText}"</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <p>No reviews yet. Start accepting bookings to build your reviews!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
