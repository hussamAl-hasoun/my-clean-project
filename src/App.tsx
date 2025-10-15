import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// CHANGE: Switched to HashRouter for GitHub Pages compatibility
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/providers/theme-provider";
import { LanguageProvider } from "./components/providers/language-provider";
import { GamificationProvider } from "./components/providers/gamification-provider";
import PageTransition from "./components/PageTransition";
import Navbar from "./components/Navbar";
import './App.css'

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import About from "./pages/About";
import CoursesPage from "./pages/CoursesPage";
import Features from "./pages/Features";
import HelpCenter from "./pages/HelpCenter";

// New Analytics and Virtual Classroom Pages
import LearningDashboard from "./pages/analytics/LearningDashboard";
import VirtualClassroom from "./pages/virtual/VirtualClassroom";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import Assignments from "./pages/student/Assignments";
import Announcements from "./pages/student/Announcements";
import StudentCourses from "./pages/student/Courses";
import Grades from "./pages/student/Grades";
import StudentCalendar from "./pages/student/Calendar";
import StudentSettings from "./pages/student/Settings";
import Notifications from "./pages/student/Notifications";
import StudentMessages from "./pages/student/Messages";
import Gamification from "./pages/student/Gamification";

// Professor Pages
import ProfessorDashboard from "./pages/professor/ProfessorDashboard";
import ProfessorCourses from "./pages/professor/ProfessorCourses";
import ProfessorStudents from "./pages/professor/ProfessorStudents";
import ProfessorAssignments from "./pages/professor/ProfessorAssignments";
import ProfessorAnnouncements from "./pages/professor/ProfessorAnnouncements";
import ProfessorCalendar from "./pages/professor/ProfessorCalendar";
import ProfessorSettings from "./pages/professor/ProfessorSettings";
import ProfessorMessages from "./pages/professor/ProfessorMessages";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  // CHANGE: Switched to HashRouter
  <HashRouter>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider defaultLanguage="ar">
          <GamificationProvider>
            <TooltipProvider>
              <div className="w-full max-w-[100vw] min-h-screen overflow-x-hidden">
                <Navbar />
                <PageTransition>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/about-platform" element={<About />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/courses" element={<CoursesPage />} />
                    <Route path="/help" element={<HelpCenter />} />
                    
                    {/* New Analytics and Virtual Classroom Routes */}
                    <Route path="/analytics" element={<LearningDashboard />} />
                    <Route path="/virtual-classroom" element={<VirtualClassroom />} />
                    
                    {/* Student Routes */}
                    <Route path="/student" element={<StudentDashboard />} />
                    <Route path="/student/assignments" element={<Assignments />} />
                    <Route path="/student/announcements" element={<Announcements />} />
                    <Route path="/student/courses" element={<StudentCourses />} />
                    <Route path="/student/grades" element={<Grades />} />
                    <Route path="/student/calendar" element={<StudentCalendar />} />
                    <Route path="/student/settings" element={<StudentSettings />} />
                    <Route path="/student/notifications" element={<Notifications />} />
                    <Route path="/student/messages" element={<StudentMessages />} />
                    <Route path="/student/analytics" element={<LearningDashboard />} />
                    <Route path="/student/virtual-classroom" element={<VirtualClassroom />} />
                    <Route path="/student/gamification" element={<Gamification />} />
                    
                    {/* Professor Routes */}
                    <Route path="/professor" element={<ProfessorDashboard />} />
                    <Route path="/professor/courses" element={<ProfessorCourses />} />
                    <Route path="/professor/students" element={<ProfessorStudents />} />
                    <Route path="/professor/assignments" element={<ProfessorAssignments />} />
                    <Route path="/professor/announcements" element={<ProfessorAnnouncements />} />
                    <Route path="/professor/calendar" element={<ProfessorCalendar />} />
                    <Route path="/professor/settings" element={<ProfessorSettings />} />
                    <Route path="/professor/messages" element={<ProfessorMessages />} />
                    <Route path="/professor/analytics" element={<LearningDashboard />} />
                    <Route path="/professor/virtual-classroom" element={<VirtualClassroom />} />
                    
                    {/* 404 Route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </PageTransition>
                <Toaster />
                <Sonner />
              </div>
            </TooltipProvider>
          </GamificationProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HashRouter> // CHANGE: Switched to HashRouter
);

export default App;
