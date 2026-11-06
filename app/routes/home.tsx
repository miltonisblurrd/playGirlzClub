import { gql } from "@shopify/hydrogen";

import { DropProductCard } from "~/components/DropProductCard";
import { GirlzBurst } from "~/components/GirlzBurst";
import { MarqueeBanner } from "~/components/MarqueeBanner";
import { ScrollCue } from "~/components/ScrollCue";
import { HeartShower } from "~/components/HeartShower";
import { HeroCollage } from "~/components/HeroCollage";
import { StoryFill } from "~/components/StoryFill";
import { BRAND_NAME, DROP_DATE, EMAIL, INSTAGRAM_URL } from "~/lib/brand";
import { storefrontClientContext } from "~/lib/storefront";

import type { Route } from "./+types/home";

const DROP_VARIANT_FRAGMENT = gql(`
  fragment DropVariant on ProductVariant {
    id
    availableForSale
    quantityAvailable
    title
    price {
      amount
      currencyCode
    }
    selectedOptions {
      name
      value
    }
    product {
      title
      handle
    }
  }
`);

const DROP_PRODUCT_FRAGMENT = gql(
  `
  fragment DropProduct on Product {
    id
    handle
    title
    availableForSale
    requiresSellingPlan
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      optionValues {
        name
      }
    }
    selectedOrFirstAvailableVariant(
      selectedOptions: $selectedOptions
      ignoreUnknownOptions: true
      caseInsensitiveMatch: true
    ) {
      ...DropVariant
    }
    adjacentVariants(selectedOptions: $selectedOptions) {
      ...DropVariant
    }
  }
`,
  [DROP_VARIANT_FRAGMENT],
);

const DROP_QUERY = gql(
  `
    query DropProducts($selectedOptions: [SelectedOptionInput!]!) {
      stickerPack: product(handle: "sticker-pack") {
        ...DropProduct
      }
      holographicSticker: product(handle: "holographic-pgc-sticker") {
        ...DropProduct
      }
    }
  `,
  [DROP_PRODUCT_FRAGMENT],
);

const DROP = [
  {
    key: "stickerPack",
    handle: "sticker-pack",
    name: "Sticker Pack",
    price: "$12",
    detail: "Pack of six",
    stock: "25 packs",
    image: "/brand/stickers/sticker-pack.jpg",
    imagePosition: "center",
  },
  {
    key: "holographicSticker",
    handle: "holographic-pgc-sticker",
    name: "Holographic Sticker",
    price: "$5",
    detail: "One sticker",
    stock: "25 stickers",
    image: "/brand/stickers/club-girl.jpg",
    imagePosition: "center",
  },
] as const;

export function meta() {
  return [
    { title: `${BRAND_NAME} — ${DROP_DATE} drop` },
    {
      name: "description",
      content:
        "Play Girlz Club is Zena’s product world. A birthday drop of stickers.",
    },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  const storefrontClient = context.get(storefrontClientContext);
  const { data } = await storefrontClient.graphql(DROP_QUERY, {
    variables: { selectedOptions: [] },
  });

  return {
    drop: DROP.map((item) => ({
      ...item,
      product:
        item.key === "stickerPack"
          ? (data?.stickerPack ?? null)
          : (data?.holographicSticker ?? null),
    })),
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main id="main-content" tabIndex={-1} className="pgc-clouds flex-1 text-[#1a1016]">
      <section className="relative z-20 w-full overflow-x-clip">
        <div className="relative mx-auto min-h-[52rem] max-w-6xl px-5 py-12 md:min-h-[46rem] md:py-16">
          <h1 className="pointer-events-none relative z-30 max-w-xl text-[clamp(4.75rem,7vw,8rem)] leading-[0.82] font-black tracking-tight whitespace-nowrap">
            PLAY
            <br />
            <GirlzBurst />
            <br />
            CLUB
          </h1>
          <p className="pointer-events-none relative z-30 mt-6 max-w-md text-lg leading-snug font-semibold md:max-w-[14rem] md:text-xl">
            Our new sticker pack is now live, made for all the baddies!
          </p>
          <a
            href="#drop"
            className="pgc-scroll-cta pgc-shop-now pointer-events-auto relative z-30 mt-8 inline-flex h-12 items-center rounded-full px-6 text-sm font-semibold text-[#1a1016] no-underline"
          >
            Shop Our New Collection
          </a>
          <HeroCollage />
        </div>
        <ScrollCue />
        <div className="absolute inset-x-0 -bottom-10 z-30 w-full">
          <MarqueeBanner />
        </div>
      </section>

      <section id="story" className="relative overflow-x-clip px-5 py-24 md:py-36">
        <StoryFill />
      </section>

      <section id="drop" className="mx-auto max-w-6xl px-5 pt-24 pb-8 md:py-16">
        <h2 className="mb-8 text-5xl leading-none font-black tracking-tight uppercase md:text-7xl">
          For the <span className="pgc-girlz text-[#c2186a]">baddies</span>
        </h2>
        <div className="grid gap-8 sm:grid-cols-2">
          {loaderData.drop.map((item) => (
            <DropProductCard key={item.handle} item={item} />
          ))}
        </div>
      </section>

      <HeartShower>
      <section id="about" className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-20 md:grid-cols-2 md:py-28">
        <img
          src="/brand/xena.jpg"
          alt="Xena"
          className="aspect-square w-full rounded-[2rem] border-2 border-[#f3aacb] object-cover"
        />
        <div>
          <p className="text-sm font-semibold tracking-[0.22em] text-[#c2186a] uppercase">Founder</p>
          <h2 className="mt-3 text-5xl font-black tracking-tight">XENA</h2>
          <p className="mt-6 text-lg leading-relaxed text-[#4a3040]">
            Xena started Play Girlz Club so the name could stand apart from the nail work. The
            character, the pink, and this drop are the first public piece of that club. Her photo
            and the longer story replace this frame when she sends them.
          </p>
          <div className="mt-8 flex items-center gap-4 text-[#1a1016]">
            <a href={INSTAGRAM_URL} aria-label="Instagram" className="text-[#c2186a]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a href={`mailto:${EMAIL}`} className="text-lg font-semibold no-underline">
              {EMAIL}
            </a>
          </div>
        </div>
      </section>
      </HeartShower>
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-5 pt-6 pb-16 md:grid-cols-3 md:pb-24" aria-label="Gallery">
        <img src="/brand/hero.jpg" alt="" className="aspect-square w-full rounded-3xl border-2 border-[#f3aacb] object-cover md:col-span-2 md:row-start-1 md:aspect-auto md:h-96" />
        <img src="/brand/portrait.jpg" alt="" className="aspect-square w-full rounded-3xl border-2 border-[#f3aacb] object-cover md:col-start-3 md:row-start-1 md:aspect-auto md:h-96" />
        <img src="/brand/stickers/club-girl.jpg" alt="" className="aspect-square w-full rounded-3xl border-2 border-[#f3aacb] object-cover md:col-start-1 md:row-start-2 md:aspect-auto md:h-96" />
        <img src="/brand/wordmark.png" alt="" className="aspect-square w-full rounded-3xl border-2 border-[#f3aacb] bg-[#1a1016] object-cover md:col-span-2 md:col-start-2 md:row-start-2 md:aspect-auto md:h-96" />
      </section>
    </main>
  );
}
