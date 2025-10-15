
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { useLanguage } from '@/hooks/useLanguage';
import { Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Legend, Tooltip } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, Users, Calendar, BookOpen, BookUser } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LearningDashboard = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  // Mock data for course completion
  const courseCompletionData = [
    { name: 'ITCL201', completed: 65, total: 100, color: '#0ea5e9' },
    { name: 'ITBS106', completed: 42, total: 100, color: '#8b5cf6' },
    { name: 'AHEC102', completed: 78, total: 100, color: '#10b981' },
    { name: 'AHEE101', completed: 90, total: 100, color: '#f97316' },
  ];

  // Mock data for weekly activity
  const weeklyActivityData = [
    { name: language === 'ar' ? 'السبت' : 'Sat', hours: 2.5, assignments: 1 },
    { name: language === 'ar' ? 'الأحد' : 'Sun', hours: 3.2, assignments: 2 },
    { name: language === 'ar' ? 'الاثنين' : 'Mon', hours: 4.0, assignments: 0 },
    { name: language === 'ar' ? 'الثلاثاء' : 'Tue', hours: 2.8, assignments: 3 },
    { name: language === 'ar' ? 'الأربعاء' : 'Wed', hours: 3.5, assignments: 1 },
    { name: language === 'ar' ? 'الخميس' : 'Thu', hours: 1.5, assignments: 0 },
    { name: language === 'ar' ? 'الجمعة' : 'Fri', hours: 0.5, assignments: 0 },
  ];

  // Mock data for skill distribution
  const skillDistributionData = [
    { name: language === 'ar' ? 'البرمجة' : 'Programming', value: 40, color: '#0ea5e9' },
    { name: language === 'ar' ? 'تحليل البيانات' : 'Data Analysis', value: 25, color: '#8b5cf6' },
    { name: language === 'ar' ? 'الأمن السيبراني' : 'Cybersecurity', value: 15, color: '#10b981' },
    { name: language === 'ar' ? 'الحوسبة السحابية' : 'Cloud Computing', value: 20, color: '#f97316' },
  ];

  // Mock data for top performing students
  const topPerformingStudents = [
    { id: 1, name: language === 'ar' ? 'محمد أحمد' : 'John Smith', course: 'ITBS106', grade: 98, lastActive: '2025-05-12' },
    { id: 2, name: language === 'ar' ? 'فاطمة خالد' : 'Emma Johnson', course: 'AHEC102', grade: 97, lastActive: '2025-05-13' },
    { id: 3, name: language === 'ar' ? 'عبدالله محمد' : 'Michael Brown', course: 'ITCL201', grade: 95, lastActive: '2025-05-14' },
    { id: 4, name: language === 'ar' ? 'نورة سعيد' : 'Sarah Williams', course: 'AHEE101', grade: 92, lastActive: '2025-05-11' },
    { id: 5, name: language === 'ar' ? 'خالد عبدالرحمن' : 'David Miller', course: 'ITCL201', grade: 91, lastActive: '2025-05-10' },
  ];

  // Mock data for recent activity
  const recentActivities = [
    {
      id: 1,
      activity: language === 'ar' ? 'تم تسليم واجب' : 'Assignment Submitted',
      course: 'ITCL201',
      time: '2 hours ago',
      type: 'assignment'
    },
    {
      id: 2,
      activity: language === 'ar' ? 'تم حضور محاضرة' : 'Attended Lecture',
      course: 'AHEC102',
      time: '4 hours ago',
      type: 'lecture'
    },
    {
      id: 3,
      activity: language === 'ar' ? 'تم إكمال اختبار قصير' : 'Completed Quiz',
      course: 'ITBS106',
      time: '1 day ago',
      type: 'quiz'
    },
    {
      id: 4,
      activity: language === 'ar' ? 'تم المشاركة في منتدى النقاش' : 'Participated in Discussion Forum',
      course: 'AHEE101',
      time: '2 days ago',
      type: 'discussion'
    }
  ];

  const chartConfig = {
    programming: {
      label: language === 'ar' ? 'البرمجة' : 'Programming',
      theme: { light: '#0ea5e9', dark: '#0284c7' }
    },
    dataAnalysis: {
      label: language === 'ar' ? 'تحليل البيانات' : 'Data Analysis',
      theme: { light: '#8b5cf6', dark: '#7c3aed' }
    },
    cybersecurity: {
      label: language === 'ar' ? 'الأمن السيبراني' : 'Cybersecurity',
      theme: { light: '#10b981', dark: '#059669' }
    },
    cloudComputing: {
      label: language === 'ar' ? 'الحوسبة السحابية' : 'Cloud Computing',
      theme: { light: '#f97316', dark: '#ea580c' }
    },
    hours: {
      label: language === 'ar' ? 'ساعات الدراسة' : 'Study Hours',
      theme: { light: '#0ea5e9', dark: '#0284c7' }
    },
    assignments: {
      label: language === 'ar' ? 'الواجبات المنجزة' : 'Completed Assignments',
      theme: { light: '#8b5cf6', dark: '#7c3aed' }
    },
  };

  const COLORS = ['#0ea5e9', '#8b5cf6', '#10b981', '#f97316'];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header with title */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 mb-6 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-cloud-dark dark:text-white">
                  {language === 'ar' ? 'لوحة التحليلات التعليمية' : 'Learning Analytics Dashboard'}
                </h1>
                <p className="text-slate-500 dark:text-slate-400">
                  {language === 'ar' ? 'تتبع تقدمك وأدائك الأكاديمي' : 'Track your progress and academic performance'}
                </p>
              </div>
              <Button onClick={() => navigate(-1)} variant="outline">
                {language === 'ar' ? 'العودة' : 'Go Back'}
              </Button>
            </div>
          </div>

          {/* Dashboard overview cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-50/30 dark:from-blue-900/20 dark:to-blue-800/5 dark:border-slate-700 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {language === 'ar' ? 'إجمالي المقررات' : 'Total Courses'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                    <BookOpen className="h-6 w-6 text-blue-500 dark:text-blue-300" />
                  </div>
                  <span className="text-2xl font-bold dark:text-white">4</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-50/30 dark:from-purple-900/20 dark:to-purple-800/5 dark:border-slate-700 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {language === 'ar' ? 'معدل الإنجاز' : 'Completion Rate'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                    <BookUser className="h-6 w-6 text-purple-500 dark:text-purple-300" />
                  </div>
                  <span className="text-2xl font-bold dark:text-white">68%</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-50/30 dark:from-green-900/20 dark:to-green-800/5 dark:border-slate-700 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {language === 'ar' ? 'ساعات الدراسة الأسبوعية' : 'Weekly Study Hours'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                    <Calendar className="h-6 w-6 text-green-500 dark:text-green-300" />
                  </div>
                  <span className="text-2xl font-bold dark:text-white">18.0</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-orange-50 to-orange-50/30 dark:from-orange-900/20 dark:to-orange-800/5 dark:border-slate-700 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {language === 'ar' ? 'المعدل التراكمي' : 'GPA'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
                    <Users className="h-6 w-6 text-orange-500 dark:text-orange-300" />
                  </div>
                  <span className="text-2xl font-bold dark:text-white">3.8</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and detailed analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
            {/* Course completion chart */}
            <Card className="lg:col-span-8 dark:border-slate-700 shadow-md">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{language === 'ar' ? 'تقدم المقررات' : 'Course Progress'}</CardTitle>
                    <CardDescription>
                      {language === 'ar' ? 'نسبة إكمال المقررات الحالية' : 'Completion percentage for current courses'}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs defaultValue="bar">
                  <TabsList className="mb-4">
                    <TabsTrigger value="bar">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      {language === 'ar' ? 'رسم بياني شريطي' : 'Bar Chart'}
                    </TabsTrigger>
                    <TabsTrigger value="line">
                      <LineChartIcon className="h-4 w-4 mr-2" />
                      {language === 'ar' ? 'رسم بياني خطي' : 'Line Chart'}
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="bar">
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <BarChart data={courseCompletionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend content={<ChartLegendContent />} />
                        <Bar dataKey="completed" name={language === 'ar' ? 'مكتمل' : 'Completed'}>
                          {courseCompletionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ChartContainer>
                  </TabsContent>
                  
                  <TabsContent value="line">
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <LineChart data={courseCompletionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend content={<ChartLegendContent />} />
                        <Line 
                          type="monotone" 
                          dataKey="completed" 
                          name={language === 'ar' ? 'مكتمل' : 'Completed'} 
                          stroke="#0ea5e9" 
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ChartContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            {/* Skill distribution pie chart */}
            <Card className="lg:col-span-4 dark:border-slate-700 shadow-md">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-900/20 dark:to-transparent">
                <CardTitle>{language === 'ar' ? 'توزيع المهارات' : 'Skill Distribution'}</CardTitle>
                <CardDescription>
                  {language === 'ar' ? 'توزيع مهاراتك حسب المجال' : 'Your skills by domain'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px]">
                  <PieChart>
                    <Pie
                      data={skillDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {skillDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend 
                      content={<ChartLegendContent />} 
                      verticalAlign="bottom" 
                      align="center" 
                    />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
          
          {/* Weekly activity chart */}
          <Card className="mb-6 dark:border-slate-700 shadow-md">
            <CardHeader className="bg-gradient-to-r from-green-50 to-transparent dark:from-green-900/20 dark:to-transparent">
              <CardTitle>{language === 'ar' ? 'النشاط الأسبوعي' : 'Weekly Activity'}</CardTitle>
              <CardDescription>
                {language === 'ar' ? 'ساعات الدراسة والواجبات المنجزة' : 'Study hours and completed assignments'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={weeklyActivityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#0ea5e9" />
                  <YAxis yAxisId="right" orientation="right" stroke="#8b5cf6" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend content={<ChartLegendContent />} />
                  <Bar 
                    yAxisId="left" 
                    dataKey="hours" 
                    name={language === 'ar' ? 'ساعات' : 'Hours'} 
                    fill="#0ea5e9" 
                  />
                  <Bar 
                    yAxisId="right" 
                    dataKey="assignments" 
                    name={language === 'ar' ? 'واجبات' : 'Assignments'} 
                    fill="#8b5cf6" 
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          
          {/* Bottom section - Top students and recent activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top performing students */}
            <Card className="dark:border-slate-700 shadow-md">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-transparent dark:from-orange-900/20 dark:to-transparent">
                <CardTitle>{language === 'ar' ? 'الطلاب الأعلى أداءً' : 'Top Performing Students'}</CardTitle>
                <CardDescription>
                  {language === 'ar' ? 'الطلاب ذوو الدرجات الأعلى' : 'Students with highest grades'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{language === 'ar' ? 'الاسم' : 'Name'}</TableHead>
                      <TableHead>{language === 'ar' ? 'المقرر' : 'Course'}</TableHead>
                      <TableHead className="text-right">{language === 'ar' ? 'الدرجة' : 'Grade'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topPerformingStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-0">
                            {student.course}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono">{student.grade}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            {/* Recent activity */}
            <Card className="dark:border-slate-700 shadow-md">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-900/20 dark:to-transparent">
                <CardTitle>{language === 'ar' ? 'النشاط الأخير' : 'Recent Activity'}</CardTitle>
                <CardDescription>
                  {language === 'ar' ? 'آخر الأنشطة التعليمية' : 'Latest educational activities'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start p-3 rounded-md bg-slate-50 dark:bg-slate-800/50">
                      <div className={`p-2 rounded-md mr-3 ${
                        activity.type === 'assignment' ? 'bg-blue-100 dark:bg-blue-900/30' : 
                        activity.type === 'lecture' ? 'bg-green-100 dark:bg-green-900/30' :
                        activity.type === 'quiz' ? 'bg-amber-100 dark:bg-amber-900/30' :
                        'bg-purple-100 dark:bg-purple-900/30'
                      }`}>
                        {activity.type === 'assignment' && <BookOpen className="h-5 w-5 text-blue-500 dark:text-blue-300" />}
                        {activity.type === 'lecture' && <Users className="h-5 w-5 text-green-500 dark:text-green-300" />}
                        {activity.type === 'quiz' && <PieChartIcon className="h-5 w-5 text-amber-500 dark:text-amber-300" />}
                        {activity.type === 'discussion' && <LineChartIcon className="h-5 w-5 text-purple-500 dark:text-purple-300" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 dark:text-slate-200">{activity.activity}</p>
                        <div className="flex justify-between mt-1 text-xs">
                          <Badge variant="outline" className="bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-0">
                            {activity.course}
                          </Badge>
                          <span className="text-slate-500 dark:text-slate-400">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningDashboard;
