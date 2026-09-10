import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * robots.txt, generated at build time.
 *
 * Like `sitemap.ts` this is a metadata route, so it survives
 * `output: "export"` and is written to `out/robots.txt` verbatim.
 *
 * Everything is allowed. There is no admin area, no search-result page and
 * no duplicate parameterised URL on this site, so there is nothing to fence
 * off — and a `Disallow` that serves no purpose only risks hiding a page
 * from an engine that would otherwise cite it. The AI crawlers (GPTBot,
 * ClaudeBot, PerplexityBot, Google-Extended and the rest) are covered by
 * the wildcard rule and are deliberately not blocked: being readable by
 * them is the whole point of wanting to be cited by them.
 *
 * The `Sitemap:` line is absolute, as the standard requires. No `host:` —
 * Next emits it as `Host: https://…`, but the directive is a Yandex
 * extension that expects a bare hostname, so it is noise at best.
 */
/* See the note in sitemap.ts — `output: "export"` requires this on every
   metadata route handler; Next does not add it for you. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
