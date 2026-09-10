import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * The sitemap, generated at build time.
 *
 * This works under `output: "export"`. A `sitemap.ts` compiles to an app
 * Route Handler, and Next marks metadata routes as force-static and writes
 * the response body straight to `out/sitemap.xml` — the trailing-slash
 * `index.html` rewrite that applies to pages is skipped for route handlers,
 * so the file lands at the URL Google expects rather than at
 * `/sitemap.xml/index.html`.
 * See node_modules/next/dist/export/index.js (`isAppRouteHandler`) and
 * node_modules/next/dist/export/routes/app-route.js.
 *
 * URLs carry the trailing slash because `trailingSlash: true` is what the
 * site actually serves; a sitemap listing the slashless form would send
 * every crawl through a redirect that a static host may not even perform.
 *
 * `lastModified` is the build date. There is no CMS and no per-page
 * timestamp to draw on, and inventing a per-URL date would be a lie told to
 * a crawler that checks.
 */
/*
  Required under `output: "export"`, and NOT added for you.
  `sitemap.ts` compiles to an app Route Handler, and Next's static export
  refuses any route handler that has not opted in — the dev server returns a
  500 with `export const dynamic = "force-static" ... not configured on route
  "/sitemap.xml" with "output: export"`. The metadata-route loader injects
  `force-static` only for the static *image* conventions, not for
  sitemap/robots (see getDynamicTextRouteCode and getSingleSitemapRouteCode in
  node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js),
  but it does re-export any route config you declare here, so declaring it
  is what makes the file work.
*/
export const dynamic = "force-static";

const lastModified = new Date();

/**
 * Priorities are relative, not absolute — they only rank these ten URLs
 * against each other. Division landing pages sit above their sub-pages;
 * the enquiry form sits lowest because it is a destination, not an answer.
 */
const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/engineering/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/renewables/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/manpower/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/engineering/elevators/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/engineering/generators/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/engineering/services/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/", priority: 0.6, changeFrequency: "yearly" },
  { path: "/contact/", priority: 0.6, changeFrequency: "yearly" },
  { path: "/enquiry/", priority: 0.5, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
