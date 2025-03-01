import React, { useState } from 'react';
import axios from 'axios';

const Matchmaking = () => {
  const [mentor, setMentor] = useState(null);

  const handleMatch = async () => {
    try {
      const response = await axios.post('/api/matchmaking', {
        studentId: 'your-student-id', // Replace with actual student ID
      });
      setMentor(response.data.mentor);
    } catch (error) {
      console.error('Error matching mentor:', error);
    }
  };

  return (
    <div className="matchmaking">
      <h2>Find a Mentor</h2>
      <button onClick={handleMatch}>Match with a Mentor</button>
      {mentor && (
        <div>
          <h3>Matched Mentor</h3>
          <p>Name: {mentor.name}</p>
          <p>Expertise: {mentor.expertise}</p>
        </div>
      )}
    </div>
  );
};

export default Matchmaking;