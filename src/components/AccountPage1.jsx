import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountPage1.css';

export default function Welcome() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome!</h1>
      <div className="first-name-container">
        <label className="first-name-label">FIRST NAME:</label>
        <div className="first-name-input-wrapper">
          <input
            type="first-name"
            className="first-name-input"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
      </div>

      <div className="last-name-container">
        <label className="last-name-label">LAST NAME:</label>

        <div className="last-name-input-wrapper">
          <input
            type="last-name"
            className="last-name-input"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div className="pronouns-container">

        <form className="pronoun-form">

          <label className="pronoun-label">Pronoun(s): </label><br></br>

          <div className="she-her-container">
            <input type="checkbox" id="she-her" name="she/her-pronoun" value="option1"></input>
            <label for="she-her" id="she-her-label">She/Her</label><br></br>
          </div>

          <div className="he-him-container">
            <input type="checkbox" id="he-him" name="he-him-pronoun" value="option2"></input>
            <label for="he-him" id="he-him-label">He/Him</label><br></br>
          </div>

          <div className="they-them-container">
            <input type="checkbox" id="they-them" name="they-them-pronoun" value="option3"></input>
            <label for="they-them" id="they-them-label">They/Them</label><br></br>
          </div>

          <div className="prefer-not-container">
            <input type="checkbox" id="prefer-not" name="prefer-not-option" value="option4"></input>
            <label for="prefer-not" id="prefer-not-label">Prefer Not To Say</label><br></br>
          </div>

          <div className="other-container">
            <label for="other" id="other-label">Other: </label>
            <input type="text" id="other" placeholder="i.e. N/A" name="other-option"></input>
          </div>

        </form>

        <div>
          <Buttons />
        </div>

      </div>

    </div>

  );
}

export function Buttons() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/verified');
  };

  //CHANGE AFTER ADDING NEXT PAGE
  const goNext = () => {
    navigate('/verified');
  };

  return (
    <div className="buttons">
      <div className="back-class">
        <button onClick={goBack} id="back-button">Back</button>
      </div>

      <div className="next-class">
        <button onClick={goNext} id="next-button">Next</button>
      </div>
    </div>
  );
}
