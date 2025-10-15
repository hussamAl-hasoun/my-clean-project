
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Badge, LeaderboardEntry, GamificationContextType } from '@/types/gamification';
import { defaultBadges, defaultLeaderboard } from '@/data/gamificationData';
import { calculateLevel } from '@/utils/gamificationUtils';

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};

export { type Badge, type LeaderboardEntry };

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState<number>(1450);
  const [badges, setBadges] = useState<Badge[]>(defaultBadges);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(
    [...defaultLeaderboard].sort((a, b) => b.points - a.points).map((entry, index) => ({
      ...entry,
      position: index + 1
    }))
  );
  const [level, setLevel] = useState(calculateLevel(1450));
  
  // حساب مرتبة المستخدم في لوحة المتصدرين
  const userRank = leaderboard.findIndex(entry => entry.id === 'user') + 1;
  
  // فتح الشارات تلقائيًا بناءً على النقاط
  useEffect(() => {
    const updatedBadges = badges.map(badge => {
      if (!badge.unlocked && badge.requiredPoints && points >= badge.requiredPoints) {
        return { ...badge, unlocked: true };
      }
      return badge;
    });
    
    setBadges(updatedBadges);
    setLevel(calculateLevel(points));
  }, [points]);
  
  const addPoints = (amount: number) => {
    setPoints(prev => prev + amount);
    
    // تحديث لوحة المتصدرين
    const updatedLeaderboard = leaderboard.map(entry => {
      if (entry.id === 'user') {
        return { ...entry, points: points + amount };
      }
      return entry;
    }).sort((a, b) => b.points - a.points).map((entry, index) => ({
      ...entry,
      position: index + 1
    }));
    
    setLeaderboard(updatedLeaderboard);
  };
  
  const unlockBadge = (badgeId: string) => {
    const updatedBadges = badges.map(badge => {
      if (badge.id === badgeId) {
        return { ...badge, unlocked: true };
      }
      return badge;
    });
    
    setBadges(updatedBadges);
    
    // تحديث لوحة المتصدرين بعدد الشارات الجديد
    const unlockedBadges = updatedBadges.filter(badge => badge.unlocked).length;
    const updatedLeaderboard = leaderboard.map(entry => {
      if (entry.id === 'user') {
        return { ...entry, badges: unlockedBadges };
      }
      return entry;
    });
    
    setLeaderboard(updatedLeaderboard);
  };
  
  const value = {
    points,
    addPoints,
    badges,
    unlockBadge,
    leaderboard,
    userRank,
    totalStudents: leaderboard.length,
    level,
  };
  
  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
};
