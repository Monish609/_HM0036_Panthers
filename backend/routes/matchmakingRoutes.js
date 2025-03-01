import express from 'express';
import { matchMentor } from '../controllers/matchmakingController.js';

const router = express.Router();

router.post('/', matchMentor);

export default router;