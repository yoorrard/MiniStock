import React from 'react';

interface WelcomeScreenProps {
  playerName: string;
  onContinue: () => void;
  onStartNew: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ playerName, onContinue, onStartNew }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl w-full max-w-lg mx-auto text-center animate-fadeIn">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
          🚀 다시 오셨군요!
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-8 break-keep">
          <span className="font-bold">{playerName}</span>님, 지난번에 진행하던 게임 기록이 남아있어요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onContinue}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-full text-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            이어서 하기
          </button>
          <button
            onClick={onStartNew}
            className="w-full sm:w-auto bg-white border-2 border-gray-300 text-gray-700 font-bold py-4 px-8 rounded-full text-xl hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            새로 시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;