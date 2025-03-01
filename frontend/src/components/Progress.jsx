import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';

const Progress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/progress`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setProgress(response.data);
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };

    if (user) {
      fetchProgress();
    }
  }, [user]);

  return (
    <div>
      <h2>Your Progress</h2>
      {progress.map((item) => (
        <div key={item.videoId._id}>
          <h3>{item.videoId.title}</h3>
          <p>{item.watched ? 'Watched' : 'Not Watched'}</p>
        </div>
      ))}
    </div>
  );
};

export default Progress;