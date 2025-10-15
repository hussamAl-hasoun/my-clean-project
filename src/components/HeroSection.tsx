import { type FC, memo } from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const HeroSection: FC = memo(() => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <section className="w-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center min-h-[85vh] relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop')",
        }}
        aria-hidden="true"
      ></div>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-900/80 dark:bg-slate-950/80" aria-hidden="true"></div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
        <img 
          src="/lovable-uploads/aef7f8c6-61d5-41a3-b814-935ab5d36765.png" 
          alt={isArabic ? "شعار منصة حسام التعليمية" : "Hossam Educational Platform Logo"} 
          className="w-56 h-56 object-contain mb-1 mt-2 animate-fade-in-logo"
          loading="eager"
          width="224"
          height="224"
        />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white text-center animate-fade-in-down">
          {isArabic ? 'مرحبًا بك في منصة حسام التعليمية' : 'Welcome to Hossam Educational Platform'}
        </h1>
        <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-2xl mx-auto text-center animate-fade-in-up">
          {isArabic
            ? 'منصة تعليمية سحابية متكاملة تجمع بين التكنولوجيا الحديثة وأفضل الممارسات التعليمية'
            : 'A comprehensive cloud-based educational platform that combines modern technology with best educational practices'
          }
        </p>
        <div className="flex flex-col-reverse sm:flex-row-reverse items-center justify-center gap-4 animate-fade-in-buttons">
          <Link to="/courses">
            <Button 
              className="h-11 px-8 bg-white/10 hover:bg-white/20 text-white font-medium border border-white/20 shadow-md hover:shadow-lg transition-all duration-300"
            >
              {isArabic ? 'استكشف المقررات' : 'Explore Courses'}
              <ArrowRight className="ml-2 rtl:rotate-180" />
            </Button>
          </Link>
          <Link to="/login">
            <Button 
              className="h-14 px-12 bg-gradient-to-r from-cloud-dark to-cloud hover:from-cloud hover:to-cloud-accent text-white font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              {isArabic ? 'تسجيل الدخول' : 'Sign In'}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
});

export default HeroSection;
