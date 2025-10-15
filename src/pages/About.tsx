
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/hooks/useLanguage';

const About = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gradient-to-b from-white to-cloud-light dark:from-slate-900 dark:to-slate-800 pt-16 pb-24">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cloud-dark via-cloud to-cloud-accent bg-clip-text text-transparent mb-6">
                {isArabic ? 'نبذة عن منصة حسام كلاود التعليمية' : 'About Hossam Cloud Learning Platform'}
              </h1>
              
              <div className="flex justify-center mb-8">
                <img 
                  src="/lovable-uploads/aef7f8c6-61d5-41a3-b814-935ab5d36765.png"
                  alt={isArabic ? "شعار منصة حسام كلاود" : "Hossam Cloud Logo"}
                  className="w-32 h-32 object-contain"
                />
              </div>
              
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
                {isArabic 
                  ? 'منصة حسام كلاود هي بيئة تعليمية جامعية متطورة تهدف إلى تمكين الطلاب وأعضاء هيئة التدريس من تحقيق النجاح والتفوق من خلال توفير أدوات تعليمية متقدمة وتجربة تفاعلية ملهمة.'
                  : 'Hossam Cloud is an advanced university educational environment, dedicated to empowering students and faculty to achieve success and excellence through innovative tools and an inspiring interactive experience.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-cloud-light dark:bg-slate-700 p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-3 text-cloud-dark dark:text-cloud-light">
                  {isArabic ? 'رؤيتنا' : 'Our Vision'}
                </h2>
                <p className="text-slate-700 dark:text-slate-300">
                  {isArabic 
                    ? 'رؤيتنا هي بناء منصة تعليمية جامعية رائدة تجمع بين الابتكار الرقمي وروح التعاون الأكاديمي، لنصنع بيئة تعليمية محفزة تدفع الجميع للنجاح.'
                    : 'Our vision is to build a leading university learning platform that blends digital innovation with academic collaboration, creating a motivating environment that drives everyone to succeed.'}
                </p>
              </div>
              
              <div className="bg-cloud-light dark:bg-slate-700 p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-3 text-cloud-dark dark:text-cloud-light">
                  {isArabic ? 'مهمتنا' : 'Our Mission'}
                </h2>
                <p className="text-slate-700 dark:text-slate-300">
                  {isArabic 
                    ? 'مهمتنا هي تمكين الطلاب وأعضاء هيئة التدريس عبر توفير أدوات تعليمية متطورة وسهلة الاستخدام تعزز التعلم، التعاون، والإبداع في كل يوم دراسي.'
                    : 'Our mission is to empower students and faculty by providing advanced, easy-to-use educational tools that foster learning, collaboration, and creativity every day.'}
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-center text-cloud-dark dark:text-cloud-light">
                {isArabic ? 'ما يميزنا' : 'What Makes Us Special'}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <h3 className="font-medium mb-2 text-cloud">
                    {isArabic ? 'تصميم متجاوب' : 'Responsive Design'}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {isArabic 
                      ? 'واجهة متوافقة مع جميع الأجهزة لضمان تجربة مستخدم متميزة.'
                      : 'Interface compatible with all devices to ensure an outstanding user experience.'}
                  </p>
                </div>
                
                <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <h3 className="font-medium mb-2 text-cloud">
                    {isArabic ? 'دعم كامل للغة العربية' : 'Full Arabic Support'}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {isArabic 
                      ? 'واجهة مستخدم كاملة باللغة العربية مع دعم الاتجاه من اليمين إلى اليسار.'
                      : 'Complete Arabic user interface with right-to-left direction support.'}
                  </p>
                </div>
                
                <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <h3 className="font-medium mb-2 text-cloud">
                    {isArabic ? 'طريقة عرض مظلمة' : 'Dark Mode'}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {isArabic 
                      ? 'خيار الوضع المظلم لتحسين تجربة القراءة وتقليل إجهاد العين.'
                      : 'Dark mode option to improve reading experience and reduce eye strain.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-center text-cloud-dark dark:text-cloud-light">
                {isArabic ? 'تقييمات المستخدمين' : 'User Reviews'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-cloud text-white rounded-full flex items-center justify-center font-bold mr-4">
                      {isArabic ? 'أ' : 'A'}
                    </div>
                    <div>
                      <h3 className="font-semibold">{isArabic ? 'أحمد محمد' : 'Ahmed Mohammed'}</h3>
                      <div className="flex text-yellow-400">
                        {'★'.repeat(5)}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    {isArabic 
                      ? 'منصة رائعة وسهلة الاستخدام. أحب كيف يمكنني الوصول إلى جميع المواد الدراسية بسهولة.'
                      : 'Great and user-friendly platform. I love how I can easily access all study materials.'}
                  </p>
                </div>
                
                <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-cloud text-white rounded-full flex items-center justify-center font-bold mr-4">
                      {isArabic ? 'س' : 'S'}
                    </div>
                    <div>
                      <h3 className="font-semibold">{isArabic ? 'سارة عبدالله' : 'Sara Abdullah'}</h3>
                      <div className="flex text-yellow-400">
                        {'★'.repeat(4)}{'☆'.repeat(1)}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    {isArabic 
                      ? 'وصول سريع للمقررات وسهولة في التنقل بين أقسام المنصة. تجربة تعليمية متميزة.'
                      : 'Quick access to courses and ease of navigation between platform sections. An outstanding educational experience.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
