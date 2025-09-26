import React, { useState, useMemo, useCallback } from 'react';
import Header from './components/Header';
import StockList from './components/StockList';
import Portfolio from './components/Portfolio';
import TradingModal from './components/TradingModal';
import SetupScreen from './components/SetupScreen';
import GameEndScreen from './components/GameEndScreen';
import NewsModal from './components/NewsModal';
import { generateAllStockData } from './services/stockService';
import type { Stock, PortfolioItem, NewsEvent } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'finished'>('setup');
  const [day, setDay] = useState<number>(1);
  const [cash, setCash] = useState<number>(0);
  const [initialAssets, setInitialAssets] = useState<number>(0);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  
  const [playerName, setPlayerName] = useState<string>('');
  const [simulationDays, setSimulationDays] = useState<number>(0);
  const [stockData, setStockData] = useState<Stock[]>([]);
  const [activeNews, setActiveNews] = useState<NewsEvent | null>(null);


  const handleStartGame = useCallback((name: string, startCash: number, days: number) => {
    setPlayerName(name);
    setSimulationDays(days);
    setStockData(generateAllStockData(days));
    setCash(startCash);
    setInitialAssets(startCash);
    setPortfolio([]);
    setDay(1);
    setGameState('playing');
  }, []);

  const handleRestartGame = useCallback(() => {
    setGameState('setup');
  }, []);

  const stockValue = useMemo(() => {
    if (stockData.length === 0) return 0;
    return portfolio.reduce((total, item) => {
      const stock = stockData.find(s => s.code === item.stockCode);
      if (stock) {
        total += item.shares * stock.priceHistory[day - 1];
      }
      return total;
    }, 0);
  }, [portfolio, stockData, day]);
  
  const handleNextDay = useCallback(() => {
    if (day < simulationDays) {
      setDay(prevDay => prevDay + 1);
    }
  }, [day, simulationDays]);

  const handleStockSelect = useCallback((stock: Stock) => {
    setSelectedStock(stock);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedStock(null);
  }, []);
  
  const handleShowNews = useCallback((news: NewsEvent) => {
    setActiveNews(news);
  }, []);

  const handleCloseNews = useCallback(() => {
    setActiveNews(null);
  }, []);

  const handleTrade = useCallback((stockCode: string, shares: number, price: number, type: 'buy' | 'sell') => {
    if (type === 'buy') {
      const cost = shares * price;
      setCash(prevCash => prevCash - cost);
      setPortfolio(prevPortfolio => {
        const existingItem = prevPortfolio.find(item => item.stockCode === stockCode);
        if (existingItem) {
          const totalShares = existingItem.shares + shares;
          const totalCost = (existingItem.avgPurchasePrice * existingItem.shares) + cost;
          const newAvgPrice = totalCost / totalShares;
          return prevPortfolio.map(item => 
            item.stockCode === stockCode 
              ? { ...item, shares: totalShares, avgPurchasePrice: newAvgPrice } 
              : item
          );
        } else {
          return [...prevPortfolio, { stockCode, shares, avgPurchasePrice: price }];
        }
      });
    } else { // sell
      const revenue = shares * price;
      setCash(prevCash => prevCash + revenue);
      setPortfolio(prevPortfolio => {
        const existingItem = prevPortfolio.find(item => item.stockCode === stockCode)!;
        const newShares = existingItem.shares - shares;
        if (newShares > 0) {
          return prevPortfolio.map(item => 
            item.stockCode === stockCode ? { ...item, shares: newShares } : item
          );
        } else {
          return prevPortfolio.filter(item => item.stockCode !== stockCode);
        }
      });
    }
  }, []);

  if (gameState === 'setup') {
    return <SetupScreen onStartGame={handleStartGame} />;
  }

  if (gameState === 'finished') {
    const finalAssets = cash + stockValue;
    return <GameEndScreen 
            playerName={playerName} 
            initialAssets={initialAssets} 
            finalAssets={finalAssets}
            onRestart={handleRestartGame}
           />;
  }

  const isLastDay = day >= simulationDays;

  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-6 font-sans">
      <Header 
        day={day} 
        cash={cash} 
        stockValue={stockValue} 
        initialAssets={initialAssets}
      />
      
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <StockList stocks={stockData} day={day} onStockSelect={handleStockSelect} />
        <Portfolio portfolio={portfolio} stocks={stockData} day={day} />
      </main>

      <footer className="mt-6 text-center">
          <button 
            onClick={() => {
              if (isLastDay) {
                setGameState('finished');
              } else {
                handleNextDay();
              }
            }}
            className="bg-green-500 text-white font-bold py-3 px-6 text-lg sm:py-4 sm:px-8 sm:text-xl rounded-full hover:bg-green-600 transition-transform transform hover:scale-105 shadow-lg"
          >
            {isLastDay ? '최종 결과 보기' : `다음 날로 이동 (${day}/${simulationDays})`}
          </button>
      </footer>

      {selectedStock && (
        <TradingModal 
          stock={selectedStock}
          day={day}
          cash={cash}
          portfolioItem={portfolio.find(item => item.stockCode === selectedStock.code)}
          onClose={handleCloseModal}
          onTrade={handleTrade}
          onShowNews={handleShowNews}
        />
      )}

      {activeNews && (
        <NewsModal 
            news={activeNews}
            onClose={handleCloseNews}
        />
      )}
    </div>
  );
}

export default App;