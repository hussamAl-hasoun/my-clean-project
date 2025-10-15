
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ar, enUS } from 'date-fns/locale';
import { useLanguage } from '@/hooks/useLanguage';

interface CalendarSidebarProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const CalendarSidebar = ({ date, setDate }: CalendarSidebarProps) => {
  const { language } = useLanguage();

  return (
    <div>
      <div className="mb-4">
        <Calendar
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
            {language === 'ar' ? 'الواجبات' : 'Assignments'}
          </Badge>
          <Badge variant="outline">
            {language === 'ar' ? 'الدراسة' : 'Study'}
          </Badge>
        </div>
      </div>
      
      <div className="mt-6">
        <Button className="w-full">
          <Plus className="h-4 w-4 me-2" />
          {language === 'ar' ? 'إضافة حدث جديد' : 'Add New Event'}
        </Button>
      </div>
    </div>
  );
};

export default CalendarSidebar;
