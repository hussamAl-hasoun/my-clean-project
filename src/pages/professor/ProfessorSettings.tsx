import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import ProfessorSidebar from '@/components/ProfessorSidebar';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import { Bell, Lock, User, Globe, Moon, Sun, Monitor, School } from 'lucide-react';

const ProfessorSettings = () => {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const [personalInfo, setPersonalInfo] = React.useState({
    email: "professor@example.com",
    phone: "+966 50 987 6543",
    office: language === 'ar' ? "مبنى العلوم، غرفة 110" : "Science Building, Room 110",
    officeHours: language === 'ar' ? "الأحد والثلاثاء: 1-3 مساءً" : "Sun & Tue: 1-3 PM",
  });

  const [notifications, setNotifications] = React.useState({
    emailNotifications: true,
    smsNotifications: false,
    studentSubmissions: true,
    academicUpdates: true,
    departmentAnnouncements: true,
  });

  const handlePersonalInfoChange = (field: keyof typeof personalInfo) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleNotificationChange = (setting: keyof typeof notifications) => () => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSavePersonalInfo = () => {
    toast({
      title: language === 'ar' ? "تم الحفظ" : "Changes saved",
      description: language === 'ar' ? "تم تحديث المعلومات الشخصية بنجاح" : "Personal information updated successfully",
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      <ProfessorSidebar />
      
      <main className="flex-1 p-4 md:p-6 overflow-auto md:ml-64 rtl:md:ml-0 rtl:md:mr-64">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-cloud-dark dark:text-white">
            {language === 'ar' ? 'الإعدادات' : 'Settings'}
          </h1>
          
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="account">
                <User className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'الحساب' : 'Account'}
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'الإشعارات' : 'Notifications'}
              </TabsTrigger>
              <TabsTrigger value="preferences">
                <Globe className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'التفضيلات' : 'Preferences'}
              </TabsTrigger>
            </TabsList>
            
            {/* Account Settings */}
            <TabsContent value="account">
              <Card className="dark:border-slate-700">
                <CardHeader>
                  <CardTitle>{language === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}</CardTitle>
                  <CardDescription>
                    {language === 'ar' ? 'تحديث معلومات الاتصال وتفاصيل المكتب' : 'Update your contact information and office details'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label>
                    <Input 
                      id="email" 
                      value={personalInfo.email} 
                      onChange={handlePersonalInfoChange('email')} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</Label>
                    <Input 
                      id="phone" 
                      value={personalInfo.phone} 
                      onChange={handlePersonalInfoChange('phone')} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="office">{language === 'ar' ? 'المكتب' : 'Office Location'}</Label>
                    <Input 
                      id="office" 
                      value={personalInfo.office} 
                      onChange={handlePersonalInfoChange('office')} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="officeHours">{language === 'ar' ? 'الساعات المكتبية' : 'Office Hours'}</Label>
                    <Input 
                      id="officeHours" 
                      value={personalInfo.officeHours} 
                      onChange={handlePersonalInfoChange('officeHours')} 
                    />
                  </div>
                  <Button className="mt-4" onClick={handleSavePersonalInfo}>
                    {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="dark:border-slate-700 mt-6">
                <CardHeader>
                  <CardTitle>{language === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}</CardTitle>
                  <CardDescription>
                    {language === 'ar' ? 'تحديث كلمة المرور الخاصة بك' : 'Update your password'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">{language === 'ar' ? 'كلمة المرور الحالية' : 'Current Password'}</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">{language === 'ar' ? 'كلمة المرور الجديدة' : 'New Password'}</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{language === 'ar' ? 'تأكيد كلمة المرور الجديدة' : 'Confirm New Password'}</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button variant="outline" className="mt-4">
                    {language === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Notification Settings */}
            <TabsContent value="notifications">
              <Card className="dark:border-slate-700">
                <CardHeader>
                  <CardTitle>{language === 'ar' ? 'إعدادات الإشعارات' : 'Notification Settings'}</CardTitle>
                  <CardDescription>
                    {language === 'ar' ? 'تخصيص كيفية تلقي الإشعارات' : 'Customize how you receive notifications'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailNotifications" className="flex flex-col">
                        <span>{language === 'ar' ? 'إشعارات البريد الإلكتروني' : 'Email Notifications'}</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {language === 'ar' ? 'تلقي الإشعارات عبر البريد الإلكتروني' : 'Receive notifications via email'}
                        </span>
                      </Label>
                      <Switch
                        id="emailNotifications"
                        checked={notifications.emailNotifications}
                        onCheckedChange={handleNotificationChange('emailNotifications')}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <Label htmlFor="smsNotifications" className="flex flex-col">
                        <span>{language === 'ar' ? 'إشعارات الرسائل النصية' : 'SMS Notifications'}</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {language === 'ar' ? 'تلقي الإشعارات عبر الرسائل النصية' : 'Receive notifications via SMS'}
                        </span>
                      </Label>
                      <Switch
                        id="smsNotifications"
                        checked={notifications.smsNotifications}
                        onCheckedChange={handleNotificationChange('smsNotifications')}
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium pt-2">
                    {language === 'ar' ? 'أنواع الإشعارات' : 'Notification Types'}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="studentSubmissions">
                        {language === 'ar' ? 'تسليمات الطلاب' : 'Student Submissions'}
                      </Label>
                      <Switch
                        id="studentSubmissions"
                        checked={notifications.studentSubmissions}
                        onCheckedChange={handleNotificationChange('studentSubmissions')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="academicUpdates">
                        {language === 'ar' ? 'التحديثات الأكاديمية' : 'Academic Updates'}
                      </Label>
                      <Switch
                        id="academicUpdates"
                        checked={notifications.academicUpdates}
                        onCheckedChange={handleNotificationChange('academicUpdates')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="departmentAnnouncements">
                        {language === 'ar' ? 'إعلانات القسم' : 'Department Announcements'}
                      </Label>
                      <Switch
                        id="departmentAnnouncements"
                        checked={notifications.departmentAnnouncements}
                        onCheckedChange={handleNotificationChange('departmentAnnouncements')}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Preferences Settings */}
            <TabsContent value="preferences">
              <Card className="dark:border-slate-700">
                <CardHeader>
                  <CardTitle>{language === 'ar' ? 'اللغة والمظهر' : 'Language & Appearance'}</CardTitle>
                  <CardDescription>
                    {language === 'ar' ? 'تخصيص تجربة المستخدم الخاصة بك' : 'Customize your user experience'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="language">{language === 'ar' ? 'اللغة' : 'Language'}</Label>
                    <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'ar')}>
                      <SelectTrigger id="language" className="w-full sm:w-[240px]">
                        <SelectValue placeholder={language === 'ar' ? 'اختر اللغة' : 'Select language'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ar">العربية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{language === 'ar' ? 'المظهر' : 'Theme'}</Label>
                    <div className="flex items-center space-x-4">
                      <Button
                        variant={theme === 'light' ? 'default' : 'outline'}
                        size="sm"
                        className="flex items-center"
                        onClick={() => setTheme('light')}
                      >
                        <Sun className="h-4 w-4 mr-2" />
                        {language === 'ar' ? 'فاتح' : 'Light'}
                      </Button>
                      <Button
                        variant={theme === 'dark' ? 'default' : 'outline'}
                        size="sm"
                        className="flex items-center"
                        onClick={() => setTheme('dark')}
                      >
                        <Moon className="h-4 w-4 mr-2" />
                        {language === 'ar' ? 'داكن' : 'Dark'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="dark:border-slate-700 mt-6">
                <CardHeader>
                  <CardTitle>{language === 'ar' ? 'إعدادات المقررات' : 'Course Settings'}</CardTitle>
                  <CardDescription>
                    {language === 'ar' ? 'تحديد إعدادات المقررات الافتراضية' : 'Set default course preferences'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoGradeAssignments" className="flex flex-col">
                      <span>{language === 'ar' ? 'تقييم تلقائي للواجبات' : 'Auto-grade Assignments'}</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {language === 'ar' ? 'تمكين التصحيح التلقائي للواجبات' : 'Enable automatic grading for assignments'}
                      </span>
                    </Label>
                    <Switch id="autoGradeAssignments" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showGradesToStudents" className="flex flex-col">
                      <span>{language === 'ar' ? 'إظهار الدرجات للطلاب' : 'Show Grades to Students'}</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {language === 'ar' ? 'السماح للطلاب برؤية درجاتهم فور التصحيح' : 'Allow students to see their grades immediately'}
                      </span>
                    </Label>
                    <Switch id="showGradesToStudents" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ProfessorSettings;
