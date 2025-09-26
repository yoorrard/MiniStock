import React from 'react';
import type { Stock, PortfolioItem } from '../types';

interface PortfolioProps {
  portfolio: PortfolioItem[];
  stocks: Stock[];
  day: number;
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolio, stocks, day }) => {
  const formatCurrency = (amount: number) => new Intl.NumberFormat('ko-KR').format(amount);

  const portfolioDetails = portfolio
    .map(item => {
      const stock = stocks.find(s => s.code === item.stockCode);
      if (!stock) return null;
      const currentPrice = stock.priceHistory[day - 1];
      const currentValue = item.shares * currentPrice;
      const purchaseValue = item.shares * item.avgPurchasePrice;
      const profit = currentValue - purchaseValue;
      const profitRate = purchaseValue > 0 ? (profit / purchaseValue) * 100 : 0;
      return { ...item, stock, currentPrice, currentValue, purchaseValue, profit, profitRate };
    })
    .filter(Boolean);

  if (portfolioDetails.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg h-full">
        <h2 className="text-xl font-bold mb-4 text-gray-800">나의 포트폴리오</h2>
        <div className="flex flex-col items-center justify-center h-4/5 text-gray-500">
          <p>아직 보유한 주식이 없어요.</p>
          <p>관심 있는 주식을 매수해보세요!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full">
      <h2 className="text-xl font-bold mb-4 text-gray-800">나의 포트폴리오</h2>
      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
        {portfolioDetails.map(item => {
           if(!item) return null;
           const profitColor = item.profit >= 0 ? 'text-red-600' : 'text-blue-600';
           return (
            <div key={item.stockCode} className="p-3 bg-white rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md hover:border-blue-300">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-gray-800">{item.stock.name}</span>
                <span className="text-sm text-gray-500">{item.shares.toLocaleString()}주</span>
              </div>
              <div className="flex justify-between items-baseline mt-1">
                <div className="text-sm text-gray-600">
                  <p>평가 금액: {formatCurrency(Math.round(item.currentValue))}원</p>
                  <p>매입 금액: {formatCurrency(Math.round(item.purchaseValue))}원</p>
                </div>
                <div className={`text-right font-semibold ${profitColor}`}>
                  <p>{item.profit >= 0 ? '▲' : '▼'} {formatCurrency(Math.round(Math.abs(item.profit)))}원</p>
                  <p>({item.profitRate.toFixed(2)}%)</p>
                </div>
              </div>
            </div>
           )
        })}
      </div>
    </div>
  );
};

export default Portfolio;