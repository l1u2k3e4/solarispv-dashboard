# Solaris PV – Website (Moers / Niederrhein)
## Root-Kontext für Claude Code

> Diese Datei ist der zentrale Kontext-Anker. Lies sie als Erstes in jeder Session, bevor du irgendetwas anderes tust.
>
> **Hinweis:** Dieses Repo wurde aus dem Sternhoff-Build geforked (Commit-Historie + `.env.production`-Reste enthalten teils noch `elektro-sternhoff.de`). Single Source of Truth für Brand/Identität ist diese Datei + `~/Documents/Jobs/SolarisPv/Memory.md`.

---

## 1. Projektidentität

**Kunde:** Solaris PV (Andreas Mellies)
**Inhaber:** Andreas Mellies (Gründer, alleinverantwortlich — Einzelunternehmer / e.K. / GmbH ❓ TODO P10 verifizieren)
**Bürostandort (Marketing- + SEO-NAP):** Grünbergstr. 39a, 47445 Moers
**Sitz Impressum:** Birkenstr. 12, 47447 Moers
**Telefon:** ❓ TODO P10 (Platzhalter `+49 2841 ____` in `src/lib/seo/schema.ts`)
**E-Mail:** `info@solarispv.de` (zu verifizieren)
**Live-URL (alt):** https://www.solarispv.de/
**Impressum (NAP-Quelle):** https://www.solarispv.de/impressum/
**HRB / HWK / USt-IdNr:** ❓ TODO P10 (mit Mellies klären)
**Service-Region:** Moers, Krefeld, Duisburg, gesamter Niederrhein

**Projektziel:** Komplette Neuentwicklung der Website mit Fokus auf:
1. Lokale Marktführer-SEO für **Moers + Niederrhein** (Wettbewerb: TASK-FORCE SolarEnergy, Gebrüder Queitsch, Cellix Energy — siehe `analyse/04-konkurrenz-tief/`)
2. Vollständige Conversion-Strecke (WhatsApp · Calendly · Formular · Telefon)
3. Operative Entlastung von Andreas Mellies durch Lead-Inbox-Dashboard + Chatbot
4. Substanzielle Qualitäts-Steigerung gegenüber dem alten WordPress-Build (Audit-Score 2,0/10 — siehe `analyse/02-audit/audit-report.md`)

**Service-Modell (wichtig für alle Architektur-Entscheidungen):**
Andreas Mellies pflegt die Website-Inhalte NICHT selbst. Luke / die Agentur ist dauerhaft zuständig für Content-Updates, Förder-Stände, Blog-Artikel, Bewertungs-Mailing, Schema-Pflege und SEO-Anpassungen. Mellies (ggf. Bürokraft) nutzt ausschließlich die **Lead-Inbox** (`/admin/inbox`) zur Bearbeitung eingehender Anfragen. Daraus folgt:
- Sanity Studio ist ein **internes** Tool für Luke, nicht für Mellies. UX kann technischer sein.
- Self-Service-Annahmen ("Mellies klickt selbst auf Publish") sind ungültig.
- Lead-Inbox dagegen MUSS so einfach sein, dass Mellies / Bürokraft sie ohne Schulung bedient.

**Inhaltliche USPs (laut Konkurrenz-Tiefenanalyse / Strategie-Brief):**
1. „Meister mit Gesicht" — Anti-Konzern-Frame als ungenutzte Marktlücke (Mellies persönlich, kein anonymes Sales-Team)
2. Hersteller-Tiefe mit ehrlichen Empfehlungen (versteckter USP)
3. Klar-Preis-Konfigurator + Förder-Live-Tracker als doppelter Lead-Magnet

---

## 2. Tech-Stack (final, nicht ohne Lukes OK ändern)

| Schicht | Technologie | Begründung |
|---|---|---|
| Framework | **Next.js 14** (App Router, Server Components, ISR) | SSR/SSG für 50+ Standortseiten, Metadata-API, AI-Overviews-ready |
| Sprache | TypeScript (strict) | Typensicherheit, Refactoring-Sicherheit |
| Styling | Tailwind CSS + shadcn/ui (Komponenten manuell kopiert wegen Tailwind-3-Stack) + Framer Motion | Schnelle Entwicklung, konsistentes Design, Animationen ohne Schmerz |
| Schrift | **Inter** (Body, `--font-sans`) + **Manrope** (Display/Headings, `--font-display`) via `next/font/google` | Variable-Font-Pairing, self-hosted durch Next, DSGVO-konform. Vorgänger Source Sans 3 in Prompt 09 abgelöst. |
| Brand-Farben | Primary `#f47603` (Solaris-Orange) · Accent `#02152a` (Navy) — siehe `_brand-tokens.md` für vollständige Skala 50..900 + WCAG-Kontrast-Matrix | Aus Memory.md §Brand-Token (autoritativ aus pbminfotech-Theme) |
| CMS | **Sanity v3** (Studio embedded auf `/studio`) | Strukturierte Content-Pflege durch Luke / Agentur. Nicht für Mellies-Self-Service gedacht. |
| Validierung | Zod | Typensichere Form-Validierung + Sanity-Schema-Spiegelung |
| Icons | Lucide React | Konsistentes Icon-System, Tree-Shakable |
| Hosting | **Vercel** (Free Tier, Region fra1) | Native Next.js-Integration, ISR + Image-Optimization out-of-the-box |
| Repo | GitHub (privat) | Standard, CI/CD über Vercel-Integration |
| Monitoring | Vercel Analytics + Google Search Console + GA4 | SEO-Tracking + Core Web Vitals |
| E-Mail-Versand (Forms) | Resend | DSGVO-tauglich, einfache API |
| Lead-Inbox (Phase 2) | n8n + Telegram + Sanity-Backend | Real-time-Push an Mellies |

**Brand-Token im Code (Stand nach Prompt 09):**

| Token | Hex | Tailwind-Klasse | Verwendung (WCAG-konform) |
|---|---|---|---|
| solaris-500 (Primary) | `#f47603` | `bg-primary` / `bg-solaris-500` | CTA-Surface — **Text muss Navy sein** (`text-primary-foreground`, 6.51:1 ✅), nie weiß |
| solaris-700 | `#a05010` | `text-solaris-700` / `text-brand-on-white` | Orange-Text auf Weiß (5.75:1 ✅) |
| solaris-600 | `#c4600d` | `bg-primary-hover` | Hover-State |
| navy-500 | `#02152a` | `bg-accent` / `text-navy-500` (h1–h6 auto) | Headings, dunkle Surfaces, Text auf Orange |
| gray-900 | `#0f172a` | `text-foreground` | Body-Text |
| gray-600 | `#475569` | `text-muted-foreground` | Sub-Text (7.55:1 ✅) |

**Kritische Kontrast-Regel:** Orange `#f47603` auf Weiß = 2.82 ❌ AA. → CTA-Buttons IMMER `bg-primary text-primary-foreground` (Navy auf Orange), Orange-Text als `text-solaris-700`. Vollständige Matrix in `_brand-tokens.md` §3.

**Warum NICHT Vite (wie WIGRO):** Kein SSR → schwaches SEO bei vielen Standortseiten.

**Warum NICHT WordPress:** Performance, Security, Wartung — die alte solarispv.de-Site auf pbminfotech-Theme ist exemplarisch dafür (Audit-Score 2,0/10).

---

## 3. Skill-Stack (lokal in Claude Code installiert)

`superpowers` ist Default-Helper für ALLE Tasks — wird in jeder Session standardmäßig geladen, nicht pro Subagent neu aufgerufen. Skills liegen **global in `~/.claude/skills/`** (siehe Memory.md §3 für komplette Liste + Tool-Mapping).

| Skill | Quelle | Hauptzweck |
|---|---|---|
| **firecrawl** + CLI | firecrawl.dev | Web-Scraping (Crawl/Map/Extract) |
| **find-skills** | github.com/vercel-labs/skills | Meta-Skill, Fallback für fehlende Skills |
| **frontend-design** | github.com/anthropics/skills | Frontend-Patterns, Komponenten-Audit |
| **ui-ux-pro-max** | github.com/nextlevelbuilder/ui-ux-pro-max-skill | UX/UI-Heuristiken, Conversion |
| **web-design-guidelines** | github.com/vercel-labs/agent-skills | Web-Design Best Practices, Kontrast-Regeln |
| **seo-audit** | github.com/coreyhaines31/marketingskills | Strukturierter SEO-Audit |
| **seo-geo** | github.com/resciencelab/opc-skills | Local/Geo SEO |
| **ai-seo** | github.com/coreyhaines31/marketingskills | AEO/AI-Search-Optimierung |
| **taste-skill** | github.com/Leonxlnx/taste-skill | Ästhetik/Geschmack |
| **superpowers** + 14 Sub-Skills (brainstorming, writing-plans, dispatching-parallel-agents, …) | github.com/obra/superpowers | Default-Helper für alle Agenten |
| **autoresearch** | github.com/karpathy/autoresearch (Tool in `~/Documents/Programme/Tools/`) | Strukturierte Recherche |
| **notebooklm-py** | github.com/teng-lin/notebooklm-py (Tool) | Audio-Briefings für Mellies |

**Aktivierung:** Jeder Subagent lädt seine fest zugewiesenen Skills (siehe Subagent-Definition). Bei nicht-zugewiesenen Skills gilt `find-skills` als Fallback.

---

## 4. Subagenten-Architektur

### Kern-Agenten (persistent, immer ansprechbar)

| Agent | Datei | Verantwortung |
|---|---|---|
| **seo-architect** | `.claude/agents/seo-architect.md` | Lokale SEO, Schema.org, Meta-Tags, Standortseiten-Briefing, GSC |
| **ux-builder** | `.claude/agents/ux-builder.md` | Tailwind-Komponenten, Section-Layouts, Conversion, A11y, Performance |
| **content-writer** | `.claude/agents/content-writer.md` | Texte für Standortseiten, Service, Blog, FAQ, Tonalität |

### Dynamische Spezialisten (pro Task instanziiert, in `.claude/agents/specialists/`)

- **firecrawl-runner** — Wettbewerber-Re-Scrapes
- **schema-validator** — JSON-LD-Validierung (Schema.org + Google Rich Results)
- **lighthouse-auditor** — Performance vor Releases
- **cms-migrator** — Sanity-Schema + Content-Migration
- **chatbot-engineer** — n8n + Pinecone-RAG (Phase 2)

**Aufruf-Pattern:** Bei einer neuen Aufgabe entscheidet der Hauptkontext, welcher Kern-Agent + ggf. welcher Spezialist gebraucht wird. Spezialisten werden via Skill-Aktivierung + Briefing instanziiert.

⚠️ **Hinweis:** Die `.claude/agents/`-Definitionen wurden noch nicht von Sternhoff-Bezügen befreit (TODO P10). Bei Neuanlage / Re-Briefing eines Agenten den Solaris-Kontext explizit mitgeben, bis die Definitionen rebrandet sind.

---

## 5. Coding-Standards

### Sprache & Stil
- TypeScript strict-mode, keine `any` ohne Begründung
- ESLint + Prettier (Default Next.js-Config)
- Komponenten als Server Components per Default; nur `'use client'` wo nötig (Forms, Interaktivität)
- Funktionale Komponenten + React Hooks (keine Klassen-Komponenten)

### Komponenten-System
- **Atomic Design** in `src/components/`:
  - `ui/` — shadcn-Komponenten (Button, Input, Card, …)
  - `sections/` — wiederverwendbare Site-Sections (Hero, TrustBar, ServiceGrid, …)
  - `layout/` — Header, Footer, Navigation, Logo
- **Naming:** PascalCase für Komponenten, kebab-case für Files. `HeroSection.tsx` exportiert `HeroSection`.

### Styling
- Tailwind-First, keine globalen CSS-Files außer `globals.css` für Design-Tokens
- Custom-Theme in `tailwind.config.ts`, nicht inline
- **NIEMALS Hex-Hardcoding** in Komponenten — immer Tailwind-Token (`bg-primary`, `text-foreground`) oder CSS-Var (`var(--color-primary)`). Erlaubt nur in `tailwind.config.ts`, `globals.css`, `layout.tsx#themeColor`, `style-guide/page.tsx` (Doku-Demo) und für externe Brand-Farben (z. B. WhatsApp `#25D366`).
- Dark-Mode optional (Phase 2)
- Token-Visualisierung in `/style-guide` (dev-only, `notFound()` in Production)

### Routing & SEO
- App Router mit Route-Groups: `(marketing)/` für öffentliche Seiten, `admin/` für Inbox
- Jede Route exportiert `generateMetadata()` — keine inline-Meta-Tags
- Schema.org JSON-LD über `lib/seo/schema.ts`-Helpers, niemals inline-`<script>`
- `sitemap.ts` + `robots.ts` aus dem App Router

### State & Daten
- Sanity-Queries in `lib/sanity/queries.ts` (zentralisiert)
- Server-Actions für Forms (kein Client-Fetch von API-Routes wo vermeidbar)
- Zod-Schemas für jede Form + jede Sanity-Query

### Tests
- Phase 1: Smoke-Tests für kritische Pfade (`npm run build` muss durchlaufen, Lighthouse 90+)
- Phase 2: Vitest + React Testing Library für Lead-Inbox-Logik

---

## 6. Definition of Done (pro Phase)

### Phase 1 (Launch-Site)
- [ ] Lighthouse Mobile: Performance ≥ 90, Accessibility ≥ 95, SEO 100
- [ ] Alle Standortseiten haben LocalBusiness-Schema (`localBusinessSchema()` aus `lib/seo/schema.ts`)
- [ ] Alle Service-Seiten haben FAQ-Schema (mind. 3 FAQs)
- [ ] AggregateRating-Schema auf Startseite (sobald Bewertungen ≥ 5)
- [ ] Sitemap.xml + robots.txt generiert
- [ ] GSC + GA4 angebunden, erste Crawl-Daten da
- [ ] Calendly + WhatsApp-Sticky live, getestet auf Mobile
- [ ] Förder-Beratungs-Formular triggert Mail an Mellies-Büro
- [ ] Sanity Studio läuft, Mellies hat Login-Daten (Lead-Inbox-Login, NICHT Studio-Self-Service)
- [ ] Logo-Vector-Redraw mit Mellies abgeschlossen (aktuell PNG-Wrapper als Übergang)

### Phase 1.5 (Polish & Conversion)
- [ ] Klar-Preis-Konfigurator live (PV-Rechner mit echten Zahlen + Förder-Tracker)
- [ ] 5 Blog-Artikel veröffentlicht (PV-/Förder-/Hersteller-Themen)
- [ ] Bewertungs-Widget live
- [ ] Karriere-Seite live, JobPosting-Schema gesetzt

### Phase 2 (Lead-Inbox + ROI + Chatbot)
- [ ] `/admin/inbox`-Dashboard zeigt eingehende Leads in Echtzeit
- [ ] Lead-Inbox-UX mit Mellies / Bürokraft getestet (kein Tutorial nötig, intuitiv bedienbar)
- [ ] n8n-Workflow pusht neue Anfragen nach Telegram + WhatsApp Business
- [ ] ROI-Rechner Wallbox + PV live, Ergebnis-Mail an Mellies + Lead
- [ ] Chatbot mit Pinecone-RAG live (Knowledge-Base = Service-Seiten + FAQs)

---

## 7. Wartungs-Runbooks

### Was Mellies / Bürokraft NUTZEN (einziger Touchpoint)

**Lead-Inbox: `/admin/inbox`**
1. Login mit persönlichem Account (Magic-Link via E-Mail)
2. Neue Anfragen erscheinen oben mit Kanal-Tag (Formular / WhatsApp / Chatbot / Calendly)
3. Pro Lead: Status setzen (`Neu` → `In Arbeit` → `Erledigt`), Notiz hinzufügen, Telegram-Push an Mellies
4. Phase 2: KI-Antwort-Vorschlag wird angezeigt → Mellies / Bürokraft wählt `Senden` / `Bearbeiten` / `Verwerfen`

> Mellies / Bürokraft brauchen für nichts anderes auf dieser Seite Login-Daten. Inhalte, Texte, Bewertungen, Förder-Updates → Luke.

### Was Luke / Agentur LAUFEND PFLEGT (Service-Aufgaben)

| Aufgabe | Frequenz | Tool |
|---|---|---|
| Förder-Stände aktualisieren (KfW, BAFA, NRW) | quartalsweise | Sanity Studio |
| Blog-Artikel produzieren | 1–2 / Monat (laut Service-Vertrag) | content-writer + Sanity |
| Standortseiten erweitern / re-prüfen | halbjährlich | Sanity Studio |
| Service-Texte aktualisieren | bei Bedarf (Preis-/Leistungs-Änderungen) | Sanity Studio |
| Google-Bewertungen-Mailing an Bestandskunden | monatlich (nach Kunden-Liste von Mellies) | externes Mail-Tool |
| Schema-Validierung (Google Rich Results) | nach jedem Sanity-Update + monatlich | schema-validator |
| GSC + GA4 + Lighthouse-Reports | wöchentlich (Phase 1.5–2), dann monatlich | Reports nach `analyse/07-monitoring/` |
| Sicherheits-/Dependency-Updates | monatlich | `npm audit` + Vercel-Logs |

### Sanity-Content ändern (intern, durch Luke)
1. `https://www.solarispv.de/studio` öffnen (Luke-Account)
2. Document auswählen, ändern, „Publish"
3. ISR-Revalidate löst nach 60s aus, Site ist aktualisiert

### Neue Standortseite anlegen (intern, durch Luke)
1. seo-architect-Briefing erstellen (Keywords, lokale Substanz)
2. content-writer schreibt Markdown nach `content/standortseiten/<slug>.md`
3. cms-migrator pusht in Sanity
4. schema-validator prüft LocalBusiness-Schema (`localBusinessSchema(standort)` aus `lib/seo/schema.ts`)
5. Auf Vercel deployt → indexieren via GSC

### Lead-Inbox bei Ausfall
1. n8n-Logs in `n8n.solarispv.de/executions` prüfen
2. Telegram-Bot-Token in `.env.local` testen
3. Fallback: Sanity-Backend speichert Leads weiterhin, manuelles Review im Studio durch Luke; Mellies / Bürokraft bekommen Anfragen übergangsweise per E-Mail-Forward

### Deploy
- Auto-Deploy bei push auf `main` via Vercel
- Manueller Deploy: `vercel --prod`
- Preview-Deploy bei jedem Branch automatisch

---

## 8. Strikte Regeln (rote Linien)

1. **Niemals den `public-sternhoff-backup-*/`-Ordner committen oder reaktivieren.** Das ist das Asset-Backup vor der Solaris-Migration (Prompt 08). Read-Only, gitignored.
2. **Niemals direkt auf `main` pushen ohne Build-Check.** `npm run build` muss grün sein.
3. **Niemals Sanity-Schemas in Production löschen, nur deprecaten** (`hidden: true`).
4. **Niemals Personen-Daten committen** (Lead-Daten, Kunden-E-Mails). `.env.local` ist gitignored.
5. **Niemals Stamm-Daten dieser CLAUDE.md ändern, ohne Luke** zu fragen — sie sind die Single Source of Truth (zusammen mit `~/Documents/Jobs/SolarisPv/Memory.md`).
6. **Niemals Hex-Werte hardcoden** in Komponenten. Pflicht-Tokens via Tailwind oder CSS-Var. Ausnahmen siehe §5 Styling.
7. **CTA-Buttons IMMER mit `bg-primary text-primary-foreground`** — Navy-Text auf Orange. Weiß auf Orange ist WCAG-AA-Fail (2.82:1).
8. **Niemals ungefragt Inhalte/Strings ändern, die noch Sternhoff-Bezug haben** — diese sind Aufgabe von Prompt 10 (Content-Migration). Mock-Daten und SEO-Defaults zählen dazu.

---

## 9. Verweise

- **Prompt-Pipeline (alle Analyse + Migrations-Prompts):** `~/Documents/Jobs/SolarisPv/Prompts/00_README.md`
- **Memory (autoritativ):** `~/Documents/Jobs/SolarisPv/Memory.md` (§7 Prompt-Run-Tabelle, §Brand-Token, §3 Skill-Tool-Mapping)
- **Brand-Tokens + Kontrast-Matrix:** `~/Documents/Jobs/SolarisPv/_brand-tokens.md`
- **Strategie-Brief:** `~/Documents/Jobs/SolarisPv/analyse/06-strategie/strategie-brief.md` (Solaris-zentriert nach Konkurrenz-Synthese)
- **Audit-Report:** `~/Documents/Jobs/SolarisPv/analyse/02-audit/audit-report.md`
- **Konkurrenten-Tiefenanalyse:** `~/Documents/Jobs/SolarisPv/analyse/04-konkurrenz-tief/synthese.md`
- **Keyword-Map:** `~/Documents/Jobs/SolarisPv/analyse/05-keywords/keyword-map.md`
- **Asset-Migration-Plan (Prompt 08):** `~/Documents/Jobs/SolarisPv/analyse/08-asset-migration/_migration-plan.md`
- **NotebookLM Audio-Briefing für Mellies:** `~/Documents/Jobs/SolarisPv/analyse/04-konkurrenz-tief/notebooklm/audio-briefing-mellies.mp3`
- **Subagenten:** `.claude/agents/` ⚠️ noch Sternhoff-Bezug, P10-TODO
- **Projektplan + Roadmap:** `./PROJEKTPLAN.md` ⚠️ noch Sternhoff-Bezug, P10-TODO

---

**Letzte Änderung:** 2026-05-01 (Prompt 09 — Branding-Migration aus Logo)
**Verantwortlich:** Luke Kozik
