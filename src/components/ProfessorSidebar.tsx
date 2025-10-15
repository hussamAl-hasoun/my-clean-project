import { type FC, useState, memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, School, Calendar, FileText, Bell, Users, Settings, LogOut, Menu, X, Home, Sun, Moon, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/components/providers/theme-provider';

const ProfessorSidebar: FC = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const menuItems = [
    {
      title: language === 'ar' ? "الرئيسية" : "Dashboard",
      icon: School,
      href: "/professor",
    },
    {
      title: language === 'ar' ? "المقررات" : "Courses",
      icon: BookOpen,
      href: "/professor/courses",
    },
    {
      title: language === 'ar' ? "الطلاب" : "Students",
      icon: Users,
      href: "/professor/students",
    },
    {
      title: language === 'ar' ? "الواجبات" : "Assignments",
      icon: FileText,
      href: "/professor/assignments",
    },
    {
      title: language === 'ar' ? "الإعلانات" : "Announcements",
      icon: Bell,
      href: "/professor/announcements",
    },
    {
      title: language === 'ar' ? "الرسائل" : "Messages",
      icon: MessageCircle,
      href: "/professor/messages",
    },
    {
      title: language === 'ar' ? "التقويم" : "Calendar",
      icon: Calendar,
      href: "/professor/calendar",
    },
    {
      title: language === 'ar' ? "الإعدادات" : "Settings",
      icon: Settings,
      href: "/professor/settings",
    },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <>
      {/* Mobile sidebar toggle button */}
      <Button
        className="fixed top-4 start-4 z-50 md:hidden bg-white dark:bg-slate-800 shadow-md h-10 w-10 p-2"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
      </Button>
      
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      <aside className={cn(
        "fixed md:sticky top-16 start-0 z-40 flex flex-col bg-gradient-to-b from-cloud-dark to-cloud-dark/90 text-white w-64 h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
        language === 'ar' ? "md:right-0 md:left-auto" : "md:left-0 md:right-auto"
      )}>
        <div className="flex items-center justify-between py-4 px-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <School className="h-6 w-6 text-cloud-accent" />
            <span className="text-lg font-semibold text-slate-100 dark:text-slate-100">
              {language === 'ar' ? "بوابة الأستاذ" : "Professor Portal"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost"
              className="text-sky-300 hover:text-white hover:bg-white/20 h-10 w-10 p-2"
              onClick={toggleTheme}
              title={language === 'ar' ? "تبديل المظهر" : "Toggle theme"}
              aria-label={language === 'ar' ? "تبديل المظهر" : "Toggle theme"}
            >
              {theme === 'light' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button 
              variant="ghost"
              className="text-sky-300 hover:text-white hover:bg-white/20 h-10 w-10 p-2" 
              onClick={() => navigate('/')}
              title={language === 'ar' ? "الصفحة الرئيسية" : "Home"}
              aria-label={language === 'ar' ? "الصفحة الرئيسية" : "Home"}
            >
              <Home className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <nav className="flex-1 pt-6">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.title}>
                <Link to={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start group",
                      location.pathname === item.href 
                        ? "bg-sky-600/30 dark:bg-sky-700/40 text-white dark:text-white" 
                        : "text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-white/10"
                    )}
                  >
                    <item.icon className={cn(
                        "h-5 w-5", 
                        language === 'ar' ? 'ml-3' : 'mr-3',
                        location.pathname === item.href 
                          ? "text-white dark:text-white" 
                          : "text-sky-500 dark:text-sky-400 group-hover:text-sky-600 dark:group-hover:text-white"
                      )} />
                    <span className={cn(
                        location.pathname === item.href 
                          ? "text-white dark:text-white" 
                          : "text-slate-700 dark:text-slate-100 group-hover:text-black dark:group-hover:text-white"
                      )}>
                      {item.title}
                    </span>
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="pt-4 mt-auto border-t border-white/10 px-2 pb-4">
          <Link to="/">
            <Button className="w-full justify-start group bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 border border-slate-300 dark:border-slate-500 hover:border-slate-400 dark:hover:border-slate-400">
              <LogOut className={cn("h-5 w-5 text-slate-600 dark:text-slate-100 group-hover:text-black dark:group-hover:text-white", language === 'ar' ? 'ml-3' : 'mr-3')} />
              <span className="text-slate-700 dark:text-slate-100 group-hover:text-black dark:group-hover:text-white">
                {language === 'ar' ? 'تسجيل الخروج' : 'Log Out'}
              </span>
            </Button>
          </Link>
        </div>
      </aside>
    </>
  );
});

export default ProfessorSidebar;
