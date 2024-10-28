export interface User {
  id: string;
  name: string;
  avatar: string;
  coins: number;
  isHost: boolean;
  vipLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  rank?: 'prince' | 'king' | 'emperor';
  mood?: 'laughing' | 'noisy' | 'dancing' | 'kiss' | 'normal';
  entrance?: 'car' | 'horse' | 'plane';
}

export interface Gift {
  id: string;
  name: string;
  icon: string;
  cost: number;
}

export type GameType = 'ludo' | 'anu' | null;

export interface Room {
  id: string;
  name: string;
  host: User;
  participants: User[];
  isLive: boolean;
  gameType?: GameType;
  gameState?: {
    currentPlayer?: string;
    board?: any;
    scores?: Record<string, number>;
  };
}

export interface CoinPackage {
  id: string;
  coins: number;
  price: number;
  bonus?: number;
  vipLevel?: number;
}

export interface Transaction {
  id: string;
  userId: string;
  packageId: string;
  amount: number;
  platformFee: number;
  createdAt: Date;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: 'paypal' | 'visa' | 'googlepay';
}

export const VIP_THRESHOLDS = {
  VIP1: 10000,
  VIP2: 50000,
  VIP3: 100000,
  VIP4: 250000,
  VIP5: 500000,
  VIP6: 1000000
};

export const RANK_BADGES = {
  prince: '👑',
  king: '👑👑',
  emperor: '👑👑👑'
};

export const MOOD_EMOJIS = {
  laughing: '😂',
  noisy: '🗣️',
  dancing: '💃',
  kiss: '💋',
  normal: '😊'
};

export const ENTRANCE_EFFECTS = {
  car: '🚗',
  horse: '🐎',
  plane: '✈️'
};