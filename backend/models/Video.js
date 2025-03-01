import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, // Duration in seconds
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false, // Videos need to be approved by admins
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Video = mongoose.model('Video', videoSchema);

export default Video;