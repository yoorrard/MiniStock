import React from 'react';

interface ExitConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ExitConfirmationModal: React.FC<ExitConfirmationModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl relative">
        <header className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">정말 종료하시겠어요?</h2>
        </header>

        <div className="text-center text-gray-600 text-lg mb-8">
          <p>지금 활동을 종료하면</p>
          <p>모든 진행 상황이 사라져요!</p>
        </div>
        
        <footer className="flex justify-center gap-4">
          <button
              onClick={onCancel}
              className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-300 transition shadow"
          >
              취소
          </button>
          <button
              onClick={onConfirm}
              className="bg-red-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-red-700 transition shadow-lg"
          >
              종료하기
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ExitConfirmationModal;
