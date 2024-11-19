import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import FeatureSection from '../components/FeatureSection';
import WhySection from '../components/WhySection';
import AIFeatureSection from '../components/AIFeatureSection';
import TrialSection from '../components/TrialSection';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Hero />
      <FeatureSection />
      <WhySection />
      <AIFeatureSection />
      <TrialSection />
      <Footer />
    </div>
  );
}