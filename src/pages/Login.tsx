import { type FC } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/LoginForm';
import { useLanguage } from '@/hooks/useLanguage';
import { useEffect } from 'react';

const Login: FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  // Prevent right click on images for security
  useEffect(() => {
    const preventRightClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', preventRightClick);
    return () => document.removeEventListener('contextmenu', preventRightClick);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gradient-to-br from-cloud-light via-white to-cloud min-h-screen w-full py-4 px-4">
      <div className="cloud-bg-pattern absolute inset-0 opacity-50 dark:opacity-30 pointer-events-none" aria-hidden="true" />
      
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl z-10 p-4 sm:p-6 md:p-8">
        <img 
          src="/lovable-uploads/aef7f8c6-61d5-41a3-b814-935ab5d36765.png" 
          alt={isArabic ? "شعار منصة حسام" : "Hossam Platform Logo"} 
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain mt-4 mb-3 sm:mb-4 md:mb-5 mx-auto select-none pointer-events-none hover:opacity-90 transition-all duration-300 p-1 bg-sky-100/60 dark:bg-slate-700/40 rounded-full border border-sky-300 dark:border-slate-600" 
          draggable="false"
          loading="eager"
        />
        
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-cloud-dark dark:text-white">
            {isArabic ? 'مرحبًا بعودتك إلى منصة حسام' : 'Welcome Back to Hossam Platform'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {isArabic ? 'منصة تعليمية سحابية تجمع بين التقنية والمعرفة.' : 'A cloud-based educational platform that blends technology and knowledge.'}
          </p>
        </div>

        <LoginForm />

        <div className="mt-6 space-y-3 text-center">
          <Link 
            to="/forgot-password" 
            className="block text-sm sm:text-base text-cloud hover:underline"
          >
            {isArabic ? 'نسيت كلمة المرور؟' : 'Forgot your password?'}
          </Link>
          
          <div className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
            {isArabic ? 'ليس لديك حساب؟' : "Don't have an account?"}
            {' '}
            <Link 
              to="/register" 
              className="text-cloud hover:underline"
            >
              {isArabic ? 'أنشئ حسابًا جديدًا' : 'Create a new account'}
            </Link>
          </div>
          
          <Link 
            to="/" 
            className="block text-sm sm:text-base text-slate-600 hover:text-cloud dark:text-slate-300 dark:hover:text-cloud-light transition-colors"
          >
            {isArabic ? '← العودة إلى الرئيسية' : '← Back to Home'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
