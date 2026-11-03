const ITEMS = ["Fashion 👗", "Plushies 🧸", "stickers ✨", "charms 🎀", "nails 💅"];

export function MarqueeBanner({
  text = ITEMS.join("   ·   "),
  className = "bg-[#6d28d9] text-white",
  label = "Fashion, plushies, stickers, charms, nails",
}: {
  text?: string;
  className?: string;
  label?: string;
}) {
  return (
    <div className={`max-w-full overflow-hidden ${className}`} aria-label={label}>
      <div className="pgc-marquee flex w-max py-3">
        {[0, 1].map((copy) => (
          <p key={copy} className="px-8 text-sm font-semibold tracking-[0.18em] uppercase whitespace-nowrap">
            {text}
            <span className="px-8">·</span>
            {text}
            <span className="px-8">·</span>
          </p>
        ))}
      </div>
    </div>
  );
}
