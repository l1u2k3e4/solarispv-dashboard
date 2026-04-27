# Elektro Sternhoff – Website (Bochum)
## Root-Kontext für Claude Code

> Diese Datei ist der zentrale Kontext-Anker. Lies sie als Erstes in jeder Session, bevor du irgendetwas anderes tust.

---

## 1. Projektidentität

**Kunde:** Elektro Sternhoff GmbH, Elektromeisterbetrieb, ca. 20 Mitarbeiter
**Geschäftsführer:** Gerhard Sternhoff
**Hauptsitz (Marketing- und SEO-Fokus):** Bessemerstr. 80, 44793 Bochum
**Filiale:** Gerther Str. 37, 44577 Castrop-Rauxel
**Telefon:** 02305 5488875 · **Mail:** info@elektro-sternhoff.de
**Live-URL (alt):** https://www.elektro-sternhoff.de/
**Impressum (NAP-Quelle):** https://www.elektro-sternhoff.de/impressum/
**HRB:** HRB-28124, Amtsgericht Dortmund
**Handwerkskammer:** HWK Münster
**USt-IdNr:** DE305753766 (Finanzamt Recklinghausen)

**Projektziel:** Komplette Neuentwicklung der Website mit Fokus auf:
1. Lokale Marktführer-SEO für Bochum + Stadtteile (sekundär: Castrop-Rauxel als Filiale)
2. Vollständige Conversion-Strecke (WhatsApp · Calendly · Formular · Telefon)
3. Operative Entlastung von Herrn Sternhoff durch Lead-Inbox-Dashboard + Chatbot
4. Substanzielle Qualitäts-Steigerung gegenüber Vorprojekten (WIGRO, Fitness Factory)

**Service-Modell (wichtig für alle Architektur-Entscheidungen):**
Sternhoff und seine Bürokraft pflegen die Website-Inhalte NICHT selbst. Luke / die Agentur ist dauerhaft zuständig für Content-Updates, Förder-Stände, Blog-Artikel, Bewertungs-Mailing, Schema-Pflege und SEO-Anpassungen. Sternhoff/Bürokraft nutzen ausschließlich die **Lead-Inbox** (`/admin/inbox`) zur Bearbeitung eingehender Anfragen. Daraus folgt:
- Sanity Studio ist ein **internes** Tool für Luke, nicht für Sternhoff. UX kann technischer sein.
- Self-Service-Annahmen ("Sternhoff klickt selbst auf Publish") sind ungültig.
- Lead-Inbox dagegen MUSS so einfach sein, dass die Bürokraft sie ohne Schulung bedient.

---

## 2. Tech-Stack (final, nicht ohne Lukes OK ändern)

| Schicht | Technologie | Begründung |
|---|---|---|
| Framework | **Next.js 14** (App Router, Server Components, ISR) | SSR/SSG für 50+ Standortseiten, Metadata-API, AI-Overviews-ready |
| Sprache | TypeScript (strict) | Typensicherheit, Refactoring-Sicherheit |
| Styling | Tailwind CSS + shadcn/ui (Komponenten manuell kopiert wegen Tailwind-3-Stack) + Framer Motion | Schnelle Entwicklung, konsistentes Design, Animationen ohne Schmerz |
| Schrift | **Source Sans 3** (via `next/font/google`, self-hosted) | Sternhoff wünschte „Myriad" — das ist Adobe-proprietär. Source Sans 3 ist Adobes eigene Open-Source-Antwort auf Myriad: visuell sehr ähnlich, kostenlos, DSGVO-konform, optimal für Web Performance. Geladene Weights: 400/600/700/900. |
| Brand-Farben | Primary `#15387D` (Königsblau) · Accent `#E30613` (Industrie-Rot) · Gray `#8C8C8C` | Direkt aus dem Sternhoff-Logo abgeleitet |
| CMS | **Sanity v3** (Studio embedded auf `/studio`) | Strukturierte Content-Pflege durch Luke / Agentur. Nicht für Sternhoff-Self-Service gedacht. |
| Validierung | Zod | Typensichere Form-Validierung + Sanity-Schema-Spiegelung |
| Icons | Lucide React | Konsistentes Icon-System, Tree-Shakable |
| Hosting | **Vercel** (Free Tier, Region fra1) | Native Next.js-Integration, ISR + Image-Optimization out-of-the-box |
| Repo | GitHub (privat) | Standard, CI/CD über Vercel-Integration |
| Monitoring | Vercel Analytics + Google Search Console + GA4 | SEO-Tracking + Core Web Vitals |
| E-Mail-Versand (Forms) | Resend | DSGVO-tauglich, einfache API |
| Lead-Inbox (Phase 2) | n8n + Telegram + Sanity-Backend | Analog WIGRO, aber besser integriert |

**Warum NICHT Vite (wie WIGRO):** Kein SSR → schwaches SEO bei vielen Standortseiten. Auf Lukes Wunsch „Next-Level"-Sprung nach oben.

**Warum NICHT WordPress:** Performance, Security, Wartung — die alte Sternhoff-Site ist exemplarisch dafür.

---

## 3. Skill-Stack (lokal in Claude Code installiert)

`superpowers` ist Default-Helper für ALLE Tasks — wird in jeder Session standardmäßig geladen, nicht pro Subagent neu aufgerufen.

| Skill | Quelle | Hauptzweck |
|---|---|---|
| **firecrawl** + CLI | firecrawl.dev | Web-Scraping (Crawl/Map/Extract) |
| **find-skills** | github.com/vercel-labs/skills | Meta-Skill, Fallback für fehlende Skills |
| **frontend-design** | github.com/anthropics/skills | Frontend-Patterns, Komponenten-Audit |
| **ui-ux-pro-max** | github.com/nextlevelbuilder/ui-ux-pro-max-skill | UX/UI-Heuristiken, Conversion |
| **web-design-guidelines** | github.com/vercel-labs/agent-skills | Web-Design Best Practices |
| **seo-audit** | github.com/coreyhaines31/marketingskills | Strukturierter SEO-Audit |
| **seo-geo** | github.com/resciencelab/opc-skills | Local/Geo SEO |
| **ai-seo** | github.com/coreyhaines31/marketingskills | AEO/AI-Search-Optimierung |
| **taste-skill** | github.com/Leonxlnx/taste-skill | Ästhetik/Geschmack |
| **superpowers** | github.com/obra/superpowers | Default-Helper für alle Agenten |
| **autoresearch** | github.com/karpathy/autoresearch | Strukturierte Recherche |
| **notebooklm-py** | github.com/teng-lin/notebooklm-py | Audio-Briefings |

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
  - `layout/` — Header, Footer, Navigation
- **Naming:** PascalCase für Komponenten, kebab-case für Files. `HeroSection.tsx` exportiert `HeroSection`.

### Styling
- Tailwind-First, keine globalen CSS-Files außer `globals.css` für Design-Tokens
- Custom-Theme in `tailwind.config.ts`, nicht inline
- Dark-Mode optional (Phase 2)

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
- [ ] Alle Standortseiten haben LocalBusiness-Schema
- [ ] Alle Service-Seiten haben FAQ-Schema (mind. 3 FAQs)
- [ ] AggregateRating-Schema auf Startseite (sobald Bewertungen ≥ 5)
- [ ] Sitemap.xml + robots.txt generiert
- [ ] GSC + GA4 angebunden, erste Crawl-Daten da
- [ ] Calendly + WhatsApp-Sticky live, getestet auf Mobile
- [ ] Förder-Beratungs-Formular triggert Mail an Sternhoff-Büro
- [ ] Sanity Studio läuft, Sternhoff hat Login-Daten

### Phase 1.5 (Polish & Conversion)
- [ ] Checkliste-Quiz live, leitet zu Calendly weiter
- [ ] 5 Blog-Artikel veröffentlicht
- [ ] Bewertungs-Widget live (Trustindex oder eigene Implementierung)
- [ ] Karriere-Seite live, JobPosting-Schema gesetzt

### Phase 2 (Lead-Inbox + ROI + Chatbot)
- [ ] `/admin/inbox`-Dashboard zeigt eingehende Leads in Echtzeit
- [ ] Lead-Inbox-UX mit Bürokraft getestet (kein Tutorial nötig, intuitiv bedienbar)
- [ ] n8n-Workflow pusht neue Anfragen nach Telegram + WhatsApp Business
- [ ] ROI-Rechner Wallbox + PV live, Ergebnis-Mail an Sternhoff + Lead
- [ ] Chatbot mit Pinecone-RAG live (Knowledge-Base = Service-Seiten + FAQs)

---

## 7. Wartungs-Runbooks

### Was Sternhoff / Bürokraft NUTZEN (einziger Touchpoint)

**Lead-Inbox: `/admin/inbox`**
1. Login mit persönlichem Account (Magic-Link via E-Mail)
2. Neue Anfragen erscheinen oben mit Kanal-Tag (Formular / WhatsApp / Chatbot / Calendly)
3. Pro Lead: Status setzen (`Neu` → `In Arbeit` → `Erledigt`), Notiz hinzufügen, Telegram-Push an Sternhoff
4. Phase 2: KI-Antwort-Vorschlag wird angezeigt → Bürokraft wählt `Senden` / `Bearbeiten` / `Verwerfen`

> Sternhoff/Bürokraft brauchen für nichts anderes auf dieser Seite Login-Daten. Inhalte, Texte, Bewertungen, Förder-Updates → Luke.

### Was Luke / Agentur LAUFEND PFLEGT (Service-Aufgaben)

| Aufgabe | Frequenz | Tool |
|---|---|---|
| Förder-Stände aktualisieren (KfW, BAFA, NRW) | quartalsweise | Sanity Studio |
| Blog-Artikel produzieren | 1–2 / Monat (laut Service-Vertrag) | content-writer + Sanity |
| Standortseiten erweitern / re-prüfen | halbjährlich | Sanity Studio |
| Service-Texte aktualisieren | bei Bedarf (Preis-/Leistungs-Änderungen) | Sanity Studio |
| Google-Bewertungen-Mailing an Bestandskunden | monatlich (nach Kunden-Liste von Sternhoff) | externes Mail-Tool |
| Schema-Validierung (Google Rich Results) | nach jedem Sanity-Update + monatlich | schema-validator |
| GSC + GA4 + Lighthouse-Reports | wöchentlich (Phase 1.5–2), dann monatlich | Reports nach `analyse/07-monitoring/` |
| Sicherheits-/Dependency-Updates | monatlich | `npm audit` + Vercel-Logs |

### Sanity-Content ändern (intern, durch Luke)
1. `https://elektro-sternhoff.de/studio` öffnen (Luke-Account)
2. Document auswählen, ändern, „Publish"
3. ISR-Revalidate löst nach 60s aus, Site ist aktualisiert

### Neue Standortseite anlegen (intern, durch Luke)
1. seo-architect-Briefing erstellen (Keywords, lokale Substanz)
2. content-writer schreibt Markdown nach `content/standortseiten/<slug>.md`
3. cms-migrator pusht in Sanity
4. schema-validator prüft LocalBusiness-Schema
5. Auf Vercel deployt → indexieren via GSC

### Lead-Inbox bei Ausfall
1. n8n-Logs in `n8n.elektro-sternhoff.de/executions` prüfen
2. Telegram-Bot-Token in `.env.local` testen
3. Fallback: Sanity-Backend speichert Leads weiterhin, manuelles Review im Studio durch Luke; Sternhoff/Bürokraft bekommen Anfragen übergangsweise per E-Mail-Forward

### Deploy
- Auto-Deploy bei push auf `main` via Vercel
- Manueller Deploy: `vercel --prod`
- Preview-Deploy bei jedem Branch automatisch

---

## 8. Strikte Regeln (rote Linien)

1. **Niemals den `Wordpress/`-Ordner überschreiben.** Das ist das Backup der alten Site. Read-Only.
2. **Niemals direkt auf `main` pushen ohne Build-Check.** `npm run build` muss grün sein.
3. **Niemals Sanity-Schemas in Production löschen, nur deprecaten** (`hidden: true`).
4. **Niemals Personen-Daten committen** (Lead-Daten, Kunden-E-Mails). `.env.local` ist gitignored.
5. **Niemals Stamm-Daten dieser CLAUDE.md ändern, ohne Luke** zu fragen — sie sind die Single Source of Truth.

---

## 9. Verweise

- **Strategie-Brief:** `../analyse/06-strategie/strategie-brief.md` (nach Re-Analyse-Korrektur Bochum-zentriert)
- **Audit-Report:** `../analyse/02-audit/audit-report.md`
- **Konkurrenten-Matrix:** `../analyse/03-konkurrenz/konkurrenten-matrix.md`
- **Keyword-Map:** `../analyse/05-keywords/keyword-map.md`
- **Subagenten:** `.claude/agents/`
- **Projektplan + Roadmap:** `./PROJEKTPLAN.md`
- **Second-Brain-Projektnotiz:** `~/Documents/KI Tools/Second Brain/02 Projekte/Elektro Sternhoff – Website.md`

---

**Letzte Änderung:** 2026-04-27
**Verantwortlich:** Luke Kozik
