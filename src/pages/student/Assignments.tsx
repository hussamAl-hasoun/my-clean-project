
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StudentSidebar from '@/components/StudentSidebar';
import { useLanguage } from '@/hooks/useLanguage';
import { format } from 'date-fns';

const Assignments = () => {
  const { language } = useLanguage();

  // Assignment data
  const pendingAssignments = [
    { 
      id: 1, 
      title: language === 'ar' ? "مقال عن هندسة السحابة" : "Cloud Architecture Essay", 
      course: "ITCL201", 
      courseName: language === 'ar' ? "البرمجة الأساسية للسحابة" : "Basic Programming for Cloud",
      due: "2025-05-15", 
      status: "pending",
      points: 20
    },
    { 
      id: 2, 
      title: language === 'ar' ? "الواجب البرمجي #3" : "Programming Assignment #3", 
      course: "ITBS106", 
      courseName: language === 'ar' ? "هياكل البيانات" : "Data Structures",
      due: "2025-05-18", 
      status: "pending",
      points: 15
    },
    { 
      id: 3, 
      title: language === 'ar' ? "عرض تقديمي بحثي" : "Research Presentation", 
      course: "AHEC102", 
      courseName: language === 'ar' ? "التخطيط الأكاديمي للطالب" : "Student Academic Planning",
      due: "2025-05-20", 
      status: "pending",
      points: 25
    },
  ];

  const completedAssignments = [
    { 
      id: 4, 
      title: language === 'ar' ? "تطبيق على الحوسبة السحابية" : "Cloud Computing Application", 
      course: "ITCL201", 
      courseName: language === 'ar' ? "البرمجة الأساسية للسحابة" : "Basic Programming for Cloud",
      due: "2025-04-28", 
      status: "completed", 
      grade: 18,
      points: 20,
      feedback: language === 'ar' ? "عمل جيد، مع بعض النقاط التي تحتاج تحسين" : "Good work, with some points that need improvement"
    },
    { 
      id: 5, 
      title: language === 'ar' ? "الواجب البرمجي #2" : "Programming Assignment #2", 
      course: "ITBS106", 
      courseName: language === 'ar' ? "هياكل البيانات" : "Data Structures",
      due: "2025-04-20", 
      status: "completed", 
      grade: 14,
      points: 15,
      feedback: language === 'ar' ? "ممتاز. تنفيذ ممتاز للخوارزميات" : "Excellent. Great implementation of algorithms"
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
                {language === 'ar' ? 'الواجبات الدراسية' : 'Assignments'}
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                {language === 'ar' ? 'إدارة ومتابعة واجباتك الدراسية' : 'Manage and track your academic assignments'}
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3 text-sm text-slate-500">
              <FileText className="h-12 w-12 text-cloud opacity-80" />
            </div>
          </div>

          <Tabs defaultValue="pending" className="mb-8">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="pending">
                {language === 'ar' ? 'الواجبات المعلقة' : 'Pending Assignments'}
                <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-0">
                  {pendingAssignments.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="completed">
                {language === 'ar' ? 'الواجبات المكتملة' : 'Completed Assignments'}
                <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-0">
                  {completedAssignments.length}
                </Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending" className="space-y-6">
              {pendingAssignments.map(assignment => (
                <Card key={assignment.id} className="overflow-hidden dark:border-slate-700 transform transition hover:shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-cloud/10 to-transparent p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{assignment.title}</CardTitle>
                        <CardDescription className="mt-2">
                          <Badge className="bg-cloud text-white">
                            {assignment.course}
                          </Badge>
                          <span className="ml-2 text-slate-600 dark:text-slate-300">
                            {assignment.courseName}
                          </span>
                        </CardDescription>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-0">
                        {language === 'ar' ? 'معلق' : 'Pending'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap justify-between gap-4">
                      <div className="flex items-center gap-2 text-amber-600">
                        <Calendar className="h-5 w-5" />
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {language === 'ar' ? 'تاريخ التسليم' : 'Due Date'}
                          </div>
                          <div className="font-medium">
                            {assignment.due}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <Clock className="h-5 w-5" />
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {language === 'ar' ? 'الوقت المتبقي' : 'Time Remaining'}
                          </div>
                          <div className="font-medium">
                            {language === 'ar' ? 'أيام قليلة' : 'Few days'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <FileText className="h-5 w-5" />
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {language === 'ar' ? 'الدرجات' : 'Points'}
                          </div>
                          <div className="font-medium">
                            {assignment.points} {language === 'ar' ? 'درجة' : 'points'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-6">
              {completedAssignments.map(assignment => (
                <Card key={assignment.id} className="overflow-hidden dark:border-slate-700 transform transition hover:shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-transparent dark:from-green-900/20 dark:to-transparent p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{assignment.title}</CardTitle>
                        <CardDescription className="mt-2">
                          <Badge className="bg-cloud text-white">
                            {assignment.course}
                          </Badge>
                          <span className="ml-2 text-slate-600 dark:text-slate-300">
                            {assignment.courseName}
                          </span>
                        </CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-0">
                        {language === 'ar' ? 'مكتمل' : 'Completed'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap justify-between gap-4 mb-4">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <Calendar className="h-5 w-5" />
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {language === 'ar' ? 'تاريخ التسليم' : 'Due Date'}
                          </div>
                          <div className="font-medium">
                            {assignment.due}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <FileText className="h-5 w-5" />
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {language === 'ar' ? 'الدرجة' : 'Grade'}
                          </div>
                          <div className="font-medium">
                            {assignment.grade}/{assignment.points} {language === 'ar' ? 'درجة' : 'points'}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t dark:border-slate-700">
                      <h4 className="text-sm font-medium mb-2">
                        {language === 'ar' ? 'ملاحظات المدرس:' : 'Instructor Feedback:'}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        {assignment.feedback}
                      </p>
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

export default Assignments;
