
import React, { useState } from 'react';
import StudentSidebar from '@/components/StudentSidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/hooks/useLanguage';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { MessageCircle, SearchIcon, Send, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Contact {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  lastMessage: string;
  isOnline: boolean;
  unread: number;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  isMine: boolean;
}

const Messages = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: isArabic ? 'د. أحمد محمد' : 'Dr. Ahmed Mohammed',
      role: isArabic ? 'أستاذ مادة البرمجة' : 'Programming Professor',
      lastMessage: isArabic ? 'متى موعد تسليم المشروع؟' : 'When is the project due?',
      isOnline: true,
      unread: 2,
    },
    {
      id: '2',
      name: isArabic ? 'د. سارة عبدالله' : 'Dr. Sarah Abdullah',
      role: isArabic ? 'أستاذة مادة الرياضيات' : 'Mathematics Professor',
      lastMessage: isArabic ? 'سيتم مناقشة المشروع غدًا' : 'We will discuss the project tomorrow',
      isOnline: false,
      unread: 0,
    },
    {
      id: '3',
      name: isArabic ? 'د. خالد العمري' : 'Dr. Khalid Alamri',
      role: isArabic ? 'أستاذ مادة قواعد البيانات' : 'Database Professor',
      lastMessage: isArabic ? 'تم تحديث مواعيد الاختبارات' : 'Exam schedules have been updated',
      isOnline: true,
      unread: 1,
    },
  ]);
  
  const [selectedContact, setSelectedContact] = useState<Contact | null>(contacts[0]);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: '1',
      content: isArabic ? 'مرحباً، كيف يمكنني مساعدتك؟' : 'Hello, how can I help you?',
      timestamp: new Date(2023, 4, 10, 14, 30),
      read: true,
      isMine: false,
    },
    {
      id: '2',
      senderId: 'me',
      content: isArabic ? 'مرحباً دكتور، متى موعد تسليم المشروع النهائي؟' : 'Hello professor, when is the final project due?',
      timestamp: new Date(2023, 4, 10, 14, 32),
      read: true,
      isMine: true,
    },
    {
      id: '3',
      senderId: '1',
      content: isArabic ? 'موعد التسليم النهائي هو 20 من الشهر الجاري' : 'The deadline is on the 20th of this month',
      timestamp: new Date(2023, 4, 10, 14, 35),
      read: true,
      isMine: false,
    },
    {
      id: '4',
      senderId: '1',
      content: isArabic ? 'وسأكون متاحاً لمساعدتكم إذا كان لديكم أي استفسارات' : 'I will be available to help if you have any questions',
      timestamp: new Date(2023, 4, 10, 14, 36),
      read: false,
      isMine: false,
    },
  ]);

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    // Mark messages as read when selecting a contact
    setContacts(contacts.map(c => 
      c.id === contact.id ? {...c, unread: 0} : c
    ));
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedContact) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      content: messageInput,
      timestamp: new Date(),
      read: false,
      isMine: true,
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput('');
    
    // Simulate response after 1 second
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedContact.id,
        content: isArabic ? 
          'شكراً لرسالتك، سأرد عليك قريباً' : 
          'Thanks for your message, I will get back to you soon',
        timestamp: new Date(),
        read: false,
        isMine: false,
      };
      
      setMessages(prev => [...prev, responseMessage]);
      
      toast({
        title: isArabic ? 'رسالة جديدة' : 'New Message',
        description: isArabic ? 
          `رسالة جديدة من ${selectedContact.name}` : 
          `New message from ${selectedContact.name}`,
      });
    }, 1000);
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(isArabic ? 'ar-SA' : 'en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900">
      <StudentSidebar />
      
      <div className={`flex-1 ${isArabic ? 'mr-64 md:mr-64' : 'ml-0 md:ml-64'}`}>
        <div className="p-4 sm:p-6 md:p-8 w-full max-w-7xl mx-auto">
          <h1 className={`text-2xl font-bold mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
            {isArabic ? 'الرسائل' : 'Messages'}
          </h1>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-[calc(100vh-180px)] flex overflow-hidden">
            {/* Contacts sidebar */}
            <div className="w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col">
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder={isArabic ? "بحث..." : "Search..."}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {contacts.map(contact => (
                  <div 
                    key={contact.id} 
                    className={`p-3 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      selectedContact?.id === contact.id ? 'bg-gray-100 dark:bg-gray-700' : ''
                    }`}
                    onClick={() => handleSelectContact(contact)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                          {contact.avatar && <AvatarImage src={contact.avatar} alt={contact.name} />}
                        </Avatar>
                        {contact.isOnline && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-sm truncate">{contact.name}</h3>
                          {contact.unread > 0 && (
                            <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                              {contact.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{contact.role}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                          {contact.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Message area */}
            {selectedContact ? (
              <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                      {selectedContact.avatar && <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />}
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{selectedContact.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {selectedContact.isOnline ? 
                          (isArabic ? 'متصل الآن' : 'Online now') : 
                          (isArabic ? 'غير متصل' : 'Offline')
                        }
                      </p>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    <span>{isArabic ? 'الملف الشخصي' : 'Profile'}</span>
                  </Button>
                </div>
                
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {messages
                    .filter(msg => msg.senderId === selectedContact.id || msg.senderId === 'me')
                    .map(message => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
                      >
                        {!message.isMine && (
                          <Avatar className="h-8 w-8 mr-2 mt-1">
                            <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                            {selectedContact.avatar && <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />}
                          </Avatar>
                        )}
                        
                        <div className={`max-w-[75%]`}>
                          <Card className={`p-3 ${
                            message.isMine ? 
                              'bg-blue-500 text-white' : 
                              'bg-gray-100 dark:bg-gray-700'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                          </Card>
                          <p className={`text-xs text-gray-500 mt-1 ${
                            message.isMine ? 'text-right' : 'text-left'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
                
                {/* Message input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-2">
                    <Textarea 
                      placeholder={isArabic ? "اكتب رسالة..." : "Type a message..."}
                      className="resize-none min-h-[60px]"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage} className="self-end h-[60px]">
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-400 mb-2">
                    <MessageCircle className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="font-medium text-lg">
                    {isArabic ? 'اختر محادثة' : 'Select a conversation'}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto mt-1">
                    {isArabic 
                      ? 'اختر أحد جهات الاتصال من القائمة لبدء المحادثة'
                      : 'Choose a contact from the list to start messaging'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
