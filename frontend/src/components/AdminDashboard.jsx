import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  // Fetch all videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('/api/admin/videos', {
          withCredentials: true, // Include cookies in the request
        });
        setVideos(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError('Failed to fetch videos. Please try again.');
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);


  // Handle approval/rejection
  const handleApprove = async (videoId, isApproved) => {
    try {
      const response = await axios.put(
        `/api/admin/videos/${videoId}/approve`,
        { isApproved },
        { withCredentials: true }
      );

      // Update the video's approval status in the state
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === videoId ? { ...video, isApproved } : video
        )
      );
      
      console.log(response.data.message); // Log success message
    } catch (error) {
      console.error('Error updating video:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Created By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video._id}>
              <td>{video.title}</td>
              <td>{video.description}</td>
              <td>{video.createdBy.username}</td>
              <td>{video.isApproved ? 'Approved' : 'Pending'}</td>
              <td>
                {!video.isApproved && (
                  <button onClick={() => handleApprove(video._id, true)}>
                    Approve
                  </button>
                )}
                {video.isApproved && (
                  <button onClick={() => handleApprove(video._id, false)}>
                    Reject
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;