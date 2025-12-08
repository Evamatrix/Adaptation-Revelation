import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SignUp from '../../src/components/SignUp';
import './App.css';
import AccountPage1 from './components/AccountPage1';
import CreateAccountPg2 from './components/CreateAccountPg2';
import UserProfile from './components/UserProfile';
import UserVerified from './components/UserVerified';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/verified" element={<UserVerified />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/create-account" element={<AccountPage1 />} />
          <Route path="/create-account2" element={<CreateAccountPg2 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
