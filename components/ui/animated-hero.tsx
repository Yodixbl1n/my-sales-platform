'use client'
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const LIME = '#d9f24f';

function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["НАВЫК", "ПРИБЫЛЬ", "СИСТЕМА", "СВОБОДА", "ВЛАСТЬ"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <h1 className="fade-up-1 text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8">
      ПРОДАЖИ — ЭТО
      <span className="relative flex w-full justify-center overflow-hidden md:pb-4 md:pt-1" style={{ color: LIME }}>
        &nbsp;
        {titles.map((title, index) => (
          <motion.span
            key={index}
            className="absolute font-black neon"
            initial={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", stiffness: 50 }}
            animate={
              titleNumber === index
                ? { y: 0, opacity: 1 }
                : { y: titleNumber > index ? "-150%" : "150%", opacity: 0 }
            }
            style={{ textShadow: '0 0 30px rgba(217,242,79,0.6)' }}
          >
            {title}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}

export { AnimatedHero };
