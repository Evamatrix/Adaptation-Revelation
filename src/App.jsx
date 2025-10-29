import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import UserVerified from './components/UserVerified';
import CreateAccountPg2 from './components/CreateAccountPg2';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/verified" element={<UserVerified />} />
          <Route path="/create-account" element={<CreateAccountPg2 />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
