"use client";
import { useEffect, useRef } from "react";

export default function NeuralNet() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let rotation = 0;

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx!.scale(dpr, dpr);
    }
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    // Generate points on a sphere using golden spiral
    const POINT_COUNT = 120;
    const RADIUS_FACTOR = 0.38;

    function getSpherePoints(rot: number) {
      const pts: { x3: number; y3: number; z3: number; sx: number; sy: number; depth: number }[] = [];
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const r = Math.min(W(), H()) * RADIUS_FACTOR;
      const cx = W() / 2;
      const cy = H() / 2;

      for (let i = 0; i < POINT_COUNT; i++) {
        const y3 = 1 - (i / (POINT_COUNT - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y3 * y3);
        const theta = goldenAngle * i;

        let x3 = Math.cos(theta + rot) * radiusAtY;
        const z3 = Math.sin(theta + rot) * radiusAtY;

        // Tilt the sphere slightly
        const tiltX = x3;
        const tiltY = y3 * Math.cos(0.3) - z3 * Math.sin(0.3);
        const tiltZ = y3 * Math.sin(0.3) + z3 * Math.cos(0.3);

        // Perspective projection
        const fov = 2.8;
        const depth = tiltZ + fov;
        const scale = fov / depth;

        pts.push({
          x3: tiltX, y3: tiltY, z3: tiltZ,
          sx: cx + tiltX * r * scale,
          sy: cy + tiltY * r * scale,
          depth: tiltZ,
        });
      }

      return pts.sort((a, b) => a.depth - b.depth);
    }

    // Signals
    interface Signal {
      fromIdx: number;
      toIdx: number;
      t: number;
      speed: number;
    }
    const signals: Signal[] = [];
    let lastSpawn = 0;

    function spawnSignal(pts: ReturnType<typeof getSpherePoints>) {
      for (let attempt = 0; attempt < 10; attempt++) {
        const i = Math.floor(Math.random() * pts.length);
        const j = Math.floor(Math.random() * pts.length);
        if (i === j) continue;
        const dx = pts[i].sx - pts[j].sx;
        const dy = pts[i].sy - pts[j].sy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 20) {
          signals.push({ fromIdx: i, toIdx: j, t: 0, speed: Math.random() * 0.012 + 0.008 });
          break;
        }
      }
    }

    function draw(ts: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, W(), H());
      rotation += 0.003;

      const pts = getSpherePoints(rotation);
      const MAX_CONN_DIST = 110;

      // Draw connections between nearby points
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].sx - pts[j].sx;
          const dy = pts[i].sy - pts[j].sy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > MAX_CONN_DIST) continue;

          // Only connect if both points are on "front" hemisphere
          const avgDepth = (pts[i].depth + pts[j].depth) / 2;
          if (avgDepth < -0.6) continue;

          const depthAlpha = Math.max(0, (avgDepth + 1) / 2);
          const distAlpha = 1 - dist / MAX_CONN_DIST;
          const alpha = depthAlpha * distAlpha * 0.22;

          ctx.beginPath();
          ctx.moveTo(pts[i].sx, pts[i].sy);
          ctx.lineTo(pts[j].sx, pts[j].sy);
          ctx.strokeStyle = `rgba(212,245,60,${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      // Draw signals
      if (ts - lastSpawn > 220) {
        spawnSignal(pts);
        if (Math.random() > 0.4) spawnSignal(pts);
        lastSpawn = ts;
      }

      for (let s = signals.length - 1; s >= 0; s--) {
        const sig = signals[s];
        sig.t += sig.speed;
        if (sig.t >= 1) { signals.splice(s, 1); continue; }

        const from = pts[sig.fromIdx];
        const to = pts[sig.toIdx];
        if (!from || !to) { signals.splice(s, 1); continue; }

        const x = from.sx + (to.sx - from.sx) * sig.t;
        const y = from.sy + (to.sy - from.sy) * sig.t;
        const depthAlpha = Math.max(0, (from.depth + 0.5) / 1.5);

        // Trail
        const trailLen = 0.12;
        const t0 = Math.max(0, sig.t - trailLen);
        const tx0 = from.sx + (to.sx - from.sx) * t0;
        const ty0 = from.sy + (to.sy - from.sy) * t0;
        const grad = ctx.createLinearGradient(tx0, ty0, x, y);
        grad.addColorStop(0, `rgba(212,245,60,0)`);
        grad.addColorStop(1, `rgba(212,245,60,${0.9 * depthAlpha})`);
        ctx.beginPath();
        ctx.moveTo(tx0, ty0);
        ctx.lineTo(x, y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Glow head
        const grd = ctx.createRadialGradient(x, y, 0, x, y, 10);
        grd.addColorStop(0, `rgba(212,245,60,${0.9 * depthAlpha})`);
        grd.addColorStop(1, `rgba(212,245,60,0)`);
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      // Draw points (back to front — already sorted)
      for (const p of pts) {
        const depthNorm = (p.depth + 1) / 2; // 0 = back, 1 = front
        if (depthNorm < 0.05) continue;

        const size = 0.8 + depthNorm * 2.2;
        const alpha = 0.15 + depthNorm * 0.85;

        // Glow for front-facing points
        if (depthNorm > 0.6) {
          const grd = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, size * 4);
          grd.addColorStop(0, `rgba(212,245,60,${alpha * 0.3})`);
          grd.addColorStop(1, `rgba(212,245,60,0)`);
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, size * 4, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,245,60,${alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
