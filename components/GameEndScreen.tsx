import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface GameEndScreenProps {
  playerName: string;
  initialAssets: number;
  finalAssets: number;
  onRestart: () => void;
}

const GameEndScreen: React.FC<GameEndScreenProps> = ({ playerName, initialAssets, finalAssets, onRestart }) => {
  const reportRef = useRef<HTMLDivElement>(null);

  const profit = finalAssets - initialAssets;
  const profitRate = initialAssets > 0 ? (profit / initialAssets) * 100 : 0;
  
  const formatCurrency = (amount: number) => new Intl.NumberFormat('ko-KR').format(Math.round(amount));
  
  const profitColor = profit >= 0 ? 'text-red-600' : 'text-blue-600';
  const resultMessage = profit >= 0 ? '성공적인 투자였어요! 🎉' : '다음엔 더 잘할 수 있을 거예요. 💪';

  const handleDownloadPdf = () => {
    const input = reportRef.current;
    if (input) {
      html2canvas(input, { scale: 2, backgroundColor: null }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth-20, pdfHeight-20);
        pdf.save(`${playerName}_어린이주식왕_결과보고서.pdf`);
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans p-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl w-full max-w-2xl mx-auto animate-fadeIn">
        <div ref={reportRef} className="p-4 sm:p-8 bg-white">
            <header className="text-center border-b-2 pb-4 mb-6">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">🚀 최종 투자 보고서</h1>
            <p className="text-xl text-gray-700 mt-2">{playerName}님의 투자 여정이 끝났습니다!</p>
            </header>
            
            <main className="space-y-6 text-lg">
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <span className="font-semibold text-gray-600">초기 자본</span>
                <span className="font-bold text-2xl text-gray-800">{formatCurrency(initialAssets)}원</span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <span className="font-semibold text-gray-600">최종 자산</span>
                <span className="font-bold text-2xl text-gray-800">{formatCurrency(finalAssets)}원</span>
            </div>
            <div className={`flex justify-between items-center p-4 rounded-lg ${profit >= 0 ? 'bg-red-50' : 'bg-blue-50'}`}>
                <span className={`font-semibold ${profitColor}`}>수익금 (수익률)</span>
                <div className={`text-right font-bold text-2xl ${profitColor}`}>
                <p>{profit >= 0 ? '+' : ''}{formatCurrency(profit)}원</p>
                <p className="text-lg">({profitRate.toFixed(2)}%)</p>
                </div>
            </div>
            </main>

            <footer className="text-center mt-8 pt-4 border-t-2">
            <p className="text-2xl font-semibold text-gray-800">{resultMessage}</p>
            </footer>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
            onClick={handleDownloadPdf}
            className="w-full sm:w-auto bg-white border-2 border-blue-600 text-blue-600 font-bold py-3 px-6 rounded-full text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
            PDF로 저장
            </button>
            <button
              onClick={onRestart}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-full text-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              다시하기
            </button>
        </div>
      </div>
    </div>
  );
};

export default GameEndScreen;