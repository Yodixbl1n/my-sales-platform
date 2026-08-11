"use client";
import React, { useEffect, useRef, useState } from "react";

export interface MagicTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export const MagicText: React.FC<MagicTextProps> = ({ text, className, speed = 0.03 }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className={className || ""}
      style={{
        display: "flex",
        flexWrap: "wrap",
        columnGap: "0.45rem",
        rowGap: "0.35rem",
        fontSize: "clamp(17px, 2.6vw, 24px)",
        lineHeight: 1.5,
        fontWeight: 500,
        letterSpacing: "-0.01em",
        color: "#ffffff",
        justifyContent: "center",
        textAlign: "center",
        maxWidth: "760px",
        margin: "0 auto",
      }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: visible ? 1 : 0.12,
            filter: visible ? "blur(0px)" : "blur(6px)",
            transform: visible ? "translateY(0px)" : "translateY(6px)",
            transition:
              "all 0.45s cubic-bezier(0.22, 1, 0.36, 1) " + Math.round(i * speed * 1000) + "ms",
          }}
        >
          {word}
        </span>
      ))}
    </p>
  );
};
