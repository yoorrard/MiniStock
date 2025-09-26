import React from 'react';

interface StockChartProps {
  priceHistory: number[];
  avgPurchasePrice?: number;
}

const StockChart: React.FC<StockChartProps> = ({ priceHistory, avgPurchasePrice }) => {
  const width = 500;
  const height = 180;
  const padding = { top: 20, right: 20, bottom: 20, left: 55 };

  if (priceHistory.length < 2) {
    return <div className="flex items-center justify-center h-full text-gray-500">주가 데이터가 부족하여 차트를 표시할 수 없습니다.</div>;
  }

  const validPrices = priceHistory.filter(p => p !== undefined && p !== null);
  const relevantPrices = avgPurchasePrice ? [...validPrices, avgPurchasePrice] : validPrices;

  const maxPrice = Math.max(...relevantPrices);
  const minPrice = Math.min(...relevantPrices);
  
  const priceRange = maxPrice - minPrice === 0 ? 1 : maxPrice - minPrice;
  
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const getX = (index: number) => (index / (priceHistory.length - 1)) * chartWidth + padding.left;
  const getY = (price: number) => height - ((price - minPrice) / priceRange) * chartHeight - padding.bottom;

  const pathData = priceHistory.map((price, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(price)}`).join(' ');

  const avgPriceY = avgPurchasePrice ? getY(avgPurchasePrice) : null;
  
  const lastPrice = priceHistory[priceHistory.length - 1];
  const firstPrice = priceHistory[0];
  const strokeColor = lastPrice >= firstPrice ? '#ef4444' : '#3b82f6';
  
  const numHorizontalGridLines = 4;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Grid lines and labels */}
      <g className="grid-lines" stroke="#e5e7eb" strokeWidth="1">
        {Array.from({ length: numHorizontalGridLines + 1 }).map((_, i) => {
          const price = minPrice + (priceRange / numHorizontalGridLines) * i;
          const y = getY(price);
          return (
            <g key={`h-grid-${i}`} className="text-xs">
              <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} />
              <text x={padding.left - 8} y={y + 4} textAnchor="end" fontSize="12" fill="black" stroke="none">
                {(Math.round(price / 100) * 100).toLocaleString()}
              </text>
            </g>
          );
        })}
      </g>
      
      {/* Main price path */}
      <path d={pathData} fill="none" stroke={strokeColor} strokeWidth="2.5" />
      
      {/* Average purchase price line */}
      {avgPriceY !== null && (
        <g>
            <line
            x1={padding.left}
            y1={avgPriceY}
            x2={width - padding.right}
            y2={avgPriceY}
            stroke="#6b7280"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            />
            <text x={padding.left + 5} y={avgPriceY - 5} fill="#6b7280" fontSize="12" textAnchor="start" className="font-semibold">
                평단가
            </text>
        </g>
      )}
    </svg>
  );
};

export default StockChart;