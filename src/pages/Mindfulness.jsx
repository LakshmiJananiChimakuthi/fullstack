import React, { Component } from "react";
import "./Mindfulness.css"; // separate CSS file inside pages folder

export default class Mindfulness extends Component {
  render() {
    return (
      <div className="mindfulness-page">
        {/* Hero Section */}
        <div className="hero-section">
          <h1>🌿 Mindfulness & Wellness</h1>
          <p>Tips, tricks, and resources to nurture your mind, body, and soul.</p>
        </div>

        {/* Mindfulness Section */}
        <h2 className="section-title">🧘 Mindfulness Tips</h2>
        <div className="tips-container">
          <div className="tip-card">
            <h3>Deep Breathing</h3>
            <p>Take 5–10 minutes daily to focus on your breath and calm your mind. 🌬️</p>
          </div>
          <div className="tip-card">
            <h3>Body Scan</h3>
            <p>Gently notice sensations from head to toe, releasing tension as you go. 🧘‍♀️</p>
          </div>
          <div className="tip-card">
            <h3>Gratitude Practice</h3>
            <p>Write down 3 things you are grateful for each day. 🌸</p>
          </div>
          <div className="tip-card">
            <h3>Mindful Walking</h3>
            <p>Walk slowly, notice surroundings, and focus on each step. 🚶‍♂️</p>
          </div>
        </div>

        {/* Mental Wellness Section */}
        <h2 className="section-title">🧠 Mental Wellness</h2>
        <div className="tips-container">
          <div className="tip-card">
            <h3>Journaling Thoughts</h3>
            <p>Write your feelings without judgment to release stress. ✍️</p>
          </div>
          <div className="tip-card">
            <h3>Digital Detox</h3>
            <p>Take short breaks from screens to refresh your mind. 📵</p>
          </div>
          <div className="tip-card">
            <h3>Positive Affirmations</h3>
            <p>Repeat gentle statements to yourself: "I am calm, I am enough." 💖</p>
          </div>
          <div className="tip-card">
            <h3>Nature Time</h3>
            <p>Spend moments outdoors noticing sights, sounds, and smells. 🍃</p>
          </div>
        </div>

        {/* Physical Wellness Section */}
        <h2 className="section-title">💪 Physical Wellness</h2>
        <div className="tips-container">
          <div className="tip-card">
            <h3>Stretching</h3>
            <p>Start your day with gentle stretches to energize your body. 🤸‍♂️</p>
          </div>
          <div className="tip-card">
            <h3>Balanced Diet</h3>
            <p>Eat nourishing foods, stay hydrated, and listen to your body. 🥗💧</p>
          </div>
          <div className="tip-card">
            <h3>Regular Sleep</h3>
            <p>Maintain a routine sleep schedule for better rest and recovery. 😴</p>
          </div>
          <div className="tip-card">
            <h3>Gentle Exercise</h3>
            <p>Yoga, walking, or swimming helps both body and mind. 🏊‍♀️🧘‍♂️</p>
          </div>
        </div>

        {/* Inspiring Quotes Section */}
        <h2 className="section-title">💌 Inspirational Quotes</h2>
        <div className="quotes-container">
          <p className="quote">
            "The mind is everything. What you think you become." <span>- Buddha</span>
          </p>
          <p className="quote">
            "Happiness is not something ready-made. It comes from your own actions." <span>- Dalai Lama</span>
          </p>
          <p className="quote">
            "It is not daily increase but daily decrease. Hack away at the unessential." <span>- Bruce Lee</span>
          </p>
          <p className="quote">
            "Almost everything will work again if you unplug it for a few minutes… including you." <span>- Anne Lamott</span>
          </p>
        </div>
      </div>
    );
  }
}