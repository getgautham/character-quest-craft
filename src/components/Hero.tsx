import React from 'react';
import { Button } from '@/components/ui/button';
import characterBlue from '@/assets/character-blue.png';
import characterPink from '@/assets/character-pink.png';
import characterYellow from '@/assets/character-yellow.png';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-6xl mx-auto">
        {/* Main Title */}
        <div className="mb-8">
          <h1 className="font-pixel text-4xl md:text-6xl lg:text-8xl gradient-text mb-4 animate-pulse">
            ZIGGY & ZOOP
          </h1>
          <p className="font-orbitron text-xl md:text-2xl text-secondary mb-8">
            The Ultimate Gaming Universe Adventure
          </p>
        </div>

        {/* Characters */}
        <div className="flex justify-center items-center gap-8 md:gap-16 mb-12">
          <div className="float-animation">
            <img 
              src={characterBlue} 
              alt="Blue Gaming Character" 
              className="w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 drop-shadow-lg hover:scale-110 transition-transform cursor-pointer"
              style={{ animationDelay: '0s' }}
            />
          </div>
          <div className="float-animation">
            <img 
              src={characterYellow} 
              alt="Yellow Gaming Character" 
              className="w-32 h-32 md:w-40 md:h-40 lg:w-64 lg:h-64 drop-shadow-xl hover:scale-110 transition-transform cursor-pointer"
              style={{ animationDelay: '0.5s' }}
            />
          </div>
          <div className="float-animation">
            <img 
              src={characterPink} 
              alt="Pink Gaming Character" 
              className="w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 drop-shadow-lg hover:scale-110 transition-transform cursor-pointer"
              style={{ animationDelay: '1s' }}
            />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
          <Button variant="gaming" size="lg" className="font-pixel text-sm md:text-base px-8 py-4">
            ENTER GAME
          </Button>
          <Button variant="gaming-secondary" size="lg" className="font-pixel text-sm md:text-base px-8 py-4">
            JOIN COMMUNITY
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
          <div className="game-card text-center">
            <div className="font-pixel text-lg md:text-xl text-game-pink">1M+</div>
            <div className="font-orbitron text-sm text-muted-foreground">Players</div>
          </div>
          <div className="game-card text-center">
            <div className="font-pixel text-lg md:text-xl text-game-blue">500K+</div>
            <div className="font-orbitron text-sm text-muted-foreground">NFTs</div>
          </div>
          <div className="game-card text-center">
            <div className="font-pixel text-lg md:text-xl text-game-purple">$10M+</div>
            <div className="font-orbitron text-sm text-muted-foreground">Volume</div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-8 h-8 bg-game-pink rounded-full pulse-glow"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-game-blue rounded-full pulse-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-10 h-10 bg-game-purple rounded-full pulse-glow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-10 w-4 h-4 bg-game-yellow rounded-full pulse-glow" style={{ animationDelay: '1.5s' }}></div>
      </div>
    </section>
  );
};

export default Hero;