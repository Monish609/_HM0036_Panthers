import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    console.log('User updated:', user);
  }, [user]);

  // Function to clear all cookies
  const clearAllCookies = () => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
    console.log('All cookies cleared');
  };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/login`, { email, password });
      if (response.data && response.data.token) {
        setUser(response.data); // Set user data
        localStorage.setItem('user', JSON.stringify(response.data)); // Store user data in localStorage
        console.log('Login successful:', response.data);
        console.log('User data stored in localStorage:', response.data);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw the error for the calling component to handle
    }
  };

  // Logout function
  const logout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem('user'); // Remove user data from localStorage
    clearAllCookies(); // Clear all cookies
    console.log('User logged out and cookies cleared');
  };

  // Check for existing user on initial load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser); // Set user from localStorage
    }
    setLoading(false); // Set loading to false after checking
  }, []);

  // Provide context values
  return (
    <AuthContext.Provider value={{ user, login, logout, loading, clearAllCookies }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};