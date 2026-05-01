"use client";

import Image from "next/image";
import { Send, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import { useChat } from "@/lib/chat/store";
import { renderMarkdown } from "@/lib/chat/markdown";
import { getMockResponse } from "@/lib/chat/mock-responses";

type Message = {
  role: "user" | "bot";
  text: string;
  timestamp: string;
  loading?: boolean;
};

const SESSION_STORAGE_KEY = "solaris-pv-chat-session";
const FALLBACK_TEXT =
  "Entschuldigung, ich habe gerade ein technisches Problem. Bitte rufen Sie uns direkt unter **0234 / 92 339 560** an.";
const GREETING: Message = {
  role: "bot",
  text: "Hallo! Ich bin der KI-Assistent von Elektro Sternhoff. Wie kann ich Ihnen helfen?",
  timestamp: "",
};

export function ChatWidget() {
  const { open, setOpen } = useChat();
  const webhookUrl = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK;
  const isDemoMode = !webhookUrl;

  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // SSR-safe sessionId initialization (no hydration mismatch)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (existing) {
        setSessionId(existing);
        return;
      }
      const fresh =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `solaris-pv-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, fresh);
      setSessionId(fresh);
    } catch {
      // sessionStorage may be blocked — fall back to in-memory id
      setSessionId(`solaris-pv-${Date.now()}`);
    }
  }, []);

  // Stamp greeting timestamp client-side to avoid hydration mismatch
  useEffect(() => {
    setMessages((prev) =>
      prev.map((m, i) => (i === 0 && !m.timestamp ? { ...m, timestamp: new Date().toISOString() } : m))
    );
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    if (!open) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // Focus textarea when widget opens
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => textareaRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const max = 96; // ~3 lines
    el.style.height = `${Math.min(el.scrollHeight, max)}px`;
  }, [input]);

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const userMessage: Message = {
      role: "user",
      text: trimmed,
      timestamp: new Date().toISOString(),
    };
    const loadingMessage: Message = {
      role: "bot",
      text: "",
      timestamp: new Date().toISOString(),
      loading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setInput("");
    setIsSending(true);

    let botText = FALLBACK_TEXT;

    try {
      if (webhookUrl) {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            action: "sendMessage",
            chatInput: trimmed,
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: { output?: string } = await res.json();
        botText = data.output?.trim() || FALLBACK_TEXT;
      } else {
        botText = await getMockResponse(trimmed);
      }
    } catch {
      botText = FALLBACK_TEXT;
    } finally {
      setMessages((prev) => {
        const next = [...prev];
        const lastIndex = next.length - 1;
        if (lastIndex >= 0 && next[lastIndex].loading) {
          next[lastIndex] = {
            role: "bot",
            text: botText,
            timestamp: new Date().toISOString(),
          };
        } else {
          next.push({
            role: "bot",
            text: botText,
            timestamp: new Date().toISOString(),
          });
        }
        return next;
      });
      setIsSending(false);
    }
  }, [input, isSending, sessionId, webhookUrl]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      void handleSend();
    },
    [handleSend]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        void handleSend();
      }
    },
    [handleSend]
  );

  const renderedMessages = useMemo(
    () =>
      messages.map((message, index) => {
        if (message.role === "user") {
          return (
            <div
              key={`u-${index}`}
              className="flex justify-end"
            >
              <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-4 py-2 text-primary-foreground shadow-sm">
                <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                  {message.text}
                </p>
              </div>
            </div>
          );
        }

        return (
          <div key={`b-${index}`} className="flex items-end gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-slate-200">
              <Image
                src="/images/logo-solaris-pv.png"
                alt="Logo Solaris PV"
                width={24}
                height={24}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="max-w-[80%] rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-4 py-2 text-sm leading-relaxed text-foreground shadow-sm">
              {message.loading ? (
                <span
                  className="inline-flex items-center gap-1"
                  aria-label="Bot tippt"
                >
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s] motion-reduce:animate-none" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s] motion-reduce:animate-none" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 motion-reduce:animate-none" />
                </span>
              ) : (
                <div
                  className="space-y-2 [&_a]:text-solaris-700 [&_a]:underline [&_strong]:font-semibold"
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(message.text),
                  }}
                />
              )}
            </div>
          </div>
        );
      }),
    [messages]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-white shadow-2xl lg:inset-auto lg:bottom-6 lg:right-6 lg:h-[600px] lg:max-h-[80vh] lg:w-[380px] lg:overflow-hidden lg:rounded-2xl"
      role="dialog"
      aria-modal="true"
      aria-label="Chatbot Elektro Sternhoff"
    >
      {/* Header */}
      <div className="flex items-center gap-3 bg-navy-500 p-4 text-white">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
          <Image
            src="/images/logo-solaris-pv.png"
            alt="Logo Solaris PV"
            width={32}
            height={32}
            className="h-7 w-auto object-contain"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-bold leading-tight">Elektro Sternhoff</p>
          <p className="text-xs opacity-80">Wir antworten in Min.</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Chat schließen"
          className="rounded-full p-1 text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Demo-Modus-Banner */}
      {isDemoMode ? (
        <div className="border-b border-yellow-200 bg-yellow-50 px-4 py-1 text-xs text-gray-500">
          Demo-Modus · 5 Beispiel-Antworten · Live-Bot kommt mit n8n-Anbindung.
        </div>
      ) : null}

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
        {renderedMessages}
        <div ref={messagesEndRef} />
      </div>

      {/* Input-Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 border-t border-slate-200 bg-white p-3"
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Stellen Sie Ihre Frage..."
          aria-label="Nachricht an den Chatbot"
          rows={1}
          className="flex-1 resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-solaris-500 focus:ring-1 focus:ring-solaris-500"
          disabled={isSending}
        />
        <button
          type="submit"
          disabled={!input.trim() || isSending}
          aria-label="Nachricht senden"
          className="flex shrink-0 items-center justify-center rounded-xl bg-primary p-3 text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
