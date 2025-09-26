import React from 'react';

interface GlossaryModalProps {
  onClose: () => void;
}

const terms = [
  {
    term: '주식',
    explanation: '회사의 작은 조각이에요. 마치 큰 피자 한 판의 작은 한 조각을 사는 것과 같아요. 회사가 돈을 잘 벌면 내 피자 조각의 가치도 올라가요!',
  },
  {
    term: '매수',
    explanation: '주식을 사는 것을 말해요. 마음에 드는 회사의 주식을 사서 그 회사의 주인이 되는 거예요. "이 회사 피자 한 조각 살게요!" 하는 것과 같아요.',
  },
  {
    term: '매도',
    explanation: '가지고 있던 주식을 다른 사람에게 파는 것을 말해요. 내가 가진 피자 조각을 다른 사람에게 팔아서 돈으로 바꾸는 거죠.',
  },
  {
    term: '수익률',
    explanation: '내가 투자한 돈이 얼마나 늘었거나 줄었는지를 보여주는 숫자예요. 100원짜리 장난감을 120원에 팔았다면, 20원을 벌었죠? 이때 수익률은 20%가 돼요.',
  },
  {
    term: '매입금액',
    explanation: '내가 어떤 주식을 사는 데 돈을 얼마나 썼는지 보여줘요. 예를 들어 1,000원짜리 주식을 5주 샀다면, 이 주식의 매입금액은 5,000원이 되는 거예요.',
  },
  {
    term: '평가금액',
    explanation: '내가 가진 주식이 현재 가격으로 얼마인지 알려줘요. 내가 산 주식의 가격이 올라서 1주에 1,200원이 되었고, 내가 5주를 가지고 있다면 평가금액은 6,000원이 되는 거예요.',
  },
  {
    term: '포트폴리오',
    explanation: '내가 가진 여러 종류의 주식들을 모아놓은 것을 말해요. A회사 피자 조각, B회사 햄버거 조각, C회사 아이스크림 한 스푼을 모두 담아놓은 나만의 바구니라고 생각하면 쉬워요.',
  },
  {
    term: '평단가',
    explanation: '주식을 여러 번 샀을 때, 한 주당 평균 얼마에 샀는지를 계산한 가격이에요. 어제 100원짜리 사탕을 하나 사고, 오늘 똑같은 사탕을 200원에 샀다면? 사탕 2개를 300원에 샀으니, 평단가는 150원이 되는 거예요.',
  },
   {
    term: '현재가',
    explanation: '지금 이 순간 주식 1주가 얼마에 팔리고 있는지를 나타내는 가격이에요. 가게에 있는 과자의 지금 가격표와 같아요.',
  },
  {
    term: '등락',
    explanation: '주식 가격이 오르거나 내리는 것을 말해요. 마치 시소처럼 가격이 위아래로 움직이는 거죠. 빨간색은 오른 것, 파란색은 내린 것을 뜻해요.',
  },
  {
    term: '섹터',
    explanation: '비슷한 종류의 사업을 하는 회사들의 그룹이에요. 예를 들어 자동차를 만드는 회사들은 ‘자동차 섹터’, 과자를 만드는 회사들은 ‘식품 섹터’에 속해요.',
  },
];

const GlossaryModal: React.FC<GlossaryModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-2xl shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl font-bold">&times;</button>
        
        <header className="text-center border-b-2 border-gray-100 pb-4 mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">📚 용어 사전</h2>
            <p className="text-sm text-gray-500 mt-1">어려운 주식 용어를 쉽게 배워봐요!</p>
        </header>

        <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-3">
          {terms.map((item, index) => (
            <div key={index}>
              <h3 className="text-lg sm:text-xl font-bold text-blue-600">{item.term}</h3>
              <p className="text-base text-gray-700 leading-relaxed mt-1">{item.explanation}</p>
            </div>
          ))}
        </div>
        
        <footer className="mt-8 text-center">
          <button
              onClick={onClose}
              className="bg-blue-600 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full text-base sm:text-lg hover:bg-blue-700 transition shadow"
          >
              이해했어요!
          </button>
        </footer>
      </div>
    </div>
  );
};

export default GlossaryModal;