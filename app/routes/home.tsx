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
      playgirlzKeychain: product(handle: "playgirlz-keychain") {
        ...DropProduct
      }
      lollipopKeychain: product(handle: "lollipop-keychain") {
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
    key: "clubGirl",
    handle: "club-girl-sticker",
    name: "Play Girls Club",
    price: "$5",
    detail: "One sticker",
    stock: "25 stickers",
    image: "/brand/stickers/club-girl.jpg",
    imagePosition: "center",
  },
  {
    key: "lollipop",
    handle: "lollipop-sticker",
    name: "Lollipop",
    price: "$5",
    detail: "One sticker",
    stock: "25 stickers",
    image: "/brand/stickers/lollipop.jpg",
    imagePosition: "center",
  },
  {
    key: "cherries",
    handle: "cherries-sticker",
    name: "Cherries",
    price: "$5",
    detail: "One sticker",
    stock: "25 stickers",
    image: "/brand/stickers/cherries.jpg",
    imagePosition: "center",
  },
  {
    key: "bunnyGirl",
    handle: "bunny-girl-sticker",
    name: "Bunny Girl",
    price: "$5",
    detail: "One sticker",
    stock: "25 stickers",
    image: "/brand/stickers/bunny-girl.jpg",
    imagePosition: "center",
  },
  {
    key: "orchids",
    handle: "orchid-sticker",
    name: "Orchid",
    price: "$5",
    detail: "One sticker",
    stock: "25 stickers",
    image: "/brand/stickers/orchids.jpg",
    imagePosition: "center",
  },
  {
    key: "bunnyHeart",
    handle: "bunny-heart-sticker",
    name: "Heart Bunny",
    price: "$5",
    detail: "One sticker",
    stock: "25 stickers",
    image: "/brand/stickers/bunny-heart.jpg",
    imagePosition: "center",
  },
] as const;

export function meta() {
  return [
    { title: `${BRAND_NAME} — ${DROP_DATE} drop` },
    {
      name: "description",
      content:
        "Play Girlz Club is Zena’s product world. A birthday drop of stickers and keychains.",
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
      product: item.key === "stickerPack" ? (data?.stickerPack ?? null) : null,
    })),
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1 bg-[#fff7fb] text-[#1a1016]">
      <section className="relative z-20 w-full">
        <div className="relative mx-auto min-h-[46rem] max-w-6xl px-5 py-12 md:py-16">
          <h1 className="pointer-events-none relative z-30 max-w-xl text-[clamp(4.75rem,7vw,8rem)] leading-[0.82] font-black tracking-tight whitespace-nowrap">
            PLAY
            <br />
            <GirlzBurst />
            <br />
            CLUB
          </h1>
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

      <section id="drop" className="mx-auto max-w-6xl px-5 py-8 md:py-16">
        <h2 className="mb-8 text-5xl leading-none font-black tracking-tight uppercase md:text-7xl">
          For the <span className="pgc-girlz text-[#c2186a]">baddies</span>
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {loaderData.drop.map((item) => (
            <DropProductCard key={item.handle} item={item} />
          ))}
        </div>
      </section>

      <HeartShower>
      <section id="about" className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-28 md:grid-cols-2 md:py-40">
        <img
          src="/brand/xena.jpg"
          alt="Xena"
          className="aspect-square w-full rounded-[2rem] object-cover"
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
      <section className="mx-auto grid max-w-6xl grid-cols-3 gap-4 px-5 pt-8 pb-40 md:pb-56" aria-label="Gallery">
        <img src="/brand/hero.jpg" alt="" className="col-span-2 row-start-1 h-72 w-full rounded-3xl object-cover md:h-96" />
        <img src="/brand/portrait.jpg" alt="" className="col-start-3 row-start-1 h-72 w-full rounded-3xl object-cover md:h-96" />
        <img src="/brand/stickers/club-girl.jpg" alt="" className="col-start-1 row-start-2 h-72 w-full rounded-3xl object-cover md:h-96" />
        <img src="/brand/wordmark.png" alt="" className="col-span-2 col-start-2 row-start-2 h-72 w-full rounded-3xl bg-[#1a1016] object-cover md:h-96" />
      </section>
    </main>
  );
}
