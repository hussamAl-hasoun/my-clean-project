
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StudentSidebar from '@/components/StudentSidebar';
import { useLanguage } from '@/hooks/useLanguage';
import { Bell, Calendar, FileCheck, GraduationCap, MessageSquare, Settings } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const StudentNotifications = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      type: 'assignment',
      title: language === 'ar' ? 'تم نشر واجب جديد في ITCL201' : 'New assignment posted in ITCL201',
      message: language === 'ar' ? 'تم نشر واجب "مقال عن هندسة السحابة" ويستحق في 15 مايو' : 'Assignment "Cloud Architecture Essay" has been posted and is due on May 15',
      date: '2025-05-05',
      read: false,
      course: 'ITCL201',
    },
    {
      id: 2,
      type: 'announcement',
      title: language === 'ar' ? 'إعلان مهم من ITBS106' : 'Important announcement from ITBS106',
      message: language === 'ar' ? 'تم تمديد موعد تسليم الواجب البرمجي #3 إلى 20 مايو' : 'Programming Assignment #3 deadline has been extended to May 20',
      date: '2025-05-06',
      read: false,
      course: 'ITBS106',
    },
    {
      id: 3,
      type: 'grade',
      title: language === 'ar' ? 'تم نشر درجات الاختبار النصفي' : 'Midterm exam grades posted',
      message: language === 'ar' ? 'تم نشر درجات الاختبار النصفي لمقرر AHEC102. انقر للاطلاع.' : 'Midterm exam grades for AHEC102 have been posted. Click to view.',
      date: '2025-05-08',
      read: true,
      course: 'AHEC102',
    },
    {
      id: 4,
      type: 'calendar',
      title: language === 'ar' ? 'تذكير: محاضرة ITCL201 غداً' : 'Reminder: ITCL201 lecture tomorrow',
      message: language === 'ar' ? 'لديك محاضرة في ITCL201 غداً في الساعة 10:00 صباحاً، قاعة 305' : 'You have a ITCL201 lecture tomorrow at 10:00 AM in Room 305',
      date: '2025-05-10',
      read: true,
      course: 'ITCL201',
    },
    {
      id: 5,
      type: 'system',
      title: language === 'ar' ? 'تحديث النظام: تم تحديث المنصة' : 'System update: Platform has been updated',
      message: language === 'ar' ? 'تم تحديث منصة حسام كلاود بمميزات جديدة. انقر لمعرفة المزيد.' : 'The Hossam Cloud platform has been updated with new features. Click to learn more.',
      date: '2025-05-01',
      read: true,
      course: null,
    },
  ]);

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    toast({
      title: language === 'ar' ? 'تم تحديث الإشعارات' : 'Notifications updated',
      description: language === 'ar' ? 'تم تحديد جميع الإشعارات كمقروءة' : 'All notifications marked as read',
    });
  };

  const clearAll = () => {
    setNotifications([]);
    toast({
      title: language === 'ar' ? 'تم مسح الإشعارات' : 'Notifications cleared',
      description: language === 'ar' ? 'تم مسح جميع الإشعارات' : 'All notifications have been cleared',
    });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return <FileCheck className="h-5 w-5" />;
      case 'announcement':
        return <MessageSquare className="h-5 w-5" />;
      case 'grade':
        return <GraduationCap className="h-5 w-5" />;
      case 'calendar':
        return <Calendar className="h-5 w-5" />;
      case 'system':
        return <Settings className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'assignment':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'announcement':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'grade':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'calendar':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'system':
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
      default:
        return 'bg-cloud/10 text-cloud';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'assignment':
        return language === 'ar' ? 'واجب' : 'Assignment';
      case 'announcement':
        return language === 'ar' ? 'إعلان' : 'Announcement';
      case 'grade':
        return language === 'ar' ? 'درجات' : 'Grades';
      case 'calendar':
        return language === 'ar' ? 'تقويم' : 'Calendar';
      case 'system':
        return language === 'ar' ? 'النظام' : 'System';
      default:
        return type;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <StudentSidebar />
      
      <main className="flex-1 p-4 md:p-6 overflow-auto md:ml-64 rtl:md:ml-0 rtl:md:mr-64">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-cloud-dark dark:text-white">
                {language === 'ar' ? 'الإشعارات' : 'Notifications'}
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                {language === 'ar'
                  ? `لديك ${unreadCount} إشعارات غير مقروءة`
                  : `You have ${unreadCount} unread notifications`}
              </p>
            </div>
            <div className="flex space-x-2 mt-3 sm:mt-0">
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                {language === 'ar' ? 'تحديد الكل كمقروء' : 'Mark all as read'}
              </Button>
              <Button variant="ghost" size="sm" onClick={clearAll}>
                {language === 'ar' ? 'مسح الكل' : 'Clear all'}
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">{language === 'ar' ? 'الكل' : 'All'}</TabsTrigger>
              <TabsTrigger value="assignment">{language === 'ar' ? 'واجبات' : 'Assignments'}</TabsTrigger>
              <TabsTrigger value="announcement">{language === 'ar' ? 'إعلانات' : 'Announcements'}</TabsTrigger>
              <TabsTrigger value="grade">{language === 'ar' ? 'درجات' : 'Grades'}</TabsTrigger>
              <TabsTrigger value="calendar">{language === 'ar' ? 'تقويم' : 'Calendar'}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <NotificationList 
                notifications={notifications}
                markAsRead={markAsRead}
                getIcon={getIcon}
                getTypeColor={getTypeColor}
                getTypeLabel={getTypeLabel}
                language={language}
              />
            </TabsContent>
            
            <TabsContent value="assignment">
              <NotificationList 
                notifications={notifications.filter(n => n.type === 'assignment')}
                markAsRead={markAsRead}
                getIcon={getIcon}
                getTypeColor={getTypeColor}
                getTypeLabel={getTypeLabel}
                language={language}
              />
            </TabsContent>
            
            <TabsContent value="announcement">
              <NotificationList 
                notifications={notifications.filter(n => n.type === 'announcement')}
                markAsRead={markAsRead}
                getIcon={getIcon}
                getTypeColor={getTypeColor}
                getTypeLabel={getTypeLabel}
                language={language}
              />
            </TabsContent>
            
            <TabsContent value="grade">
              <NotificationList 
                notifications={notifications.filter(n => n.type === 'grade')}
                markAsRead={markAsRead}
                getIcon={getIcon}
                getTypeColor={getTypeColor}
                getTypeLabel={getTypeLabel}
                language={language}
              />
            </TabsContent>
            
            <TabsContent value="calendar">
              <NotificationList 
                notifications={notifications.filter(n => n.type === 'calendar')}
                markAsRead={markAsRead}
                getIcon={getIcon}
                getTypeColor={getTypeColor}
                getTypeLabel={getTypeLabel}
                language={language}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

// Helper component for displaying notification lists
const NotificationList = ({ 
  notifications, 
  markAsRead, 
  getIcon, 
  getTypeColor, 
  getTypeLabel,
  language 
}: { 
  notifications: any[], 
  markAsRead: (id: number) => void,
  getIcon: (type: string) => React.ReactNode,
  getTypeColor: (type: string) => string,
  getTypeLabel: (type: string) => string,
  language: string
}) => {
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Bell className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
        <p className="text-slate-500 dark:text-slate-400">
          {language === 'ar' ? 'لا توجد إشعارات' : 'No notifications'}
        </p>
      </div>
    );
  }

  return (
    <Card className="dark:border-slate-700 mt-4">
      <CardContent className="p-0">
        <div className="divide-y dark:divide-slate-700">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${!notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start">
                <div className={`p-2 rounded-full mr-3 ${getTypeColor(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-cloud-dark dark:text-cloud-light">
                        {notification.title}
                      </span>
                      {!notification.read && (
                        <Badge variant="secondary" className="h-2 w-2 p-0 rounded-full bg-blue-500" />
                      )}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {new Date(notification.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                    </div>
                  </div>
                  <p className="text-sm mt-1 text-slate-600 dark:text-slate-300">
                    {notification.message}
                  </p>
                  <div className="flex items-center mt-2 space-x-2">
                    <Badge variant="outline" className={getTypeColor(notification.type)}>
                      {getTypeLabel(notification.type)}
                    </Badge>
                    {notification.course && (
                      <Badge variant="outline">
                        {notification.course}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentNotifications;
