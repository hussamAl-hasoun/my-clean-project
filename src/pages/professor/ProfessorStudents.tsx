
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, User, UserPlus, GraduationCap, Mail, Phone } from 'lucide-react';
import ProfessorSidebar from '@/components/ProfessorSidebar';
import { useLanguage } from '@/hooks/useLanguage';

const ProfessorStudents = () => {
  const { language } = useLanguage();
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

  // Sample data for students
  const students = [
    {
      id: 1,
      name: language === 'ar' ? "أحمد محمد" : "Ahmad Mohammed",
      studentId: "ST12345",
      email: "ahmad.m@example.com",
      phone: "+966 50 123 4567",
      courses: ["ITCL201", "ITBS106"],
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200",
    },
    {
      id: 2,
      name: language === 'ar' ? "فاطمة علي" : "Fatima Ali",
      studentId: "ST12346",
      email: "fatima.a@example.com",
      phone: "+966 55 234 5678",
      courses: ["ITCL201", "AHEC102"],
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
    },
    {
      id: 3,
      name: language === 'ar' ? "عبدالله سالم" : "Abdullah Salem",
      studentId: "ST12347",
      email: "abdullah.s@example.com",
      phone: "+966 56 345 6789",
      courses: ["ITBS106", "AHEC102"],
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    },
    {
      id: 4,
      name: language === 'ar' ? "نورة عبد الرحمن" : "Noura Abdulrahman",
      studentId: "ST12348",
      email: "noura.a@example.com",
      phone: "+966 59 456 7890",
      courses: ["ITCL201", "ITBS106", "AHEC102"],
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    },
    {
      id: 5,
      name: language === 'ar' ? "خالد محمد" : "Khalid Mohammed",
      studentId: "ST12349",
      email: "khalid.m@example.com",
      phone: "+966 54 567 8901",
      courses: ["ITBS106"],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    },
    {
      id: 6,
      name: language === 'ar' ? "هند أحمد" : "Hind Ahmed",
      studentId: "ST12350",
      email: "hind.a@example.com",
      phone: "+966 53 678 9012",
      courses: ["AHEC102"],
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    },
  ];

  // Filter students based on search term and course filter
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCourse = courseFilter === 'all' || student.courses.includes(courseFilter);
    
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      <ProfessorSidebar />
      
      <main className="flex-1 p-6 overflow-auto md:ml-64 rtl:md:ml-0 rtl:md:mr-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-2xl font-bold text-cloud-dark dark:text-white mb-4 md:mb-0">
              {language === 'ar' ? 'الطلاب' : 'Students'}
            </h1>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder={language === 'ar' ? "البحث عن الطلاب..." : "Search students..."} 
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
                      {course.id} - {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
                <Card key={student.id} className="dark:border-slate-800 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 border border-slate-200 dark:border-slate-700">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback className="bg-cloud text-white">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{student.name}</CardTitle>
                        <CardDescription className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {student.studentId}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-slate-500" />
                        <span className="text-slate-600 dark:text-slate-300">{student.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-slate-500" />
                        <span className="text-slate-600 dark:text-slate-300">{student.phone}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-slate-500 mb-2">
                        {language === 'ar' ? 'المقررات المسجلة:' : 'Enrolled Courses:'}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {student.courses.map(courseId => (
                          <Badge key={courseId} variant="outline" className="bg-cloud/10 text-cloud border-none">
                            {courseId}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex pt-2">
                      <Button variant="default" size="sm" className="w-full">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        {language === 'ar' ? 'عرض السجل الأكاديمي' : 'View Academic Record'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <User className="h-16 w-16 text-slate-300 dark:text-slate-700 mb-4" />
                <p className="text-slate-500 dark:text-slate-400 mb-4">
                  {language === 'ar' ? 'لم يتم العثور على طلاب مطابقين لبحثك' : 'No students found matching your search'}
                </p>
                <Button variant="outline">
                  <UserPlus className="h-4 w-4 mr-2" />
                  {language === 'ar' ? 'إضافة طالب جديد' : 'Add New Student'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfessorStudents;
