'use client';
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LIME = '#d9f24f';

interface MarqueeProps {
  text: string;
  speed?: number;
  direction?: "left" | "right";
  fontSize?: string;
  gap?: string;
  color?: string;
  className?: string;
  separator?: string;
  opacity?: number;
}

export function Marquee({
  text,
  speed = 30,
  direction = "left",
  fontSize = "text-2xl",
  gap = "gap-8",
  color = LIME,
  className,
  separator = "✦",
  opacity = 1,
}: MarqueeProps) {
  const items = Array(8).fill(text);
  
  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)} style={{ opacity }}>
      <motion.div
        className={cn("flex flex-nowrap", gap, "w-max")}
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {[...items, ...items].map((item, idx) => (
          <span
            key={idx}
            className={cn("font-black tracking-tight flex items-center", gap)}
            style={{ color }}
          >
            <span className={fontSize}>{item}</span>
            <span style={{ color: LIME, opacity: 0.6 }}>{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
