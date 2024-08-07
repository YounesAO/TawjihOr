'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import questionsData from '../../public/question.json';

const Result = () => {
  const searchParams = useSearchParams();
  const answersParam = searchParams.get('answers');
  const [resultField, setResultField] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (answersParam) {
      const parsedAnswers = JSON.parse(decodeURIComponent(answersParam));
      const deductions = questionsData.deductions.fields;

      for (const deduction of deductions) {
        let match = true;
        for (const criterion of deduction.criteria) {
          if (parsedAnswers[criterion.questionIndex] !== criterion.answer) {
            match = false;
            break;
          }
        }
        if (match) {
          setResultField(deduction.field);
          break;
        }
      }
    }
  }, [answersParam]);

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary via-accent to-light p-6">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg border border-gray-200 animate-fadeIn">
      <div className="text-center flex flex-col items-center">
        <img
          src="/img/logo.png" // Replace with the actual path to your logo
          alt="Logo"
          className="w-40 h-auto mb-6 animate-fadeIn"
        />
        </div>
        <h1 className="text-3xl font-bold text-secondary mb-4">Résultat</h1>
        
        {resultField ? (
          <p className="text-lg text-secondary">
            Votre champ recommandé est : <strong className="text-accent">{resultField}</strong>
          </p>
        ) : (
          <p className="text-lg text-secondary">Aucun champ ne correspond à vos réponses.</p>
        )}
        <button
          onClick={handleBack}
          className="mt-6 px-4 py-2 bg-accent text-white font-semibold rounded-lg shadow-md hover:bg-highlight transition-colors duration-300"
        >
          Recommencer
        </button>
      </div>
    </div>
  );
};

export default Result;
