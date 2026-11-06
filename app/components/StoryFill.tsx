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
      if (charm.current) {
        shown.current = arrive;
        const compact = window.matchMedia("(max-width: 767px)").matches;
        const rest = compact ? "translate3d(42%, 0, 0) rotate(45deg)" : "translate3d(0, 0, 0) rotate(45deg)";
        charm.current.style.transform = arrive ? rest : "translate3d(70%, 0, 0) rotate(45deg)";
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
        className="absolute -bottom-28 left-[calc(50%+1rem)] drop-shadow-xl md:-bottom-24 md:left-[calc(50%+16rem)]"
        style={{
          transform: "translate3d(70%, 0, 0) rotate(45deg)",
          transition: "transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        aria-hidden="true"
      >
        <img
          src="/brand/stickers/cut/club-girl.png"
          alt=""
          className="h-auto w-[200px] md:w-[240px]"
        />
      </span>
    </p>
  );
}
