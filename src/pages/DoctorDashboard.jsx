import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "./DoctorDashboard.css";
import { getDoctorBookings, updateBookingStatus, generateGoogleMeetLink, getDoctorCompletedSessions, saveCompletedSession } from "../bookingUtils.jsx";

export default class DoctorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Doctor information (loaded from localStorage)
      doctorInfo: null,
      isAuthenticated: false,
      // Availability status
      isAvailable: true,
      // Booked sessions
      bookedSessions: [],
      // Pending session requests
      pendingRequests: [],
      // Previous/completed sessions
      previousSessions: []
    };
  }

  componentDidMount() {
    // Check authentication
    const authData = localStorage.getItem('doctorAuth');
    
    if (authData) {
      const parsed = JSON.parse(authData);
      const doctorInfo = {
        name: parsed.doctorName,
        email: parsed.doctorEmail,
        specialization: this.getDoctorSpecialization(parsed.doctorId)
      };
      
      this.setState({
        isAuthenticated: true,
        doctorInfo
      });
      
      // Load bookings for this doctor
      this.loadDoctorBookings(doctorInfo.email);
    }
  }

  loadDoctorBookings = (doctorEmail) => {
    const bookings = getDoctorBookings(doctorEmail);
    const pendingRequests = bookings.filter(b => b.status === 'pending');
    const bookedSessions = bookings.filter(b => b.status === 'confirmed');
    const previousSessions = getDoctorCompletedSessions(doctorEmail);
    
    this.setState({
      pendingRequests,
      bookedSessions,
      previousSessions
    });
  };

  getDoctorSpecialization(doctorId) {
    const specializations = {
      1: "Anxiety & Stress Specialist",
      2: "Depression & Mood Disorders",
      3: "Student Counseling Expert"
    };
    return specializations[doctorId] || "Mental Health Specialist";
  }

  handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('doctorAuth');
      this.setState({ isAuthenticated: false });
    }
  };

  toggleAvailability = () => {
    this.setState((prevState) => ({
      isAvailable: !prevState.isAvailable
    }), () => {
      const status = this.state.isAvailable ? "Available" : "Busy";
      alert(`Status updated to: ${status}`);
    });
  };

  confirmBooking = (requestId) => {
    const { doctorInfo } = this.state;
    const meetLink = generateGoogleMeetLink();
    
    // Update booking status in localStorage
    const updatedBooking = updateBookingStatus(requestId, 'confirmed', meetLink);
    
    if (updatedBooking) {
      // Send email notification (in production, this would call backend API)
      this.sendEmailNotification(
        doctorInfo.email,
        updatedBooking.patientEmail,
        updatedBooking
      );

      // Reload bookings
      this.loadDoctorBookings(doctorInfo.email);

      alert(`Session confirmed! Email sent to both parties with Google Meet link.`);
    }
  };

  sendEmailNotification = (doctorEmail, patientEmail, sessionDetails) => {
    // This would be an API call to your backend in production
    const emailData = {
      to: [doctorEmail, patientEmail],
      subject: "Therapy Session Confirmed",
      body: `
        Session Details:
        Date: ${sessionDetails.date}
        Time: ${sessionDetails.time}
        Patient: ${sessionDetails.patientName}
        Doctor: ${this.state.doctorInfo.name}
        
        Google Meet Link: ${sessionDetails.meetLink}
        
        Please join the session at the scheduled time.
      `
    };

    console.log("Email notification sent:", emailData);
    // In production: fetch('/api/send-email', { method: 'POST', body: JSON.stringify(emailData) });
  };

  rejectBooking = (requestId) => {
    const { doctorInfo } = this.state;
    updateBookingStatus(requestId, 'rejected');
    this.loadDoctorBookings(doctorInfo.email);
    alert("Booking request rejected.");
  };

  cancelSession = (sessionId) => {
    if (window.confirm("Are you sure you want to cancel this session?")) {
      const { doctorInfo } = this.state;
      updateBookingStatus(sessionId, 'cancelled');
      this.loadDoctorBookings(doctorInfo.email);
      alert("Session cancelled. Notification sent to patient.");
    }
  };

  markSessionCompleted = (session) => {
    if (window.confirm("Mark this session as completed?")) {
      const { doctorInfo } = this.state;
      
      // Save to completed sessions
      saveCompletedSession({
        ...session,
        doctorName: doctorInfo.name,
        doctorEmail: doctorInfo.email
      });
      
      // Update booking status
      updateBookingStatus(session.id, 'completed');
      
      // Reload bookings
      this.loadDoctorBookings(doctorInfo.email);
      
      alert("Session marked as completed!");
    }
  };

  render() {
    const { doctorInfo, isAvailable, bookedSessions, pendingRequests, previousSessions, isAuthenticated } = this.state;

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      return <Navigate to="/doctor-login" replace />;
    }

    // Show loading if doctor info not yet loaded
    if (!doctorInfo) {
      return (
        <div className="doctor-dashboard">
          <div className="loading-screen">
            <p>Loading dashboard...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="doctor-dashboard">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-content">
            <div>
              <h1>Doctor Dashboard</h1>
              <div className="doctor-info">
                <h2>{doctorInfo.name}</h2>
                <p>{doctorInfo.specialization}</p>
                <p className="doctor-email">{doctorInfo.email}</p>
              </div>
            </div>
            <button className="logout-btn" onClick={this.handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="availability-section">
          <h3>Availability Status</h3>
          <div className="availability-toggle">
            <button
              className={`availability-btn ${isAvailable ? "available" : "busy"}`}
              onClick={this.toggleAvailability}
            >
              <span className="status-indicator"></span>
              {isAvailable ? "Available" : "Busy"}
            </button>
            <p className="availability-text">
              {isAvailable 
                ? "You are currently accepting new session bookings" 
                : "You are not accepting new bookings right now"
              }
            </p>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="section pending-section">
          <div className="section-header">
            <h3>Pending Booking Requests</h3>
            <span className="badge">{pendingRequests.length}</span>
          </div>
          
          {pendingRequests.length === 0 ? (
            <div className="empty-state">
              <p>No pending requests</p>
            </div>
          ) : (
            <div className="requests-list">
              {pendingRequests.map((request) => (
                <div key={request.id} className="request-card">
                  <div className="request-info">
                    <h4>{request.patientName}</h4>
                    <p>Email: {request.patientEmail}</p>
                    <p>Date: {request.date}</p>
                    <p>Time: {request.time}</p>
                  </div>
                  <div className="request-actions">
                    <button
                      className="confirm-btn"
                      onClick={() => this.confirmBooking(request.id)}
                    >
                      Confirm & Send Link
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => this.rejectBooking(request.id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Confirmed Sessions */}
        <div className="section confirmed-section">
          <div className="section-header">
            <h3>Confirmed Sessions</h3>
            <span className="badge">{bookedSessions.length}</span>
          </div>
          
          {bookedSessions.length === 0 ? (
            <div className="empty-state">
              <p>No confirmed sessions yet</p>
            </div>
          ) : (
            <div className="sessions-list">
              {bookedSessions.map((session) => (
                <div key={session.id} className="session-card">
                  <div className="session-info">
                    <h4>{session.patientName}</h4>
                    <p>Email: {session.patientEmail}</p>
                    <p>Date: {session.date}</p>
                    <p>Time: {session.time}</p>
                    <div className="meet-link-section">
                      <p><strong>Google Meet Link:</strong></p>
                      <a
                        href={session.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="meet-link"
                      >
                        {session.meetLink}
                      </a>
                      <button
                        className="copy-btn"
                        onClick={() => {
                          navigator.clipboard.writeText(session.meetLink);
                          alert("Link copied to clipboard!");
                        }}
                      >
                        Copy Link
                      </button>
                    </div>
                  </div>
                  <div className="session-actions">
                    <button
                      className="completed-btn"
                      onClick={() => this.markSessionCompleted(session)}
                    >
                      Mark as Completed
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => this.cancelSession(session.id)}
                    >
                      Cancel Session
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Previous/Completed Sessions */}
        <div className="section previous-section">
          <div className="section-header">
            <h3>Previous Sessions</h3>
            <span className="badge">{previousSessions.length}</span>
          </div>
          
          {previousSessions.length === 0 ? (
            <div className="empty-state">
              <p>No previous sessions</p>
            </div>
          ) : (
            <div className="previous-sessions-list">
              {previousSessions.map((session) => (
                <div key={session.id} className="previous-session-card">
                  <div className="previous-session-info">
                    <h4>{session.patientName}</h4>
                    <p>Date: {session.date}</p>
                    <p>Time: {session.time}</p>
                    <p className="completed-at">Completed: {new Date(session.completedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="instructions-section">
          <h3>📧 Email Notification System</h3>
          <div className="instruction-box">
            <p><strong>When a session is confirmed:</strong></p>
            <ul>
              <li>Both doctor and patient receive email notifications</li>
              <li>Email includes Google Meet link for the session</li>
              <li>Session details (date, time, participants) are included</li>
              <li>Links are automatically generated and sent</li>
            </ul>
            <p className="note">
              <strong>Note:</strong> Email functionality requires backend API integration. 
              Currently showing console logs for demonstration.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
