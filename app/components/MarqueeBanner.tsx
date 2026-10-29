const ITEMS = ["Fashion 👗", "Plushies 🧸", "stickers ✨", "charms 🎀", "nails 💅"];

export function MarqueeBanner() {
  const line = ITEMS.join("   ·   ");

  return (
    <div className="overflow-hidden bg-[#6d28d9] text-white" aria-label="Fashion, plushies, stickers, charms, nails">
      <div className="pgc-marquee flex w-max py-3">
        {[0, 1].map((copy) => (
          <p key={copy} className="px-8 text-sm font-semibold tracking-[0.18em] uppercase whitespace-nowrap">
            {line}
            <span className="px-8">·</span>
            {line}
            <span className="px-8">·</span>
          </p>
        ))}
      </div>
    </div>
  );
}
