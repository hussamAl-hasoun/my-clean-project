
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn, Settings, Home, BookOpen, Bell, MessageCircle, Calendar, Layers } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';

const MobileNavbar = () => {
  const { language } = useLanguage();
  const [open, setOpen] = React.useState(false);

  const isArabic = language === 'ar';
  
  const navItems = [
    { title: isArabic ? 'الرئيسية' : 'Home', path: '/', icon: <Home className="mr-2 h-4 w-4" /> },
    { title: isArabic ? 'المقررات' : 'Courses', path: '/courses', icon: <BookOpen className="mr-2 h-4 w-4" /> },
    { title: isArabic ? 'المميزات' : 'Features', path: '/features', icon: <Layers className="mr-2 h-4 w-4" /> },
    { title: isArabic ? 'عن المنصة' : 'About', path: '/about', icon: <Settings className="mr-2 h-4 w-4" /> },
  ];
  
  const studentItems = [
    { title: isArabic ? 'لوحة التحكم' : 'Dashboard', path: '/student', icon: <Home className="mr-2 h-4 w-4" /> },
    { title: isArabic ? 'المقررات' : 'Courses', path: '/student/courses', icon: <BookOpen className="mr-2 h-4 w-4" /> },
    { title: isArabic ? 'الإعلانات' : 'Announcements', path: '/student/announcements', icon: <Bell className="mr-2 h-4 w-4" /> },
    { title: isArabic ? 'الرسائل' : 'Messages', path: '/student/messages', icon: <MessageCircle className="mr-2 h-4 w-4" /> },
    { title: isArabic ? 'التقويم' : 'Calendar', path: '/student/calendar', icon: <Calendar className="mr-2 h-4 w-4" /> },
    { title: isArabic ? 'الإعدادات' : 'Settings', path: '/student/settings', icon: <Settings className="mr-2 h-4 w-4" /> },
  ];
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">{isArabic ? 'القائمة' : 'Menu'}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={isArabic ? "right" : "left"}>
        <SheetHeader>
          <SheetTitle>{isArabic ? 'منصة حسام كلاود' : 'Hossam Cloud Platform'}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="space-y-1">
            <h3 className="mb-2 px-2 text-sm font-medium">
              {isArabic ? 'القائمة الرئيسية' : 'Main Menu'}
            </h3>
            {navItems.map((item, index) => (
              <Link 
                key={index}
                to={item.path}
                onClick={() => setOpen(false)}
                className="flex items-center py-2 px-2 text-sm rounded-md hover:bg-muted"
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </div>
          
          <div className="border-t pt-4">
            <h3 className="mb-2 px-2 text-sm font-medium">
              {isArabic ? 'بوابة الطالب' : 'Student Portal'}
            </h3>
            {studentItems.map((item, index) => (
              <Link 
                key={index}
                to={item.path}
                onClick={() => setOpen(false)}
                className="flex items-center py-2 px-2 text-sm rounded-md hover:bg-muted"
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </div>
          
          <div className="border-t pt-4">
            <Link to="/login" onClick={() => setOpen(false)}>
              <Button className="w-full mt-2">
                <LogIn className="mr-2 h-4 w-4" />
                {isArabic ? 'تسجيل الدخول' : 'Login'}
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
