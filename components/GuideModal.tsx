import React from 'react';

interface GuideModalProps {
  onClose: () => void;
}

const GuideModal: React.FC<GuideModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-2xl shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl font-bold">&times;</button>
        
        <header className="text-center border-b-2 border-gray-100 pb-4 mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">🎮 어린이 주식왕 플레이 방법</h2>
            <p className="text-sm text-gray-500 mt-1">우리 함께 주식 박사가 되어볼까요?</p>
        </header>

        <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-3 text-base text-gray-700 leading-relaxed">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-blue-600">👑 첫걸음: 나만의 투자 준비하기</h3>
            <p className="mt-1">
              게임을 시작하기 전에, 여러분의 멋진 <strong>이름</strong>을 알려주세요. 그리고 <strong>며칠 동안 투자할지</strong>, <strong>얼마의 돈으로 시작할지</strong> 정해주세요. 준비가 되면 '투자 시작하기!' 버튼을 꾸욱 눌러요!
            </p>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-blue-600">📊 화면 둘러보기: 여기가 어디일까요?</h3>
            <p className="mt-1">
              게임 화면 위쪽에서는 내가 가진 <strong>현금</strong>, <strong>주식의 가치</strong>, 그리고 <strong>총 재산</strong>이 얼마인지 한눈에 볼 수 있어요. 돈이 늘어나는 걸 보면 정말 신날 거예요!
            </p>
            <p className="mt-2">
              왼쪽의 <strong>주식 시장</strong> 목록에서는 여러 회사의 주식을 살 수 있어요. 회사 이름 옆에 <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">NEWS</span> 딱지가 붙어있다면, 그 회사에 특별한 소식이 있다는 뜻이니 꼭 확인해보세요!
            </p>
            <p className="mt-2">
              오른쪽의 <strong>나의 포트폴리오</strong>는 내가 사 모은 주식들을 보여주는 나만의 보물상자예요.
            </p>
          </div>
           <div>
            <h3 className="text-lg sm:text-xl font-bold text-blue-600">💰 사고팔기: 진짜 투자자처럼!</h3>
            <p className="mt-1">
              마음에 드는 회사를 <strong>주식 시장</strong>에서 콕! 누르면 <strong>거래 창</strong>이 열려요. 여기서 주식을 살 수도(<strong>매수</strong>), 팔 수도(<strong>매도</strong>) 있어요. 몇 주를 살지 정하고 버튼을 누르면 끝! 참 쉽죠?
            </p>
             <p className="mt-2">
                <strong>'오늘의 뉴스'</strong> 버튼이 보이면 꼭 눌러보세요! 주식 가격이 오를지 내릴지 힌트를 얻을 수 있답니다.
            </p>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-blue-600">⏰ 시간 여행: 다음 날로 이동!</h3>
            <p className="mt-1">
              투자를 마쳤다면, 화면 아래의 <strong>'다음 날로 이동'</strong> 버튼을 눌러 하루를 보내보세요. 내가 산 주식의 가격이 어떻게 변했을지 두근두근 기대될 거예요!
            </p>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-blue-600">🎓 똑똑해지기: 용어 사전 활용하기!</h3>
            <p className="mt-1">
              어려운 말이 나오면 화면 위쪽의 <strong>'용어 사전'</strong> 버튼을 눌러보세요. 알기 쉽게 설명해 줄 거예요.
            </p>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-blue-600">🏆 목표: 최고의 주식왕이 되자!</h3>
            <p className="mt-1">
              정해진 날짜가 끝날 때까지 열심히 투자해서 처음 가진 돈보다 더 많은 돈을 버는 것이 목표예요. 마지막 날에는 멋진 <strong>투자 보고서</strong>도 받을 수 있답니다.
            </p>
          </div>
        </div>
        
        <footer className="mt-8 text-center">
          <button
              onClick={onClose}
              className="bg-blue-600 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full text-base sm:text-lg hover:bg-blue-700 transition shadow"
          >
              알겠어요!
          </button>
        </footer>
      </div>
    </div>
  );
};

export default GuideModal;