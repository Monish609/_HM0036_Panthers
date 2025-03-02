import express from 'express';
import { updateProgress, getUserProgress } from '../controllers/progressController.js';
import {protect} from '../utils/auth.js'; // Import the protect middleware

const router = express.Router();

// Update Progress for Authenticated User
router.post('/update', protect, updateProgress); // Requires authentication

// Get Progress for Authenticated User
router.get('/', protect, getUserProgress); // Requires authentication

export default router;