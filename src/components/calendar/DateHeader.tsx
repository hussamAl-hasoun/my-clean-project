
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { addDays } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { useLanguage } from '@/hooks/useLanguage';

interface DateHeaderProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  eventsCount: number;
}

const DateHeader = ({ date, setDate, eventsCount }: DateHeaderProps) => {
  const { language } = useLanguage();
  
  // Function to format the date based on language
  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return format(date, 'PPPP', { locale: language === 'ar' ? ar : enUS });
  };
  
  return (
    <div className="flex flex-row items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold">{formatDate(date)}</h2>
        <p className="text-sm text-slate-500">
          {eventsCount > 0 
            ? language === 'ar'
              ? `${eventsCount} أحداث مجدولة`
              : `${eventsCount} events scheduled`
            : language === 'ar'
              ? 'لا توجد أحداث مجدولة'
              : 'No events scheduled'
          }
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setDate(prev => prev ? addDays(prev, -1) : new Date())}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setDate(prev => prev ? addDays(prev, 1) : new Date())}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DateHeader;
