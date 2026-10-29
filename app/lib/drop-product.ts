import { createProductComponents } from "@shopify/hydrogen/react";

import type { Route } from "../routes/+types/home";

export type DropProduct = NonNullable<
  Route.ComponentProps["loaderData"]["drop"][number]["product"]
>;

export const { ProductProvider, useProductForm } = createProductComponents<DropProduct>();
