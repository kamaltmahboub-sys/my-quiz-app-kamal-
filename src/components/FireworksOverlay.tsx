import React, { useEffect, useRef } from 'react';

interface FireworksOverlayProps {
  active: boolean;
  replayKey?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  size: number;
  trail: Array<{ x: number; y: number }>;
}

interface Rocket {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetY: number;
  color: string;
}

const PALETTE = [
  '#10B981', // Emerald
  '#14B8A6', // Teal
  '#F59E0B', // Amber / Gold
  '#FBBF24', // Bright Yellow
  '#38BDF8', // Sky Blue
  '#FB7185', // Rose
  '#A78BFA', // Violet
  '#FFFFFF', // White Sparkle
];

export const FireworksOverlay: React.FC<FireworksOverlayProps> = ({ active, replayKey = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const rockets: Rocket[] = [];
    const particles: Particle[] = [];

    const spawnBurst = (cx: number, cy: number, baseColor?: string) => {
      const count = 48 + Math.floor(Math.random() * 24);
      const colorA = baseColor || PALETTE[Math.floor(Math.random() * PALETTE.length)];
      const colorB = PALETTE[Math.floor(Math.random() * PALETTE.length)];

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.22;
        const speed = 1.8 + Math.random() * 5.2;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: 0.011 + Math.random() * 0.012,
          color: i % 3 === 0 ? colorB : colorA,
          size: 1.8 + Math.random() * 2.1,
          trail: [],
        });
      }
    };

    const launchRocket = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const startX = w * (0.15 + Math.random() * 0.7);
      const targetY = h * (0.14 + Math.random() * 0.34);
      rockets.push({
        x: startX,
        y: h + 10,
        vx: (Math.random() - 0.5) * 2.2,
        vy: -(8.5 + Math.random() * 3.5),
        targetY,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      });
    };

    // Immediate opening salvo so celebration starts right away
    spawnBurst(window.innerWidth * 0.28, window.innerHeight * 0.28, '#FBBF24');
    spawnBurst(window.innerWidth * 0.72, window.innerHeight * 0.25, '#10B981');
    launchRocket();

    const startTime = performance.now();
    const launchDurationMs = 5200;
    let lastLaunch = startTime;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (elapsed < launchDurationMs && now - lastLaunch > 380) {
        launchRocket();
        if (Math.random() > 0.45) {
          launchRocket();
        }
        lastLaunch = now;
      }

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.11;

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = r.color;
        ctx.fill();
        ctx.restore();

        if (r.y <= r.targetY || r.vy >= -0.8) {
          spawnBurst(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Update explosion particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 5) p.trail.shift();

        p.vx *= 0.975;
        p.vy = p.vy * 0.975 + 0.065;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0.02) {
          particles.splice(i, 1);
          continue;
        }

        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let k = 1; k < p.trail.length; k++) {
            ctx.lineTo(p.trail[k].x, p.trail[k].y);
          }
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.alpha * 0.45);
          ctx.lineWidth = Math.max(1, p.size * 0.7);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (elapsed < launchDurationMs || rockets.length > 0 || particles.length > 0) {
        animId = window.requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    animId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [active, replayKey]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
};
