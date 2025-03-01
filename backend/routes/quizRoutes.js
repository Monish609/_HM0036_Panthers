import express from 'express';
import {
  createQuiz,
  getQuizByVideoId,
  getAllQuizzes,
} from '../controllers/quizController.js';

const router = express.Router();

// Create a new quiz
router.post('/', createQuiz);

// Get a quiz by video ID
router.get('/:videoId', getQuizByVideoId);

// Get all quizzes
router.get('/', getAllQuizzes);

export default router;