
import { Badge, LeaderboardEntry } from '@/types/gamification';

// بيانات الشارات الافتراضية
export const defaultBadges: Badge[] = [
  {
    id: 'first_login',
    name: 'First Day',
    description: 'Logged into the platform for the first time',
    image: '/badges/first-login.svg',
    unlocked: true,
    category: 'participation',
  },
  {
    id: 'assignment_streak',
    name: 'Streak Master',
    description: 'Completed 5 assignments in a row on time',
    image: '/badges/streak.svg',
    unlocked: false,
    category: 'academic',
    requiredPoints: 500,
  },
  {
    id: 'perfect_score',
    name: 'Perfect Score',
    description: 'Achieved 100% on an assessment',
    image: '/badges/perfect.svg',
    unlocked: false,
    category: 'academic',
    requiredPoints: 1000,
  },
  {
    id: 'forum_contributor',
    name: 'Helper',
    description: 'Answered 10 questions in the forum',
    image: '/badges/helper.svg',
    unlocked: false,
    category: 'participation',
    requiredPoints: 750,
  },
  {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Submitted 3 assignments before the deadline',
    image: '/badges/early-bird.svg',
    unlocked: false,
    category: 'academic',
    requiredPoints: 300,
  },
  {
    id: 'knowledge_seeker',
    name: 'Knowledge Seeker',
    description: 'Accessed learning materials in all courses',
    image: '/badges/seeker.svg',
    unlocked: false,
    category: 'participation',
    requiredPoints: 400,
  },
  {
    id: 'gold_scholar',
    name: 'Gold Scholar',
    description: 'Maintained an A average across all courses',
    image: '/badges/scholar.svg',
    unlocked: false,
    category: 'achievement',
    requiredPoints: 2000,
  },
];

// بيانات لوحة المتصدرين الافتراضية
export const defaultLeaderboard: LeaderboardEntry[] = [
  { id: '1', name: 'Sara Ahmed', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120', points: 2450, badges: 6 },
  { id: '2', name: 'Mohammed Ali', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=120', points: 2280, badges: 5 },
  { id: '3', name: 'Fatima Khan', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120', points: 2150, badges: 5 },
  { id: '4', name: 'Ahmed Hassan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120', points: 1920, badges: 4 },
  { id: '5', name: 'Aisha Malik', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120', points: 1820, badges: 4 },
  { id: 'user', name: 'John Smith', avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=120', points: 1450, badges: 3 },
  { id: '6', name: 'Yousef Saleh', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120', points: 1380, badges: 3 },
  { id: '7', name: 'Layla Hamed', avatar: 'https://images.unsplash.com/photo-1544263241-b2a695745765?auto=format&fit=crop&q=80&w=120', points: 1250, badges: 3 },
  { id: '8', name: 'Omar Qasim', avatar: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=120', points: 1120, badges: 2 },
  { id: '9', name: 'Hana Rahman', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=120', points: 980, badges: 2 },
];
