import React from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { HeroSection } from './HeroSection';
import { IndustriesSection } from './IndustriesSection';
import { ServicesSection } from './ServicesSection';
import { HowItWorksSection } from './HowItWorksSection';
import { FAQSection } from './FAQSection';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <IndustriesSection />
        <ServicesSection />
        <HowItWorksSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};
