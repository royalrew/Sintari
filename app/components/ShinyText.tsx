"use client";

interface Props {
  text: string;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function ShinyText({ text, speed = 3, className, style }: Props) {
  return (
    <>
      <style>{`
        @keyframes shiny-move {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shiny-text {
          background: linear-gradient(
            120deg,
            #d4f53c 20%,
            #ffffff 40%,
            #f0ffa0 50%,
            #ffffff 60%,
            #d4f53c 80%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shiny-move ${speed}s linear infinite;
        }
      `}</style>
      <span className={`shiny-text ${className ?? ""}`} style={style}>
        {text}
      </span>
    </>
  );
}
