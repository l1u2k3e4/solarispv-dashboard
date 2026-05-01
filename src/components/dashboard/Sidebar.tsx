"use client";

import Image from "next/image";
import {
  CheckCircle2,
  Inbox,
  LogOut,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type SidebarView = "inbox" | "abgeschlossen" | "settings";

type Props = {
  inboxBadge: number;
  activeView: SidebarView;
  onViewChange: (view: SidebarView) => void;
  onLogout: () => void;
  className?: string;
};

type NavItem = {
  id: SidebarView;
  label: string;
  icon: LucideIcon;
  badge?: number;
  disabled?: boolean;
  phase2?: boolean;
};

export function Sidebar({
  inboxBadge,
  activeView,
  onViewChange,
  onLogout,
  className,
}: Props) {
  const items: NavItem[] = [
    { id: "inbox", label: "Inbox", icon: Inbox, badge: inboxBadge },
    { id: "abgeschlossen", label: "Abgeschlossen", icon: CheckCircle2 },
    {
      id: "settings",
      label: "Einstellungen",
      icon: Settings,
      disabled: true,
      phase2: true,
    },
  ];

  return (
    <aside
      className={cn(
        "flex h-full flex-col bg-sternhoff-primary p-4 text-white",
        className
      )}
      aria-label="Dashboard-Navigation"
    >
      <div className="mb-6 flex items-center justify-center rounded-md bg-white p-3">
        <Image
          src="/images/logo-solaris-pv.png"
          alt="Solaris PV"
          width={140}
          height={46}
          className="h-auto w-[140px]"
          priority
        />
      </div>

      <nav className="flex-1 space-y-1" aria-label="Hauptnavigation">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = !item.disabled && activeView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => !item.disabled && onViewChange(item.id)}
              disabled={item.disabled}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group relative flex w-full items-center gap-3 rounded-md border-l-4 border-transparent px-3 py-2.5 text-left text-sm font-semibold transition-colors",
                "hover:bg-white/10",
                isActive && "border-sternhoff-accent bg-white/15",
                item.disabled && "cursor-not-allowed opacity-60 hover:bg-transparent"
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <span className="flex-1">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span
                  className="inline-flex min-w-[1.5rem] items-center justify-center rounded-full bg-sternhoff-accent px-1.5 py-0.5 text-xs font-bold leading-none text-white"
                  aria-label={`${item.badge} neue Leads`}
                >
                  {item.badge}
                </span>
              )}
              {item.phase2 && (
                <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                  Phase 2
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-4 border-t border-white/15 pt-4">
        <div className="flex items-center gap-3">
          <span
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-sternhoff-accent text-sm font-bold text-white"
            aria-hidden="true"
          >
            T
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-bold">Tina</div>
            <div className="truncate text-xs text-white/70">Bürokraft</div>
          </div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-white/30 px-3 py-2 text-xs font-semibold text-white/90 transition-colors hover:bg-white/10"
        >
          <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
          Abmelden
        </button>
      </div>
    </aside>
  );
}
