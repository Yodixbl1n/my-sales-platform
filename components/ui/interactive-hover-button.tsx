import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const LIME = '#d9f24f';

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  href?: string;
  variant?: "lime" | "outline";
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, href, variant = "lime", ...props }, ref) => {
  const isLime = variant === "lime";
  
  const content = (
    <>
      {/* Основной текст (виден по умолчанию, уезжает вправо при hover) */}
      <span
        className="relative z-20 inline-block transition-all duration-500 group-hover:translate-x-12 group-hover:opacity-0"
        style={{ color: isLime ? '#0a0a0a' : '#ffffff' }}
      >
        {text}
      </span>
      
      {/* Hover-текст со стрелкой (появляется при hover) */}
      <div className="absolute inset-0 z-20 flex items-center justify-center gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
        <span style={{ color: isLime ? LIME : '#0a0a0a' }}>{text}</span>
        <ArrowRight className="w-4 h-4" style={{ color: isLime ? LIME : '#0a0a0a' }} />
      </div>
      
      {/* Расширяющийся круг (заполняет всю кнопку при hover) */}
      <div
        className="absolute left-1/2 top-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-all duration-500 ease-out group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:-translate-x-0 group-hover:-translate-y-0 group-hover:opacity-100"
        style={{
          background: isLime ? '#0a0a0a' : LIME,
        }}
      />
    </>
  );

  const classes = cn(
    "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 px-8 py-4 text-center font-black",
    className,
  );

  const style = {
    background: isLime ? LIME : 'transparent',
    borderColor: isLime ? LIME : 'rgba(255,255,255,0.3)',
  };

  if (href) {
    return (
      <Link href={href} className={classes} style={style} target={href.startsWith('http') ? '_blank' : undefined}>
        {content}
      </Link>
    );
  }

  return (
    <button ref={ref} className={classes} style={style} {...props}>
      {content}
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
