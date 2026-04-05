"use client";
import { useEffect, useState, type CSSProperties } from "react";

const CHARS = "!@#$%^&*<>/\\|{}[]ABCDEFabcdef0123456789?=+~";
const SCRAMBLE_STEPS = 10;

interface Props {
  text: string;
  delay?: number;
  speed?: number;
  style?: CSSProperties;
  className?: string;
  accentWord?: string;
}

interface CharState {
  display: string;
  resolved: boolean;
  isAccent: boolean;
  original: string;
  isSpace: boolean;
  isNewline: boolean;
}

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

// Build outside-in resolve order for a line of chars
function outsideInOrder(len: number): number[] {
  const order: number[] = [];
  let left = 0;
  let right = len - 1;
  while (left <= right) {
    if (left === right) {
      order.push(left);
    } else {
      order.push(left);
      order.push(right);
    }
    left++;
    right--;
  }
  return order;
}

export default function ScrambleText({ text, delay = 300, speed = 38, style, className, accentWord }: Props) {
  const [chars, setChars] = useState<CharState[]>([]);

  useEffect(() => {
    // Parse text into lines → chars
    const lines = text.split("\n");
    const accentLower = accentWord?.toLowerCase() ?? "";

    // Build initial char state — find accent word positions
    const allChars: CharState[] = [];
    for (let li = 0; li < lines.length; li++) {
      const line = lines[li];
      const lineIdx = line.toLowerCase().indexOf(accentLower);
      for (let ci = 0; ci < line.length; ci++) {
        const ch = line[ci];
        const isAcc = accentLower.length > 0 && lineIdx >= 0 && ci >= lineIdx && ci < lineIdx + accentLower.length;
        allChars.push({
          display: ch === " " ? " " : randomChar(),
          resolved: ch === " ",
          isAccent: isAcc,
          original: ch,
          isSpace: ch === " ",
          isNewline: false,
        });
      }
      if (li < lines.length - 1) {
        allChars.push({ display: "\n", resolved: true, isAccent: false, original: "\n", isSpace: false, isNewline: true });
      }
    }
    setChars(allChars);

    // Build per-line resolve schedules using outside-in order
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let globalStep = 0;

    // Walk through chars, group by line
    const lineGroups: number[][] = [];
    let currentGroup: number[] = [];
    for (let i = 0; i < allChars.length; i++) {
      if (allChars[i].isNewline) {
        lineGroups.push(currentGroup);
        currentGroup = [];
      } else {
        currentGroup.push(i);
      }
    }
    lineGroups.push(currentGroup);

    for (const group of lineGroups) {
      // Filter out spaces for the resolve order
      const resolveIndices = group.filter(i => !allChars[i].isSpace);
      const order = outsideInOrder(resolveIndices.length).map(o => resolveIndices[o]);

      for (let step = 0; step < order.length; step++) {
        const charIdx = order[step];
        const startAt = delay + globalStep * Math.round(speed * 0.55);
        globalStep++;

        // Scramble phase
        for (let s = 0; s < SCRAMBLE_STEPS; s++) {
          const t = setTimeout(() => {
            setChars(prev => {
              const next = [...prev];
              if (!next[charIdx].resolved) {
                next[charIdx] = { ...next[charIdx], display: randomChar() };
              }
              return next;
            });
          }, startAt + s * speed);
          timeouts.push(t);
        }

        // Resolve
        const resolveAt = startAt + SCRAMBLE_STEPS * speed;
        const rt = setTimeout(() => {
          setChars(prev => {
            const next = [...prev];
            next[charIdx] = { ...next[charIdx], display: next[charIdx].original, resolved: true };
            return next;
          });
        }, resolveAt);
        timeouts.push(rt);
      }
    }

    return () => timeouts.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (chars.length === 0) return null;

  // Render: split by newlines
  const lines: CharState[][] = [];
  let current: CharState[] = [];
  for (const c of chars) {
    if (c.isNewline) {
      lines.push(current);
      current = [];
    } else {
      current.push(c);
    }
  }
  lines.push(current);

  return (
    <div className={className} style={{ ...style, display: "block" }}>
      {lines.map((line, li) => (
        <div key={li} style={{ display: "block", lineHeight: "inherit" }}>
          {line.map((c, ci) => (
            <span
              key={ci}
              style={{
                display: "inline-block",
                color: c.isSpace
                  ? "transparent"
                  : c.resolved
                    ? c.isAccent ? "var(--accent)" : "var(--fg)"
                    : "#d4f53c",
                opacity: c.resolved ? 1 : 0.85,
                transition: c.resolved ? "color 0.15s ease" : "none",
                // Prevent layout shift — monospace-ish width when scrambling
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {c.isSpace ? "\u00A0" : c.display}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
