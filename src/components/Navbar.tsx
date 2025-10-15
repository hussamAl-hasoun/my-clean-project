import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/providers/theme-provider';
import { useLanguage } from '@/components/providers/language-provider';
import { Sun, Moon, Languages } from 'lucide-react';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const isArabic = language === 'ar';
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isAboutPage ? 'bg-cloud-dark dark:bg-slate-950 shadow-lg' : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800'}`}>
      <nav className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse hover:opacity-90 transition-opacity">
            <img 
              src="/lovable-uploads/aef7f8c6-61d5-41a3-b814-935ab5d36765.png" 
              alt={isArabic ? "شعار حسام كلاود" : "Hossam Cloud Logo"} 
              className="h-10 w-auto" 
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-cloud to-blue-600 bg-clip-text text-transparent">
              {isArabic ? 'حسام كلاود' : 'Hossam Cloud'}
            </span>
          </Link>

          {/* Navigation Links - Center */}
          {!isAboutPage && (
            <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link 
              to="/" 
              className="text-slate-600 hover:text-cloud dark:text-slate-300 dark:hover:text-cloud transition-colors"
            >
              {isArabic ? 'الرئيسية' : 'Home'}
            </Link>
            <Link 
              to="/features" 
              className="text-slate-600 hover:text-cloud dark:text-slate-300 dark:hover:text-cloud transition-colors"
            >
              {isArabic ? 'المميزات' : 'Platform Features'}
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors ${isAboutPage ? 'text-cloud dark:text-sky-400 font-semibold' : 'text-slate-600 hover:text-cloud dark:text-slate-300 dark:hover:text-cloud'}`}
            >
              {isArabic ? 'عن المنصة' : 'About Us'}
            </Link>
            <Link 
              to="/help" 
              className="text-slate-600 hover:text-cloud dark:text-slate-300 dark:hover:text-cloud transition-colors"
            >
              {isArabic ? 'مركز المساعدة' : 'Support Center'}
            </Link>
          </div>
          )}

          {/* Right Side Items */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Theme Toggle */}
            <Button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-slate-600 hover:text-cloud dark:text-slate-300 dark:hover:text-cloud"
              aria-label={isArabic ? "تبديل المظهر" : "Toggle theme"}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Language Toggle */}
            <Button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 rtl:space-x-reverse text-slate-600 hover:text-cloud dark:text-slate-300 dark:hover:text-cloud bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-slate-200 dark:hover:bg-slate-700"
              aria-label={isArabic ? "تغيير اللغة" : "Change language"}
            >
              <Languages className="h-5 w-5" />
              <span className="text-sm font-medium">
                {isArabic ? 'العربية' : 'English'}
              </span>
            </Button>


          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
