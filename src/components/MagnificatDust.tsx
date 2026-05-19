"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacityBase: number;
  color: string;
  seed: number;
};

const COLORS = ["#c8a96e", "#e8d5a3", "#8a7448"];
const MAX_PARTICLES = 80;
const MIN_PARTICLES = 20;
const PIXELS_PER_PARTICLE = 12000;

function subscribeReducedMotion(callback: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function spawn(width: number, height: number): Particle {
  return {
    x: rand(0, width),
    y: rand(0, height),
    vx: rand(-0.15, 0.15),
    vy: rand(-0.15, 0.15),
    size: rand(0.5, 2.5),
    opacityBase: rand(0.15, 0.55),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    seed: rand(0, Math.PI * 2),
  };
}

export function MagnificatDust() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false,
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    let visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = rect.width * rect.height;
      const target = Math.min(
        MAX_PARTICLES,
        Math.max(MIN_PARTICLES, Math.floor(area / PIXELS_PER_PARTICLE)),
      );
      if (particles.length !== target) {
        particles = Array.from({ length: target }, () =>
          spawn(rect.width, rect.height),
        );
      }
    };

    const draw = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.save();
      ctx.shadowColor = "#c8a96e";
      ctx.shadowBlur = 6;

      for (const p of particles) {
        if (!reduced && visible) {
          if (Math.random() < 0.05) {
            p.vx += rand(-0.05, 0.05);
            p.vy += rand(-0.05, 0.05);
            if (Math.abs(p.vx) > 0.2) p.vx = Math.sign(p.vx) * 0.2;
            if (Math.abs(p.vy) > 0.2) p.vy = Math.sign(p.vy) * 0.2;
          }
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = rect.width;
          else if (p.x > rect.width) p.x = 0;
          if (p.y < 0) p.y = rect.height;
          else if (p.y > rect.height) p.y = 0;
        }

        const pulse = reduced ? 1 : 0.6 + 0.4 * Math.sin(time / 600 + p.seed);
        const alpha = Math.max(0, Math.min(1, p.opacityBase * pulse));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      if (!reduced && visible) {
        raf = requestAnimationFrame(draw);
      }
    };

    resize();
    draw(typeof performance !== "undefined" ? performance.now() : 0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = visible;
        visible = entry.isIntersecting;
        if (!wasVisible && visible && !reduced) {
          raf = requestAnimationFrame(draw);
        }
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
