
import React from 'react';
import StudentSidebar from '@/components/StudentSidebar';
import { useLanguage } from '@/hooks/useLanguage';
import StudentPoints from '@/components/gamification/StudentPoints';
import StudentBadges from '@/components/gamification/StudentBadges';
import Leaderboard from '@/components/gamification/Leaderboard';
import { Button } from '@/components/ui/button';
import { useGamification } from '@/components/providers/gamification-provider';
import { useToast } from '@/components/ui/use-toast';
import { Award, BookOpen, Trophy, BadgeCheck } from 'lucide-react';

const Gamification = () => {
  const { language } = useLanguage();
  const { addPoints, unlockBadge } = useGamification();
  const { toast } = useToast();
  
  const isArabic = language === 'ar';
  
  const handleEarnPoints = () => {
    // في تطبيق حقيقي، سيحدث هذا عند إكمال الأنشطة
    const earned = Math.floor(Math.random() * 50) + 10;
    addPoints(earned);
    
    toast({
      title: isArabic ? 'مبروك!' : 'Congratulations!',
      description: isArabic 
        ? `لقد ربحت ${earned} نقطة لإكمال النشاط!` 
        : `You've earned ${earned} points for completing an activity!`,
      variant: 'default',
    });
  };

  const handleUnlockBadge = () => {
    unlockBadge('assignment_streak');
    toast({
      title: isArabic ? 'شارة جديدة!' : 'New Badge!',
      description: isArabic 
        ? 'لقد ألغيت قفل شارة "سيد المتابعة"!' 
        : 'You\'ve unlocked the "Streak Master" badge!',
      variant: 'default',
    });
  };
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <StudentSidebar />
      
      <main className="flex-1 p-4 md:p-6 overflow-auto md:ml-64 rtl:md:ml-0 rtl:md:mr-64">
        <div className="max-w-7xl mx-auto">
          {/* رأس الصفحة */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-cloud-dark dark:text-white mb-2">
              {isArabic ? 'نظام التحفيز' : 'Gamification System'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              {isArabic 
                ? 'اجمع النقاط، وافتح الشارات، وتنافس مع زملائك!' 
                : 'Collect points, unlock badges, and compete with your peers!'}
            </p>
          </div>
          
          {/* مكون النقاط */}
          <div className="mb-6">
            <StudentPoints />
          </div>
          
          {/* أزرار العرض التوضيحي */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Button onClick={handleEarnPoints} className="bg-gradient-to-r from-cloud to-cloud-dark hover:from-cloud-dark hover:to-cloud">
              <BookOpen className="h-4 w-4 mr-2" />
              {isArabic ? 'محاكاة ربح النقاط' : 'Simulate Earning Points'}
            </Button>
            
            <Button onClick={handleUnlockBadge} variant="outline" className="border-cloud text-cloud hover:bg-cloud/10">
              <BadgeCheck className="h-4 w-4 mr-2" />
              {isArabic ? 'محاكاة فتح شارة' : 'Simulate Unlocking Badge'}
            </Button>
            
            <Button variant="secondary">
              <Award className="h-4 w-4 mr-2" />
              {isArabic ? 'عرض جميع الإنجازات' : 'View All Achievements'}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* قسم الشارات - يأخذ 2/3 من المساحة */}
            <div className="lg:col-span-2">
              <StudentBadges />
            </div>
            
            {/* قسم لوحة المتصدرين - يأخذ 1/3 من المساحة */}
            <div className="lg:col-span-1">
              <Leaderboard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Gamification;
