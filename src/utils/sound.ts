const sounds = {
  'gift-send': new Audio('/sounds/gift-send.mp3'),
  'room-join': new Audio('/sounds/room-join.mp3'),
  'message': new Audio('/sounds/message.mp3'),
  'game-start': new Audio('/sounds/game-start.mp3'),
  'mic-toggle': new Audio('/sounds/mic-toggle.mp3')
};

export const playSound = (soundName: keyof typeof sounds) => {
  const sound = sounds[soundName];
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {
      // Ignore autoplay restrictions
    });
  }
};