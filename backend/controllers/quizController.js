import Quiz from '../models/Quiz.js';

// Create Quiz
export const createQuiz = async (req, res) => {
  const { title, questions, videoId } = req.body;

  try {
    // Validate input
    if (!title || !questions || !videoId) {
      return res.status(400).json({ message: 'Title, questions, and videoId are required' });
    }

    // Create the quiz
    const quiz = await Quiz.create({ title, questions, videoId });
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Error creating quiz', error: error.message });
  }
};

// Get Quiz by Video ID
export const getQuizByVideoId = async (req, res) => {
  const { videoId } = req.params;

  try {
    // Find the quiz by videoId
    const quiz = await Quiz.findOne({ videoId });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quiz', error: error.message });
  }
};

// Get All Quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    // Fetch all quizzes
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quizzes', error: error.message });
  }
};