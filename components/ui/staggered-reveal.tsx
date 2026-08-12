"use client";
import React, { useEffect, useRef, useState } from "react";

export function StaggeredReveal({
  children,
  delay = 100,
  className = "grid md:grid-cols-2 lg:grid-cols-4 gap-6",
}: {
  children: React.ReactNode[];
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, i) => (
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0px)" : "translateY(30px)",
            transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1) " + i * delay + "ms",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
