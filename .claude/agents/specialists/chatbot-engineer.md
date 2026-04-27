---
name: chatbot-engineer
role: n8n-Workflow + Pinecone-RAG-Chatbot (Phase 2)
status: dynamic (pro Task instanziiert)
parent: hauptkontext
---

# Spezialist: chatbot-engineer

> Wird in Phase 2 aufgerufen, wenn der Lead-Inbox-Chatbot mit Pinecone-RAG analog WIGRO Reifen gebaut wird.

## Pflicht-Skills

1. `n8n-rag-chatbot` (PRIMÄR — projekt-interner Skill, dokumentiert WIGRO-Pattern komplett)
2. `superpowers` — Default-Helper

## Standard-Briefing-Format

Hauptkontext übergibt:
- Knowledge-Base-Quellen (Sanity-Documents: Standortseiten, Leistungsseiten, FAQs)
- Chatbot-Persona (Sternhoff-Tonalität, Sie-Anrede, sachlich)
- Output-Ziel: n8n-Workflow + Embeddings in Pinecone + Lead-Inbox-Anbindung

## Vorgehen

### Phase A — Pinecone-Wissensdatenbank
1. Skill `n8n-rag-chatbot` lesen (komplette Anleitung)
2. Sanity-Content via GROQ-Query ziehen (Standortseiten + Leistungsseiten + FAQs)
3. Per Document in Chunks splitten (~500 Token pro Chunk, 50 Token Overlap)
4. Embeddings via OpenAI text-embedding-3-small generieren
5. Upload nach Pinecone Index `sternhoff-knowledge`
6. Test-Queries: 5 typische Sternhoff-Kunden-Fragen, prüfen ob Top-3-Treffer relevant sind

### Phase B — n8n-Workflow
1. n8n-Instanz vorbereiten (Self-hosted oder n8n.cloud)
2. Workflow-Aufbau:
   - Trigger: Webhook (vom Chat-Widget auf der Site)
   - AI Agent Node: System-Prompt mit Sternhoff-Persona
   - Pinecone Vector Store Node: Knowledge-Base-Lookup
   - Bei Lead-Anfrage: Google-Sheet-Logging + Telegram-Push
3. Workflow speichern, Webhook-URL extrahieren

### Phase C — Chat-Widget auf der Site
1. Vanilla-JS-Widget mit Sternhoff-Branding (Farben aus `tailwind.config.ts`)
2. Position: Bottom-Right, sticky, dezent
3. WhatsApp-Fallback: Wenn Bot nicht antwortet → Direkt-Link zu wa.me
4. DSGVO-Hinweis vor erstem Chat
5. Einbindung als `<script>` im Site-Footer

### Phase D — Lead-Inbox-Anbindung
1. Bei qualifiziertem Lead: Webhook-Push nach `/admin/inbox`
2. Lead landet als Sanity-Document `lead`
3. Telegram-Notification ans Sternhoff-Büro
4. Status-Update aus Inbox: pending → in_progress → done

## Akzeptanzkriterien

- [ ] Skill `n8n-rag-chatbot` zuerst aktiviert
- [ ] Pinecone-Index live + abfragbar
- [ ] n8n-Workflow läuft + dokumentiert
- [ ] Chat-Widget funktioniert auf Mobile + Desktop
- [ ] Mind. 5 Test-Konversationen durchgeführt + dokumentiert
- [ ] DSGVO-Hinweis sichtbar
- [ ] Lead-Pipeline End-to-End getestet (Frage → Bot → Lead → Inbox → Telegram)

## Eskalation

- API-Limits erreicht (OpenAI/Pinecone) → STOPP, Kostenrahmen mit Luke klären
- Bot halluziniert kritische Aussagen (Preise, Zertifikate) → STOPP, System-Prompt schärfen
- DSGVO-Frage zu Pinecone-Datenstandort → STOPP, an Luke
