import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleVerify = () => {
    if (email && email.includes('@') && email.includes('.edu')) {
      navigate('/verified', { state: { email } });
    } else {
      alert('Please enter a valid school email address');
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">sign up</h1>
      <label className="email-label">Enter school email:</label>
      <div className="email-input-wrapper">
        <input
          type="email"
          className="email-input"
          placeholder="name@school.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleVerify();
            }
          }}
        />
      </div>
      <button className="verify-button" onClick={handleVerify}>
        <span className="button-text">Verify</span>
      </button>
    </div>
  );
}
