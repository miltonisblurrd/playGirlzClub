import { DISCORD_URL, INSTAGRAM_URL } from "~/lib/brand";

const LINKS = [
  { label: "Shop", href: "/#drop" },
  { label: "About", href: "/#about" },
  { label: "Privacy Policy", href: "/#privacy" },
];

const linkClass = "pgc-footer-link text-4xl leading-none font-black no-underline md:text-5xl";

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
          <a key={link.href} href={link.href} className={linkClass}>
            {link.label}
          </a>
        ))}
        <div className="flex items-center justify-between gap-6">
          <a href="/#shipping" className={linkClass}>
            Shipping and Refunds
          </a>
          <div className="flex items-center gap-4">
            <a href={INSTAGRAM_URL} aria-label="Instagram" className="inline-flex text-white">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a href={DISCORD_URL} aria-label="Discord" className="inline-flex text-white">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.32 4.37a19.8 19.8 0 0 0-4.89-1.52.07.07 0 0 0-.08.04c-.21.37-.44.86-.61 1.25a18.3 18.3 0 0 0-5.49 0 12.6 12.6 0 0 0-.62-1.25.08.08 0 0 0-.08-.04 19.7 19.7 0 0 0-4.88 1.52.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.06 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .09-.03c.46-.63.87-1.3 1.22-1.99a.08.08 0 0 0-.04-.1 13.1 13.1 0 0 1-1.87-.9.08.08 0 0 1-.01-.12l.37-.29a.07.07 0 0 1 .08-.01c3.93 1.8 8.18 1.8 12.06 0a.07.07 0 0 1 .08.01c.12.1.25.2.37.29a.08.08 0 0 1-.01.13 12.3 12.3 0 0 1-1.87.9.08.08 0 0 0-.04.1c.35.7.76 1.36 1.23 1.99a.08.08 0 0 0 .08.03 19.8 19.8 0 0 0 6-3.03.08.08 0 0 0 .03-.05c.5-5.18-.84-9.67-3.55-13.66a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.95-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42Z" />
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </footer>
  );
}
