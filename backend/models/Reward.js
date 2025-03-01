import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, default: 0 },
  badges: [{ type: String }],
});

export default mongoose.model('Reward', rewardSchema);