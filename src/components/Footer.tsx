import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { Cloud } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const Footer: FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Cloud className="h-6 w-6 text-cloud dark:text-cloud-light" />
              <span className="text-lg font-heading font-semibold">
                {isArabic ? 'حسام كلاود' : 'Hossam Cloud'}
              </span>
            </div>
            <p className="text-sm text-slate-300">
              {isArabic 
                ? 'منصة تعليمية حديثة مصممة للطلاب وأعضاء هيئة التدريس لتعزيز تجربة التعلم.'
                : 'A modern educational platform designed for students and faculty members to enhance the learning experience.'}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">
              {isArabic ? 'المنصة' : 'Platform'}
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link to="/features" className="hover:text-cloud dark:hover:text-cloud-light transition-colors">
                  {isArabic ? 'المميزات' : 'Features'}
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-cloud dark:hover:text-cloud-light transition-colors">
                  {isArabic ? 'المقررات' : 'Courses'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cloud dark:hover:text-cloud-light transition-colors">
                  {isArabic ? 'عن المنصة' : 'About Platform'}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">
              {isArabic ? 'الموارد' : 'Resources'}
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link to="/student" className="hover:text-cloud dark:hover:text-cloud-light transition-colors">
                  {isArabic ? 'بوابة الطالب' : 'Student Portal'}
                </Link>
              </li>
              <li>
                <Link to="/professor" className="hover:text-cloud dark:hover:text-cloud-light transition-colors">
                  {isArabic ? 'بوابة الأستاذ' : 'Professor Portal'}
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-cloud dark:hover:text-cloud-light transition-colors">
                  {isArabic ? 'مركز المساعدة' : 'Help Center'}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">
              {isArabic ? 'التواصل' : 'Contact'}
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                {isArabic ? 'البريد الإلكتروني: ' : 'Email: '}
                support@hossamcloud.edu
              </li>
              <li>
                {isArabic ? 'الهاتف: ' : 'Phone: '}
                +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} {isArabic ? 'منصة حسام كلاود التعليمية. جميع الحقوق محفوظة.' : 'Hossam Cloud Educational Platform. All rights reserved.'}
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link to="/privacy" className="text-sm text-slate-400 hover:text-cloud dark:hover:text-cloud-light transition-colors">
              {isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <Link to="/terms" className="text-sm text-slate-400 hover:text-cloud dark:hover:text-cloud-light transition-colors">
              {isArabic ? 'شروط الخدمة' : 'Terms of Service'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
