
import React from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Check, X } from 'lucide-react';
import { ar, enUS } from 'date-fns/locale';
import { useLanguage } from '@/hooks/useLanguage';

interface EventItemProps {
  event: {
    id: number;
    title: string;
    date: string;
    endTime: string;
    location: string;
    type: string;
  };
  getBadgeVariant: (type: string) => "default" | "destructive" | "secondary" | "outline";
}

const EventItem = ({ event, getBadgeVariant }: EventItemProps) => {
  const { language } = useLanguage();

  return (
    <div className="border dark:border-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow">
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
          {event.type === "assignment" && (language === 'ar' ? 'واجب' : 'Assignment')}
          {event.type === "study" && (language === 'ar' ? 'دراسة' : 'Study')}
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
  );
};

export default EventItem;
