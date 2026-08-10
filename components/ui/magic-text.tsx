"use client";
import * as React from "react";
import { motion } from "framer-motion";

export interface MagicTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export const MagicText: React.FC<MagicTextProps> = ({ text, className, speed = 0.03 }) => {
  const words = text.split(" ");

  return (
    <p
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
        <motion.span
          key={i}
          initial={{ opacity: 0.15, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.4, delay: i * speed, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block" }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
};
