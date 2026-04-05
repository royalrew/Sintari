"use client";
import { useState, useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  size?: number;
  color?: string;
}

export default function GlitchIcon({ children, size = 36, color = "#d4f53c" }: Props) {
  const [glitching, setGlitching] = useState(false);
  const [frame, setFrame] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Random auto-glitch
  useEffect(() => {
    function scheduleGlitch() {
      timeoutRef.current = setTimeout(() => {
        triggerGlitch();
        scheduleGlitch();
      }, 2000 + Math.random() * 4000);
    }
    scheduleGlitch();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function triggerGlitch() {
    setGlitching(true);
    let f = 0;
    intervalRef.current = setInterval(() => {
      setFrame(Math.floor(Math.random() * 6));
      f++;
      if (f > 8) {
        clearInterval(intervalRef.current!);
        setGlitching(false);
        setFrame(0);
      }
    }, 50);
  }

  const glitchFrames = [
    { skewX: -8, translateX: 3, opacity: 0.85 },
    { skewX: 5, translateX: -4, opacity: 0.9 },
    { skewX: -3, translateX: 6, opacity: 0.8 },
    { skewX: 10, translateX: -2, opacity: 0.95 },
    { skewX: -6, translateX: 4, opacity: 0.85 },
    { skewX: 2, translateX: -6, opacity: 0.9 },
  ];

  const g = glitching ? glitchFrames[frame % glitchFrames.length] : null;

  const transform = g
    ? `skewX(${g.skewX}deg) translateX(${g.translateX}px)`
    : "skewX(0deg) translateX(0px)";

  return (
    <div
      onMouseEnter={triggerGlitch}
      style={{
        position: "relative",
        width: size,
        height: size,
        cursor: "default",
        flexShrink: 0,
      }}
    >
      {/* SVG filter for turbulence distortion */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="glitch-turbulence">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={glitching ? "0.9 0.2" : "0"}
              numOctaves="1"
              seed={frame}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={glitching ? 6 : 0}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Cyan ghost (RGB split — only when glitching) */}
      {glitching && (
        <div style={{
          position: "absolute", inset: 0,
          color: "#00ffff",
          transform: `translateX(${(g?.translateX ?? 0) * 1.4}px) translateY(-1px)`,
          opacity: 0.5,
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}>
          {children}
        </div>
      )}

      {/* Red ghost (RGB split — only when glitching) */}
      {glitching && (
        <div style={{
          position: "absolute", inset: 0,
          color: "#ff003c",
          transform: `translateX(${-(g?.translateX ?? 0)}px) translateY(1px)`,
          opacity: 0.4,
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}>
          {children}
        </div>
      )}

      {/* Main icon */}
      <div style={{
        position: "relative",
        color,
        transform,
        transition: glitching ? "none" : "transform 0.3s ease",
        opacity: g?.opacity ?? 1,
        filter: glitching ? "url(#glitch-turbulence)" : "none",
        display: "flex", alignItems: "center", justifyContent: "center",
        width: size, height: size,
      }}>
        {children}
      </div>
    </div>
  );
}
