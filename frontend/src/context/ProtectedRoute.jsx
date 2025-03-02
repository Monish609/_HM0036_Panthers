import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Get user and loading state

  console.log('User:', user); // Log the user object

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking auth
  }

  if (!user) {
    return <Navigate to="/login" />; // Redirect to login if user is not authenticated
  }

  if (user.role === 'admin') {
    return <AdminDashboard />; // Render AdminDashboard for admin users
  }

  return children; // Render the Dashboard for non-admin users
};

export default ProtectedRoute;