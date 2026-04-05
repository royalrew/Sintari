"use client";
import { useRef, type ReactNode, type MouseEvent, type CSSProperties } from "react";

interface Props {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  spotlightColor?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function SpotlightCard({
  children,
  style,
  className,
  spotlightColor = "rgba(212,245,60,0.07)",
  onMouseEnter,
  onMouseLeave: onMouseLeaveProp,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--sy", `${e.clientY - rect.top}px`);
    el.style.setProperty("--so", "1");
  }

  function handleMouseLeave() {
    ref.current?.style.setProperty("--so", "0");
    onMouseLeaveProp?.();
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onMouseEnter}
      className={className}
      style={{
        position: "relative",
        "--sx": "0px",
        "--sy": "0px",
        "--so": "0",
        "--sc": spotlightColor,
        ...style,
      } as CSSProperties}
    >
      {/* Spotlight overlay — absolute, doesn't affect grid children */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: `radial-gradient(500px circle at var(--sx) var(--sy), var(--sc), transparent 70%)`,
          opacity: "var(--so)" as unknown as number,
          transition: "opacity 0.25s ease",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {children}
    </div>
  );
}
