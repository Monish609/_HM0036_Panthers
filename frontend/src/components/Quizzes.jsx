import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('/api/quizzes');
        console.log('Backend Response:', response.data); // Debugging line

        // Ensure quizzes is always an array
        if (Array.isArray(response.data)) {
          setQuizzes(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
          setQuizzes([]); // Set to an empty array to avoid errors
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        setQuizzes([]); // Set to an empty array in case of an error
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="quizzes">
      <h2>Quizzes</h2>
      {quizzes.length > 0 ? (
        quizzes.map((quiz) => (
          <div key={quiz._id}>
            <h3>{quiz.title}</h3>
            <ul>
              {quiz.questions.map((question, index) => (
                <li key={index}>
                  <p>{question.question}</p>
                  <ul>
                    {question.options.map((option, i) => (
                      <li key={i}>{option}</li>
                    ))}
                  </ul>
                  <p>Correct Answer: {question.correctAnswer}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No quizzes available.</p>
      )}
    </div>
  );
};

export default Quizzes;