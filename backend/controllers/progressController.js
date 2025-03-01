import User from '../models/User.js';

// Update Progress
export const updateProgress = async (req, res) => {
  const { videoId } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    const videoIndex = user.progress.findIndex((item) => item.videoId.toString() === videoId);

    if (videoIndex === -1) {
      user.progress.push({ videoId, watched: true });
    } else {
      user.progress[videoIndex].watched = true;
    }

    await user.save();
    res.status(200).json({ message: 'Progress updated successfully', progress: user.progress });
  } catch (error) {
    res.status(500).json({ message: 'Error updating progress', error: error.message });
  }
};

// Get User Progress
export const getUserProgress = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate('progress.videoId');
    res.status(200).json(user.progress);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching progress', error: error.message });
  }
};