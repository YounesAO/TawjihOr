'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import questionsData from '../../public/question.json';

const QcmApp = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(new Array(questionsData.questions.length).fill(''));
  const router = useRouter();

  const handleOptionChange = (e) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questionsData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const serializedAnswers = encodeURIComponent(JSON.stringify(answers));
      router.push(`/result?answers=${serializedAnswers}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary via-accent to-light p-4">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg border border-gray-200 animate-fadeIn">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-secondary mb-2">Question {currentQuestionIndex + 1}</h2>
          <p className="text-lg text-secondary">{questionsData.questions[currentQuestionIndex].question}</p>
        </div>
        <div className="mb-8">
          {questionsData.questions[currentQuestionIndex].options.map((option, index) => (
            <label key={index} className="flex items-center mb-4">
              <input
                type="radio"
                name="option"
                value={option}
                checked={answers[currentQuestionIndex] === option}
                onChange={handleOptionChange}
                className="form-radio h-5 w-5 text-accent border-gray-300 focus:border-accent focus:ring focus:ring-opacity-50 mr-4"
              />
              <span className="text-secondary text-lg">{option}</span>
            </label>
          ))}
        </div>
        <button
          onClick={handleNext}
          className="w-full py-3 px-4 bg-accent text-white font-semibold rounded-lg shadow-md hover:bg-highlight transition-colors duration-300"
        >
          {currentQuestionIndex < questionsData.questions.length - 1 ? 'Suivant' : 'Voir les résultats'}
        </button>
      </div>
    </div>
  );
};

export default QcmApp;
