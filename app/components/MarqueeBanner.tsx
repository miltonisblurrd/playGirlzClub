const SEPARATOR = "   ·   ";
const ITEMS = ["Fashion 👗", "Plushies 🧸", "stickers ✨", "charms 🎀", "nails 💅"];

export function MarqueeBanner({
  text = ITEMS.join(SEPARATOR),
  className = "bg-[#6d28d9] text-white",
  label = "Fashion, plushies, stickers, charms, nails",
}: {
  text?: string;
  className?: string;
  label?: string;
}) {
  const unit = `${text}${SEPARATOR}`;

  return (
    <div className={`max-w-full overflow-hidden ${className}`} aria-label={label}>
      <div className="pgc-marquee flex w-max py-3">
        {[0, 1].map((copy) => (
          <p key={copy} className="text-base font-black tracking-[0.14em] uppercase whitespace-nowrap">
            {unit}
            {unit}
          </p>
        ))}
      </div>
    </div>
  );
}
