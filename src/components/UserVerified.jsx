import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './UserVerified.css';

export default function UserVerified() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleEnter = () => {
    if (email && email.includes('@') && email.includes('.edu')) {
      // TODO: Navigate to create account screen once it's created
      navigate('/create-account', { state: { email } });
    } else {
      alert('Please enter a valid school email address');
    }
  };

  return (
    <div className="verified-container">
      <div className="check-icon">
        <div className="check-circle">
          <span className="check-mark">✓</span>
        </div>
      </div>
      <h1 className="verified-title">user verified</h1>
      <label className="signin-label">sign in:</label>
      <div className="email-input-wrapper">
        <input
          type="email"
          className="email-input"
          placeholder="name@school.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleEnter();
            }
          }}
        />
      </div>
      <button className="enter-button" onClick={handleEnter}>
        <span className="button-text">Enter</span>
      </button>
    </div>
  );
}