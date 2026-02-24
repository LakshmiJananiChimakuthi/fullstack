import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  const [activePage, setActivePage] = useState('home');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleServiceClick = (service) => {
    navigate(`/${service}`);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <div className="content-section">
            <div className="hero-banner">
              <h1>Your Journey to a Healthier Mind</h1>
              <p>Explore our resources and find the support you need, whenever you need it.</p>
            </div>
            <h2 className="section-title">Our Services</h2>
            <div className="services-grid">
              <div className="service-card-item" onClick={() => handleServiceClick('therapy-sessions')}>
                <div className="card-icon">🎯</div>
                <h3>Online Therapy</h3>
                <p>Connect with certified therapists from your home</p>
                <p className="contact"></p>
              </div>
              <div className="service-card-item" onClick={() => handleServiceClick('mindfulness')}>
                <div className="card-icon">🧘</div>
                <h3>Mindfulness Guides</h3>
                <p>Access guided meditations and exercises to calm your mind</p>
                <p className="contact"></p>
              </div>
              <div className="service-card-item" onClick={() => handleServiceClick('support-groups')}>
                <div className="card-icon">👥</div>
                <h3>Support Groups</h3>
                <p>Join anonymous groups and share your journey with others</p>
                <p className="contact"></p>
              </div>
              <div className="service-card-item" onClick={() => handleServiceClick('self-assessment')}>
                <div className="card-icon">📋</div>
                <h3>Self Assessments</h3>
                <p>Take confidential quizzes to understand your mental state</p>
                <p className="contact"></p>
              </div>
            </div>
          </div>
        );
      case 'services':
        return (
          <div className="content-section">
            <h2 className="section-title">Our Services</h2>
            <div className="services-grid">
              <div className="service-card-item" onClick={() => handleServiceClick('therapy-sessions')}>
                <div className="card-icon">🎯</div>
                <h3>Online Therapy</h3>
                <p>Connect with certified therapists from your home</p>
                <p className="contact">📞 +1-800-THERAPY-1</p>
              </div>
              <div className="service-card-item" onClick={() => handleServiceClick('mindfulness')}>
                <div className="card-icon">🧘</div>
                <h3>Mindfulness Guides</h3>
                <p>Access guided meditations and exercises to calm your mind</p>
                <p className="contact">📞 +1-800-MINDFUL-3</p>
              </div>
              <div className="service-card-item" onClick={() => handleServiceClick('support-groups')}>
                <div className="card-icon">👥</div>
                <h3>Support Groups</h3>
                <p>Join anonymous groups and share your journey with others</p>
                <p className="contact">📞 +1-800-SUPPORT-2</p>
              </div>
              <div className="service-card-item" onClick={() => handleServiceClick('self-assessment')}>
                <div className="card-icon">📋</div>
                <h3>Self Assessments</h3>
                <p>Take confidential quizzes to understand your mental state</p>
                <p className="contact">📞 +1-800-ASSESS-4</p>
              </div>
            </div>
          </div>
        );
      case 'articles':
        return (
          <div className="content-section">
            <h2 className="section-title">Mental Health Articles</h2>
            <article className="article-card">
              <h3>Understanding Mental Health</h3>
              <p>Mental health is a crucial aspect of our overall well-being. It encompasses our emotional, psychological, and social well-being. Unlike what many believe, mental health is not just the absence of mental illness. It's about developing healthy coping mechanisms, building strong relationships, and finding purpose in life. Taking care of your mental health is as important as taking care of your physical health.</p>
            </article>
            <article className="article-card">
              <h3>Breaking the Stigma Around Mental Illness</h3>
              <p>Many people struggle silently with mental health issues due to societal stigma. It's important to understand that mental illness is a medical condition, just like diabetes or heart disease. Seeking help is a sign of strength, not weakness. By openly discussing mental health and supporting those who are struggling, we can create a more compassionate society. Remember, you are not alone in your journey.</p>
            </article>
            <article className="article-card">
              <h3>Stress Management Techniques</h3>
              <p>Stress is a normal part of life, but chronic stress can negatively impact our mental and physical health. There are many effective stress management techniques you can practice daily: deep breathing exercises, regular physical activity, meditation, journaling, and spending time in nature. Even small changes like taking short breaks throughout the day or talking to someone you trust can significantly reduce stress levels and improve your overall well-being.</p>
            </article>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="nav-brand">MindCare Connect</div>
        <ul className="nav-links">
          <li>
            <button 
              className={activePage === 'home' ? 'active' : ''} 
              onClick={() => setActivePage('home')}
            >
              Home
            </button>
          </li>
          <li>
            <button 
              className={activePage === 'services' ? 'active' : ''} 
              onClick={() => setActivePage('services')}
            >
              Services
            </button>
          </li>
          <li>
            <button 
              className={activePage === 'articles' ? 'active' : ''} 
              onClick={() => setActivePage('articles')}
            >
              Articles
            </button>
          </li>
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}