import { EMAIL } from "~/lib/brand";

import type { Route } from "./+types/shipping";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Shipping and Refunds — Play Girlz Club" },
    {
      name: "description",
      content: "Shipping and refunds for Play Girlz Club stickers.",
    },
  ];
}

export default function Shipping() {
  return (
    <main id="main-content" tabIndex={-1} className="pgc-clouds flex-1 text-[#1a1016]">
      <article className="mx-auto max-w-2xl px-5 py-20 md:py-28">
        <p className="text-sm font-semibold tracking-[0.22em] text-[#c2186a] uppercase">Play Girlz Club</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight md:text-6xl">Shipping and Refunds</h1>
        <div className="mt-8 space-y-5 text-lg leading-relaxed">
          <p>Stickers ship out after you check out. The shipping cost and an estimated delivery time show up before you pay.</p>
          <p>
            If your order shows up damaged, wrong, or never shows up, email us and we will replace it or
            refund it. That part is on us.
          </p>
          <p>
            Stickers that are still unused and in their original pack can be sent back within 14 days for a
            refund. Once a sticker is peeled and used, we cannot take it back. You cover return shipping
            unless we sent the wrong thing.
          </p>
          <p>
            Start a return or ask about an order at{" "}
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
