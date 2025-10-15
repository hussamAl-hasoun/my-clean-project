
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Calendar as CalendarIcon, Plus, Clock, MapPin, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, parseISO } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import ProfessorSidebar from '@/components/ProfessorSidebar';
import { useLanguage } from '@/hooks/useLanguage';

const ProfessorCalendar = () => {
  const { language } = useLanguage();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<string>("day");
  
  // Sample events data
  const events = [
    {
      id: 1,
      title: language === 'ar' ? "محاضرة البرمجة للسحابة" : "Cloud Programming Lecture",
      date: "2025-05-12T10:00:00",
      endTime: "2025-05-12T11:30:00",
      location: language === 'ar' ? "قاعة 305" : "Room 305",
      type: "lecture",
    },
    {
      id: 2,
      title: language === 'ar' ? "مراقبة الاختبار النصفي" : "Midterm Exam Proctoring",
      date: "2025-05-12T13:00:00",
      endTime: "2025-05-12T15:00:00",
      location: language === 'ar' ? "قاعة الاختبارات" : "Exam Hall",
      type: "exam",
    },
    {
      id: 3,
      title: language === 'ar' ? "اجتماع القسم" : "Department Meeting",
      date: "2025-05-12T16:00:00",
      endTime: "2025-05-12T17:00:00",
      location: language === 'ar' ? "قاعة الاجتماعات" : "Meeting Room",
      type: "meeting",
    },
    {
      id: 4,
      title: language === 'ar' ? "محاضرة التخطيط الأكاديمي" : "Academic Planning Lecture",
      date: "2025-05-13T09:00:00",
      endTime: "2025-05-13T10:30:00",
      location: language === 'ar' ? "قاعة 201" : "Room 201",
      type: "lecture",
    },
    {
      id: 5,
      title: language === 'ar' ? "ساعات مكتبية" : "Office Hours",
      date: "2025-05-13T15:00:00",
      endTime: "2025-05-13T16:30:00",
      location: language === 'ar' ? "مكتب 110" : "Office 110",
      type: "office_hours",
    },
  ];
  
  // Filter events for the selected day
  const todayEvents = events.filter(event => {
    const eventDate = parseISO(event.date);
    return date && 
      eventDate.getDate() === date.getDate() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getFullYear() === date.getFullYear();
  });
  
  // Sort events by time
  todayEvents.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  
  // Function to get badge variant based on event type
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "lecture":
        return "default";
      case "exam":
        return "destructive";
      case "meeting":
        return "secondary";
      case "office_hours":
        return "outline";
      default:
        return "default";
    }
  };
  
  // Function to format the date based on language
  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return format(date, 'PPPP', { locale: language === 'ar' ? ar : enUS });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <ProfessorSidebar />
      
      <main className="flex-1 p-4 md:p-6 overflow-auto md:ml-64 rtl:md:ml-0 rtl:md:mr-64">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-cloud-dark dark:text-white">
            {language === 'ar' ? 'التقويم' : 'Calendar'}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1 dark:border-slate-700">
              <CardHeader>
                <CardTitle>{language === 'ar' ? 'التقويم' : 'Calendar'}</CardTitle>
                <CardDescription>
                  {language === 'ar' ? 'اختر تاريخاً لرؤية الأحداث' : 'Select a date to see events'}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="mb-4">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="border rounded-md"
                    locale={language === 'ar' ? ar : enUS}
                  />
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-300">
                    {language === 'ar' ? 'تصفية الأحداث حسب النوع' : 'Filter Events by Type'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">
                      {language === 'ar' ? 'المحاضرات' : 'Lectures'}
                    </Badge>
                    <Badge variant="destructive">
                      {language === 'ar' ? 'الاختبارات' : 'Exams'}
                    </Badge>
                    <Badge variant="secondary">
                      {language === 'ar' ? 'الاجتماعات' : 'Meetings'}
                    </Badge>
                    <Badge variant="outline">
                      {language === 'ar' ? 'ساعات مكتبية' : 'Office Hours'}
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="w-full">
                    <Plus className="h-4 w-4 me-2" />
                    {language === 'ar' ? 'إضافة حدث جديد' : 'Add New Event'}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2 dark:border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{formatDate(date)}</CardTitle>
                  <CardDescription>
                    {todayEvents.length > 0 
                      ? language === 'ar'
                        ? `${todayEvents.length} أحداث مجدولة`
                        : `${todayEvents.length} events scheduled`
                      : language === 'ar'
                        ? 'لا توجد أحداث مجدولة'
                        : 'No events scheduled'
                    }
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => setDate(prev => prev ? addDays(prev, -1) : new Date())}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setDate(prev => prev ? addDays(prev, 1) : new Date())}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {todayEvents.length > 0 ? (
                    todayEvents.map((event) => (
                      <div key={event.id} className="border dark:border-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg dark:text-white">{event.title}</h3>
                            <div className="flex items-center mt-1 text-sm text-slate-600 dark:text-slate-300">
                              <Clock className="h-4 w-4 me-1" />
                              <span>
                                {format(new Date(event.date), 'h:mm a', { locale: language === 'ar' ? ar : enUS })} - 
                                {format(new Date(event.endTime), 'h:mm a', { locale: language === 'ar' ? ar : enUS })}
                              </span>
                            </div>
                            {event.location && (
                              <div className="flex items-center mt-1 text-sm text-slate-600 dark:text-slate-300">
                                <MapPin className="h-4 w-4 me-1" />
                                <span>{event.location}</span>
                              </div>
                            )}
                          </div>
                          <Badge variant={getBadgeVariant(event.type)}>
                            {event.type === "lecture" && (language === 'ar' ? 'محاضرة' : 'Lecture')}
                            {event.type === "exam" && (language === 'ar' ? 'اختبار' : 'Exam')}
                            {event.type === "meeting" && (language === 'ar' ? 'اجتماع' : 'Meeting')}
                            {event.type === "office_hours" && (language === 'ar' ? 'ساعات مكتبية' : 'Office Hours')}
                          </Badge>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            <Check className="h-4 w-4 me-1" />
                            {language === 'ar' ? 'تم' : 'Done'}
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950">
                            <X className="h-4 w-4 me-1" />
                            {language === 'ar' ? 'حذف' : 'Delete'}
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <CalendarIcon className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600" />
                      <p className="mt-4 text-slate-500 dark:text-slate-400">
                        {language === 'ar'
                          ? 'لا توجد أحداث مجدولة لهذا اليوم'
                          : 'No events scheduled for this day'
                        }
                      </p>
                      <Button className="mt-4">
                        <Plus className="h-4 w-4 me-2" />
                        {language === 'ar' ? 'إضافة حدث جديد' : 'Add New Event'}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfessorCalendar;
