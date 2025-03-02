import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [username, setUsername] = useState(''); // Store the username
  const navigate = useNavigate();

  // Check if the user is logged in on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Fetch the authentication status from the server
        const response = await axios.get('/api/users/check-auth', { withCredentials: true });
        if (response.data.isAuthenticated) {
          setIsLoggedIn(true);
          setUsername(response.data.username || 'User');
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
      }
    };

    checkAuthStatus();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post('/api/users/logout', {}, { withCredentials: true }); // Clear the cookie
      setIsLoggedIn(false); // Update login status
      setUsername(''); // Clear the username
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">EDUTECH</Link>
      </div>
      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/lessons">Lessons</Link>
        <Link to="/quizzes">Quizzes</Link>
        <Link to="/matchmaking">Matchmaking</Link>
        <Link to="/rewards">Rewards</Link>
        {isLoggedIn ? (
          <div className="account-dropdown">
            <div className="account-toggle">
              <img
                src="https://via.placeholder.com/30" // Replace with the user's profile picture
                alt="Profile"
                className="profile-logo"
              />
              <span>{username}</span>
            </div>
            <div className="dropdown-content">
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;