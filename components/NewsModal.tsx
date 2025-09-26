import React from 'react';
import type { NewsEvent } from '../types';

interface NewsModalProps {
  news: NewsEvent | null;
  onClose: () => void;
}

const NewsModal: React.FC<NewsModalProps> = ({ news, onClose }) => {
  if (!news) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-2xl shadow-2xl relative animate-fade-in-down">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl font-bold">&times;</button>
        
        <header className="text-center border-b-2 border-gray-100 pb-4 mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">📰 오늘의 뉴스</h2>
        </header>

        <article className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
            <h3 className="text-xl sm:text-2xl font-bold text-blue-600">{news.title}</h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">{news.content}</p>
        </article>
        
        <footer className="mt-8 text-center">
          <p className="text-xs text-gray-500 mb-4">
            ※ 본 뉴스는 모의 투자를 위해 생성된 가상의 정보이며, 실제 사실과 다릅니다.
          </p>
          <button
              onClick={onClose}
              className="bg-gray-500 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full text-base sm:text-lg hover:bg-gray-600 transition shadow"
          >
              닫기
          </button>
        </footer>
      </div>
    </div>
  );
};

export default NewsModal;