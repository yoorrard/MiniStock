
export interface NewsEvent {
  day: number;
  title: string;
  content: string;
  impact: number; // e.g., 0.05 for +5%, -0.03 for -3%
}

export interface Stock {
  code: string;
  name: string;
  sector: string;
  initialPrice: number;
  volatility: number;
  priceHistory: number[];
  news: NewsEvent[];
}

export interface PortfolioItem {
  stockCode: string;
  shares: number;
  avgPurchasePrice: number;
}