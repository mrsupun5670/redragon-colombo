import React, { useEffect, useRef } from 'react';

const ParticleEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 25;

    // Red color variations
    const colors = [
      'rgba(239, 68, 68, 0.6)',   // red-500
      'rgba(220, 38, 38, 0.6)',   // red-600
      'rgba(248, 113, 113, 0.6)', // red-400
      'rgba(252, 165, 165, 0.5)', // red-300
      'rgba(254, 202, 202, 0.4)', // red-200
    ];

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.fadeDelay = Math.random() * 600;
        this.fadeStart = Date.now() + this.fadeDelay;
        this.fadingOut = false;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.speed = 1 + Math.random() * 2;
        this.radius = 2 + Math.random() * 3;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = 0;
        this.fadeSpeed = 0.02;
        this.swaySpeed = 0.5 + Math.random() * 1;
        this.swayAmount = 20 + Math.random() * 30;
        this.angle = Math.random() * Math.PI * 2;
        this.fadeDelay = Math.random() * 600;
        this.fadeStart = Date.now() + this.fadeDelay;
        this.fadingOut = false;
      }

      update() {
        const now = Date.now();

        // Fade in effect
        if (now > this.fadeStart && this.opacity < 1 && !this.fadingOut) {
          this.opacity += this.fadeSpeed;
        }

        // Sway effect
        this.angle += 0.01 * this.swaySpeed;
        this.x += Math.sin(this.angle) * 0.5;
        this.y += this.speed;

        // Start fading out near bottom
        if (this.y > canvas.height - 100) {
          this.fadingOut = true;
          this.opacity -= this.fadeSpeed * 2;
        }

        // Reset when off screen
        if (this.y > canvas.height + 10 || this.opacity <= 0) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        const colorWithOpacity = this.color.replace(/[\d.]+\)$/, `${this.opacity})`);
        ctx.fillStyle = colorWithOpacity;
        ctx.fill();

        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default ParticleEffect;
