import React, { useState } from 'react';
import { X, Coins, CreditCard, Gift } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Transaction } from '../types';

interface CoinStoreProps {
  onClose: () => void;
}

export const CoinStore: React.FC<CoinStoreProps> = ({ onClose }) => {
  const { coinPackages, currentUser, purchaseCoins } = useStore();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handlePurchase = async (paymentMethod: Transaction['paymentMethod']) => {
    if (!selectedPackage || !currentUser) return;
    
    try {
      setProcessing(true);
      await purchaseCoins(selectedPackage, paymentMethod);
      setSelectedPackage(null);
      // In a real app, you would handle the payment flow here
      alert('Purchase successful!');
    } catch (error) {
      alert('Purchase failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Coins className="w-6 h-6 mr-2 text-yellow-500" />
            شراء العملات
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {coinPackages.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg.id)}
              className={`p-6 rounded-xl border-2 transition-all ${
                selectedPackage === pkg.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-200'
              }`}
            >
              <div className="text-3xl mb-2">
                <Coins className="w-8 h-8 text-yellow-500 inline-block" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {pkg.coins.toLocaleString()} عملة
              </h3>
              {pkg.bonus && (
                <p className="text-green-600 text-sm mb-2">
                  +{pkg.bonus.toLocaleString()} مكافأة
                </p>
              )}
              <p className="text-2xl font-bold text-purple-600">
                ${pkg.price}
              </p>
            </button>
          ))}
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">طرق الدفع</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handlePurchase('paypal')}
              disabled={!selectedPackage || processing}
              className="flex items-center justify-center space-x-2 p-4 rounded-lg border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-50"
            >
              <span>PayPal</span>
            </button>
            <button
              onClick={() => handlePurchase('visa')}
              disabled={!selectedPackage || processing}
              className="flex items-center justify-center space-x-2 p-4 rounded-lg border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition-colors disabled:opacity-50"
            >
              <CreditCard className="w-5 h-5 ml-2" />
              <span>Visa</span>
            </button>
            <button
              onClick={() => handlePurchase('googlepay')}
              disabled={!selectedPackage || processing}
              className="flex items-center justify-center space-x-2 p-4 rounded-lg border-2 border-green-500 text-green-600 hover:bg-green-50 transition-colors disabled:opacity-50"
            >
              <span>Google Pay</span>
            </button>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>• كل 1000 عملة تساوي 1 دولار أمريكي</p>
          <p>• 70% من قيمة الهدايا تذهب للمستلم و 30% رسوم المنصة</p>
          <p>• العملات غير قابلة للاسترداد</p>
        </div>
      </div>
    </div>
  );
};