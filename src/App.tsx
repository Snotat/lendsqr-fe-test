import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // 
import './App.scss';
import SignIn from './pages/Auth/SignIn';
import Dashboard from './pages/Dashboard/Dashboard';
import UserDetails from './components/UserDetails/UserDetails';
import User from './pages/User/User';

const App: React.FC = () => {
  return (
    <div className="App">
<Routes>
<Route path="/login" element={<SignIn />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/userdetails/:id" element={<User />} />
<Route path="/" element={<Navigate to="/login" replace />} />
<Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
};

export default App;
