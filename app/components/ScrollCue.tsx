import { useEffect, useState } from "react";

export function ScrollCue() {
  const [open, setOpen] = useState(1);

  useEffect(() => {
    const update = () => {
      const progress = Math.min(1, Math.max(0, window.scrollY / 180));
      setOpen(1 - progress);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <a
      href="#story"
      className="pgc-scroll-cta absolute right-6 bottom-20 z-40 inline-flex items-center rounded-full bg-white py-2 pr-2 text-sm font-semibold no-underline"
      style={{ paddingLeft: open > 0.04 ? 18 : 8 }}
      aria-label="Scroll down"
    >
      <span
        className="overflow-hidden whitespace-nowrap"
        style={{ maxWidth: `${open * 7.5}rem`, opacity: open }}
      >
        <span className="pr-2 text-[#1a1016]">Scroll down</span>
      </span>
      <span className="inline-flex size-8 items-center justify-center text-[#1a1016]" aria-hidden="true">
        ↓
      </span>
    </a>
  );
}
