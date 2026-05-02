# Solaris PV — Website (Moers · Niederrhein)

Next.js 14 + Tailwind 3 + Sanity v3 + Vercel. Inhaber **Andreas Mellies**, Bürostandort Grünbergstr. 39a, 47445 Moers.

> **Repo-Hinweis:** Aus dem Sternhoff-Build geforked. Single Source of Truth für Brand und Identität ist `CLAUDE.md` + `PROJEKTPLAN.md` + `~/Documents/Jobs/SolarisPv/_solaris-stammdaten.md` + `~/Documents/Jobs/SolarisPv/Memory.md`.

## Stand

Nach **Prompt 11 — Visuelle Verifikation** (2026-05-02) + Logo-Tausch ad hoc:
- Stammdaten verifiziert (NAP, USt-IdNr, Geo)
- 18/18 Pages bauen grün, 6 P1-Standortseiten als SSG (`/photovoltaik/{moers,neukirchen-vluyn,kamp-lintfort,rheinberg,voerde,niederrhein}`)
- Impressum + Datenschutz angelegt (Berufshaftpflicht + DS-Re-Generation als BLOCKER vor Live-Gang markiert)
- Sanity-Schema + `.env.production` Sternhoff-Reste gefixt
- DOM-Leak-Check: **0 Treffer** auf 12 Routen, alle HTTP 200
- Schema.org JSON-LD verifiziert: 5 Blöcke pro Standortseite mit komplettem Solaris-NAP
- Logo `/logo.jpg` (2744×900, neu vom User) in allen 5 Code-Stellen aktiv
- Production-Server `:3010` für interne Mellies-Vorschau bereit

Blocker für Live-Gang siehe `~/Documents/Jobs/SolarisPv/_offene-fragen.md` §B1–B5.
Phase 3 (UI-Refresh, Prompts 12–16) wartet — siehe `~/Documents/Jobs/SolarisPv/Prompts/00_README.md` §Phase 3.

## Setup

```bash
cp .env.local.example .env.local
# .env.local mit Sanity-Project-ID + restlichen Werten füllen
npm install --legacy-peer-deps
npm run dev
```

Studio: `http://localhost:3000/studio` · App: `http://localhost:3000`

## Befehle

- `npm run dev` — Dev-Server (Hot-Reload)
- `npm run build` — Produktion-Build
- `npm run start` — Produktion-Server starten (nach Build)
- `npm run lint` — ESLint

## Deploy

```bash
vercel --prod
```

Region: `fra1` (Frankfurt, DSGVO + Latenz). Konfiguriert in `vercel.json`.
**Vor dem ersten Production-Deploy:** Alle 5 BLOCKER aus `_offene-fragen.md` mit Mellies klären.

## Verweise

- Root-Kontext: [`CLAUDE.md`](./CLAUDE.md)
- Roadmap: [`PROJEKTPLAN.md`](./PROJEKTPLAN.md)
- Subagenten: [`.claude/agents/`](.claude/agents/) (TODO P10: Re-Briefing für Solaris-PV-Kontext)
- Stammdaten (Single Source of Truth): `~/Documents/Jobs/SolarisPv/_solaris-stammdaten.md`
- Offene Fragen an Mellies: `~/Documents/Jobs/SolarisPv/_offene-fragen.md`
- Strategie-Brief: `~/Documents/Jobs/SolarisPv/analyse/06-strategie/strategie-brief.md`
- Brand-Tokens + WCAG-Kontrast-Matrix: `~/Documents/Jobs/SolarisPv/_brand-tokens.md`

## Wichtige Dateien

- [`src/lib/demo-data.ts`](./src/lib/demo-data.ts) — Single Source of Truth für Content (Stammdaten, Services, Hersteller, FAQs, Standortseiten)
- [`src/lib/seo/schema.ts`](./src/lib/seo/schema.ts) — JSON-LD Helpers (LocalBusiness, FAQPage, Service, BreadcrumbList, WebPage)
- [`src/app/photovoltaik/[stadt]/page.tsx`](./src/app/photovoltaik/[stadt]/page.tsx) — dynamische Standortseiten (6 P1-Slugs als SSG)
- [`src/app/style-guide/page.tsx`](./src/app/style-guide/page.tsx) — Token-Visualisierung (dev-only, Production noindex + 404)

> **Historische Reports** (`DEPLOY.md`, `INIT-REPORT.md`, `DEMO-BUILD-REPORT.md`) stammen aus dem Sternhoff-Build und sind als „Sternhoff-historisch" markiert — nicht aktiv.
