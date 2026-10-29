const LINKS = [
  { label: "Shop", href: "/#drop" },
  { label: "About", href: "/#about" },
  { label: "Privacy Policy", href: "/#privacy" },
  { label: "Shipping and Refunds", href: "/#shipping" },
];

export function Footer() {
  return (
    <footer className="relative min-h-[70vh] overflow-hidden bg-[#f7c5dc] text-white">
      <img
        src="/brand/hero.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[78%_center]"
      />
      <nav
        aria-label="Footer"
        className="relative flex min-h-[70vh] flex-col justify-end gap-2 px-6 py-10 md:px-10 md:py-12"
      >
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-4xl leading-none font-black text-white no-underline md:text-5xl"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
