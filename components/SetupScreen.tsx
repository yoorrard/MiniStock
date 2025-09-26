import React, { useState } from 'react';

interface SetupScreenProps {
  onStartGame: (name: string, initialCash: number, days: number) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStartGame }) => {
  const [playerName, setPlayerName] = useState('');
  const [simulationDays, setSimulationDays] = useState(30);
  const [initialCash, setInitialCash] = useState(10000000);
  const [hasAgreed, setHasAgreed] = useState(false);
  
  const cashOptions = [1000000, 5000000, 10000000, 50000000, 100000000];
  const formatCurrency = (amount: number) => new Intl.NumberFormat('ko-KR').format(amount);

  const isFormValid = playerName.trim().length > 0 && simulationDays >= 5 && simulationDays <= 365;
  const isStartable = isFormValid && hasAgreed;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans p-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl w-full max-w-2xl mx-auto animate-fadeIn">
        <div className="text-center animate-slideInUp" style={{ animationDelay: '100ms' }}>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">🚀 어린이 주식왕</h1>
            <p className="text-gray-600 text-sm sm:text-base mb-8">모의 투자 게임에 오신 것을 환영합니다!</p>
        </div>
        
        <div className="space-y-6">
            <div className="animate-slideInUp" style={{ animationDelay: '200ms' }}>
                <label htmlFor="playerName" className="text-base sm:text-lg font-semibold text-gray-800 mb-2 block">이름을 입력하세요.</label>
                <input 
                    id="playerName"
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="예: 홍길동"
                    className="w-full p-2 text-base sm:p-3 sm:text-lg border-2 border-gray-200 rounded-lg transition-shadow duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:shadow-lg"
                />
            </div>
            <div className="animate-slideInUp" style={{ animationDelay: '300ms' }}>
                <label htmlFor="simulationDays" className="text-base sm:text-lg font-semibold text-gray-800 mb-2 block">활동일수를 선택하세요. (5일 ~ 365일)</label>
                <input 
                    id="simulationDays"
                    type="number"
                    value={simulationDays}
                    onChange={(e) => setSimulationDays(parseInt(e.target.value, 10))}
                    min="5"
                    max="365"
                    className="w-full p-2 text-base sm:p-3 sm:text-lg border-2 border-gray-200 rounded-lg transition-shadow duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:shadow-lg"
                />
            </div>
             <div className="animate-slideInUp" style={{ animationDelay: '400ms' }}>
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">시작 자본금을 선택하세요.</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                {cashOptions.map(amount => (
                    <button
                    key={amount}
                    onClick={() => setInitialCash(amount)}
                    className={`p-2 sm:p-3 rounded-lg border-2 font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 ${
                        initialCash === amount 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-105' 
                        : 'bg-white text-gray-800 border-gray-300 hover:border-blue-500 hover:text-blue-600'
                    }`}
                    >
                    {formatCurrency(amount)}원
                    </button>
                ))}
                </div>
            </div>
        </div>

        <div className="mt-8 animate-slideInUp" style={{ animationDelay: '500ms' }}>
            <label htmlFor="agreement" className="flex items-start bg-gray-50 p-3 rounded-lg cursor-pointer">
                <div className="flex items-center h-5">
                    <input
                        id="agreement"
                        name="agreement"
                        type="checkbox"
                        checked={hasAgreed}
                        onChange={(e) => setHasAgreed(e.target.checked)}
                        className="sr-only peer"
                    />
                     <div className="w-4 h-4 border-2 rounded border-gray-300 peer-checked:bg-blue-600 peer-checked:border-blue-600 flex items-center justify-center transition-colors">
                        {hasAgreed && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                </div>
                <div className="ml-3 text-sm">
                    <span className="font-medium text-gray-700 text-xs sm:text-sm">
                        <p>본 시뮬레이션의 모든 주가 정보 및 뉴스는 학습을 위해 만들어진 가상의 것이며, 실제 시장 상황 및 정보와는 다릅니다.</p>
                    </span>
                </div>
            </label>
        </div>

        <div className="animate-slideInUp" style={{ animationDelay: '600ms' }}>
          <button
            onClick={() => onStartGame(playerName, initialCash, simulationDays)}
            disabled={!isStartable}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-full text-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mt-8 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none"
          >
            투자 시작하기!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupScreen;