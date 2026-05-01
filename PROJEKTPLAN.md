# Solaris PV – Website (Moers / Niederrhein)
## Projektplan & Roadmap

> Dieser Plan ist die Ausführungs-Bibel des Projekts. Er ergänzt CLAUDE.md (Kontext) und die Subagenten-Definitionen (Verantwortungen). Updates nur mit Lukes OK.

---

## 0. Service-Modell (Rollen-Klärung)

| Rolle | Tut was | Tut NICHT |
|---|---|---|
| **Luke / Agentur (Build + Service)** | Site bauen, Content produzieren (Standortseiten, Service-Texte, Blog, FAQs), Schema pflegen, Förder-Stände aktualisieren, Bewertungs-Mailing-Vorlagen, GSC-Monitoring, Sicherheits-Updates, Lead-Inbox-Wartung | – |
| **Solaris PV (Andreas Mellies)** | Lead-Inbox einsehen, Entscheidungen zu eingehenden Anfragen treffen, Foto-/Referenz-Material freigeben, Stammkunden-Liste fürs Bewertungs-Mailing geben | Inhalte schreiben, Förder-Texte pflegen, Schema editieren, Sanity Studio bedienen |
| **Bürokraft (optional)** | Lead-Inbox bedienen (Status setzen, KI-Antworten approve/edit/reject, Notizen) | Alles andere |

**Konsequenz für Architektur:**
- Sanity Studio ist ein **internes** Tool. UX-Optimierung für Luke, nicht für Laien.
- Lead-Inbox MUSS dagegen so einfach sein, dass Mellies / Bürokraft sie ohne Schulung bedient.
- Alle Aufgaben außerhalb der Lead-Inbox laufen im **monatlichen Service-Rhythmus** durch Luke.

---

## 1. Projekt-Steckbrief

| Feld | Wert |
|---|---|
| Kunde | Solaris PV (SolarisPV® Inh. Andreas Mellies) |
| Inhaber | Andreas Mellies, Elektro-Meister |
| Bürostandort | Grünbergstr. 39a, 47445 Moers |
| Sitz (Impressum) | Birkenstr. 12, 47447 Moers |
| Telefon | 02841 / 816 37 27 |
| E-Mail | energie@solarispv.de |
| Verantwortlich (Build) | Luke Kozik |
| Tech-Stack | Next.js 14 + Tailwind 3 + Sanity v3 + Vercel |
| Repo | `/Users/lukekozik/Documents/Jobs/SolarisPv/Webseite Solaris.pv/website/` |
| Live-Domain (Ziel) | solarispv.de (DNS-Umstellung nach Launch) |
| Stand | 2026-05-01 (nach Prompt 10 — Content-Migration) |
| Audit-Score Alt-Site | 2,0 / 10 (siehe `analyse/02-audit/audit-report.md`) |
| Geplanter Launch | 8 Wochen ab Mellies-Freigabe Strategie-Brief |

---

## 2. Projekt-Phasen (4)

### Phase 0 — Setup & Analyse (abgeschlossen)
**Ziel:** Saubere Daten- und Code-Grundlage für den Build.

| # | Deliverable | Status |
|---|---|---|
| 0.1 | Prompts 1–6 (Scrape, Audit, Konkurrenz, Keywords, Strategie-Brief) | ✅ fertig (siehe `analyse/`) |
| 0.2 | Prompt 7 (Asset-Download) | ✅ fertig (`assets/solaris-pv-raw/`) |
| 0.3 | Prompt 8 (Public-Folder-Migration) | ✅ fertig (Build grün) |
| 0.4 | Prompt 9 (Branding-Migration aus Logo) | ✅ fertig (Tokens + Fonts + WCAG-Matrix) |
| 0.5 | Prompt 10 (Content-Migration) | ✅ fertig — diese Iteration |

---

### Phase 1 — Launch-Site (Wochen 1–6 nach Mellies-Freigabe)
**Ziel:** Site geht live mit allen Conversion-Wegen, Lighthouse 90+, Kern-Schemas gesetzt.

| # | Deliverable | Verantwortlich | Akzeptanz |
|---|---|---|---|
| 1.1 | Layout: Header + Footer + Sticky-CTAs (Anruf · WhatsApp · Termin) | ux-builder | Funktioniert auf 320px – 1920px, Lighthouse 95+ A11y |
| 1.2 | Startseite: 12 Sections aus Strategie-Brief §5 | ux-builder + content-writer | Alle Sections live, Lighthouse Mobile ≥ 90 |
| 1.3 | 7 Service-Seiten (PV, Speicher, Wallbox, Wärmepumpe, Notstrom, E-Check, Service-Wartung) | content-writer + ux-builder | Pro Seite ≥ 800 Wörter, FAQ-Schema, Service-Schema |
| 1.4 | 6 P1-Standortseiten (Moers, Neukirchen-Vluyn, Kamp-Lintfort, Rheinberg, Voerde, Niederrhein-Hub) | seo-architect → content-writer → ux-builder | Pro Seite ≥ 800 Wörter, LocalBusiness-Schema mit `areaServed`, manuell unique (kein Programmatic) |
| 1.5 | Hersteller-Hub `/hersteller/` + 3 Pflicht-Subseiten (Meyer Burger, FENECON, Huawei) | content-writer | Pro Seite ≥ 600 Wörter, Hersteller-Empfehlung „wann nicht?" inklusive |
| 1.6 | Förder-Hub `/foerderung-photovoltaik-2026/` + Detail-Boxen (KfW 270, BAFA, progres.NRW, Nullsteuersatz) | content-writer (Luke) | Stand-Datum prominent, monatlich aktualisiert (Luke-Service) |
| 1.7 | Impressum + Datenschutz + Garantie-Seite | content-writer + Luke (Rechts-OK) | Impressum vor Live-Gang BLOCKER-frei (siehe `_offene-fragen.md` B1–B4) |
| 1.8 | Schema-Set vollständig | seo-architect + schema-validator | Alle Schemas (LocalBusiness, FAQPage, Service, BreadcrumbList, WebPage) grün im Rich Results Test |
| 1.9 | Sitemap + robots.txt | seo-architect | `/sitemap.xml` und `/robots.txt` live, in GSC eingereicht |
| 1.10 | Förder-Beratungs-Formular (Lead-Magnet 1) | ux-builder + Resend | Submit triggert Mail an `energie@solarispv.de` + Bestätigung an Lead, DSGVO-Checkbox |
| 1.11 | Calendly / Cal.com + WhatsApp-Floater + tel:-Sticky | ux-builder | Auf Mobile sichtbar ohne Scroll, DSGVO-Hinweis |
| 1.12 | Klar-Preis-Indikator MVP (Strategie-Brief §5 Section 3) | ux-builder | Schiebregler + statische Lookup-Tabelle, Disclaimer mit Quellen |
| 1.13 | Lighthouse-Audit aller Seiten | lighthouse-auditor | Alle ≥ 90 Performance, ≥ 95 A11y, 100 SEO |
| 1.14 | DNS umstellen auf Vercel | Luke (manuell) | solarispv.de zeigt auf neue Site, 301-Redirects der `huawei-1`–`huawei-6`-Buggy-Slugs auf Hersteller-Slugs |

**Definition of Done Phase 1:** Site live, indexiert, alle Conversion-Wege getestet. Sanity Studio läuft (intern, Luke-Account). Mellies / Bürokraft brauchen in Phase 1 keinen Login — Lead-Inbox kommt erst in Phase 2.

---

### Phase 1.5 — Polish & Conversion (Wochen 6–10)
**Ziel:** Conversion-Rate maximieren, weitere Standortseiten, Analytics-Loop.

| # | Deliverable | Verantwortlich | Akzeptanz |
|---|---|---|---|
| 1.5.1 | Welle-2-Standortseiten (Duisburg, Krefeld, Dinslaken, Geldern, Xanten) | content-writer + ux-builder | Wie 1.4 |
| 1.5.2 | 6 weitere Hersteller-Seiten (Jinko, RCT-Power, EcoFlow, ABB, Lorenz, Hyundai) | content-writer | Wie 1.5 |
| 1.5.3 | 5 Blog-Artikel (PV-Kosten 2026, Speicher-Sizing, Förder-Update, FENECON-Tiefe, Sektorenkopplung PV+Wärmepumpe) — **produziert von Luke**, NICHT von Mellies | content-writer | Pro Artikel 800–1.500 Wörter, Article-Schema. Weitere Artikel im monatlichen Service. |
| 1.5.4 | Anlagen-Karte mit Pins (Hebel 3 aus differenzierungs-hebel.md) | ux-builder + seo-architect | Mind. 8 echte Cases (von Mellies bereitgestellt) — siehe `_offene-fragen.md` W4 |
| 1.5.5 | Bewertungs-Widget (Google Reviews oder ProvenExpert) | ux-builder + seo-architect | AggregateRating-Schema aktiv. Mailing-Vorlage an Mellies-Stammkunden = Luke-Service. |
| 1.5.6 | Foto-Shoot Mellies + Werkbank + Meisterbrief | Luke organisiert + Mellies | Hero-Bild (Section 1), Section 11 Personen-Portrait |
| 1.5.7 | Logo-Vector-Redraw (echter SVG aus PNG-Wrapper) | Luke + ggf. Designer | Vector-Datei in `public/`, Logo-Komponente nutzt SVG |
| 1.5.8 | GA4 + GSC + Microsoft Clarity einrichten | seo-architect | Daten fließen, erste Conversions getrackt. Luke-Account, Mellies sieht Reports per E-Mail. |

**Definition of Done Phase 1.5:** 11 Standortseiten live, 9 Hersteller-Seiten, 5 Blog-Artikel, Bewertungs-Widget aktiv, Analytics-Loop läuft, monatlicher Service-Rhythmus etabliert.

---

### Phase 2 — Lead-Inbox + Chatbot + Sat-Bild-Konfigurator (Wochen 10–18)
**Ziel:** Operative Entlastung von Mellies, Lead-Pipeline End-to-End automatisiert.

| # | Deliverable | Verantwortlich | Akzeptanz |
|---|---|---|---|
| 2.1 | `/admin/inbox`-Dashboard | ux-builder + cms-migrator | Zeigt Leads in Echtzeit, Status-Updates möglich. UX getestet mit Mellies / Bürokraft (kein Tutorial nötig). |
| 2.2 | n8n-Workflow für Lead-Push | chatbot-engineer | Form-Submit → Sanity → n8n → Telegram (an Mellies) + WhatsApp Business |
| 2.3 | Pinecone-RAG für Knowledge-Base | chatbot-engineer | Index aus allen Sanity-Documents, Test-Queries grün |
| 2.4 | Chat-Widget auf Site | chatbot-engineer + ux-builder | Live, DSGVO-Hinweis, Eskalations-Pfad „Mit Mellies sprechen" |
| 2.5 | Sat-Bild-Klar-Preis-Konfigurator (Hebel C Vollausbau) | ux-builder + seo-architect (Crawlbarkeit) | Adresse → Sat-Bild → Modul-Vorschlag → Preisindikation (ohne Mail-Capture) |
| 2.6 | Welle-3-Standortseiten (Mönchengladbach, Kempen, Willich, Tönisvorst, Sonsbeck) | content-writer | NUR wenn Welle 1+2 organisch konvertieren |
| 2.7 | 5+ weitere Blog-Artikel — alle von Luke produziert | content-writer | Newsletter NUR wenn Mellies Stammkunden-Daten freigibt + Luke-Versand. Sonst raus. |

**Definition of Done Phase 2:** Lead-Inbox live, Chatbot beantwortet ≥ 80 % der Standardfragen, Sat-Bild-Konfigurator generiert Leads. Mellies hat 10–15 PT/Monat zurückgewonnen für Vor-Ort-Arbeit.

---

## 3. Risiken & Annahmen (laufend zu validieren)

| # | Risiko / Annahme | Validierung | Owner |
|---|---|---|---|
| R1 | **Mellies-Foto-Bereitschaft** für „Meister mit Gesicht"-Frame (Hebel A) | Erst-Meeting + Foto-Shoot in Phase 1.5 — falls Mellies sich unwohl fühlt: Halbporträt mit Helm + Hände-Detailshots | Luke + Mellies |
| R2 | **Foto-Material echte Cases** (Hauseigentümer-Einwilligung, Auflösung > 1500 px, kWp-Daten) | Audit der 46 Galerie-Bilder + Mellies-Rückfrage zu Einwilligungen. Falls Mangel: 4–6 neue Foto-Shoots in Welle 1 | Luke + Mellies |
| R3 | **5-Jahre-Solaris-Montage-Garantie** versicherungstechnisch tragbar | Rücksprache Berufshaftpflicht-Versicherer (siehe `_offene-fragen.md` W2). Mitigation: Garantie auf 3 Jahre kürzen | Mellies + Luke |
| R4 | **9 Hersteller** echte Partnerschaften vs. „Großhandelseinkauf" | Mellies-Klärung (siehe `_offene-fragen.md` W3). Mitigation: Hub auf 5–6 zentrale Marken reduzieren, Rest „auf Anfrage" | Mellies |
| R5 | **WhatsApp-Mobilnummer** (Festnetz `+4928418163727` ist NICHT WhatsApp-fähig) | Mellies-Klärung (siehe `_offene-fragen.md` W1). Alternative: WhatsApp Business mit Festnetz-Verifizierung | Mellies |
| R6 | **Aufsichtsbehörde + Innung** für Impressum (BLOCKER) | Mellies-Klärung (siehe `_offene-fragen.md` B3). Vermutung: HWK Düsseldorf + Innung Niederrhein | Mellies |
| R7 | **Berufshaftpflicht-Pflichtangabe** im Impressum (BLOCKER) | Mellies-Klärung Versicherer + Sitz + Geltungsbereich (siehe `_offene-fragen.md` B1). Mitigation: Site darf NICHT live ohne diese Angabe | Mellies |
| R8 | **Datenschutzerklärung-Update** für neuen Stack (Cookie-Banner, Calendly, Resend, Sanity, Vercel, ggf. n8n/Pinecone/WhatsApp) | Vor Live-Gang via datenschutz-generator.de neu generieren (siehe `_offene-fragen.md` B4) | Luke |
| R9 | **Sa-Termine** möglich? (Strategie-Brief §12 nimmt es an) | Mellies-Klärung (siehe `_offene-fragen.md` W7) | Mellies |
| R10 | **Programmatic-Mass-Generation** der Standortseiten (TASK-FORCE-Anti-Pattern) | Pro Stadt mind. 1 unique Absatz (Anfahrt, lokale Hersteller-Empfehlung, ggf. Stadtteil-Cases). Nie reines Token-Replace. | content-writer |
| R11 | **KfW/BAFA-Förderprogramme aktuell halten** — Risiko, dass Stand veraltet | Quartalsweise Review (Luke-Service). Stand-Datum prominent auf jeder Förder-Seite | content-writer |
| R12 | **Service-Vertrag-Umfang** nach Launch nicht klar definiert | Vor Launch schriftlich festhalten: was im Monatspreis, was nicht | Luke + Mellies |
| R13 | **Hero-Video-Transcoding** (250 MB → < 5 MB HEVC) | Phase 1.5 — bis dahin Hero ohne Video, nur Bild | Luke |
| R14 | **Logo-Vector** fehlt (P09: PNG-Wrapper mit Render-Artefakten) | Mellies-Klärung Original-Quelldatei (siehe `_offene-fragen.md` B5). Alternative: Vector-Redraw durch Designer | Mellies + Luke |

---

## 4. Kommunikations-Rhythmus mit Mellies

| Wann | Was | Format |
|---|---|---|
| Erst-Meeting (TBD) | Strategie-Brief-Walkthrough + alle BLOCKER-Antworten (`_offene-fragen.md` B1–B5) | Vor Ort, 90 Min, Audio-Briefing-Vorbereitung (`analyse/04-konkurrenz-tief/notebooklm/audio-briefing-mellies.mp3`) |
| Wöchentlich (Phase 1) | Status-Update, Demos, Entscheidungen | E-Mail oder Telefon, max 10 Min |
| Vor Launch (Ende Phase 1) | Live-Walkthrough Sanity Studio + Site + Lead-Inbox-Demo | 60-Min-Termin |
| 4 Wochen nach Launch | Auswertung GSC + GA4 + Lead-Volumen | E-Mail-Report + Termin bei Bedarf |
| Quartalsweise nach Launch | Förder-Updates, neue Blog-Themen, Bewertungs-Status | 30-Min-Termin |

---

## 5. Definition of Done — Gesamtprojekt

Das Projekt ist „fertig" (Phase 2 abgeschlossen), wenn:

- [ ] Lighthouse Mobile ≥ 90 Performance, ≥ 95 A11y, 100 SEO auf allen Hauptseiten
- [ ] Mind. 11 Standortseiten + 7 Service-Seiten + 9 Hersteller-Seiten + Förder-Hub + 10 Blog-Artikel live
- [ ] Schema-Set vollständig, Rich Results Test grün
- [ ] Lead-Inbox läuft, Mellies / Bürokraft sehen Leads in Echtzeit, Telegram-Notifications aktiv
- [ ] Bürokraft bedient Lead-Inbox eigenständig ohne Tutorial
- [ ] Monatlicher Service-Rhythmus etabliert: 1–2 Blog-Artikel + Förder-Updates + GSC-Report durch Luke
- [ ] Chatbot beantwortet 5 typische Anfrage-Patterns korrekt
- [ ] GSC zeigt Top-10-Rankings für mind. 5 Keywords (Photovoltaik Moers, Wärmepumpe Moers, Stromspeicher Moers, fenecon installateur moers, Photovoltaik Niederrhein)
- [ ] Mellies bestätigt: spürbar weniger Routine-Anfragen über Telefon

---

## 6. Reihenfolge der nächsten 3 Aktionen (für Luke)

1. **Mellies-Erst-Meeting** vereinbaren — alle BLOCKER aus `_offene-fragen.md` B1–B5 klären, Strategie-Brief abnicken lassen, Foto-Shoot-Termin vereinbaren
2. **Datenschutzerklärung neu generieren** (datenschutz-generator.de) für den neuen Stack — vor jedem Live-Gang Pflicht
3. **Phase 1 starten** — Sanity-Schemas (Service, Hersteller, Standort, Referenz, FAQ, Blog) anlegen, dann Startseite mit den 12 Sections aus Strategie-Brief §5 bauen.

Sobald Phase 1 läuft: Phase 1.5 + Phase 2 starten automatisch über die Subagenten in `.claude/agents/` (TODOs für Solaris-Briefings sind in CLAUDE.md §4 markiert).
