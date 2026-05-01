> ⚠️ **HISTORISCHER STAND** — diese Datei stammt aus dem Sternhoff-Build vor dem Solaris-PV-Fork.
> Aktueller Solaris-PV-Stand: PROJEKTPLAN.md + CLAUDE.md.

# Prompt 8 — Website-Init: Abschluss-Bericht (HISTORISCH, Sternhoff-Vorlage)

**Datum:** 2026-04-27
**Stand:** Init abgeschlossen, Build grün, erster Git-Commit gemacht.

---

## 1. Schritte: erfolgreich vs. abweichend

| Schritt | Status | Anmerkung |
|---|---|---|
| 1. Backup-Sicherheit | ✅ | CLAUDE.md, PROJEKTPLAN.md, .claude/agents/ unverändert |
| 2. Next.js Init | ✅ mit Workaround | `create-next-app` weigerte sich im nicht-leeren Verzeichnis. Scaffold erfolgte in `/tmp/sternhoff-nextjs-init/scaffold` und wurde via `rsync --ignore-existing` nach `website/` kopiert. CLAUDE.md/PROJEKTPLAN.md wurden NICHT überschrieben. |
| 3. Dependencies | ⚠️ mit `--legacy-peer-deps` | next-sanity und @sanity/vision haben Peer-Dep-Konflikte mit React 18 / Next 14. `--legacy-peer-deps` ist die übliche Lösung — Runtime ist kompatibel. next-sanity wurde auf `^9` gepinnt (v12 braucht Next 16). |
| 3b. shadcn/ui | ⚠️ NICHT installiert | Die aktuelle `shadcn@latest` CLI liefert nur den `nova`-Preset, der **Tailwind 4 + radix-ui-Singleton** voraussetzt — inkompatibel mit Next 14 + Tailwind 3. Die alte `shadcn-ui` CLI ist deprecated. **Empfehlung:** ux-builder fügt shadcn-Komponenten in Phase 1 entweder via Tailwind-4-Upgrade hinzu oder über manuelles Kopieren der Tailwind-3-Variants aus dem Component-Code. |
| 4. Sanity Studio | ✅ manuell | `sanity init --bare` braucht Login (nicht autonom möglich). Stattdessen wurden alle Studio-Files manuell angelegt: `sanity.config.ts`, `sanity/env.ts`, `sanity/lib/client.ts`, `sanity/lib/image.ts`, `sanity/schemas/{index,standortseite,leistungsseite,blogartikel}.ts` und die Studio-Route `src/app/studio/[[...tool]]/{page,Studio}.tsx`. **Luke muss `sanity login` und `sanity init` lokal manuell ausführen, um die Project-ID zu erhalten.** |
| 5. Projekt-Struktur | ✅ | `src/app/(marketing)/`, `src/app/admin/inbox/`, `src/components/{sections,layout}/`, `src/lib/{sanity,seo}/`, `src/types/`, `sanity/{schemas,lib}/`, `public/images/`, `content/` angelegt |
| 6. Tailwind Custom Theme | ✅ | `tailwind.config.ts` mit Sternhoff-Palette (primary `#1a3a6b`, accent `#f59e0b`), Inter + Plus Jakarta Sans als CSS-Variablen, HSL-CSS-Variables für shadcn-kompatibles Theme-Setup. globals.css neu mit Tailwind-3-Syntax. |
| 7. Git Init | ✅ | Branch `main`, erster Commit `chore: initial Next.js 14 + Sanity + Tailwind setup` (993bfbd) |
| 7b. GitHub Repo | ⏸️ | NICHT angelegt — wartet auf Lukes OK (`gh repo create elektro-sternhoff-website --private`) |
| 8. .env.local + .gitignore | ✅ | `.env.local.example` mit Sanity + Site + n8n-Stubs. `.gitignore` ergänzt um `.sanity-vision`, `sanity/dist`, `.idea`, `.vscode`. |
| 9. Smoke-Test | ✅ | `npm run dev` startet auf localhost:3000 (HTTP 200 verifiziert). `npm run build` läuft durch — siehe Bundle-Sizes unten. |
| 10. Vercel-Vorbereitung | ✅ | `vercel.json` mit Region `fra1` (Frankfurt), framework `nextjs`. `README.md` ersetzt mit Sternhoff-spezifischer Anleitung. **KEIN Deploy ausgeführt.** |

---

## 2. package.json — finale Dependencies

**dependencies:**
- next 14.2.35, react ^18, react-dom ^18
- sanity ^3.99.0, next-sanity ^9.12.3, @sanity/client ^7.22.0, @sanity/image-url ^2.1.1, @sanity/vision ^3.99.0
- framer-motion ^12.38.0, lucide-react ^1.11.0
- styled-components ^6.4.1, zod ^4.3.6
- react-hook-form ^7.74.0, @hookform/resolvers ^5.2.2
- clsx ^2.1.1, tailwind-merge ^3.5.0, class-variance-authority ^0.7.1
- react-is ^19.2.5 (Sanity-Peer-Workaround)
- radix-ui ^1.4.3, shadcn ^4.5.0, tw-animate-css ^1.4.0 (von shadcn-init übrig — können später entfernt werden, wenn shadcn-Strategie geklärt ist)

**devDependencies:**
- typescript ^5, @types/node ^20, @types/react ^18, @types/react-dom ^18
- tailwindcss ^3.4.1, postcss ^8
- eslint ^8, eslint-config-next 14.2.35

---

## 3. Smoke-Test Ergebnisse

### `npm run dev`
```
▲ Next.js 14.2.35
- Local:        http://localhost:3000
✓ Starting...
✓ Ready in 961ms
✓ Compiled / in 1326ms (553 modules)
HTTP/1.1 200 OK
```

### `npm run build`
```
▲ Next.js 14.2.35
✓ Compiled successfully
✓ Generating static pages (5/5)

Route (app)                              Size     First Load JS
┌ ○ /                                    8.9 kB         96.8 kB
├ ○ /_not-found                          876 B          88.8 kB
└ ○ /studio/[[...tool]]                  1.47 MB        1.56 MB
+ First Load JS shared by all            87.9 kB
```

Startseite-Bundle: **8.9 kB** (96.8 kB First Load JS) — gut für Phase 0. Studio-Bundle 1.47 MB ist Standard für embedded Sanity Studio.

---

## 4. Vorschlag für nächsten Schritt

Drei Optionen, in Empfehlungs-Reihenfolge:

1. **Sanity Project konkret anlegen** (5 Min, Luke-Action) — `sanity login` + `sanity init` lokal ausführen, dann `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local` setzen. Danach läuft `/studio` echt mit den 3 Schemas (standortseite, leistungsseite, blogartikel).

2. **Phase 1 starten — Layout + Startseite-Sections** (ux-builder + content-writer) — Header, Footer, StickyContactBar, MobileNav + Hero-Section laut Strategie-Brief Section 5. Parallel: shadcn-Strategie klären (Tailwind-4-Upgrade auf Next 16 ODER manuell Components kopieren).

3. **Audio-MP3 Bochum-Version generieren** (notebooklm-py, ~10 Min) — die alte `sternhoff-briefing.mp3` ist seit Prompt 7 inhaltlich überholt. Für das Meeting am 28.04.2026 wäre eine aktualisierte Version sinnvoll.

**Meine Empfehlung:** Option 1 + Option 3 vor dem Meeting (= Phase 0 vollständig abschließen), Option 2 startet ab Tag nach dem Meeting mit Sternhoff-Freigabe der Strategie.

---

## 5. Bekannte Themen / Nicht-Blocker

- shadcn-Komponenten fehlen (siehe Schritt 3b). Workaround dokumentiert.
- `react-is` ist Workaround gegen Sanity-Peer-Dep-Issue.
- `--legacy-peer-deps` ist im README dokumentiert für `npm install`.
- Nur 2 npm audit „high" Vulnerabilities aus Sanity-Dependency-Tree — werden in Phase 1 vor Production-Launch via `npm audit fix` adressiert.
- Studio-Route 1.47 MB Bundle ist erwartbar (Sanity Studio embed). Wenn Production-Site-Bundle <100 kB bleiben soll, kann `/studio` später als separates Subdomain ausgelagert werden.
