
import { LevelInfo } from '@/types/gamification';

// حساب المستوى بناءً على النقاط
export const calculateLevel = (points: number): LevelInfo => {
  const basePoints = 1000;
  const currentLevel = Math.floor(points / basePoints) + 1;
  const nextLevelPoints = currentLevel * basePoints;
  const currentLevelPoints = (currentLevel - 1) * basePoints;
  const progress = ((points - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;
  
  return {
    current: currentLevel,
    progress: Math.min(progress, 100),
    nextLevel: nextLevelPoints,
  };
};
