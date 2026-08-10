"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Более агрессивная анимация
  const rotateX = useTransform(scrollYProgress, [0, 0.6], [isMobile ? 12 : 25, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.8, 1]);
  const translateY = useTransform(scrollYProgress, [0, 0.6], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);

  return (
    <div ref={containerRef} className="w-full relative py-24 md:py-32" style={{ perspective: "1200px" }}>
      <motion.div
        style={{ y: translateY, opacity }}
        className="text-center px-6 mb-12"
      >
        {titleComponent}
      </motion.div>
      <motion.div
        style={{ 
          rotateX, 
          scale, 
          transformStyle: "preserve-3d",
          willChange: "transform"
        }}
        className="max-w-5xl mx-auto rounded-2xl border border-white/10 bg-[#141414] overflow-hidden shadow-2xl"
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
      </motion.div>
    </div>
  );
};
