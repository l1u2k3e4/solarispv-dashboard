# Elektro Sternhoff – Website

Next.js 14 + Tailwind + Sanity v3 + Vercel. Bochum-Hauptsitz + Castrop-Filiale.

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

## Verweise

- Root-Kontext: `CLAUDE.md`
- Roadmap: `PROJEKTPLAN.md`
- Subagenten: `.claude/agents/`
- Strategie-Brief: `../analyse/06-strategie/strategie-brief.md`
