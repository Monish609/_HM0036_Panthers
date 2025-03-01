import Video from '../models/Video.js';

export const uploadVideo = async (req, res) => {
  const { title, description, category, duration } = req.body;
  const videoUrl = `/uploads/${req.file.filename}`; // Assuming Multer handles file uploads
  const createdBy = req.user._id; // User ID from the authenticated request

  try {
    const newVideo = new Video({
      title,
      description,
      category,
      videoUrl,
      duration,
      createdBy,
    });

    await newVideo.save();
    res.status(201).json({ message: 'Video uploaded successfully', video: newVideo });
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