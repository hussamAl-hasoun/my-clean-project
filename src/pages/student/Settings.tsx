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
import StudentSidebar from '@/components/StudentSidebar';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import { Bell, Lock, User, Globe, Moon, Sun } from 'lucide-react';

const StudentSettings = () => {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const [personalInfo, setPersonalInfo] = React.useState({
    email: "student@example.com",
    phone: "+966 50 123 4567",
    address: language === 'ar' ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia",
  });

  const [notifications, setNotifications] = React.useState({
    emailNotifications: true,
    smsNotifications: false,
    assignmentReminders: true,
    examReminders: true,
    gradeUpdates: true,
    announcementUpdates: true,
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
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <StudentSidebar />
      
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
                    {language === 'ar' ? 'تحديث معلومات الاتصال الخاصة بك' : 'Update your contact information'}
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
                    <Label htmlFor="address">{language === 'ar' ? 'العنوان' : 'Address'}</Label>
                    <Input 
                      id="address" 
                      value={personalInfo.address} 
                      onChange={handlePersonalInfoChange('address')} 
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
                      <Label htmlFor="assignmentReminders">
                        {language === 'ar' ? 'تذكيرات الواجبات' : 'Assignment Reminders'}
                      </Label>
                      <Switch
                        id="assignmentReminders"
                        checked={notifications.assignmentReminders}
                        onCheckedChange={handleNotificationChange('assignmentReminders')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="examReminders">
                        {language === 'ar' ? 'تذكيرات الاختبارات' : 'Exam Reminders'}
                      </Label>
                      <Switch
                        id="examReminders"
                        checked={notifications.examReminders}
                        onCheckedChange={handleNotificationChange('examReminders')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="gradeUpdates">
                        {language === 'ar' ? 'تحديثات الدرجات' : 'Grade Updates'}
                      </Label>
                      <Switch
                        id="gradeUpdates"
                        checked={notifications.gradeUpdates}
                        onCheckedChange={handleNotificationChange('gradeUpdates')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="announcementUpdates">
                        {language === 'ar' ? 'إعلانات المقررات' : 'Course Announcements'}
                      </Label>
                      <Switch
                        id="announcementUpdates"
                        checked={notifications.announcementUpdates}
                        onCheckedChange={handleNotificationChange('announcementUpdates')}
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
                  <CardTitle>{language === 'ar' ? 'الخصوصية' : 'Privacy'}</CardTitle>
                  <CardDescription>
                    {language === 'ar' ? 'إدارة إعدادات الخصوصية الخاصة بك' : 'Manage your privacy settings'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="profileVisibility" className="flex flex-col">
                      <span>{language === 'ar' ? 'إظهار الملف الشخصي للآخرين' : 'Show profile to others'}</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {language === 'ar' ? 'السماح للطلاب الآخرين برؤية ملفك الشخصي' : 'Allow other students to see your profile'}
                      </span>
                    </Label>
                    <Switch id="profileVisibility" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label htmlFor="activityStatus" className="flex flex-col">
                      <span>{language === 'ar' ? 'حالة النشاط' : 'Activity Status'}</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {language === 'ar' ? 'إظهار متى تكون متصلاً' : 'Show when you are online'}
                      </span>
                    </Label>
                    <Switch id="activityStatus" defaultChecked />
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

export default StudentSettings;
