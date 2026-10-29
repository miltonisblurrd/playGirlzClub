import { useEffect, useRef } from "react";

const STORY =
  "Playgirlz Club is a brand for baddies who enjoy expressing themselves through nails, accessories, and fashion. The look is bold, personal, and made to be worn your way. Each piece is there to match the energy you already bring.";

const GIRLY = "nails, accessories, and fashion";
const girlyStart = STORY.indexOf(GIRLY);
const girlyEnd = girlyStart + GIRLY.length;
const GLYPHS = [...STORY];
const LETTERS = GLYPHS.filter((char) => char !== " ").length;

function mix(amount: number) {
  const channel = (from: number, to: number) => Math.round(from + (to - from) * amount);
  return `rgb(${channel(243, 26)} ${channel(170, 16)} ${channel(203, 22)})`;
}

export function StoryFill() {
  const ref = useRef<HTMLParagraphElement>(null);
  const letters = useRef<HTMLSpanElement[]>([]);
  const charm = useRef<HTMLSpanElement>(null);
  const shown = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;

    const paint = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const start = window.innerHeight * 0.92;
      const end = window.innerHeight * 0.02;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      const filled = progress * LETTERS;
      let seen = 0;
      for (const span of letters.current) {
        if (span.dataset.girly === "true") {
          seen += 1;
          continue;
        }
        const amount = Math.min(1, Math.max(0, filled - seen));
        span.style.color = mix(amount);
        seen += 1;
      }

      const arrive = progress > 0.86;
      if (arrive !== shown.current && charm.current) {
        shown.current = arrive;
        charm.current.style.transform = arrive
          ? "translate3d(0, 0, 0) rotate(45deg)"
          : "translate3d(70%, 0, 0) rotate(45deg)";
      }
    };

    const requestPaint = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", requestPaint, { passive: true });
    window.addEventListener("resize", requestPaint);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestPaint);
      window.removeEventListener("resize", requestPaint);
    };
  }, []);

  let slot = 0;

  return (
    <p
      ref={ref}
      className="mx-auto max-w-4xl text-3xl leading-snug font-medium text-[#f3aacb] md:text-5xl md:leading-tight"
    >
      {GLYPHS.map((char, index) => {
        if (char === " ") return <span key={index}> </span>;
        const indexInLetters = slot;
        slot += 1;
        return (
          <span
            key={index}
            ref={(element) => {
              if (element) letters.current[indexInLetters] = element;
            }}
            className={index >= girlyStart && index < girlyEnd ? "pgc-girlz text-[#c2186a]" : undefined}
            data-girly={index >= girlyStart && index < girlyEnd ? "true" : undefined}
          >
            {char}
          </span>
        );
      })}
      <span
        ref={charm}
        className="absolute -bottom-24 left-[calc(50%+8rem)] drop-shadow-xl md:left-[calc(50%+16rem)]"
        style={{
          transform: "translate3d(70%, 0, 0) rotate(45deg)",
          transition: "transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        aria-hidden="true"
      >
        <svg width="240" height="340" viewBox="0 0 240 340" fill="none">
          <ellipse cx="120" cy="28" rx="34" ry="22" stroke="#b9b3ae" strokeWidth="8" />
          <ellipse cx="120" cy="28" rx="34" ry="22" stroke="#f4f1ee" strokeWidth="2" />
          <path
            d="M108 18c8-10 22-8 26 4"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
          />
          <g stroke="#c8c2bc" strokeWidth="7" fill="none">
            <ellipse cx="120" cy="62" rx="11" ry="16" />
            <ellipse cx="120" cy="90" rx="11" ry="16" />
            <ellipse cx="120" cy="118" rx="11" ry="16" />
          </g>
          <g stroke="#fff" strokeWidth="2" fill="none" opacity="0.7">
            <path d="M114 52c2-6 10-6 12 2" strokeLinecap="round" />
            <path d="M114 80c2-6 10-6 12 2" strokeLinecap="round" />
            <path d="M114 108c2-6 10-6 12 2" strokeLinecap="round" />
          </g>
          <circle cx="120" cy="146" r="8" fill="#d9d3cd" stroke="#8d8680" strokeWidth="2" />
          <rect x="48" y="154" width="144" height="156" rx="28" fill="#f4b6d0" />
          <rect x="48" y="154" width="144" height="156" rx="28" fill="url(#charmSheen)" />
          <rect
            x="56"
            y="162"
            width="128"
            height="140"
            rx="22"
            fill="#fff7fb"
            stroke="#e38ab4"
            strokeWidth="3"
          />
          <path
            d="M70 176c18-16 46-16 64 0"
            stroke="#fff"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.85"
          />
          <text
            x="120"
            y="268"
            textAnchor="middle"
            fontSize="108"
            fontFamily="Georgia, serif"
            fontWeight="700"
            fill="#c2186a"
          >
            $
          </text>
          <defs>
            <linearGradient id="charmSheen" x1="48" y1="154" x2="192" y2="310">
              <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
              <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
              <stop offset="1" stopColor="#c2186a" stopOpacity="0.18" />
            </linearGradient>
          </defs>
        </svg>
      </span>
    </p>
  );
}
