
import React, { useState } from 'react';
import ProfessorSidebar from '@/components/ProfessorSidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/hooks/useLanguage';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { SearchIcon, Send, User, MessageCircle, Filter, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface Student {
  id: string;
  name: string;
  courseId: string;
  courseName: string;
  avatar?: string;
  lastMessage: string;
  isOnline: boolean;
  unread: number;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  isMine: boolean;
}

const ProfessorMessages = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: isArabic ? 'محمد أحمد' : 'Mohammed Ahmed',
      courseId: 'CS101',
      courseName: isArabic ? 'مقدمة في البرمجة' : 'Intro to Programming',
      lastMessage: isArabic ? 'هل يمكنني الحصول على مساعدة في المشروع؟' : 'Can I get help with the project?',
      isOnline: true,
      unread: 2,
    },
    {
      id: '2',
      name: isArabic ? 'سارة محمود' : 'Sara Mahmoud',
      courseId: 'CS101',
      courseName: isArabic ? 'مقدمة في البرمجة' : 'Intro to Programming',
      lastMessage: isArabic ? 'شكراً على المساعدة يا دكتور' : 'Thank you for your help, professor',
      isOnline: false,
      unread: 0,
    },
    {
      id: '3',
      name: isArabic ? 'عبدالله علي' : 'Abdullah Ali',
      courseId: 'CS102',
      courseName: isArabic ? 'هياكل البيانات' : 'Data Structures',
      lastMessage: isArabic ? 'متى سيتم نشر نتائج الاختبار؟' : 'When will the exam results be published?',
      isOnline: true,
      unread: 1,
    },
    {
      id: '4',
      name: isArabic ? 'نورة محمد' : 'Nora Mohammed',
      courseId: 'CS102',
      courseName: isArabic ? 'هياكل البيانات' : 'Data Structures',
      lastMessage: isArabic ? 'أريد الاستفسار عن مواعيد المحاضرات' : 'I want to inquire about lecture times',
      isOnline: false,
      unread: 0,
    },
  ]);
  
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(students[0]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCourse, setActiveCourse] = useState<string | null>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: '1',
      content: isArabic ? 'مرحباً دكتور، أحتاج إلى مساعدة في المشروع النهائي' : 'Hello Professor, I need help with the final project',
      timestamp: new Date(2023, 4, 10, 14, 30),
      read: true,
      isMine: false,
    },
    {
      id: '2',
      senderId: 'me',
      content: isArabic ? 'أهلاً محمد، بالتأكيد. ما هي المشكلة التي تواجهها؟' : 'Hi Mohammed, sure. What problem are you facing?',
      timestamp: new Date(2023, 4, 10, 14, 32),
      read: true,
      isMine: true,
    },
    {
      id: '3',
      senderId: '1',
      content: isArabic ? 'أواجه صعوبة في تنفيذ متطلبات المشروع الثالث' : 'I am having difficulty implementing the third requirement of the project',
      timestamp: new Date(2023, 4, 10, 14, 35),
      read: true,
      isMine: false,
    },
    {
      id: '4',
      senderId: '1',
      content: isArabic ? 'هل يمكننا تحديد موعد لمناقشة المشروع؟' : 'Can we schedule a time to discuss the project?',
      timestamp: new Date(2023, 4, 10, 14, 36),
      read: false,
      isMine: false,
    },
  ]);

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    // Mark messages as read when selecting a student
    setStudents(students.map(s => 
      s.id === student.id ? {...s, unread: 0} : s
    ));
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedStudent) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      content: messageInput,
      timestamp: new Date(),
      read: false,
      isMine: true,
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput('');
    
    // Simulate student response after 1.5 seconds
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedStudent.id,
        content: isArabic ? 
          'شكراً دكتور، سأعمل على ذلك' : 
          'Thank you professor, I will work on that',
        timestamp: new Date(),
        read: false,
        isMine: false,
      };
      
      setMessages(prev => [...prev, responseMessage]);
      
      toast({
        title: isArabic ? 'رسالة جديدة' : 'New Message',
        description: isArabic ? 
          `رسالة جديدة من ${selectedStudent.name}` : 
          `New message from ${selectedStudent.name}`,
      });
    }, 1500);
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(isArabic ? 'ar-SA' : 'en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Filter students based on search query and active course
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = !activeCourse || student.courseId === activeCourse;
    return matchesSearch && matchesCourse;
  });
  
  // Get unique courses for filtering
  const courses = [...new Set(students.map(s => s.courseId))];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900">
      <ProfessorSidebar />
      
      <div className={`flex-1 ${isArabic ? 'mr-64 md:mr-64' : 'ml-0 md:ml-64'}`}>
        <div className="p-4 sm:p-6 md:p-8 w-full max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className={`text-2xl font-bold ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? 'الرسائل' : 'Messages'}
            </h1>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>{isArabic ? 'تصفية حسب المقرر' : 'Filter by Course'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setActiveCourse(null)}>
                  <div className="flex items-center w-full">
                    <span>{isArabic ? 'جميع المقررات' : 'All Courses'}</span>
                    {!activeCourse && <Check className="h-4 w-4 ml-auto" />}
                  </div>
                </DropdownMenuItem>
                {courses.map(course => (
                  <DropdownMenuItem key={course} onClick={() => setActiveCourse(course)}>
                    <div className="flex items-center w-full">
                      <span>{course}</span>
                      {activeCourse === course && <Check className="h-4 w-4 ml-auto" />}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-[calc(100vh-180px)] flex overflow-hidden">
            {/* Students sidebar */}
            <div className="w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col">
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder={isArabic ? "بحث..." : "Search students..."}
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map(student => (
                    <div 
                      key={student.id} 
                      className={`p-3 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                        selectedStudent?.id === student.id ? 'bg-gray-100 dark:bg-gray-700' : ''
                      }`}
                      onClick={() => handleSelectStudent(student)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            {student.avatar && <AvatarImage src={student.avatar} alt={student.name} />}
                          </Avatar>
                          {student.isOnline && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-sm truncate">{student.name}</h3>
                            {student.unread > 0 && (
                              <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                                {student.unread}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Badge variant="outline" className="text-xs px-1 py-0">{student.courseId}</Badge>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {student.courseName}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                            {student.lastMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      {isArabic ? 'لا توجد نتائج' : 'No results found'}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Message area */}
            {selectedStudent ? (
              <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{selectedStudent.name.charAt(0)}</AvatarFallback>
                      {selectedStudent.avatar && <AvatarImage src={selectedStudent.avatar} alt={selectedStudent.name} />}
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{selectedStudent.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <Badge variant="outline" className="text-xs px-1 py-0">{selectedStudent.courseId}</Badge>
                        <span>
                          {selectedStudent.isOnline ? 
                            (isArabic ? 'متصل الآن' : 'Online now') : 
                            (isArabic ? 'غير متصل' : 'Offline')
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    <span>{isArabic ? 'ملف الطالب' : 'Student Profile'}</span>
                  </Button>
                </div>
                
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {messages
                    .filter(msg => msg.senderId === selectedStudent.id || msg.senderId === 'me')
                    .map(message => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
                      >
                        {!message.isMine && (
                          <Avatar className="h-8 w-8 mr-2 mt-1">
                            <AvatarFallback>{selectedStudent.name.charAt(0)}</AvatarFallback>
                            {selectedStudent.avatar && <AvatarImage src={selectedStudent.avatar} alt={selectedStudent.name} />}
                          </Avatar>
                        )}
                        
                        <div className={`max-w-[75%]`}>
                          <Card className={`p-3 ${
                            message.isMine ? 
                              'bg-blue-500 text-white' : 
                              'bg-gray-100 dark:bg-gray-700'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                          </Card>
                          <p className={`text-xs text-gray-500 mt-1 ${
                            message.isMine ? 'text-right' : 'text-left'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
                
                {/* Message input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-2">
                    <Textarea 
                      placeholder={isArabic ? "اكتب رسالة..." : "Type a message..."}
                      className="resize-none min-h-[60px]"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage} className="self-end h-[60px]">
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-400 mb-2">
                    <MessageCircle className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="font-medium text-lg">
                    {isArabic ? 'اختر محادثة' : 'Select a conversation'}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto mt-1">
                    {isArabic 
                      ? 'اختر أحد الطلاب من القائمة لبدء المحادثة'
                      : 'Choose a student from the list to start messaging'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorMessages;
