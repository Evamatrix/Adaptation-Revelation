import { useState } from 'react';
import './SignUp.css';

export default function Welcome() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


  return (

    <div className="welcome-container">
      <h1 className="welcome-title">Welcome!</h1>
      <label className="first-name-label">First Name:</label>
      <div className="first-name-input-wrapper">
        <input
          type="first-name"
          className="first-name-input"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <label className="last-name-label">Last Name:</label>

      <div className="last-name-input-wrapper">
        <input
          type="last-name"
          className="last-name-input"
          placeholder="Last Name"
          value={lastName}
          onChange={(o) => setLastName(e.target.value)}
        />
      </div>
      
    </div>
  );
}
