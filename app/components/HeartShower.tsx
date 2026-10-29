import { useEffect, useRef, useState, type ReactNode } from "react";

const HEARTS = ["💖", "💗", "💕", "💘", "❤️"];

type Heart = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  glyph: string;
  drift: number;
};

export function HeartShower({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const played = useRef(false);
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || played.current) return;
        played.current = true;
        setHearts(
          Array.from({ length: 72 }, (_, index) => ({
            id: index,
            left: Math.random() * 100,
            delay: Math.random() * 0.8,
            duration: 2.4 + Math.random() * 2.2,
            size: 18 + Math.floor(Math.random() * 28),
            glyph: HEARTS[index % HEARTS.length] ?? "💖",
            drift: Math.random() * 80 - 40,
          })),
        );
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {children}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="pgc-heart absolute top-0"
            style={{
              left: `${heart.left}%`,
              fontSize: heart.size,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
              ["--pgc-drift" as string]: `${heart.drift}px`,
            }}
          >
            {heart.glyph}
          </span>
        ))}
      </div>
    </div>
  );
}
