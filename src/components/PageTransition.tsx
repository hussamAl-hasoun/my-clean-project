import React from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  // We keep the location key for potential future use but remove all animations
  const location = useLocation();
  
  return (
    <div key={location.pathname} className="min-h-screen w-full">
      {children}
    </div>
  );
};

export default PageTransition;
