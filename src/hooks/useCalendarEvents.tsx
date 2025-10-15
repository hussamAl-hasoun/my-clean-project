
import { useState, useMemo } from 'react';
import { parseISO } from 'date-fns';
import { useLanguage } from '@/hooks/useLanguage';

interface Event {
  id: number;
  title: string;
  date: string;
  endTime: string;
  location: string;
  type: string;
}

export const useCalendarEvents = (selectedDate: Date | undefined) => {
  const { language } = useLanguage();
  
  // Sample events data
  const events = useMemo(() => [
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
      title: language === 'ar' ? "الاختبار النصفي - هياكل البيانات" : "Midterm Exam - Data Structures",
      date: "2025-05-12T13:00:00",
      endTime: "2025-05-12T15:00:00",
      location: language === 'ar' ? "قاعة الاختبارات" : "Exam Hall",
      type: "exam",
    },
    {
      id: 3,
      title: language === 'ar' ? "موعد تسليم الواجب" : "Assignment Deadline",
      date: "2025-05-12T23:59:00",
      endTime: "2025-05-12T23:59:00",
      location: "",
      type: "assignment",
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
      title: language === 'ar' ? "اجتماع مجموعة الدراسة" : "Study Group Meeting",
      date: "2025-05-13T15:00:00",
      endTime: "2025-05-13T16:30:00",
      location: language === 'ar' ? "المكتبة" : "Library",
      type: "study",
    },
  ], [language]);
  
  // Function to filter events for the selected day
  const todayEvents = useMemo(() => {
    return events.filter(event => {
      const eventDate = parseISO(event.date);
      return selectedDate && 
        eventDate.getDate() === selectedDate.getDate() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getFullYear() === selectedDate.getFullYear();
    }).sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }, [events, selectedDate]);

  // Function to get badge variant based on event type
  const getBadgeVariant = (type: string): "default" | "destructive" | "secondary" | "outline" => {
    switch (type) {
      case "lecture":
        return "default";
      case "exam":
        return "destructive";
      case "assignment":
        return "secondary";
      case "study":
        return "outline";
      default:
        return "default";
    }
  };
  
  return { events, todayEvents, getBadgeVariant };
};
