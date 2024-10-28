import React from 'react';
import { X, Dices, CircleDot } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { GameType } from '../types';

interface GamePanelProps {
  onClose: () => void;
}

export const GamePanel: React.FC<GamePanelProps> = ({ onClose }) => {
  const { currentRoom, startGame } = useStore();

  const games: { id: GameType; name: string; icon: React.ReactNode; description: string }[] = [
    {
      id: 'ludo',
      name: 'Ludo',
      icon: <Dices className="w-8 h-8" />,
      description: 'Classic board game for 2-4 players'
    },
    {
      id: 'anu',
      name: 'Anu Game',
      icon: <CircleDot className="w-8 h-8" />,
      description: 'Traditional dice game with strategy'
    }
  ];

  const handleStartGame = (gameType: GameType) => {
    startGame(gameType);
    onClose();
  };

  return (
    <div className="fixed inset-x-0 bottom-0 bg-white shadow-lg rounded-t-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Start a Game</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => handleStartGame(game.id)}
            className="flex flex-col items-center p-6 rounded-xl border-2 border-gray-200 hover:border-green-400 bg-gray-50 hover:bg-green-50 transition-all"
          >
            <div className="text-green-600 mb-3">
              {game.icon}
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              {game.name}
            </h4>
            <p className="text-sm text-gray-600 text-center">
              {game.description}
            </p>
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-gray-500 text-center">
        Starting a game will transform the room into a game room. All participants can join and play together while chatting.
      </p>
    </div>
  );
};