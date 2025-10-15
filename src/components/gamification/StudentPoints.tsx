
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useGamification } from '@/components/providers/gamification-provider';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/hooks/useLanguage';
import { Trophy, Badge } from 'lucide-react';

const StudentPoints = () => {
  const { points, level, badges } = useGamification();
  const { language } = useLanguage();
  const unlockedBadges = badges.filter(badge => badge.unlocked).length;
  
  return (
    <Card className="overflow-hidden border border-cloud/10 hover:border-cloud/30 transition-all duration-300 bg-gradient-to-br from-cloud/5 to-transparent dark:from-cloud/10 dark:to-transparent">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-cloud/10 p-3 rounded-full">
              <Trophy className="h-5 w-5 text-cloud" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                {language === 'ar' ? 'المستوى والنقاط' : 'Level & Points'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'ar' ? 'استمر في التعلم لكسب المزيد من النقاط' : 'Keep learning to earn more points'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-cloud/10 p-3 rounded-full">
              <Badge className="h-5 w-5 text-cloud" />
            </div>
            <div className="text-right">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                {language === 'ar' ? 'الشارات' : 'Badges'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {unlockedBadges}/{badges.length} {language === 'ar' ? 'مفتوحة' : 'unlocked'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-cloud text-white flex items-center justify-center font-bold text-lg">
                {level.current}
              </div>
              <div>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {language === 'ar' ? 'المستوى ' : 'Level '} {level.current}
                </span>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {language === 'ar' ? 'النقاط: ' : 'Points: '} {points}
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {level.nextLevel - points} {language === 'ar' ? 'نقطة للمستوى التالي' : 'points to next level'}
              </span>
            </div>
          </div>
          
          <div className="mt-2">
            <Progress value={level.progress} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentPoints;
