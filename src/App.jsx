import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import UserVerified from './components/UserVerified';
import AccountPage1 from './components/AccountPage1';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/verified" element={<UserVerified />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/create-account" element={<AccountPage1 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
