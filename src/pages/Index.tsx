import { type FC } from 'react';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialSection from '../components/TestimonialSection';
import CtaSection from '../components/CtaSection';

const Index: FC = () => {
  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-slate-50 dark:bg-slate-900">
      <div className="w-full">
        <HeroSection />
      </div>
      
      <main className="w-full flex-grow">
        <FeaturesSection />
        <TestimonialSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
