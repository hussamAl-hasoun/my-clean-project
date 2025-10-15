
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

// قائمة الصور للمقررات
const courseImages = [
  // صور البرمجة والتطوير
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&q=80&w=1200",
  
  // صور الحوسبة السحابية
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200",
  
  // صور الذكاء الاصطناعي والبيانات
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&q=80&w=1200",
  
  // صور الشبكات والأمن السيبراني
  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1567030889431-c968bb27da3b?auto=format&fit=crop&q=80&w=1200"
];

// دالة لاختيار صورة عشوائية
const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * courseImages.length);
  return courseImages[randomIndex];
};

// Course data organized by levels
const levelsData = {
  "المستوى الأول": [
    { code: "ITCP101", title: "مقدمة في برمجة الحاسب", image: getRandomImage() },
    { code: "AHEC101", title: "الكتابة الأكاديمية والتواصل", image: getRandomImage() },
    { code: "AHEC102", title: "التخطيط الأكاديمي للطالب", image: getRandomImage() },
    { code: "AHEE101", title: "اللغة الإنجليزية للعلوم ١", image: getRandomImage() },
    { code: "AHEE102", title: "اللغة الإنجليزية للعلوم ٢", image: getRandomImage() },
    { code: "ITBS105", title: "مقدمة في الحوسبة السحابية", image: getRandomImage() },
    { code: "AHE103", title: "أخلاقيات المهنة", image: getRandomImage() },
    { code: "ITBS103", title: "المعلومات التقنية الأساسية", image: getRandomImage() },
    { code: "ITBS104", title: "هندسة الحاسب", image: getRandomImage() },
    { code: "ITBS106", title: "هياكل البيانات", image: getRandomImage() },
    { code: "ITCL101", title: "أساسيات الخدمات السحابية", image: getRandomImage() },
    // مقررات جديدة
    { code: "ITAI101", title: "مقدمة في الذكاء الاصطناعي", image: getRandomImage() },
    { code: "ITWD101", title: "أساسيات تطوير الويب", image: getRandomImage() },
    { code: "ITCL102", title: "الحوسبة الخضراء والاستدامة", image: getRandomImage() },
    { code: "ITMS101", title: "أمن الأجهزة المحمولة الأساسي", image: getRandomImage() },
    { code: "ITGA101", title: "مقدمة في تطوير الألعاب", image: getRandomImage() },
  ],
  "المستوى الثاني": [
    { code: "AHEE201", title: "اللغة الإنجليزية للعلوم ٣", image: getRandomImage() },
    { code: "ITBS207", title: "مهارات الاتصال", image: getRandomImage() },
    { code: "ITCL201", title: "البرمجة الأساسية للسحابة", image: getRandomImage() },
    { code: "IL202", title: "أنظمة التشغيل", image: getRandomImage() },
    { code: "ITCL202", title: "الشبكات السحابية", image: getRandomImage() },
    { code: "ITCL203", title: "قواعد البيانات السحابية", image: getRandomImage() },
    { code: "ITCL204", title: "أمن السحابة", image: getRandomImage() },
    { code: "ITCL205", title: "تطوير تطبيقات السحابة", image: getRandomImage() },
    { code: "ITDA201", title: "تحليل البيانات", image: getRandomImage() },
    { code: "ITGA201", title: "تطوير الألعاب باستخدام السحابة", image: getRandomImage() },
    { code: "ITAI201", title: "الذكاء الاصطناعي للشركات", image: getRandomImage() },
    { code: "ITMS201", title: "أمن التطبيقات المتقدم", image: getRandomImage() },
  ],
  "المستوى الثالث": [
    { code: "ITCL301", title: "إدارة المحتوى السحابي", image: getRandomImage() },
    { code: "ITCL302", title: "ربط الشبكات في السحابة", image: getRandomImage() },
    { code: "ITCL303", title: "تخزين البيانات السحابية", image: getRandomImage() },
    { code: "ITCL304", title: "تطوير الخدمات السحابية", image: getRandomImage() },
    { code: "ITCL305", title: "الحاويات والتوزيع", image: getRandomImage() },
    { code: "ITCL306", title: "إدارة الموارد السحابية", image: getRandomImage() },
    { code: "ITCL307", title: "أتمتة السحابة", image: getRandomImage() },
    { code: "ITCL308", title: "تطبيقات السحابة", image: getRandomImage() },
    { code: "ITED301", title: "تقنيات حافة الشبكة", image: getRandomImage() },
    { code: "ITML301", title: "أخلاقيات الذكاء الاصطناعي", image: getRandomImage() },
    { code: "ITDC301", title: "الحوسبة الموزعة والتخزين السحابي", image: getRandomImage() },
    { code: "ITAI301", title: "الذكاء الاصطناعي للرؤية الحاسوبية", image: getRandomImage() },
    { code: "ITRD301", title: "تطوير الروبوتات السحابية المتقدم", image: getRandomImage() },
  ],
  "المستوى الرابع": [
    { code: "ITCL401", title: "تحليل التكلفة للسحابة", image: getRandomImage() },
    { code: "ITCL402", title: "DevOps للسحابة", image: getRandomImage() },
    { code: "ITCL403", title: "إدارة المشاريع السحابية", image: getRandomImage() },
    { code: "ITCL404", title: "تطوير التطبيقات الموزعة", image: getRandomImage() },
    { code: "ITCL405", title: "أمن السحابة المتقدم", image: getRandomImage() },
    { code: "ITCL406", title: "الذكاء الاصطناعي في السحابة", image: getRandomImage() },
    { code: "ITCL407", title: "مشروع التخرج ١", image: getRandomImage() },
    { code: "ITCL408", title: "مشروع التخرج ٢", image: getRandomImage() },
    { code: "ITQC401", title: "الحوسبة الكمية", image: getRandomImage() },
    { code: "ITAI401", title: "تطبيقات عملية للذكاء الاصطناعي", image: getRandomImage() },
    { code: "ITCD401", title: "تطوير التطبيقات السحابية المتقدمة", image: getRandomImage() },
    { code: "ITCT401", title: "الحوسبة السحابية للإنترنت اللامركزي", image: getRandomImage() },
    { code: "ITES401", title: "أمن الحافة وإنترنت الأشياء", image: getRandomImage() }
  ]
};

const CourseSection = () => {
  const [activeTab, setActiveTab] = useState("المستوى الأول");
  const { language } = useLanguage();

  const getTranslatedText = (arabicText, englishText) => {
    return language === 'ar' ? arabicText : englishText;
  };

  return (
    <section className="py-16 md:py-24 bg-cloud-light/50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-cloud-dark dark:text-white mb-4">
            {getTranslatedText('المنهج الأكاديمي', 'Academic Curriculum')}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            {getTranslatedText('استكشف مخطط المقررات الشامل المنظم حسب المستويات الأكاديمية.', 
             'Explore the comprehensive course plan organized by academic levels.')}
          </p>
        </div>
        
        <Tabs defaultValue="المستوى الأول" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.keys(levelsData).map((level) => (
                <TabsTrigger 
                  key={level} 
                  value={level}
                  className="data-[state=active]:bg-cloud data-[state=active]:text-white dark:data-[state=active]:bg-cloud-dark"
                >
                  {getTranslatedText(level, 
                    level === "المستوى الأول" ? "Level One" : 
                    level === "المستوى الثاني" ? "Level Two" : 
                    level === "المستوى الثالث" ? "Level Three" : "Level Four")}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {Object.entries(levelsData).map(([level, courses]) => (
            <TabsContent key={level} value={level} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <Card key={course.code} className="overflow-hidden hover:border-cloud transition-colors group dark:border-slate-800">
                    <div 
                      className="h-40 bg-cover bg-center relative" 
                      style={{ backgroundImage: `url(${course.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-4 text-white">
                          <h3 className="font-bold text-lg">{course.code}</h3>
                          <p className="text-sm text-white/80">{course.title}</p>
                        </div>
                      </div>
                    </div>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 text-cloud mr-2" />
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {getTranslatedText('مقرر دراسي', 'Course')}
                          </span>
                        </div>
                        <Link to={`/courses/${course.code}`}>
                          <Button variant="outline" size="sm" className="group">
                            {getTranslatedText('عرض المقرر', 'View Course')} 
                            <ArrowRight className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform rotate-180" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-10 text-center">
                <Link to="/courses">
                  <Button variant="outline" size="lg" className="dark:border-slate-700 dark:text-white">
                    {getTranslatedText(`عرض جميع مقررات ${level}`, `View all courses in ${
                      level === "المستوى الأول" ? "Level One" : 
                      level === "المستوى الثاني" ? "Level Two" : 
                      level === "المستوى الثالث" ? "Level Three" : "Level Four"
                    }`)}
                    <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                  </Button>
                </Link>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default CourseSection;
