import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('/api/quizzes');
        console.log('Backend Response:', response.data);

        if (Array.isArray(response.data)) {
          setQuizzes(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
          setQuizzes([]);
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        setQuizzes([]);
      }
    };

    fetchQuizzes();
  }, []);

  const handleOptionSelect = (quizId, questionIndex, option) => {
    setAnswers((prev) => ({
      ...prev,
      [quizId]: {
        ...(prev[quizId] || {}),
        [questionIndex]: option,
      },
    }));
  };

  const checkAnswers = (quizId) => {
    const quiz = quizzes.find((q) => q._id === quizId);
    const userAnswers = answers[quizId] || {};

    const feedbackResult = quiz.questions.map((question, index) => {
      return question.correctAnswer === userAnswers[index];
    });

    setFeedback((prev) => ({
      ...prev,
      [quizId]: feedbackResult,
    }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-8">Quizzes</h2>
      {quizzes.length > 0 ? (
        quizzes.map((quiz) => (
          <div key={quiz._id} className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h3 className="text-2xl font-semibold mb-4">{quiz.title}</h3>
            {quiz.questions.map((question, qIndex) => (
              <div key={qIndex} className="mb-6">
                <p className="text-lg font-medium mb-3">{question.question}</p>
                <div className="space-y-2">
                  {question.options.map((option, oIndex) => (
                    <label key={oIndex} className="block cursor-pointer">
                      <input
                        type="radio"
                        name={`q-${quiz._id}-${qIndex}`}
                        value={option}
                        checked={answers[quiz._id]?.[qIndex] === option}
                        onChange={() => handleOptionSelect(quiz._id, qIndex, option)}
                        className="hidden"
                      />
                      <div
                        className={`p-3 border rounded-lg transition-colors ${
                          feedback[quiz._id]?.[qIndex] !== undefined
                            ? option === question.correctAnswer
                              ? 'bg-green-200 border-green-500'
                              : answers[quiz._id]?.[qIndex] === option
                              ? 'bg-red-200 border-red-500'
                              : 'border-gray-300'
                            : 'hover:bg-gray-200'
                        }`}
                      >
                        {option}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={() => checkAnswers(quiz._id)}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Submit Answers
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-center">No quizzes available.</p>
      )}
    </div>
  );
};

export default Quizzes;