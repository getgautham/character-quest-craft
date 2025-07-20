import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GameState {
  health: number;
  mana: number;
  score: number;
  level: number;
  exp: number;
  coins: number;
}

interface Character {
  id: string;
  name: string;
  x: number;
  y: number;
  sprite: string;
  color: string;
}

const GameHUD = () => {
  const [gameState, setGameState] = useState<GameState>({
    health: 100,
    mana: 80,
    score: 12450,
    level: 7,
    exp: 65,
    coins: 2847
  });

  const [character, setCharacter] = useState<Character>({
    id: 'ziggy',
    name: 'ZIGGY',
    x: 50,
    y: 50,
    sprite: '🐱',
    color: 'game-blue'
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const [keys, setKeys] = useState<Set<string>>(new Set());

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys(prev => new Set(prev).add(e.key.toLowerCase()));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys(prev => {
        const newKeys = new Set(prev);
        newKeys.delete(e.key.toLowerCase());
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Character movement
  useEffect(() => {
    if (!isPlaying) return;

    const moveCharacter = () => {
      setCharacter(prev => {
        let newX = prev.x;
        let newY = prev.y;
        const speed = 2;

        if (keys.has('arrowleft') || keys.has('a')) newX = Math.max(0, newX - speed);
        if (keys.has('arrowright') || keys.has('d')) newX = Math.min(92, newX + speed);
        if (keys.has('arrowup') || keys.has('w')) newY = Math.max(0, newY - speed);
        if (keys.has('arrowdown') || keys.has('s')) newY = Math.min(88, newY + speed);

        return { ...prev, x: newX, y: newY };
      });
    };

    const gameLoop = setInterval(moveCharacter, 16); // 60fps
    return () => clearInterval(gameLoop);
  }, [keys, isPlaying]);

  // Simulate game events
  useEffect(() => {
    if (!isPlaying) return;

    const gameEvents = setInterval(() => {
      // Random events
      if (Math.random() < 0.1) {
        setGameState(prev => ({
          ...prev,
          score: prev.score + Math.floor(Math.random() * 100) + 10,
          coins: prev.coins + Math.floor(Math.random() * 5) + 1
        }));
      }

      if (Math.random() < 0.05) {
        setGameState(prev => ({
          ...prev,
          exp: Math.min(100, prev.exp + 1)
        }));
      }

      if (Math.random() < 0.02) {
        setGameState(prev => ({
          ...prev,
          mana: Math.max(0, prev.mana - 5)
        }));
      }
    }, 500);

    return () => clearInterval(gameEvents);
  }, [isPlaying]);

  const startGame = () => {
    setIsPlaying(true);
  };

  const pauseGame = () => {
    setIsPlaying(false);
  };

  return (
    <div className="game-screen p-4 crt-effect">
      {/* Game HUD */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-white bg-background">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-game-pink pixel-text-outline">HEALTH</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="health-bar">
              <div 
                className="health-bar-fill" 
                style={{ width: `${gameState.health}%` }}
              />
            </div>
            <div className="text-xs mt-1">{gameState.health}/100</div>
          </CardContent>
        </Card>

        <Card className="border-2 border-white bg-background">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-game-blue pixel-text-outline">MANA</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="mana-bar">
              <div 
                className="mana-bar-fill" 
                style={{ width: `${gameState.mana}%` }}
              />
            </div>
            <div className="text-xs mt-1">{gameState.mana}/100</div>
          </CardContent>
        </Card>

        <Card className="border-2 border-white bg-background">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-game-yellow pixel-text-outline">LEVEL {gameState.level}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="health-bar">
              <div 
                className="health-bar-fill"
                style={{ 
                  width: `${gameState.exp}%`,
                  backgroundColor: 'hsl(var(--exp-bar))'
                }}
              />
            </div>
            <div className="text-xs mt-1">EXP: {gameState.exp}/100</div>
          </CardContent>
        </Card>

        <Card className="border-2 border-white bg-background">
          <CardContent className="p-2">
            <div className="text-xs text-game-purple pixel-text-outline">SCORE</div>
            <div className="text-sm font-bold text-game-pink">{gameState.score.toLocaleString()}</div>
            <div className="text-xs text-game-yellow">💰 {gameState.coins}</div>
          </CardContent>
        </Card>
      </div>

      {/* Game Area */}
      <Card className="border-4 border-white bg-gradient-to-b from-blue-900 to-purple-900 relative overflow-hidden">
        <CardContent className="p-0">
          <div 
            ref={gameAreaRef}
            className="relative w-full h-96 scrolling-bg"
            style={{
              background: `
                radial-gradient(circle at 20% 30%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
                linear-gradient(45deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)
              `
            }}
          >
            {/* Character */}
            <div
              className="absolute pixel-character text-4xl transition-all duration-75 pixel-bounce"
              style={{ 
                left: `${character.x}%`, 
                top: `${character.y}%`,
                filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.8))'
              }}
            >
              {character.sprite}
            </div>

            {/* Collectibles */}
            <div className="absolute top-4 left-4 text-2xl pixel-bounce">💎</div>
            <div className="absolute top-8 right-8 text-2xl pixel-bounce" style={{ animationDelay: '0.3s' }}>⭐</div>
            <div className="absolute bottom-8 left-12 text-2xl pixel-bounce" style={{ animationDelay: '0.6s' }}>🔮</div>
            <div className="absolute bottom-4 right-4 text-2xl pixel-bounce" style={{ animationDelay: '0.9s' }}>💰</div>

            {/* Grid overlay for pixel effect */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            />

            {/* Controls hint */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-center">
                  <div className="text-2xl mb-4 pixel-text-glow blink">PRESS START</div>
                  <div className="text-xs pixel-text-outline">USE WASD OR ARROW KEYS TO MOVE</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Game Controls */}
      <div className="mt-4 flex justify-center gap-4">
        {!isPlaying ? (
          <button 
            onClick={startGame}
            className="pixel-button-primary px-8 py-2 text-sm"
          >
            START GAME
          </button>
        ) : (
          <button 
            onClick={pauseGame}
            className="pixel-button-secondary px-8 py-2 text-sm"
          >
            PAUSE
          </button>
        )}
        
        <button className="pixel-button px-8 py-2 text-sm">
          SETTINGS
        </button>
      </div>

      {/* Character Info */}
      <div className="mt-4 text-center">
        <div className="text-sm pixel-text-outline">CONTROLLING: {character.name}</div>
        <div className="text-xs text-game-purple">Position: ({Math.floor(character.x)}, {Math.floor(character.y)})</div>
      </div>
    </div>
  );
};

export default GameHUD;