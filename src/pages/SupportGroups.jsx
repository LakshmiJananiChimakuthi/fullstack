import React, { Component } from "react";
import "./SupportGroups.css"; // separate CSS inside pages folder

export default class SupportGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        { text: "Feeling stressed before exams. Anyone else?", user: "Anonymous" }
      ],
      input: "",
      sentConfirmation: "",
      reviews: [
        {
          name: "Ananya S.",
          problem: "Severe anxiety before exams and personal pressure.",
          solution: "Through therapy sessions and mindfulness guides, I learned to calm my mind and organize my studies effectively.",
          helpOthers: "I now volunteer in peer support sessions to guide others through stress and anxiety.",
        },
        {
          name: "Rohan K.",
          problem: "Depression due to isolation and lack of motivation.",
          solution: "Therapy and joining support groups gave me connection and hope. I regained confidence and joy.",
          helpOthers: "I share my experiences and encourage new users to stay persistent in therapy.",
        },
        {
          name: "Sneha I.",
          problem: "Stress from managing multiple responsibilities and burnout.",
          solution: "Guided meditation and counseling sessions helped me set boundaries and prioritize wellness.",
          helpOthers: "I actively contribute tips and motivational messages to help newcomers feel supported.",
        }
      ],
      emergencyNumbers: [
        { country: "India", number: "022 2754 6669" },
        { country: "USA", number: "1-800-662-4357 (SAMHSA)" },
        { country: "UK", number: "116 123 (Samaritans)" },
        { country: "Canada", number: "1-833-456-4566" },
        { country: "Australia", number: "13 11 14 (Lifeline)" }
      ]
    };
  }

  sendMsg() {
    if (!this.state.input.trim()) return;

    const newMsg = {
      text: this.state.input + " 💌",
      user: "You"
    };

    this.setState(prevState => ({
      messages: [...prevState.messages, newMsg],
      input: "",
      sentConfirmation: "Your message has been sent! 🌸"
    }));

    // Remove confirmation after 2 seconds
    setTimeout(() => this.setState({ sentConfirmation: "" }), 2000);
  }

  render() {
    const { messages, input, reviews, emergencyNumbers, sentConfirmation } = this.state;

    return (
      <div className="support-page">
        {/* Hero Section */}
        <div className="hero-section">
          <h1>🤝 Student Support Groups</h1>
          <p>Share, learn, and grow together with guidance and encouragement.</p>
        </div>

        {/* Chat Section */}
        <h2 className="section-title">💬 Live Chat</h2>
        <div className="chat-box">
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.user === "You" ? "user-msg" : "anon-msg"}`}>
              <strong>{m.user}: </strong> {m.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Share your thoughts..."
            value={input}
            onChange={(e) => this.setState({ input: e.target.value })}
          />
          <button onClick={() => this.sendMsg()}>Send</button>
        </div>
        {sentConfirmation && <p className="sent-confirmation">{sentConfirmation}</p>}

        {/* Reviews Section */}
        <h2 className="section-title">🌟 Testimonials & Experiences</h2>
        <div className="reviews-container">
          {reviews.map((r, i) => (
            <div key={i} className="review-card">
              <h3>{r.name}</h3>
              <p><strong>Problem:</strong> {r.problem}</p>
              <p><strong>How therapy helped:</strong> {r.solution}</p>
              <p><strong>Helping others:</strong> {r.helpOthers}</p>
            </div>
          ))}
        </div>
        {/* Emergency Contacts Section */}
        <h2 className="section-title">🚨 Emergency Contacts</h2>
        <div className="emergency-container">
          {emergencyNumbers.map((e, i) => (
            <div key={i} className="emergency-card">
              <p><strong>{e.country}:</strong> {e.number}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}