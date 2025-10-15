import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from './ui/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';

// Form validation schema
const loginSchema = z.object({
  username: z.string().min(3, 'يجب أن يكون اسم المستخدم 3 أحرف على الأقل'),
  password: z.string().min(8, 'يجب أن تكون كلمة المرور 8 أحرف على الأقل'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const getErrorMessage = (message: string, isArabic: boolean) => {
  if (message.includes('يجب أن يكون اسم المستخدم')) {
    return isArabic 
      ? 'يجب أن يكون اسم المستخدم 3 أحرف على الأقل'
      : 'Username must be at least 3 characters';
  }
  if (message.includes('يجب أن تكون كلمة المرور')) {
    return isArabic 
      ? 'يجب أن تكون كلمة المرور 8 أحرف على الأقل'
      : 'Password must be at least 8 characters';
  }
  return message;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [role, setRole] = React.useState('student');

  const studentTabRef = useRef<HTMLButtonElement>(null);
  const professorTabRef = useRef<HTMLButtonElement>(null);
  const [indicatorStyle, setIndicatorStyle] = React.useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const targetTab = role === 'student' ? studentTabRef.current : professorTabRef.current;
    if (targetTab) {
      setIndicatorStyle({
        left: targetTab.offsetLeft,
        width: targetTab.offsetWidth,
        opacity: 1
      });
    }
  }, [role]);

  // إعداد React Hook Form مع التحقق من صحة البيانات باستخدام Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      // Show loading toast
      toast({
        title: isArabic ? "جاري تسجيل الدخول..." : "Signing in...",
        description: isArabic ? "يرجى الانتظار" : "Please wait",
      });

      // Simulate API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success toast
      toast({
        title: isArabic ? "تم تسجيل الدخول بنجاح" : "Signed in successfully",
        description: isArabic ? "مرحباً بك في منصة حسام" : "Welcome to Hossam Platform",
      });

      navigate(role === 'student' ? '/student' : '/professor');
    } catch (error) {
      // Handle errors safely without exposing details
      toast({
        title: isArabic ? "حدث خطأ" : "Error",
        description: isArabic ? "حدث خطأ أثناء تسجيل الدخول" : "An error occurred while signing in",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md border-slate-200 dark:border-slate-700 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-cloud-dark dark:text-white">
          {isArabic ? 'مرحباً بعودتك' : 'Welcome Back'}
        </CardTitle>
        <CardDescription className="text-center">
          {isArabic 
            ? 'سجل الدخول للوصول إلى حسابك على منصة حسام كلاود'
            : 'Sign in to access your account on Hossam Cloud'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="student" value={role} onValueChange={setRole} className="w-full mb-6">
          <TabsList className="relative grid grid-cols-2 gap-x-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <TabsTrigger 
              ref={studentTabRef}
              value="student" 
              className={cn(
                "relative z-10 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-300",
                role === 'student' 
                  ? "text-white" 
                  : "text-slate-900 dark:text-white"
              )}
            >
              {isArabic ? 'طالب' : 'Student'}
            </TabsTrigger>
            <TabsTrigger 
              ref={professorTabRef}
              value="professor" 
              className={cn(
                "relative z-10 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-300",
                role === 'professor' 
                  ? "text-white" 
                  : "text-slate-900 dark:text-white"
              )}
            >
              {isArabic ? 'أستاذ' : 'Professor'}
            </TabsTrigger>
            {/* Animated Indicator */}
            <div 
              className="absolute top-1 bottom-1 h-auto rounded-md bg-cloud shadow-sm transition-all duration-300"
              style={{ left: indicatorStyle.left, width: indicatorStyle.width, opacity: indicatorStyle.opacity }}
            />
          </TabsList>
        </Tabs>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className={cn("text-slate-700 dark:text-slate-200", errors.username && "text-destructive")}>
              {isArabic ? 'اسم المستخدم' : 'Username'}
            </Label>
            <Input 
              id="username"
              type="text"
              autoComplete="username"
              placeholder={isArabic ? 'أدخل اسم المستخدم' : 'Enter username'}
              {...register('username')}
              className={cn(
                "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700",
                errors.username && "border-destructive"
              )}
              aria-invalid={errors.username ? "true" : "false"}
            />
            {errors.username && (
              <p className="text-sm font-medium text-destructive">
                {getErrorMessage(errors.username.message, isArabic)}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className={cn("text-slate-700 dark:text-slate-200", errors.password && "text-destructive")}>
              {isArabic ? 'كلمة المرور' : 'Password'}
            </Label>
            <Input 
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder={isArabic ? 'أدخل كلمة المرور' : 'Enter password'}
              {...register('password')}
              className={cn(
                "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700",
                errors.password && "border-destructive"
              )}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <p className="text-sm font-medium text-destructive">
                {getErrorMessage(errors.password.message, isArabic)}
              </p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-cloud hover:bg-cloud/90 text-white dark:text-slate-900" 
            disabled={isSubmitting}
          >
            {isSubmitting 
              ? (isArabic ? "جاري تسجيل الدخول..." : "Signing in...") 
              : (isArabic ? "تسجيل الدخول" : "Sign In")
            }
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 border-t border-slate-200 dark:border-slate-700 pt-4">
        <div className="text-sm text-center text-slate-600 dark:text-slate-400">
          {isArabic ? 'ليس لديك حساب؟' : "Don't have an account?"}{" "}
          <a href="/register" className="text-cloud hover:underline">
            {isArabic ? 'التسجيل' : 'Register'}
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
