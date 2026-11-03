import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ProductBuy, type DropItem } from "~/components/DropProductCard";

const SHOTS = [
  { id: "portrait-a", src: "/brand/portrait.jpg", alt: "Club character, close portrait", x: 28, y: 4, mx: -8, my: 0, w: 230, rotate: -8, position: "center 18%", delay: "0.05s", product: 0 },
  { id: "wordmark", src: "/brand/wordmark.png", alt: "Club character with the wordmark", x: 58, y: 0, mx: 52, my: -16, w: 210, rotate: 7, position: "center 28%", delay: "0.16s", product: 1 },
  { id: "hero", src: "/brand/hero.jpg", alt: "Club character, full illustration", x: 40, y: 26, mx: 24, my: 24, w: 260, rotate: 3, position: "68% 42%", delay: "0.28s", product: 2 },
  { id: "portrait-b", src: "/brand/portrait.jpg", alt: "", x: 68, y: 32, mx: 54, my: 42, w: 200, rotate: -6, position: "center 70%", delay: "0.4s", product: 3 },
  { id: "hero-b", src: "/brand/hero.jpg", alt: "", x: 18, y: 46, mx: -8, my: 46, w: 200, rotate: 8, position: "18% 55%", delay: "0.52s", product: 4 },
  { id: "portrait-c", src: "/brand/portrait.jpg", alt: "", x: 52, y: 54, mx: 48, my: 64, w: 180, rotate: -4, position: "center 40%", delay: "0.64s", product: 5 },
  { id: "hero-c", src: "/brand/hero.jpg", alt: "", x: 34, y: 62, mx: 6, my: 70, w: 190, rotate: 6, position: "40% 80%", delay: "0.76s", product: 6 },
];

type Shot = (typeof SHOTS)[number] & { z: number };

export function HeroCollage({ products }: { products: DropItem[] }) {
  const board = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: string; dx: number; dy: number } | null>(null);
  const [cards, setCards] = useState<Shot[]>(() =>
    SHOTS.map((shot, index) => ({ ...shot, z: index + 1 })),
  );
  const [mounted, setMounted] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [grown, setGrown] = useState(false);
  const open = cards.find((card) => card.id === openId) ?? null;
  const product = open ? products[open.product] : undefined;

  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    setCards((current) => current.map((card) => ({ ...card, x: card.mx, y: card.my })));
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!openId) {
      setGrown(false);
      return;
    }
    const frame = requestAnimationFrame(() => setGrown(true));
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenId(null);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKey);
    };
  }, [openId]);

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

  function openProduct(id: string) {
    bringToFront(id);
    setOpenId(id);
  }

  return (
    <div ref={board} className="pgc-hero-board pointer-events-none absolute inset-0 translate-x-10">
      {cards.map((shot) => (
        <figure
          key={shot.id}
          className="pgc-polaroid pgc-hero-card pointer-events-auto absolute cursor-grab overflow-hidden rounded-2xl border-4 border-white bg-[#f7bfd8] shadow-xl active:cursor-grabbing"
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
            if (openId) return;
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
            className="pointer-events-none aspect-[3/4] w-full object-cover"
            style={{ objectPosition: shot.position }}
          />
          <button
            type="button"
            className="absolute top-2 right-2 z-10 rounded-full bg-[#1a1016] px-2 py-1 text-[7px] font-semibold tracking-wide whitespace-nowrap text-white uppercase md:px-2.5 md:text-[10px]"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => openProduct(shot.id)}
          >
            View Product
          </button>
        </figure>
      ))}
      {mounted && open && product
        ? createPortal(
        <div
          className="pointer-events-auto fixed inset-0 z-[80] flex items-center justify-center bg-[#1a1016]/45 p-5"
          onClick={() => setOpenId(null)}
        >
          <article
            className="w-full max-w-md rounded-[1.75rem] border-4 border-white bg-white p-4 shadow-2xl"
            style={{
              transform: grown ? "scale(1.04)" : "scale(0.78)",
              transition: "transform 0.45s cubic-bezier(0.22, 1.2, 0.36, 1)",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="overflow-hidden rounded-2xl bg-[#f7bfd8]">
              <img src={product.image} alt="" className="aspect-square w-full object-cover" />
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-3">
              <h3 className="text-2xl font-black">{product.name}</h3>
              <p className="font-semibold">{product.price}</p>
            </div>
            <p className="mt-1 text-sm text-[#4a3040]">{product.detail}</p>
            <p className="mt-1 text-xs tracking-wide text-[#c2186a] uppercase">{product.stock}</p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <ProductBuy item={product} />
              <button
                type="button"
                className="text-sm font-semibold text-[#1a1016]"
                onClick={() => setOpenId(null)}
              >
                Close
              </button>
            </div>
          </article>
        </div>,
        document.body,
      ) : null}
    </div>
  );
}
