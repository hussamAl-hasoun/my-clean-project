
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  Plus, 
  Clock, 
  FileText, 
  CheckCircle,
  XCircle,
  AlertCircle, 
  BookOpen,
} from 'lucide-react';
import ProfessorSidebar from '@/components/ProfessorSidebar';
import { useLanguage } from '@/hooks/useLanguage';

const ProfessorAssignments = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  
  const assignments = [
    {
      id: 1,
      title: language === 'ar' ? "التمرين البرمجي #1" : "Programming Exercise #1",
      course: "ITCL201",
      courseName: language === 'ar' ? "البرمجة الأساسية للسحابة" : "Basic Programming for Cloud",
      dueDate: "2025-05-15",
      submitted: 18,
      total: 25,
      status: "active",
    },
    {
      id: 2,
      title: language === 'ar' ? "مشروع هياكل البيانات" : "Data Structures Project",
      course: "ITBS106",
      courseName: language === 'ar' ? "هياكل البيانات" : "Data Structures",
      dueDate: "2025-05-20",
      submitted: 15,
      total: 30,
      status: "active",
    },
    {
      id: 3,
      title: language === 'ar' ? "تصميم خطة دراسية" : "Academic Plan Design",
      course: "AHEC102",
      courseName: language === 'ar' ? "التخطيط الأكاديمي للطالب" : "Student Academic Planning",
      dueDate: "2025-05-18",
      submitted: 12,
      total: 20,
      status: "active",
    },
    {
      id: 4,
      title: language === 'ar' ? "الاختبار البرمجي النصفي" : "Programming Midterm",
      course: "ITCL201",
      courseName: language === 'ar' ? "البرمجة الأساسية للسحابة" : "Basic Programming for Cloud",
      dueDate: "2025-04-20",
      submitted: 24,
      total: 25,
      status: "past",
      graded: 22,
    },
    {
      id: 5,
      title: language === 'ar' ? "مشروع تحليل خوارزميات" : "Algorithm Analysis Project",
      course: "ITBS106",
      courseName: language === 'ar' ? "هياكل البيانات" : "Data Structures",
      dueDate: "2025-04-15",
      submitted: 28,
      total: 30,
      status: "past",
      graded: 28,
    },
    {
      id: 6,
      title: language === 'ar' ? "تقرير التخطيط الأكاديمي" : "Academic Planning Report",
      course: "AHEC102",
      courseName: language === 'ar' ? "التخطيط الأكاديمي للطالب" : "Student Academic Planning",
      dueDate: "2025-05-25",
      submitted: 0,
      total: 20,
      status: "draft",
    },
  ];
  
  // Filter assignments based on search term and selected course
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = 
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      assignment.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.courseName.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCourse = selectedCourse === 'all' || assignment.course === selectedCourse;
    
    return matchesSearch && matchesCourse;
  });
  
  // Group assignments by status
  const activeAssignments = filteredAssignments.filter(a => a.status === 'active');
  const pastAssignments = filteredAssignments.filter(a => a.status === 'past');
  const draftAssignments = filteredAssignments.filter(a => a.status === 'draft');
  
  // Get list of unique courses
  const courses = [...new Set(assignments.map(a => a.course))].map(courseCode => ({
    code: courseCode,
    name: assignments.find(a => a.course === courseCode)?.courseName || courseCode
  }));
  
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      <ProfessorSidebar />
      
      <main className="flex-1 p-6 overflow-auto md:ml-64 rtl:md:ml-0 rtl:md:mr-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-2xl font-bold text-cloud-dark dark:text-white mb-4 md:mb-0">
              {language === 'ar' ? 'الواجبات' : 'Assignments'}
            </h1>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder={language === 'ar' ? "البحث عن الواجبات..." : "Search assignments..."} 
                  className="pl-10 w-full sm:w-64" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'إضافة واجب' : 'Add Assignment'}
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex overflow-x-auto pb-2 gap-2">
              <Button
                variant={selectedCourse === 'all' ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCourse('all')}
                className="whitespace-nowrap"
              >
                {language === 'ar' ? 'جميع المقررات' : 'All Courses'}
              </Button>
              
              {courses.map(course => (
                <Button
                  key={course.code}
                  variant={selectedCourse === course.code ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCourse(course.code)}
                  className="whitespace-nowrap"
                >
                  {course.code}: {course.name}
                </Button>
              ))}
            </div>
          </div>
          
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="active">
                <Clock className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'واجبات نشطة' : 'Active'}
                <Badge className="ml-2 bg-cloud text-white" variant="default">{activeAssignments.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="past">
                <CheckCircle className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'واجبات سابقة' : 'Past'}
                <Badge className="ml-2" variant="outline">{pastAssignments.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="draft">
                <FileText className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'مسودات' : 'Drafts'}
                <Badge className="ml-2" variant="outline">{draftAssignments.length}</Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              {activeAssignments.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {activeAssignments.map(assignment => (
                    <ActiveAssignmentCard 
                      key={assignment.id} 
                      assignment={assignment} 
                      language={language} 
                    />
                  ))}
                </div>
              ) : (
                <EmptyState 
                  message={language === 'ar' ? 'لا توجد واجبات نشطة' : 'No active assignments'} 
                  buttonText={language === 'ar' ? 'إنشاء واجب جديد' : 'Create New Assignment'}
                  language={language}
                />
              )}
            </TabsContent>
            
            <TabsContent value="past">
              {pastAssignments.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {pastAssignments.map(assignment => (
                    <PastAssignmentCard 
                      key={assignment.id} 
                      assignment={assignment} 
                      language={language} 
                    />
                  ))}
                </div>
              ) : (
                <EmptyState 
                  message={language === 'ar' ? 'لا توجد واجبات سابقة' : 'No past assignments'} 
                  buttonText={language === 'ar' ? 'عرض جميع الواجبات' : 'View All Assignments'}
                  language={language}
                />
              )}
            </TabsContent>
            
            <TabsContent value="draft">
              {draftAssignments.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {draftAssignments.map(assignment => (
                    <DraftAssignmentCard 
                      key={assignment.id} 
                      assignment={assignment} 
                      language={language} 
                    />
                  ))}
                </div>
              ) : (
                <EmptyState 
                  message={language === 'ar' ? 'لا توجد مسودات واجبات' : 'No draft assignments'} 
                  buttonText={language === 'ar' ? 'إنشاء واجب جديد' : 'Create New Assignment'}
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

// Active Assignment Card Component
const ActiveAssignmentCard = ({ assignment, language }: { assignment: any, language: string }) => {
  const submissionPercent = (assignment.submitted / assignment.total) * 100;
  
  return (
    <Card className="hover:shadow-md transition-shadow dark:border-slate-700">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400 border-0">
                {assignment.course}
              </Badge>
              <Badge variant="default" className="bg-amber-500">
                {language === 'ar' ? 'نشط' : 'Active'}
              </Badge>
            </div>
            
            <h3 className="text-lg font-semibold dark:text-white mb-1">{assignment.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {assignment.courseName}
            </p>
            
            <div className="mt-4">
              <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
                <Clock className="h-4 w-4" />
                <span>
                  {language === 'ar'
                    ? `موعد التسليم: ${assignment.dueDate}`
                    : `Due: ${assignment.dueDate}`
                  }
                </span>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>
                  {language === 'ar'
                    ? `تم التسليم: ${assignment.submitted} من ${assignment.total}`
                    : `Submitted: ${assignment.submitted} of ${assignment.total}`
                  }
                </span>
                <span>{Math.round(submissionPercent)}%</span>
              </div>
              <Progress value={submissionPercent} className="h-2" />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              {language === 'ar' ? 'عرض التسليمات' : 'View Submissions'}
            </Button>
            <Button size="sm">
              {language === 'ar' ? 'تعديل' : 'Edit'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Past Assignment Card Component
const PastAssignmentCard = ({ assignment, language }: { assignment: any, language: string }) => {
  return (
    <Card className="hover:shadow-md transition-shadow dark:border-slate-700">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400 border-0">
                {assignment.course}
              </Badge>
              <Badge variant="secondary">
                {language === 'ar' ? 'مكتمل' : 'Completed'}
              </Badge>
            </div>
            
            <h3 className="text-lg font-semibold dark:text-white mb-1">{assignment.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {assignment.courseName}
            </p>
            
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
                <Clock className="h-4 w-4" />
                <span>
                  {language === 'ar'
                    ? `موعد التسليم: ${assignment.dueDate}`
                    : `Due: ${assignment.dueDate}`
                  }
                </span>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                <CheckCircle className="h-4 w-4" />
                <span>
                  {language === 'ar'
                    ? `تم تسليم: ${assignment.submitted} من ${assignment.total}`
                    : `Submitted: ${assignment.submitted} of ${assignment.total}`
                  }
                </span>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-amber-600 dark:text-amber-400">
                <AlertCircle className="h-4 w-4" />
                <span>
                  {language === 'ar'
                    ? `تم تقييم: ${assignment.graded} من ${assignment.submitted}`
                    : `Graded: ${assignment.graded} of ${assignment.submitted}`
                  }
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              {language === 'ar' ? 'عرض النتائج' : 'View Results'}
            </Button>
            <Button variant="outline" size="sm">
              {language === 'ar' ? 'تصدير البيانات' : 'Export Data'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Draft Assignment Card Component
const DraftAssignmentCard = ({ assignment, language }: { assignment: any, language: string }) => {
  return (
    <Card className="hover:shadow-md transition-shadow dark:border-slate-700">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400 border-0">
                {assignment.course}
              </Badge>
              <Badge variant="outline">
                {language === 'ar' ? 'مسودة' : 'Draft'}
              </Badge>
            </div>
            
            <h3 className="text-lg font-semibold dark:text-white mb-1">{assignment.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {assignment.courseName}
            </p>
            
            <div className="mt-4 flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
              <Clock className="h-4 w-4" />
              <span>
                {language === 'ar'
                  ? `التسليم المقترح: ${assignment.dueDate}`
                  : `Proposed due: ${assignment.dueDate}`
                }
              </span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              {language === 'ar' ? 'تعديل' : 'Edit'}
            </Button>
            <Button size="sm">
              {language === 'ar' ? 'نشر الواجب' : 'Publish'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Empty State Component
const EmptyState = ({ message, buttonText, language }: { message: string, buttonText: string, language: string }) => (
  <div className="text-center py-16 border dark:border-slate-800 rounded-lg">
    <FileText className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
    <p className="text-slate-500 dark:text-slate-400 mb-6">{message}</p>
    <Button>
      <Plus className="h-4 w-4 mr-2" />
      {buttonText}
    </Button>
  </div>
);

export default ProfessorAssignments;
