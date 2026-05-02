"use client";

import { useEffect, useMemo, useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Toast } from "@/components/ui/Toast";
import { DemoBanner } from "@/components/dashboard/DemoBanner";
import { Sidebar, type SidebarView } from "@/components/dashboard/Sidebar";
import { LeadList, type LeadListTab } from "@/components/dashboard/LeadList";
import { LeadDetail } from "@/components/dashboard/LeadDetail";
import { useDashboard } from "@/lib/dashboard/store";

export function InboxShell() {
  const {
    leads,
    selectedId,
    hydrated,
    setSelected,
    updateStatus,
    updateNotizen,
    removeKiVorschlag,
    updateKiVorschlag,
  } = useDashboard();

  const [view, setView] = useState<SidebarView>("inbox");
  const [activeTab, setActiveTab] = useState<LeadListTab>("alle");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<"list" | "detail">("list");
  const [toast, setToast] = useState<string | null>(null);

  // Sidebar-View bestimmt Tab-Default
  useEffect(() => {
    if (view === "abgeschlossen") setActiveTab("abgeschlossen");
    if (view === "inbox") setActiveTab("alle");
  }, [view]);

  // Auf Mobile: Lead-Auswahl wechselt zur Detail-Ansicht
  function handleSelect(id: string) {
    setSelected(id);
    setMobilePanel("detail");
  }

  function handleBack() {
    setMobilePanel("list");
  }

  function handleSendKi() {
    setToast("Demo-Modus — würde im Live-Betrieb senden.");
  }

  function handleLogout() {
    setToast("Demo-Modus — Logout in Phase 2 verfügbar.");
  }

  function handleViewChange(next: SidebarView) {
    setView(next);
    setSidebarOpen(false);
    setMobilePanel("list");
  }

  const selectedLead = useMemo(
    () => leads.find((l) => l.id === selectedId) ?? null,
    [leads, selectedId]
  );

  const inboxBadge = useMemo(
    () => leads.filter((l) => l.status === "neu").length,
    [leads]
  );

  if (!hydrated) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="rounded-md border border-slate-200 bg-white px-6 py-4 text-sm text-slate-500 shadow-sm">
          Lead-Inbox wird geladen…
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <DemoBanner />

      {/* Mobile-Header */}
      <header className="flex flex-shrink-0 items-center justify-between border-b border-slate-200 bg-navy-500 px-4 py-2 text-white lg:hidden">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Navigation öffnen"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-white/10"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[260px] bg-navy-500 p-0">
            <Sidebar
              inboxBadge={inboxBadge}
              activeView={view}
              onViewChange={handleViewChange}
              onLogout={handleLogout}
              className="h-full"
            />
          </SheetContent>
        </Sheet>
        <div className="text-sm font-bold">Lead-Inbox</div>
        <span
          className="inline-flex min-w-[1.5rem] items-center justify-center rounded-pill bg-solaris-500 px-1.5 py-0.5 text-xs font-bold text-primary-foreground"
          aria-label={`${inboxBadge} neue Leads`}
        >
          {inboxBadge}
        </span>
      </header>

      {/* Desktop 3-Spalten / Mobile Stack */}
      <div className="grid h-full min-h-0 flex-1 lg:grid-cols-[220px_380px_1fr]">
        <div className="hidden lg:block">
          <Sidebar
            inboxBadge={inboxBadge}
            activeView={view}
            onViewChange={handleViewChange}
            onLogout={handleLogout}
          />
        </div>

        <div
          className={cn(
            "min-h-0 border-r border-slate-200 bg-white",
            mobilePanel === "list" ? "block" : "hidden",
            "lg:block"
          )}
        >
          <LeadList
            leads={leads}
            selectedId={selectedId}
            onSelect={handleSelect}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            className="h-full"
          />
        </div>

        <div
          className={cn(
            "min-h-0",
            mobilePanel === "detail" ? "block" : "hidden",
            "lg:block"
          )}
        >
          <LeadDetail
            lead={selectedLead}
            onStatusChange={(status) =>
              selectedLead && updateStatus(selectedLead.id, status)
            }
            onNotizenChange={(text) =>
              selectedLead && updateNotizen(selectedLead.id, text)
            }
            onDiscardKi={(idx) =>
              selectedLead && removeKiVorschlag(selectedLead.id, idx)
            }
            onEditKi={(idx, text) =>
              selectedLead && updateKiVorschlag(selectedLead.id, idx, text)
            }
            onSendKi={handleSendKi}
            onBack={handleBack}
            showBack
            className="h-full"
          />
        </div>
      </div>

      <Toast
        open={Boolean(toast)}
        message={toast ?? ""}
        onClose={() => setToast(null)}
        variant="info"
      />
    </div>
  );
}
