import express from 'express';
import { uploadVideo, getVideos } from '../controllers/videoController.js';
import upload from '../utils/upload.js';

const router = express.Router();

// Upload Video
router.post('/upload', upload.single('video'), uploadVideo);

// Get All Videos
router.get('/', getVideos);

export default router;