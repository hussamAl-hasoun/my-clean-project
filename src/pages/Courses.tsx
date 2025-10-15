import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Calendar, Users, BookOpen, GraduationCap, Clock, Star, Search, Filter, BookOpenCheck, Trophy, BarChart, Info, Award, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Courses = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular'); // popular, rating, newest
  const [isLoaded, setIsLoaded] = useState(false);
  
  // محاكاة تحميل البيانات
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // بيانات المقررات النموذجية
  const courses = [
    {
      id: 'itcl201',
      code: 'ITCL201',
      title: isArabic ? 'البرمجة الأساسية للسحابة' : 'Basic Programming for Cloud',
      instructor: isArabic ? 'د. سارة الأحمد' : 'Dr. Sarah Johnson',
      level: isArabic ? 'مبتدئ' : 'Beginner',
      duration: isArabic ? '١٢ أسبوع' : '12 weeks',
      students: 85,
      rating: 4.8,
      description: isArabic 
        ? 'تعلم أساسيات البرمجة السحابية وتطوير التطبيقات السحابية الحديثة من خلال مشاريع عملية ودراسة حالات واقعية'
        : 'Learn cloud programming fundamentals and modern cloud application development through practical projects and real-world case studies',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
      category: isArabic ? 'برمجة سحابية' : 'Cloud Computing',
    },
    {
      id: 'itbs106',
      code: 'ITBS106',
      title: isArabic ? 'هياكل البيانات' : 'Data Structures',
      instructor: isArabic ? 'د. خالد المهندس' : 'Dr. Khalid Al-Muhandis',
      level: isArabic ? 'متوسط' : 'Intermediate',
      duration: isArabic ? '١٠ أسابيع' : '10 weeks',
      students: 42,
      rating: 4.6,
      description: isArabic 
        ? 'دراسة هياكل البيانات المتقدمة والخوارزميات الأساسية وتطبيقاتها العملية'
        : 'Study advanced data structures, fundamental algorithms and their practical applications',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069&auto=format&fit=crop',
      category: isArabic ? 'علوم الحاسب' : 'Computer Science',
    },
    {
      id: 'ahec102',
      code: 'AHEC102',
      title: isArabic ? 'مقدمة في الذكاء الاصطناعي' : 'Introduction to AI',
      instructor: isArabic ? 'د. محمد العمري' : 'Dr. Mohammed Al-Amri',
      level: isArabic ? 'متقدم' : 'Advanced',
      duration: isArabic ? '١٤ أسبوع' : '14 weeks',
      students: 63,
      rating: 4.9,
      description: isArabic 
        ? 'استكشف عالم الذكاء الاصطناعي وتطبيقاته في حل المشكلات المعقدة والتعلم الآلي'
        : 'Explore the world of AI and its applications in solving complex problems and machine learning',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2065&auto=format&fit=crop',
      category: isArabic ? 'علوم الحاسب' : 'Computer Science',
    },
    {
      id: 'itdb301',
      code: 'ITDB301',
      title: isArabic ? 'قواعد البيانات السحابية' : 'Cloud Databases',
      instructor: isArabic ? 'د. نورة السعيد' : 'Dr. Noura Al-Saeed',
      level: isArabic ? 'متوسط' : 'Intermediate',
      duration: isArabic ? '٨ أسابيع' : '8 weeks',
      students: 55,
      rating: 4.7,
      description: isArabic
        ? 'تعلم تصميم وإدارة قواعد البيانات السحابية وتطبيقاتها في المشاريع الحديثة'
        : 'Learn cloud database design, management and applications in modern projects',
      image: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'برمجة سحابية' : 'Cloud Computing',
    },
    {
      id: 'itse401',
      code: 'ITSE401',
      title: isArabic ? 'أمن المعلومات السحابي' : 'Cloud Security',
      instructor: isArabic ? 'د. فهد العتيبي' : 'Dr. Fahad Al-Otaibi',
      level: isArabic ? 'متقدم' : 'Advanced',
      duration: isArabic ? '١٠ أسابيع' : '10 weeks',
      students: 38,
      rating: 4.9,
      description: isArabic
        ? 'دراسة متعمقة في أمن الحوسبة السحابية وحماية البيانات وأفضل الممارسات الأمنية'
        : 'In-depth study of cloud computing security, data protection and security best practices',
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'أمن المعلومات' : 'Information Security',
    },
    {
      id: 'itdv205',
      code: 'ITDV205',
      title: isArabic ? 'تطوير تطبيقات الويب السحابية' : 'Cloud Web Development',
      instructor: isArabic ? 'د. ليلى الحربي' : 'Dr. Layla Al-Harbi',
      level: isArabic ? 'متوسط' : 'Intermediate',
      duration: isArabic ? '١٢ أسبوع' : '12 weeks',
      students: 72,
      rating: 4.8,
      description: isArabic
        ? 'تعلم تطوير تطبيقات الويب الحديثة باستخدام التقنيات السحابية وأطر العمل المتقدمة'
        : 'Learn modern web application development using cloud technologies and advanced frameworks',
      image: 'https://images.unsplash.com/photo-1603322199363-14380ec2ba31?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'تطوير الويب' : 'Web Development',
    },
    {
      id: 'itai301',
      code: 'ITAI301',
      title: isArabic ? 'الذكاء الاصطناعي في السحابة' : 'AI in the Cloud',
      instructor: isArabic ? 'د. عبدالله القحطاني' : 'Dr. Abdullah Al-Qahtani',
      level: isArabic ? 'متقدم' : 'Advanced',
      duration: isArabic ? '١٤ أسبوع' : '14 weeks',
      students: 45,
      rating: 4.9,
      description: isArabic
        ? 'استكشف تطبيقات الذكاء الاصطناعي في البيئة السحابية وتعلم كيفية بناء حلول ذكية قابلة للتطوير'
        : 'Explore AI applications in cloud environments and learn to build scalable intelligent solutions',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'ذكاء اصطناعي' : 'Artificial Intelligence',
    },
    {
      id: 'itcc401',
      code: 'ITCC401',
      title: isArabic ? 'الحوسبة السحابية المتقدمة' : 'Advanced Cloud Computing',
      instructor: isArabic ? 'د. أحمد الزهراني' : 'Dr. Ahmed Al-Zahrani',
      level: isArabic ? 'متقدم' : 'Advanced',
      duration: isArabic ? '١٦ أسبوع' : '16 weeks',
      students: 35,
      rating: 4.7,
      description: isArabic
        ? 'دراسة متعمقة في مفاهيم الحوسبة السحابية المتقدمة وتطبيقاتها في المؤسسات الكبيرة'
        : 'In-depth study of advanced cloud computing concepts and enterprise applications',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
      category: isArabic ? 'برمجة سحابية' : 'Cloud Computing',
    }
      category: isArabic ? 'ذكاء اصطناعي' : 'Artificial Intelligence',
    },
    {
      id: 'itdb205',
      code: 'ITDB205',
      title: isArabic ? 'أساسيات قواعد البيانات السحابية' : 'Cloud Database Fundamentals',
      instructor: isArabic ? 'د. نورة الفيصل' : 'Dr. Noura Al-Faisal',
      level: isArabic ? 'متوسط' : 'Intermediate',
      duration: isArabic ? '٨ أسابيع' : '8 weeks',
      students: 38,
      rating: 4.7,
      description: isArabic 
        ? 'تعلم كيفية تصميم وإدارة قواعد البيانات السحابية مع التركيز على النماذج والأمان وقابلية التوسع'
        : 'Learn how to design and manage cloud databases with focus on models, security and scalability',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop',
      category: isArabic ? 'قواعد بيانات' : 'Databases',
    },
    {
      id: 'itsc306',
      code: 'ITSC306',
      title: isArabic ? 'أمن الحوسبة السحابية' : 'Cloud Security',
      instructor: isArabic ? 'د. عبدالله الشمري' : 'Dr. Abdullah Al-Shamri',
      level: isArabic ? 'متقدم' : 'Advanced',
      duration: isArabic ? '١٠ أسابيع' : '10 weeks',
      students: 52,
      rating: 4.9,
      description: isArabic 
        ? 'تعلم كيفية تأمين البنية التحتية السحابية والتطبيقات والبيانات من التهديدات السيبرانية'
        : 'Learn how to secure cloud infrastructure, applications and data from cyber threats',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'أمن سيبراني' : 'Cybersecurity',
    },
    {
      id: 'itdv405',
      code: 'ITDV405',
      title: isArabic ? 'تطوير تطبيقات الويب السحابية' : 'Cloud Web App Development',
      instructor: isArabic ? 'د. ليلى القحطاني' : 'Dr. Layla Al-Qahtani',
      level: isArabic ? 'متوسط' : 'Intermediate',
      duration: isArabic ? '١٢ أسبوع' : '12 weeks',
      students: 76,
      rating: 4.8,
      description: isArabic 
        ? 'تعلم تطوير تطبيقات الويب السحابية باستخدام أحدث التقنيات والإطارات ونشرها على منصات سحابية مختلفة'
        : 'Learn to develop cloud web applications using latest technologies and frameworks and deploy them on different cloud platforms',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064&auto=format&fit=crop',
      category: isArabic ? 'تطوير الويب' : 'Web Development',
    },
    {
      id: 'itma202',
      code: 'ITMA202',
      title: isArabic ? 'التعلم الآلي لتطبيقات السحابة' : 'Machine Learning for Cloud',
      instructor: isArabic ? 'د. عمر السعيد' : 'Dr. Omar Al-Saeed',
      level: isArabic ? 'متقدم' : 'Advanced',
      duration: isArabic ? '١٤ أسبوع' : '14 weeks',
      students: 44,
      rating: 4.7,
      description: isArabic 
        ? 'استخدام خدمات التعلم الآلي السحابية لتطوير نماذج ذكية لتحليل البيانات والتنبؤ والتصنيف'
        : 'Use cloud-based machine learning services to develop intelligent models for data analysis, prediction and classification',
      image: 'https://images.unsplash.com/photo-1535378620166-273708d44e4c?q=80&w=2091&auto=format&fit=crop',
      category: isArabic ? 'ذكاء اصطناعي' : 'Artificial Intelligence',
    },
    {
      id: 'itev308',
      code: 'ITEV308',
      title: isArabic ? 'الحوسبة السحابية للواقع الافتراضي' : 'Cloud Computing for VR',
      instructor: isArabic ? 'د. فيصل الحربي' : 'Dr. Faisal Al-Harbi',
      level: isArabic ? 'متقدم' : 'Advanced',
      duration: isArabic ? '١٠ أسابيع' : '10 weeks',
      students: 29,
      rating: 4.6,
      description: isArabic 
        ? 'تعلم كيفية استخدام الحوسبة السحابية لتطوير ونشر تطبيقات الواقع الافتراضي والمعزز'
        : 'Learn how to use cloud computing to develop and deploy virtual and augmented reality applications',
      image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'الواقع الافتراضي' : 'Virtual Reality',
    },
    {
      id: 'itda301',
      code: 'ITDA301',
      title: isArabic ? 'تحليل البيانات المتقدم' : 'Advanced Data Analytics',
      instructor: isArabic ? 'د. نورة السالم' : 'Dr. Noura Al-Salem',
      level: isArabic ? 'متقدم' : 'Advanced',
      duration: isArabic ? '١٦ أسبوع' : '16 weeks',
      students: 55,
      rating: 4.7,
      description: isArabic 
        ? 'تعلم تقنيات تحليل البيانات المتقدمة واستخراج الرؤى القيمة من البيانات الضخمة'
        : 'Learn advanced data analysis techniques and extract valuable insights from big data',
      image: 'https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'علم البيانات' : 'Data Science',
    },
    {
      id: 'itsd405',
      code: 'ITSD405',
      title: isArabic ? 'تطوير تطبيقات الويب المتقدمة' : 'Advanced Web Application Development',
      instructor: isArabic ? 'د. فهد العتيبي' : 'Dr. Fahad Al-Otaibi',
      level: isArabic ? 'متقدم' : 'Advanced',
      duration: isArabic ? '١٨ أسبوع' : '18 weeks',
      students: 38,
      rating: 4.9,
      description: isArabic 
        ? 'تعلم تقنيات بناء تطبيقات الويب المتقدمة باستخدام أحدث الأطر والمكتبات'
        : 'Learn to build advanced web applications using the latest frameworks and libraries',
      image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop',
      category: isArabic ? 'تطوير الويب' : 'Web Development',
    },
    {
      id: 'itcs302',
      code: 'ITCS302',
      title: isArabic ? 'أمن المعلومات وتشفير البيانات' : 'Information Security & Cryptography',
      instructor: isArabic ? 'د. عبدالله الشهري' : 'Dr. Abdullah Al-Shahri',
      level: isArabic ? 'متوسط' : 'Intermediate',
      duration: isArabic ? '١٤ أسبوع' : '14 weeks',
      students: 47,
      rating: 4.8,
      description: isArabic 
        ? 'دراسة مبادئ أمن المعلومات وطرق تشفير البيانات وحماية الأنظمة من الهجمات الإلكترونية'
        : 'Study information security principles, data encryption methods and system protection from cyber attacks',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'أمن المعلومات' : 'Information Security',
    },
    {
      id: 'itmb205',
      code: 'ITMB205',
      title: isArabic ? 'تطوير تطبيقات الجوال' : 'Mobile Application Development',
      instructor: isArabic ? 'د. ليلى الحربي' : 'Dr. Layla Al-Harbi',
      level: isArabic ? 'متوسط' : 'Intermediate',
      duration: isArabic ? '١٢ أسبوع' : '12 weeks',
      students: 52,
      rating: 4.7,
      description: isArabic 
        ? 'تعلم كيفية تصميم وتطوير تطبيقات الجوال للأنظمة المختلفة باستخدام التقنيات الحديثة'
        : 'Learn how to design and develop mobile applications for different platforms using modern technologies',
      image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'تطوير الجوال' : 'Mobile Development',
    },
    {
      id: 'itnt403',
      code: 'ITNT403',
      title: isArabic ? 'شبكات الحاسب المتقدمة' : 'Advanced Computer Networks',
      instructor: isArabic ? 'د. ماجد القحطاني' : 'Dr. Majid Al-Qahtani',
      level: isArabic ? 'متقدم' : 'Advanced',
      duration: isArabic ? '١٦ أسبوع' : '16 weeks',
      students: 35,
      rating: 4.5,
      description: isArabic 
        ? 'دراسة متعمقة في شبكات الحاسب وبروتوكولات الاتصال وأمن الشبكات'
        : 'In-depth study of computer networks, communication protocols and network security',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop',
      category: isArabic ? 'شبكات الحاسب' : 'Computer Networks',
    },
    {
      id: 'itwd201',
      code: 'ITWD201',
      title: isArabic ? 'تطوير الويب المتقدم' : 'Advanced Web Development',
      instructor: isArabic ? 'م. أحمد محمود' : 'Eng. Ahmed Mahmoud',
      level: isArabic ? 'متوسط' : 'Intermediate',
      duration: isArabic ? '١٢ أسبوع' : '12 weeks',
      students: 75,
      rating: 4.8,
      description: isArabic 
        ? 'تعلم تطوير تطبيقات الويب الحديثة باستخدام React و Node.js'
        : 'Learn modern web development using React and Node.js',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074&auto=format&fit=crop',
      category: isArabic ? 'تطوير الويب' : 'Web Development',
    },
    {
      id: 'itui301',
      code: 'ITUI301',
      title: isArabic ? 'تصميم واجهات المستخدم' : 'UI/UX Design',
      instructor: isArabic ? 'م. سارة الخالد' : 'Eng. Sara Al-Khalid',
      level: isArabic ? 'متوسط' : 'Intermediate',
      duration: isArabic ? '٨ أسابيع' : '8 weeks',
      students: 60,
      rating: 4.9,
      description: isArabic 
        ? 'تعلم أساسيات تصميم واجهات المستخدم وتجربة المستخدم'
        : 'Learn UI/UX design fundamentals and best practices',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'تصميم' : 'Design',
    },
    {
      id: 'itcp201',
      code: 'ITCP201',
      title: isArabic ? 'الحوسبة السحابية العملية' : 'Practical Cloud Computing',
      instructor: isArabic ? 'د. فهد العتيبي' : 'Dr. Fahad Al-Otaibi',
      level: isArabic ? 'متوسط' : 'Intermediate',
      duration: isArabic ? '١٠ أسابيع' : '10 weeks',
      students: 45,
      rating: 4.7,
      description: isArabic 
        ? 'تطبيق عملي لمفاهيم الحوسبة السحابية باستخدام AWS و Azure'
        : 'Practical application of cloud computing concepts using AWS and Azure',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
      category: isArabic ? 'حوسبة سحابية' : 'Cloud Computing',
    },
    {
      id: 'itse301',
      code: 'ITSE301',
      title: isArabic ? 'هندسة البرمجيات' : 'Software Engineering',
      instructor: isArabic ? 'د. عبدالله الغامدي' : 'Dr. Abdullah Al-Ghamdi',
      level: isArabic ? 'متقدم' : 'Advanced',
      duration: isArabic ? '١٤ أسبوع' : '14 weeks',
      students: 50,
      rating: 4.8,
      description: isArabic 
        ? 'تعلم منهجيات تطوير البرمجيات وإدارة المشاريع البرمجية'
        : 'Learn software development methodologies and project management',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'هندسة برمجيات' : 'Software Engineering',
    },
    {
      id: 'itai101',
      code: 'ITAI101',
      title: isArabic ? 'مقدمة في الذكاء الاصطناعي' : 'Introduction to Artificial Intelligence',
      instructor: isArabic ? 'د. سارة الخالدي' : 'Dr. Sarah Al-Khalidi',
      level: isArabic ? 'مبتدئ' : 'Beginner',
      duration: isArabic ? '١٢ أسبوع' : '12 weeks',
      students: 92,
      rating: 4.9,
      description: isArabic 
        ? 'تعرف على أساسيات الذكاء الاصطناعي وتعلم الآلة وتطبيقاتهما في حل المشكلات العملية'
        : 'Discover the fundamentals of artificial intelligence and machine learning and their applications in solving practical problems',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'ذكاء اصطناعي' : 'Artificial Intelligence',
    },
    {
      id: 'itwd101',
      code: 'ITWD101',
      title: isArabic ? 'أساسيات تطوير الويب' : 'Web Development Fundamentals',
      instructor: isArabic ? 'د. أحمد القاسم' : 'Dr. Ahmed Al-Qasim',
      level: isArabic ? 'مبتدئ' : 'Beginner',
      duration: isArabic ? '١٠ أسابيع' : '10 weeks',
      students: 78,
      rating: 4.6,
      description: isArabic 
        ? 'تعلم أساسيات تطوير الويب باستخدام HTML و CSS و JavaScript وإنشاء مواقع ويب تفاعلية'
        : 'Learn the fundamentals of web development using HTML, CSS, and JavaScript and create interactive websites',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'تطوير الويب' : 'Web Development',
    },
    {
      id: 'itcl102',
      code: 'ITCL102',
      title: isArabic ? 'الحوسبة الخضراء والاستدامة' : 'Green Computing and Sustainability',
      instructor: isArabic ? 'د. منى الزهراني' : 'Dr. Mona Al-Zahrani',
      level: isArabic ? 'مبتدئ' : 'Beginner',
      duration: isArabic ? '٨ أسابيع' : '8 weeks',
      students: 65,
      rating: 4.7,
      description: isArabic 
        ? 'تعلم كيفية تطبيق مبادئ الاستدامة في الحوسبة السحابية وتقليل البصمة الكربونية للتقنيات الرقمية'
        : 'Learn how to apply sustainability principles in cloud computing and reduce the carbon footprint of digital technologies',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'حوسبة سحابية' : 'Cloud Computing',
    },
    {
      id: 'itda201',
      code: 'ITDA201',
      title: isArabic ? 'تحليل البيانات' : 'Data Analysis',
      instructor: isArabic ? 'د. فيصل العمري' : 'Dr. Faisal Al-Omari',
      level: isArabic ? 'متوسط' : 'Intermediate',
      duration: isArabic ? '١٠ أسابيع' : '10 weeks',
      students: 82,
      rating: 4.8,
      description: isArabic 
        ? 'تعلم كيفية جمع وتحليل وتفسير البيانات لاستخراج رؤى قيمة واتخاذ قرارات مستنيرة'
        : 'Learn how to collect, analyze, and interpret data to extract valuable insights and make informed decisions',
      image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'علم البيانات' : 'Data Science',
    },
    {
      id: 'itbd301',
      code: 'ITBD301',
      title: isArabic ? 'البيانات الضخمة وتحليلها' : 'Big Data Analysis',
      instructor: isArabic ? 'د. محمد الشهري' : 'Dr. Mohammed Al-Shahri',
      level: isArabic ? 'متقدم' : 'Advanced',
      duration: isArabic ? '١٢ أسبوع' : '12 weeks',
      students: 60,
      rating: 4.9,
      description: isArabic 
        ? 'تعلم تقنيات وأدوات معالجة وتحليل البيانات الضخمة باستخدام تقنيات الحوسبة السحابية'
        : 'Learn techniques and tools for processing and analyzing big data using cloud computing technologies',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'علم البيانات' : 'Data Science',
    },
    {
      id: 'itqc401',
      code: 'ITQC401',
      title: isArabic ? 'الحوسبة الكمية' : 'Quantum Computing',
      instructor: isArabic ? 'د. هيثم السعيد' : 'Dr. Haitham Al-Saeed',
      level: isArabic ? 'متقدم' : 'Advanced',
      duration: isArabic ? '١٢ أسبوع' : '12 weeks',
      students: 45,
      rating: 4.9,
      description: isArabic 
        ? 'استكشف مبادئ وتطبيقات الحوسبة الكمية وتأثيرها المستقبلي على تقنيات المعلومات'
        : 'Explore the principles and applications of quantum computing and its future impact on information technology',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'تقنيات متقدمة' : 'Advanced Technologies',
    },
    {
      id: 'itci101',
      code: 'ITCI101',
      title: isArabic ? 'مقدمة في الذكاء الاصطناعي للشركات' : 'Corporate AI Introduction',
      instructor: isArabic ? 'د. حاتم الشريف' : 'Dr. Hatem Al-Sharif',
      level: isArabic ? 'مبتدئ' : 'Beginner',
      duration: isArabic ? '٨ أسابيع' : '8 weeks',
      students: 72,
      rating: 4.7,
      description: isArabic 
        ? 'تعلم كيفية تطبيق تقنيات الذكاء الاصطناعي لتحسين عمليات الشركات وزيادة الإنتاجية وتحسين تجربة العملاء'
        : 'Learn how to apply AI techniques to improve business operations, increase productivity, and enhance customer experience',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
      category: isArabic ? 'ذكاء اصطناعي' : 'Artificial Intelligence',
    },
    {
      id: 'itio301',
      code: 'ITIO301',
      title: isArabic ? 'إنترنت الأشياء والحوسبة السحابية' : 'IoT and Cloud Computing',
      instructor: isArabic ? 'د. محمد السالم' : 'Dr. Mohammed Al-Salem',
      level: isArabic ? 'متوسط' : 'Intermediate',
      duration: isArabic ? '١٤ أسبوع' : '14 weeks',
      students: 58,
      rating: 4.6,
      description: isArabic 
        ? 'تعلم كيفية دمج أجهزة إنترنت الأشياء مع التقنيات السحابية لبناء حلول ذكية ومتصلة'
        : 'Learn how to integrate IoT devices with cloud technologies to build intelligent and connected solutions',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop',
      category: isArabic ? 'إنترنت الأشياء' : 'IoT',
    },
    {
      id: 'itbc301',
      code: 'ITBC301',
      title: isArabic ? 'تقنية بلوكشين والعقود الذكية' : 'Blockchain and Smart Contracts',
      instructor: isArabic ? 'د. أحمد العمري' : 'Dr. Ahmed Al-Omari',
      level: isArabic ? 'متقدم' : 'Advanced',
      duration: isArabic ? '١٢ أسبوع' : '12 weeks',
      students: 65,
      rating: 4.8,
      description: isArabic 
        ? 'تعلم أساسيات تقنية البلوكشين وكيفية تطوير العقود الذكية وتطبيقاتها في مجال الأعمال'
        : 'Learn blockchain fundamentals and how to develop smart contracts and their applications in business',
      image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2032&auto=format&fit=crop',
      category: isArabic ? 'بلوكشين' : 'Blockchain',
    },
    {
      id: 'itsa401',
      code: 'ITSA401',
      title: isArabic ? 'هندسة البرمجيات السحابية' : 'Cloud Software Architecture',
      instructor: isArabic ? 'د. فهد العتيبي' : 'Dr. Fahad Al-Otaibi',
      level: isArabic ? 'متقدم' : 'Advanced',
      duration: isArabic ? '١٦ أسبوع' : '16 weeks',
      students: 45,
      rating: 4.9,
      description: isArabic 
        ? 'تعلم تصميم وتنفيذ وإدارة البنية المعمارية للبرمجيات السحابية الحديثة'
        : 'Learn to design, implement, and manage modern cloud software architecture',
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop',
      category: isArabic ? 'هندسة برمجيات' : 'Software Engineering',
    },
    {
      id: 'itdm201',
      code: 'ITDM201',
      title: isArabic ? 'تعدين البيانات وتحليلها في السحابة' : 'Data Mining and Analysis in Cloud',
      instructor: isArabic ? 'د. سارة المطيري' : 'Dr. Sarah Al-Mutairi',
      level: isArabic ? 'متوسط' : 'Intermediate',
      duration: isArabic ? '١٠ أسابيع' : '10 weeks',
      students: 70,
      rating: 4.7,
      description: isArabic 
        ? 'تعلم تقنيات وأدوات تعدين البيانات وتحليلها في بيئة الحوسبة السحابية'
        : 'Learn data mining techniques and tools for data analysis in cloud computing environments',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'علم البيانات' : 'Data Science',
    },
    {
      id: 'itvr301',
      code: 'ITVR301',
      title: isArabic ? 'الواقع الافتراضي والمعزز في السحابة' : 'VR/AR in Cloud',
      instructor: isArabic ? 'د. ماجد الحربي' : 'Dr. Majid Al-Harbi',
      level: isArabic ? 'متقدم' : 'Advanced',
      duration: isArabic ? '١٤ أسبوع' : '14 weeks',
      students: 55,
      rating: 4.8,
      description: isArabic 
        ? 'تعلم كيفية تطوير تطبيقات الواقع الافتراضي والمعزز وتكاملها مع تقنيات السحابة'
        : 'Learn how to develop virtual and augmented reality applications and integrate them with cloud technologies',
      image: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'تقنيات متقدمة' : 'Advanced Technologies',
    },
    {
      id: 'itde301',
      code: 'ITDE301',
      title: isArabic ? 'هندسة البيانات في السحابة' : 'Cloud Data Engineering',
      instructor: isArabic ? 'د. عبدالرحمن الشهري' : 'Dr. Abdulrahman Al-Shehri',
      level: isArabic ? 'متوسط' : 'Intermediate',
      duration: isArabic ? '١٢ أسبوع' : '12 weeks',
      students: 68,
      rating: 4.7,
      description: isArabic 
        ? 'تعلم كيفية تصميم وبناء وصيانة أنظمة معالجة البيانات الضخمة في السحابة'
        : 'Learn how to design, build, and maintain large-scale data processing systems in the cloud',
      image: 'https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'علم البيانات' : 'Data Science',
    },
    {
      id: 'itcd401',
      code: 'ITCD401',
      title: isArabic ? 'تطوير التطبيقات السحابية المتقدمة' : 'Advanced Cloud App Development',
      instructor: isArabic ? 'د. علي القحطاني' : 'Dr. Ali Al-Qahtani',
      level: isArabic ? 'متقدم' : 'Advanced',
      duration: isArabic ? '١٤ أسبوع' : '14 weeks',
      students: 85,
      rating: 4.9,
      description: isArabic 
        ? 'تعلم تطوير تطبيقات سحابية متقدمة باستخدام أحدث التقنيات وأفضل الممارسات'
        : 'Learn to develop advanced cloud applications using cutting-edge technologies and best practices',
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'تطوير السحاب' : 'Cloud Development',
    },
    {
      id: 'itms301',
      code: 'ITMS301',
      title: isArabic ? 'أمن الأجهزة المحمولة والتطبيقات' : 'Mobile Security and Apps',
      instructor: isArabic ? 'د. نورة السبيعي' : 'Dr. Noura Al-Subaie',
      level: isArabic ? 'متوسط' : 'Intermediate',
      duration: isArabic ? '١٢ أسبوع' : '12 weeks',
      students: 62,
      rating: 4.7,
      description: isArabic 
        ? 'تعلم كيفية تأمين تطبيقات الأجهزة المحمولة وحماية بيانات المستخدمين'
        : 'Learn how to secure mobile applications and protect user data',
      image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'أمن سيبراني' : 'Cybersecurity',
    },
    {
      id: 'itga201',
      code: 'ITGA201',
      title: isArabic ? 'تطوير الألعاب باستخدام السحابة' : 'Cloud Game Development',
      instructor: isArabic ? 'د. خالد العنزي' : 'Dr. Khalid Al-Anazi',
      level: isArabic ? 'متوسط' : 'Intermediate',
      duration: isArabic ? '١٦ أسبوع' : '16 weeks',
      students: 95,
      rating: 4.8,
      description: isArabic 
        ? 'تعلم تطوير الألعاب السحابية وتطبيق أفضل الممارسات في تصميم الألعاب'
        : 'Learn cloud game development and apply best practices in game design',
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'تطوير الألعاب' : 'Game Development',
    },
    {
      id: 'itdc301',
      code: 'ITDC301',
      title: isArabic ? 'الحوسبة الموزعة والتخزين السحابي' : 'Distributed Computing and Storage',
      instructor: isArabic ? 'د. محمد الدوسري' : 'Dr. Mohammed Al-Dosari',
      level: isArabic ? 'متقدم' : 'Advanced',
      duration: isArabic ? '١٤ أسبوع' : '14 weeks',
      students: 58,
      rating: 4.6,
      description: isArabic 
        ? 'تعلم مفاهيم وتقنيات الحوسبة الموزعة وحلول التخزين السحابي'
        : 'Learn distributed computing concepts and cloud storage solutions',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
      category: isArabic ? 'حوسبة سحابية' : 'Cloud Computing',
    },
    {
      id: 'itai401',
      code: 'ITAI401',
      title: isArabic ? 'الذكاء الاصطناعي للرؤية الحاسوبية' : 'AI for Computer Vision',
      instructor: isArabic ? 'د. سلمى المالكي' : 'Dr. Salma Al-Malki',
      level: isArabic ? 'متقدم' : 'Advanced',
      duration: isArabic ? '١٢ أسبوع' : '12 weeks',
      students: 70,
      rating: 4.9,
      description: isArabic 
        ? 'تعلم تطبيقات الذكاء الاصطناعي في مجال الرؤية الحاسوبية ومعالجة الصور'
        : 'Learn AI applications in computer vision and image processing',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'ذكاء اصطناعي' : 'Artificial Intelligence',
    },
    {
      id: 'itct401',
      code: 'ITCT401',
      title: isArabic ? 'الحوسبة السحابية للإنترنت اللامركزي' : 'Cloud for Web3',
      instructor: isArabic ? 'د. عبدالله العتيبي' : 'Dr. Abdullah Al-Otaibi',
      level: isArabic ? 'متقدم' : 'Advanced',
      duration: isArabic ? '١٢ أسبوع' : '12 weeks',
      students: 48,
      rating: 4.8,
      description: isArabic 
        ? 'تعلم كيفية دمج الحوسبة السحابية مع تقنيات Web3 والبلوكشين'
        : 'Learn how to integrate cloud computing with Web3 and blockchain technologies',
      image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2032&auto=format&fit=crop',
      category: isArabic ? 'تقنيات متقدمة' : 'Advanced Technologies',
    },
    {
      id: 'itrd201',
      code: 'ITRD201',
      title: isArabic ? 'تطوير الروبوتات السحابية' : 'Cloud Robotics Development',
      instructor: isArabic ? 'د. ماجد الشمري' : 'Dr. Majid Al-Shamri',
      level: isArabic ? 'متقدم' : 'Advanced',
      duration: isArabic ? '١٦ أسبوع' : '16 weeks',
      students: 42,
      rating: 4.7,
      description: isArabic 
        ? 'تعلم تطوير وبرمجة الروبوتات باستخدام تقنيات الحوسبة السحابية'
        : 'Learn robotics development and programming using cloud computing technologies',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'روبوتات' : 'Robotics',
    },
    {
      id: 'ites401',
      code: 'ITES401',
      title: isArabic ? 'أمن الحافة وإنترنت الأشياء' : 'Edge and IoT Security',
      instructor: isArabic ? 'د. عمر العمري' : 'Dr. Omar Al-Omari',
      level: isArabic ? 'متقدم' : 'Advanced',
      duration: isArabic ? '١٢ أسبوع' : '12 weeks',
      students: 55,
      rating: 4.8,
      description: isArabic 
        ? 'تعلم كيفية تأمين أجهزة إنترنت الأشياء وحوسبة الحافة من التهديدات السيبرانية'
        : 'Learn how to secure IoT devices and edge computing from cyber threats',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop',
      category: isArabic ? 'أمن سيبراني' : 'Cybersecurity',
    }
  ];

  // تصفية المقررات حسب البحث والتصنيف
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = searchTerm === '' ? true : (
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesCategory = activeCategory === 'all' || course.category.toLowerCase() === activeCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  // ترتيب المقررات حسب الاختيار
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else if (sortBy === 'popular') {
      return b.students - a.students;
    } else { // newest - افتراضي باستخدام الترتيب العكسي للمعرفات
      return b.id.localeCompare(a.id);
    }
  });

  // استخراج الفئات الفريدة للمقررات
  const categories = ['all', ...new Set(courses.map(course => course.category))];
  
  // حساب الإحصائيات
  const stats = {
    totalCourses: courses.length,
    totalCategories: new Set(courses.map(course => course.category)).size,
    totalInstructors: new Set(courses.map(course => course.instructor)).size,
    averageRating: (courses.reduce((sum, course) => sum + course.rating, 0) / courses.length).toFixed(1),
    totalStudents: courses.reduce((sum, course) => sum + course.students, 0),
  };

  // المقررات المميزة
  const featuredCourses = courses
    .filter(course => course.rating >= 4.8)
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      {/* قسم المقررات المميزة */}
      {isLoaded && (
        <div className="w-full bg-gradient-to-br from-cloud/20 to-blue-600/5 dark:from-cloud/10 dark:to-slate-800 py-10 mt-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cloud to-blue-600 bg-clip-text text-transparent">
              {isArabic ? 'المقررات المميزة' : 'Featured Courses'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCourses.map(course => (
                <div key={`featured-${course.id}`} className="relative overflow-hidden rounded-xl group">
                  <div className="aspect-w-16 aspect-h-9 aspect-ratio-16/9">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6">
                    <div className="mb-2">
                      <Badge variant="outline" className="bg-white/20 text-white border-white/20 backdrop-blur-sm">
                        {course.category}
                      </Badge>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{course.title}</h3>
                    <p className="text-white/80 text-sm mb-3 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="fill-yellow-400 stroke-yellow-400 h-4 w-4 mr-1" />
                        <span className="text-white font-medium">{course.rating}</span>
                      </div>
                      <Link to={`/courses/${course.id}`} className="inline-flex items-center bg-white/20 hover:bg-white/30 text-white backdrop-blur-md rounded-lg px-3 py-1.5 text-sm font-medium transition-colors">
                        {isArabic ? 'استكشف المقرر' : 'Explore Course'} <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {!isLoaded ? (
          // حالة التحميل
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="w-16 h-16 border-4 border-cloud border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              {isArabic ? 'جاري تحميل المقررات...' : 'Loading courses...'}
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center text-center mb-6">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cloud to-blue-600 bg-clip-text text-transparent">
                {isArabic ? 'استكشف المقررات' : 'Explore Courses'}
              </h1>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mb-6">
                {isArabic 
                  ? 'اكتشف مجموعة واسعة من المقررات المصممة لمساعدتك على تطوير مهاراتك وتحقيق أهدافك التعليمية'
                  : 'Discover a wide range of courses designed to help you develop your skills and achieve your educational goals'
                }
              </p>
            </div>

            {/* قسم الإحصائيات */}
            <div className="w-full max-w-6xl mx-auto mb-10 bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-cloud to-blue-600"></div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {isArabic ? 'إحصائيات المقررات' : 'Course Statistics'}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="flex flex-col items-center p-4 rounded-lg bg-slate-50 dark:bg-slate-700/30">
                    <BookOpen className="h-6 w-6 text-cloud mb-2" />
                    <span className="text-2xl font-bold">{stats.totalCourses}</span>
                    <span className="text-sm text-slate-500">
                      {isArabic ? 'مقررات' : 'Courses'}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-lg bg-slate-50 dark:bg-slate-700/30">
                    <Filter className="h-6 w-6 text-yellow-500 mb-2" />
                    <span className="text-2xl font-bold">{stats.totalCategories}</span>
                    <span className="text-sm text-slate-500">
                      {isArabic ? 'فئات' : 'Categories'}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-lg bg-slate-50 dark:bg-slate-700/30">
                    <GraduationCap className="h-6 w-6 text-green-500 mb-2" />
                    <span className="text-2xl font-bold">{stats.totalInstructors}</span>
                    <span className="text-sm text-slate-500">
                      {isArabic ? 'مدرسين' : 'Instructors'}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-lg bg-slate-50 dark:bg-slate-700/30">
                    <Star className="h-6 w-6 text-amber-400 mb-2" />
                    <span className="text-2xl font-bold">{stats.averageRating}</span>
                    <span className="text-sm text-slate-500">
                      {isArabic ? 'متوسط التقييم' : 'Avg Rating'}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-lg bg-slate-50 dark:bg-slate-700/30">
                    <Users className="h-6 w-6 text-indigo-500 mb-2" />
                    <span className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</span>
                    <span className="text-sm text-slate-500">
                      {isArabic ? 'طلاب' : 'Students'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* بحث وتصفية */}
            <div className="w-full max-w-6xl mx-auto mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    placeholder={isArabic ? "ابحث عن المقررات بالعنوان أو الوصف أو المدرس..." : "Search by title, description, or instructor..."} 
                    className="pl-10 w-full h-11" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex-shrink-0">
                  <Select
                    value={sortBy}
                    onValueChange={setSortBy}
                  >
                    <SelectTrigger className="w-full md:w-[180px] h-11">
                      <div className="flex items-center gap-2">
                        <BarChart className="h-4 w-4" />
                        <SelectValue placeholder={isArabic ? "الترتيب حسب" : "Sort by"} />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">{isArabic ? "الأكثر شعبية" : "Most Popular"}</SelectItem>
                      <SelectItem value="rating">{isArabic ? "الأعلى تقييماً" : "Highest Rated"}</SelectItem>
                      <SelectItem value="newest">{isArabic ? "الأحدث" : "Newest"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
                <div className="overflow-x-auto pb-2">
                  <TabsList className="inline-flex w-full md:w-auto">
                    {categories.map((category) => (
                      <TabsTrigger key={category} value={category} className="min-w-max">
                        {category === 'all' 
                          ? (isArabic ? "جميع المقررات" : "All Courses")
                          : category
                        }
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                <TabsContent value={activeCategory} className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                      {activeCategory === 'all'
                        ? (isArabic ? "جميع المقررات" : "All Courses")
                        : (isArabic ? `مقررات ${activeCategory}` : `${activeCategory} Courses`)
                      }
                    </h2>
                    <span className="text-sm text-slate-500">
                      {sortedCourses.length} {isArabic ? "مقرر" : "courses"}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 dark:border-slate-700 h-full flex flex-col group bg-white dark:bg-slate-800">
              <div className="relative">
                <AspectRatio ratio={16/9} className="relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm line-clamp-3 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-4 transition-all duration-300">
                      {course.description}
                    </p>
                  </div>
                </AspectRatio>
                
                {/* Overlay badges */}
                <div className="absolute top-3 left-3 right-3 flex justify-between">
                  <Badge variant="outline" className="bg-white/90 dark:bg-slate-800/90 text-cloud border-cloud/20 backdrop-blur-sm">
                    {course.code}
                  </Badge>
                  <Badge variant="outline" className={`
                    backdrop-blur-sm 
                    ${course.level === (isArabic ? 'مبتدئ' : 'Beginner') ? 'bg-green-500/20 text-green-600 border-green-200/30 dark:text-green-400' : ''}
                    ${course.level === (isArabic ? 'متوسط' : 'Intermediate') ? 'bg-yellow-500/20 text-yellow-600 border-yellow-200/30 dark:text-yellow-400' : ''}
                    ${course.level === (isArabic ? 'متقدم' : 'Advanced') ? 'bg-red-500/20 text-red-600 border-red-200/30 dark:text-red-400' : ''}
                  `}>
                    {course.level}
                  </Badge>
                </div>
                
                {/* Category pill */}
                <div className="absolute -bottom-3 left-3">
                  <Badge className="bg-cloud text-white shadow-md">
                    {course.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-2 pt-6">
                <CardTitle className="text-lg line-clamp-2 group-hover:text-cloud transition-colors duration-200">
                  {course.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1">
                  <GraduationCap className="h-4 w-4 text-cloud" />
                  {course.instructor}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-2 flex-grow space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                  {course.description}
                </p>
                
                <div className="grid grid-cols-3 gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-50 dark:bg-slate-700/30">
                    <Users className="h-4 w-4 text-cloud mb-1" />
                    <span className="text-xs font-medium">{course.students}</span>
                    <span className="text-xs opacity-70">{isArabic ? 'طالب' : 'students'}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-50 dark:bg-slate-700/30">
                    <Clock className="h-4 w-4 text-cloud mb-1" />
                    <span className="text-xs font-medium">{course.duration}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-50 dark:bg-slate-700/30">
                    <Star className="h-4 w-4 text-amber-400 mb-1" />
                    <span className="text-xs font-medium">{course.rating}</span>
                    <span className="text-xs opacity-70">{isArabic ? 'تقييم' : 'rating'}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 pt-2">
                  <BookOpenCheck className="h-4 w-4 text-slate-400" />
                  <span className="text-xs text-slate-500">
                    {isArabic ? 'يبدأ قريباً' : 'Starts soon'} - {isArabic ? 'التسجيل مفتوح' : 'Enrollment open'}
                  </span>
                </div>
              </CardContent>
              
              <CardFooter className="pt-2">
                <div className="w-full grid grid-cols-2 gap-2">
                  <Button variant="outline" className="text-sm h-9 hover:bg-cloud/10">
                    {isArabic ? 'التفاصيل' : 'Details'}
                  </Button>
                  <Link to={`/courses/${course.id}`} className="w-full">
                    <Button className="w-full text-sm h-9">
                      {isArabic ? 'التسجيل' : 'Enroll'}
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </main>
        <Footer />
      </div>
    );
};

export default Courses;
