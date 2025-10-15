
export type Badge = {
  id: string;
  name: string;
  description: string;
  image: string;
  unlocked: boolean;
  category: 'academic' | 'participation' | 'achievement';
  requiredPoints?: number;
};

export type LeaderboardEntry = {
  id: string;
  name: string;
  avatar: string;
  points: number;
  badges: number;
  position?: number;
};

export type LevelInfo = {
  current: number;
  progress: number;
  nextLevel: number;
};

export type GamificationContextType = {
  points: number;
  addPoints: (amount: number) => void;
  badges: Badge[];
  unlockBadge: (badgeId: string) => void;
  leaderboard: LeaderboardEntry[];
  userRank: number;
  totalStudents: number;
  level: LevelInfo;
};
