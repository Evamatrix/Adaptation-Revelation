import { useState } from 'react';
import './CreateAccountPg2.css';
import { useNavigate } from 'react-router-dom';


export default function CreateAccountPg2() {
  const [form, setForm] = useState({
    nationality: '',
    languages: '',
    religion: '',
    interests: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="createaccount-container">
      <h1 className="createaccount-title">SELECT</h1>

      <div className="createaccount-section">
        {['nationality', 'languages', 'religion', 'interests'].map((field) => (
          <div key={field} style={{ marginBottom: '40px' }}>
            <label className="createaccount-label" style={{ textAlign: 'left' }}>
              {field.toUpperCase()}
            </label>
            <div className="createaccount-input-wrapper" style={{ margin: '10px auto 0 auto' }}>
              <input
                type="text"
                name={field}
                className="createaccount-input"
                placeholder={`enter ${field}`}
                value={form[field]}
                onChange={handleChange}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '400px' }}>
        <button className="createaccount-button">
          <span className="button-text">← BACK</span>
        </button>

        <div className="createaccount-button">
          <Buttons />
        </div>

      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', gap: '10px' }}>
        <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#D3D3D3' }}></span>
        <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#000' }}></span>
      </div>
    </div>
  );
}


/**
 *    <div>
          <button className="createaccount-button">
            <span className="button-text">FINISH</span>
          </button>
        </div>
 */

export function Buttons() {
  const navigate = useNavigate();

  //CHANGE AFTER ADDING NEXT PAGE
  const goFinish = () => {
    navigate('/profile');
  };

  return (
    <div>
      <button onClick={goFinish} className="createaccount-button" style={{ width: '100%', maxWidth: '400px' }}>
        <span className="button-text">FINISH</span>
      </button>
    </div>
  );
}

