import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard'; // Import AdminDashboard
import Lessons from './components/Lessons';
import Quizzes from './components/Quizzes';
import Matchmaking from './components/Matchmaking';
import Rewards from './components/Rewards';
import NotFound from './pages/NotFound';
import ProtectedRoute from './context/ProtectedRoute';
import './App.css';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <AuthProvider> {/* Wrap the entire app with AuthProvider */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/matchmaking" element={<Matchmaking />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;