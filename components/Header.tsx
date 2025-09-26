import React from 'react';
import { WalletIcon, CashIcon, ChartBarIcon, BookIcon } from './icons';

interface HeaderProps {
  day: number;
  cash: number;
  stockValue: number;
  initialAssets: number;
  onShowGlossary: () => void;
}

const Header: React.FC<HeaderProps> = ({ day, cash, stockValue, initialAssets, onShowGlossary }) => {
  const totalAssets = cash + stockValue;
  const profit = totalAssets - initialAssets;
  const profitRate = initialAssets > 0 ? (profit / initialAssets) * 100 : 0;

  const formatCurrency = (amount: number) => new Intl.NumberFormat('ko-KR').format(amount);

  const profitColor = profit >= 0 ? 'text-red-600' : 'text-blue-600';

  return (
    <header className="bg-white shadow-lg p-4 sm:p-6 rounded-2xl mb-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 whitespace-nowrap">🚀 어린이 주식왕</h1>
        <div className="flex items-center gap-2 sm:gap-4">
            <button 
                onClick={onShowGlossary}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white bg-green-500 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-md"
                aria-label="용어 사전 열기"
            >
                <BookIcon />
                <span>용어 사전</span>
            </button>
            <div className="text-base sm:text-xl font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg" aria-live="polite">
              {day}일차
            </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 text-center">
        <div className="bg-white p-3 sm:p-4 rounded-xl border border-gray-200">
          <h2 className="text-xs sm:text-sm font-semibold text-gray-500 flex items-center justify-center gap-2"><CashIcon />현금</h2>
          <p className="text-xl sm:text-2xl font-bold text-gray-800">{formatCurrency(cash)}원</p>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-xl border border-gray-200">
          <h2 className="text-xs sm:text-sm font-semibold text-gray-500 flex items-center justify-center gap-2"><ChartBarIcon />주식 평가</h2>
          <p className="text-xl sm:text-2xl font-bold text-gray-800">{formatCurrency(Math.round(stockValue))}원</p>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-xl border border-gray-200">
          <h2 className="text-xs sm:text-sm font-semibold text-gray-500 flex items-center justify-center gap-2"><WalletIcon />총 자산</h2>
          <p className="text-xl sm:text-2xl font-bold text-gray-800">{formatCurrency(Math.round(totalAssets))}원</p>
          <p className={`text-xs sm:text-sm font-semibold ${profitColor}`}>
            {profit >= 0 ? '▲' : '▼'} {formatCurrency(Math.round(Math.abs(profit)))}원 ({profitRate.toFixed(2)}%)
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;