"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// balloons-js работает только в браузере — импортируем динамически
let balloonsLib: { balloons?: () => void; textBalloons?: (opts: any[]) => void } = {};
if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  balloonsLib = require("balloons-js");
}

export interface BalloonsProps {
  type?: "default" | "text";
  text?: string;
  fontSize?: number;
  color?: string;
  className?: string;
  onLaunch?: () => void;
}

const Balloons = React.forwardRef<
  { launchAnimation: () => void } & HTMLDivElement,
  BalloonsProps
>(
  (
    {
      type = "default",
      text,
      fontSize = 120,
      color = "#d9f24f",
      className,
      onLaunch,
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    const launchAnimation = React.useCallback(() => {
      if (type === "default" && balloonsLib.balloons) {
        balloonsLib.balloons();
      } else if (type === "text" && text && balloonsLib.textBalloons) {
        balloonsLib.textBalloons([{ text, fontSize, color }]);
      }
      onLaunch?.();
    }, [type, text, fontSize, color, onLaunch]);

    React.useImperativeHandle(
      ref,
      () => ({
        launchAnimation,
        ...(containerRef.current || ({} as HTMLDivElement)),
      }),
      [launchAnimation]
    );

    return (
      <div
        ref={containerRef}
        className={cn("balloons-container pointer-events-none", className)}
      />
    );
  }
);

Balloons.displayName = "Balloons";

export { Balloons };
