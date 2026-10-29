import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import { BRAND_NAME, INSTAGRAM_URL } from "~/lib/brand";
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
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
        <Link to="/" className="text-sm font-black tracking-wide text-[#1a1016] no-underline">
          {BRAND_NAME}
        </Link>
        <nav className="flex items-center gap-4">
          <a href={INSTAGRAM_URL} className="text-[#c2186a]" aria-label="Instagram">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
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
