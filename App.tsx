import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Header from './components/Header';
import StockList from './components/StockList';
import Portfolio from './components/Portfolio';
import TradingModal from './components/TradingModal';
import SetupScreen from './components/SetupScreen';
import GameEndScreen from './components/GameEndScreen';
import NewsModal from './components/NewsModal';
import GlossaryModal from './components/GlossaryModal';
import WelcomeScreen from './components/WelcomeScreen';
import ExitConfirmationModal from './components/ExitConfirmationModal';
import { generateAllStockData } from './services/stockService';
import type { Stock, PortfolioItem, NewsEvent } from './types';

// Define the shape of the saved game data
interface SavedGameState {
  gameState: 'playing' | 'finished';
  day: number;
  cash: number;
  initialAssets: number;
  portfolio: PortfolioItem[];
  playerName: string;
  simulationDays: number;
  stockData: Stock[];
}

const SAVE_GAME_KEY = 'kidsStockKingSaveData';


const App: React.FC = () => {
  const [gameState, setGameState] = useState<'setup' | 'welcome' | 'playing' | 'finished'>('setup');
  const [savedGameData, setSavedGameData] = useState<SavedGameState | null>(null);

  const [day, setDay] = useState<number>(1);
  const [cash, setCash] = useState<number>(0);
  const [initialAssets, setInitialAssets] = useState<number>(0);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  
  const [playerName, setPlayerName] = useState<string>('');
  const [simulationDays, setSimulationDays] = useState<number>(0);
  const [stockData, setStockData] = useState<Stock[]>([]);
  const [activeNews, setActiveNews] = useState<NewsEvent | null>(null);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [isExitConfirmOpen, setIsExitConfirmOpen] = useState<boolean>(false);

  // On initial load, check for saved data and show a welcome screen if it exists.
  useEffect(() => {
    try {
      const savedDataString = localStorage.getItem(SAVE_GAME_KEY);
      if (savedDataString) {
        const savedData: SavedGameState = JSON.parse(savedDataString);
        setSavedGameData(savedData);
        setGameState('welcome');
      }
    } catch (error) {
      console.error("Failed to load game state from localStorage:", error);
      localStorage.removeItem(SAVE_GAME_KEY);
    }
  }, []);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    if (gameState === 'playing' || gameState === 'finished') {
      try {
        const dataToSave: SavedGameState = {
          gameState,
          day,
          cash,
          initialAssets,
          portfolio,
          playerName,
          simulationDays,
          stockData,
        };
        localStorage.setItem(SAVE_GAME_KEY, JSON.stringify(dataToSave));
      } catch (error) {
        console.error("Failed to save game state to localStorage:", error);
      }
    }
  }, [gameState, day, cash, initialAssets, portfolio, playerName, simulationDays, stockData]);


  const handleContinueGame = useCallback(() => {
    if (savedGameData) {
      setPlayerName(savedGameData.playerName);
      setSimulationDays(savedGameData.simulationDays);
      setStockData(savedGameData.stockData);
      setCash(savedGameData.cash);
      setInitialAssets(savedGameData.initialAssets);
      setPortfolio(savedGameData.portfolio);
      setDay(savedGameData.day);
      setGameState(savedGameData.gameState);
      setSavedGameData(null); // Clear temporary data
    }
  }, [savedGameData]);

  const handleStartNewGame = useCallback(() => {
    try {
        localStorage.removeItem(SAVE_GAME_KEY);
    } catch (error) {
        console.error("Failed to remove saved game data from localStorage:", error);
    }
    setSavedGameData(null);
    setGameState('setup');
  }, []);

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
    handleStartNewGame();
  }, [handleStartNewGame]);

  const handleOpenExitConfirm = useCallback(() => {
    setIsExitConfirmOpen(true);
  }, []);

  const handleCloseExitConfirm = useCallback(() => {
    setIsExitConfirmOpen(false);
  }, []);

  const handleConfirmExit = useCallback(() => {
    handleRestartGame();
    setIsExitConfirmOpen(false);
  }, [handleRestartGame]);


  const stockValue = useMemo(() => {
    if (stockData.length === 0) return 0;
    return portfolio.reduce((total, item) => {
      const stock = stockData.find(s => s.code === item.stockCode);
      if (stock && stock.priceHistory && stock.priceHistory.length >= day) {
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

  const handleShowGlossary = useCallback(() => {
    setIsGlossaryOpen(true);
  }, []);

  const handleCloseGlossary = useCallback(() => {
    setIsGlossaryOpen(false);
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

  if (gameState === 'welcome' && savedGameData) {
    return (
      <WelcomeScreen
        playerName={savedGameData.playerName}
        onContinue={handleContinueGame}
        onStartNew={handleStartNewGame}
      />
    );
  }

  if (gameState === 'setup') {
    return <SetupScreen onStartGame={handleStartGame} />;
  }
  
  // Display a loading screen if game state is 'playing' but stock data isn't ready.
  // This can happen briefly when reloading a saved game.
  if (gameState === 'playing' && stockData.length === 0) {
      return (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
              <p className="text-xl font-semibold">저장된 게임을 불러오는 중...</p>
          </div>
      );
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
    <div className="container mx-auto p-2 sm:p-4 md:p-6">
      <Header 
        day={day} 
        cash={cash} 
        stockValue={stockValue} 
        initialAssets={initialAssets}
        onShowGlossary={handleShowGlossary}
      />
      
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <StockList stocks={stockData} day={day} onStockSelect={handleStockSelect} />
        <Portfolio portfolio={portfolio} stocks={stockData} day={day} />
      </main>

      <footer className="mt-6 flex justify-center items-center gap-4">
          <button
            onClick={handleOpenExitConfirm}
            className="bg-red-500 text-white font-bold py-3 px-6 text-lg sm:py-4 sm:px-8 sm:text-xl rounded-full hover:bg-red-600 transition-transform transform hover:scale-105 shadow-lg"
          >
            활동 종료
          </button>
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

      {isGlossaryOpen && (
        <GlossaryModal onClose={handleCloseGlossary} />
      )}

      {isExitConfirmOpen && (
        <ExitConfirmationModal
            onConfirm={handleConfirmExit}
            onCancel={handleCloseExitConfirm}
        />
      )}
    </div>
  );
}

export default App;