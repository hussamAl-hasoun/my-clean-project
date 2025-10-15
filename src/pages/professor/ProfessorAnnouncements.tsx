
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Bell, Plus, Calendar, Edit, Trash } from 'lucide-react';
import ProfessorSidebar from '@/components/ProfessorSidebar';
import { useLanguage } from '@/hooks/useLanguage';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const ProfessorAnnouncements = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [courseFilter, setCourseFilter] = React.useState('all');
  
  // Sample data for courses
  const courses = [
    {
      id: "ITCL201",
      name: language === 'ar' ? "البرمجة الأساسية للسحابة" : "Basic Programming for Cloud",
    },
    {
      id: "ITBS106",
      name: language === 'ar' ? "هياكل البيانات" : "Data Structures",
    },
    {
      id: "AHEC102",
      name: language === 'ar' ? "التخطيط الأكاديمي للطالب" : "Student Academic Planning",
    },
  ];

  // Sample data for announcements
  const [announcements, setAnnouncements] = React.useState([
    {
      id: 1,
      title: language === 'ar' ? "تم نشر جدول الاختبارات النصفية" : "Midterm Schedule Published",
      content: language === 'ar' 
        ? "تم نشر جدول الاختبارات النصفية. يرجى مراجعة الجدول واستعدوا جيداً. ستكون الاختبارات في الفترة من 15 إلى 20 مايو."
        : "The midterm exam schedule has been published. Please review the schedule and prepare accordingly. The exams will be held from May 15 to May 20.",
      course: "ITCL201",
      date: "2025-05-08",
      important: true,
    },
    {
      id: 2,
      title: language === 'ar' ? "إضافة ساعات مكتبية" : "Extra Office Hours Added",
      content: language === 'ar'
        ? "تمت إضافة ساعات مكتبية إضافية في يوم الأربعاء من الساعة 1 إلى 3 مساءً في المكتب 512. يرجى الاستفادة من هذه الساعات للاستفسارات والمراجعة قبل الاختبارات."
        : "Extra office hours have been added on Wednesday from 1 PM to 3 PM in Office 512. Please use these hours to ask questions and review before the exams.",
      course: "ITBS106",
      date: "2025-05-05",
      important: false,
    },
    {
      id: 3,
      title: language === 'ar' ? "تمديد موعد تسليم الواجب" : "Assignment Deadline Extended",
      content: language === 'ar'
        ? "تم تمديد موعد تسليم الواجب البرمجي #3 حتى 20 مايو. استغلوا هذه الفترة الإضافية لتقديم عمل متقن."
        : "The deadline for Programming Assignment #3 has been extended to May 20. Use this additional time to submit quality work.",
      course: "ITBS106",
      date: "2025-05-03",
      important: true,
    },
    {
      id: 4,
      title: language === 'ar' ? "موارد تعليمية إضافية" : "Additional Learning Resources",
      content: language === 'ar'
        ? "تم إضافة موارد تعليمية إضافية على منصة التعلم. تشمل هذه الموارد محاضرات مسجلة، وتمارين تطبيقية، ومقالات مفيدة تتعلق بالمنهج."
        : "Additional learning resources have been added to the learning platform. These include recorded lectures, practice exercises, and helpful articles related to the curriculum.",
      course: "AHEC102",
      date: "2025-05-01",
      important: false,
    },
    {
      id: 5,
      title: language === 'ar' ? "توضيح حول مشروع نهاية الفصل" : "Clarification on Final Project",
      content: language === 'ar'
        ? "بناءً على أسئلتكم، أود توضيح بعض النقاط حول مشروع نهاية الفصل. المشروع يجب أن يكون بين 10-15 صفحة، ويجب أن يتضمن تحليلاً للحالات العملية."
        : "Based on your questions, I would like to clarify some points about the final project. The project should be between 10-15 pages and should include analysis of practical cases.",
      course: "ITCL201",
      date: "2025-04-28",
      important: false,
    },
  ]);

  // Filter announcements based on search term and course filter
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCourse = courseFilter === 'all' || announcement.course === courseFilter;
    
    return matchesSearch && matchesCourse;
  });

  // Function to delete an announcement
  const deleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter(ann => ann.id !== id));
    
    toast({
      title: language === 'ar' ? "تم حذف الإعلان" : "Announcement deleted",
      description: language === 'ar' ? "تم حذف الإعلان بنجاح" : "The announcement has been successfully deleted",
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      <ProfessorSidebar />
      
      <main className="flex-1 p-4 md:p-6 overflow-auto md:ml-64 rtl:md:ml-0 rtl:md:mr-64">
        <div className="max-w-7xl mx-auto pt-12 md:pt-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-2xl font-bold text-cloud-dark dark:text-white mb-4 md:mb-0">
              {language === 'ar' ? 'الإعلانات' : 'Announcements'}
            </h1>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder={language === 'ar' ? "البحث في الإعلانات..." : "Search announcements..."} 
                  className="pl-10 w-full sm:w-64" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder={language === 'ar' ? "اختر المقرر" : "Select course"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === 'ar' ? "جميع المقررات" : "All Courses"}</SelectItem>
                  {courses.map(course => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'إنشاء إعلان' : 'Create Announcement'}
              </Button>
            </div>
          </div>
          
          {filteredAnnouncements.length > 0 ? (
            <div className="space-y-6">
              {filteredAnnouncements.map(announcement => (
                <Card key={announcement.id} className={`dark:border-slate-800 hover:shadow-md transition-shadow ${announcement.important ? 'border-l-4 border-l-red-500' : ''}`}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <CardTitle className="text-xl">{announcement.title}</CardTitle>
                          {announcement.important && (
                            <Badge variant="destructive" className="ml-2">
                              {language === 'ar' ? 'مهم' : 'Important'}
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="flex items-center mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>
                            {new Date(announcement.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                          </span>
                          <Badge variant="outline" className="ml-2 bg-cloud/10 text-cloud border-none">
                            {announcement.course}
                          </Badge>
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500" onClick={() => deleteAnnouncement(announcement.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-300">
                      {announcement.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Bell className="h-16 w-16 text-slate-300 dark:text-slate-700 mb-4" />
              <p className="text-slate-500 dark:text-slate-400 mb-4">
                {language === 'ar' ? 'لا توجد إعلانات مطابقة لبحثك' : 'No announcements found matching your search'}
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'إنشاء إعلان جديد' : 'Create New Announcement'}
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfessorAnnouncements;
