import Video from '../models/Video.js';
import User from '../models/User.js';

// Get all videos (admin only)
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate('createdBy', 'username');
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos', error: error.message });
  }
};

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Delete a user (admin only)
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

// Update user role (admin only)
export const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(userId, { role }, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User role updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role', error: error.message });
  }
};

// Delete a video (admin only)
export const deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findByIdAndDelete(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting video', error: error.message });
  }
};

export const approveOrRejectVideo = async (req, res) => {
    try {
      const { videoId } = req.params;
      const { isApproved } = req.body; // Expecting a boolean value (true/false)
  
      // Find the video and update its `isApproved` field
      const video = await Video.findByIdAndUpdate(
        videoId,
        { isApproved },
        { new: true }
      ).populate('createdBy', 'username');
  
      if (!video) {
        return res.status(404).json({ message: 'Video not found' });
      }
  
      res.status(200).json({
        message: `Video ${isApproved ? 'approved' : 'rejected'} successfully`,
        video,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating video status', error: error.message });
    }
  };

  // Get videos by approval status (admin only)
export const getVideosByApprovalStatus = async (req, res) => {
    try {
      const { isApproved } = req.query; // Expecting a query parameter (true/false)
  
      const videos = await Video.find({ isApproved }).populate('createdBy', 'username');
      res.status(200).json(videos);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching videos', error: error.message });
    }
  };