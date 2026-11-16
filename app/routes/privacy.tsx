import { EMAIL } from "~/lib/brand";

import type { Route } from "./+types/privacy";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Privacy Policy — Play Girlz Club" },
    {
      name: "description",
      content: "How Play Girlz Club handles your info. We only keep what we need to send your order.",
    },
  ];
}

export default function Privacy() {
  return (
    <main id="main-content" tabIndex={-1} className="pgc-clouds flex-1 text-[#1a1016]">
      <article className="mx-auto max-w-2xl px-5 py-20 md:py-28">
        <p className="text-sm font-semibold tracking-[0.22em] text-[#c2186a] uppercase">Play Girlz Club</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight md:text-6xl">Privacy Policy</h1>
        <div className="mt-8 space-y-5 text-lg leading-relaxed">
          <p>We keep this simple. Your info is for getting your order to you, not for anything weird.</p>
          <p>
            When you shop, we collect your name, email, shipping address, and what you bought. Checkout is
            handled by Shopify. We use that info to fill the order, send updates, and answer you if you
            write us.
          </p>
          <p>We do not sell your information. We do not share it except with the services that ship and process the order.</p>
          <p>
            Questions about your info? Email{" "}
            <a href={`mailto:${EMAIL}`} className="font-semibold text-[#c2186a]">
              {EMAIL}
            </a>
            .
          </p>
        </div>
      </article>
    </main>
  );
}
