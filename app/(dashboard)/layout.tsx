"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Inbox,
  LayoutDashboard,
  Mail,
  MessageSquare,
  PanelLeft,
  UserRound,
  Wrench,
} from "lucide-react";
import { ModeToggle } from "../../components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { cn } from "../../lib/utils";
import { DashboardProvider, useDashboard } from "../../lib/dashboard/store";

const GROUPS = [
  {
    label: "Utama",
    items: [
      { href: "/dashboard", label: "Ringkasan", icon: LayoutDashboard },
      { href: "/dashboard/kunjungan", label: "Kunjungan", icon: BarChart3 },
    ],
  },
  {
    label: "Konten",
    items: [
      { href: "/dashboard/profil", label: "Profil", icon: UserRound },
      { href: "/dashboard/projects", label: "Projects", icon: FolderGit2 },
      { href: "/dashboard/experience", label: "Experience", icon: Briefcase },
      { href: "/dashboard/education", label: "Education", icon: GraduationCap },
      { href: "/dashboard/skills", label: "Skills", icon: Wrench },
      { href: "/dashboard/kontak", label: "Kontak", icon: Mail },
    ],
  },
  {
    label: "Moderasi",
    items: [
      { href: "/dashboard/komentar", label: "Komentar", icon: MessageSquare, badgeKey: "pending" as const },
      { href: "/dashboard/pesan", label: "Pesan", icon: Inbox, badgeKey: "unread" as const },
    ],
  },
];

const TITLES: Record<string, string> = {
  "/dashboard": "Ringkasan",
  "/dashboard/kunjungan": "Kunjungan",
  "/dashboard/profil": "Profil",
  "/dashboard/projects": "Projects",
  "/dashboard/experience": "Experience",
  "/dashboard/education": "Education",
  "/dashboard/skills": "Skills",
  "/dashboard/kontak": "Kontak",
  "/dashboard/komentar": "Komentar",
  "/dashboard/pesan": "Pesan",
};

function isActive(pathname: string | null, href: string) {
  if (href === "/dashboard") return pathname === href;
  return pathname?.startsWith(href);
}

// Dashboard tampil mode desktop penuh di semua layar: sidebar selalu
// terlihat, konten min 1024px dengan scroll horizontal di layar kecil.
// Portofolio (landing) tetap responsif; hanya /dashboard yang desktop-only.
function SidebarBody({ collapsed }: { collapsed?: boolean }) {
  const pathname = usePathname();
  const { state } = useDashboard();
  const pending = state.comments.filter((c) => c.status === "pending").length;
  const unread = state.messages.filter((m) => !m.read).length;
  const badgeFor = (k?: "pending" | "unread") =>
    k === "pending" ? pending : k === "unread" ? unread : 0;
  const p = state.profile;

  return (
    <>
      <div className={cn("mb-4 flex items-center gap-2.5 px-1", collapsed && "justify-center px-0")}>
        <Avatar className="size-9 shrink-0">
          {p.avatarUrl ? <AvatarImage src={p.avatarUrl} alt={p.name} /> : null}
          <AvatarFallback>{p.initials || p.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{p.name}</p>
            <p className="text-xs text-muted-foreground">Panel Admin</p>
          </div>
        )}
      </div>
      <nav aria-label="Navigasi dashboard" className="flex flex-col gap-4">
        {GROUPS.map((g) => (
          <div key={g.label}>
            {!collapsed && (
              <p className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {g.label}
              </p>
            )}
            <div className="flex flex-col gap-0.5">
              {g.items.map((n) => {
                const active = isActive(pathname, n.href);
                const count = badgeFor("badgeKey" in n ? n.badgeKey : undefined);
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    aria-current={active ? "page" : undefined}
                    title={collapsed ? n.label : undefined}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                      collapsed && "relative justify-center px-0",
                      active && "bg-accent font-medium text-accent-foreground"
                    )}
                  >
                    <n.icon className="size-4 shrink-0" aria-hidden />
                    {!collapsed && <span className="flex-1">{n.label}</span>}
                    {!collapsed && count > 0 && (
                      <Badge variant="secondary" className="h-5 min-w-5 justify-center px-1 text-[11px] tabular-nums">
                        {count}
                      </Badge>
                    )}
                    {collapsed && count > 0 && (
                      <span aria-hidden className="absolute right-1.5 top-1.5 size-2 rounded-md bg-primary" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="mt-auto flex flex-col gap-2 pt-4">
        {!collapsed && (
          <div className="rounded-lg border bg-card p-3">
            <p className="text-xs font-semibold">Data tersimpan lokal</p>
            <p className="mt-0.5 line-clamp-3 text-xs text-muted-foreground">
              Perubahan langsung tampil di situs. Jaga badge moderasi tetap nol.
            </p>
          </div>
        )}
        <Link
          href="/"
          title={collapsed ? "Kembali ke situs" : undefined}
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            collapsed && "justify-center px-0"
          )}
        >
          <ArrowLeft className="size-4 shrink-0" aria-hidden />
          {!collapsed && "Kembali ke situs"}
        </Link>
      </div>
    </>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const title =
    TITLES[pathname ?? ""] ??
    Object.entries(TITLES).find(([h]) => h !== "/dashboard" && pathname?.startsWith(h))?.[1] ??
    "Panel Admin";

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem("janfporto-sidebar-collapsed") === "1");
    } catch {
      // Abaikan: sidebar tetap mode penuh bila penyimpanan tak tersedia.
    }
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((v) => {
      try {
        localStorage.setItem("janfporto-sidebar-collapsed", v ? "0" : "1");
      } catch {
        // Abaikan: preferensi lipat sidebar tidak wajib tersimpan.
      }
      return !v;
    });
  };

  return (
    <div className="overflow-x-auto bg-muted/40">
      <div className="mx-auto flex min-h-screen w-[1280px]">
        <aside
          className={cn(
            "sticky top-0 flex h-screen shrink-0 flex-col overflow-y-auto border-r bg-sidebar p-4 transition-[width]",
            collapsed ? "w-16 p-3" : "w-60"
          )}
        >
          <SidebarBody collapsed={collapsed} />
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center gap-2 border-b bg-background/90 backdrop-blur">
            <div className="flex w-full items-center gap-1 px-6">
              <button
                type="button"
                onClick={toggleCollapsed}
                aria-expanded={!collapsed}
                aria-label={collapsed ? "Bentangkan sidebar" : "Ciutkan sidebar"}
                title={collapsed ? "Bentangkan sidebar" : "Ciutkan sidebar"}
                className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <PanelLeft className="size-5" aria-hidden />
              </button>
              <Separator orientation="vertical" className="mx-2 h-4 self-center" />
              <h1 className="text-sm font-semibold">{title}</h1>
              <div className="ml-auto flex items-center gap-1">
                <ModeToggle />
              </div>
            </div>
          </header>
          <main className="min-h-0 min-w-0 flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <Shell>{children}</Shell>
    </DashboardProvider>
  );
}
