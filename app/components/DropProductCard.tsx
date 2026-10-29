import { openCartDrawer } from "~/lib/cart-drawer";
import { ProductProvider, useProductForm, type DropProduct } from "~/lib/drop-product";

type DropItem = {
  handle: string;
  name: string;
  price: string;
  detail: string;
  stock: string;
  image: string;
  imagePosition: string;
  product: DropProduct | null;
};

function Details({ item }: { item: DropItem }) {
  return (
    <div className="mt-4 flex items-baseline justify-between gap-3">
      <h3 className="text-lg font-black">{item.name}</h3>
      <p className="shrink-0 font-semibold">{item.price}</p>
    </div>
  );
}

function Thumb({ item }: { item: DropItem }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#f7bfd8]">
      <img
        src={item.image}
        alt=""
        className="aspect-square w-full object-cover"
        style={{ objectPosition: item.imagePosition }}
      />
    </div>
  );
}

export function DropProductCard({ item }: { item: DropItem }) {
  const variant = item.product?.selectedOrFirstAvailableVariant;
  if (!item.product || !variant) {
    return (
      <article>
        <Thumb item={item} />
        <Details item={item} />
        <p className="mt-1 text-sm text-[#4a3040]">{item.detail}</p>
        <p className="mt-1 text-xs tracking-wide text-[#c2186a] uppercase">{item.stock}</p>
        <button
          type="button"
          className="pgc-scroll-cta mt-4 inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold text-[#1a1016]"
          disabled
        >
          Buy now
        </button>
      </article>
    );
  }

  return (
    <ProductProvider product={item.product} onSelect={() => undefined}>
      <WiredCard item={item} />
    </ProductProvider>
  );
}

function WiredCard({ item }: { item: DropItem }) {
  const { register, formProps, errors, pending, options } = useProductForm();
  const variant = item.product?.selectedOrFirstAvailableVariant;
  const soldOut = variant ? !variant.availableForSale : true;
  const left =
    variant?.quantityAvailable != null ? `${variant.quantityAvailable} left` : item.stock;

  return (
    <article>
      <Thumb item={item} />
      <Details item={item} />
      <p className="mt-1 text-sm text-[#4a3040]">{item.detail}</p>
      <form {...formProps({ afterSubmit: openCartDrawer })} className="mt-1">
        <input type="hidden" {...register("merchandiseId", {})} />
        <p className="text-xs tracking-wide text-[#c2186a] uppercase">{left}</p>
        <button
          {...register("addToCart", {})}
          disabled={soldOut || pending || !options}
          className="pgc-scroll-cta mt-4 inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold text-[#1a1016] disabled:opacity-50"
        >
          {soldOut ? "Sold out" : "Buy now"}
        </button>
        {[...errors.userErrors, ...errors.networkErrors].length ? (
          <p className="mt-3 text-sm text-red-700" role="alert">
            {[...errors.userErrors, ...errors.networkErrors].map((error) => error.message).join(" ")}
          </p>
        ) : null}
      </form>
    </article>
  );
}
