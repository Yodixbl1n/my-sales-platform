"use client";
import React, { useEffect, useRef } from "react";

export default function ConstellationGrid({
  density = 8000,
  linkDistance = 130,
  cursorDistance = 180,
  color = "217, 242, 79",
  speed = 0.35,
  className = "",
}: {
  density?: number;
  linkDistance?: number;
  cursorDistance?: number;
  color?: string;
  speed?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const mouse = { x: -9999, y: -9999, vx: 0, vy: 0, active: false };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(40, Math.floor((w * h) / density));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
      }));
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = e.clientX - rect.left;
      const ny = e.clientY - rect.top;
      if (mouse.active) {
        mouse.vx = nx - mouse.x;
        mouse.vy = ny - mouse.y;
      }
      mouse.x = nx;
      mouse.y = ny;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      const ms = Math.hypot(mouse.vx, mouse.vy);

      for (const p of particles) {
        if (mouse.active) {
          const dxm = p.x - mouse.x;
          const dym = p.y - mouse.y;
          const dm = Math.hypot(dxm, dym) || 1;
          if (dm < cursorDistance && ms > 1.5) {
            const force = ((cursorDistance - dm) / cursorDistance) * Math.min(ms, 50) * 0.045;
            p.vx += (dxm / dm) * force;
            p.vy += (dym / dm) * force;
          }
        }
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vx += (Math.random() - 0.5) * 0.015;
        p.vy += (Math.random() - 0.5) * 0.015;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -30) p.x = w + 30;
        if (p.x > w + 30) p.x = -30;
        if (p.y < -30) p.y = h + 30;
        if (p.y > h + 30) p.y = -30;
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < linkDistance) {
            ctx.strokeStyle = "rgba(" + color + ", " + (1 - d / linkDistance) * 0.28 + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        if (mouse.active) {
          const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (d < cursorDistance) {
            ctx.strokeStyle = "rgba(" + color + ", " + (1 - d / cursorDistance) * 0.5 + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(" + color + ", 0.7)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      mouse.vx *= 0.85;
      mouse.vy *= 0.85;
      raf = requestAnimationFrame(step);
    };

    resize();
    step();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [density, linkDistance, cursorDistance, color, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={"pointer-events-none absolute inset-0 h-full w-full " + className}
    />
  );
}
