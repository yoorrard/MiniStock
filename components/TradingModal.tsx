import React, { useState } from 'react';
import type { Stock, PortfolioItem, NewsEvent } from '../types';
import StockChart from './StockChart';

interface TradingModalProps {
  stock: Stock | null;
  day: number;
  cash: number;
  portfolioItem: PortfolioItem | undefined;
  onClose: () => void;
  onTrade: (stockCode: string, shares: number, price: number, type: 'buy' | 'sell') => void;
  onShowNews: (news: NewsEvent) => void;
}

const TradingModal: React.FC<TradingModalProps> = ({ stock, day, cash, portfolioItem, onClose, onTrade, onShowNews }) => {
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [shares, setShares] = useState(1);

  if (!stock) return null;

  const currentPrice = stock.priceHistory[day - 1];
  const sharesOwned = portfolioItem ? portfolioItem.shares : 0;
  const todaysNews = stock.news.find(n => n.day === day - 1);

  const maxBuyableShares = Math.floor(cash / currentPrice);
  const maxSellableShares = sharesOwned;

  const totalAmount = shares * currentPrice;

  const handleSharesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setShares(isNaN(value) || value < 1 ? 1 : value);
  };

  const incrementShares = () => setShares(prev => prev + 1);
  const decrementShares = () => setShares(prev => Math.max(1, prev - 1));

  const canBuy = totalAmount <= cash && shares > 0;
  const canSell = shares <= maxSellableShares && shares > 0;

  const handleSubmit = () => {
    if (tradeType === 'buy' && canBuy) {
      onTrade(stock!.code, shares, currentPrice, 'buy');
    } else if (tradeType === 'sell' && canSell) {
      onTrade(stock!.code, shares, currentPrice, 'sell');
    }
    onClose();
  };
  
  const formatCurrency = (amount: number) => new Intl.NumberFormat('ko-KR').format(amount);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative animate-fadeIn">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        
        <div className="text-center mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{stock.name}</h2>
            <p className="text-base text-gray-500">{stock.code}</p>
            <p className="text-2xl sm:text-3xl font-bold my-2">{formatCurrency(currentPrice)}원</p>
        </div>

        {todaysNews && (
            <div className="text-center mb-4">
                <button 
                    onClick={() => onShowNews(todaysNews)}
                    className="bg-yellow-100 text-yellow-800 font-bold py-1.5 px-3 text-xs sm:py-2 sm:px-4 sm:text-sm rounded-full hover:bg-yellow-200 transition"
                >
                    📰 오늘의 뉴스
                </button>
            </div>
        )}

        <div className="mb-4 h-40 sm:h-48">
          <StockChart 
            priceHistory={stock.priceHistory.slice(0, day)} 
            avgPurchasePrice={portfolioItem?.avgPurchasePrice} 
          />
        </div>

        <div className="flex justify-center mb-6">
          <div className="bg-gray-200 rounded-full p-1 flex">
            <button
              onClick={() => setTradeType('buy')}
              className={`px-4 py-1.5 sm:px-6 sm:py-2 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 ${tradeType === 'buy' ? 'bg-red-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-300'}`}
            >
              매수
            </button>
            <button
              onClick={() => setTradeType('sell')}
              className={`px-4 py-1.5 sm:px-6 sm:py-2 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 ${tradeType === 'sell' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-300'}`}
            >
              매도
            </button>
          </div>
        </div>

        <div className="space-y-4">
            <div className="text-sm text-center">
                {tradeType === 'buy' ? 
                 <p>보유 현금: {formatCurrency(cash)}원 (최대 {maxBuyableShares}주 매수 가능)</p> :
                 <p>보유 수량: {sharesOwned}주 (최대 {maxSellableShares}주 매도 가능)</p>
                }
            </div>

            <div className="flex items-center justify-center gap-2 sm:gap-4">
                <button onClick={decrementShares} className="bg-gray-200 h-10 w-10 sm:h-12 sm:w-12 rounded-full text-xl sm:text-2xl font-bold transition hover:bg-gray-300">-</button>
                <input 
                    type="number"
                    value={shares}
                    onChange={handleSharesChange}
                    className="w-24 sm:w-32 h-10 sm:h-12 text-center text-xl sm:text-2xl font-bold border-2 border-gray-300 rounded-lg transition-shadow duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:shadow-lg"
                />
                <button onClick={incrementShares} className="bg-gray-200 h-10 w-10 sm:h-12 sm:w-12 rounded-full text-xl sm:text-2xl font-bold transition hover:bg-gray-300">+</button>
            </div>

            <div className="text-center">
                <p className="text-gray-600 text-sm sm:text-base">총 {tradeType === 'buy' ? '매수' : '매도'} 금액</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">{formatCurrency(totalAmount)}원</p>
            </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            disabled={tradeType === 'buy' ? !canBuy : !canSell}
            className={`w-full py-3 sm:py-4 rounded-xl text-white font-bold text-lg sm:text-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:cursor-not-allowed ${
              tradeType === 'buy'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 disabled:from-gray-400 disabled:to-gray-500'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 disabled:from-gray-400 disabled:to-gray-500'
            }`}
          >
            {shares}주 {tradeType === 'buy' ? '매수' : '매도'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradingModal;