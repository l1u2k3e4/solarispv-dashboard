# Vercel-Deploy-Anleitung — Sternhoff-Demo

**Ziel:** Zwei öffentliche URLs für das Sternhoff-Meeting:
- `https://sternhoff-demo.vercel.app/` — Marketing-Site (Vater zeigt dem Kunden)
- `https://sternhoff-tina.vercel.app/admin/inbox` — Lead-Inbox-Dashboard (Vater zeigt Tina)

Beides läuft aus dem **gleichen Git-Repo** als zwei separate Vercel-Projekte.

---

## Voraussetzungen (einmalig)

- ✅ GitHub-CLI eingeloggt (`gh auth status` zeigt grün) — bereits erfüllt
- ✅ Git-Repo lokal vorhanden in `website/` mit Commit `993bfbd` als Basis
- ⏳ GitHub-Repo erstellt (Schritt 1 unten)
- ⏳ Vercel-Account mit GitHub verknüpft (Schritt 3 unten)

---

## Schritt 1 — GitHub-Repo + Push (mache ich automatisch)

```bash
cd "/Users/lukekozik/Documents/Programme/Jobs/Elektro Sternhoff/website"
gh repo create elektro-sternhoff-website --private --source=. --remote=origin --push
```

Repo erscheint unter `https://github.com/l1u2k3e4/elektro-sternhoff-website` (privat).

---

## Schritt 2 — Vercel-Account mit GitHub verbinden (Browser, Luke)

1. Gehe zu **https://vercel.com/login**
2. Klick **„Continue with GitHub"** → Berechtigungen zustimmen
3. Bei der Frage „Install Vercel for GitHub" → wähle **Only select repositories** → `elektro-sternhoff-website` auswählen → **Install**

Nach diesem Schritt sieht Vercel das neue Repo.

---

## Schritt 3 — Erstes Vercel-Projekt: `sternhoff-demo` (Marketing-Site)

1. Gehe zu **https://vercel.com/new**
2. Wähle das Repo `elektro-sternhoff-website` → **Import**
3. Settings (in dieser Reihenfolge):
   - **Project Name:** `sternhoff-demo`
   - **Framework:** Next.js (wird automatisch erkannt)
   - **Root Directory:** leer lassen — `vercel.json` und `package.json` liegen im Repo-Root
   - **Build & Output Settings:** Nichts ändern, kommt aus `vercel.json`
4. **Environment Variables** (alle auf „Production" + „Preview" + „Development" aktiv):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = `demo-stub`
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
   - `NEXT_PUBLIC_SANITY_API_VERSION` = `2024-01-01`
   - `NEXT_PUBLIC_SITE_URL` = `https://sternhoff-demo.vercel.app`
   - `NEXT_PUBLIC_DEMO_MODE` = `true`
5. **Deploy** klicken

⏱️ Build dauert ~2–3 Min. Wenn grün: Site live unter `https://sternhoff-demo.vercel.app`

---

## Schritt 4 — Zweites Vercel-Projekt: `sternhoff-tina` (Dashboard)

Gleiches Repo, eigenes Vercel-Projekt mit eigener Subdomain.

1. **https://vercel.com/new** (nochmal)
2. Wähle wieder `elektro-sternhoff-website` → **Import**
3. Settings:
   - **Project Name:** `sternhoff-tina`
   - Rest identisch zu Schritt 3
4. Environment Variables (gleich wie oben, aber:):
   - `NEXT_PUBLIC_SITE_URL` = `https://sternhoff-tina.vercel.app`
   - Alle anderen identisch
5. **Deploy**

⏱️ ~2–3 Min. Live unter `https://sternhoff-tina.vercel.app/admin/inbox`

---

## Schritt 5 — Sanity-Cheat: WICHTIG

Falls Vercel-Build mit Fehler `"Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"` fehlschlägt: ENV-Variables nochmal prüfen, dass sie nicht nur im Vercel-Dashboard angelegt sind, sondern auch tatsächlich für **„Production"-Deploy** aktiv sind. Vergiss nicht: nach ENV-Änderung musst du im Tab „Deployments" → **Redeploy** anstoßen.

Die Stub-Werte sind harmlos — sie sorgen nur dafür, dass `assertValue` in `sanity/env.ts` nicht crasht. Das echte Sanity-Studio wird über die Stub-Page (`src/app/studio/[[...tool]]/page.tsx`) zur Demo-Page umgeleitet.

---

## Schritt 6 — Auto-Deploy testen

Lokale Änderung pushen → beide URLs aktualisieren sich automatisch:

```bash
cd "/Users/lukekozik/Documents/Programme/Jobs/Elektro Sternhoff/website"
git commit --allow-empty -m "test: trigger redeploy"
git push
```

Nach ~2 Min sind beide Vercel-Projekte aktualisiert.

---

## Schritt 7 — URLs an Vater senden

```
Hi Papa,

morgen für Sternhoff:

🌐 Hauptseite (was der Kunde sieht):
   https://sternhoff-demo.vercel.app

🛠 Tina-Tool (das Dashboard):
   https://sternhoff-tina.vercel.app/admin/inbox

Beides sind Demos, laufen auf jedem Gerät (Handy, Tablet, Laptop).
Probier vorher selbst durch — Status der Mock-Leads im Dashboard
ändern, im Chatbot eine Frage stellen wie "Was kostet ein E-Check?".

Bei Problemen: anrufen.
```

---

## Troubleshooting

### Build schlägt fehl mit Peer-Dep-Konflikt
Vercel ignoriert `.npmrc`? → Prüfe `vercel.json` enthält `"installCommand": "npm install --legacy-peer-deps"`. Falls ja, manuell unter Project → Settings → General → Install Command ein letzten Mal überschreiben.

### Studio-Route gibt 500
Erwartet wäre die Stub-Page. Heißt: ENV `NEXT_PUBLIC_SANITY_PROJECT_ID` ist nicht gesetzt oder hat einen anderen Wert als `demo-stub`. → Vercel-Dashboard prüfen.

### Lighthouse fällt < 90 nach Deploy
Cold-Start auf Vercel kostet manchmal 5–10 Punkte beim ersten Request. Mehrmals laden, dann stabilisiert sich. Hard-Gate ist auf localhost gemessen, Production-Werte können 2–4 Punkte abweichen.

### Domain umstellen (später)
Wenn Sternhoff sagt „Übernehmt das, wir wollen die Demo unter `demo.elektro-sternhoff.de`": in Vercel-Project → Settings → Domains → Custom Domain hinzufügen. DNS-Eintrag setzen, Auto-Deploy bleibt.
