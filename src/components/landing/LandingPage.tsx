import React, { useState, useEffect } from 'react';
import { LandingHeader } from './LandingHeader';
import { LandingHero } from './LandingHero';
import { ProblemSection, RAGWorkflowSection, FeaturesSection, UseCasesSection, LandingFooter } from './LandingSections';

interface LandingPageProps {
  onLaunchApp: () => void;
  onAskQuestion: (question: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchApp }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0F1D] bg-striped-lines text-slate-100 font-sans selection:bg-blue-600 selection:text-white antialiased overflow-x-hidden relative">
      {/* Background radial glow & vibrant blue accent gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-[#237bf6]/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-[#11348c]/20 rounded-full blur-[200px]" />
      </div>

      <LandingHeader scrolled={scrolled} onLaunchApp={onLaunchApp} />
      <LandingHero onLaunchApp={onLaunchApp} />
      <ProblemSection />
      <RAGWorkflowSection />
      <FeaturesSection />
      <UseCasesSection />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
