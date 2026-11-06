import { useEffect, useRef, useState } from "react";

const SHOTS = [
  { id: "club-girl", src: "/brand/stickers/cut/club-girl.png", alt: "Play Girls Club sticker", x: 28, y: 4, mx: -8, my: 0, w: 300, rotate: -8, position: "center", delay: "0.05s" },
  { id: "heart-bunny", src: "/brand/stickers/cut/heart-bunny.png", alt: "Heart bunny sticker", x: 58, y: 0, mx: 52, my: -16, w: 270, rotate: 7, position: "center", delay: "0.16s" },
  { id: "orchid", src: "/brand/stickers/cut/orchid.png", alt: "Orchid sticker", x: 40, y: 26, mx: 24, my: 24, w: 330, rotate: 3, position: "center", delay: "0.28s" },
  { id: "bunny-girl", src: "/brand/stickers/cut/bunny-girl.png", alt: "Bunny girl sticker", x: 68, y: 32, mx: 54, my: 42, w: 260, rotate: -6, position: "center", delay: "0.4s" },
  { id: "cherries", src: "/brand/stickers/cut/cherries.png", alt: "Cherries sticker", x: 18, y: 46, mx: -8, my: 46, w: 260, rotate: 8, position: "center", delay: "0.52s" },
  { id: "lollipop", src: "/brand/stickers/cut/lollipop.png", alt: "Lollipop sticker", x: 52, y: 54, mx: 48, my: 64, w: 230, rotate: -4, position: "center", delay: "0.64s" },
];

type Shot = (typeof SHOTS)[number] & { z: number };

export function HeroCollage() {
  const board = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: string; dx: number; dy: number } | null>(null);
  const [cards, setCards] = useState<Shot[]>(() =>
    SHOTS.map((shot, index) => ({ ...shot, z: index + 1 })),
  );

  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    setCards((current) => current.map((card) => ({ ...card, x: card.mx, y: card.my })));
  }, []);

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
    <div ref={board} className="pgc-hero-board pointer-events-none absolute inset-0 translate-x-10">
      {cards.map((shot) => (
        <figure
          key={shot.id}
          className="pgc-polaroid pgc-hero-card pointer-events-auto absolute cursor-grab overflow-visible bg-transparent shadow-none active:cursor-grabbing"
          style={{
            left: `${shot.x}%`,
            ["--shot-x" as string]: `${shot.x}%`,
            ["--shot-mx" as string]: `${shot.x}%`,
            ["--shot-my" as string]: `${shot.y}%`,
            top: `${shot.y}%`,
            width: shot.w,
            ["--shot-w" as string]: `${shot.w}px`,
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
            event.preventDefault();
            try {
              event.currentTarget.setPointerCapture(event.pointerId);
            } catch {
              /* a touch can end before capture */
            }
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
            className="pgc-sticker pointer-events-none h-auto w-full"
            style={{ objectPosition: shot.position }}
          />
        </figure>
      ))}
    </div>
  );
}
