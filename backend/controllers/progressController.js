import User from '../models/User.js';
import jwt from 'jsonwebtoken';
// Update Progress for Authenticated User
export const updateProgress = async (req, res) => {
  const { videoId } = req.body; // videoId is passed in the request body
  const userId = req.user._id; // userId is obtained from the authenticated user

  console.log('Updating progress for user:', userId); // Log the userId

  try {
    // Find the user by userId and update their progress
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { progress: { videoId, watched: true } }, // Add videoId if it doesn't exist
      },
      { new: true } // Return the updated document
    ).populate('progress.videoId');

    if (!user) {
      console.error('User not found with ID:', userId); // Log the error
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Progress updated successfully', progress: user.progress });
  } catch (error) {
    console.error('Error updating progress:', error); // Log the error
    res.status(500).json({ message: 'Error updating progress', error: error.message });
  }
};

// Get Progress for Authenticated User
export const getUserProgress = async (req, res) => {
  let token;

  // Check if the token exists in cookies
  if (req.cookies.token) {
    token = req.cookies.token;
  }

  // If no token is found in cookies
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId; // Extract userId from the decoded token

    // Find the user by userId and populate the video details
    const user = await User.findById(userId).populate('progress.videoId').lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user's progress
    res.status(200).json(user.progress);
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ message: 'Error fetching progress', error: error.message });
  }
};