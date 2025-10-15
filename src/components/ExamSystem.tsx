import { type FC, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';
import { 
  FileText, 
  Clock, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  PlusCircle, 
  Trash2, 
  Edit, 
  Eye,
  BarChart3,
  FileQuestion,
  CheckSquare,
  Calendar,
  Layers
} from 'lucide-react';
import { Progress } from './ui/progress';

interface ExamSystemProps {
  courseId?: string;
}

const ExamSystem: FC<ExamSystemProps> = ({ courseId = 'ITCL201' }) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  // State for active tab
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Mock data for exams
  const exams = {
    upcoming: [
      {
        id: 1,
        title: isArabic ? 'الاختبار النصفي' : 'Midterm Exam',
        course: courseId,
        date: '2025-06-15',
        time: '10:00 AM',
        duration: 90,
        questions: 30,
        status: 'published'
      },
      {
        id: 2,
        title: isArabic ? 'اختبار قصير #3' : 'Quiz #3',
        course: courseId,
        date: '2025-05-28',
        time: '2:00 PM',
        duration: 20,
        questions: 10,
        status: 'draft'
      }
    ],
    past: [
      {
        id: 3,
        title: isArabic ? 'اختبار قصير #2' : 'Quiz #2',
        course: courseId,
        date: '2025-05-10',
        time: '2:00 PM',
        duration: 20,
        questions: 10,
        submissions: 82,
        averageScore: 78,
        status: 'completed'
      },
      {
        id: 4,
        title: isArabic ? 'اختبار قصير #1' : 'Quiz #1',
        course: courseId,
        date: '2025-04-25',
        time: '2:00 PM',
        duration: 20,
        questions: 10,
        submissions: 85,
        averageScore: 72,
        status: 'completed'
      }
    ]
  };
  
  // Mock data for question types
  const questionTypes = [
    { id: 'multiple-choice', name: isArabic ? 'اختيار من متعدد' : 'Multiple Choice' },
    { id: 'true-false', name: isArabic ? 'صح/خطأ' : 'True/False' },
    { id: 'short-answer', name: isArabic ? 'إجابة قصيرة' : 'Short Answer' },
    { id: 'essay', name: isArabic ? 'مقالي' : 'Essay' },
    { id: 'matching', name: isArabic ? 'مطابقة' : 'Matching' }
  ];
  
  // State for new exam form
  const [newExam, setNewExam] = useState({
    title: '',
    date: '',
    time: '',
    duration: 60,
    instructions: '',
    questionType: 'multiple-choice'
  });
  
  // Function to handle form submission
  const handleCreateExam = () => {
    // In a real app, this would save the exam to a database
    console.log('Creating new exam:', newExam);
    // Reset form
    setNewExam({
      title: '',
      date: '',
      time: '',
      duration: 60,
      instructions: '',
      questionType: 'multiple-choice'
    });
    // Switch to upcoming tab to show the new exam
    setActiveTab('upcoming');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            {isArabic ? 'نظام الاختبارات' : 'Exam System'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            {isArabic 
              ? 'إنشاء وإدارة الاختبارات عبر الإنترنت مع تصحيح تلقائي' 
              : 'Create and manage online exams with automatic grading'
            }
          </p>
        </div>
        
        <Button className="gap-2">
          <PlusCircle size={16} />
          {isArabic ? 'إنشاء اختبار جديد' : 'Create New Exam'}
        </Button>
      </div>
      
      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="upcoming">
            {isArabic ? 'الاختبارات القادمة' : 'Upcoming Exams'}
          </TabsTrigger>
          <TabsTrigger value="past">
            {isArabic ? 'الاختبارات السابقة' : 'Past Exams'}
          </TabsTrigger>
          <TabsTrigger value="create">
            {isArabic ? 'إنشاء اختبار' : 'Create Exam'}
          </TabsTrigger>
        </TabsList>
        
        {/* Upcoming Exams Tab */}
        <TabsContent value="upcoming" className="space-y-4">
          {exams.upcoming.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-slate-500 dark:text-slate-400">
                  {isArabic ? 'لا توجد اختبارات قادمة' : 'No upcoming exams'}
                </p>
              </CardContent>
            </Card>
          ) : (
            exams.upcoming.map(exam => (
              <Card key={exam.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{exam.title}</CardTitle>
                    <Badge variant={exam.status === 'published' ? 'default' : 'outline'}>
                      {exam.status === 'published' 
                        ? (isArabic ? 'منشور' : 'Published') 
                        : (isArabic ? 'مسودة' : 'Draft')
                      }
                    </Badge>
                  </div>
                  <CardDescription>{exam.course}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-slate-500" />
                      <span>
                        {isArabic 
                          ? `${exam.date} - ${exam.time}` 
                          : `${exam.date} - ${exam.time}`
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-slate-500" />
                      <span>
                        {isArabic 
                          ? `${exam.duration} دقيقة` 
                          : `${exam.duration} minutes`
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileQuestion size={18} className="text-slate-500" />
                      <span>
                        {isArabic 
                          ? `${exam.questions} سؤال` 
                          : `${exam.questions} questions`
                        }
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Eye size={16} className="mr-1" />
                    {isArabic ? 'معاينة' : 'Preview'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit size={16} className="mr-1" />
                    {isArabic ? 'تعديل' : 'Edit'}
                  </Button>
                  {exam.status !== 'published' && (
                    <Button size="sm">
                      {isArabic ? 'نشر' : 'Publish'}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>
        
        {/* Past Exams Tab */}
        <TabsContent value="past" className="space-y-4">
          {exams.past.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-slate-500 dark:text-slate-400">
                  {isArabic ? 'لا توجد اختبارات سابقة' : 'No past exams'}
                </p>
              </CardContent>
            </Card>
          ) : (
            exams.past.map(exam => (
              <Card key={exam.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{exam.title}</CardTitle>
                    <Badge variant="success">
                      {isArabic ? 'مكتمل' : 'Completed'}
                    </Badge>
                  </div>
                  <CardDescription>{exam.course}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-slate-500" />
                      <span>
                        {isArabic 
                          ? `${exam.date} - ${exam.time}` 
                          : `${exam.date} - ${exam.time}`
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={18} className="text-slate-500" />
                      <span>
                        {isArabic 
                          ? `${exam.submissions} تسليم` 
                          : `${exam.submissions} submissions`
                        }
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">
                        {isArabic ? 'متوسط الدرجات' : 'Average Score'}
                      </span>
                      <span className="font-medium">{exam.averageScore}%</span>
                    </div>
                    <Progress value={exam.averageScore} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <BarChart3 size={16} className="mr-1" />
                    {isArabic ? 'التحليلات' : 'Analytics'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye size={16} className="mr-1" />
                    {isArabic ? 'عرض النتائج' : 'View Results'}
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>
        
        {/* Create Exam Tab */}
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>
                {isArabic ? 'إنشاء اختبار جديد' : 'Create New Exam'}
              </CardTitle>
              <CardDescription>
                {isArabic 
                  ? 'قم بإعداد اختبار جديد لطلابك' 
                  : 'Set up a new exam for your students'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {isArabic ? 'عنوان الاختبار' : 'Exam Title'}
                  </label>
                  <Input 
                    value={newExam.title}
                    onChange={(e) => setNewExam({...newExam, title: e.target.value})}
                    placeholder={isArabic ? 'أدخل عنوان الاختبار' : 'Enter exam title'}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {isArabic ? 'نوع الأسئلة' : 'Question Type'}
                  </label>
                  <Select 
                    value={newExam.questionType}
                    onValueChange={(value) => setNewExam({...newExam, questionType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={isArabic ? 'اختر نوع الأسئلة' : 'Select question type'} />
                    </SelectTrigger>
                    <SelectContent>
                      {questionTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {isArabic ? 'تاريخ الاختبار' : 'Exam Date'}
                  </label>
                  <Input 
                    type="date"
                    value={newExam.date}
                    onChange={(e) => setNewExam({...newExam, date: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {isArabic ? 'وقت الاختبار' : 'Exam Time'}
                  </label>
                  <Input 
                    type="time"
                    value={newExam.time}
                    onChange={(e) => setNewExam({...newExam, time: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {isArabic ? 'المدة (بالدقائق)' : 'Duration (minutes)'}
                  </label>
                  <Input 
                    type="number"
                    value={newExam.duration}
                    onChange={(e) => setNewExam({...newExam, duration: parseInt(e.target.value)})}
                    min={5}
                    max={180}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {isArabic ? 'تعليمات الاختبار' : 'Exam Instructions'}
                </label>
                <Textarea 
                  value={newExam.instructions}
                  onChange={(e) => setNewExam({...newExam, instructions: e.target.value})}
                  placeholder={isArabic ? 'أدخل تعليمات الاختبار...' : 'Enter exam instructions...'}
                  rows={4}
                />
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Layers size={18} />
                  {isArabic ? 'بنك الأسئلة' : 'Question Bank'}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  {isArabic 
                    ? 'يمكنك إضافة أسئلة من بنك الأسئلة أو إنشاء أسئلة جديدة' 
                    : 'You can add questions from the question bank or create new questions'
                  }
                </p>
                <Button variant="outline" className="w-full justify-center gap-2">
                  <PlusCircle size={16} />
                  {isArabic ? 'إضافة أسئلة' : 'Add Questions'}
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab('upcoming')}>
                {isArabic ? 'إلغاء' : 'Cancel'}
              </Button>
              <div className="flex gap-2">
                <Button variant="outline">
                  {isArabic ? 'حفظ كمسودة' : 'Save as Draft'}
                </Button>
                <Button onClick={handleCreateExam}>
                  {isArabic ? 'إنشاء الاختبار' : 'Create Exam'}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExamSystem;
