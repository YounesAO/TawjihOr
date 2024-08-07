'use client';
import { useRouter } from 'next/navigation';
import questionsData from '../../public/question.json';

export async function getServerSideProps(context) {
  const { query } = context;
  const answersParam = query.answers || '[]';
  const parsedAnswers = JSON.parse(decodeURIComponent(answersParam));

  const deductions = questionsData.deductions.fields;
  let resultField = '';

  for (const deduction of deductions) {
    let match = true;
    for (const criterion of deduction.criteria) {
      if (parsedAnswers[criterion.questionIndex] !== criterion.answer) {
        match = false;
        break;
      }
    }
    if (match) {
      resultField = deduction.field;
      break;
    }
  }

  return {
    props: {
      resultField,
    },
  };
}

export default function Result({ resultField }) {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary via-accent to-light p-6">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg border border-gray-200 animate-fadeIn">
        <div className="text-center flex flex-col items-center">
          <img
            src="/img/logo.png"
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
}
