import Reward from '../models/Reward.js';

// Add Points
export const addPoints = async (req, res) => {
  const { userId, points } = req.body;

  try {
    let reward = await Reward.findOne({ userId });
    if (!reward) {
      reward = await Reward.create({ userId, points });
    } else {
      reward.points += points;
      await reward.save();
    }

    res.status(200).json({ message: 'Points added successfully', reward });
  } catch (error) {
    res.status(500).json({ message: 'Error adding points', error: error.message });
  }
};

// Get User Rewards
export const getUserRewards = async (req, res) => {
  const { userId } = req.params;

  try {
    const reward = await Reward.findOne({ userId });
    if (!reward) {
      return res.status(404).json({ message: 'Rewards not found' });
    }
    res.status(200).json(reward);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rewards', error: error.message });
  }
};