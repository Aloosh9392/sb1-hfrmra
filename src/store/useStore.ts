import { create } from 'zustand';
import { User, Gift, Room, CoinPackage, Transaction, GameType, VIP_THRESHOLDS } from '../types';

interface WelcomeUser extends User {
  welcomeMessage: string;
}

interface UserProfile {
  name: string;
  avatar: string;
  country?: string;
  age?: string;
  email?: string;
  phone?: string;
  facebook?: string;
}

const welcomeUsers: WelcomeUser[] = [
  {
    id: 'w1',
    name: 'ليلى',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    coins: 50000,
    isHost: false,
    vipLevel: 3,
    rank: 'king',
    welcomeMessage: 'مرحباً بك في عائلتنا! أتمنى أن تجد أصدقاء رائعين هنا 💝'
  },
  {
    id: 'w2',
    name: 'أمير',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    coins: 100000,
    isHost: false,
    vipLevel: 4,
    rank: 'emperor',
    welcomeMessage: 'أهلاً بك في AsiaChat! نحن سعداء بانضمامك إلينا 🎉'
  },
  {
    id: 'w3',
    name: 'نور',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    coins: 75000,
    isHost: false,
    vipLevel: 3,
    rank: 'king',
    welcomeMessage: 'مرحباً! أتمنى أن تستمتع بوقتك معنا في الدردشة والألعاب 🎮'
  }
];

// Mock data for testing
const mockUser: User = {
  id: '1',
  name: 'Test User',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
  coins: 1000,
  isHost: false,
  vipLevel: 2,
  rank: 'prince',
  mood: 'dancing',
  entrance: 'car'
};

const mockCoinPackages: CoinPackage[] = [
  {
    id: 'basic',
    coins: 10000,
    price: 9.99,
    vipLevel: 1
  },
  {
    id: 'popular',
    coins: 50000,
    price: 49.99,
    bonus: 5000,
    vipLevel: 2
  },
  {
    id: 'premium',
    coins: 100000,
    price: 99.99,
    bonus: 15000,
    vipLevel: 3
  },
  {
    id: 'royal',
    coins: 500000,
    price: 499.99,
    bonus: 100000,
    vipLevel: 5
  },
  {
    id: 'emperor',
    coins: 1000000,
    price: 999.99,
    bonus: 250000,
    vipLevel: 6
  }
];

const mockGifts: Gift[] = [
  {
    id: 'dragon',
    name: 'Dragon',
    icon: '🐲',
    cost: 50000,
  },
  {
    id: 'lion',
    name: 'Lion',
    icon: '🦁',
    cost: 30000,
  },
  {
    id: 'tiger',
    name: 'Tiger',
    icon: '🐯',
    cost: 30000,
  },
  {
    id: 'cheetah',
    name: 'Cheetah',
    icon: '🐆',
    cost: 25000,
  },
  {
    id: 'rose',
    name: 'Rose',
    icon: '🌹',
    cost: 50,
  },
  {
    id: 'heart',
    name: 'Heart',
    icon: '❤️',
    cost: 100,
  },
];

interface Store {
  currentUser: User | null;
  currentRoom: Room | null;
  gifts: Gift[];
  coinPackages: CoinPackage[];
  welcomeUsers: WelcomeUser[];
  hasSeenWelcome: boolean;
  setCurrentRoom: (room: Room | null) => void;
  leaveRoom: () => void;
  purchaseCoins: (packageId: string, paymentMethod: Transaction['paymentMethod']) => Promise<void>;
  sendGift: (giftId: string) => void;
  startGame: (gameType: GameType) => void;
  updateUserMood: (mood: User['mood']) => void;
  updateUserEntrance: (entrance: User['entrance']) => void;
  setUserRank: (userId: string, rank: User['rank']) => void;
  setUserVIP: (userId: string, level: User['vipLevel']) => void;
  updateUserProfile: (profile: UserProfile) => void;
  setHasSeenWelcome: () => void;
}

export const useStore = create<Store>((set) => ({
  currentUser: mockUser,
  currentRoom: null,
  gifts: mockGifts,
  coinPackages: mockCoinPackages,
  welcomeUsers,
  hasSeenWelcome: false,
  
  setCurrentRoom: (room) => set({ currentRoom: room }),
  
  leaveRoom: () => set({ currentRoom: null }),
  
  purchaseCoins: async (packageId, paymentMethod) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const selectedPackage = mockCoinPackages.find(pkg => pkg.id === packageId);
    if (!selectedPackage) throw new Error('Invalid package');
    
    set((state) => {
      if (!state.currentUser) return state;
      
      const newCoins = state.currentUser.coins + selectedPackage.coins + (selectedPackage.bonus || 0);
      let vipLevel = state.currentUser.vipLevel;
      
      if (newCoins >= VIP_THRESHOLDS.VIP6) vipLevel = 6;
      else if (newCoins >= VIP_THRESHOLDS.VIP5) vipLevel = 5;
      else if (newCoins >= VIP_THRESHOLDS.VIP4) vipLevel = 4;
      else if (newCoins >= VIP_THRESHOLDS.VIP3) vipLevel = 3;
      else if (newCoins >= VIP_THRESHOLDS.VIP2) vipLevel = 2;
      else if (newCoins >= VIP_THRESHOLDS.VIP1) vipLevel = 1;
      
      return {
        currentUser: {
          ...state.currentUser,
          coins: newCoins,
          vipLevel
        }
      };
    });
  },
  
  sendGift: (giftId) => {
    const gift = mockGifts.find(g => g.id === giftId);
    if (!gift) return;
    
    set((state) => {
      if (!state.currentUser || state.currentUser.coins < gift.cost) return state;
      
      return {
        currentUser: {
          ...state.currentUser,
          coins: state.currentUser.coins - gift.cost
        }
      };
    });
  },

  startGame: (gameType) => {
    set((state) => {
      if (!state.currentRoom) return state;
      
      return {
        currentRoom: {
          ...state.currentRoom,
          gameType,
          gameState: {
            currentPlayer: state.currentRoom.host.id,
            board: null,
            scores: {}
          }
        }
      };
    });
  },

  updateUserMood: (mood) => {
    set((state) => ({
      currentUser: state.currentUser ? { ...state.currentUser, mood } : null
    }));
  },

  updateUserEntrance: (entrance) => {
    set((state) => ({
      currentUser: state.currentUser ? { ...state.currentUser, entrance } : null
    }));
  },

  setUserRank: (userId, rank) => {
    set((state) => {
      if (!state.currentUser) return state;
      if (state.currentUser.id === userId) {
        return {
          currentUser: { ...state.currentUser, rank }
        };
      }
      return state;
    });
  },

  setUserVIP: (userId, level) => {
    set((state) => {
      if (!state.currentUser) return state;
      if (state.currentUser.id === userId) {
        return {
          currentUser: { ...state.currentUser, vipLevel: level }
        };
      }
      return state;
    });
  },

  updateUserProfile: (profile) => {
    set((state) => ({
      currentUser: state.currentUser ? {
        ...state.currentUser,
        name: profile.name || state.currentUser.name,
        avatar: profile.avatar || state.currentUser.avatar
      } : null
    }));
  },

  setHasSeenWelcome: () => set({ hasSeenWelcome: true })
}));