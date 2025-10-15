import React from 'react';
import { Course } from '../data/mockCourses';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  // تحديد لون خلفية المستوى
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'مبتدئ':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'متوسط':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'متقدم':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-[340px]">
      {/* صورة المقرر */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.imageUrl} 
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        {/* شارة المستوى */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
            {course.level}
          </span>
        </div>
        {/* شارة التصنيف */}
        <div className="absolute bottom-4 right-4">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
            {course.category}
          </span>
        </div>
      </div>

      {/* محتوى المقرر */}
      <div className="p-6">
        {/* العنوان والمدرس */}
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex items-center gap-2">
          <span className="inline-block p-1 rounded-full bg-blue-100 dark:bg-blue-900">
            👨‍🏫
          </span>
          {course.instructor}
        </p>

        {/* الوصف */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* الإحصائيات */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="block text-sm font-semibold text-gray-800 dark:text-white">{course.students}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">طالب</span>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-center gap-1">
              <span className="text-sm font-semibold text-gray-800 dark:text-white">{course.rating}</span>
              <span className="text-yellow-400">⭐</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">تقييم</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
