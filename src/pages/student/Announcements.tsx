import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Calendar, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StudentSidebar from '@/components/StudentSidebar';
import { useLanguage } from '@/hooks/useLanguage';

const Announcements = () => {
  const { language } = useLanguage();

  // Announcement data
  const announcements = [
    { 
      id: 1, 
      title: language === 'ar' ? "تم نشر جدول الاختبارات النصفية" : "Midterm Schedule Published", 
      content: language === 'ar' ? "تم نشر جدول الاختبارات النصفية. يرجى الاطلاع على الجدول في لوحة الإعلانات وتحضير نفسك وفقًا لذلك. ستبدأ الاختبارات في 20 مايو 2025." : "The midterm examination schedule has been published. Please check the schedule on the announcement board and prepare yourself accordingly. Examinations will commence on May 20, 2025.",
      date: "2025-05-08", 
      course: "ITCL201", 
      courseName: language === 'ar' ? "البرمجة الأساسية للسحابة" : "Basic Programming for Cloud",
      author: language === 'ar' ? "د. محمد العمري" : "Dr. Muhammad Al-Amri",
      important: true 
    },
    { 
      id: 2, 
      title: language === 'ar' ? "تم تمديد موعد التسليم" : "Submission Deadline Extended", 
      content: language === 'ar' ? "نظرًا للظروف الأخيرة والطلبات المتعددة، تقرر تمديد موعد تسليم مشروع البرمجة لمدة أسبوع إضافي. الموعد النهائي الجديد هو 25 مايو 2025." : "Due to recent circumstances and multiple requests, it has been decided to extend the programming project submission deadline by an additional week. The new deadline is May 25, 2025.",
      date: "2025-05-05", 
      course: "ITBS106", 
      courseName: language === 'ar' ? "هياكل البيانات" : "Data Structures",
      author: language === 'ar' ? "د. سارة القحطاني" : "Dr. Sarah Al-Qahtani",
      important: false
    },
    { 
      id: 3, 
      title: language === 'ar' ? "موارد تعليمية جديدة متاحة" : "New Learning Resources Available", 
      content: language === 'ar' ? "تم إضافة موارد تعليمية جديدة للفصل الدراسي على منصة التعلم. تتضمن هذه الموارد مقاطع فيديو تعليمية، وأوراق عمل تفاعلية، وأمثلة عملية إضافية لمساعدتك في فهم المفاهيم بشكل أفضل." : "New learning resources for the semester have been added to the learning platform. These resources include educational video clips, interactive worksheets, and additional practical examples to help you better understand the concepts.",
      date: "2025-05-01", 
      course: "AHEC101", 
      courseName: language === 'ar' ? "التخطيط الأكاديمي للطالب" : "Student Academic Planning",
      author: language === 'ar' ? "د. فيصل الدوسري" : "Dr. Faisal Al-Dosari",
      important: false
    },
    { 
      id: 4, 
      title: language === 'ar' ? "تغيير في موعد المحاضرة" : "Lecture Time Change", 
      content: language === 'ar' ? "نود إعلامكم بأنه تم تغيير موعد محاضرة مادة اللغة الإنجليزية للعلوم من الساعة 10:00 صباحًا إلى الساعة 1:00 ظهرًا أيام الأربعاء، بدءًا من الأسبوع القادم. يرجى تعديل جداولكم وفقًا لذلك." : "We would like to inform you that the lecture time for English for Science has been changed from 10:00 AM to 1:00 PM on Wednesdays, starting from next week. Please adjust your schedules accordingly.",
      date: "2025-04-29", 
      course: "AHEE101", 
      courseName: language === 'ar' ? "اللغة الإنجليزية للعلوم ١" : "English for Science I",
      author: language === 'ar' ? "د. إيمان الشهري" : "Dr. Eman Al-Shahri",
      important: true
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <StudentSidebar />
      
      <main className="flex-1 p-4 md:p-6 overflow-auto md:ml-64 rtl:md:ml-0 rtl:md:mr-64">
        <div className="max-w-6xl mx-auto pt-12 md:pt-4">
          <div className="flex items-center mb-8 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-cloud-dark dark:text-white mb-2">
                {language === 'ar' ? 'الإعلانات' : 'Announcements'}
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                {language === 'ar' ? 'أحدث الإعلانات والتحديثات من مدرسيك ومن الجامعة' : 'Latest announcements and updates from your instructors and university'}
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3 text-sm text-slate-500">
              <Bell className="h-12 w-12 text-cloud opacity-80" />
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="all">
                {language === 'ar' ? 'جميع الإعلانات' : 'All Announcements'}
                <Badge variant="outline" className="ml-2 bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300 border-0">
                  {announcements.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="important">
                {language === 'ar' ? 'الإعلانات المهمة' : 'Important Announcements'}
                <Badge variant="outline" className="ml-2 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-0">
                  {announcements.filter(a => a.important).length}
                </Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-6">
              {announcements.map(announcement => (
                <Card key={announcement.id} className={`overflow-hidden dark:border-slate-700 transform transition hover:shadow-lg ${announcement.important ? 'border-l-4 border-l-red-500' : ''}`}>
                  <CardHeader className={`${announcement.important ? 'bg-gradient-to-r from-red-50 to-transparent dark:from-red-950/20 dark:to-transparent' : 'bg-gradient-to-r from-cloud/10 to-transparent'} p-6`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-cloud text-white">
                            {announcement.course}
                          </Badge>
                          {announcement.important && (
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-0">
                              {language === 'ar' ? 'مهم' : 'Important'}
                            </Badge>
                          )}
                        </div>
                        <CardTitle>{announcement.title}</CardTitle>
                        <CardDescription className="mt-2 text-slate-600 dark:text-slate-300">
                          {announcement.courseName}
                        </CardDescription>
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {announcement.date}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="mb-6 text-slate-600 dark:text-slate-300">
                      {announcement.content}
                    </p>
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 pt-4 border-t dark:border-slate-700">
                      <User className="h-4 w-4 mr-2" />
                      {language === 'ar' ? 'نشر بواسطة: ' : 'Posted by: '}
                      <span className="font-medium text-slate-700 dark:text-slate-300 ml-1">
                        {announcement.author}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="important" className="space-y-6">
              {announcements.filter(a => a.important).map(announcement => (
                <Card key={announcement.id} className="overflow-hidden dark:border-slate-700 border-l-4 border-l-red-500 transform transition hover:shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-red-50 to-transparent dark:from-red-950/20 dark:to-transparent p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-cloud text-white">
                            {announcement.course}
                          </Badge>
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-0">
                            {language === 'ar' ? 'مهم' : 'Important'}
                          </Badge>
                        </div>
                        <CardTitle>{announcement.title}</CardTitle>
                        <CardDescription className="mt-2 text-slate-600 dark:text-slate-300">
                          {announcement.courseName}
                        </CardDescription>
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {announcement.date}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="mb-6 text-slate-600 dark:text-slate-300">
                      {announcement.content}
                    </p>
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 pt-4 border-t dark:border-slate-700">
                      <User className="h-4 w-4 mr-2" />
                      {language === 'ar' ? 'نشر بواسطة: ' : 'Posted by: '}
                      <span className="font-medium text-slate-700 dark:text-slate-300 ml-1">
                        {announcement.author}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Announcements;
