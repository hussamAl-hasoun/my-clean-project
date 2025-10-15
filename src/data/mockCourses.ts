export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  imageUrl: string;
  category: string;
  level: string;
  duration: string;
  students: number;
  rating: number;
}

export const mockCourses: Course[] = [
  {
    id: 'math101',
    title: 'حساب التفاضل والتكامل',
    description: 'دراسة مفاهيم التفاضل والتكامل وتطبيقاتها في المسائل العملية',
    instructor: 'د. أحمد السعيد',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop',
    category: 'رياضيات',
    level: 'مبتدئ',
    students: 150,
    rating: 4.7
  },
  {
    id: 'phys201',
    title: 'الفيزياء الحديثة',
    description: 'دراسة مبادئ الفيزياء الحديثة وتطبيقاتها في التكنولوجيا',
    instructor: 'د. سارة العمري',
    imageUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=2074&auto=format&fit=crop',
    category: 'فيزياء',
    level: 'متوسط',
    students: 95,
    rating: 4.8
  },
  {
    id: 'chem301',
    title: 'الكيمياء العضوية',
    description: 'دراسة المركبات العضوية وتفاعلاتها وتطبيقاتها في الصناعة',
    instructor: 'د. محمد الخالدي',
    imageUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=2070&auto=format&fit=crop',
    category: 'كيمياء',
    level: 'متقدم',
    students: 75,
    rating: 4.9
  },
  {
    id: 'itcl201',
    title: 'البرمجة الأساسية للسحابة',
    description: 'تعلم أساسيات البرمجة السحابية وتطوير التطبيقات السحابية الحديثة من خلال مشاريع عملية ودراسة حالات واقعية',
    instructor: 'د. سارة الأحمد',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    category: 'برمجة سحابية',
    level: 'مبتدئ',
    duration: '١٢ أسبوع',
    students: 85,
    rating: 4.8
  },
  {
    id: 'itbs106',
    title: 'هياكل البيانات',
    description: 'دراسة هياكل البيانات المتقدمة والخوارزميات الأساسية وتطبيقاتها العملية',
    instructor: 'د. خالد المهندس',
    imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069&auto=format&fit=crop',
    category: 'علوم الحاسب',
    level: 'متوسط',
    duration: '١٠ أسابيع',
    students: 42,
    rating: 4.6
  },
  {
    id: 'itdb301',
    title: 'قواعد البيانات السحابية',
    description: 'تعلم تصميم وإدارة قواعد البيانات السحابية وتطبيقاتها في المشاريع الحديثة',
    instructor: 'د. نورة السعيد',
    imageUrl: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2070&auto=format&fit=crop',
    category: 'برمجة سحابية',
    level: 'متوسط',
    duration: '٨ أسابيع',
    students: 55,
    rating: 4.7
  },
  {
    id: 'itse401',
    title: 'أمن المعلومات السحابي',
    description: 'دراسة متعمقة في أمن الحوسبة السحابية وحماية البيانات وأفضل الممارسات الأمنية',
    instructor: 'د. فهد العتيبي',
    imageUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop',
    category: 'أمن المعلومات',
    level: 'متقدم',
    duration: '١٠ أسابيع',
    students: 38,
    rating: 4.9
  },
  {
    id: 'itdv205',
    title: 'تطوير تطبيقات الويب السحابية',
    description: 'تعلم تطوير تطبيقات الويب الحديثة باستخدام التقنيات السحابية وأطر العمل المتقدمة',
    instructor: 'د. ليلى الحربي',
    imageUrl: 'https://images.unsplash.com/photo-1603322199363-14380ec2ba31?q=80&w=2070&auto=format&fit=crop',
    category: 'تطوير الويب',
    level: 'متوسط',
    duration: '١٢ أسبوع',
    students: 72,
    rating: 4.8
  },
  {
    id: 'itai301',
    title: 'الذكاء الاصطناعي في السحابة',
    description: 'استكشف تطبيقات الذكاء الاصطناعي في البيئة السحابية وتعلم كيفية بناء حلول ذكية قابلة للتطوير',
    instructor: 'د. عبدالله القحطاني',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070&auto=format&fit=crop',
    category: 'ذكاء اصطناعي',
    level: 'متقدم',
    duration: '١٤ أسبوع',
    students: 45,
    rating: 4.9
  },
  {
    id: 'itcc401',
    title: 'الحوسبة السحابية المتقدمة',
    description: 'دراسة متعمقة في مفاهيم الحوسبة السحابية المتقدمة وتطبيقاتها في المؤسسات الكبيرة',
    instructor: 'د. أحمد الزهراني',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    category: 'برمجة سحابية',
    level: 'متقدم',
    duration: '١٦ أسبوع',
    students: 35,
    rating: 4.7
  }
];
