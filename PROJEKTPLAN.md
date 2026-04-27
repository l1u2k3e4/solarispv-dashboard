# Elektro Sternhoff – Website (Bochum)
## Projektplan & Roadmap

> Dieser Plan ist die Ausführungs-Bibel des Projekts. Er ergänzt CLAUDE.md (Kontext) und die Subagenten-Definitionen (Verantwortungen). Updates nur mit Lukes OK.

---

## 0. Service-Modell (Rollen-Klärung)

| Rolle | Tut was | Tut NICHT |
|---|---|---|
| **Luke / Agentur (Build + Service)** | Site bauen, Content produzieren (Standortseiten, Service-Texte, Blog, FAQs), Schema pflegen, Förder-Stände aktualisieren, Bewertungs-Mailing-Vorlagen, GSC-Monitoring, Sicherheits-Updates, Lead-Inbox-Wartung | – |
| **Sternhoff (Inhaber)** | Lead-Inbox einsehen, Entscheidungen zu eingehenden Anfragen treffen, Foto-/Referenz-Material freigeben, Stammkunden-Liste fürs Bewertungs-Mailing geben | Inhalte schreiben, Förder-Texte pflegen, Schema editieren, Sanity Studio bedienen |
| **Bürokraft** | Lead-Inbox bedienen (Status setzen, KI-Antworten approve/edit/reject, Notizen) | Alles andere |

**Konsequenz für Architektur:**
- Sanity Studio ist ein **internes** Tool. UX-Optimierung für Luke, nicht für Laien.
- Lead-Inbox MUSS dagegen so einfach sein, dass die Bürokraft sie ohne Schulung bedient.
- Alle Aufgaben außerhalb der Lead-Inbox laufen im **monatlichen Service-Rhythmus** durch Luke.

---

## 1. Projekt-Steckbrief

| Feld | Wert |
|---|---|
| Kunde | Elektro Sternhoff GmbH |
| Geschäftsführer | Gerhard Sternhoff |
| Hauptsitz | Bessemerstr. 80, 44793 Bochum |
| Filiale | Gerther Str. 37, 44577 Castrop-Rauxel |
| Verantwortlich (Build) | Luke Kozik |
| Tech-Stack | Next.js 14 + Tailwind + Sanity v3 + Vercel |
| Repo | `/Users/lukekozik/Documents/Programme/Jobs/Elektro Sternhoff/website/` |
| Live-Domain (Ziel) | elektro-sternhoff.de (DNS später umstellen) |
| Stand | 2026-04-27 |
| Erstes Kunden-Meeting | 28.04.2026 (Vater präsentiert Vorgehen + Strategie) |
| Geplanter Launch | 6 Wochen nach Meeting-Freigabe |

---

## 2. Projekt-Phasen (4)

### Phase 0 — Setup & Re-Analyse-Korrektur (Woche 1)
**Ziel:** Saubere Daten- und Code-Grundlage für den Build.

| # | Deliverable | Verantwortlich | Akzeptanz |
|---|---|---|---|
| 0.1 | `Prompts/07_Bochum-Re-Analyse-Korrektur.md` in Claude Code laufen lassen | Luke + Claude Code | 8 ortsabhängige Files Bochum-zentriert + 5–8 Bochum-Wettbewerber in Matrix |
| 0.2 | `Prompts/08_Website-Init.md` in Claude Code laufen lassen | Luke + Claude Code | `website/` initialisiert, `npm run dev` läuft, `npm run build` grün |
| 0.3 | Sanity-Schemas: standortseite, leistungsseite, blogartikel | cms-migrator | Schemas in Sanity Studio sichtbar, Edit-Form rendert |
| 0.4 | Tailwind-Theme finalisiert (Sternhoff-Farben + Schriften) | ux-builder + Luke (Branding-Entscheidung) | Theme in `tailwind.config.ts`, Beispiel-Komponente nutzt Theme |
| 0.5 | GitHub-Repo angelegt + Vercel verbunden | Luke (manuell) | Erste Auto-Deploy-Build erfolgreich |
| 0.6 | Audio-Briefing für Sternhoff-Meeting neu generieren (Bochum-Version) | content-writer + notebooklm-py | MP3 in `analyse/06-strategie/sternhoff-briefing-bochum.mp3` |

**Definition of Done Phase 0:** Repo läuft, Sanity Studio zugänglich, Vercel-Preview deployt, Bochum-Strategie-Brief final.

---

### Phase 1 — Launch-Site (Woche 2–4)
**Ziel:** Site geht live mit allen Conversion-Wegen, Lighthouse 90+, alle Kern-Schemas gesetzt.

| # | Deliverable | Verantwortlich | Akzeptanz |
|---|---|---|---|
| 1.1 | Layout: Header + Footer + StickyContactBar + MobileNav | ux-builder | Funktioniert auf 320px – 1920px |
| 1.2 | Startseite: 12 Sections aus Strategie-Brief Section 5 | ux-builder + content-writer | Alle Sections live, Lighthouse Mobile ≥ 90 |
| 1.3 | 7 Service-Seiten (Elektroinstallation, Smart Home, Energie, E-Check, Beleuchtung, Notdienst, Gebäude-Gewerbe) | content-writer + ux-builder | Pro Seite ≥ 800 Wörter, FAQ-Schema, Service-Schema |
| 1.4 | 5 Bochum-Stadtseiten (Mitte, Wattenscheid, Riemke, Hofstede, Linden) | seo-architect → content-writer → ux-builder | Pro Seite ≥ 600 Wörter, LocalBusiness-Schema mit areaServed |
| 1.5 | 1 Castrop-Filial-Seite | content-writer + ux-builder | Klar als Filiale gekennzeichnet, eigene Adresse |
| 1.6 | Förder-Hub `/foerdermittel/` + 4 Unterseiten | content-writer (KfW, BAFA, NRW, Übersicht 2026) | Aktuelle Förder-Stände 2026, Disclaimer |
| 1.7 | Kontaktseite + Impressum + Datenschutz | content-writer + Luke (Rechts-OK) | DSGVO-konform, Calendly-Inline, Karte + Anfahrt. Sanity-Login: NUR Luke (kein Sternhoff-Account in Phase 1). |
| 1.8 | Schema-Set vollständig | seo-architect + schema-validator | Alle 8 Schema-Typen aktiv, Rich Results Test grün |
| 1.9 | Sitemap + robots.txt | seo-architect | `/sitemap.xml` und `/robots.txt` live, in GSC eingereicht |
| 1.10 | Förder-Beratungs-Formular (Lead-Magnet 1) | ux-builder + Resend-Integration | Submit triggert Mail an Büro + Bestätigung an Kunde |
| 1.11 | Calendly + WhatsApp + tel:-Sticky | ux-builder | Auf Mobile sichtbar ohne Scroll, Click-Events tracking-bereit |
| 1.12 | Lighthouse-Audit aller Seiten | lighthouse-auditor | Alle Seiten ≥ 90 Performance, ≥ 95 A11y, 100 SEO |
| 1.13 | DNS umstellen auf Vercel | Luke (manuell) | elektro-sternhoff.de zeigt auf neue Site |

**Definition of Done Phase 1:** Site live, indexiert, alle Conversion-Wege getestet. Sanity Studio läuft (intern, Luke-Account). Sternhoff/Bürokraft brauchen in Phase 1 keinen Login — Lead-Inbox kommt erst in Phase 2.

---

### Phase 1.5 — Polish & Conversion (Woche 4–6)
**Ziel:** Conversion-Rate maximieren, erste Content-Wellen, Analytics-Loop.

| # | Deliverable | Verantwortlich | Akzeptanz |
|---|---|---|---|
| 1.5.1 | Checkliste-Quiz "Ist Ihre Elektrik fit?" (Lead-Magnet 2) | ux-builder | Interaktiv, leitet bei kritischen Antworten zu Calendly |
| 1.5.2 | 4 weitere Bochum-Stadtseiten (Querenburg, Weitmar, Gerthe, +1) | content-writer + ux-builder | Wie 1.4 |
| 1.5.3 | 3 Nachbarstädte (Herne, Witten, Hattingen) | content-writer + ux-builder | Wie 1.4 |
| 1.5.4 | 5 Blog-Artikel (Wallbox-Kosten, E-Check-Kosten, KfW Wallbox 2026, Wallbox+PV, Elektrik wann erneuern) — **produziert von Luke / content-writer**, NICHT von Sternhoff | content-writer | Pro Artikel 800–1500 Wörter, Article-Schema. Weitere Artikel kommen im monatlichen Service-Rhythmus. |
| 1.5.5 | Bewertungs-Widget (Google Reviews oder Trustindex) | ux-builder + seo-architect | AggregateRating-Schema aktiv. Mailing-Vorlage an Sternhoff-Stammkunden = Luke-Service. |
| 1.5.6 | Karriere-Seite + JobPosting-Schema | content-writer + seo-architect | Mind. 1 Stelle mit Schema. Stellen-Inhalte kommen von Sternhoff per Mail/Telefon, Luke pflegt ein. |
| 1.5.7 | GA4 + GSC + Microsoft Clarity einrichten | seo-architect | Daten fließen, erste Conversions getrackt. Luke-Account, Sternhoff sieht Reports per E-Mail. |

**Definition of Done Phase 1.5:** 12 Standortseiten live, 5 Blog-Artikel veröffentlicht (alle von Luke produziert), Bewertungs-Widget aktiv, Analytics-Loop läuft, monatlicher Service-Rhythmus für Content-Updates etabliert.

---

### Phase 2 — Lead-Inbox + ROI + Chatbot (Woche 6–10)
**Ziel:** Operative Entlastung von Sternhoff, Lead-Pipeline End-to-End automatisiert.

| # | Deliverable | Verantwortlich | Akzeptanz |
|---|---|---|---|
| 2.1 | `/admin/inbox`-Dashboard | ux-builder + cms-migrator | Zeigt Leads in Echtzeit, Status-Updates möglich. UX getestet mit Bürokraft (kein Tutorial nötig). Logins für Sternhoff + Bürokraft eingerichtet. |
| 2.2 | n8n-Workflow für Lead-Push | chatbot-engineer | Form-Submit → Sanity → n8n → Telegram + WhatsApp |
| 2.3 | ROI-Rechner Wallbox + PV (Lead-Magnet 3) | ux-builder + seo-architect (für Crawlbarkeit) | HTML-Form mit JS-Logik, Lead-Capture am Ende |
| 2.4 | Pinecone-RAG für Knowledge-Base | chatbot-engineer | Index aus allen Sanity-Documents, Test-Queries grün |
| 2.5 | Chat-Widget auf Site + WhatsApp-Anbindung | chatbot-engineer + ux-builder | Live, DSGVO-Hinweis, 5 Test-Konversationen dokumentiert |
| 2.6 | B2B-Hub `/b2b/` mit Hausverwaltungs-Page + E-Check-Versicherungs-Page | content-writer | Schema, Lead-Magnet, separater Conversion-Pfad |
| 2.7 | 5 weitere Blog-Artikel — **alle von Luke produziert**, plus optional Newsletter-Setup falls Sternhoff es will | content-writer | Newsletter NUR wenn Sternhoff Stammkunden-Daten freigibt + Luke-Service Versand übernimmt. Sonst raus aus Phase 2. |

**Definition of Done Phase 2:** Lead-Inbox live + von Bürokraft genutzt, Chatbot läuft, ROI-Rechner online. Sternhoff/Bürokraft loggen sich täglich in `/admin/inbox` ein. Alle Content-/SEO-/Wartungs-Aufgaben laufen im monatlichen Service durch Luke.

---

## 3. Risiken & Annahmen (laufend zu validieren)

| # | Risiko / Annahme | Validierung | Owner |
|---|---|---|---|
| R1 | Hauptsitz Bochum konsequent kommunizieren ohne Castrop-Filiale zu vernachlässigen | Wireframe-Review mit Sternhoff im 1. Meeting | Luke |
| R2 | Foto-Material (Bochum-Wahrzeichen, Team, Werkstatt, Fahrzeug) | Termin für Foto-Shooting in Phase 0 | Luke + Sternhoff |
| R3 | Aktueller Google-Bewertungs-Score | Manuell prüfen vor Bewertungs-Widget-Einbau | seo-architect |
| R4 | ~~Notdienst-Realität~~ → **geklärt 27.04.2026:** Mo–Fr 7:00–23:00, Wochenende nach Vereinbarung | – | – |
| R5 | WhatsApp-Kapazität (wer antwortet, wann) | Im 1. Meeting klären | Luke |
| R6 | ~~Content-Pflege nach Launch~~ → **geklärt:** Luke produziert + pflegt im monatlichen Service. Sternhoff macht nichts. | – | – |
| R7 | Sanity-DSGVO (Datenstandort EU/US) | Vor Launch entscheiden, ggf. EU-Region setzen | Luke |
| R8 | Calendly DSGVO vs. Cal.com | Vor Phase 1.10 entscheiden | Luke |
| R9 | Vercel-Hosting Kosten (Free Tier reicht?) | Bei > 100GB Bandbreite Pro-Account; sonst Free | Luke |
| R10 | KfW/BAFA-Förderprogramme aktuell halten | Quartalsweise Review (Luke-Service) | content-writer |
| R11 | Service-Vertrag-Umfang nach Launch nicht klar definiert | Vor Launch schriftlich festhalten: was ist im Monatspreis, was nicht | Luke + Sternhoff |
| R12 | Bürokraft-Akzeptanz Lead-Inbox-UI | UI-Test mit Bürokraft vor Phase 2 Go-Live | ux-builder |

---

## 4. Kommunikations-Rhythmus mit Sternhoff

| Wann | Was | Format |
|---|---|---|
| 28.04.2026 | Erst-Meeting: Strategie + Ja zum Vorgehen | Vor Ort, Vater präsentiert |
| Wöchentlich (Phase 0–2) | Status-Update, Demos, Entscheidungen | E-Mail oder Telefon, max 10 Min |
| Vor Launch (Ende Phase 1) | Live-Walkthrough Sanity Studio + Site | 60-Min-Termin, alle Stakeholder |
| 4 Wochen nach Launch | Auswertung GSC + GA4 + Lead-Volumen | E-Mail-Report + Termin bei Bedarf |
| Quartalsweise nach Launch | Förder-Updates, neue Blog-Themen, Bewertungs-Status | 30-Min-Termin |

---

## 5. Definition of Done — Gesamtprojekt

Das Projekt ist „fertig" (Phase 2 abgeschlossen), wenn:

- [ ] Lighthouse Mobile ≥ 90 Performance, ≥ 95 A11y, 100 SEO auf allen Hauptseiten
- [ ] Mind. 12 Standortseiten + 7 Service-Seiten + 4 Förder-Seiten + 10 Blog-Artikel live
- [ ] Schema-Set vollständig, Rich Results Test für alle Schema-Typen grün
- [ ] Lead-Inbox läuft, Sternhoff/Bürokraft sehen Leads in Echtzeit, Telegram-Notifications aktiv
- [ ] Bürokraft bedient Lead-Inbox eigenständig ohne Tutorial
- [ ] Monatlicher Service-Rhythmus etabliert: 1–2 neue Blog-Artikel + Förder-Updates + GSC-Report durch Luke
- [ ] Chatbot beantwortet 5 typische Anfrage-Patterns korrekt (manuell verifiziert)
- [ ] ROI-Rechner generiert Leads (mind. 5 Submissions/Monat)
- [ ] GSC zeigt Top-10-Rankings für mind. 5 Keywords (z.B. "Elektriker Bochum-Wattenscheid")
- [ ] Sternhoff bestätigt: spürbar weniger Routine-Anfragen über Telefon

---

## 6. Reihenfolge der nächsten 3 Aktionen (für Luke)

1. **Prompts/07_Bochum-Re-Analyse-Korrektur.md** in Claude Code (VS Code) öffnen, ausführen, Bericht prüfen
2. **Prompts/08_Website-Init.md** in Claude Code ausführen — danach `npm run dev` lokal testen
3. **Sternhoff-Meeting (28.04.)** — Strategie pitchen, Antworten zu R2 / R4 / R5 / R6 einsammeln, danach Phase 0 fortsetzen

Sobald Phase 0 läuft: Phase 1 startet automatisch über die Subagenten in `.claude/agents/`.
