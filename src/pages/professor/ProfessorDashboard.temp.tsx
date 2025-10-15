import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Bell, BookOpen, Calendar, Users, FileText, LogOut, Download, 
  BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, 
  TrendingUp, ArrowUpRight, ArrowDownRight, Filter, ChevronDown, ChevronUp, Eye
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ProfessorSidebar from '@/components/ProfessorSidebar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, XAxis, YAxis, 
  ResponsiveContainer, CartesianGrid, Legend, Tooltip as RechartsTooltip 
} from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ProfessorDashboard = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  // بيانات وهمية
  const professorName = language === 'ar' ? "د. سارة الأحمد" : "Dr. Sarah Johnson";
  const professorId = "PR98765432";
  const [timeframe, setTimeframe] = useState('week');
  const [exportFormat, setExportFormat] = useState('csv');
  const [activeStatTab, setActiveStatTab] = useState('performance');
  const [showPerformanceDetails, setShowPerformanceDetails] = useState(false);
  
  // بيانات الإحصائيات والرسوم البيانية - تعريف مختصر للتجربة
  const classAttendanceData = [
    { course: 'ITCL201', attendance: 92, target: 95, absent: 8 },
    { course: 'ITBS106', attendance: 87, target: 95, absent: 13 },
    { course: 'AHEC102', attendance: 94, target: 95, absent: 6 },
  ];
  
  const upcomingClasses = [
    { id: 1, title: language === 'ar' ? "محاضرة ITCL201" : "ITCL201 Lecture", date: "2025-05-11 10:00 AM", location: language === 'ar' ? "قاعة 305" : "Room 305" },
    { id: 2, title: language === 'ar' ? "معمل ITBS106" : "ITBS106 Lab Session", date: "2025-05-12 2:00 PM", location: language === 'ar' ? "معمل 204" : "Lab 204" },
    { id: 3, title: language === 'ar' ? "الساعات المكتبية" : "Office Hours", date: "2025-05-14 11:30 AM", location: language === 'ar' ? "مكتب 512" : "Office 512" },
  ];

  const handleLogout = () => {
    toast({
      title: language === 'ar' ? "تم تسجيل الخروج بنجاح" : "Logged out successfully",
      description: language === 'ar' ? "شكراً لاستخدامك منصة حسام كلاود" : "Thank you for using Hossam Cloud Platform",
    });
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      <ProfessorSidebar />
      
      <main className={cn(
        "flex-1 p-6 md:p-8 overflow-auto transition-all duration-300",
        language === 'ar' ? "md:mr-64" : "md:ml-64"
      )}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 mt-16">
            <h1 className="text-2xl font-bold tracking-tight">{language === 'ar' ? "لوحة تحكم الأستاذ" : "Professor Dashboard"}</h1>
            <div className="flex mt-4 md:mt-0 space-x-2 rtl:space-x-reverse">
              <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                {language === 'ar' ? "تسجيل الخروج" : "Logout"}
              </Button>
            </div>
          </div>
          
          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card className="dark:border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {language === 'ar' ? "المقررات النشطة" : "Active Courses"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">3</div>
                  <BookOpen className="h-8 w-8 text-cloud opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="dark:border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {language === 'ar' ? "إجمالي الطلاب" : "Total Students"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">248</div>
                  <Users className="h-8 w-8 text-cloud opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="dark:border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {language === 'ar' ? "الفصول المقبلة" : "Upcoming Classes"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{upcomingClasses.length}</div>
                  <Calendar className="h-8 w-8 text-cloud opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="dark:border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {language === 'ar' ? "متوسط الحضور" : "Avg. Attendance"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">91%</div>
                  <TrendingUp className="h-8 w-8 text-emerald-500" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Attendance Section */}
            <Card className="dark:border-slate-800 lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  {language === 'ar' ? "إحصائيات الحضور" : "Attendance Statistics"}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' ? "نسبة الحضور لكل مقرر" : "Attendance rate by course"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {classAttendanceData.map((item) => (
                    <div key={item.course} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="font-medium">{item.course}</span>
                          <span className="ml-2 text-sm text-slate-500 dark:text-slate-400">
                            {language === 'ar' ? "المستهدف" : "Target"}: {item.target}%
                          </span>
                        </div>
                        <span className="font-medium">{item.attendance}%</span>
                      </div>
                      <div className="relative">
                        <Progress value={item.attendance} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Classes */}
            <Card className="dark:border-slate-800">
              <CardHeader>
                <CardTitle>{language === 'ar' ? "الفصول القادمة" : "Upcoming Classes"}</CardTitle>
                <CardDescription>
                  {language === 'ar' ? "جدول المحاضرات والمعامل" : "Schedule of lectures and labs"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingClasses.map((classItem) => (
                    <div key={classItem.id} className="flex justify-between border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{classItem.title}</p>
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <Calendar className="h-3 w-3" />
                          <span>{classItem.date}</span>
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {classItem.location}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title={language === 'ar' ? "عرض التفاصيل" : "View Details"}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Card at bottom */}
          <Card className="mt-6 dark:border-slate-800">
            <CardHeader className="pb-3">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src="/images/avatars/prof-sarah.png" alt={professorName} />
                  <AvatarFallback>{professorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{professorName}</CardTitle>
                  <CardDescription>{language === 'ar' ? `رقم التعريف: ${professorId}` : `ID: ${professorId}`}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProfessorDashboard;
