import { type FC, useEffect, useRef, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FeaturesSection: FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  const features = [
    {
      icon: LucideIcons.BookOpen,
      title: {
        ar: 'إدارة المقررات',
        en: 'Course Management'
      },
      description: {
        ar: 'إنشاء وتحديث وإدارة المقررات الدراسية بسهولة مع تحكم كامل في محتوى المنهج.',
        en: 'Create, update and manage your courses with complete control over curriculum content and structure.'
      }
    },
    {
      icon: LucideIcons.Video,
      title: {
        ar: 'قاعات افتراضية',
        en: 'Virtual Classrooms'
      },
      description: {
        ar: 'إنشاء وإدارة المحاضرات المباشرة والفصول الافتراضية مع ميزات تفاعلية متكاملة.',
        en: 'Create and manage live lectures and virtual classrooms with comprehensive interactive features.'
      }
    },
    {
      icon: LucideIcons.ClipboardCheck,
      title: {
        ar: 'تقييم الطلاب',
        en: 'Student Assessment'
      },
      description: {
        ar: 'إنشاء وتصحيح الاختبارات والواجبات مع أدوات متقدمة لتقييم أداء الطلاب.',
        en: 'Create and grade exams and assignments with advanced tools for evaluating student performance.'
      }
    },
    {
      icon: LucideIcons.MessageSquare,
      title: {
        ar: 'التواصل الفعال',
        en: 'Effective Communication'
      },
      description: {
        ar: 'أدوات تواصل متعددة للتفاعل مع الطلاب وإرسال الإشعارات والملاحظات المهمة.',
        en: 'Multiple communication tools for interacting with students and sending important notifications and remarks.'
      }
    },
    {
      icon: LucideIcons.BarChart3,
      title: {
        ar: 'تحليلات الأداء',
        en: 'Performance Analytics'
      },
      description: {
        ar: 'عرض إحصائيات ورسوم بيانية عن أداء الطلاب وفعالية المقررات لاتخاذ قرارات مبنية على البيانات.',
        en: 'Display statistics and graphs about student performance and course effectiveness for data-driven decisions.'
      }
    },
    {
      icon: LucideIcons.Cloud,
      title: {
        ar: 'التخزين السحابي',
        en: 'Cloud Storage'
      },
      description: {
        ar: 'تخزين جميع المواد التعليمية والبيانات في السحابة مع نسخ احتياطية آمنة ووصول من أي مكان.',
        en: 'Store all teaching materials and data in the cloud with secure backups and access from anywhere.'
      }
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeenVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const FeatureCard = ({ feature, index, isArabic }) => {
    const gradientColors = [
      'from-blue-50 to-blue-50/50 dark:from-blue-900/20 dark:to-blue-900/10',
      'from-green-50 to-green-50/50 dark:from-green-900/20 dark:to-green-900/10',
      'from-purple-50 to-purple-50/50 dark:from-purple-900/20 dark:to-purple-900/10',
      'from-amber-50 to-amber-50/50 dark:from-amber-900/20 dark:to-amber-900/10',
      'from-pink-50 to-pink-50/50 dark:from-pink-900/20 dark:to-pink-900/10',
      'from-cyan-50 to-cyan-50/50 dark:from-cyan-900/20 dark:to-cyan-900/10'
    ];
    
    const iconColors = [
      'text-blue-600 dark:text-blue-400',
      'text-green-600 dark:text-green-400',
      'text-purple-600 dark:text-purple-400',
      'text-amber-600 dark:text-amber-400',
      'text-pink-600 dark:text-pink-400',
      'text-cyan-600 dark:text-cyan-400'
    ];
    
    const badgeColors = [
      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300'
    ];
    
    const colorIndex = index % 6;
    
    return (
      <Card 
        className={cn(
          "transform transition-all duration-300 group",
          "border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl",
          "hover:border-cloud dark:hover:border-cloud-light hover:-translate-y-1",
          "bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm"
        )}
      >
        <CardHeader className={`bg-gradient-to-br ${gradientColors[colorIndex]} p-6 group-hover:bg-opacity-70 transition-all duration-300`}>
          <div className="flex items-center gap-6">
            <div className={`p-3 rounded-lg shrink-0 ${badgeColors[colorIndex].split(' ')[0]} transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
              <feature.icon className={`h-8 w-8 ${iconColors[colorIndex]} transform transition-transform duration-300 group-hover:-rotate-3`} />
            </div>
            <div className="flex flex-col text-left">
              <CardTitle className={cn(
                "text-xl font-bold text-cloud-dark dark:text-white mb-2 transition-colors duration-300",
                isArabic && "rtl-text"
              )}>
                {feature.title[language]}
              </CardTitle>
              
              <CardDescription className={cn(
                "text-base transition-colors duration-300",
                isArabic && "rtl-text"
              )}>
                {feature.description[language]}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  };

  return (
    <section 
      id="features" 
      className={cn(
        "py-16 md:py-24 bg-gradient-to-br from-slate-50 via-blue-50/10 to-slate-50 dark:from-slate-900 dark:via-blue-900/10 dark:to-slate-900 relative overflow-hidden",
        "transform transition-all duration-700",
        hasBeenVisible ? "opacity-100" : "opacity-0"
      )}
      ref={sectionRef}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/20 bg-[length:20px_20px] [mask-image:radial-gradient(white,transparent_85%)]" />
      
      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Circle */}
        <div className="absolute -right-20 -top-20 w-72 h-72 bg-cloud/5 dark:bg-cloud-dark/5 rounded-full blur-3xl" />
        <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-cloud/5 dark:bg-cloud-dark/5 rounded-full blur-3xl" />
        
        {/* Small Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-6 h-6 bg-blue-400/10 dark:bg-blue-400/20 rounded-full animate-float" />
        <div className="absolute top-3/4 right-10 w-4 h-4 bg-purple-400/10 dark:bg-purple-400/20 rounded-full animate-float-delayed" />
        <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-green-400/10 dark:bg-green-400/20 rounded-full animate-float" />
        <div className="absolute top-1/3 right-1/4 w-5 h-5 bg-amber-400/10 dark:bg-amber-400/20 rounded-full animate-float-delayed" />
      </div>

      <div className="container px-4 mx-auto relative">
        {/* Header Section - Centered */}
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-16 w-full",
          "transform transition-all duration-500 delay-150",
          hasBeenVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        )}>
          <div className="flex justify-center items-center">
            <h2 className={cn(
              "text-4xl md:text-5xl font-bold bg-gradient-to-r from-cloud-dark via-cloud to-cloud-dark dark:from-cloud-light dark:via-cloud dark:to-cloud-light bg-clip-text text-transparent inline-block",
              isArabic && "rtl-text"
            )}>
              {isArabic ? 'مميزات منصة حسام التعليمية' : 'Hossam Educational Platform Features'}
            </h2>
          </div>
        </div>

        {/* Features Grid - 3x2 Layout */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.slice(0, 3).map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "transform transition-all duration-500",
                  hasBeenVisible 
                    ? "translate-y-0 opacity-100" 
                    : "translate-y-16 opacity-0"
                )}
                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              >
                <FeatureCard 
                  feature={feature}
                  index={index}
                  isArabic={isArabic}
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-8">
            {features.slice(3, 6).map((feature, index) => (
              <div
                key={index + 3}
                className={cn(
                  "transform transition-all duration-500",
                  hasBeenVisible 
                    ? "translate-y-0 opacity-100" 
                    : "translate-y-16 opacity-0"
                )}
                style={{ transitionDelay: `${(index + 4) * 100}ms` }}
              >
                <FeatureCard 
                  feature={feature}
                  index={index + 3}
                  isArabic={isArabic}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
