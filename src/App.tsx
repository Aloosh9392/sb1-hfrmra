import React from 'react';
import { Header } from './components/Header';
import { RoomList } from './components/RoomList';
import { VoiceRoom } from './components/VoiceRoom';
import { useStore } from './store/useStore';

function App() {
  const { currentRoom } = useStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {currentRoom ? <VoiceRoom /> : <RoomList />}
      </main>
    </div>
  );
}

export default App;