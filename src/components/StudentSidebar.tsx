import { type FC, useState, memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, BookUser, Calendar, FileText, Bell, GraduationCap, Settings, LogOut, Menu, X, Home, Sun, Moon, MessageCircle, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/components/providers/theme-provider';

const StudentSidebar: FC = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const menuItems = [
    {
      title: language === 'ar' ? "الرئيسية" : "Dashboard",
      icon: BookUser,
      href: "/student",
    },
    {
      title: language === 'ar' ? "المقررات" : "Courses",
      icon: BookOpen,
      href: "/student/courses",
    },
    {
      title: language === 'ar' ? "الدرجات" : "Grades",
      icon: GraduationCap,
      href: "/student/grades",
    },
    {
      title: language === 'ar' ? "الواجبات" : "Assignments",
      icon: FileText,
      href: "/student/assignments",
    },
    {
      title: language === 'ar' ? "الإعلانات" : "Announcements",
      icon: Bell,
      href: "/student/announcements",
    },
    {
      title: language === 'ar' ? "الرسائل" : "Messages",
      icon: MessageCircle,
      href: "/student/messages",
    },
    {
      title: language === 'ar' ? "التقويم" : "Calendar",
      icon: Calendar,
      href: "/student/calendar",
    },
    {
      title: language === 'ar' ? "نظام التحفيز" : "Gamification",
      icon: Trophy,
      href: "/student/gamification",
    },
    {
      title: language === 'ar' ? "الإعدادات" : "Settings",
      icon: Settings,
      href: "/student/settings",
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
        <div className="flex items-center justify-between py-6 px-4 border-b border-white/10 bg-cloud-dark">
          <div className="flex items-center gap-2">
            <div className="bg-white/10 p-2 rounded-lg">
              <BookUser className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-semibold text-slate-100">
                {language === 'ar' ? "بوابة الطالب" : "Student Portal"}
              </span>
              <div className="text-xs text-slate-200">Hossam Cloud</div>
            </div>
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
        
        <nav className="flex-1 pt-6 pb-4 px-3 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          <div className="px-2 mb-3 text-xs font-medium text-slate-300 uppercase">
            {language === 'ar' ? "القائمة الرئيسية" : "Main Menu"}
          </div>
          <ul className="space-y-1.5">
            {menuItems.map((item) => (
              <li key={item.title}>
                <Link to={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "group w-full justify-start",
                      location.pathname === item.href 
                        ? "bg-sky-700/60 font-medium"
                        : "hover:bg-sky-800/50"
                    )}
                  >
                    <item.icon className={cn(
                      "h-4 w-4", 
                      language === 'ar' ? 'ml-3' : 'mr-3', 
                      location.pathname === item.href ? 'text-white' : 'text-sky-300 group-hover:text-white'
                    )} />
                    <span className={cn(
                      location.pathname === item.href 
                        ? 'text-white' 
                        : 'text-slate-100 group-hover:text-white'
                    )}>
                      {item.title}
                    </span>
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="px-2 mt-8 mb-3 text-xs font-medium text-white/60 uppercase">
            {language === 'ar' ? "الدعم والمساعدة" : "Support & Help"}
          </div>
          <ul className="space-y-1.5">
            <li>
              <Button
                variant="ghost"
                className="group w-full justify-start hover:bg-sky-800/50"
              >
                <Bell className={cn("h-4 w-4 text-sky-300 group-hover:text-white", language === 'ar' ? 'ml-3' : 'mr-3')} />
                <span className="text-slate-100 group-hover:text-white">
                  {language === 'ar' ? "مركز المساعدة" : "Help Center"}
                </span>
              </Button>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 mt-auto border-t border-white/10">
          <Link to="/">
            <Button className="group w-full justify-start bg-slate-700/90 hover:bg-slate-600 border border-slate-500/80 hover:border-slate-400">
              <LogOut className={cn("h-4 w-4 text-slate-100 group-hover:text-white", language === 'ar' ? 'ml-3' : 'mr-3')} />
              <span className="text-slate-100 group-hover:text-white font-medium">
                {language === 'ar' ? "تسجيل الخروج" : "Logout"}
              </span>
            </Button>
          </Link>
        </div>
      </aside>
    </>
  );
});

export default StudentSidebar;
