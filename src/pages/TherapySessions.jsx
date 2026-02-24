import React, { Component } from "react";
import "./TherapySessions.css";
import { createBookingRequest, getAvailableTimeSlots, validateBookingData } from "../bookingUtils.jsx";

export default class TherapySessions extends Component {
  constructor(props) {
    super(props);
    
    // Get logged-in user from localStorage
    const userStr = localStorage.getItem("authUser");
    const user = userStr ? JSON.parse(userStr) : null;
    
    this.state = {
      user: user,
      selected: null,
      showBookingForm: false,
      showReviewForm: false,
      selectedDoctor: null,
      reviewingDoctor: null,
      bookingForm: {
        patientName: "",
        patientEmail: "",
        date: "",
        time: ""
      },
      reviewForm: {
        rating: 5,
        reviewText: ""
      },
      therapists: [
        {
          id: 1,
          name: "Dr. Priya Sharma",
          email: "priya.sharma@therapymail.com",
          age: 36,
          phone: "+91 9876543210",
          experience: "10 years",
          qualification: "Ph.D. in Clinical Psychology",
          graduation: "University of Delhi",
          specialization: "Anxiety & Stress Specialist",
          message: "Your mental well-being is my priority. Let's work together to overcome challenges.",
          isAvailable: true,
          rating: 4.8,
          totalReviews: 24,
          reviews: [
            { studentName: "Rahul K.", rating: 5, text: "Excellent therapist! Very compassionate and helpful." },
            { studentName: "Ananya M.", rating: 5, text: "Best therapy sessions I've had. Highly recommended!" },
            { studentName: "Vikram S.", rating: 4, text: "Good approach and great listening skills." }
          ]
        },
        {
          id: 2,
          name: "Dr. Rohan Kumar",
          email: "rohan.kumar@therapymail.com",
          age: 40,
          phone: "+91 9123456780",
          experience: "12 years",
          qualification: "M.D. Psychiatry",
          graduation: "AIIMS, New Delhi",
          specialization: "Depression & Mood Disorders",
          message: "Together we can find ways to manage and heal emotional struggles.",
          isAvailable: true,
          rating: 4.6,
          totalReviews: 18,
          reviews: [
            { studentName: "Akshita P.", rating: 5, text: "Very knowledgeable and patient. Helped me understand depression better." },
            { studentName: "Nikhil T.", rating: 4, text: "Professional and caring approach to treatment." }
          ]
        },
        {
          id: 3,
          name: "Dr. Sneha Iyer",
          email: "sneha.iyer@therapymail.com",
          age: 34,
          phone: "+91 9988776655",
          experience: "8 years",
          qualification: "M.Sc. Counseling Psychology",
          graduation: "JNU, New Delhi",
          specialization: "Student Counseling Expert",
          message: "I am here to guide students to overcome stress and achieve their potential.",
          isAvailable: false,
          rating: 4.7,
          totalReviews: 21,
          reviews: [
            { studentName: "Shreya D.", rating: 5, text: "Life-changing sessions! She understands student problems so well." },
            { studentName: "Arjun V.", rating: 5, text: "Very supportive and created a safe space for me to open up." }
          ]
        }
      ]
    };
  }

  componentDidMount() {
    // Load real-time availability from localStorage
    this.syncTherapistAvailability();
    
    // Set up auto-refresh every 3 seconds to keep availability updated
    this.availabilityInterval = setInterval(() => {
      this.syncTherapistAvailability();
    }, 3000);
  }

  componentWillUnmount() {
    // Clear interval on unmount
    if (this.availabilityInterval) {
      clearInterval(this.availabilityInterval);
    }
  }

  syncTherapistAvailability = () => {
    const { therapists } = this.state;
    
    // Update each therapist's availability from localStorage
    const updatedTherapists = therapists.map(therapist => {
      const therapistKey = `therapist_${therapist.email}`;
      const therapistData = JSON.parse(localStorage.getItem(therapistKey) || '{}');
      
      // If availability is stored in localStorage, use it; otherwise keep current state
      if (therapistData.availability !== undefined) {
        return { ...therapist, isAvailable: therapistData.availability };
      }
      return therapist;
    });
    
    // Only update state if availability actually changed
    const hasChanged = updatedTherapists.some((t, i) => 
      t.isAvailable !== therapists[i].isAvailable
    );
    
    if (hasChanged) {
      this.setState({ therapists: updatedTherapists });
      console.log('🔄 Therapist availability synchronized from localStorage');
    }
  };

  toggleSelect(index) {
    this.setState((prevState) => ({
      selected: prevState.selected === index ? null : index
    }));
  }

  bookSession(doctor) {
    const { user } = this.state;
    
    this.setState({
      showBookingForm: true,
      selectedDoctor: doctor,
      bookingForm: {
        patientName: user ? user.name : "",
        patientEmail: user ? user.email : "",
        date: "",
        time: ""
      }
    });
  }

  openReviewForm = (doctor) => {
    this.setState({
      showReviewForm: true,
      reviewingDoctor: doctor,
      reviewForm: {
        rating: 5,
        reviewText: ""
      }
    });
  };

  closeBookingForm = () => {
    this.setState({
      showBookingForm: false,
      selectedDoctor: null,
      bookingForm: {
        patientName: "",
        patientEmail: "",
        date: "",
        time: ""
      }
    });
  };

  closeReviewForm = () => {
    this.setState({
      showReviewForm: false,
      reviewingDoctor: null,
      reviewForm: {
        rating: 5,
        reviewText: ""
      }
    });
  };

  handleFormChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      bookingForm: {
        ...prevState.bookingForm,
        [name]: value
      }
    }));
  };

  handleReviewChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      reviewForm: {
        ...prevState.reviewForm,
        [name]: value
      }
    }));
  };

  submitBooking = async (e) => {
    e.preventDefault();
    const { bookingForm, selectedDoctor, user } = this.state;

    const validation = validateBookingData(bookingForm);
    if (!validation.isValid) {
      alert("Please fix the following errors:\n" + validation.errors.join("\n"));
      return;
    }

    const bookingData = {
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      doctorEmail: selectedDoctor.email,
      patientName: bookingForm.patientName,
      patientEmail: bookingForm.patientEmail,
      date: bookingForm.date,
      time: bookingForm.time
    };

    console.log('📝 Student creating booking:', {
      ...bookingData,
      loggedInUserEmail: user ? user.email : 'Not logged in',
      emailsMatch: user && user.email === bookingForm.patientEmail
    });

    try {
      const result = await createBookingRequest(bookingData);
      
      if (result.success) {
        alert(
          `✅ Booking Request Sent Successfully!\n\n` +
          `📧 Booking Details:\n` +
          `Doctor: Dr. ${selectedDoctor.name}\n` +
          `Your Email: ${bookingForm.patientEmail}\n` +
          `Date: ${bookingForm.date}\n` +
          `Time: ${bookingForm.time}\n\n` +
          `💡 What's Next?\n` +
          `• The doctor will review your request\n` +
          `• You'll receive a meeting link once confirmed\n` +
          `• Check your Student Dashboard for updates\n\n` +
          `⚡ Updates appear in real-time on your dashboard!`
        );
        this.closeBookingForm();
      } else {
        alert("Failed to send booking request. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  submitReview = (e) => {
    e.preventDefault();
    const { reviewForm, reviewingDoctor, therapists } = this.state;

    if (!reviewForm.reviewText.trim()) {
      alert("Please write a review first.");
      return;
    }

    // Update therapist with new review
    const updated = therapists.map(t => {
      if (t.id === reviewingDoctor.id) {
        const newReview = {
          studentName: "You",
          rating: parseInt(reviewForm.rating),
          text: reviewForm.reviewText
        };
        return {
          ...t,
          reviews: [newReview, ...t.reviews],
          totalReviews: t.totalReviews + 1,
          rating: ((t.rating * t.totalReviews + parseInt(reviewForm.rating)) / (t.totalReviews + 1)).toFixed(1)
        };
      }
      return t;
    });

    this.setState({ therapists: updated });
    alert("✅ Thank you for your review! It will help other students find the right therapist.");
    this.closeReviewForm();
  };

  renderStars = (rating) => {
    return "⭐".repeat(Math.floor(rating)) + (rating % 1 !== 0 ? "✨" : "");
  };

  render() {
    const { user, selected, therapists, showBookingForm, selectedDoctor, bookingForm, showReviewForm, reviewingDoctor, reviewForm } = this.state;
    const timeSlots = getAvailableTimeSlots();

    // Check if user is logged in
    if (!user) {
      return (
        <div className="therapy-page">
          <div className="hero-section">
            <h1>⚠️ Login Required</h1>
            <p>Please log in to your student account to book therapy sessions.</p>
            <button 
              onClick={() => window.location.href = '/login-student'} 
              style={{
                marginTop: '20px',
                padding: '12px 30px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Go to Login
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="therapy-page">
        {/* Hero Section */}
        <div className="hero-section">
          <h1>🩺 Book Your Therapy Session</h1>
          <p>Choose a certified therapist to guide you towards mental wellness.</p>
        </div>

        {/* Therapist Grid */}
        <div className="therapist-container">
          {therapists.map((t, i) => (
            <div
              key={i}
              className={`therapist-card ${selected === i ? "expanded" : ""}`}
              onClick={() => this.toggleSelect(i)}
            >
              <div className="card-header">
                <h2 className="doctor-name">{t.name}</h2>
                <div className={`availability-badge ${t.isAvailable ? 'available' : 'busy'}`}>
                  <span className="status-dot"></span>
                  {t.isAvailable ? '🟢 Available' : '🔴 Busy'}
                </div>
              </div>

              <p className="doctor-specialization">{t.specialization}</p>
              
              {/* Rating Display */}
              <div className="rating-section">
                <span className="rating-stars">{this.renderStars(t.rating)} {t.rating}</span>
                <span className="rating-count">({t.totalReviews} reviews)</span>
              </div>

              {selected === i && (
                <div className="doctor-details">
                  <div className="details-grid">
                    <p><strong>👤 Age:</strong> {t.age}</p>
                    <p><strong>📞 Phone:</strong> {t.phone}</p>
                    <p><strong>📚 Experience:</strong> {t.experience}</p>
                    <p><strong>🎓 Qualification:</strong> {t.qualification}</p>
                    <p><strong>🏫 Graduated From:</strong> {t.graduation}</p>
                  </div>
                  
                  <p className="message-section"><strong>💬 Message:</strong> {t.message}</p>

                  {/* Reviews Section */}
                  <div className="reviews-section">
                    <h4>📝 Student Reviews ({t.reviews.length})</h4>
                    <div className="reviews-list">
                      {t.reviews.slice(0, 2).map((review, idx) => (
                        <div key={idx} className="review-item">
                          <div className="review-header">
                            <span className="review-student">{review.studentName}</span>
                            <span className="review-rating">{"⭐".repeat(review.rating)}</span>
                          </div>
                          <p className="review-text">"{review.text}"</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="action-buttons">
                    <button
                      className={`book-btn ${!t.isAvailable ? 'disabled' : ''}`}
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        if (t.isAvailable) {
                          this.bookSession(t);
                        } else {
                          alert("This therapist is currently busy and not accepting bookings.");
                        }
                      }}
                      disabled={!t.isAvailable}
                    >
                      {t.isAvailable ? '📅 Book Session' : '❌ Not Available'}
                    </button>
                    <button
                      className="review-btn"
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        this.openReviewForm(t);
                      }}
                    >
                      ⭐ Write Review
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Booking Form Modal */}
        {showBookingForm && selectedDoctor && (
          <div className="modal-overlay" onClick={this.closeBookingForm}>
            <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal" onClick={this.closeBookingForm}>×</button>
              
              <h2>📅 Book Session with {selectedDoctor.name}</h2>
              <p className="modal-subtitle">{selectedDoctor.specialization}</p>
              
              <form onSubmit={this.submitBooking} className="booking-form">
                <div className="form-group">
                  <label htmlFor="patientName">Your Name *</label>
                  <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={bookingForm.patientName}
                    onChange={this.handleFormChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="patientEmail">Your Email *</label>
                  <input
                    type="email"
                    id="patientEmail"
                    name="patientEmail"
                    value={bookingForm.patientEmail}
                    onChange={this.handleFormChange}
                    placeholder="Enter your email address"
                    required
                    readOnly
                    style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                  />
                  <small>Meeting link will be sent to this email (from your logged-in account)</small>
                </div>

                <div className="form-group">
                  <label htmlFor="date">Preferred Date *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={bookingForm.date}
                    onChange={this.handleFormChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="time">Preferred Time *</label>
                  <select
                    id="time"
                    name="time"
                    value={bookingForm.time}
                    onChange={this.handleFormChange}
                    required
                  >
                    <option value="">Select a time slot</option>
                    {timeSlots.map((slot, index) => (
                      <option key={index} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                <div className="info-box">
                  <p><strong>📧 What happens next?</strong></p>
                  <ul>
                    <li>Your booking request will be sent to the therapist</li>
                    <li>The therapist will review and confirm your session</li>
                    <li>Both parties receive email confirmation with Zoom link</li>
                    <li>Session reminder 24 hours before the appointment</li>
                    <li>After session, you can leave a review</li>
                  </ul>
                </div>

                <div className="form-actions">
                  <button type="button" onClick={this.closeBookingForm} className="cancel-btn-form">
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn-form">
                    Send Booking Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Review Form Modal */}
        {showReviewForm && reviewingDoctor && (
          <div className="modal-overlay" onClick={this.closeReviewForm}>
            <div className="review-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal" onClick={this.closeReviewForm}>×</button>
              
              <h2>⭐ Review Your Session</h2>
              <p className="modal-subtitle">Share your experience with {reviewingDoctor.name}</p>
              
              <form onSubmit={this.submitReview} className="review-form">
                <div className="form-group">
                  <label htmlFor="rating">Rating *</label>
                  <select
                    id="rating"
                    name="rating"
                    value={reviewForm.rating}
                    onChange={this.handleReviewChange}
                  >
                    <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                    <option value="4">⭐⭐⭐⭐ Very Good</option>
                    <option value="3">⭐⭐⭐ Good</option>
                    <option value="2">⭐⭐ Fair</option>
                    <option value="1">⭐ Poor</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="reviewText">Your Review *</label>
                  <textarea
                    id="reviewText"
                    name="reviewText"
                    value={reviewForm.reviewText}
                    onChange={this.handleReviewChange}
                    placeholder="Share your experience with this therapist..."
                    rows="5"
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="button" onClick={this.closeReviewForm} className="cancel-btn-form">
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn-form">
                    ✅ Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}