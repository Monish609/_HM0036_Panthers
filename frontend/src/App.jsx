import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './components/Dashboard';
import Lessons from './components/Lessons';
import Quizzes from './components/Quizzes';
import Matchmaking from './components/Matchmaking';
import Rewards from './components/Rewards';
import NotFound from './pages/NotFound';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/matchmaking" element={<Matchmaking />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;