import React, { useState } from 'react';
import { Coins, Menu, Bell, Settings, Users } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CoinStore } from './CoinStore';
import { Settings as SettingsPanel } from './Settings';

export const Header: React.FC = () => {
  const { currentUser } = useStore();
  const [activeTab, setActiveTab] = useState('popular');
  const [showCoinStore, setShowCoinStore] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const tabs = [
    { id: 'popular', name: 'الشائع' },
    { id: 'new', name: 'الجديد' },
    { id: 'following', name: 'المتابَعون' },
    { id: 'nearby', name: 'بالقرب مني' },
  ];

  return (
    <>
      <header className="glass-effect text-gray-800 p-4 sticky top-0 z-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Menu className="w-6 h-6 cursor-pointer" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AsiaChat
              </h1>
            </div>

            {currentUser && (
              <div className="flex items-center space-x-6 space-x-reverse">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Bell className="w-5 h-5 cursor-pointer" />
                  <Settings 
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => setShowSettings(true)}
                  />
                </div>
                <button
                  onClick={() => setShowCoinStore(true)}
                  className="flex items-center space-x-2 space-x-reverse bg-yellow-100 px-3 py-1.5 rounded-full hover:bg-yellow-200 transition-colors"
                >
                  <Coins className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium">{currentUser.coins}</span>
                </button>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full border-2 border-purple-500"
                  />
                  <span className="font-medium">{currentUser.name}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center space-x-8 space-x-reverse">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-100 text-purple-600 font-medium'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {showCoinStore && <CoinStore onClose={() => setShowCoinStore(false)} />}
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </>
  );
};