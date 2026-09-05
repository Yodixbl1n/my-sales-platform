"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { ArrowRight } from "lucide-react";

const DEFAULT_HREF = "#";
const COMPACT_LAYOUT_BREAKPOINT = 768;
const ANIMATION_DURATION_MS = 450;

export interface ArrowFillButtonOwnProps {
  btnText?: string;
  href?: string;
  className?: string;
  bgColor?: string;
  textColor?: string;
  fillBgColor?: string;
  fillTextColor?: string;
  hoverFillBgColor?: string;
  hoverFillTextColor?: string;
  arrowColor?: string;
  hoverArrowColor?: string;
  variant?: "lime" | "outline";
  size?: "sm" | "md";
  target?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export type ArrowFillButtonProps = ArrowFillButtonOwnProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof ArrowFillButtonOwnProps>;

const LIME = "#d9f24f";

function ArrowFillButton({
  btnText = "Нажми",
  href = DEFAULT_HREF,
  className = "",
  variant = "lime",
  size = "md",
  target,
  onClick,
  bgColor,
  textColor,
  fillBgColor,
  fillTextColor,
  hoverFillBgColor,
  hoverFillTextColor,
  arrowColor,
  hoverArrowColor,
  ...props
}: ArrowFillButtonProps) {
  const isLime = variant === "lime";
  const isSm = size === "sm";

  const sizeClasses = isSm
    ? "h-[44px] rounded-full px-5 pr-[calc(44px+6px+22px)] text-[13px] [--icon-circle:36px] [--icon-right:5px] [--circle-inset-y:calc((100%-36px)/2)] max-sm:h-[42px] max-sm:px-5 max-sm:pr-[calc(36px+5px+20px)] max-sm:text-[12px] max-sm:[--icon-circle:34px] max-sm:[--icon-right:5px]"
    : "h-[52px] rounded-full px-7 pr-[calc(52px+8px+28px)] text-[15px] [--icon-circle:44px] [--icon-right:6px] [--circle-inset-y:calc((100%-44px)/2)] max-sm:h-[48px] max-sm:px-6 max-sm:pr-[calc(44px+6px+24px)] max-sm:text-[14px] max-sm:[--icon-circle:40px] max-sm:[--icon-right:5px]";

  const textInset = isSm ? 22 : 28;
  const textInsetSm = isSm ? 20 : 24;

  const bg = bgColor ?? (isLime ? LIME : "transparent");
  const text = textColor ?? (isLime ? "#000000" : "#ffffff");
  const fillBg = fillBgColor ?? (isLime ? "#000000" : LIME);
  const fillText = fillTextColor ?? (isLime ? LIME : "#000000");
  const hFillBg = hoverFillBgColor ?? fillBg;
  const hFillText = hoverFillTextColor ?? fillText;
  const arrow = arrowColor ?? fillText;
  const hArrow = hoverArrowColor ?? hFillText;

  const [isReady, setIsReady] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const releaseRef = useRef<number | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${COMPACT_LAYOUT_BREAKPOINT - 1}px)`);
    const sync = (e: MediaQueryList | MediaQueryListEvent) => {
      const matches = "matches" in e ? e.matches : (e as any).currentTarget.matches;
      setIsCompact(matches);
      if (!matches) setIsPressed(false);
    };
    sync(mq);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    return () => {
      if (releaseRef.current) window.clearTimeout(releaseRef.current);
    };
  }, []);

  const clearPressed = () => {
    if (releaseRef.current) window.clearTimeout(releaseRef.current);
    releaseRef.current = window.setTimeout(() => {
      setIsPressed(false);
      releaseRef.current = null;
    }, ANIMATION_DURATION_MS);
  };

  const onDown = (e: PointerEvent<HTMLAnchorElement>) => {
    props.onPointerDown?.(e);
    if (!isCompact || e.pointerType === "mouse") return;
    if (releaseRef.current) {
      window.clearTimeout(releaseRef.current);
      releaseRef.current = null;
    }
    setIsPressed(true);
  };

  const onUp = (e: PointerEvent<HTMLAnchorElement>) => {
    props.onPointerUp?.(e);
    if (!isCompact || e.pointerType === "mouse") return;
    clearPressed();
  };

  const onCancel = (e: PointerEvent<HTMLAnchorElement>) => {
    props.onPointerCancel?.(e);
    if (!isCompact || e.pointerType === "mouse") return;
    clearPressed();
  };

  const borderStyle =
    variant === "outline" ? `1px solid rgba(255,255,255,0.2)` : `1px solid ${LIME}`;

  return (
    <a
      href={href}
      target={target}
      onClick={onClick}
      {...props}
      data-pressed={isPressed ? "true" : "false"}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerCancel={onCancel}
      className={`group relative inline-flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap font-bold leading-none ${sizeClasses} ${className}`}
      style={{
        background: bg,
        border: borderStyle,
        "--btn-bg": bg,
        "--btn-text": text,
        "--btn-fill-bg": fillBg,
        "--btn-fill-text": fillText,
        "--btn-fill-bg-hover": hFillBg,
        "--btn-fill-text-hover": hFillText,
        "--btn-arrow": arrow,
        "--btn-arrow-hover": hArrow,
        color: text,
        visibility: isReady ? "visible" : "hidden",
      } as CSSProperties & Record<string, string>}
    >
      <span className="relative z-[1] pb-px select-none">{btnText}</span>

      <div
        aria-hidden
        className={`pointer-events-none absolute z-[2] rounded-full bg-(--btn-fill-bg)
          inset-[var(--circle-inset-y)_var(--icon-right)_var(--circle-inset-y)_calc(100%-var(--icon-right)-var(--icon-circle))]
          ${isReady
            ? "transition-all duration-[450ms] ease-[cubic-bezier(0.785,0.135,0.15,0.86)] motion-reduce:transition-none group-hover:inset-0 group-hover:bg-(--btn-fill-bg-hover) group-data-[pressed=true]:inset-0 group-data-[pressed=true]:bg-(--btn-fill-bg-hover)"
            : ""}`}
      />

      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-[2] flex items-center ${isSm ? "px-5" : "px-7"} pr-[calc(var(--icon-circle)+var(--icon-right)+${textInset}px)] text-(--btn-fill-text)
          ${isSm ? "max-sm:px-5" : "max-sm:px-6"} max-sm:pr-[calc(var(--icon-circle)+var(--icon-right)+${textInsetSm}px)]
          [clip-path:inset(var(--circle-inset-y)_var(--icon-right)_var(--circle-inset-y)_calc(100%-var(--icon-right)-var(--icon-circle)))]
          ${isReady
            ? "transition-all duration-[450ms] ease-[cubic-bezier(0.785,0.135,0.15,0.86)] motion-reduce:transition-none group-hover:text-(--btn-fill-text-hover) group-hover:[clip-path:inset(0_0_0_0)] group-data-[pressed=true]:text-(--btn-fill-text-hover) group-data-[pressed=true]:[clip-path:inset(0_0_0_0)]"
            : ""}`}
      >
        <span className="relative z-[1] pb-px whitespace-nowrap select-none">{btnText}</span>
      </div>

      <span
        aria-hidden
        className={`pointer-events-none absolute right-[var(--icon-right)] top-1/2 z-[3] inline-flex
          h-[var(--icon-circle)] w-[var(--icon-circle)] shrink-0 -translate-y-1/2
          items-center justify-center overflow-hidden rounded-full
          bg-(--btn-fill-bg) text-(--btn-arrow)
          ${isReady
            ? "transition-colors duration-[450ms] ease-[cubic-bezier(0.785,0.135,0.15,0.86)] motion-reduce:transition-none group-hover:bg-(--btn-fill-bg-hover) group-hover:text-(--btn-arrow-hover) group-data-[pressed=true]:bg-(--btn-fill-bg-hover) group-data-[pressed=true]:text-(--btn-arrow-hover)"
            : ""}`}
        style={{
          WebkitMaskImage: "-webkit-radial-gradient(white, black)",
          maskImage: "radial-gradient(white, black)",
        }}
      >
        <ArrowRight
          className={`absolute left-1/2 top-1/2 size-4 max-sm:size-[14px] translate-x-[-170%] -translate-y-1/2 origin-center scale-0 text-current
            ${isReady
              ? "transition-transform duration-[450ms] ease-[cubic-bezier(0.785,0.135,0.15,0.86)] motion-reduce:transition-none group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 group-hover:scale-100 group-data-[pressed=true]:-translate-x-1/2 group-data-[pressed=true]:-translate-y-1/2 group-data-[pressed=true]:scale-100"
              : ""}`}
          strokeWidth={2}
        />
        <ArrowRight
          className={`absolute left-1/2 top-1/2 size-4 max-sm:size-[14px] -translate-x-1/2 -translate-y-1/2 origin-center text-current
            ${isReady
              ? "transition-transform duration-[450ms] ease-[cubic-bezier(0.785,0.135,0.15,0.86)] motion-reduce:transition-none group-hover:translate-x-[70%] group-hover:-translate-y-1/2 group-hover:scale-0 group-data-[pressed=true]:translate-x-[70%] group-data-[pressed=true]:-translate-y-1/2 group-data-[pressed=true]:scale-0"
              : ""}`}
          strokeWidth={2}
        />
      </span>
    </a>
  );
}

export default ArrowFillButton;
