import { useRef, useState } from "react";

const SHOTS = [
  { id: "portrait-a", src: "/brand/portrait.jpg", alt: "Club character, close portrait", x: 28, y: 4, w: 230, rotate: -8, position: "center 18%", delay: "0.05s" },
  { id: "wordmark", src: "/brand/wordmark.png", alt: "Club character with the wordmark", x: 58, y: 0, w: 210, rotate: 7, position: "center 28%", delay: "0.16s" },
  { id: "hero", src: "/brand/hero.jpg", alt: "Club character, full illustration", x: 40, y: 26, w: 260, rotate: 3, position: "68% 42%", delay: "0.28s" },
  { id: "portrait-b", src: "/brand/portrait.jpg", alt: "", x: 68, y: 32, w: 200, rotate: -6, position: "center 70%", delay: "0.4s" },
  { id: "hero-b", src: "/brand/hero.jpg", alt: "", x: 18, y: 46, w: 200, rotate: 8, position: "18% 55%", delay: "0.52s" },
  { id: "portrait-c", src: "/brand/portrait.jpg", alt: "", x: 52, y: 54, w: 180, rotate: -4, position: "center 40%", delay: "0.64s" },
  { id: "hero-c", src: "/brand/hero.jpg", alt: "", x: 34, y: 62, w: 190, rotate: 6, position: "40% 80%", delay: "0.76s" },
];

type Shot = (typeof SHOTS)[number] & { z: number };

export function HeroCollage() {
  const board = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: string; dx: number; dy: number } | null>(null);
  const [cards, setCards] = useState<Shot[]>(() =>
    SHOTS.map((shot, index) => ({ ...shot, z: index + 1 })),
  );

  function bringToFront(id: string) {
    setCards((current) => {
      const top = Math.max(...current.map((card) => card.z)) + 1;
      return current.map((card) => (card.id === id ? { ...card, z: top } : card));
    });
  }

  function moveCard(id: string, clientX: number, clientY: number) {
    const bounds = board.current?.getBoundingClientRect();
    const offset = drag.current;
    if (!bounds || !offset || offset.id !== id) return;
    const x = ((clientX - bounds.left - offset.dx) / bounds.width) * 100;
    const y = ((clientY - bounds.top - offset.dy) / bounds.height) * 100;
    setCards((current) =>
      current.map((card) => (card.id === id ? { ...card, x, y } : card)),
    );
  }

  return (
    <div ref={board} className="pointer-events-none absolute inset-0">
      {cards.map((shot) => (
        <figure
          key={shot.id}
          className="pgc-polaroid pointer-events-auto absolute cursor-grab overflow-hidden rounded-2xl border-4 border-white bg-[#f7bfd8] shadow-xl active:cursor-grabbing"
          style={{
            left: `${shot.x}%`,
            top: `${shot.y}%`,
            width: shot.w,
            zIndex: shot.z,
            transform: `rotate(${shot.rotate}deg)`,
            animationDelay: shot.delay,
          }}
          onPointerDown={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            drag.current = {
              id: shot.id,
              dx: event.clientX - rect.left,
              dy: event.clientY - rect.top,
            };
            event.currentTarget.setPointerCapture(event.pointerId);
            bringToFront(shot.id);
          }}
          onPointerMove={(event) => moveCard(shot.id, event.clientX, event.clientY)}
          onPointerUp={() => {
            drag.current = null;
          }}
        >
          <img
            src={shot.src}
            alt={shot.alt}
            draggable={false}
            className="pointer-events-none aspect-[3/4] w-full object-cover"
            style={{ objectPosition: shot.position }}
          />
        </figure>
      ))}
    </div>
  );
}
