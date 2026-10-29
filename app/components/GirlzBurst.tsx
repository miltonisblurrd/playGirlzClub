import { useState, type MouseEvent } from "react";

type Bill = {
  id: number;
  x: number;
  y: number;
  dx: string;
  dy: string;
  spin: string;
  dur: string;
  delay: string;
  size: number;
};

export function GirlzBurst() {
  const [bills, setBills] = useState<Bill[]>([]);

  function burst(event: MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const next = Array.from({ length: 48 }, (_, index) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 160 + Math.random() * Math.max(window.innerWidth, window.innerHeight) * 0.62;
      return {
        id: Date.now() + index,
        x,
        y,
        dx: `${Math.cos(angle) * distance}px`,
        dy: `${Math.sin(angle) * distance}px`,
        spin: `${Math.floor(Math.random() * 80 - 40)}deg`,
        dur: `${1.5 + Math.random() * 1.1}s`,
        delay: `${Math.random() * 0.12}s`,
        size: 28 + Math.floor(Math.random() * 26),
      };
    });
    setBills((current) => [...current, ...next]);
    window.setTimeout(() => {
      const ids = new Set(next.map((bill) => bill.id));
      setBills((current) => current.filter((bill) => !ids.has(bill.id)));
    }, 2800);
  }

  return (
    <>
      <button
        type="button"
        className="pgc-girlz pointer-events-auto cursor-pointer border-0 bg-transparent p-0 text-[1em] leading-[0.82] text-[#c2186a]"
        onClick={burst}
      >
        GIRLZ
      </button>
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
        {bills.map((bill, index) => (
          <span
            key={bill.id}
            className="pgc-bill absolute font-black text-[#e85aad]"
            style={{
              left: bill.x,
              top: bill.y,
              fontSize: bill.size,
              animationDuration: bill.dur,
              animationDelay: bill.delay,
              ["--pgc-dx" as string]: bill.dx,
              ["--pgc-dy" as string]: bill.dy,
              ["--pgc-spin" as string]: bill.spin,
              ["--pgc-dur" as string]: bill.dur,
            }}
          >
            {index % 2 === 0 ? "💵" : "💸"}
          </span>
        ))}
      </div>
    </>
  );
}
