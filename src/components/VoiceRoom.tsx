import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Gift, ArrowLeft, MessageCircle, Heart, Share2, Users, Gamepad2, Crown } from 'lucide-react';
import { useStore } from '../store/useStore';
import { GiftPanel } from './GiftPanel';
import { ChatPanel } from './ChatPanel';
import { GamePanel } from './GamePanel';
import { RANK_BADGES, MOOD_EMOJIS, ENTRANCE_EFFECTS } from '../types';
import { playSound } from '../utils/sound';

interface GiftAnimation {
  id: string;
  giftId: string;
  position: { x: number; y: number };
}

export const VoiceRoom: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showGamePanel, setShowGamePanel] = useState(false);
  const [giftAnimations, setGiftAnimations] = useState<GiftAnimation[]>([]);
  const { currentRoom, leaveRoom } = useStore();

  useEffect(() => {
    playSound('room-join');
  }, []);

  const handleGiftSent = (giftId: string) => {
    const newGift: GiftAnimation = {
      id: Math.random().toString(),
      giftId,
      position: {
        x: Math.random() * (window.innerWidth - 100),
        y: window.innerHeight
      }
    };

    setGiftAnimations(prev => [...prev, newGift]);

    setTimeout(() => {
      setGiftAnimations(prev => prev.filter(g => g.id !== newGift.id));
    }, 3000);
  };

  const toggleMic = () => {
    setIsMuted(!isMuted);
    playSound('mic-toggle');
  };

  if (!currentRoom) return null;

  const emptySeats = Array(8 - currentRoom.participants.length).fill(null);
  const isGameActive = currentRoom.gameType !== null && currentRoom.gameType !== undefined;

  const renderUserBadges = (user: typeof currentRoom.host) => {
    return (
      <div className="flex flex-col items-center gap-1">
        {user.rank && (
          <span className="text-2xl animate-pulse" title={`Rank: ${user.rank}`}>
            {RANK_BADGES[user.rank]}
          </span>
        )}
        {user.vipLevel && (
          <span className="px-2 py-0.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full animate-shimmer">
            VIP {user.vipLevel}
          </span>
        )}
        {user.mood && (
          <span className="text-xl animate-bounce">
            {MOOD_EMOJIS[user.mood]}
          </span>
        )}
      </div>
    );
  };

  const renderEntranceEffect = (user: typeof currentRoom.host) => {
    if (!user.entrance) return null;
    return (
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl animate-slide-in">
        {ENTRANCE_EFFECTS[user.entrance]}
      </div>
    );
  };

  return (
    <div className="glass-effect rounded-lg shadow-lg p-6 max-w-6xl mx-auto relative overflow-hidden">
      {giftAnimations.map(gift => (
        <div
          key={gift.id}
          className="absolute animate-float-up pointer-events-none"
          style={{
            left: gift.position.x,
            bottom: gift.position.y,
            transition: 'all 3s ease-out'
          }}
        >
          {gifts.find(g => g.id === gift.giftId)?.icon}
        </div>
      ))}

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4 space-x-reverse">
          <button
            onClick={leaveRoom}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">
            {currentRoom.name}
            {isGameActive && (
              <span className="ml-2 text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                {currentRoom.gameType === 'ludo' ? 'Ludo' : 'Anu'} Game
              </span>
            )}
          </h2>
        </div>
        <div className="flex space-x-4 space-x-reverse">
          <button
            onClick={() => {
              setShowGamePanel(!showGamePanel);
              playSound('game-start');
            }}
            className="p-3 rounded-full bg-green-100 text-green-600 transition-colors transform hover:scale-105"
          >
            <Gamepad2 className="w-6 h-6" />
          </button>
          <button
            onClick={() => setShowChat(!showChat)}
            className="p-3 rounded-full bg-blue-100 text-blue-600 transition-colors transform hover:scale-105"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
          <button
            onClick={toggleMic}
            className={`p-3 rounded-full ${
              isMuted ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
            } transition-colors transform hover:scale-105`}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
          <button
            onClick={() => setShowGifts(!showGifts)}
            className="p-3 rounded-full bg-purple-100 text-purple-600 transition-colors transform hover:scale-105"
          >
            <Gift className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Rest of the component remains the same */}
      
      {showGifts && <GiftPanel onClose={() => setShowGifts(false)} onGiftSent={handleGiftSent} />}
      {showChat && <ChatPanel onClose={() => setShowChat(false)} />}
      {showGamePanel && <GamePanel onClose={() => setShowGamePanel(false)} />}
    </div>
  );
};