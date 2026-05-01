> ⚠️ **HISTORISCHER STAND** — diese Datei stammt aus dem Sternhoff-Build vor dem Solaris-PV-Fork.
> Aktueller Solaris-PV-Stand: PROJEKTPLAN.md + CLAUDE.md + Memory.md (Solaris).

# Demo-Build-Report — Elektro Sternhoff (HISTORISCH, Sternhoff-Vorlage)

**Stand:** 2026-04-27 (Vorabend Sternhoff-Meeting 28.04.2026)
**Verantwortlich:** Luke Kozik · Build durch Claude Code (Demo-Build-Engineer)

---

## 1. Pages — Status

| Route | Status | Bundle Size | First Load JS |
|---|---|---|---|
| `/` (Startseite) | ✅ live | 2.97 kB | 149 kB |
| `/b2b/hausverwaltungen` | ✅ live | 5.30 kB | 133 kB |
| `/notdienst` | ✅ live | 2.99 kB | 128 kB |
| `/rechner/photovoltaik` | ✅ live | 3.79 kB | 150 kB |
| `/studio/[[...tool]]` | ✅ Sanity-Skeleton (unangetastet) | 1.46 MB | 1.56 MB |

Alle 4 Demo-Pages liefern HTTP 200, alle Sections aus Prompt 09 sind implementiert.

---

## 2. Lighthouse Mobile-Audit (Hard-Gate: P ≥ 90, A11y ≥ 95, SEO 100, BP ≥ 95)

| Page | Performance | Accessibility | Best Practices | SEO |
|---|:---:|:---:|:---:|:---:|
| `/` | **95** ✅ | **96** ✅ | **100** ✅ | **100** ✅ |
| `/b2b/hausverwaltungen` | **96** ✅ | **96** ✅ | **100** ✅ | **100** ✅ |
| `/notdienst` | **99** ✅ | **96** ✅ | **100** ✅ | **100** ✅ |
| `/rechner/photovoltaik` | **99** ✅ | **96** ✅ | **100** ✅ | **100** ✅ |

**Alle Pages bestehen Hard-Gate.** Verbleibende A11y-Restpunkte sind kleine Kontrast-Themen auf dem rotem Notdienst-Hintergrund (text-white/85 statt text-white) — kosmetisch, kein blocker.

JSON-Reports liegen unter [website/.lighthouse/](.lighthouse/).

---

## 3. shadcn-Komponenten (manuell, Tailwind-3-kompatibel)

In `src/components/ui/`:

1. `button.tsx` — Varianten: default, accent, outline, outline-white, ghost, link, destructive, secondary; Größen: default, sm, lg, xl, icon
2. `card.tsx` — Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
3. `input.tsx`
4. `label.tsx` (Radix-Label)
5. `select.tsx` (Radix-Select)
6. `textarea.tsx`
7. `sheet.tsx` (Radix-Dialog für Mobile-Nav)
8. `navigation-menu.tsx` (Radix-NavigationMenu)
9. `dialog.tsx` (Radix-Dialog)

**Plus zwei Eigen-Bauteile:**
- `ImagePlaceholder.tsx` — drei Aspect-Ratios (16:9, 4:5, 1:1), zwei Varianten (subtle, branded)
- `Toast.tsx` — leichter Demo-Toast für Form-Submit-Feedback

`package.json` aufgeräumt: `shadcn`, `radix-ui`, `tw-animate-css` raus → echte Radix-Singletons rein (`@radix-ui/react-slot`, `react-label`, `react-select`, `react-dialog`, `react-navigation-menu`). `.npmrc` mit `legacy-peer-deps=true`.

---

## 4. Branding — final umgesetzt

| | vorher (Phase 0) | jetzt (Demo) |
|---|---|---|
| Primary | `#1a3a6b` | `#15387D` (Königsblau Logo) |
| Accent | `#f59e0b` | `#E30613` (Industrie-Rot Logo) |
| Schrift | Inter + Plus Jakarta Sans (Google Fonts) | **Arial / Helvetica / sans-serif** (System-Font, 0 Ladezeit) |
| Logo | nicht eingebunden | `/public/images/logo-sternhoff.png` (1000×218) |

`tailwind.config.ts` enthält die volle `sternhoff.*`-Palette (primary/primary-dark/primary-light, accent/accent-dark, gray, bg-light, text-dark). HSL-CSS-Variablen in `globals.css` synchronisiert.

---

## 5. Bilder — eingebunden + Platzhalter

**5 echte Sternhoff-Bilder via `next/image`:**

| Datei | wo |
|---|---|
| PHOTO-2018-10-23-15-44-06.jpg | Hero-Section (rechte Spalte, `priority`) |
| IMG_4644.jpeg | B2B-Hero (Werkstatt-Außenfassade) |
| PHOTO-2018-07-02-16-38-30.jpg | LokalePraesenz (Bessemerstr.-Adressschild, 4:5 hochkant) |
| PHOTO-2018-07-10-11-25-40.jpg | InhaberStatement (Gerhard Sternhoff, 4:5) |
| PHOTO-2018-10-23-15-44-22.jpg | NotdienstBlock (Sprinter-Industrie-Setting, 25 % Opacity Overlay) |

Alle mit spezifischen Alt-Texten, korrekten `sizes`-Hints, CLS-sicher dimensioniert.

**Platzhalter (für Live-Build):**
- B2B-Referenz-Showcase: 3× `<ImagePlaceholder aspectRatio="4:5" variant="subtle">` mit „Projektfoto folgt"
- B2B-Teamfoto: 1× `<ImagePlaceholder aspectRatio="16:9" variant="branded">`
- LokalePraesenz Map: 1× `<ImagePlaceholder aspectRatio="16:9" variant="branded">` „Karte folgt — interaktive Map kommt im Live-Build"

---

## 6. Telefonnummern-Logik

Konsequent durchgezogen:

- **Hauptsitz Bochum 0234 92339560** auf allen Haupt-CTAs (Hero, Header-Button, Sticky Mobile, Notdienst, Footer-Kontakt-Spalte)
- **Filiale Castrop-Rauxel 02305 5488875** ausschließlich in der Footer-Standorte-Spalte unter „Filiale Castrop-Rauxel"
- **WhatsApp** auf Bochum-Hauptnummer (`+4923492339560`)
- Alle als korrekte `tel:`/`https://wa.me/`-Links

Quelle: `src/lib/demo-data.ts` → `kontakt.hauptsitz` / `kontakt.filiale` / `kontakt.whatsapp`.

---

## 7. Demo-Daten

Alles hardcoded in `src/lib/demo-data.ts` (kein Sanity-Login nötig):

- `kontakt`, `standorte`, `oeffnungszeiten`
- `services` (6, davon Notdienst mit `highlight: true`)
- `stadtteile` (7 Bochum-Tags)
- `trustBadges` (4 Icons + Labels)
- `referenzen` (3 B2B-Mock-Projekte)
- `foerderProgramme` (3 Tiles)

---

## 8. Screenshot-Vorschlag für Lukes Demo

| URL | Device-Frame | Story |
|---|---|---|
| `localhost:3000/` | iPhone 14 Pro (393×852) | „So sieht Sternhoff auf dem Smartphone aus — Hero, Trust, Service-Grid, Inhaber-Statement, Notdienst-Bar." |
| `localhost:3000/` | Desktop (1440×900) | „Same Site auf Desktop — voller 2-Spalter-Hero, lokale Präsenz mit Bessemerstr.-Bild prominent." |
| `localhost:3000/notdienst` | iPhone 14 Pro | „Notdienst-Page als Single-Page-Conversion: ein Ziel — anrufen oder WhatsApp. Mo–Fr 7–23 Uhr klar kommuniziert." |
| `localhost:3000/rechner/photovoltaik` | Desktop | „Live-Rechner. Wenn Sternhoff den Eigenverbrauchs-Slider verschiebt, ändert sich Amortisation in Echtzeit. Kein Backend, alles im Browser." |
| `localhost:3000/b2b/hausverwaltungen` | Desktop | „B2B-Schiene: USPs, Ablauf, Referenzen, Anfrageformular — separater Vertriebs-Funnel für Hausverwaltungen." |

---

## 9. Bekannte Demo-Limitierungen — was Luke im Meeting kommunizieren sollte

1. **Formulare senden nichts.** Förder-Beratung, B2B-Anfrage und PV-Rechner-CTA zeigen einen Toast „Demo: Im Live-Betrieb wird die Anfrage an Sternhoff gesendet." — kein echtes Backend, kein Resend, kein n8n. **Vorteil im Meeting:** Toast auslösen, sagen „im Live wird das hier eine E-Mail an Sternhoff plus Telegram-Push an Sie."
2. **Map ist Platzhalter.** „Interaktive Map kommt im Live-Build" — bewusst nicht eingebaut, weil Google-Maps-Embedding DSGVO-relevant ist und am 28.04. nicht spontan diskutiert werden muss.
3. **Sanity Studio leer.** `/studio` läuft als Skeleton, ohne Login geht da nichts. **Sage:** „Inhalte sind hardcoded, weil ich Ihnen heute zeigen will, wie es aussieht — bevor wir mit dem CMS beginnen."
4. **Referenz-Fotos fehlen.** B2B-Page zeigt 3 graue Platzhalter („Projektfoto folgt"). **Sage:** „Hier kommen Bilder von Ihren Bochumer MFH-Sanierungen rein — wir machen ein Foto-Shooting in Phase 0."
5. **PV-Rechner ist Schätzung.** Disclaimer eingeblendet. Sage: „Realistische Faustformel-Werte, kein Angebot. Soll Vertrauen schaffen, dass es sich lohnt — mit dem Vor-Ort-Termin als nächste Stufe."
6. **Inhaber-Statement-Zitat ist gesetzt.** Wir haben einen Mustertext in Anführungszeichen geschrieben. **Wichtig:** Im Meeting fragen, ob Sternhoff das Zitat exakt so übernimmt oder eine eigene Formulierung wünscht.
7. **Notdienst-Hintergrundbild auf rotem Block** kostet auf Mobile minimal A11y-Punkte (text-white/85 vs. text-white) — bewusster Trade-off für visuelle Wucht; kann im Live-Build entweder durch text-white-only oder dunkleren rot ersetzt werden.

---

## 10. Was das Live-Setup brauchen wird (Phase 1)

- Sanity-Project anlegen (`npx sanity init`) und Schemas füllen
- Resend-API-Key + Server-Action für Förderberatungs- und B2B-Form
- Echte Map (DSGVO-konformer Map-Anbieter, Cal.com statt Calendly)
- Foto-Shooting Bochum-Werkstatt + Bochum-Wahrzeichen + Castrop-Filiale
- Zwei GBP-Profile pflegen (Bochum-Hauptsitz + Castrop-Filiale)
- LocalBusiness-Schema mit beiden Standorten (Helper liegt schon in `src/lib/seo/schema.ts`)
- Lead-Inbox-Backend (`/admin/inbox`) — Phase 2

---

## 11. Befehle für Luke

```bash
cd website

# Demo starten (Production-Build, schnell)
npm run start
# → öffne http://localhost:3000/ im Browser

# Falls Re-Build nötig
npm run build
npm run start

# Falls Sanity Studio gewünscht (nicht Demo-relevant)
# braucht erst sanity login + sanity init
```

Build-Output: `.next/` · Bundle-Size 87.9 kB shared + per-Page-Chunks · komplett statisch (○).

**Server-Status:** Im Build-Lauf gestartet, danach gestoppt. Vor der Demo: `npm run start` auf Lukes Laptop.
