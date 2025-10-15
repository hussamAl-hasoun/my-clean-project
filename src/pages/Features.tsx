import { type FC } from 'react';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Video, Users, MessageSquare, Bell, FileText, LifeBuoy, BarChart2 } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const Features: FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  // قائمة بالميزات
  const features = [
    {
      id: 1,
      icon: <BookOpen className="h-10 w-10 text-cloud dark:text-cloud-light" />,
      title: isArabic ? 'تجربة تعليمية متكاملة' : 'Comprehensive Learning Experience',
      description: isArabic 
        ? 'توفر المنصة بيئة تعليمية متكاملة تجمع بين المحتوى التعليمي والتفاعل مع الأساتذة والطلاب.'
        : 'Our platform provides a comprehensive learning environment that seamlessly integrates educational content with student-faculty interaction.'
    },
    {
      id: 2,
      icon: <Video className="h-10 w-10 text-cloud dark:text-cloud-light" />,
      title: isArabic ? 'محاضرات فيديو عالية الجودة' : 'High-Quality Video Lectures',
      description: isArabic
        ? 'استمتع بمشاهدة محاضرات فيديو عالية الجودة يمكن الوصول إليها في أي وقت ومن أي مكان.'
        : 'Access high-definition video lectures anytime, anywhere, with our state-of-the-art streaming technology.'
    },
    {
      id: 3,
      icon: <Users className="h-10 w-10 text-cloud dark:text-cloud-light" />,
      title: isArabic ? 'تعلم تعاوني' : 'Collaborative Learning',
      description: isArabic
        ? 'تعزيز التعلم التعاوني من خلال مجموعات الدراسة الافتراضية ومنتديات النقاش.'
        : 'Foster collaborative learning through virtual study groups and interactive discussion forums.'
    },
    {
      id: 4,
      icon: <FileText className="h-10 w-10 text-cloud dark:text-cloud-light" />,
      title: isArabic ? 'إدارة الواجبات والتقييمات' : 'Advanced Assessment Management',
      description: isArabic
        ? 'نظام متكامل لإدارة الواجبات والتقييمات مع تقديم ملاحظات فورية وتتبع التقدم.'
        : 'Comprehensive system for managing assignments and assessments with instant feedback and progress tracking.'
    },
    {
      id: 5,
      icon: <MessageSquare className="h-10 w-10 text-cloud dark:text-cloud-light" />,
      title: isArabic ? 'تواصل فعال' : 'Seamless Communication',
      description: isArabic
        ? 'أدوات تواصل متعددة تسهل التفاعل بين الطلاب والأساتذة بشكل فعال ومباشر.'
        : 'Multiple communication tools enabling efficient and direct interaction between students and professors.'
    },
    {
      id: 6,
      icon: <Bell className="h-10 w-10 text-cloud dark:text-cloud-light" />,
      title: isArabic ? 'إشعارات وتذكيرات' : 'Smart Notifications',
      description: isArabic
        ? 'نظام إشعارات متطور يبقيك على اطلاع بآخر المستجدات والمواعيد المهمة.'
        : 'Advanced notification system keeping you informed of updates and important deadlines in real-time.'
    },
    {
      id: 7,
      icon: <LifeBuoy className="h-10 w-10 text-cloud dark:text-cloud-light" />,
      title: isArabic ? 'دعم تقني سريع' : 'Fast Technical Support',
      description: isArabic
        ? 'فريق دعم متواجد دائماً لحل مشاكلك التقنية بسرعة واحترافية.'
        : 'Our support team is always available to solve your technical issues quickly and professionally.'
    },
    {
      id: 8,
      icon: <BarChart2 className="h-10 w-10 text-cloud dark:text-cloud-light" />,
      title: isArabic ? 'تقارير وتحليلات متقدمة' : 'Advanced Reports & Analytics',
      description: isArabic
        ? 'احصل على تقارير مفصلة حول تقدمك ومستوى تفاعلك مع المنصة.'
        : 'Get detailed reports about your progress and engagement on the platform.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-lg md:text-xl text-slate-800 dark:text-slate-100">
      <main>
        <section className="w-full bg-gradient-to-b from-cloud/5 to-slate-50 dark:from-cloud/10 dark:to-slate-900 py-10 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-cloud-dark dark:text-white">
            {isArabic ? 'مميزات المنصة' : 'Platform Features'}
          </h1>
          <p className="text-lg mb-4 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {isArabic 
              ? 'اكتشف المميزات الفريدة التي تجعل منصة حسام كلاود الخيار الأمثل للتعليم الإلكتروني'
              : 'Discover the unique features that make Hossam Cloud the premier choice for modern e-learning'
            }
          </p>
          <p className="text-base text-cloud-dark dark:text-cloud-light mb-4">
            {isArabic ? 'تعلم عصري، أدوات متطورة، ونجاح مضمون في منصة واحدة.' : 'Modern learning, advanced tools, and guaranteed success in one platform.'}
          </p>
        </section>
        <section className="max-w-7xl mx-auto px-4 mt-4">
          <div className="bg-white/60 dark:bg-slate-900/60 rounded-2xl shadow-lg p-4 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-10 gap-y-10 justify-items-center">
              {features.map((feature) => (
                <div key={feature.id} className="w-full max-w-xs p-8 flex flex-col items-center justify-between rounded-2xl shadow-md bg-white dark:bg-slate-800">
                  <div className="mb-5 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold mb-3 text-cloud-dark dark:text-white text-center">{feature.title}</h3>
                  <p className="text-lg text-center text-slate-600 dark:text-slate-300 font-medium max-w-xs mx-auto">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* قسم المميزات التفصيلية */}
        <div className="mt-12 px-2 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                {isArabic ? 'تجربة تعليمية متميزة' : 'Excellence in Education'}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                {isArabic 
                  ? 'تم تصميم منصة حسام كلاود لتوفير تجربة تعليمية متميزة تجمع بين سهولة الاستخدام والفعالية. توفر المنصة مجموعة متنوعة من الأدوات والميزات التي تساعد الطلاب على التعلم بشكل أفضل وأكثر فعالية.'
                  : 'Hossam Cloud is engineered to deliver an exceptional educational experience that combines intuitive usability with powerful functionality. Our platform offers a comprehensive suite of tools and features designed to enhance student learning and engagement.'
                }
              </p>
              <ul className="space-y-4">
                {[
                  {
                    ar: 'تعلم تفاعلي: أدوات متقدمة تعزز المشاركة والفهم',
                    en: 'Interactive Learning: Advanced tools promoting engagement and comprehension'
                  },
                  {
                    ar: 'مرونة الوصول: تعلم في أي وقت ومن أي مكان',
                    en: 'Flexible Access: Learn anytime, anywhere with our mobile-friendly platform'
                  },
                  {
                    ar: 'دعم مستمر: فريق دعم متخصص على مدار الساعة',
                    en: '24/7 Support: Dedicated support team always ready to assist'
                  }
                ].map((item, i) => (
                  <li key={i} className="flex items-start ml-6 rtl:mr-6">
                    <div className="bg-cloud/10 dark:bg-cloud-light/10 p-2 rounded-full mt-1 mr-3 rtl:ml-3 rtl:mr-0">
                      <div className="w-1 h-1 rounded-full bg-cloud dark:bg-cloud-light"></div>
                    </div>
                    <p className="text-lg font-medium text-slate-600 dark:text-slate-300">
                      {isArabic ? item.ar : item.en}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center items-center">
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80" 
                alt={isArabic ? "تجربة تعليمية متميزة" : "Excellence in Education"} 
                className="w-full h-64 rounded-xl object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
