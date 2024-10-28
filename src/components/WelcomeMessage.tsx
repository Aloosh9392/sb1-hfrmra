import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Heart, X } from 'lucide-react';

interface WelcomeMessageProps {
  onClose: () => void;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onClose }) => {
  const { welcomeUsers, currentUser } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            أهلاً بك في AsiaChat!
          </h2>
          <p className="text-gray-600">
            {currentUser?.name} مرحباً بك في مجتمعنا
          </p>
        </div>

        <div className="space-y-4">
          {welcomeUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center space-x-4 space-x-reverse bg-purple-50 rounded-lg p-4"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full border-2 border-purple-300"
              />
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="font-medium text-gray-800">{user.name}</h3>
                  {user.vipLevel && (
                    <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full">
                      VIP {user.vipLevel}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mt-1">{user.welcomeMessage}</p>
              </div>
              <button className="p-2 text-pink-500 hover:bg-pink-100 rounded-full transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            ابدأ المحادثة
          </button>
        </div>
      </div>
    </div>
  );
};