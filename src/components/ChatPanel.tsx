import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

interface ChatPanelProps {
  onClose: () => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ onClose }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // TODO: Implement send message functionality
      setMessage('');
    }
  };

  return (
    <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-lg p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">المحادثة</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {/* Sample messages */}
        <div className="flex items-start space-x-3 space-x-reverse">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-gray-800">سارة</p>
            <p className="text-sm bg-gray-100 rounded-lg p-2 mt-1">
              مرحباً بالجميع! 👋
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSendMessage} className="flex space-x-2 space-x-reverse">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="اكتب رسالتك..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-purple-500"
        />
        <button
          type="submit"
          className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};