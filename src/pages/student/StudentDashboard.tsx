import { type FC, memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, BookOpen, Calendar, FileText, LogOut, BookUser, Activity, BadgeCheck, Trophy } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import StudentSidebar from '@/components/StudentSidebar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useGamification } from '@/components/providers/gamification-provider';
import { cn } from '@/lib/utils';

const StudentDashboard: FC = memo(() => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { points, level, badges, leaderboard, userRank } = useGamification();
  
  // Filter to get only unlocked badges
  const unlockedBadges = badges.filter(badge => badge.unlocked);

  // بيانات وهمية
  const studentName = language === 'ar' ? "محمد أحمد" : "John Smith";
  const studentId = "ST12345678";
  
  const recentAnnouncements = [
    { id: 1, title: language === 'ar' ? "تم نشر جدول الاختبارات النصفية" : "Midterm Schedule Published", date: "2025-05-08", course: "ITCL201", important: true },
    { id: 2, title: language === 'ar' ? "تم تمديد موعد التسليم" : "Submission Deadline Extended", date: "2025-05-05", course: "ITBS106", important: false },
    { id: 3, title: language === 'ar' ? "موارد تعليمية جديدة متاحة" : "New Learning Resources Available", date: "2025-05-01", course: "AHEC101", important: false },
  ];
  
  const upcomingAssignments = [
    { id: 1, title: language === 'ar' ? "مقال عن هندسة السحابة" : "Cloud Architecture Essay", due: "2025-05-15", course: "ITCL201" },
    { id: 2, title: language === 'ar' ? "الواجب البرمجي #3" : "Programming Assignment #3", due: "2025-05-18", course: "ITBS106" },
    { id: 3, title: language === 'ar' ? "عرض تقديمي بحثي" : "Research Presentation", due: "2025-05-20", course: "AHEC102" },
  ];
  
  const enrolledCourses = [
    { id: 1, code: "ITCL201", title: language === 'ar' ? "البرمجة الأساسية للسحابة" : "Basic Programming for Cloud", progress: 65, image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1200" },
    { id: 2, code: "ITBS106", title: language === 'ar' ? "هياكل البيانات" : "Data Structures", progress: 42, image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200" },
    { id: 3, code: "AHEC102", title: language === 'ar' ? "التخطيط الأكاديمي للطالب" : "Student Academic Planning", progress: 78, image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=1200" },
    { id: 4, code: "AHEE101", title: language === 'ar' ? "اللغة الإنجليزية للعلوم ١" : "English for Science I", progress: 90, image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" },
  ];
  
  const upcomingEvents = [
    { id: 1, title: language === 'ar' ? "محاضرة ITCL201" : "ITCL201 Lecture", date: "2025-05-11 10:00 AM", location: language === 'ar' ? "قاعة 305" : "Room 305" },
    { id: 2, title: language === 'ar' ? "اجتماع مجموعة الدراسة" : "Study Group Meeting", date: "2025-05-12 2:00 PM", location: language === 'ar' ? "المكتبة" : "Library" },
    { id: 3, title: language === 'ar' ? "جلسة الإرشاد الأكاديمي" : "Academic Advising Session", date: "2025-05-14 11:30 AM", location: language === 'ar' ? "مبنى الإدارة" : "Admin Building" },
  ];

  const handleLogout = () => {
    toast({
      title: language === 'ar' ? "تم تسجيل الخروج بنجاح" : "Logged out successfully",
      description: language === 'ar' ? "شكراً لاستخدامك منصة حسام كلاود" : "Thank you for using Hossam Cloud Platform",
    });
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 mt-16">
      <StudentSidebar />
      
      <main className={cn(
        "flex-1 p-6 md:p-8 overflow-auto transition-all duration-300",
        language === 'ar' ? "md:mr-64" : "md:ml-64"
      )}>
        <div className="max-w-7xl mx-auto">
          {/* Header with welcome message and avatar */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-8 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20 border-4 border-cloud/20">
                  <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=200" />
                  <AvatarFallback className="bg-cloud text-white text-lg">
                    {language === 'ar' ? 'م أ' : 'JS'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold text-cloud-dark dark:text-white mb-2">
                    {language === 'ar' ? `مرحباً، ${studentName}` : `Welcome, ${studentName}`}
                  </h1>
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                    <BadgeCheck className="h-5 w-5 text-cloud" />
                    <span className="text-lg">{language === 'ar' ? `رقم الطالب: ${studentId}` : `Student ID: ${studentId}`}</span>
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
                  {language === 'ar' ? 'المقررات المسجلة' : 'Enrolled Courses'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-cloud/10 p-2 rounded-lg">
                      <BookOpen className="h-6 w-6 text-cloud" />
                    </div>
                    <span className="text-2xl font-bold dark:text-white">{enrolledCourses.length}</span>
                  </div>
                  <Link to="/student/courses" className="text-xs text-cloud hover:underline">
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
                    <span className="text-2xl font-bold dark:text-white">{upcomingAssignments.length}</span>
                  </div>
                  <Link to="/student/assignments" className="text-xs text-amber-600 dark:text-amber-300 hover:underline">
                    {language === 'ar' ? 'عرض الكل' : 'View All'}
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-blue-50/30 dark:from-blue-900/20 dark:to-blue-800/5 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {language === 'ar' ? 'الإعلانات' : 'Announcements'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                      <Bell className="h-6 w-6 text-blue-500 dark:text-blue-300" />
                    </div>
                    <span className="text-2xl font-bold dark:text-white">{recentAnnouncements.length}</span>
                  </div>
                  <Link to="/student/announcements" className="text-xs text-blue-600 dark:text-blue-300 hover:underline">
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
                  <Link to="/student/calendar" className="text-xs text-green-600 dark:text-green-300 hover:underline">
                    {language === 'ar' ? 'عرض الكل' : 'View All'}
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Gamification widget */}
          <div className="mb-6">
            <Card className="bg-gradient-to-r from-purple-50 to-purple-50/30 dark:from-purple-900/20 dark:to-purple-800/5 dark:border-slate-700 shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-purple-500 dark:text-purple-300" />
                    <CardTitle>
                      {language === 'ar' ? 'تقدمك التعليمي' : 'Your Learning Progress'}
                    </CardTitle>
                  </div>
                  <Link to="/student/gamification">
                    <Button variant="outline" size="sm" className="text-purple-500 dark:text-purple-300 border-purple-200 dark:border-purple-800/50 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                      {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                    </Button>
                  </Link>
                </div>
                <CardDescription>
                  {language === 'ar' ? 'نظام المكافآت والإنجازات' : 'Rewards and achievements system'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Points and level */}
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                        <Trophy className="h-5 w-5 text-purple-500 dark:text-purple-300" />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-800 dark:text-slate-200">
                          {language === 'ar' ? 'النقاط والمستوى' : 'Points & Level'}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white flex items-center justify-center font-bold text-xl">
                        {level.current}
                      </div>
                      <div>
                        <div className="font-semibold text-2xl text-purple-500 dark:text-purple-300">
                          {points}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {language === 'ar' ? 'نقطة مكتسبة' : 'points earned'}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-xs text-right mb-1 text-slate-500">
                        {level.nextLevel - points} {language === 'ar' ? 'نقطة للمستوى التالي' : 'points to next level'}
                      </div>
                      <Progress value={level.progress} className="h-2 bg-purple-100 dark:bg-purple-900/30" indicatorClassName="bg-gradient-to-r from-purple-500 to-indigo-500" />
                    </div>
                  </div>
                  
                  {/* Recent badges */}
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                        <BadgeCheck className="h-5 w-5 text-purple-500 dark:text-purple-300" />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-800 dark:text-slate-200">
                          {language === 'ar' ? 'الشارات' : 'Badges'}
                        </h3>
                        <div className="text-xs text-slate-500">
                          {unlockedBadges.length}/{badges.length} {language === 'ar' ? 'مفتوحة' : 'unlocked'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {unlockedBadges.slice(0, 4).map(badge => (
                        <div key={badge.id} className="group relative" title={badge.name}>
                          <img 
                        src={badge.image} 
                        alt={badge.name} 
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        width="300"
                        height="200"
                      />
                        </div>
                      ))}
                      {unlockedBadges.length > 4 && (
                        <Link to="/student/gamification" className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-500 dark:text-purple-300 font-bold">
                          +{unlockedBadges.length - 4}
                        </Link>
                      )}
                    </div>
                  </div>
                  
                  {/* Leaderboard position */}
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                        <Activity className="h-5 w-5 text-purple-500 dark:text-purple-300" />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-800 dark:text-slate-200">
                          {language === 'ar' ? 'ترتيبك' : 'Your Rank'}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="text-center py-2">
                      <div className="text-4xl font-bold text-purple-500 dark:text-purple-300">
                        {userRank}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {language === 'ar' ? 'من أصل' : 'out of'} {leaderboard.length} {language === 'ar' ? 'طالب' : 'students'}
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex items-center justify-center gap-2">
                          {leaderboard.slice(0, 3).map((student, index) => (
                            <div key={student.id} className="relative">
                              <Avatar className={`border-2 ${
                                index === 0 
                                  ? 'border-amber-400 h-10 w-10' 
                                  : index === 1 
                                    ? 'border-slate-300 h-8 w-8 opacity-90' 
                                    : 'border-amber-700 h-7 w-7 opacity-80'
                              }`}>
                                <AvatarImage src={student.avatar} />
                                <AvatarFallback className="bg-purple-200 text-purple-700">
                                  {student.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className={`absolute -bottom-1 -right-1 rounded-full flex items-center justify-center text-xs w-4 h-4 ${
                                index === 0 
                                  ? 'bg-amber-400 text-white' 
                                  : index === 1 
                                    ? 'bg-slate-300 text-slate-700' 
                                    : 'bg-amber-700 text-white'
                              }`}>
                                {index + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Course progress section */}
            <Card className="lg:col-span-7 dark:border-slate-700 overflow-hidden shadow-md">
              <CardHeader className="bg-gradient-to-r from-cloud/5 to-transparent dark:from-cloud/10 dark:to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{language === 'ar' ? 'المقررات المسجلة' : 'Enrolled Courses'}</CardTitle>
                    <CardDescription>
                      {language === 'ar' ? 'مقررات الفصل الدراسي الحالي والتقدم' : 'Your current semester courses and progress'}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-cloud" />
                    <span className="text-sm font-medium text-cloud">
                      {language === 'ar' ? 'متوسط التقدم: 69%' : 'Average Progress: 69%'}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enrolledCourses.map(course => (
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
                          <Link to={`/student/courses/${course.code}`} className="text-xs px-3 py-1 rounded-full bg-cloud/10 text-cloud hover:bg-cloud/20 transition-colors">
                            {language === 'ar' ? 'عرض المقرر' : 'View Course'}
                          </Link>
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-500 dark:text-slate-400">
                              {language === 'ar' ? 'التقدم' : 'Progress'}
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
              {/* Announcements card */}
              <Card className="dark:border-slate-700 overflow-hidden shadow-md">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent">
                  <div className="flex items-center justify-between">
                    <CardTitle>{language === 'ar' ? 'آخر الإعلانات' : 'Recent Announcements'}</CardTitle>
                    <Link to="/student/announcements" className="text-xs text-cloud hover:underline">
                      {language === 'ar' ? 'عرض الكل' : 'View All'}
                    </Link>
                  </div>
                  <CardDescription>
                    {language === 'ar' ? 'آخر التحديثات من مقرراتك' : 'Latest updates from your courses'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAnnouncements.map(announcement => (
                      <div key={announcement.id} className={`border-b dark:border-slate-700 pb-3 last:border-0 last:pb-0 ${announcement.important ? 'relative' : ''}`}>
                        {announcement.important && (
                          <Badge className="absolute -top-1 -right-1 bg-red-500 text-white">
                            {language === 'ar' ? 'مهم' : 'Important'}
                          </Badge>
                        )}
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-cloud-dark dark:text-cloud-light">{announcement.title}</h4>
                          <Badge variant="outline" className="bg-cloud/10 text-cloud dark:bg-cloud/20 dark:text-cloud-light border-0">
                            {announcement.course}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {language === 'ar' ? `نُشر في ${announcement.date}` : `Posted on ${announcement.date}`}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Assignments card */}
              <Card className="dark:border-slate-700 overflow-hidden shadow-md">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-transparent dark:from-amber-900/20 dark:to-transparent">
                  <div className="flex items-center justify-between">
                    <CardTitle>{language === 'ar' ? 'المواعيد النهائية القادمة' : 'Upcoming Deadlines'}</CardTitle>
                    <Link to="/student/assignments" className="text-xs text-amber-600 hover:underline">
                      {language === 'ar' ? 'عرض الكل' : 'View All'}
                    </Link>
                  </div>
                  <CardDescription>
                    {language === 'ar' ? 'واجبات مستحقة قريباً' : 'Assignments due soon'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAssignments.map(assignment => (
                      <div key={assignment.id} className="border-b dark:border-slate-700 pb-3 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-cloud-dark dark:text-cloud-light">{assignment.title}</h4>
                          <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-0">
                            {assignment.course}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {language === 'ar' ? `يستحق في ${assignment.due}` : `Due on ${assignment.due}`}
                        </p>
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
});

export default StudentDashboard;
