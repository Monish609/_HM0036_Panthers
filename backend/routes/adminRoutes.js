import express from 'express';
import {
  getAllVideos,
  getAllUsers,
  deleteUser,
  updateUserRole,
  deleteVideo,
  approveOrRejectVideo,
    getVideosByApprovalStatus,
} from '../controllers/adminController.js';
import { protect, isAdmin } from '../utils/auth.js';

const router = express.Router();

// Video-related routes
router.get('/videos', protect, isAdmin, getAllVideos); // Get all videos
router.delete('/videos/:videoId', protect, isAdmin, deleteVideo); // Delete a video
router.put('/videos/:videoId/approve', protect, isAdmin, approveOrRejectVideo); 
router.get('/videos/status', protect, isAdmin, getVideosByApprovalStatus); // Get videos by approval status

// User-related routes
router.get('/users', protect, isAdmin, getAllUsers); // Get all users
router.delete('/users/:userId', protect, isAdmin, deleteUser); // Delete a user
router.put('/users/:userId/role', protect, isAdmin, updateUserRole); // Update user role

export default router;