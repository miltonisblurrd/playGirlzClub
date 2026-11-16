import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import { DISCORD_URL, INSTAGRAM_URL } from "~/lib/brand";
import { useCart } from "~/lib/cart";
import { CART_DRAWER_ID, openDialogFromLinkClick } from "~/lib/cart-drawer";

function cartCountLabel(count: number) {
  return count === 1 ? "Cart (1 item)" : `Cart (${count} items)`;
}

export function Header() {
  const totalQuantity = useCart((state) => state.data.totalQuantity);
  const previous = useRef(totalQuantity);
  const [dropping, setDropping] = useState(false);

  useEffect(() => {
    if (totalQuantity > previous.current) {
      setDropping(true);
      const timer = window.setTimeout(() => setDropping(false), 700);
      previous.current = totalQuantity;
      return () => window.clearTimeout(timer);
    }
    previous.current = totalQuantity;
  }, [totalQuantity]);

  return (
    <header className="sticky top-0 z-40 border-b border-[#f3aacb] bg-[#fff7fb]/95 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-5">
        <Link to="/" className="inline-flex items-center no-underline" aria-label="Play Girlz Club">
          <img src="/brand/mark.png" alt="" className="h-16 w-auto" />
        </Link>
        <nav className="flex items-center gap-4">
          <a href={INSTAGRAM_URL} className="text-[#c2186a]" aria-label="Instagram">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm4.5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm5.25-2.15a1.15 1.15 0 1 0 0 2.3 1.15 1.15 0 0 0 0-2.3Z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a href={DISCORD_URL} className="text-[#c2186a]" aria-label="Discord">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.32 4.37a19.8 19.8 0 0 0-4.89-1.52.07.07 0 0 0-.08.04c-.21.37-.44.86-.61 1.25a18.3 18.3 0 0 0-5.49 0 12.6 12.6 0 0 0-.62-1.25.08.08 0 0 0-.08-.04 19.7 19.7 0 0 0-4.88 1.52.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.06 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .09-.03c.46-.63.87-1.3 1.22-1.99a.08.08 0 0 0-.04-.1 13.1 13.1 0 0 1-1.87-.9.08.08 0 0 1-.01-.12l.37-.29a.07.07 0 0 1 .08-.01c3.93 1.8 8.18 1.8 12.06 0a.07.07 0 0 1 .08.01c.12.1.25.2.37.29a.08.08 0 0 1-.01.13 12.3 12.3 0 0 1-1.87.9.08.08 0 0 0-.04.1c.35.7.76 1.36 1.23 1.99a.08.08 0 0 0 .08.03 19.8 19.8 0 0 0 6-3.03.08.08 0 0 0 .03-.05c.5-5.18-.84-9.67-3.55-13.66a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.95-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42Z" />
            </svg>
          </a>
          <Link
            to="/cart"
            className="relative inline-flex h-11 w-11 items-center justify-center text-[#1a1016] no-underline"
            aria-label={cartCountLabel(totalQuantity)}
            aria-controls={CART_DRAWER_ID}
            aria-haspopup="dialog"
            onClick={(event) => openDialogFromLinkClick(event, CART_DRAWER_ID)}
          >
            <span className="relative inline-flex">
              {dropping ? <span className="pgc-bag-item" /> : null}
              <svg width="28" height="26" viewBox="0 0 28 26" fill="none" aria-hidden="true">
                <path
                  d="M9 8.5V7a5 5 0 0 1 10 0v1.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M5.2 9.2h17.6l-1.1 12.2a2 2 0 0 1-2 1.8H8.3a2 2 0 0 1-2-1.8L5.2 9.2Z"
                  fill="#fff"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path d="M5.2 13.2h17.6" stroke="currentColor" strokeWidth="1.4" />
                <path d="M13.2 13.2v6.2" stroke="#c2186a" strokeWidth="1.4" />
              </svg>
            </span>
            {totalQuantity > 0 ? (
              <span className="absolute top-1 right-0 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c2186a] px-1 text-[10px] text-white">
                {totalQuantity}
              </span>
            ) : null}
          </Link>
        </nav>
      </div>
    </header>
  );
}
