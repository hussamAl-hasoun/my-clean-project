
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StudentSidebar from '@/components/StudentSidebar';
import { useLanguage } from '@/hooks/useLanguage';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';
import CalendarSidebar from '@/components/calendar/CalendarSidebar';
import EventsList from '@/components/calendar/EventsList';
import DateHeader from '@/components/calendar/DateHeader';

const Calendar = () => {
  const { language } = useLanguage();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { todayEvents, getBadgeVariant } = useCalendarEvents(date);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <StudentSidebar />
      
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
                <CalendarSidebar date={date} setDate={setDate} />
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2 dark:border-slate-700">
              <CardHeader>
                <DateHeader 
                  date={date} 
                  setDate={setDate} 
                  eventsCount={todayEvents.length} 
                />
              </CardHeader>
              <CardContent>
                <EventsList todayEvents={todayEvents} getBadgeVariant={getBadgeVariant} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;
