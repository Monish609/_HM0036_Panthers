import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: String, required: true },
    },
  ],
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
});

export default mongoose.model('Quiz', quizSchema);