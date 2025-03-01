import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Videos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/videos`);
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className='video'>
      <h2>Videos</h2>
      {videos.map((video) => (
        <div key={video._id}>
          <h3>{video.title}</h3>
          <p>{video.description}</p>
          <video src={video.videoUrl} controls width="400" />
        </div>
      ))}
    </div>
  );
};

export default Videos;