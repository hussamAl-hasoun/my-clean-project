
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGamification } from '@/components/providers/gamification-provider';
import { useLanguage } from '@/hooks/useLanguage';
import { Badge as BadgeIcon, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const StudentBadges = () => {
  const { badges } = useGamification();
  const { language } = useLanguage();
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  
  const badgesByCategory = {
    academic: badges.filter(badge => badge.category === 'academic'),
    participation: badges.filter(badge => badge.category === 'participation'),
    achievement: badges.filter(badge => badge.category === 'achievement'),
  };
  
  const handleBadgeClick = (id: string) => {
    setSelectedBadge(id === selectedBadge ? null : id);
  };
  
  return (
    <Card className="border border-cloud/10 hover:border-cloud/30 transition-all duration-300">
      <CardHeader className="pb-3 bg-gradient-to-r from-cloud/5 to-transparent dark:from-cloud/10 dark:to-transparent">
        <div className="flex items-center gap-2">
          <BadgeIcon className="h-5 w-5 text-cloud" />
          <CardTitle className="text-lg">
            {language === 'ar' ? 'شارات الإنجاز' : 'Achievement Badges'}
          </CardTitle>
        </div>
        <CardDescription>
          {language === 'ar' ? 'اجمع الشارات وافتح المزيد من الإنجازات' : 'Collect badges and unlock more achievements'}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="all">
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="all">
              {language === 'ar' ? 'الكل' : 'All'}
            </TabsTrigger>
            <TabsTrigger value="academic">
              {language === 'ar' ? 'أكاديمي' : 'Academic'}
            </TabsTrigger>
            <TabsTrigger value="participation">
              {language === 'ar' ? 'المشاركة' : 'Participation'}
            </TabsTrigger>
            <TabsTrigger value="achievement">
              {language === 'ar' ? 'الإنجازات' : 'Achievements'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {badges.map(badge => (
                <div 
                  key={badge.id}
                  className={`relative cursor-pointer group transition-all duration-300 ${
                    selectedBadge === badge.id ? 'ring-2 ring-cloud' : ''
                  }`}
                  onClick={() => handleBadgeClick(badge.id)}
                >
                  <div className={`relative rounded-lg p-4 flex flex-col items-center text-center ${
                    badge.unlocked 
                      ? 'bg-white dark:bg-slate-800' 
                      : 'bg-slate-100 dark:bg-slate-800/50'
                  }`}>
                    <div className="relative">
                      <img 
                        src={badge.image} 
                        alt={badge.name} 
                        className={`w-16 h-16 mx-auto transition-transform duration-300 group-hover:scale-110 ${
                          !badge.unlocked ? 'opacity-40 grayscale' : ''
                        }`}
                      />
                      {!badge.unlocked && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock className="h-6 w-6 text-slate-500" />
                        </div>
                      )}
                    </div>
                    <h3 className={`mt-2 font-medium text-sm ${
                      badge.unlocked ? 'text-slate-800 dark:text-slate-200' : 'text-slate-500'
                    }`}>
                      {badge.name}
                    </h3>
                    {selectedBadge === badge.id && (
                      <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        {badge.description}
                        
                        {!badge.unlocked && badge.requiredPoints && (
                          <div className="mt-1 font-medium text-slate-600 dark:text-slate-300">
                            {language === 'ar' 
                              ? `مطلوب ${badge.requiredPoints} نقطة` 
                              : `Requires ${badge.requiredPoints} points`}
                          </div>
                        )}
                      </div>
                    )}
                    {badge.unlocked && (
                      <Badge className="mt-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-0">
                        {language === 'ar' ? 'مفتوح' : 'Unlocked'}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="academic" className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {badgesByCategory.academic.map(badge => (
                <div 
                  key={badge.id}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    selectedBadge === badge.id ? 'ring-2 ring-cloud' : ''
                  }`}
                  onClick={() => handleBadgeClick(badge.id)}
                >
                  {/* Same badge rendering as "all" tab */}
                  <div className={`relative rounded-lg p-4 flex flex-col items-center text-center ${
                    badge.unlocked 
                      ? 'bg-white dark:bg-slate-800' 
                      : 'bg-slate-100 dark:bg-slate-800/50'
                  }`}>
                    <div className="relative">
                      <img 
                        src={badge.image} 
                        alt={badge.name} 
                        className={`w-16 h-16 mx-auto ${!badge.unlocked ? 'opacity-40 grayscale' : ''}`}
                      />
                      {!badge.unlocked && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock className="h-6 w-6 text-slate-500" />
                        </div>
                      )}
                    </div>
                    <h3 className={`mt-2 font-medium text-sm ${
                      badge.unlocked ? 'text-slate-800 dark:text-slate-200' : 'text-slate-500'
                    }`}>
                      {badge.name}
                    </h3>
                    {selectedBadge === badge.id && (
                      <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        {badge.description}
                      </div>
                    )}
                    {badge.unlocked && (
                      <Badge className="mt-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-0">
                        {language === 'ar' ? 'مفتوح' : 'Unlocked'}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="participation" className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {badgesByCategory.participation.map(badge => (
                <div 
                  key={badge.id}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    selectedBadge === badge.id ? 'ring-2 ring-cloud' : ''
                  }`}
                  onClick={() => handleBadgeClick(badge.id)}
                >
                  {/* Same badge rendering as "all" tab */}
                  <div className={`relative rounded-lg p-4 flex flex-col items-center text-center ${
                    badge.unlocked 
                      ? 'bg-white dark:bg-slate-800' 
                      : 'bg-slate-100 dark:bg-slate-800/50'
                  }`}>
                    <div className="relative">
                      <img 
                        src={badge.image} 
                        alt={badge.name} 
                        className={`w-16 h-16 mx-auto ${!badge.unlocked ? 'opacity-40 grayscale' : ''}`}
                      />
                      {!badge.unlocked && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock className="h-6 w-6 text-slate-500" />
                        </div>
                      )}
                    </div>
                    <h3 className={`mt-2 font-medium text-sm ${
                      badge.unlocked ? 'text-slate-800 dark:text-slate-200' : 'text-slate-500'
                    }`}>
                      {badge.name}
                    </h3>
                    {selectedBadge === badge.id && (
                      <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        {badge.description}
                      </div>
                    )}
                    {badge.unlocked && (
                      <Badge className="mt-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-0">
                        {language === 'ar' ? 'مفتوح' : 'Unlocked'}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="achievement" className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {badgesByCategory.achievement.map(badge => (
                <div 
                  key={badge.id}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    selectedBadge === badge.id ? 'ring-2 ring-cloud' : ''
                  }`}
                  onClick={() => handleBadgeClick(badge.id)}
                >
                  {/* Same badge rendering as "all" tab */}
                  <div className={`relative rounded-lg p-4 flex flex-col items-center text-center ${
                    badge.unlocked 
                      ? 'bg-white dark:bg-slate-800' 
                      : 'bg-slate-100 dark:bg-slate-800/50'
                  }`}>
                    <div className="relative">
                      <img 
                        src={badge.image} 
                        alt={badge.name} 
                        className={`w-16 h-16 mx-auto ${!badge.unlocked ? 'opacity-40 grayscale' : ''}`}
                      />
                      {!badge.unlocked && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock className="h-6 w-6 text-slate-500" />
                        </div>
                      )}
                    </div>
                    <h3 className={`mt-2 font-medium text-sm ${
                      badge.unlocked ? 'text-slate-800 dark:text-slate-200' : 'text-slate-500'
                    }`}>
                      {badge.name}
                    </h3>
                    {selectedBadge === badge.id && (
                      <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        {badge.description}
                      </div>
                    )}
                    {badge.unlocked && (
                      <Badge className="mt-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-0">
                        {language === 'ar' ? 'مفتوح' : 'Unlocked'}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StudentBadges;
