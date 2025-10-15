
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useGamification } from '@/components/providers/gamification-provider';
import { useLanguage } from '@/hooks/useLanguage';
import { Trophy, Award, Medal } from 'lucide-react';

const getLeaderIcon = (position: number) => {
  if (position === 1) {
    return <Trophy className="h-5 w-5 text-amber-500" />;
  } else if (position === 2) {
    return <Award className="h-5 w-5 text-slate-400" />;
  } else if (position === 3) {
    return <Medal className="h-5 w-5 text-amber-700" />;
  }
  return null;
};

const Leaderboard = () => {
  const { leaderboard, userRank } = useGamification();
  const { language } = useLanguage();
  
  const renderLeaderboardEntry = (entry: any, index: number) => {
    const isCurrentUser = entry.id === 'user';
    const isTopThree = index < 3;
    
    return (
      <div 
        key={entry.id}
        className={`flex items-center gap-3 p-3 rounded-lg ${
          isCurrentUser ? 'bg-cloud/10 dark:bg-cloud/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
        } transition-colors`}
      >
        <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
          isTopThree 
            ? index === 0 
              ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300' 
              : index === 1 
                ? 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300' 
                : 'bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
            : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
        }`}>
          {isTopThree ? getLeaderIcon(index + 1) : entry.position}
        </div>
        
        <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700">
          <AvatarImage src={entry.avatar} alt={entry.name} />
          <AvatarFallback>
            {entry.name.split(' ').map((n: string) => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium truncate text-slate-800 dark:text-slate-200">
              {entry.name}
            </h3>
            {isCurrentUser && (
              <Badge variant="outline" className="bg-cloud/10 text-cloud dark:bg-cloud/20 border-0 text-[10px] py-0">
                {language === 'ar' ? 'أنت' : 'You'}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Trophy className="h-3 w-3" />
            <span>{entry.badges} {language === 'ar' ? 'شارات' : 'badges'}</span>
          </div>
        </div>
        
        <div className="font-bold text-cloud">
          {entry.points.toLocaleString()}
        </div>
      </div>
    );
  };
  
  return (
    <Card className="border border-cloud/10 hover:border-cloud/30 transition-all duration-300">
      <CardHeader className="pb-3 bg-gradient-to-r from-cloud/5 to-transparent dark:from-cloud/10 dark:to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-cloud" />
            <CardTitle className="text-lg">
              {language === 'ar' ? 'لوحة المتصدرين' : 'Leaderboard'}
            </CardTitle>
          </div>
          <Badge variant="outline" className="bg-cloud/10 text-cloud dark:bg-cloud/20 border-0">
            {language === 'ar' ? `ترتيبك: ${userRank}` : `Your Rank: ${userRank}`}
          </Badge>
        </div>
        <CardDescription>
          {language === 'ar' ? 'أفضل الطلاب أداءً في المنصة' : 'Top performing students in the platform'}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          {leaderboard.slice(0, 10).map((entry, index) => renderLeaderboardEntry(entry, index))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
