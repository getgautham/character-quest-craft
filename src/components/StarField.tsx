import React, { useEffect, useRef } from 'react';

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const stars: { x: number; y: number; opacity: number; speed: number }[] = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      stars.length = 0;
      for (let i = 0; i < 100; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          opacity: Math.random(),
          speed: Math.random() * 0.02 + 0.01,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach((star) => {
        star.opacity += star.speed;
        if (star.opacity > 1) {
          star.opacity = 0;
          star.speed = Math.random() * 0.02 + 0.01;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fillRect(star.x, star.y, 2, 2);
      });

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    createStars();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createStars();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
    />
  );
};

export default StarField;