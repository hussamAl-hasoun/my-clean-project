import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { LogIn, Moon, Sun, Globe } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import MobileNavbar from './MobileNavbar';
import { useDeviceType } from '../hooks/useDeviceType';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { isMobile } = useDeviceType();
  const isArabic = language === 'ar';
  const location = useLocation();
  const isAboutPlatformPage = location.pathname === '/about-platform';

  return (
    <header className="w-full bg-[#0f172a] py-4 shadow-lg">
      <div className="max-w-[1400px] mx-auto px-4">
        <nav className="flex items-center justify-between h-14">
          {/* Logo Section - More compressed */}
          <Link to="/" className="flex items-center gap-2 max-w-[60%] sm:max-w-[50%]">
            <img 
              src="/lovable-uploads/aef7f8c6-61d5-41a3-b814-935ab5d36765.png"
              alt="Hossam Cloud Platform"
              className="h-12 w-12 sm:h-14 sm:w-14" 
            />
            <span className="text-base sm:text-xl md:text-2xl font-bold text-white truncate">
              {isArabic ? 'منصة حسام السحابية' : 'Hossam Cloud'}
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
          {!isMobile && (
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link to="/" className="text-sm md:text-base text-white hover:text-blue-400 font-medium whitespace-nowrap">
                {isArabic ? 'الرئيسية' : 'Home'}
              </Link>
              {!isAboutPlatformPage && (
                <Link to="/courses" className="text-sm md:text-base text-white hover:text-blue-400 font-medium whitespace-nowrap">
                  {isArabic ? 'المقررات' : 'Courses'}
                </Link>
              )}

              {/* Theme Toggle */}
              <Button 
                variant="outline" 
                size="icon" 
                onClick={toggleTheme}
                className="w-8 h-8"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              {/* Language Toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="w-8 h-8">
                    <Globe className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setLanguage('ar')}>
                    العربية
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('en')}>
                    English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Auth Buttons */}
              <Button 
                variant="outline" 
                size="sm" 
                className="text-sm md:text-base px-4 py-2 h-auto"
                onClick={() => window.location.href = '/login'}
              >
                {isArabic ? 'تسجيل دخول' : 'Login'}
              </Button>
              {!isAboutPlatformPage && (
                <Button 
                  size="sm" 
                  className="text-sm md:text-base px-4 py-2 h-auto bg-blue-600 hover:bg-blue-700"
                  onClick={() => window.location.href = '/about-platform'}
                >
                  {isArabic ? 'عن المنصة' : 'About Platform'}
                </Button>
              )}
            </div>
          )}

          {/* Mobile Navigation */}
          {isMobile && <MobileNavbar />}
        </nav>
      </div>
    </header>
  );
};

export default Header;
