import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userProgress, setUserProgress] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get('/api/progress');
        setUserProgress(response.data);
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };

    fetchProgress();
  }, []);

  return (
    <div className="dashboard">
      <h2>Your Progress</h2>
      {userProgress.map((item) => (
        <div key={item.videoId._id}>
          <h3>{item.videoId.title}</h3>
          <p>{item.watched ? 'Watched' : 'Not Watched'}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;