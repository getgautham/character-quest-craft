import React, { useState, useEffect } from 'react';

const PixelBackground = () => {
  const [pixels, setPixels] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    speed: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const colors = [
      'hsl(var(--game-pink))',
      'hsl(var(--game-blue))',
      'hsl(var(--game-purple))',
      'hsl(var(--game-yellow))',
      'hsl(var(--game-green))'
    ];

    const newPixels = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.3 + 0.1
    }));

    setPixels(newPixels);

    const animatePixels = () => {
      setPixels(prev => prev.map(pixel => ({
        ...pixel,
        y: pixel.y <= -5 ? 105 : pixel.y - pixel.speed,
        opacity: Math.sin(Date.now() * 0.001 + pixel.id) * 0.2 + 0.3
      })));
    };

    const interval = setInterval(animatePixels, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      {/* Base gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)
          `
        }}
      />

      {/* Animated pixels */}
      {pixels.map(pixel => (
        <div
          key={pixel.id}
          className="absolute transition-opacity duration-1000"
          style={{
            left: `${pixel.x}%`,
            top: `${pixel.y}%`,
            width: `${pixel.size}px`,
            height: `${pixel.size}px`,
            backgroundColor: pixel.color,
            opacity: pixel.opacity,
            imageRendering: 'pixelated'
          }}
        />
      ))}

      {/* Grid overlay for pixel effect */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Scanlines for CRT effect */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent 0px,
            transparent 2px,
            rgba(255, 255, 255, 0.1) 2px,
            rgba(255, 255, 255, 0.1) 4px
          )`
        }}
      />
    </div>
  );
};

export default PixelBackground;