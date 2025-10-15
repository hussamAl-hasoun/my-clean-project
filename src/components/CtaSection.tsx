import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { LogIn } from 'lucide-react';

const CtaSection: FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-cloud-light to-cloud/10 dark:from-slate-800 dark:to-slate-900/50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-cloud-dark dark:text-white">
          {isArabic ? 'انضم إلينا واصنع مستقبلك' : 'Join Us and Shape Your Future'}
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
          {isArabic 
            ? 'انضم إلى منصة حسام اليوم واستمتع بتجربة تعليمية فريدة مع مجموعة متنوعة من المقررات التعليمية والوصول لأحدث المحتويات والموارد.'
            : 'Join Hossam Cloud platform today and enjoy a unique learning experience with a diverse range of courses and access to the latest content and resources.'
          }
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/login">
            <Button className="h-12 px-8 gap-2 bg-cloud hover:bg-cloud/90 dark:bg-cloud-light dark:hover:bg-cloud-light/90 text-white dark:text-slate-900">
              <LogIn className="h-5 w-5" />
              {isArabic ? 'تسجيل الدخول' : 'Login Now'}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
