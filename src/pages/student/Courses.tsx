
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import StudentSidebar from '@/components/StudentSidebar';
import { useLanguage } from '@/hooks/useLanguage';

const Courses = () => {
  const { language } = useLanguage();
  
  const courses = [
    { 
      id: 1, 
      code: "ITCL201", 
      title: language === 'ar' ? "البرمجة الأساسية للسحابة" : "Basic Programming for Cloud", 
      instructor: language === 'ar' ? "د. سارة الأحمد" : "Dr. Sarah Johnson",
      progress: 65, 
      students: 25,
      image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?auto=format&fit=crop&q=80&w=1200",
      nextClass: language === 'ar' ? "الأحد، 15 مايو، 10:00 ص" : "Sunday, May 15, 10:00 AM",
      description: language === 'ar' ? "مقدمة في تطوير تطبيقات السحابة وأساسيات البرمجة للمبتدئين باستخدام أحدث التقنيات." : "Introduction to cloud application development and programming basics for beginners using the latest technologies."
    },
    { 
      id: 2, 
      code: "ITBS106", 
      title: language === 'ar' ? "هياكل البيانات" : "Data Structures", 
      instructor: language === 'ar' ? "د. خالد المهندس" : "Dr. Khalid Al-Muhandis",
      progress: 42, 
      students: 30,
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=1200",
      nextClass: language === 'ar' ? "الاثنين، 16 مايو، 1:30 م" : "Monday, May 16, 1:30 PM",
      description: language === 'ar' ? "دراسة هياكل البيانات المتقدمة والخوارزميات الأساسية لتنظيم وتخزين البيانات." : "Study of advanced data structures and fundamental algorithms for organizing and storing data."
    },
    { 
      id: 3, 
      code: "AHEC102", 
      title: language === 'ar' ? "مقدمة في الذكاء الاصطناعي" : "Introduction to AI", 
      instructor: language === 'ar' ? "د. محمد العمري" : "Dr. Mohammed Al-Amri",
      progress: 78, 
      students: 20,
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200",
      nextClass: language === 'ar' ? "الثلاثاء، 17 مايو، 11:00 ص" : "Tuesday, May 17, 11:00 AM",
      description: language === 'ar' ? "استكشف عالم الذكاء الاصطناعي وتطبيقاته في حل المشكلات المعقدة والتعلم الآلي." : "Explore the world of AI and its applications in solving complex problems and machine learning."
    },
    { 
      id: 4, 
      code: "ITDA301", 
      title: language === 'ar' ? "تحليل البيانات المتقدم" : "Advanced Data Analytics", 
      instructor: language === 'ar' ? "د. نورة السالم" : "Dr. Noura Al-Salem",
      progress: 58, 
      students: 18,
      image: "https://images.unsplash.com/photo-1599658880436-c61792e70672?auto=format&fit=crop&q=80&w=1200",
      nextClass: language === 'ar' ? "الأربعاء، 18 مايو، 9:00 ص" : "Wednesday, May 18, 9:00 AM",
      description: language === 'ar' ? "تعلم تقنيات تحليل البيانات المتقدمة واستخراج الرؤى القيمة من البيانات الضخمة." : "Learn advanced data analysis techniques and extract valuable insights from big data."
    },
    { 
      id: 5, 
      code: "ITCS302", 
      title: language === 'ar' ? "أمن المعلومات وتشفير البيانات" : "Information Security & Cryptography", 
      instructor: language === 'ar' ? "د. عبدالله الشهري" : "Dr. Abdullah Al-Shahri",
      progress: 72, 
      students: 27,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1200",
      nextClass: language === 'ar' ? "الخميس، 19 مايو، 10:30 ص" : "Thursday, May 19, 10:30 AM",
      description: language === 'ar' ? "دراسة مبادئ أمن المعلومات وطرق تشفير البيانات وحماية الأنظمة." : "Study information security principles, data encryption methods and system protection."
    },
    { 
      id: 6, 
      code: "ITMB205", 
      title: language === 'ar' ? "تطوير تطبيقات الجوال" : "Mobile Application Development", 
      instructor: language === 'ar' ? "د. ليلى الحربي" : "Dr. Layla Al-Harbi",
      progress: 32, 
      students: 24,
      image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80&w=1200",
      nextClass: language === 'ar' ? "الأحد، 22 مايو، 1:00 م" : "Sunday, May 22, 1:00 PM",
      description: language === 'ar' ? "تعلم كيفية تصميم وتطوير تطبيقات الجوال للأنظمة المختلفة." : "Learn how to design and develop mobile applications for different platforms."
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <StudentSidebar />
      
      <main className="flex-1 p-4 md:p-6 overflow-auto md:ms-64">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-cloud-dark dark:text-white">
              {language === 'ar' ? 'المقررات المسجلة' : 'Enrolled Courses'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              {language === 'ar' ? 'استعراض جميع المقررات الدراسية للفصل الحالي' : 'Browse all courses for the current semester'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow dark:border-slate-700">
                <div className="h-40 w-full relative overflow-hidden">
                  <img 
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <Badge className="absolute top-3 end-3 bg-cloud text-white">
                    {course.code}
                  </Badge>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.instructor}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 space-x-3 rtl:space-x-reverse">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" />
                      <span>{course.nextClass}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" />
                      <span>{course.students}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{language === 'ar' ? 'التقدم' : 'Progress'}</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  
                  <div className="pt-2">
                    <Link to={`/student/courses/${course.code}`} className="text-sm font-medium text-cloud hover:underline">
                      {language === 'ar' ? 'عرض تفاصيل المقرر' : 'View Course Details'} →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Courses;
