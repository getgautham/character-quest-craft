import React from 'react';
import StarField from '@/components/StarField';
import Hero from '@/components/Hero';
import GameFeatures from '@/components/GameFeatures';
import Tokenomics from '@/components/Tokenomics';
import Community from '@/components/Community';
import FloatingElements from '@/components/FloatingElements';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <StarField />
      <FloatingElements />
      <main>
        <Hero />
        <GameFeatures />
        <Tokenomics />
        <Community />
      </main>
    </div>
  );
};

export default Index;
