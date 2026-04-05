"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  lines: { text: string; accent?: boolean }[];
  fontSize?: number; // if omitted, computed from container width (clamp 48–112, 7.5vw)
  fontWeight?: number;
  lineHeight?: number;
  letterSpacing?: number;
  delay?: number;
  pixelSize?: number;
  batchPerFrame?: number;
  onDone?: () => void;
}

export default function PixelReveal({
  lines,
  fontSize = 0, // 0 = auto-compute from window.innerWidth
  fontWeight = 900,
  lineHeight = 0.92,
  letterSpacing = -0.04,
  delay = 300,
  pixelSize = 3,
  batchPerFrame = 60,
  onDone,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const W = container.offsetWidth;
    // Compute fontSize from container width if not provided (mirrors CSS clamp(48px, 7.5vw, 112px))
    const resolvedFontSize: number = fontSize > 0 ? fontSize : Math.min(Math.max(window.innerWidth * 0.075, 48), 112);
    const lineH = Math.round(resolvedFontSize * lineHeight);
    const H = lineH * lines.length + fontSize * 0.2;

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    // Draw text on offscreen canvas to sample pixels
    const offscreen = document.createElement("canvas");
    offscreen.width = W * dpr;
    offscreen.height = H * dpr;
    const octx = offscreen.getContext("2d");
    if (!octx) return;
    octx.scale(dpr, dpr);
    octx.imageSmoothingEnabled = false;

    const fontStr = `${fontWeight} ${resolvedFontSize}px Inter, system-ui, sans-serif`;
    octx.font = fontStr;
    octx.letterSpacing = `${letterSpacing * resolvedFontSize}px`;
    octx.textBaseline = "top";
    octx.fillStyle = "#ffffff";

    // Draw each line
    for (let i = 0; i < lines.length; i++) {
      const y = i * lineH + (i === 0 ? 0 : fontSize * 0.05);
      octx.fillText(lines[i].text, 0, y);
    }

    // Sample pixels
    const imgData = octx.getImageData(0, 0, offscreen.width, offscreen.height);
    const data = imgData.data;

    // Collect lit pixels per column
    interface Pixel { x: number; y: number; lineIdx: number }
    const pixelsByCol: Map<number, Pixel[]> = new Map();

    const pxW = Math.round(offscreen.width);
    const pxH = Math.round(offscreen.height);

    for (let py = 0; py < pxH; py += Math.round(pixelSize * dpr)) {
      for (let px = 0; px < pxW; px += Math.round(pixelSize * dpr)) {
        const idx = (py * pxW + px) * 4;
        if (data[idx + 3] > 40) {
          const screenX = px / dpr;
          const screenY = py / dpr;
          const col = Math.floor(screenX / pixelSize);

          // Which line does this pixel belong to?
          let lineIdx = 0;
          for (let li = 0; li < lines.length; li++) {
            if (screenY >= li * lineH && screenY < (li + 1) * lineH) {
              lineIdx = li;
              break;
            }
          }

          if (!pixelsByCol.has(col)) pixelsByCol.set(col, []);
          pixelsByCol.get(col)!.push({ x: screenX, y: screenY, lineIdx });
        }
      }
    }

    // Build outside-in column order
    const cols = Array.from(pixelsByCol.keys()).sort((a, b) => a - b);
    const outsideInCols: number[] = [];
    let left = 0, right = cols.length - 1;
    while (left <= right) {
      if (left === right) { outsideInCols.push(cols[left]); }
      else { outsideInCols.push(cols[left]); outsideInCols.push(cols[right]); }
      left++; right--;
    }

    // Flatten pixels in outside-in column order
    const allPixels: Pixel[] = [];
    for (const col of outsideInCols) {
      const colPixels = pixelsByCol.get(col) ?? [];
      // Within each column, reveal top-to-bottom
      colPixels.sort((a, b) => a.y - b.y);
      allPixels.push(...colPixels);
    }

    // Accent color per line
    const ACCENT = "#d4f53c";
    const FG = "#efefef";

    // Animate
    let revealed = 0;
    let animId: number;

    function drawPixel(p: Pixel) {
      const color = lines[p.lineIdx].accent ? ACCENT : FG;
      ctx!.fillStyle = color;
      ctx!.fillRect(p.x, p.y, pixelSize, pixelSize);
    }

    function frame() {
      const end = Math.min(revealed + batchPerFrame, allPixels.length);
      for (let i = revealed; i < end; i++) {
        drawPixel(allPixels[i]);
      }
      revealed = end;

      if (revealed < allPixels.length) {
        animId = requestAnimationFrame(frame);
      } else {
        setDone(true);
        onDone?.();
      }
    }

    const timeout = setTimeout(() => {
      animId = requestAnimationFrame(frame);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", userSelect: "none" }}>
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          opacity: done ? 0 : 1,
          transition: "opacity 0.4s ease",
          imageRendering: "pixelated",
        }}
      />
      {/* Real text — fades in when pixel reveal is done */}
      <div
        aria-hidden={!done}
        style={{
          position: "absolute",
          top: 0, left: 0,
          opacity: done ? 1 : 0,
          transition: "opacity 0.4s ease",
          fontSize: "inherit",
          fontWeight: "inherit",
          lineHeight: "inherit",
          letterSpacing: "inherit",
          pointerEvents: done ? "auto" : "none",
        }}
      >
        {lines.map((line, i) => (
          <div key={i} style={{ color: line.accent ? "#d4f53c" : "var(--fg)", display: "block" }}>
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}
