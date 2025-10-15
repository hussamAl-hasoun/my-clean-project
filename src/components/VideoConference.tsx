import { type FC, useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Mic, MicOff, Video, VideoOff, Phone, Users, MessageSquare, ScreenShare, Settings } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

interface VideoConferenceProps {
  roomId?: string;
  courseId?: string;
  title?: string;
  isHost?: boolean;
}

const VideoConference: FC<VideoConferenceProps> = ({
  roomId = 'demo-room',
  courseId = 'ITCL201',
  title,
  isHost = false
}) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  // States for video controls
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [participantCount, setParticipantCount] = useState(5);
  const [messages, setMessages] = useState<{id: number, sender: string, text: string, time: string}[]>([
    {id: 1, sender: isArabic ? 'محمد أحمد' : 'John Smith', text: isArabic ? 'مرحباً بالجميع' : 'Hello everyone', time: '10:01'},
    {id: 2, sender: isArabic ? 'فاطمة خالد' : 'Emma Johnson', text: isArabic ? 'هل يمكنك مشاركة الشرائح؟' : 'Can you share the slides?', time: '10:02'},
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  
  // Refs for video elements
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
  // Simulate getting user media
  useEffect(() => {
    if (isVideoOn && localVideoRef.current) {
      // In a real implementation, this would be:
      // navigator.mediaDevices.getUserMedia({video: true, audio: isMicOn})
      //   .then(stream => {
      //     if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      //   })
      
      // For demo purposes, we'll just use a placeholder
      const timer = setTimeout(() => {
        if (localVideoRef.current) {
          localVideoRef.current.poster = "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop";
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isVideoOn, isMicOn]);
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: isArabic ? 'د. سارة الأحمد' : 'Dr. Sarah Johnson',
          text: newMessage,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }
      ]);
      setNewMessage('');
    }
  };
  
  // Handle key press in message input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col md:flex-row gap-4">
        {/* Main video area */}
        <div className={cn(
          "flex-1 relative bg-slate-900 rounded-lg overflow-hidden",
          showChat ? "md:w-2/3" : "w-full"
        )}>
          {/* Remote video (main view) */}
          <div className="w-full h-full min-h-[400px] flex items-center justify-center">
            {isScreenSharing ? (
              <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop" 
                  alt={isArabic ? "مشاركة الشاشة" : "Screen sharing"} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ) : (
              <video 
                ref={remoteVideoRef}
                poster="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                className="w-full h-full object-cover"
                autoPlay
                muted
                playsInline
              />
            )}
          </div>
          
          {/* Local video (picture-in-picture) */}
          <div className="absolute bottom-4 right-4 w-48 h-36 bg-slate-800 rounded-lg overflow-hidden shadow-lg border-2 border-slate-700">
            {isVideoOn ? (
              <video 
                ref={localVideoRef}
                className="w-full h-full object-cover"
                autoPlay
                muted
                playsInline
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-700">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-cloud text-white text-xl">
                    {isArabic ? 'س' : 'S'}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
            
            {!isMicOn && (
              <div className="absolute bottom-2 right-2 bg-red-500 rounded-full p-1">
                <MicOff size={16} className="text-white" />
              </div>
            )}
          </div>
          
          {/* Conference info overlay */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <Badge variant="outline" className="bg-slate-800/80 text-white border-slate-600 px-3 py-1">
              {title || (isArabic ? `محاضرة ${courseId}` : `${courseId} Lecture`)}
            </Badge>
            <Badge variant="outline" className="bg-slate-800/80 text-white border-slate-600 px-3 py-1">
              <Users size={14} className="mr-1" />
              {participantCount}
            </Badge>
          </div>
        </div>
        
        {/* Chat panel */}
        {showChat && (
          <div className="md:w-1/3 h-full bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col">
            <div className="p-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
              <h3 className="font-medium">
                {isArabic ? 'الدردشة' : 'Chat'}
              </h3>
            </div>
            
            <div className="flex-1 p-3 overflow-y-auto space-y-3">
              {messages.map(message => (
                <div key={message.id} className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{message.sender}</span>
                    <span className="text-xs text-slate-500">{message.time}</span>
                  </div>
                  <p className="text-sm mt-1 bg-slate-100 dark:bg-slate-700 p-2 rounded-lg inline-block">
                    {message.text}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="p-3 border-t border-slate-200 dark:border-slate-700 flex gap-2">
              <Input 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isArabic ? 'اكتب رسالة...' : 'Type a message...'}
                className="flex-1"
              />
              <Button size="sm" onClick={handleSendMessage}>
                {isArabic ? 'إرسال' : 'Send'}
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Controls */}
      <div className="mt-4 bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={isMicOn ? "default" : "destructive"}
            size="icon"
            onClick={() => setIsMicOn(!isMicOn)}
            className="rounded-full h-10 w-10"
          >
            {isMicOn ? <Mic /> : <MicOff />}
          </Button>
          
          <Button
            variant={isVideoOn ? "default" : "destructive"}
            size="icon"
            onClick={() => setIsVideoOn(!isVideoOn)}
            className="rounded-full h-10 w-10"
          >
            {isVideoOn ? <Video /> : <VideoOff />}
          </Button>
          
          <Button
            variant={isScreenSharing ? "secondary" : "outline"}
            size="icon"
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            className="rounded-full h-10 w-10"
          >
            <ScreenShare />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowChat(!showChat)}
            className={cn("rounded-full h-10 w-10", showChat && "bg-slate-100 dark:bg-slate-700")}
          >
            <MessageSquare />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10"
          >
            <Settings />
          </Button>
          
          <Button
            variant="destructive"
            size="icon"
            className="rounded-full h-10 w-10"
          >
            <Phone />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoConference;
