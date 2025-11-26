import React from 'react';
import { FaTimes, FaCoins, FaRocket } from 'react-icons/fa';

interface CreditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCredits: number;
  onUpgrade?: () => void;
}

const CreditModal: React.FC<CreditModalProps> = ({
  isOpen,
  onClose,
  currentCredits,
  onUpgrade,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close credit modal"
        >
          <FaTimes />
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-lg">
            <FaCoins className="text-xl" aria-hidden />
          </div>
          <div>
            <p className="text-sm uppercase text-blue-600 font-semibold tracking-wider">
              Credits required
            </p>
            <h2 className="text-2xl font-bold text-gray-900">Add more search credits</h2>
          </div>
        </div>

        <p className="text-gray-600">
          You have <span className="font-semibold text-gray-900">{currentCredits} credits</span>{' '}
          remaining. Each AI search or contact unlock consumes one credit.
        </p>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center space-x-3">
          <FaRocket className="text-blue-500" aria-hidden />
          <div>
            <p className="text-sm font-semibold text-blue-800">Pro tip</p>
            <p className="text-sm text-blue-700">
              Upgrade to the Growth plan for unlimited AI searches, ATS export, and team access.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition"
          >
            Maybe later
          </button>
          <button
            onClick={() => onUpgrade?.()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-[1.01] transition"
          >
            View plans
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditModal;
