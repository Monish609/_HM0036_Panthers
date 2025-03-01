import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';

const Rewards = () => {
  const { user } = useAuth();
  const [rewards, setRewards] = useState(null);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/rewards/${user._id}`);
        setRewards(response.data);
      } catch (error) {
        console.error('Error fetching rewards:', error);
      }
    };

    if (user) {
      fetchRewards();
    }
  }, [user]);

  return (
    <div className='rewards'>
      <h2>Your Rewards</h2>
      {rewards ? (
        <div>
          <p>Points: {rewards.points}</p>
          <p>Badges: {rewards.badges.join(', ')}</p>
        </div>
      ) : (
        <p>No rewards found</p>
      )}
    </div>
  );
};

export default Rewards;