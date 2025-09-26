import React from 'react';
import type { Stock } from '../types';
import { NewsIcon } from './icons';

interface StockListItemProps {
  stock: Stock;
  day: number;
  onSelect: (stock: Stock) => void;
}

const StockListItem: React.FC<StockListItemProps> = ({ stock, day, onSelect }) => {
  const currentPrice = stock.priceHistory[day - 1];
  const prevPrice = day > 1 ? stock.priceHistory[day - 2] : currentPrice;
  const change = currentPrice - prevPrice;
  const changeRate = prevPrice > 0 ? (change / prevPrice) * 100 : 0;
  
  const changeColor = change === 0 ? 'text-gray-500' : change > 0 ? 'text-red-600' : 'text-blue-600';
  const changeIcon = change === 0 ? '-' : change > 0 ? '▲' : '▼';

  const formatCurrency = (amount: number) => new Intl.NumberFormat('ko-KR').format(amount);

  const hasNewsToday = stock.news.some(n => n.day === day - 1);

  return (
    <tr className="border-b border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors duration-200" onClick={() => onSelect(stock)}>
      <td className="px-2 py-3 sm:px-3">
        <div className="flex items-center gap-2">
            <p className="font-bold text-gray-800 text-sm sm:text-base">{stock.name}</p>
            {hasNewsToday && <NewsIcon />}
        </div>
        <p className="text-[11px] sm:text-xs text-gray-500">{stock.sector}</p>
      </td>
      <td className="px-2 py-3 sm:px-3 text-right font-semibold text-base sm:text-lg">{formatCurrency(currentPrice)}</td>
      <td className={`px-2 py-3 sm:px-3 text-right font-semibold ${changeColor}`}>
        <p className="text-sm">{changeIcon} {formatCurrency(Math.abs(change))}</p>
        <p className="text-xs sm:text-sm">({changeRate.toFixed(2)}%)</p>
      </td>
    </tr>
  );
};


interface StockListProps {
  stocks: Stock[];
  day: number;
  onStockSelect: (stock: Stock) => void;
}

const StockList: React.FC<StockListProps> = ({ stocks, day, onStockSelect }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800">주식 시장</h2>
      <div className="overflow-y-auto max-h-[60vh]">
        <table className="w-full text-left">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b-2 border-gray-300">
              <th className="px-2 py-3 sm:px-3 text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider">종목명</th>
              <th className="px-2 py-3 sm:px-3 text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider text-right">현재가</th>
              <th className="px-2 py-3 sm:px-3 text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider text-right">등락</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map(stock => (
              <StockListItem key={stock.code} stock={stock} day={day} onSelect={onStockSelect} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockList;