import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface MenuItem {
  id: string;
  label: string;
  action: () => void;
  enabled: boolean;
}

interface GameMenuProps {
  onStartGame: () => void;
  onSelectCharacter: () => void;
  onViewLeaderboard: () => void;
  onSettings: () => void;
}

const GameMenu: React.FC<GameMenuProps> = ({
  onStartGame,
  onSelectCharacter,
  onViewLeaderboard,
  onSettings
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const menuItems: MenuItem[] = [
    { id: 'start', label: 'START GAME', action: onStartGame, enabled: true },
    { id: 'character', label: 'CHARACTER SELECT', action: onSelectCharacter, enabled: true },
    { id: 'merch', label: '🛍️ MERCH STORE', action: () => window.open('https://ziggyandzoop.com', '_blank'), enabled: true },
    { id: 'leaderboard', label: 'LEADERBOARD', action: onViewLeaderboard, enabled: true },
    { id: 'settings', label: 'SETTINGS', action: onSettings, enabled: true },
    { id: 'quit', label: 'QUIT GAME', action: () => {}, enabled: true }
  ];

  const handleMenuSelect = (index: number) => {
    if (!menuItems[index].enabled) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      menuItems[index].action();
      setIsAnimating(false);
    }, 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        setSelectedIndex(prev => Math.max(0, prev - 1));
        break;
      case 'ArrowDown':
        setSelectedIndex(prev => Math.min(menuItems.length - 1, prev + 1));
        break;
      case 'Enter':
      case ' ':
        handleMenuSelect(selectedIndex);
        break;
    }
  };

  return (
    <div 
      className="game-screen p-8 crt-effect min-h-screen flex flex-col justify-center"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Game Logo */}
      <div className="text-center mb-12">
        <div className="text-6xl md:text-8xl pixel-text-glow mb-4 pixel-bounce">
          ZIGGY & ZOOP
        </div>
        <div className="text-lg pixel-text-outline text-game-purple">
          PIXEL ADVENTURE QUEST
        </div>
        <div className="text-xs text-game-yellow mt-2 blink">
          PRESS START TO BEGIN
        </div>
      </div>

      {/* Main Menu */}
      <Card className="border-4 border-white bg-background/90 max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="space-y-4">
            {menuItems.map((item, index) => (
              <div
                key={item.id}
                className={`
                  relative cursor-pointer transition-all duration-100
                  ${selectedIndex === index ? 'pixel-button-primary' : 'pixel-button'}
                  ${!item.enabled ? 'opacity-50 cursor-not-allowed' : ''}
                  ${selectedIndex === index && isAnimating ? 'pixel-flash' : ''}
                  p-3 text-center
                `}
                onClick={() => handleMenuSelect(index)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                {selectedIndex === index && (
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-game-pink">
                    ▶
                  </div>
                )}
                <span className="pixel-text-outline">{item.label}</span>
                {selectedIndex === index && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-game-pink">
                    ◀
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Controls hint */}
          <div className="text-center mt-6 text-xs text-game-purple">
            <div className="pixel-text-outline">USE ↑↓ TO NAVIGATE</div>
            <div className="pixel-text-outline">PRESS ENTER TO SELECT</div>
          </div>
        </CardContent>
      </Card>

      {/* Promo Banner */}
      <div className="max-w-md mx-auto mt-8 mb-4">
        <Card className="border-4 border-game-pink bg-gradient-to-r from-game-purple/20 to-game-pink/20 overflow-hidden">
          <CardContent className="p-4 text-center relative">
            <div className="text-game-pink text-sm font-bold pixel-text-glow mb-1">🎉 MERCH LAUNCH SPECIAL! 🎉</div>
            <div className="text-xs pixel-text-outline mb-2">Get 10% off at ziggyandzoop.com</div>
            <div className="bg-game-yellow text-black px-3 py-1 rounded text-xs font-bold mx-auto inline-block">
              CODE: LAUNCH10
            </div>
            <div className="absolute top-1 right-1 text-xs blink">✨</div>
          </CardContent>
        </Card>
      </div>

      {/* Game Stats Preview */}
      <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-8">
        <Card className="border-2 border-white bg-background/80">
          <CardContent className="p-3 text-center">
            <div className="text-game-pink text-xl font-bold">247</div>
            <div className="text-xs pixel-text-outline">HIGH SCORE</div>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-white bg-background/80">
          <CardContent className="p-3 text-center">
            <div className="text-game-blue text-xl font-bold">12</div>
            <div className="text-xs pixel-text-outline">LEVEL</div>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-white bg-background/80">
          <CardContent className="p-3 text-center">
            <div className="text-game-yellow text-xl font-bold">3.5K</div>
            <div className="text-xs pixel-text-outline">COINS</div>
          </CardContent>
        </Card>
      </div>

      {/* Version Info */}
      <div className="text-center mt-8 text-xs text-gray-500">
        <div>ZIGGY & ZOOP v2.1.0</div>
        <div>© 2024 PIXEL STUDIOS</div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 text-2xl pixel-bounce">⭐</div>
      <div className="absolute top-20 right-20 text-2xl pixel-bounce" style={{ animationDelay: '0.5s' }}>💎</div>
      <div className="absolute bottom-20 left-20 text-2xl pixel-bounce" style={{ animationDelay: '1s' }}>🔮</div>
      <div className="absolute bottom-10 right-10 text-2xl pixel-bounce" style={{ animationDelay: '1.5s' }}>⚡</div>
    </div>
  );
};

export default GameMenu;