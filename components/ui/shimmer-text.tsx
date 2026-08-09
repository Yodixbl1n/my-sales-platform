'use client';
import React from "react";
import { cn } from "@/lib/utils";

const LIME = '#d9f24f';

interface ShimmerTextProps {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  baseColor?: string;
}

function ShimmerText({ 
  children, 
  className, 
  shimmerColor = LIME,
  baseColor = "#ffffff"
}: ShimmerTextProps) {
  return (
    <span
      className={cn("relative inline-block bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: `linear-gradient(
          110deg,
          ${baseColor} 0%,
          ${baseColor} 40%,
          ${shimmerColor} 50%,
          ${baseColor} 60%,
          ${baseColor} 100%
        )`,
        backgroundSize: "200% 100%",
        animation: "shimmer 3s linear infinite",
      }}
    >
      {children}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </span>
  );
}

export { ShimmerText };
