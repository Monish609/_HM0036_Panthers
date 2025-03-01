import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">SKYWINGS</Link>
      </div>
      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/lessons">Lessons</Link>
        <Link to="/quizzes">Quizzes</Link>
        <Link to="/matchmaking">Matchmaking</Link>
        <Link to="/rewards">Rewards</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;