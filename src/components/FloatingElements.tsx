import React from 'react';

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
      {/* Geometric shapes floating around */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-game-pink/30 rotate-45 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-game-blue/30 rounded-full float-animation"></div>
      <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-game-purple/30 rotate-45 animate-bounce"></div>
      <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-game-yellow/40 rounded-full pulse-glow"></div>
      <div className="absolute top-1/2 left-1/6 w-8 h-1 bg-game-green/30 animate-pulse"></div>
      <div className="absolute top-2/3 right-1/6 w-1 h-8 bg-game-pink/30 animate-pulse"></div>
      
      {/* Larger floating elements */}
      <div className="absolute top-20 right-20 w-16 h-16 border-2 border-game-blue/20 rounded-full float-animation" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 border-2 border-game-purple/20 rotate-45" style={{ animation: 'float 4s ease-in-out infinite' }}></div>
      
      {/* Particle effects */}
      <div className="absolute top-40 left-1/2 w-2 h-2 bg-game-yellow rounded-full animate-ping"></div>
      <div className="absolute bottom-40 right-1/2 w-2 h-2 bg-game-pink rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default FloatingElements;