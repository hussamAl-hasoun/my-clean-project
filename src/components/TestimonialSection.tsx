import { type FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent } from './ui/card';
import { useLanguage } from '@/hooks/useLanguage';

const TestimonialSection: FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const testimonials = [
    {
      id: 1,
      name: {
        ar: "خالد",
        en: "Khaled"
      },
      role: {
        ar: "طالب، علوم الحاسب",
        en: "Student, Computer Science"
      },
      content: {
        ar: "لقد غيرت منصة حسام السحابيه التعليمية تجربتي التعليمية بالكامل. الواجهة البديهية والوصول القائم على السحابة يجعل الدراسة وتقديم الواجبات أسهل بكثير.",
        en: "Hossam Cloud Educational Platform has completely transformed my learning experience. The intuitive interface and cloud-based access make studying and submitting assignments much easier."
      },
      avatar: {
        ar: "خ",
        en: "K"
      }
    },
    {
      id: 2,
      name: {
        ar: "أديب عبدالرحمن",
        en: "Adeeb Abdulrahman"
      },
      role: {
        ar: "أستاذ، الحوسبة السحابية",
        en: "Professor, Cloud Computing"
      },
      content: {
        ar: "كأستاذ، أقدر كيف تبسط المنصة إدارة المقررات والتقييم. تساعدني ميزات الإعلانات في إبقاء طلابي على اطلاع، ونظام تقديم الواجبات بديهي.",
        en: "As a professor, I appreciate how the platform simplifies course management and assessment. The announcement features help me keep my students informed, and the assignment submission system is intuitive."
      },
      avatar: {
        ar: "أع",
        en: "AA"
      }
    },
    {
      id: 3,
      name: {
        ar: "محمد ناصر",
        en: "Mohammed Nasser"
      },
      role: {
        ar: "طالب، علم البيانات",
        en: "Student, Data Science"
      },
      content: {
        ar: "أحب كيف يمكنني الوصول إلى جميع مواد المقرر من أي مكان. تساعدني ميزات تتبع الدرجات والتقويم في البقاء منظمة طوال الفصل الدراسي.",
        en: "I love how I can access all course materials from anywhere. The grade tracking and calendar features help me stay organized throughout the semester."
      },
      avatar: {
        ar: "من",
        en: "MN"
      }
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-cloud-dark dark:text-white mb-4">
            {isArabic ? 'ماذا يقول مستخدمونا' : 'What Our Users Say'}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            {isArabic 
              ? 'استمع إلى الطلاب والأساتذة الذين يستخدمون بالفعل منصة حسام كلاود التعليمية'
              : 'Hear from students and professors who are already using the Hossam Cloud Educational Platform'
            }
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow border-slate-200 dark:border-slate-700"
            >
              <CardContent className="p-6 relative">
                <div className="absolute -top-6 right-6">
                  <Avatar className="h-12 w-12 border-2 border-white dark:border-slate-800 shadow-sm">
                    <AvatarFallback className="bg-cloud dark:bg-cloud-light text-white dark:text-slate-900">
                      {isArabic ? testimonial.avatar.ar : testimonial.avatar.en}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="pt-6">
                  <blockquote className="text-slate-600 dark:text-slate-300 italic mb-4">
                    "{isArabic ? testimonial.content.ar : testimonial.content.en}"
                  </blockquote>
                  <div className="border-t border-slate-100 dark:border-slate-700 pt-4">
                    <p className="font-semibold text-cloud-dark dark:text-white">
                      {isArabic ? testimonial.name.ar : testimonial.name.en}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {isArabic ? testimonial.role.ar : testimonial.role.en}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
