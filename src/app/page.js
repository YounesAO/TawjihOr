'use client';

import { useRouter } from 'next/navigation';

const WelcomePage = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/qcm'); // Adjust the route as needed
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary via-accent to-light p-6">
      <div className="text-center flex flex-col items-center">
        <img
          src="/img/logo.png" // Replace with the actual path to your logo
          alt="Logo"
          className="w-40 h-auto mb-6 animate-fadeIn"
        />
        <h1 className="text-4xl font-extrabold text-white mb-4 animate-fadeIn">Welcome to Our App</h1>
        <p className="text-lg text-white mb-8 animate-fadeIn">
          Discover our services and start exploring.
        </p>
        <button
          onClick={handleGetStarted}
          className="px-6 py-3 bg-accent text-white font-semibold rounded-lg shadow-lg hover:bg-highlight transition-colors duration-300 animate-fadeIn"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
