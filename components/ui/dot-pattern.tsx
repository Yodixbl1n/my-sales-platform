import { useId } from "react";
import { cn } from "@/lib/utils";

interface DotPatternProps {
  width?: any;
  height?: any;
  x?: any;
  y?: any;
  cx?: any;
  cy?: any;
  cr?: any;
  className?: string;
  animated?: boolean;
  [key: string]: any;
}

function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  animated = false,
  ...props
}: DotPatternProps) {
  const id = useId();

  return (
    <>
      {animated && (
        <style>{'@keyframes dot-fly { 0% { transform: scale(1); } 100% { transform: scale(1.8); } }'}</style>
      )}
      <svg
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/80",
          className,
        )}
        style={
          animated
            ? { animation: 'dot-fly 8s ease-in-out infinite alternate', transformOrigin: 'center center' }
            : undefined
        }
        {...props}
      >
        <defs>
          <pattern
            id={id}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      </svg>
    </>
  );
}

export { DotPattern };
