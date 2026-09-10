'use client';
import { useEffect } from 'react';

const STYLE = `
[data-tilt] { transform-style: preserve-3d; will-change: transform; }
[data-tilt]::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.13), transparent 60%);
  opacity: var(--go,0);
  pointer-events: none;
  transition: opacity 0.35s ease;
  z-index: 5;
}
`;

/**
 * TiltZone — навешивает 3D-tilt эффект на все элементы с data-tilt.
 * Карточки наклоняются за курсором + блик света скользит по поверхности.
 * На тач-устройствах отключён.
 */
export function TiltZone() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const cards = Array.from(document.querySelectorAll('[data-tilt]')) as HTMLElement[];
    const handlers = cards.map((c) => {
      if (!c.style.position) c.style.position = 'relative';
      const onMove = (e: MouseEvent) => {
        const r = c.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = (0.5 - py) * 10;
        const ry = (px - 0.5) * 10;
        c.style.transition = 'transform 0.08s ease-out';
        c.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale3d(1.02,1.02,1.02)`;
        c.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
        c.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
        c.style.setProperty('--go', '1');
      };
      const onLeave = () => {
        c.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1)';
        c.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        c.style.setProperty('--go', '0');
      };
      c.addEventListener('mousemove', onMove);
      c.addEventListener('mouseleave', onLeave);
      return { c, onMove, onLeave };
    });
    return () =>
      handlers.forEach(({ c, onMove, onLeave }) => {
        c.removeEventListener('mousemove', onMove);
        c.removeEventListener('mouseleave', onLeave);
      });
  }, []);
  return <style>{STYLE}</style>;
}
