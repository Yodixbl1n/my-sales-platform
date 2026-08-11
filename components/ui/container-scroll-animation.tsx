"use client";
import React, { useEffect, useRef, useState } from "react";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full relative py-16 md:py-24">
      <div
        className="text-center px-6 mb-12"
        style={{
          opacity: visible ? 1 : 0.3,
          transform: visible ? "translateY(0px)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {titleComponent}
      </div>

      <div style={{ perspective: "1400px" }} className="px-6">
        <div
          className="max-w-5xl mx-auto rounded-2xl border border-white/10 bg-[#141414] overflow-hidden"
          style={{
            transform: visible
              ? "rotateX(0deg) scale(1) translateY(0px)"
              : "rotateX(18deg) scale(0.9) translateY(60px)",
            opacity: visible ? 1 : 0.4,
            transformStyle: "preserve-3d",
            transition: "all 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-[#0f0f0f]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-white/40 rounded-md bg-white/5 px-3 py-1 flex-1 text-left font-mono">
              np-sales.app/dashboard
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
