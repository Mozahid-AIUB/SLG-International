# Sahara Link Group — website

Static marketing site for **Sahara Link Group**, a Dhaka-based group of companies with three divisions:

| Division | Business | Flow |
|---|---|---|
| Sahara Link Engineering | Elevators (Sigma, Sino Hyundai, Fuji) and diesel generators (Perkins, Cummins, Ricardo, EVOL) | Equipment into Bangladesh |
| SLG Renewables | Complete solar systems — panels, inverters, storage, protection | Equipment into Bangladesh |
| Sahara Link International | Workforce placement with overseas employers | Workforce out of Bangladesh |

The group imports and distributes; it does not manufacture. Site copy reflects that throughout.

## Stack

- **Next.js 16** (App Router) with `output: "export"` — the whole site builds to plain HTML in `out/`
- **TypeScript** strict
- **Tailwind CSS v4**, tokens defined in `src/app/globals.css`
- **Archivo** (variable, `wdth` axis) self-hosted via `next/font` — one family covering display, body and spec-plate data
- No component library. Primitives are local.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export into out/
```

`out/` can be served by any static host — Netlify, Vercel, or plain shared hosting.

## Layout

```
src/
  app/           routes (13 planned, placeholders where content is pending)
  components/
    primitives/  Container and other structural pieces
    patterns/    DataPlate, PagePlaceholder
    layout/      Header, Footer
  content/       typed content data — site facts, divisions, brands
public/
  brand/         processed logos (circular alpha, WebP)
```

Content lives in `src/content` as typed data rather than inside JSX. Seven brands share one shape, so pages map over data and render templates. Adding a brand is a data entry, not a new page.

## Design notes

The visual language comes from the subject: imported industrial equipment. A cool drafting-paper ground, and a **data plate** component modelled on the engraved nameplate riveted to every generator and lift controller — square, dense, carrying origin, capacity and applications where a buyer looks first.

Division accent colours are swapped by a `data-division` attribute remapping a CSS custom property. Components never branch on division.

## Status

Home page built. Remaining routes are honest placeholders pending content — most notably Sahara Link International, for which no material has been supplied yet.
