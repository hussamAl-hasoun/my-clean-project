import { type FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Bell, 
  BookOpen, 
  Calendar, 
  FileText, 
  LogOut, 
  Users, 
  GraduationCap, 
  Activity,
  MessageSquare,
  ChevronRight,
  TrendingUp,
  BadgeCheck,
  Trophy
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ProfessorSidebar from '@/components/ProfessorSidebar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const ProfessorDashboard: FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  // بيانات الأستاذ
  const professorInfo = {
    name: language === 'ar' ? "د. سارة الأحمد" : "Dr. Sarah Johnson",
    id: "PR98765432",
    department: language === 'ar' ? "كلية علوم الحاسب" : "Computer Science Department",
    avatar: "/avatars/professor.jpg"
  };

  // المقررات التي يدرسها
  const teachingCourses = [
    { 
      id: 1, 
      code: "ITCL201", 
      title: language === 'ar' ? "البرمجة الأساسية للسحابة" : "Basic Programming for Cloud",
      students: 85,
      progress: 65,
      nextLecture: language === 'ar' ? "الثلاثاء، 10:00 صباحاً" : "Tuesday, 10:00 AM",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
    },
    { 
      id: 2, 
      code: "ITBS106", 
      title: language === 'ar' ? "هياكل البيانات" : "Data Structures",
      students: 42,
      progress: 42,
      nextLecture: language === 'ar' ? "الأربعاء، 2:00 مساءً" : "Wednesday, 2:00 PM",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200"
    },
    { 
      id: 3, 
      code: "AHEC102", 
      title: language === 'ar' ? "مقدمة في الذكاء الاصطناعي" : "Introduction to AI",
      students: 63,
      progress: 78,
      nextLecture: language === 'ar' ? "الخميس، 11:30 صباحاً" : "Thursday, 11:30 AM",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  // الواجبات المطلوب تصحيحها
  const pendingAssignments = [
    {
      id: 1,
      title: language === 'ar' ? "مشروع تطوير تطبيق سحابي" : "Cloud App Development Project",
      course: "ITCL201",
      submissions: 45,
      dueDate: "2025-05-15",
      status: "pending"
    },
    {
      id: 2,
      title: language === 'ar' ? "تطبيق خوارزميات البحث" : "Search Algorithms Implementation",
      course: "ITBS106",
      submissions: 38,
      dueDate: "2025-05-18",
      status: "grading"
    }
  ];

  // الفعاليات القادمة
  const upcomingEvents = [
    {
      id: 1,
      title: language === 'ar' ? "محاضرة ITCL201" : "ITCL201 Lecture",
      type: "lecture",
      time: "10:00 AM",
      date: "2025-05-11",
      location: language === 'ar' ? "قاعة 305" : "Room 305",
      attendees: 85
    },
    {
      id: 2,
      title: language === 'ar' ? "معمل ITBS106" : "ITBS106 Lab Session",
      type: "lab",
      time: "2:00 PM",
      date: "2025-05-12",
      location: language === 'ar' ? "معمل 204" : "Lab 204",
      attendees: 42
    }
  ];

  // Top performing students data
  const topStudents = [
    { id: 1, name: language === 'ar' ? 'محمد أحمد' : 'John Smith', course: 'ITBS106', grade: 98, lastActive: '2025-05-12' },
    { id: 2, name: language === 'ar' ? 'فاطمة خالد' : 'Emma Johnson', course: 'AHEC102', grade: 97, lastActive: '2025-05-13' },
    { id: 3, name: language === 'ar' ? 'عبدالله محمد' : 'Michael Brown', course: 'ITCL201', grade: 95, lastActive: '2025-05-14' },
  ];

  const handleLogout = () => {
    toast({
      title: language === 'ar' ? "تم تسجيل الخروج بنجاح" : "Logged out successfully",
      description: language === 'ar' ? "شكراً لاستخدامك منصة حسام كلاود" : "Thank you for using Hossam Cloud Platform",
    });
    navigate('/');
  };

  return (
    <div className="flex mt-16 min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <ProfessorSidebar />
      
      <main className={cn(
        "flex-1 p-6 md:p-8 overflow-auto transition-all duration-300",
        language === 'ar' ? "md:mr-64" : "md:ml-64"
      )}>
        <div className="max-w-7xl mx-auto">
          {/* Header with welcome message and avatar */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-8 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20 border-4 border-cloud/20">
                  <AvatarImage src={professorInfo.avatar} />
                  <AvatarFallback className="bg-cloud text-white text-lg">
                    {professorInfo.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold text-cloud-dark dark:text-white mb-2">
                    {language === 'ar' ? `مرحباً، ${professorInfo.name}` : `Welcome, ${professorInfo.name}`}
                  </h1>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                      <BadgeCheck className="h-5 w-5 text-cloud" />
                      <span>{language === 'ar' ? `رقم التعريف: ${professorInfo.id}` : `ID: ${professorInfo.id}`}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                      <GraduationCap className="h-5 w-5 text-cloud" />
                      <span>{professorInfo.department}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  <LogOut className={cn("h-4 w-4", language === 'ar' ? 'ml-2' : 'mr-2')} />
                  {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                </Button>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Dashboard overview cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-cloud/10 to-cloud/5 dark:from-cloud/20 dark:to-cloud/5 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {language === 'ar' ? 'المقررات الحالية' : 'Current Courses'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-cloud/10 p-2 rounded-lg">
                      <BookOpen className="h-6 w-6 text-cloud" />
                    </div>
                    <span className="text-2xl font-bold dark:text-white">{teachingCourses.length}</span>
                  </div>
                  <Link to="/professor/courses" className="text-xs text-cloud hover:underline">
                    {language === 'ar' ? 'عرض الكل' : 'View All'}
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-50/30 dark:from-emerald-900/20 dark:to-emerald-800/5 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {language === 'ar' ? 'إجمالي الطلاب' : 'Total Students'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg">
                      <Users className="h-6 w-6 text-emerald-500 dark:text-emerald-300" />
                    </div>
                    <span className="text-2xl font-bold dark:text-white">
                      {teachingCourses.reduce((total, course) => total + course.students, 0)}
                    </span>
                  </div>
                  <Link to="/professor/students" className="text-xs text-emerald-600 dark:text-emerald-300 hover:underline">
                    {language === 'ar' ? 'عرض الكل' : 'View All'}
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-50/30 dark:from-amber-900/20 dark:to-amber-800/5 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {language === 'ar' ? 'الواجبات المعلقة' : 'Pending Assignments'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
                      <FileText className="h-6 w-6 text-amber-500 dark:text-amber-300" />
                    </div>
                    <span className="text-2xl font-bold dark:text-white">{pendingAssignments.length}</span>
                  </div>
                  <Link to="/professor/assignments" className="text-xs text-amber-600 dark:text-amber-300 hover:underline">
                    {language === 'ar' ? 'عرض الكل' : 'View All'}
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-50/30 dark:from-green-900/20 dark:to-green-800/5 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {language === 'ar' ? 'الفعاليات القادمة' : 'Upcoming Events'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                      <Calendar className="h-6 w-6 text-green-500 dark:text-green-300" />
                    </div>
                    <span className="text-2xl font-bold dark:text-white">{upcomingEvents.length}</span>
                  </div>
                  <Link to="/professor/calendar" className="text-xs text-green-600 dark:text-green-300 hover:underline">
                    {language === 'ar' ? 'عرض الكل' : 'View All'}
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Section */}
          <Card className="mb-6 dark:border-slate-700 shadow-md">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-50/30 dark:from-purple-900/20 dark:to-purple-800/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-purple-500 dark:text-purple-300" />
                  <CardTitle>
                    {language === 'ar' ? 'تحليلات التدريس' : 'Teaching Analytics'}
                  </CardTitle>
                </div>
                <Link to="/professor/analytics">
                  <Button variant="outline" size="sm" className="text-purple-500 dark:text-purple-300 border-purple-200 dark:border-purple-800/50 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                    {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                  </Button>
                </Link>
              </div>
              <CardDescription>
                {language === 'ar' ? 'نظرة عامة على أداء الطلاب والمقررات' : 'Overview of student and course performance'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                      <Activity className="h-5 w-5 text-purple-500 dark:text-purple-300" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-800 dark:text-slate-200">
                        {language === 'ar' ? 'متوسط الحضور' : 'Average Attendance'}
                      </h3>
                      <div className="text-2xl font-bold text-purple-500 dark:text-purple-300">
                        91%
                      </div>
                    </div>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-purple-500 dark:text-purple-300" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-800 dark:text-slate-200">
                        {language === 'ar' ? 'متوسط الدرجات' : 'Average Grade'}
                      </h3>
                      <div className="text-2xl font-bold text-purple-500 dark:text-purple-300">
                        85%
                      </div>
                    </div>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-purple-500 dark:text-purple-300" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-800 dark:text-slate-200">
                        {language === 'ar' ? 'مشاركة الطلاب' : 'Student Engagement'}
                      </h3>
                      <div className="text-2xl font-bold text-purple-500 dark:text-purple-300">
                        78%
                      </div>
                    </div>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Course section */}
            <Card className="lg:col-span-7 dark:border-slate-700 overflow-hidden shadow-md">
              <CardHeader className="bg-gradient-to-r from-cloud/5 to-transparent dark:from-cloud/10 dark:to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{language === 'ar' ? 'المقررات الحالية' : 'Current Courses'}</CardTitle>
                    <CardDescription>
                      {language === 'ar' ? 'المقررات التي تقوم بتدريسها هذا الفصل' : 'Courses you are teaching this semester'}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-cloud" />
                    <span className="text-sm font-medium text-cloud">
                      {language === 'ar' ? 'متوسط التقدم: 62%' : 'Average Progress: 62%'}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teachingCourses.map(course => (
                    <div key={course.id} className="bg-white dark:bg-slate-800/50 rounded-lg p-4 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700">
                      <img 
                        src={course.image}
                        alt={course.title}
                        className="absolute top-0 left-0 w-full h-full object-cover opacity-5 z-0"
                      />
                      <div className="relative z-10">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="bg-cloud-accent/10 text-cloud-accent dark:bg-cloud-accent/20 px-2 py-1 rounded text-sm">
                                {course.code}
                              </span>
                              <h4 className="font-medium text-cloud-dark dark:text-cloud-light">{course.title}</h4>
                            </div>
                          </div>
                          <Link to={`/professor/courses/${course.code}`} className="text-xs px-3 py-1 rounded-full bg-cloud/10 text-cloud hover:bg-cloud/20 transition-colors">
                            {language === 'ar' ? 'عرض المقرر' : 'View Course'}
                          </Link>
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>{course.students} {language === 'ar' ? 'طالب' : 'students'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{course.nextLecture}</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-500 dark:text-slate-400">
                              {language === 'ar' ? 'تقدم المقرر' : 'Course Progress'}
                            </span>
                            <span className="font-medium text-slate-700 dark:text-slate-300">
                              {course.progress}%
                            </span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6 lg:col-span-5">
              {/* Top Students */}
              <Card className="dark:border-slate-700 overflow-hidden shadow-md">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent">
                  <div className="flex items-center justify-between">
                    <CardTitle>{language === 'ar' ? 'الطلاب المتميزون' : 'Top Students'}</CardTitle>
                    <Link to="/professor/students" className="text-xs text-cloud hover:underline">
                      {language === 'ar' ? 'عرض الكل' : 'View All'}
                    </Link>
                  </div>
                  <CardDescription>
                    {language === 'ar' ? 'الطلاب الأعلى أداءً في مقرراتك' : 'Best performing students in your courses'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topStudents.map(student => (
                      <div key={student.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-cloud/10 text-cloud">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-slate-900 dark:text-slate-100">{student.name}</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{student.course}</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          {student.grade}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pending Assignments */}
              <Card className="dark:border-slate-700 overflow-hidden shadow-md">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-transparent dark:from-amber-900/20 dark:to-transparent">
                  <div className="flex items-center justify-between">
                    <CardTitle>{language === 'ar' ? 'الواجبات المعلقة' : 'Pending Assignments'}</CardTitle>
                    <Link to="/professor/assignments" className="text-xs text-amber-600 hover:underline">
                      {language === 'ar' ? 'عرض الكل' : 'View All'}
                    </Link>
                  </div>
                  <CardDescription>
                    {language === 'ar' ? 'واجبات تحتاج إلى تصحيح' : 'Assignments that need grading'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingAssignments.map(assignment => (
                      <div key={assignment.id} className="border-b dark:border-slate-700 pb-3 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-cloud-dark dark:text-cloud-light">{assignment.title}</h4>
                          <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-0">
                            {assignment.course}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {language === 'ar' ? `${assignment.submissions} تسليم` : `${assignment.submissions} submissions`}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {language === 'ar' ? `يستحق في ${assignment.dueDate}` : `Due on ${assignment.dueDate}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfessorDashboard;