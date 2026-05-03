"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Lead, LeadStatus } from "./types";
import { getMockLeads } from "./mock-leads";

const STORAGE_KEY = "solaris-pv-leads-v2";

export type DashboardStore = {
  leads: Lead[];
  selectedId: string | null;
  hydrated: boolean;
  setSelected: (id: string | null) => void;
  updateStatus: (id: string, status: LeadStatus) => void;
  updateNotizen: (id: string, notizen: string) => void;
  removeKiVorschlag: (id: string, vorschlagIndex: number) => void;
  updateKiVorschlag: (id: string, vorschlagIndex: number, text: string) => void;
};

const DashboardContext = createContext<DashboardStore | null>(null);

function safeReadStorage(): Lead[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Lead[];
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    return parsed;
  } catch {
    return null;
  }
}

function safeWriteStorage(leads: Lead[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  } catch {
    /* swallow */
  }
}

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedId, setSelectedIdState] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const fromStorage = safeReadStorage();
    if (fromStorage) {
      setLeads(fromStorage);
    } else {
      const seed = getMockLeads(new Date());
      setLeads(seed);
      safeWriteStorage(seed);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    safeWriteStorage(leads);
  }, [leads, hydrated]);

  const setSelected = useCallback((id: string | null) => {
    setSelectedIdState(id);
  }, []);

  const updateStatus = useCallback((id: string, status: LeadStatus) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, status, bearbeiteUm: new Date().toISOString() }
          : l
      )
    );
  }, []);

  const updateNotizen = useCallback((id: string, notizen: string) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, notizen, bearbeiteUm: new Date().toISOString() }
          : l
      )
    );
  }, []);

  const removeKiVorschlag = useCallback(
    (id: string, vorschlagIndex: number) => {
      setLeads((prev) =>
        prev.map((l) => {
          if (l.id !== id || !l.kiVorschlaege) return l;
          return {
            ...l,
            kiVorschlaege: l.kiVorschlaege.filter(
              (_, idx) => idx !== vorschlagIndex
            ),
          };
        })
      );
    },
    []
  );

  const updateKiVorschlag = useCallback(
    (id: string, vorschlagIndex: number, text: string) => {
      setLeads((prev) =>
        prev.map((l) => {
          if (l.id !== id || !l.kiVorschlaege) return l;
          return {
            ...l,
            kiVorschlaege: l.kiVorschlaege.map((v, idx) =>
              idx === vorschlagIndex ? { ...v, text } : v
            ),
          };
        })
      );
    },
    []
  );

  const value = useMemo<DashboardStore>(
    () => ({
      leads,
      selectedId,
      hydrated,
      setSelected,
      updateStatus,
      updateNotizen,
      removeKiVorschlag,
      updateKiVorschlag,
    }),
    [
      leads,
      selectedId,
      hydrated,
      setSelected,
      updateStatus,
      updateNotizen,
      removeKiVorschlag,
      updateKiVorschlag,
    ]
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard(): DashboardStore {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboard must be used within <DashboardProvider>");
  }
  return ctx;
}

export function useSelectedLead(): Lead | null {
  const { leads, selectedId } = useDashboard();
  if (!selectedId) return null;
  return leads.find((l) => l.id === selectedId) ?? null;
}
