import React, { Component } from "react";
import "./SelfAssessment.css";

export default class SelfAssessment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          q: "Over the past two weeks, how often have you felt little interest or pleasure in doing things?",
          options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 }
          ],
          answer: ""
        },
        {
          q: "Over the past two weeks, how often have you felt down, depressed, or hopeless?",
          options: [
            { text: "Not at all", score: 0 },
            { text: "Several days", score: 1 },
            { text: "More than half the days", score: 2 },
            { text: "Nearly every day", score: 3 }
          ],
          answer: ""
        },
        {
          q: "How often do you have trouble falling or staying asleep, or sleeping too much?",
          options: [
            { text: "Not at all", score: 0 },
            { text: "Several days a week", score: 1 },
            { text: "Several days a week", score: 2 },
            { text: "Nearly every day", score: 3 }
          ],
          answer: ""
        },
        {
          q: "How often do you feel tired or have little energy?",
          options: [
            { text: "Rarely", score: 0 },
            { text: "Sometimes", score: 1 },
            { text: "Often", score: 2 },
            { text: "Almost always", score: 3 }
          ],
          answer: ""
        },
        {
          q: "How often do you have trouble concentrating on things?",
          options: [
            { text: "Not at all", score: 0 },
            { text: "Occasionally", score: 1 },
            { text: "Frequently", score: 2 },
            { text: "Very frequently", score: 3 }
          ],
          answer: ""
        },
        {
          q: "In the past month, how often have you felt anxious or worried?",
          options: [
            { text: "Not at all", score: 0 },
            { text: "A few times", score: 1 },
            { text: "Several times a week", score: 2 },
            { text: "Daily", score: 3 }
          ],
          answer: ""
        },
        {
          q: "How often do you feel overwhelmed by stress?",
          options: [
            { text: "Rarely or not at all", score: 0 },
            { text: "Sometimes", score: 1 },
            { text: "Often", score: 2 },
            { text: "Most of the time", score: 3 }
          ],
          answer: ""
        },
        {
          q: "How would you rate your current social connections?",
          options: [
            { text: "Strong and supportive", score: 0 },
            { text: "Good but could improve", score: 1 },
            { text: "Limited or strained", score: 2 },
            { text: "Very isolated", score: 3 }
          ],
          answer: ""
        },
        {
          q: "How satisfied are you with your day-to-day life?",
          options: [
            { text: "Very satisfied", score: 0 },
            { text: "Somewhat satisfied", score: 1 },
            { text: "Somewhat unsatisfied", score: 2 },
            { text: "Very unsatisfied", score: 3 }
          ],
          answer: ""
        },
        {
          q: "How often do you engage in physical activity (exercise, sports, etc.)?",
          options: [
            { text: "5+ days per week", score: 0 },
            { text: "3-4 days per week", score: 1 },
            { text: "1-2 days per week", score: 2 },
            { text: "Rarely or never", score: 3 }
          ],
          answer: ""
        }
      ],
      showReport: false,
      report: "",
      totalScore: 0,
      recommendations: []
    };
  }

  handleOptionSelect(qIndex, option) {
    const questions = [...this.state.questions];
    questions[qIndex].answer = option.text;
    this.setState({ questions });
  }

  submitAssessment() {
    const { questions } = this.state;
    let totalScore = 0;

    // Calculate total score
    questions.forEach((q, idx) => {
      const selectedOption = q.options.find(opt => opt.text === q.answer);
      if (selectedOption) {
        totalScore += selectedOption.score;
      }
    });

    let report = "";
    let recommendations = [];

    if (totalScore >= 0 && totalScore <= 4) {
      report = "✅ You appear to be in good mental health! Continue maintaining your healthy habits and self-care practices.";
      recommendations = [
        "✓ Maintain your current exercise routine",
        "✓ Keep a strong support network",
        "✓ Practice regular mindfulness or meditation",
        "✓ Continue healthy sleep habits"
      ];
    } else if (totalScore >= 5 && totalScore <= 9) {
      report = "⚠️ You show some signs of mild stress or mood changes. Consider reaching out to friends or therapists for support.";
      recommendations = [
        "💡 Consider booking a therapy session",
        "💡 Increase physical activity gradually",
        "💡 Practice stress-relief techniques like deep breathing",
        "💡 Ensure adequate sleep and rest",
        "💡 Join a support group to connect with others"
      ];
    } else if (totalScore >= 10 && totalScore <= 14) {
      report = "🟡 You may be experiencing moderate levels of depression or anxiety. Professional support is strongly recommended.";
      recommendations = [
        "🔴 Schedule a session with a licensed therapist",
        "🔴 Consider talking to a healthcare provider",
        "🔴 Join our support groups for peer support",
        "🔴 Practice daily mindfulness exercises",
        "🔴 Maintain a consistent sleep schedule",
        "🔴 Limit caffeine and alcohol intake"
      ];
    } else {
      report = "🔴 You appear to be experiencing significant challenges with depression or anxiety. Professional mental health support is essential.";
      recommendations = [
        "🚨 Please reach out to a mental health professional immediately",
        "🚨 Contact a crisis helpline if you need immediate support",
        "🚨 Reach out to trusted friends or family members",
        "🚨 Schedule an urgent therapy appointment",
        "🚨 Consider consulting a psychiatrist for evaluation"
      ];
    }

    this.setState({ showReport: true, report, totalScore, recommendations });
    
    // Save assessment to localStorage
    const user = JSON.parse(localStorage.getItem("authUser") || "{}");
    if (user.email) {
      const userKey = user.role === 'student' ? `student_${user.email}` : `therapist_${user.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || "{}");
      userData.assessmentScores = { score: totalScore, date: new Date().toLocaleDateString() };
      localStorage.setItem(userKey, JSON.stringify(userData));
    }
  }

  render() {
    const { questions, showReport, report, totalScore, recommendations } = this.state;
    const allAnswered = questions.every(q => q.answer !== "");

    return (
      <div className="assessment-page">
        <div className="assessment-header">
          <h1>🧠 Mental Health Self-Assessment</h1>
          <p>This assessment helps evaluate your current mental and emotional well-being.</p>
          <p className="disclaimer">📌 Note: This is not a medical diagnosis. Please consult a mental health professional for accurate assessment.</p>
        </div>

        {!showReport && (
          <div className="questions-container">
            {questions.map((q, i) => (
              <div key={i} className="question-card">
                <div className="question-header">
                  <h3 className="question-text">{q.q}</h3>
                  <span className="question-number">{i + 1}/{questions.length}</span>
                </div>
                <div className="options-container">
                  {q.options.map((opt, j) => (
                    <button
                      key={j}
                      className={`option ${q.answer === opt.text ? "selected" : ""}`}
                      onClick={() => this.handleOptionSelect(i, opt)}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button 
              className="submit-btn" 
              onClick={() => this.submitAssessment()}
              disabled={!allAnswered}
            >
              {allAnswered ? "Submit Assessment" : "Please answer all questions"}
            </button>
          </div>
        )}

        {showReport && (
          <div className="report-container">
            <div className={`report-card severity-${totalScore >= 15 ? 'critical' : totalScore >= 10 ? 'high' : totalScore >= 5 ? 'medium' : 'low'}`}>
              <div className="score-display">
                <p className="score-label">Your Assessment Score</p>
                <p className="score-value">{totalScore}/30</p>
              </div>
              <h2>Assessment Results</h2>
              <p className="report-text">{report}</p>
              
              <div className="recommendations-section">
                <h3>Recommended Next Steps:</h3>
                <ul className="recommendations-list">
                  {recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>

              <div className="action-buttons">
                <button className="btn-therapy" onClick={() => window.location.href = '/therapy-sessions'}>
                  📅 Book Therapy Session
                </button>
                <button className="btn-mindfulness" onClick={() => window.location.href = '/mindfulness'}>
                  🧘 Try Mindfulness
                </button>
                <button className="btn-support" onClick={() => window.location.href = '/support-groups'}>
                  👥 Join Support Group
                </button>
                <button className="btn-retake" onClick={() => window.location.reload()}>
                  🔄 Retake Assessment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}