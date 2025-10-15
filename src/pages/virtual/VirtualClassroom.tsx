
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Video, Mic, MicOff, VideoOff, MonitorSmartphone, MessageSquare, Users, Share2, PenTool, ChevronUp, ChevronDown, X, Layers, BookOpen } from 'lucide-react';

const VirtualClassroom = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [screenShareEnabled, setScreenShareEnabled] = useState(false);
  const [message, setMessage] = useState('');
  const [whiteboardVisible, setWhiteboardVisible] = useState(false);
  const [participantsPanelOpen, setParticipantsPanelOpen] = useState(false);
  
  // Mock data for participants
  const participants = [
    { id: 1, name: language === 'ar' ? 'د. سارة الأحمد' : 'Dr. Sarah Johnson', role: language === 'ar' ? 'أستاذ' : 'Professor', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80' },
    { id: 2, name: language === 'ar' ? 'محمد أحمد' : 'John Smith', role: language === 'ar' ? 'طالب' : 'Student', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80' },
    { id: 3, name: language === 'ar' ? 'نورة سعيد' : 'Sarah Williams', role: language === 'ar' ? 'طالب' : 'Student', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80' },
    { id: 4, name: language === 'ar' ? 'خالد عبدالرحمن' : 'David Miller', role: language === 'ar' ? 'طالب' : 'Student', avatar: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80' },
    { id: 5, name: language === 'ar' ? 'فاطمة خالد' : 'Emma Johnson', role: language === 'ar' ? 'طالب' : 'Student', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80' },
  ];

  // Mock data for chat messages
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: language === 'ar' ? 'د. سارة الأحمد' : 'Dr. Sarah Johnson', text: language === 'ar' ? 'مرحباً بالجميع في المحاضرة اليوم!' : 'Welcome everyone to today\'s lecture!', time: '10:00', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80' },
    { id: 2, sender: language === 'ar' ? 'محمد أحمد' : 'John Smith', text: language === 'ar' ? 'شكراً دكتورة، سعيد بحضور المحاضرة.' : 'Thank you professor, happy to be here.', time: '10:01', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80' },
    { id: 3, sender: language === 'ar' ? 'نورة سعيد' : 'Sarah Williams', text: language === 'ar' ? 'هل يمكنك مشاركة الشرائح؟' : 'Could you please share the slides?', time: '10:03', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80' },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: chatMessages.length + 1,
          sender: language === 'ar' ? 'محمد أحمد' : 'John Smith',
          text: message,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
        }
      ]);
      setMessage('');
    }
  };

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
    toast({
      title: videoEnabled 
        ? (language === 'ar' ? 'تم إيقاف الفيديو' : 'Video turned off') 
        : (language === 'ar' ? 'تم تشغيل الفيديو' : 'Video turned on'),
      duration: 2000,
    });
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    toast({
      title: audioEnabled 
        ? (language === 'ar' ? 'تم كتم الميكروفون' : 'Microphone muted') 
        : (language === 'ar' ? 'تم تشغيل الميكروفون' : 'Microphone unmuted'),
      duration: 2000,
    });
  };

  const toggleScreenShare = () => {
    setScreenShareEnabled(!screenShareEnabled);
    toast({
      title: screenShareEnabled 
        ? (language === 'ar' ? 'تم إيقاف مشاركة الشاشة' : 'Screen sharing stopped') 
        : (language === 'ar' ? 'تمت مشاركة الشاشة' : 'Screen shared'),
      duration: 2000,
    });
  };

  const toggleWhiteboard = () => {
    setWhiteboardVisible(!whiteboardVisible);
  };

  const leaveClass = () => {
    toast({
      title: language === 'ar' ? 'تم مغادرة المحاضرة' : 'Left the classroom',
      description: language === 'ar' ? 'لقد غادرت الفصل الافتراضي' : 'You have left the virtual classroom',
      duration: 3000,
    });
    navigate(-1);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-100 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 py-3 px-6 border-b dark:border-slate-700 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Video className="h-5 w-5 text-cloud" />
          <div>
            <h1 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              ITCL201 <span className="text-sm text-slate-500 dark:text-slate-400 font-normal">|</span> 
              <span className="text-sm text-slate-500 dark:text-slate-400 font-normal">
                {language === 'ar' ? 'البرمجة الأساسية للسحابة' : 'Basic Programming for Cloud'}
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">{language === 'ar' ? 'بدأت منذ 15 دقيقة' : 'Started 15 minutes ago'}</p>
          </div>
        </div>
        <Button variant="destructive" size="sm" onClick={leaveClass}>
          {language === 'ar' ? 'مغادرة' : 'Leave'}
        </Button>
      </div>
      
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main video area */}
        <div className="flex-1 flex flex-col h-full">
          {/* Video stream */}
          <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-slate-900">
            {!whiteboardVisible ? (
              <>
                {/* Professor's main video feed */}
                <div className="w-full h-full relative">
                  <img 
                    src="https://images.unsplash.com/photo-1580894894513-541e068a3e2b?auto=format&fit=crop&q=80&w=2000&h=1200" 
                    alt="Professor video stream"
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute bottom-4 left-4 bg-slate-800 bg-opacity-70 px-3 py-1 rounded-md text-white text-sm flex items-center">
                    <Mic className="h-4 w-4 mr-2" />
                    <span>{language === 'ar' ? 'د. سارة الأحمد' : 'Dr. Sarah Johnson'}</span>
                  </div>

                  {/* Screen share indicator */}
                  {screenShareEnabled && (
                    <div className="absolute top-4 left-4 bg-green-600 px-3 py-1 rounded-md text-white text-sm flex items-center">
                      <MonitorSmartphone className="h-4 w-4 mr-2" />
                      <span>{language === 'ar' ? 'مشاركة الشاشة نشطة' : 'Screen sharing active'}</span>
                    </div>
                  )}
                  
                  {/* Student video thumbnails */}
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    {participants.slice(1, 5).map((participant, index) => (
                      <div key={participant.id} className="relative">
                        <img 
                          src={participant.avatar}
                          alt={participant.name}
                          className="w-24 h-16 object-cover rounded-md border border-slate-600" 
                        />
                        <div className="absolute bottom-1 left-1 right-1 bg-black bg-opacity-50 px-1 rounded text-white text-xs truncate">
                          {participant.name.split(' ')[0]}
                        </div>
                      </div>
                    ))}
                    {participants.length > 5 && (
                      <div className="w-24 h-16 flex items-center justify-center rounded-md border border-slate-600 bg-slate-800 text-white">
                        +{participants.length - 4}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-white dark:bg-slate-800 flex justify-center items-center">
                <div className="w-full h-full flex flex-col">
                  <div className="bg-slate-100 dark:bg-slate-700 p-2 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <PenTool className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {language === 'ar' ? 'السبورة البيضاء التعاونية' : 'Collaborative Whiteboard'}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={toggleWhiteboard}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1 relative overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1596079890744-c1a0462d0975?auto=format&fit=crop&q=80&w=2000&h=1200" 
                      alt="Whiteboard"
                      className="w-full h-full object-contain bg-white" 
                    />
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-700 p-2 flex justify-center items-center gap-2">
                    <Button variant="outline" size="sm">
                      <PenTool className="h-4 w-4 mr-2" />
                      {language === 'ar' ? 'رسم' : 'Draw'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Layers className="h-4 w-4 mr-2" />
                      {language === 'ar' ? 'طبقات' : 'Layers'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <BookOpen className="h-4 w-4 mr-2" />
                      {language === 'ar' ? 'نماذج' : 'Templates'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Controls */}
          <div className="bg-white dark:bg-slate-800 p-3 border-t dark:border-slate-700 flex justify-center items-center space-x-4">
            <Button 
              onClick={toggleAudio}
              variant={audioEnabled ? "default" : "destructive"} 
              size="icon"
              className="rounded-full h-10 w-10"
            >
              {audioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </Button>
            
            <Button 
              onClick={toggleVideo}
              variant={videoEnabled ? "default" : "destructive"} 
              size="icon"
              className="rounded-full h-10 w-10"
            >
              {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>
            
            <Button 
              onClick={toggleScreenShare}
              variant={screenShareEnabled ? "destructive" : "default"}
              size="icon"
              className="rounded-full h-10 w-10"
            >
              <MonitorSmartphone className="h-5 w-5" />
            </Button>
            
            <Button 
              onClick={toggleWhiteboard}
              variant={whiteboardVisible ? "destructive" : "default"}
              size="icon" 
              className="rounded-full h-10 w-10"
            >
              <PenTool className="h-5 w-5" />
            </Button>
            
            <Button 
              onClick={() => setParticipantsPanelOpen(!participantsPanelOpen)}
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10"
            >
              <Users className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className={`bg-white dark:bg-slate-800 border-l dark:border-slate-700 w-80 flex flex-col transition-all duration-300 ${participantsPanelOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
          <Tabs defaultValue="chat" className="flex flex-col h-full">
            <TabsList className="grid grid-cols-2 m-2">
              <TabsTrigger value="chat">
                <MessageSquare className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'الدردشة' : 'Chat'}
              </TabsTrigger>
              <TabsTrigger value="participants">
                <Users className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'المشاركون' : 'Participants'}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="flex flex-col flex-1 overflow-hidden p-0 m-0">
              <div className="flex-1 overflow-y-auto p-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="mb-4 flex">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={msg.avatar} alt={msg.sender} />
                      <AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline">
                        <span className="font-medium text-sm">{msg.sender}</span>
                        <span className="text-xs text-slate-400">{msg.time}</span>
                      </div>
                      <p className="text-sm mt-1">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-3 border-t dark:border-slate-700">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder={language === 'ar' ? 'اكتب رسالة...' : 'Type a message...'}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit">
                    {language === 'ar' ? 'إرسال' : 'Send'}
                  </Button>
                </form>
              </div>
            </TabsContent>
            
            <TabsContent value="participants" className="flex flex-col flex-1 overflow-hidden p-0 m-0">
              <div className="flex-1 overflow-y-auto p-4">
                {participants.map((participant) => (
                  <div key={participant.id} className="mb-4 flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={participant.avatar} alt={participant.name} />
                      <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{participant.name}</div>
                      <div className="text-xs text-slate-400">{participant.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default VirtualClassroom;
