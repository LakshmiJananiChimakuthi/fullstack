import React, { Component } from "react";
import "./TherapySessions.css"; // separate CSS in pages folder

export default class TherapySessions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      therapists: [
        {
          name: "Dr. Priya Sharma",
          age: 36,
          phone: "+91 9876543210",
          experience: "10 years",
          qualification: "Ph.D. in Clinical Psychology",
          graduation: "University of Delhi",
          specialization: "Anxiety & Stress Specialist",
          message: "Your mental well-being is my priority. Let's work together to overcome challenges."
        },
        {
          name: "Dr. Rohan Kumar",
          age: 40,
          phone: "+91 9123456780",
          experience: "12 years",
          qualification: "M.D. Psychiatry",
          graduation: "AIIMS, New Delhi",
          specialization: "Depression & Mood Disorders",
          message: "Together we can find ways to manage and heal emotional struggles."
        },
        {
          name: "Dr. Sneha Iyer",
          age: 34,
          phone: "+91 9988776655",
          experience: "8 years",
          qualification: "M.Sc. Counseling Psychology",
          graduation: "JNU, New Delhi",
          specialization: "Student Counseling Expert",
          message: "I am here to guide students to overcome stress and achieve their potential."
        }
      ]
    };
  }

  toggleSelect(index) {
    this.setState((prevState) => ({
      selected: prevState.selected === index ? null : index
    }));
  }

  bookSession(doctorName) {
    alert(`Session booked with ${doctorName}!`);
  }

  render() {
    const { selected, therapists } = this.state;

    return (
      <div className="therapy-page">
        {/* Hero Section */}
        <div className="hero-section">
          <h1>Book Your Therapy Session</h1>
          <p>Choose a certified therapist to guide you towards mental wellness.</p>
        </div>

        {/* Flexbox Grid */}
        <div className="therapist-container">
          {therapists.map((t, i) => (
            <div
              key={i}
              className={`therapist-card ${selected === i ? "expanded" : ""}`}
              onClick={() => this.toggleSelect(i)}
            >
              <h2 className="doctor-name">{t.name}</h2>
              <p className="doctor-specialization">{t.specialization}</p>

              {selected === i && (
                <div className="doctor-details">
                  <p><strong>Age:</strong> {t.age}</p>
                  <p><strong>Phone:</strong> {t.phone}</p>
                  <p><strong>Experience:</strong> {t.experience}</p>
                  <p><strong>Qualification:</strong> {t.qualification}</p>
                  <p><strong>Graduated From:</strong> {t.graduation}</p>
                  <p><strong>Message:</strong> {t.message}</p>
                  <button
                    className="book-btn"
                    onClick={(e) => { e.stopPropagation(); this.bookSession(t.name); }}
                  >
                    Book Session
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}