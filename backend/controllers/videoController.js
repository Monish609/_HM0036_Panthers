import Video from '../models/Video.js';

// Upload Video
export const uploadVideo = async (req, res) => {
  try {
    const { title, description, category, duration, createdBy, videoUrl } = req.body;

    // Check if either a file or videoUrl is provided
    if (!req.file && !videoUrl) {
      return res.status(400).json({ message: 'Either a video file or video URL is required' });
    }

    // Use the file path if a file is uploaded, otherwise use the provided videoUrl
    const finalVideoUrl = req.file ? `/uploads/videos/${req.file.filename}` : videoUrl;

    // Create a new video document
    const video = await Video.create({
      title,
      description,
      category,
      videoUrl: finalVideoUrl, // Use the file path or provided URL
      duration,
      createdBy,
    });

    res.status(201).json({ message: 'Video uploaded successfully', video });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading video', error: error.message });
  }
};

// Get All Videos
export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos', error: error.message });
  }
};