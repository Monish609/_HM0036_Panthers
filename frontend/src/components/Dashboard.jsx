import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userProgress, setUserProgress] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(''); // Add error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        // Check if the user is logged in (e.g., by checking localStorage for a token)
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Redirect to login if no token is found
          return;
        }

        // Fetch progress with the token in the headers
        const response = await axios.get('/api/progress', {
          withCredentials: true, // Include cookies in the request
        });

        setUserProgress(response.data); // Set the user's progress
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching progress:', error);
        setError('Failed to fetch progress. Please try again.'); // Set error message

        if (error.response && error.response.status === 401) {
          // If the token is invalid or expired, redirect to login
          navigate('/login');
        }
      }
    };

    fetchProgress();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (error) {
    return <div className="error">{error}</div>; // Show error message
  }

  return (
    <div className="dashboard">
      <h2>Your Progress</h2>
      {userProgress.length === 0 ? (
        <p>No progress found. Start watching videos to track your progress!</p>
      ) : (
        userProgress.map((item) => (
          <div key={item.videoId._id}>
            <h3>{item.videoId.title}</h3>
            <p>{item.watched ? 'Watched' : 'Not Watched'}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;