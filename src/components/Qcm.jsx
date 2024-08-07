'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import questionsData from '../../public/question.json';

const QcmApp = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(new Array(questionsData.questions.length).fill(''));
  const [error, setError] = useState(null); // State for error messages
  const router = useRouter();

  const handleOptionChange = (e) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(updatedAnswers);
    setError(null); // Clear error message when an answer is selected
  };

  const handleNext = () => {
    if (answers[currentQuestionIndex] === '') {
      setError('Veuillez répondre à la question avant de continuer.');
      return;
    }

    if (currentQuestionIndex < questionsData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const serializedAnswers = encodeURIComponent(JSON.stringify(answers));
      router.push(`/result?answers=${serializedAnswers}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f47391] via-[#f87523] to-[#76afba] p-4">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg border border-gray-200 animate-fadeIn">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#031d1c] mb-2">Question {currentQuestionIndex + 1}</h2>
          <p className="text-lg text-[#031d1c]">{questionsData.questions[currentQuestionIndex].question}</p>
        </div>
        <div className="mb-8">
          {questionsData.questions[currentQuestionIndex].options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center mb-4 p-2 rounded-lg cursor-pointer transition-colors duration-300 
              ${answers[currentQuestionIndex] === option ? 'bg-[#f87523] text-white' : 'bg-white text-[#031d1c]'} 
              ${answers[currentQuestionIndex] === '' ? 'hover:bg-[#f47391] hover:text-white' : 'hover:bg-[#f87523] hover:text-white'}`}
            >
              <input
                type="radio"
                name="option"
                value={option}
                checked={answers[currentQuestionIndex] === option}
                onChange={handleOptionChange}
                className="form-radio h-5 w-5 text-[#f87523] border-gray-300 focus:border-[#f87523] focus:ring focus:ring-opacity-50 mr-4"
              />
              <span className="text-lg">{option}</span>
            </label>
          ))}
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleNext}
          className="w-full py-3 px-4 bg-[#f87523] text-white font-semibold rounded-lg shadow-md hover:bg-[#f0732b] transition-colors duration-300"
        >
          {currentQuestionIndex < questionsData.questions.length - 1 ? 'Suivant' : 'Voir les résultats'}
        </button>
      </div>
    </div>
  );
};

export default QcmApp;
