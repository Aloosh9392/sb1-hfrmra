import React from 'react';
import { Users, Mic, Crown } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Room } from '../types';

const mockRooms: Room[] = [
  {
    id: '1',
    name: '🎤 Karaoke Night',
    host: {
      id: '2',
      name: 'Sarah Host',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      coins: 5000,
      isHost: true,
    },
    participants: [
      {
        id: '3',
        name: 'Mike Singer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        coins: 800,
        isHost: false,
      },
      {
        id: '4',
        name: 'Emma Joy',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        coins: 1200,
        isHost: false,
      },
    ],
    isLive: true,
  },
  {
    id: '2',
    name: '🎸 Guitar Jam Session',
    host: {
      id: '5',
      name: 'Alex Guitar',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=400&fit=crop',
      coins: 3000,
      isHost: true,
    },
    participants: [],
    isLive: true,
  },
  {
    id: '3',
    name: '🎹 Piano Lounge',
    host: {
      id: '6',
      name: 'Lisa Keys',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
      coins: 2500,
      isHost: true,
    },
    participants: [],
    isLive: true,
  },
];

export const RoomList: React.FC = () => {
  const { setCurrentRoom } = useStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Live Rooms</h2>
        <button
          onClick={() => {
            // TODO: Implement create room functionality
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Create Room
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setCurrentRoom(room)}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{room.name}</h3>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center">
                  <Mic className="w-3 h-3 mr-1" />
                  Live
                </span>
              </div>

              <div className="flex items-center mb-4">
                <img
                  src={room.host.avatar}
                  alt={room.host.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">{room.host.name}</p>
                  <p className="text-xs text-gray-500 flex items-center">
                    <Crown className="w-3 h-3 mr-1 text-yellow-500" />
                    Host
                  </p>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  {room.participants.length + 1} participants
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};