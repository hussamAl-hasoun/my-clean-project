import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { AlertCircle, ChevronDown } from 'lucide-react';
import React, { useRef, useState as useAccordionState } from 'react';

const HelpCenter = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: isArabic ? 'تم استلام رسالتك' : 'Message Received Successfully',
      description: isArabic 
        ? 'شكراً لك على تواصلك معنا، سنقوم بالرد عليك في أقرب وقت ممكن' 
        : 'Thank you for reaching out. Our support team will respond to you shortly.',
      duration: 3000,
    });

    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  // Accordion FAQ
  const faqs = [
    {
      q: isArabic ? 'كيف يمكنني التسجيل في المنصة؟' : 'How do I register on the platform?',
      a: isArabic ? 'يمكنك التسجيل من خلال الضغط على زر "تسجيل" في أعلى الصفحة واتباع التعليمات.' : 'You can register by clicking the "Sign Up" button at the top of the page and following the instructions.'
    },
    {
      q: isArabic ? 'هل أستطيع التواصل مع الدعم الفني مباشرة؟' : 'Can I contact technical support directly?',
      a: isArabic ? 'نعم، يمكنك إرسال رسالة عبر هذا النموذج وسيتم الرد عليك بأسرع وقت.' : 'Yes, you can send a message using this form and you will receive a response as soon as possible.'
    },
    {
      q: isArabic ? 'ما هي المزايا التي تقدمها المنصة للجامعات؟' : 'What benefits does the platform offer to universities?',
      a: isArabic
        ? 'توفر المنصة للجامعات حلولًا متكاملة لإدارة العملية التعليمية، مثل إدارة المقررات، تتبع تقدم الطلاب، أدوات تواصل حديثة، ولوحات تقارير مخصصة تلبي احتياجات الجامعات.'
        : 'The platform provides universities with integrated solutions for managing the educational process, such as course management, student progress tracking, modern communication tools, and customizable dashboards to meet university needs.'
    }
  ];
  const [openIndex, setOpenIndex] = useAccordionState(-1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-20 px-4">
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 backdrop-blur-lg rounded-2xl p-10 shadow-2xl border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="bg-cloud/10 rounded-full p-4 mb-4 flex items-center justify-center">
            <AlertCircle className="w-14 h-14 text-cloud" />
          </div>
          <h1 className="text-4xl font-extrabold mb-2 text-slate-900 dark:text-white tracking-tight">
            {isArabic ? 'مركز حل المشاكل والدعم' : 'Problem Solving & Support Center'}
          </h1>
          <h2 className="text-lg md:text-xl text-cloud font-semibold mb-2">
            {isArabic ? 'واجهت مشكلة؟ نحن هنا لحلها!' : 'Facing a problem? We are here to solve it!'}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            {isArabic 
              ? 'إذا واجهت أي مشكلة أثناء استخدام المنصة أو لديك استفسار تقني، يرجى وصف مشكلتك وسنقوم بمساعدتك بأسرع وقت.'
              : 'If you encounter any issue while using the platform or have a technical inquiry, please describe your problem and we will assist you as soon as possible.'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <Textarea
              placeholder={isArabic 
                ? 'اكتب رسالتك هنا...'
                : 'Type your message here...'
              }
              className="min-h-[180px] text-lg bg-white dark:bg-slate-800 border-2 border-cloud/30 dark:border-cloud/40 shadow focus:border-cloud focus:ring-2 focus:ring-cloud/30 transition-all p-6 rounded-xl"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              aria-label={isArabic ? 'مربع الرسالة' : 'Message box'}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full text-lg py-6 bg-cloud hover:bg-cloud/90 text-white font-bold rounded-xl shadow-md transition-colors disabled:opacity-50"
            disabled={!message.trim()}
          >
            {isArabic ? 'إرسال الرسالة' : 'Submit Message'}
          </Button>
        </form>

        {/* FAQ Accordion */}
        <div className="mt-14">
          <h3 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white text-center">
            {isArabic ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 overflow-hidden shadow-sm">
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-6 py-5 focus:outline-none text-right text-slate-900 dark:text-white font-medium text-lg transition-colors hover:bg-cloud/10"
                  onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                  aria-expanded={openIndex === idx}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`transition-transform duration-200 ${openIndex === idx ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className={`px-6 pb-5 text-slate-700 dark:text-slate-200 text-base leading-relaxed transition-all duration-300 ${openIndex === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                  style={{ direction: isArabic ? 'rtl' : 'ltr' }}
                >
                  {openIndex === idx && <div>{faq.a}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
