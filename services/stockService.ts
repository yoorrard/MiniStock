import { STOCKS_CONFIG } from '../constants';
import type { Stock } from '../types';
import { generateAllNews } from './newsService';

export const generateAllStockData = (simulationDays: number): Stock[] => {
    // 0. 모든 종목에 대한 뉴스 미리 생성
    const allNews = generateAllNews(STOCKS_CONFIG, simulationDays);

    // 1. 시장 전체의 흐름(Market Trend) 생성
    const marketTrend = Array.from({ length: simulationDays }, () => (Math.random() - 0.48) * 0.025); // 일일 -1.2% ~ +1.3% 변동

    // 2. 섹터별 흐름 생성
    const sectors = [...new Set(STOCKS_CONFIG.map(s => s.sector))];
    const sectorTrends: Record<string, number[]> = {};
    sectors.forEach(sector => {
        sectorTrends[sector] = Array.from({ length: simulationDays }, () => (Math.random() - 0.5) * 0.01); // 섹터별 추가 변동
    });

    return STOCKS_CONFIG.map(initialStock => {
        const priceHistory: number[] = [initialStock.initialPrice];
        const stockNews = allNews[initialStock.code] || [];

        for (let i = 1; i < simulationDays; i++) {
            const prevPrice = priceHistory[i - 1];

            // 시장 흐름 + 섹터 흐름
            const marketChange = marketTrend[i];
            const sectorChange = sectorTrends[initialStock.sector][i];

            // 개별 종목의 고유 변동성
            const individualChange = (Math.random() * 2 - 1) * initialStock.volatility;
            
            // --- 뉴스 영향력 계산 (2일간 지속) ---
            // 1일차 (어제 뉴스): 100% 영향
            const newsOnPrevDay = stockNews.find(n => n.day === i - 1);
            const primaryNewsImpact = newsOnPrevDay ? newsOnPrevDay.impact : 0;

            // 2일차 (이틀 전 뉴스): 30% ~ 50% 잔여 영향
            const newsTwoDaysAgo = stockNews.find(n => n.day === i - 2);
            let residualNewsImpact = 0;
            if (newsTwoDaysAgo) {
                const residualEffectiveness = 0.3 + Math.random() * 0.2; // 30% to 50%
                residualNewsImpact = newsTwoDaysAgo.impact * residualEffectiveness;
            }
            const totalNewsImpact = primaryNewsImpact + residualNewsImpact;
            // --- 뉴스 영향력 계산 끝 ---

            // --- 평균 회귀(Mean Reversion) 로직 ---
            // 주가가 단기 이동평균에서 벗어나면 평균으로 돌아가려는 힘을 적용합니다.
            // 이는 비현실적인 연속 상승/하락을 방지하고 주가 흐름을 더 자연스럽게 만듭니다.
            let meanReversionForce = 0;
            const lookbackPeriod = 20; // 20일 이동평균을 기준으로 합니다.
            if (i > lookbackPeriod) {
                // 지난 20일간의 이동평균을 계산합니다.
                const movingAverage = priceHistory.slice(i - lookbackPeriod, i).reduce((sum, val) => sum + val, 0) / lookbackPeriod;
                // 현재 가격이 이동평균에서 얼마나 벗어났는지 계산합니다.
                const deviation = (prevPrice - movingAverage) / movingAverage;
                // 회귀 강도를 설정합니다. (값이 클수록 더 강하게 평균으로 돌아감)
                const reversionStrength = 0.01; 
                // 벗어난 방향과 반대로 힘을 적용합니다.
                meanReversionForce = -deviation * reversionStrength;
            }
            // --- 평균 회귀 로직 끝 ---
            
            const totalChangePercent = marketChange + sectorChange + individualChange + totalNewsImpact + meanReversionForce;

            // 장기적 경제 성장을 반영하는 미세한 상승 경향(drift)
            const drift = 0.0003;

            let nextPrice = prevPrice * (1 + totalChangePercent + drift);
            
            // 가격이 너무 낮아지지 않도록 최소가 보장 및 100원 단위로 반올림
            nextPrice = Math.max(1000, Math.round(nextPrice / 100) * 100);

            priceHistory.push(nextPrice);
        }
        return { ...initialStock, priceHistory, news: stockNews };
    });
};