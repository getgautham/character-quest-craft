import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ziggySprite from '@/assets/ziggy-sprite.png';

interface GameState {
  score: number;
  distance: number;
  isGameOver: boolean;
  speed: number;
}

interface Character {
  y: number;
  isJumping: boolean;
  velocity: number;
}

interface Obstacle {
  x: number;
  width: number;
  height: number;
}

const GameHUD = () => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    distance: 0,
    isGameOver: false,
    speed: 3
  });

  const [character, setCharacter] = useState<Character>({
    y: 240, // ground level
    isJumping: false,
    velocity: 0
  });

  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<number>();

  // Handle jump input
  const jump = useCallback(() => {
    if (!character.isJumping && !gameState.isGameOver) {
      setCharacter(prev => ({
        ...prev,
        isJumping: true,
        velocity: -12 // jump force
      }));
    }
  }, [character.isJumping, gameState.isGameOver]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  // Game physics and collision detection
  useEffect(() => {
    if (!isPlaying || gameState.isGameOver) return;

    const gameLoop = () => {
      // Update character physics
      setCharacter(prev => {
        let newY = prev.y;
        let newVelocity = prev.velocity;
        let isJumping = prev.isJumping;

        if (isJumping) {
          newY += newVelocity;
          newVelocity += 0.8; // gravity

          // Ground collision
          if (newY >= 240) {
            newY = 240;
            isJumping = false;
            newVelocity = 0;
          }
        }

        return { ...prev, y: newY, velocity: newVelocity, isJumping };
      });

      // Update obstacles
      setObstacles(prev => {
        const updated = prev.map(obs => ({ ...obs, x: obs.x - gameState.speed }))
          .filter(obs => obs.x + obs.width > 0);

        // Add new obstacles
        if (updated.length === 0 || updated[updated.length - 1].x < 600) {
          updated.push({
            x: 800,
            width: 30,
            height: 60
          });
        }

        return updated;
      });

      // Update score and speed
      setGameState(prev => ({
        ...prev,
        distance: prev.distance + 1,
        score: Math.floor(prev.distance / 10),
        speed: Math.min(8, 3 + prev.distance / 1000)
      }));

      // Check collisions
      const characterRect = { x: 100, y: character.y, width: 40, height: 40 };
      
      obstacles.forEach(obstacle => {
        const obstacleRect = { x: obstacle.x, y: 300 - obstacle.height, width: obstacle.width, height: obstacle.height };
        
        if (characterRect.x < obstacleRect.x + obstacleRect.width &&
            characterRect.x + characterRect.width > obstacleRect.x &&
            characterRect.y < obstacleRect.y + obstacleRect.height &&
            characterRect.y + characterRect.height > obstacleRect.y) {
          setGameState(prev => ({ ...prev, isGameOver: true }));
        }
      });
    };

    gameLoopRef.current = requestAnimationFrame(function loop() {
      gameLoop();
      if (isPlaying && !gameState.isGameOver) {
        gameLoopRef.current = requestAnimationFrame(loop);
      }
    });

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [isPlaying, gameState.isGameOver, gameState.speed, character.y, obstacles]);

  const resetGame = () => {
    setGameState({
      score: 0,
      distance: 0,
      isGameOver: false,
      speed: 3
    });
    setCharacter({
      y: 240,
      isJumping: false,
      velocity: 0
    });
    setObstacles([]);
  };

  const startGame = () => {
    if (gameState.isGameOver) {
      resetGame();
    }
    setIsPlaying(true);
  };

  const pauseGame = () => {
    setIsPlaying(false);
  };

  return (
    <div className="game-screen p-4 crt-effect">
      {/* Game HUD */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2 border-white bg-background">
          <CardContent className="p-3 text-center">
            <div className="text-xs text-game-pink pixel-text-outline">SCORE</div>
            <div className="text-2xl font-bold text-game-yellow pixel-text-glow">{gameState.score}</div>
          </CardContent>
        </Card>

        <Card className="border-2 border-white bg-background">
          <CardContent className="p-3 text-center">
            <div className="text-xs text-game-blue pixel-text-outline">DISTANCE</div>
            <div className="text-2xl font-bold text-game-pink pixel-text-glow">{Math.floor(gameState.distance / 10)}m</div>
          </CardContent>
        </Card>

        <Card className="border-2 border-white bg-background">
          <CardContent className="p-3 text-center">
            <div className="text-xs text-game-purple pixel-text-outline">SPEED</div>
            <div className="text-2xl font-bold text-game-cyan pixel-text-glow">{gameState.speed.toFixed(1)}x</div>
          </CardContent>
        </Card>
      </div>

      {/* Game Area */}
      <Card className="border-4 border-white bg-gradient-to-b from-blue-900 to-purple-900 relative overflow-hidden">
        <CardContent className="p-0">
          <div 
            ref={gameAreaRef}
            className="relative w-full h-80 scrolling-bg overflow-hidden"
            style={{
              background: `linear-gradient(180deg, #87CEEB 0%, #98FB98 60%, #8FBC8F 100%)`
            }}
          >
            {/* Ground */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-600 to-green-500"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(0,0,0,0.1) 20px)`
              }}
            />

            {/* Ziggy Character */}
            <div
              className="absolute transition-none"
              style={{ 
                left: '100px', 
                top: `${character.y}px`,
                filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.8))',
                transform: character.isJumping ? 'rotate(-10deg)' : 'rotate(0deg)',
                transition: 'transform 0.1s ease'
              }}
            >
              <img 
                src={ziggySprite} 
                alt="Ziggy" 
                className="w-10 h-10 pixel-perfect"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>

            {/* Obstacles (Cacti) */}
            {obstacles.map((obstacle, index) => (
              <div
                key={index}
                className="absolute text-4xl"
                style={{
                  left: `${obstacle.x}px`,
                  top: `${300 - obstacle.height}px`,
                  filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.8))'
                }}
              >
                🌵
              </div>
            ))}

            {/* Game Over Overlay */}
            {gameState.isGameOver && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                <div className="text-center">
                  <div className="text-3xl mb-4 pixel-text-glow text-game-pink">GAME OVER</div>
                  <div className="text-lg mb-2 pixel-text-outline">Final Score: {gameState.score}</div>
                  <div className="text-sm pixel-text-outline">Distance: {Math.floor(gameState.distance / 10)}m</div>
                </div>
              </div>
            )}

            {/* Start Game Overlay */}
            {!isPlaying && !gameState.isGameOver && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-center">
                  <div className="text-2xl mb-4 pixel-text-glow blink">ZIGGY RUNNER</div>
                  <div className="text-xs pixel-text-outline">PRESS SPACE OR ↑ TO JUMP</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Game Controls */}
      <div className="mt-4 flex justify-center gap-4">
        {!isPlaying || gameState.isGameOver ? (
          <button 
            onClick={startGame}
            className="pixel-button-primary px-8 py-2 text-sm"
          >
            {gameState.isGameOver ? 'PLAY AGAIN' : 'START GAME'}
          </button>
        ) : (
          <button 
            onClick={pauseGame}
            className="pixel-button-secondary px-8 py-2 text-sm"
          >
            PAUSE
          </button>
        )}
        
        <button 
          onClick={() => window.open('https://ziggyandzoop.com', '_blank')}
          className="pixel-button px-6 py-2 text-sm"
        >
          🛍️ SHOP
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-4 text-center">
        <div className="text-sm pixel-text-outline">Help Ziggy avoid the cacti! 🌵</div>
        <div className="text-xs text-game-purple">Press SPACE or ↑ to jump • Get merch with code: LAUNCH10</div>
      </div>
    </div>
  );
};

export default GameHUD;