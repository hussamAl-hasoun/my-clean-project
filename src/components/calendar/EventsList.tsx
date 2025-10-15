
import React from 'react';
import { CalendarIcon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EventItem from './EventItem';
import { useLanguage } from '@/hooks/useLanguage';

interface EventsListProps {
  todayEvents: Array<{
    id: number;
    title: string;
    date: string;
    endTime: string;
    location: string;
    type: string;
  }>;
  getBadgeVariant: (type: string) => "default" | "destructive" | "secondary" | "outline";
}

const EventsList = ({ todayEvents, getBadgeVariant }: EventsListProps) => {
  const { language } = useLanguage();

  if (todayEvents.length === 0) {
    return (
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
    );
  }

  return (
    <div className="space-y-6">
      {todayEvents.map((event) => (
        <EventItem key={event.id} event={event} getBadgeVariant={getBadgeVariant} />
      ))}
    </div>
  );
};

export default EventsList;
