
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, GraduationCap, TrendingUp, BookUser, Download, BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import StudentSidebar from '@/components/StudentSidebar';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, XAxis, YAxis, 
  ResponsiveContainer, CartesianGrid, Legend, Tooltip 
} from 'recharts';

const Grades = () => {
  const { language } = useLanguage();
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');
  
  const currentSemesterGrades = [
    { 
      id: 1, 
      code: "ITCL201", 
      title: language === 'ar' ? "البرمجة الأساسية للسحابة" : "Basic Programming for Cloud",
      midterm: 85,
      assignments: 78,
      participation: 90,
      final: null,
      total: 65,
      letterGrade: language === 'ar' ? "ب+" : "B+"
    },
    { 
      id: 2, 
      code: "ITBS106", 
      title: language === 'ar' ? "هياكل البيانات" : "Data Structures",
      midterm: 72,
      assignments: 68,
      participation: 85,
      final: null,
      total: 60,
      letterGrade: language === 'ar' ? "ج+" : "C+"
    },
    { 
      id: 3, 
      code: "AHEC102", 
      title: language === 'ar' ? "التخطيط الأكاديمي للطالب" : "Student Academic Planning",
      midterm: 92,
      assignments: 95,
      participation: 100,
      final: null,
      total: 78,
      letterGrade: language === 'ar' ? "أ" : "A"
    },
    { 
      id: 4, 
      code: "AHEE101", 
      title: language === 'ar' ? "اللغة الإنجليزية للعلوم ١" : "English for Science 1",
      midterm: 88,
      assignments: 92,
      participation: 95,
      final: null,
      total: 90,
      letterGrade: language === 'ar' ? "أ+" : "A+"
    },
  ];
  
  const previousSemesterGrades = [
    { 
      id: 1, 
      code: "ITBS105", 
      title: language === 'ar' ? "مقدمة في الحاسب الآلي" : "Introduction to Computing",
      total: 87,
      letterGrade: language === 'ar' ? "أ" : "A",
      semester: language === 'ar' ? "خريف 2024" : "Fall 2024"
    },
    { 
      id: 2, 
      code: "MATH101", 
      title: language === 'ar' ? "حساب التفاضل والتكامل ١" : "Calculus I",
      total: 92,
      letterGrade: language === 'ar' ? "أ+" : "A+",
      semester: language === 'ar' ? "خريف 2024" : "Fall 2024"
    },
    { 
      id: 3, 
      code: "PHYS101", 
      title: language === 'ar' ? "الفيزياء العامة ١" : "General Physics I",
      total: 76,
      letterGrade: language === 'ar' ? "ب" : "B",
      semester: language === 'ar' ? "خريف 2024" : "Fall 2024"
    },
  ];
  
  const gradeStats = [
    { name: language === 'ar' ? 'المعدل التراكمي' : 'GPA', value: '3.76', icon: GraduationCap, color: 'text-purple-500 dark:text-purple-400' },
    { name: language === 'ar' ? 'معدل الفصل الحالي' : 'Current Semester', value: '3.65', icon: TrendingUp, color: 'text-blue-500 dark:text-blue-400' },
    { name: language === 'ar' ? 'مجموع الساعات' : 'Credit Hours', value: '62', icon: BookUser, color: 'text-green-500 dark:text-green-400' },
  ];

  const getGradeColor = (grade: number | null) => {
    if (grade === null) return 'text-slate-400';
    if (grade >= 90) return 'text-green-500 dark:text-green-400';
    if (grade >= 80) return 'text-blue-500 dark:text-blue-400';
    if (grade >= 70) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-red-500 dark:text-red-400';
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <StudentSidebar />
      
      <main className="flex-1 p-4 md:p-6 overflow-auto md:ms-64">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-cloud-dark dark:text-white">
              {language === 'ar' ? 'الدرجات الأكاديمية' : 'Academic Grades'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              {language === 'ar' ? 'استعراض درجاتك للفصل الدراسي الحالي والسابق' : 'View your grades for current and previous semesters'}
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {gradeStats.map((stat, index) => (
              <Card key={index} className="dark:border-slate-700">
                <CardContent className="flex items-center p-6">
                  <div className={`p-3 rounded-full bg-slate-100 dark:bg-slate-800 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4 rtl:mr-4 rtl:ml-0">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.name}</p>
                    <h3 className="text-2xl font-bold text-cloud-dark dark:text-white">{stat.value}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Tabs for Current and Previous Semesters */}
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="mb-4 bg-white dark:bg-slate-800">
              <TabsTrigger value="current">
                {language === 'ar' ? 'الفصل الحالي' : 'Current Semester'}
              </TabsTrigger>
              <TabsTrigger value="previous">
                {language === 'ar' ? 'الفصول السابقة' : 'Previous Semesters'}
              </TabsTrigger>
            </TabsList>
            
            {/* Current Semester Grades */}
            <TabsContent value="current">
              <Card className="dark:border-slate-700">
                <CardHeader>
                  <CardTitle>{language === 'ar' ? 'ربيع 2025' : 'Spring 2025'}</CardTitle>
                  <CardDescription>
                    {language === 'ar' ? 'الدرجات المحدثة حتى تاريخ 12 مايو 2025' : 'Grades updated as of May 12, 2025'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b dark:border-slate-700">
                          <th className="text-start py-3 px-4">{language === 'ar' ? 'المقرر' : 'Course'}</th>
                          <th className="text-center py-3 px-4">{language === 'ar' ? 'الاختبار النصفي' : 'Midterm'}</th>
                          <th className="text-center py-3 px-4">{language === 'ar' ? 'الواجبات' : 'Assignments'}</th>
                          <th className="text-center py-3 px-4">{language === 'ar' ? 'المشاركة' : 'Participation'}</th>
                          <th className="text-center py-3 px-4">{language === 'ar' ? 'النهائي' : 'Final'}</th>
                          <th className="text-center py-3 px-4">{language === 'ar' ? 'المجموع' : 'Total'}</th>
                          <th className="text-center py-3 px-4">{language === 'ar' ? 'التقدير' : 'Grade'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentSemesterGrades.map((course) => (
                          <tr key={course.id} className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="py-3 px-4">
                              <div>
                                <Badge variant="outline" className="mb-1">{course.code}</Badge>
                                <p className="font-medium text-cloud-dark dark:text-cloud-light">{course.title}</p>
                              </div>
                            </td>
                            <td className={`text-center py-3 px-4 ${getGradeColor(course.midterm)}`}>
                              {course.midterm !== null ? `${course.midterm}%` : '-'}
                            </td>
                            <td className={`text-center py-3 px-4 ${getGradeColor(course.assignments)}`}>
                              {course.assignments !== null ? `${course.assignments}%` : '-'}
                            </td>
                            <td className={`text-center py-3 px-4 ${getGradeColor(course.participation)}`}>
                              {course.participation !== null ? `${course.participation}%` : '-'}
                            </td>
                            <td className="text-center py-3 px-4 text-slate-400">
                              {course.final !== null ? `${course.final}%` : language === 'ar' ? 'غير متاح' : 'N/A'}
                            </td>
                            <td className={`text-center py-3 px-4 ${getGradeColor(course.total)}`}>
                              {course.total !== null ? `${course.total}%` : '-'}
                            </td>
                            <td className="text-center py-3 px-4 font-bold">
                              {course.letterGrade}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Grade Visualization Section */}
              <div className="mt-8 mb-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-cloud-dark dark:text-white mb-2 md:mb-0">
                    {language === 'ar' ? 'تحليل الدرجات' : 'Grade Analysis'}
                  </h3>
                  <div className="flex gap-2">
                    <Select value={chartType} onValueChange={(value: any) => setChartType(value)}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder={language === 'ar' ? 'نوع الرسم البياني' : 'Chart Type'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bar">
                          <div className="flex items-center">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            {language === 'ar' ? 'شريطي' : 'Bar Chart'}
                          </div>
                        </SelectItem>
                        <SelectItem value="line">
                          <div className="flex items-center">
                            <LineChartIcon className="h-4 w-4 mr-2" />
                            {language === 'ar' ? 'خطي' : 'Line Chart'}
                          </div>
                        </SelectItem>
                        <SelectItem value="pie">
                          <div className="flex items-center">
                            <PieChartIcon className="h-4 w-4 mr-2" />
                            {language === 'ar' ? 'دائري' : 'Pie Chart'}
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={() => exportGradesToCSV(currentSemesterGrades)}>
                      <Download className="h-4 w-4 mr-2" />
                      {language === 'ar' ? 'تصدير' : 'Export'}
                    </Button>
                  </div>
                </div>
                
                <Card className="dark:border-slate-700 overflow-hidden p-4">
                  <div className="h-[300px] w-full">
                    {chartType === 'bar' && (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={currentSemesterGrades.map(course => ({
                          name: course.code,
                          midterm: course.midterm || 0,
                          assignments: course.assignments || 0,
                          participation: course.participation || 0,
                          total: course.total || 0
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                              borderRadius: '8px',
                              border: '1px solid #e2e8f0'
                            }} 
                          />
                          <Legend />
                          <Bar 
                            dataKey="midterm" 
                            name={language === 'ar' ? 'الاختبار النصفي' : 'Midterm'} 
                            fill="#0ea5e9" 
                            radius={[4, 4, 0, 0]}
                          />
                          <Bar 
                            dataKey="assignments" 
                            name={language === 'ar' ? 'الواجبات' : 'Assignments'} 
                            fill="#8b5cf6" 
                            radius={[4, 4, 0, 0]}
                          />
                          <Bar 
                            dataKey="participation" 
                            name={language === 'ar' ? 'المشاركة' : 'Participation'} 
                            fill="#10b981" 
                            radius={[4, 4, 0, 0]}
                          />
                          <Bar 
                            dataKey="total" 
                            name={language === 'ar' ? 'المجموع' : 'Total'} 
                            fill="#f97316" 
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                    
                    {chartType === 'line' && (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={currentSemesterGrades.map(course => ({
                          name: course.code,
                          midterm: course.midterm || 0,
                          assignments: course.assignments || 0,
                          participation: course.participation || 0,
                          total: course.total || 0
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                              borderRadius: '8px',
                              border: '1px solid #e2e8f0'
                            }} 
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="midterm" 
                            name={language === 'ar' ? 'الاختبار النصفي' : 'Midterm'} 
                            stroke="#0ea5e9" 
                            strokeWidth={2} 
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="assignments" 
                            name={language === 'ar' ? 'الواجبات' : 'Assignments'} 
                            stroke="#8b5cf6" 
                            strokeWidth={2} 
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="participation" 
                            name={language === 'ar' ? 'المشاركة' : 'Participation'} 
                            stroke="#10b981" 
                            strokeWidth={2} 
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="total" 
                            name={language === 'ar' ? 'المجموع' : 'Total'} 
                            stroke="#f97316" 
                            strokeWidth={2} 
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                    
                    {chartType === 'pie' && (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={currentSemesterGrades.map(course => ({
                              name: course.code,
                              value: course.total || 0
                            }))}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                            label={({name, value}) => `${name}: ${value}%`}
                          >
                            {currentSemesterGrades.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={["#0ea5e9", "#8b5cf6", "#10b981", "#f97316"][index % 4]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                              borderRadius: '8px',
                              border: '1px solid #e2e8f0'
                            }} 
                            formatter={(value: any) => [`${value}%`, language === 'ar' ? 'المجموع' : 'Total']}
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </Card>
              </div>
                  
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-slate-700 dark:text-slate-300 text-sm">
                    <p className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                      {language === 'ar' 
                        ? 'ملاحظة: الدرجات النهائية غير متوفرة حتى الآن. المجموع الحالي يمثل التقدم الحالي فقط.'
                        : 'Note: Final exams have not been conducted yet. Current totals represent progress to date.'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Previous Semester Grades */}
            <TabsContent value="previous">
              <Card className="dark:border-slate-700">
                <CardHeader>
                  <CardTitle>{language === 'ar' ? 'الفصول الدراسية السابقة' : 'Previous Academic Semesters'}</CardTitle>
                  <CardDescription>
                    {language === 'ar' ? 'سجل الدرجات الأكاديمية للفصول السابقة' : 'Academic grade records from past semesters'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b dark:border-slate-700">
                          <th className="text-start py-3 px-4">{language === 'ar' ? 'المقرر' : 'Course'}</th>
                          <th className="text-center py-3 px-4">{language === 'ar' ? 'الفصل الدراسي' : 'Semester'}</th>
                          <th className="text-center py-3 px-4">{language === 'ar' ? 'المجموع' : 'Total'}</th>
                          <th className="text-center py-3 px-4">{language === 'ar' ? 'التقدير' : 'Grade'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {previousSemesterGrades.map((course) => (
                          <tr key={course.id} className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="py-3 px-4">
                              <div>
                                <Badge variant="outline" className="mb-1">{course.code}</Badge>
                                <p className="font-medium text-cloud-dark dark:text-cloud-light">{course.title}</p>
                              </div>
                            </td>
                            <td className="text-center py-3 px-4 text-slate-600 dark:text-slate-300">
                              {course.semester}
                            </td>
                            <td className={`text-center py-3 px-4 ${getGradeColor(course.total)}`}>
                              {`${course.total}%`}
                            </td>
                            <td className="text-center py-3 px-4 font-bold">
                              {course.letterGrade}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

// Function to export grades to CSV file
const exportGradesToCSV = (grades: any[]) => {
  // Headers
  const headers = ['Course Code', 'Course Title', 'Midterm', 'Assignments', 'Participation', 'Final', 'Total', 'Grade'];
  
  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...grades.map(grade => [
      grade.code,
      `"${grade.title}"`, // Wrap title in quotes to handle commas
      grade.midterm || '',
      grade.assignments || '',
      grade.participation || '',
      grade.final || '',
      grade.total || '',
      grade.letterGrade
    ].join(','))
  ].join('\n');
  
  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `grades_export_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default Grades;
