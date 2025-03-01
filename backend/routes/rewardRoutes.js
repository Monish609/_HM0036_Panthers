import express from 'express';
import { addPoints, getUserRewards } from '../controllers/rewardController.js';

const router = express.Router();

router.post('/', addPoints);
router.get('/:userId', getUserRewards);

export default router;