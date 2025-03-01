import express from 'express';
import { updateProgress, getUserProgress } from '../controllers/progressController.js';
import { protect } from '../utils/auth.js';

const router = express.Router();

router.post('/', protect, updateProgress);
router.get('/', protect, getUserProgress);

export default router;