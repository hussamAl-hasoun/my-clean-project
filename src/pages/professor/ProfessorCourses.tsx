
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Users, FileText, Search, Plus } from 'lucide-react';
import ProfessorSidebar from '@/components/ProfessorSidebar';
import { useLanguage } from '@/hooks/useLanguage';
import { Input } from '@/components/ui/input';

const ProfessorCourses = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = React.useState('');

  // Sample data for courses
  const courses = [
    {
      id: 1,
      code: "ITCL201",
      title: language === 'ar' ? "البرمجة الأساسية للسحابة" : "Basic Programming for Cloud",
      students: 25,
      assignments: 3,
      schedule: language === 'ar' ? "الأحد، الثلاثاء 10:00 - 11:30" : "Sun, Tue 10:00 - 11:30",
      image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?auto=format&fit=crop&q=80&w=1200",
      active: true,
    },
    {
      id: 2,
      code: "ITBS106",
      title: language === 'ar' ? "هياكل البيانات" : "Data Structures",
      students: 30,
      assignments: 4,
      schedule: language === 'ar' ? "الإثنين، الأربعاء 1:00 - 2:30" : "Mon, Wed 1:00 - 2:30",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=1200",
      active: true,
    },
    {
      id: 3,
      code: "AHEC102",
      title: language === 'ar' ? "مقدمة في الذكاء الاصطناعي" : "Introduction to AI",
      students: 20,
      assignments: 2,
      schedule: language === 'ar' ? "الخميس 9:00 - 12:00" : "Thu 9:00 - 12:00",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200",
      active: true,
    },
    {
      id: 4,
      code: "ITDA301",
      title: language === 'ar' ? "تحليل البيانات المتقدم" : "Advanced Data Analytics",
      students: 18,
      assignments: 5,
      schedule: language === 'ar' ? "الثلاثاء، الخميس 2:30 - 4:00" : "Tue, Thu 2:30 - 4:00",
      image: "https://images.unsplash.com/photo-1599658880436-c61792e70672?auto=format&fit=crop&q=80&w=1200",
      active: true,
    },
    {
      id: 5,
      code: "ITSD405",
      title: language === 'ar' ? "تطوير تطبيقات الويب المتقدمة" : "Advanced Web Application Development",
      students: 22,
      assignments: 6,
      schedule: language === 'ar' ? "الأحد، الثلاثاء 1:00 - 2:30" : "Sun, Tue 1:00 - 2:30",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1200",
      active: true,
    },
    {
      id: 6,
      code: "ITCS302",
      title: language === 'ar' ? "أمن المعلومات وتشفير البيانات" : "Information Security & Cryptography",
      students: 27,
      assignments: 4,
      schedule: language === 'ar' ? "الإثنين، الأربعاء 10:00 - 11:30" : "Mon, Wed 10:00 - 11:30",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1200",
      active: true,
    },
    {
      id: 7,
      code: "ITMB205",
      title: language === 'ar' ? "تطوير تطبيقات الجوال" : "Mobile Application Development",
      students: 24,
      assignments: 3,
      schedule: language === 'ar' ? "الثلاثاء، الخميس 11:30 - 1:00" : "Tue, Thu 11:30 - 1:00",
      image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80&w=1200",
      active: false,
    },
    {
      id: 8,
      code: "ITNT403",
      title: language === 'ar' ? "شبكات الحاسب المتقدمة" : "Advanced Computer Networks",
      students: 15,
      assignments: 5,
      schedule: language === 'ar' ? "الأربعاء، الخميس 2:30 - 4:00" : "Wed, Thu 2:30 - 4:00",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
      active: false,
    },
  ];

  // Filter courses based on search term
  const filteredCourses = courses.filter(course => 
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCourses = filteredCourses.filter(course => course.active);
  const archivedCourses = filteredCourses.filter(course => !course.active);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      <ProfessorSidebar />
      
      <main className="flex-1 p-6 overflow-auto md:ml-64 rtl:md:ml-0 rtl:md:mr-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-2xl font-bold text-cloud-dark dark:text-white mb-4 md:mb-0">
              {language === 'ar' ? 'المقررات الدراسية' : 'Courses'}
            </h1>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder={language === 'ar' ? "البحث عن المقررات..." : "Search courses..."} 
                  className="pl-10 w-full sm:w-64" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'إضافة مقرر' : 'Add Course'}
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="active">
                {language === 'ar' ? 'المقررات الحالية' : 'Current Courses'}
              </TabsTrigger>
              <TabsTrigger value="archived">
                {language === 'ar' ? 'المقررات المؤرشفة' : 'Archived Courses'}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              {activeCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeCourses.map(course => (
                    <CourseCard key={course.id} course={course} language={language} />
                  ))}
                </div>
              ) : (
                <EmptyState 
                  message={language === 'ar' ? 'لا توجد مقررات نشطة' : 'No active courses found'} 
                  language={language} 
                />
              )}
            </TabsContent>
            
            <TabsContent value="archived">
              {archivedCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {archivedCourses.map(course => (
                    <CourseCard key={course.id} course={course} language={language} />
                  ))}
                </div>
              ) : (
                <EmptyState 
                  message={language === 'ar' ? 'لا توجد مقررات مؤرشفة' : 'No archived courses found'} 
                  language={language} 
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

// Course card component
const CourseCard = ({ course, language }: { course: any, language: string }) => (
  <Card className="dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow">
    <div className="h-32 w-full overflow-hidden">
      <img 
        src={course.image} 
        alt={course.title} 
        className="w-full h-full object-cover" 
      />
    </div>
    <CardHeader className="pb-2">
      <div className="flex justify-between items-center">
        <Badge variant="outline" className="bg-cloud/10 text-cloud border-none">
          {course.code}
        </Badge>
        <Badge variant={course.active ? "default" : "secondary"}>
          {course.active 
            ? (language === 'ar' ? 'نشط' : 'Active')
            : (language === 'ar' ? 'مؤرشف' : 'Archived')
          }
        </Badge>
      </div>
      <CardTitle className="text-lg mt-2">{course.title}</CardTitle>
      <CardDescription>
        <div className="flex items-center text-slate-500 dark:text-slate-400">
          <BookOpen className="h-4 w-4 mr-2" />
          <span>{course.schedule}</span>
        </div>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex justify-between mb-4 text-sm">
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1 text-slate-500" />
          <span>
            {language === 'ar'
              ? `${course.students} طالب`
              : `${course.students} Students`
            }
          </span>
        </div>
        <div className="flex items-center">
          <FileText className="h-4 w-4 mr-1 text-slate-500" />
          <span>
            {language === 'ar'
              ? `${course.assignments} واجبات`
              : `${course.assignments} Assignments`
            }
          </span>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Button className="w-full sm:flex-1 h-9" variant="default">
          {language === 'ar' ? 'إدارة' : 'Manage'}
        </Button>
        <Button className="w-full sm:flex-1 h-9" variant="outline">
          {language === 'ar' ? 'عرض الطلاب' : 'View Students'}
        </Button>
      </div>
    </CardContent>
  </Card>
);

// Empty state component
const EmptyState = ({ message, language }: { message: string, language: string }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <BookOpen className="h-16 w-16 text-slate-300 dark:text-slate-700 mb-4" />
    <p className="text-slate-500 dark:text-slate-400 mb-4">{message}</p>
    <Button>
      <Plus className="h-4 w-4 mr-2" />
      {language === 'ar' ? 'إضافة مقرر' : 'Add Course'}
    </Button>
  </div>
);

export default ProfessorCourses;
