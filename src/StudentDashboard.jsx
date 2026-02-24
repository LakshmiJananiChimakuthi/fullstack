import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStudentBookings } from "./bookingUtils.jsx";
import "./StudentDashboard.css";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [sessionCount, setSessionCount] = useState(0);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [pendingSessions, setPendingSessions] = useState([]);
  const [completedSessions, setCompletedSessions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  
  // Get user info from localStorage
  const userStr = localStorage.getItem("authUser");
  const user = userStr ? JSON.parse(userStr) : null;

  if (!user || user.role !== "student") {
    navigate("/login-student");
    return null;
  }

  const loadBookings = () => {
    // Load student's bookings
    const bookings = getStudentBookings(user.email);
    console.log('📚 Student fetched bookings:', bookings);
    const confirmed = bookings.filter(b => b.status === 'confirmed');
    const pending = bookings.filter(b => b.status === 'pending');
    const completed = bookings.filter(b => b.status === 'completed');
    
    console.log('✅ Confirmed bookings filtered:', confirmed);
    console.log('⏳ Pending bookings filtered:', pending);
    console.log('✔️ Completed bookings filtered:', completed);
    
    setUpcomingSessions(confirmed);
    setPendingSessions(pending);
    setCompletedSessions(completed);
    setSessionCount(confirmed.length + pending.length);
  };

  const handleManualRefresh = () => {
    setRefreshing(true);
    
    // Show refreshing state for better UX
    setTimeout(() => {
      // Load fresh data
      const bookings = getStudentBookings(user.email);
      const confirmed = bookings.filter(b => b.status === 'confirmed');
      const pending = bookings.filter(b => b.status === 'pending');
      const completed = bookings.filter(b => b.status === 'completed');
      
      setUpcomingSessions(confirmed);
      setPendingSessions(pending);
      setCompletedSessions(completed);
      setSessionCount(confirmed.length + pending.length);
      setRefreshing(false);
      
      // Show success feedback with current counts
      alert(`✅ Refreshed successfully!\n\nPending: ${pending.length}\nConfirmed: ${confirmed.length}\nCompleted: ${completed.length}`);
    }, 500);
  };

  useEffect(() => {
    // Load bookings immediately
    loadBookings();

    // Set up auto-refresh every 1 second to catch doctor confirmations
    const interval = setInterval(() => {
      loadBookings();
    }, 1000);

    return () => clearInterval(interval);
  }, [user.email]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("authUser");
      navigate("/");
    }
  };

  const navigateToService = (route) => {
    navigate(route);
  };

  return (
    <div className="student-dashboard">
      {/* Sidebar Navigation */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>ZenFlow</h2>
          <p className="user-name">👋 {user.name}</p>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === "home" ? "active" : ""}`}
            onClick={() => setActiveTab("home")}
          >
            🏠 Home
          </button>
          <button 
            className={`nav-item ${activeTab === "services" ? "active" : ""}`}
            onClick={() => setActiveTab("services")}
          >
            🛠️ Services
          </button>
          <button 
            className={`nav-item ${activeTab === "articles" ? "active" : ""}`}
            onClick={() => setActiveTab("articles")}
          >
            📚 Articles
          </button>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {activeTab === "home" && (
          <div className="content-section">
            <div className="home-header">
              <div>
                <h1>Welcome, {user.name}! 👋</h1>
                <p className="welcome-message">
                  Your mental health matters. Explore our services to find the support you need.
                </p>
              </div>
              <button className="refresh-btn" onClick={handleManualRefresh} disabled={refreshing}>
                {refreshing ? "🔄 Refreshing..." : "🔄 Refresh"}
              </button>
            </div>

            <div className="quick-stats">
              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <h3>Upcoming Sessions</h3>
                <p className="stat-number">{sessionCount}</p>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <h3>Therapists Followed</h3>
                <p className="stat-number">3</p>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🎯</div>
                <h3>Assessments Taken</h3>
                <p className="stat-number">1</p>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💪</div>
                <h3>Mindfulness Sessions</h3>
                <p className="stat-number">5</p>
              </div>
            </div>

            {/* Booked Sessions Section */}
            <div className="booked-sessions-section">
              <h2>📅 Your Booked Sessions</h2>
              
              {pendingSessions.length > 0 && (
                <div className="sessions-category">
                  <h3>⏳ Pending Confirmation ({pendingSessions.length})</h3>
                  <div className="sessions-list">
                    {pendingSessions.map(session => (
                      <div key={session.id} className="session-card pending">
                        <div className="session-header">
                          <h4>Dr. {session.doctorName}</h4>
                          <span className="session-status pending">Pending</span>
                        </div>
                        <p className="session-detail">📅 {session.date}</p>
                        <p className="session-detail">🕐 {session.time}</p>
                        <p className="session-note">Waiting for therapist confirmation...</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {upcomingSessions.length > 0 && (
                <div className="sessions-category">
                  <h3>✅ Confirmed Sessions ({upcomingSessions.length})</h3>
                  <div className="sessions-list">
                    {upcomingSessions.map(session => (
                      <div key={session.id} className="session-card confirmed">
                        <div className="session-header">
                          <h4>Dr. {session.doctorName}</h4>
                          <span className="session-status confirmed">Confirmed</span>
                        </div>
                        <p className="session-detail">📅 {session.date}</p>
                        <p className="session-detail">🕐 {session.time}</p>
                        {session.meetLink ? (
                          <div className="meeting-link-box">
                            <p className="meeting-label">🎥 Meeting Link:</p>
                            <a href={session.meetLink} target="_blank" rel="noopener noreferrer" className="meeting-link">
                              {session.meetLink}
                            </a>
                            <button 
                              className="copy-link-btn"
                              onClick={() => {
                                navigator.clipboard.writeText(session.meetLink);
                                alert('Link copied to clipboard!');
                              }}
                            >
                              📋 Copy Link
                            </button>
                          </div>
                        ) : (
                          <div className="meeting-link-box waiting">
                            <p className="meeting-label">🎥 Meeting Link:</p>
                            <p className="waiting-text">Link will be generated soon...</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {completedSessions.length > 0 && (
                <div className="sessions-category">
                  <h3>✔️ Completed Sessions ({completedSessions.length})</h3>
                  <div className="sessions-list">
                    {completedSessions.map(session => (
                      <div key={session.id} className="session-card completed">
                        <div className="session-header">
                          <h4>Dr. {session.doctorName}</h4>
                          <span className="session-status completed">Completed</span>
                        </div>
                        <p className="session-detail">📅 {session.date}</p>
                        <p className="session-detail">🕐 {session.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {pendingSessions.length === 0 && upcomingSessions.length === 0 && completedSessions.length === 0 && (
                <div className="no-sessions">
                  <p>You haven't booked any sessions yet.</p>
                  <button className="book-now-btn" onClick={() => navigateToService('/therapy-sessions')}>
                    📅 Book Your First Session
                  </button>
                </div>
              )}
            </div>

            <div className="wellness-tips">
              <h2>Today's Wellness Tips</h2>
              <div className="tips-grid">
                <div className="tip-card">
                  <h4>💧 Stay Hydrated</h4>
                  <p>Drink at least 8 glasses of water daily for optimal brain function.</p>
                </div>
                <div className="tip-card">
                  <h4>🚶 Take a Walk</h4>
                  <p>A 15-minute walk can significantly improve your mood and reduce anxiety.</p>
                </div>
                <div className="tip-card">
                  <h4>😴 Sleep Well</h4>
                  <p>Aim for 7-9 hours of quality sleep to support mental health recovery.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "services" && (
          <div className="content-section">
            <h1>Our Services 🛠️</h1>
            <p>Explore various mental health and wellness services available to you:</p>

            <div className="services-grid">
              <div className="service-card clickable" onClick={() => navigateToService("/therapy-sessions")}>
                <div className="service-icon">👨‍⚕️</div>
                <h3>Online Therapy Booking</h3>
                <p>Book sessions with licensed therapists who specialize in various areas of mental health.</p>
                <ul>
                  <li>✓ 1-on-1 counseling sessions</li>
                  <li>✓ Video and audio calls</li>
                  <li>✓ Flexible scheduling</li>
                  <li>✓ Therapist ratings & reviews</li>
                </ul>
                <button className="service-btn">Book Now →</button>
              </div>

              <div className="service-card clickable" onClick={() => navigateToService("/mindfulness")}>
                <div className="service-icon">🧘</div>
                <h3>Mindfulness Guides</h3>
                <p>Access guided meditations and mindfulness exercises for everyday peace and clarity.</p>
                <ul>
                  <li>✓ Guided meditations</li>
                  <li>✓ Breathing exercises</li>
                  <li>✓ Yoga sessions</li>
                  <li>✓ Sleep stories</li>
                </ul>
                <button className="service-btn">Explore →</button>
              </div>

              <div className="service-card clickable" onClick={() => navigateToService("/support-groups")}>
                <div className="service-icon">👥</div>
                <h3>Support Groups</h3>
                <p>Connect with others who understand your challenges and share your experiences.</p>
                <ul>
                  <li>✓ Topic-based groups</li>
                  <li>✓ Peer support</li>
                  <li>✓ Community forums</li>
                  <li>✓ Weekly discussions</li>
                </ul>
                <button className="service-btn">Join →</button>
              </div>

              <div className="service-card clickable" onClick={() => navigateToService("/self-assessment")}>
                <div className="service-icon">📋</div>
                <h3>Self Assessment</h3>
                <p>Evaluate your mental health status with our scientifically-backed assessment tools.</p>
                <ul>
                  <li>✓ Mental health screening</li>
                  <li>✓ Anxiety assessment</li>
                  <li>✓ Depression evaluation</li>
                  <li>✓ Detailed reports</li>
                </ul>
                <button className="service-btn">Start →</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "articles" && (
          <div className="content-section">
            <h1>Articles & Resources 📚</h1>
            <p>Read helpful articles to improve your mental health and well-being:</p>

            <div className="articles-grid">
              <article className="article-card">
                <div className="article-category">Mental Health</div>
                <h3>Understanding Anxiety: Signs and Coping Strategies</h3>
                <p>Learn to identify anxiety symptoms and discover practical techniques to manage them effectively.</p>
                <div className="article-meta">5 min read • By Dr. Sarah</div>
              </article>

              <article className="article-card">
                <div className="article-category">Wellness</div>
                <h3>The Power of Mindfulness in Daily Life</h3>
                <p>Explore how mindfulness practices can transform your everyday experiences and improve well-being.</p>
                <div className="article-meta">7 min read • By Dr. John</div>
              </article>

              <article className="article-card">
                <div className="article-category">Relationships</div>
                <h3>Building Healthy Relationships</h3>
                <p>Discover the foundations of healthy relationships and communication techniques for deeper connections.</p>
                <div className="article-meta">6 min read • By Dr. Emma</div>
              </article>

              <article className="article-card">
                <div className="article-category">Sleep</div>
                <h3>Improving Sleep Quality for Better Mental Health</h3>
                <p>Get practical tips to improve your sleep hygiene and understand its impact on mental health.</p>
                <div className="article-meta">5 min read • By Dr. Mike</div>
              </article>

              <article className="article-card">
                <div className="article-category">Stress Management</div>
                <h3>Stress Management Techniques That Work</h3>
                <p>Learn proven stress management strategies you can implement today for immediate relief.</p>
                <div className="article-meta">8 min read • By Dr. Lisa</div>
              </article>

              <article className="article-card">
                <div className="article-category">Self-Care</div>
                <h3>Creating Your Self-Care Routine</h3>
                <p>Discover how to build a sustainable self-care routine that fits your lifestyle and needs.</p>
                <div className="article-meta">6 min read • By Dr. Priya</div>
              </article>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
