"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  Briefcase,
  Ellipsis,
  FolderGit2,
  GraduationCap,
  Inbox,
  LayoutDashboard,
  Mail,
  MessageSquare,
  UserRound,
  Wrench,
} from "lucide-react";
import { ModeToggle } from "../../components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
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

const PRIMARY = [
  { href: "/dashboard", label: "Ringkasan", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: FolderGit2 },
  { href: "/dashboard/kunjungan", label: "Kunjungan", icon: BarChart3 },
  { href: "/dashboard/komentar", label: "Komentar", icon: MessageSquare },
  { href: "/dashboard/pesan", label: "Pesan", icon: Inbox },
];

const SECONDARY = [
  { href: "/dashboard/profil", label: "Profil", icon: UserRound },
  { href: "/dashboard/experience", label: "Experience", icon: Briefcase },
  { href: "/dashboard/education", label: "Education", icon: GraduationCap },
  { href: "/dashboard/skills", label: "Skills", icon: Wrench },
  { href: "/dashboard/kontak", label: "Kontak", icon: Mail },
];

function isActive(pathname: string | null, href: string) {
  if (href === "/dashboard") return pathname === href;
  return pathname?.startsWith(href);
}

function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { state } = useDashboard();
  const [more, setMore] = useState(false);
  const pending = state.comments.filter((c) => c.status === "pending").length;
  const unread = state.messages.filter((m) => !m.read).length;
  const badgeFor = (k?: "pending" | "unread") =>
    k === "pending" ? pending : k === "unread" ? unread : 0;
  const title =
    TITLES[pathname ?? ""] ??
    Object.entries(TITLES).find(([h]) => h !== "/dashboard" && pathname?.startsWith(h))?.[1] ??
    "Panel Admin";
  const p = state.profile;

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col overflow-y-auto border-r bg-muted/30 p-4 md:flex">
        <div className="mb-4 flex items-center gap-2.5 px-1">
          <Avatar className="size-9">
            {p.avatarUrl ? <AvatarImage src={p.avatarUrl} alt={p.name} /> : null}
            <AvatarFallback>{p.initials || p.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{p.name}</p>
            <p className="text-xs text-muted-foreground">Panel Admin</p>
          </div>
        </div>
        <nav className="flex flex-col gap-4">
          {GROUPS.map((g) => (
            <div key={g.label}>
              <p className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {g.label}
              </p>
              <div className="flex flex-col gap-0.5">
                {g.items.map((n) => {
                  const active = isActive(pathname, n.href);
                  const count = badgeFor("badgeKey" in n ? n.badgeKey : undefined);
                  return (
                    <Link
                      key={n.href}
                      href={n.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                        active && "bg-accent font-medium text-accent-foreground"
                      )}
                    >
                      <n.icon className="size-4 shrink-0" aria-hidden />
                      <span className="flex-1">{n.label}</span>
                      {count > 0 && (
                        <Badge variant="secondary" className="h-5 min-w-5 justify-center px-1 text-[11px] tabular-nums">
                          {count}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2 pt-4">
          <div className="rounded-lg border bg-card p-3">
            <p className="text-xs font-semibold">Data tersimpan lokal</p>
            <p className="mt-0.5 line-clamp-3 text-xs text-muted-foreground">
              Perubahan langsung tampil di situs. Jaga badge moderasi tetap nol.
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <ArrowLeft className="size-4 shrink-0" aria-hidden />
            Kembali ke situs
          </Link>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 flex items-center gap-2 border-b bg-background/90 px-4 py-2.5 backdrop-blur md:px-6">
          <h1 className="text-sm font-semibold">{title}</h1>
          <div className="ml-auto flex items-center gap-1">
            <ModeToggle />
          </div>
        </header>
        <main className="mx-auto w-full max-w-5xl p-4 pb-24 md:p-6 md:pb-6">{children}</main>

        {more && (
          <div className="fixed inset-x-3 bottom-20 z-20 rounded-xl border bg-background p-2 shadow-lg md:hidden">
            <div className="grid grid-cols-2 gap-1">
              {SECONDARY.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setMore(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-accent",
                    isActive(pathname, n.href) && "bg-accent font-medium"
                  )}
                >
                  <n.icon className="size-4 shrink-0" aria-hidden />
                  {n.label}
                </Link>
              ))}
              <Link
                href="/"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent"
              >
                <ArrowLeft className="size-4 shrink-0" aria-hidden />
                Ke situs
              </Link>
            </div>
          </div>
        )}
        <nav aria-label="Navigasi bawah" className="fixed inset-x-0 bottom-0 z-20 border-t bg-background/95 backdrop-blur md:hidden">
          <div className="grid grid-cols-6 gap-0.5 px-2 pb-[env(safe-area-inset-bottom)] pt-1.5">
            {PRIMARY.map((n) => {
              const active = isActive(pathname, n.href);
              const count =
                (n.href === "/dashboard/komentar" && pending) ||
                (n.href === "/dashboard/pesan" && unread) ||
                0;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex flex-col items-center gap-0.5 rounded-md px-1 py-1.5 text-[10px] text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    active && "bg-accent font-medium text-accent-foreground"
                  )}
                >
                  <n.icon className="size-5" aria-hidden />
                  {n.label}
                  {count > 0 && (
                    <span className="absolute right-2 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground tabular-nums">
                      {count}
                    </span>
                  )}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => setMore((v) => !v)}
              aria-expanded={more}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-md px-1 py-1.5 text-[10px] text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                more && "bg-accent font-medium text-accent-foreground"
              )}
            >
              <Ellipsis className="size-5" aria-hidden />
              Lainnya
            </button>
          </div>
        </nav>
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
