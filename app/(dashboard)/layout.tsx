"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  Briefcase,
  ChevronRight,
  Command,
  FolderGit2,
  GraduationCap,
  Inbox,
  LayoutDashboard,
  Mail,
  MessageSquare,
  PanelLeft,
  Search,
  Sparkles,
  UserRound,
  Wrench,
  X,
} from "lucide-react";
import { ModeToggle } from "../../components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import { Separator } from "../../components/ui/separator";
import { cn } from "../../lib/utils";
import { DashboardProvider, useDashboard } from "../../lib/dashboard/store";

interface NavItem {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  badgeKey?: "pending" | "unread";
  desc: string;
}

const GROUPS: { label: string; items: NavItem[] }[] = [
  {
    label: "Utama",
    items: [
      { href: "/dashboard", label: "Ringkasan", icon: LayoutDashboard, desc: "Statistik umum dan aksi prioritas" },
      { href: "/dashboard/kunjungan", label: "Kunjungan", icon: BarChart3, desc: "Metrik lalu lintas portofolio" },
    ],
  },
  {
    label: "Konten",
    items: [
      { href: "/dashboard/profil", label: "Profil", icon: UserRound, desc: "Biodata, headline, dan foto" },
      { href: "/dashboard/projects", label: "Projects", icon: FolderGit2, desc: "Kelola portofolio karya" },
      { href: "/dashboard/experience", label: "Experience", icon: Briefcase, desc: "Riwayat karier dan peran kerja" },
      { href: "/dashboard/education", label: "Education", icon: GraduationCap, desc: "Riwayat pendidikan dan sertifikasi" },
      { href: "/dashboard/skills", label: "Skills", icon: Wrench, desc: "Daftar keahlian teknis & tools" },
      { href: "/dashboard/kontak", label: "Kontak", icon: Mail, desc: "Tautan media sosial dan surel" },
    ],
  },
  {
    label: "Moderasi",
    items: [
      { href: "/dashboard/komentar", label: "Komentar", icon: MessageSquare, badgeKey: "pending", desc: "Tinjau dan setujui komentar" },
      { href: "/dashboard/pesan", label: "Pesan", icon: Inbox, badgeKey: "unread", desc: "Kotak masuk formulir kontak" },
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

function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const allItems = useMemo(
    () => GROUPS.flatMap((g) => g.items.map((item) => ({ ...item, group: g.label }))),
    []
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return allItems;
    const q = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
    );
  }, [allItems, query]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20"
      role="dialog"
      aria-modal="true"
      aria-label="Pencarian Cepat Modul"
    >
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card p-0 shadow-2xl ring-1 ring-border/50">
        <div className="flex items-center gap-2.5 border-b border-border/80 px-4 py-3">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            type="text"
            placeholder="Cari modul atau menu dashboard..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm font-medium outline-hidden placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup pencarian"
            className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Tidak ada modul yang cocok dengan &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => {
                  router.push(item.href);
                  onClose();
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-accent group focus:bg-accent focus:outline-hidden"
              >
                <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <item.icon className="size-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{item.label}</span>
                    <span className="text-[10px] text-muted-foreground rounded bg-muted px-1.5 py-0.5">
                      {item.group}
                    </span>
                  </div>
                  <p className="line-clamp-1 text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground/50 group-hover:text-foreground" />
              </button>
            ))
          )}
        </div>
        <div className="flex items-center justify-between border-t border-border/60 bg-muted/40 px-3.5 py-2 text-[11px] text-muted-foreground">
          <span>Navigasi instan</span>
          <span>Tekan ESC untuk menutup</span>
        </div>
      </div>
    </div>
  );
}

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
      <div
        className={cn(
          "mb-5 flex items-center gap-3 px-1.5 py-1",
          collapsed && "justify-center px-0"
        )}
      >
        <div className="relative shrink-0">
          <Avatar className="size-9 ring-2 ring-primary/20 shadow-xs">
            {p.avatarUrl ? <AvatarImage src={p.avatarUrl} alt={p.name} /> : null}
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
              {p.initials || p.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span
            aria-hidden
            className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-sidebar bg-emerald-500"
            title="Status online"
          />
        </div>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground tracking-tight leading-none">
              {p.name}
            </p>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                <Sparkles className="size-2.5" />
                Admin Studio
              </span>
            </div>
          </div>
        )}
      </div>

      <nav aria-label="Navigasi dashboard" className="flex flex-col gap-4">
        {GROUPS.map((g) => (
          <div key={g.label}>
            {!collapsed && (
              <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                {g.label}
              </p>
            )}
            <div className="flex flex-col gap-0.5">
              {g.items.map((n) => {
                const active = isActive(pathname, n.href);
                const count = badgeFor("badgeKey" in n ? n.badgeKey : undefined);
                const isModeration = "badgeKey" in n;

                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    aria-current={active ? "page" : undefined}
                    title={collapsed ? `${n.label}${count > 0 ? ` (${count})` : ""}` : undefined}
                    className={cn(
                      "group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                      collapsed && "justify-center px-0",
                      active
                        ? "bg-primary text-primary-foreground shadow-xs shadow-primary/25"
                        : "text-muted-foreground hover:bg-accent/80 hover:text-accent-foreground"
                    )}
                  >
                    <n.icon
                      className={cn(
                        "size-4 shrink-0 transition-transform group-hover:scale-105",
                        active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                      )}
                      aria-hidden
                    />
                    {!collapsed && <span className="flex-1 truncate">{n.label}</span>}
                    {!collapsed && count > 0 && (
                      <Badge
                        variant={
                          active
                            ? "secondary"
                            : isModeration && n.badgeKey === "pending"
                            ? "warning"
                            : "destructive"
                        }
                        className={cn(
                          "h-5 min-w-5 justify-center px-1.5 text-[11px] tabular-nums font-semibold",
                          active && "bg-primary-foreground/20 text-primary-foreground border-transparent"
                        )}
                      >
                        {count}
                      </Badge>
                    )}
                    {collapsed && count > 0 && (
                      <span
                        aria-hidden
                        className={cn(
                          "absolute right-1.5 top-1.5 size-2 rounded-full",
                          n.badgeKey === "pending" ? "bg-amber-500" : "bg-rose-500"
                        )}
                      />
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
          <div className="rounded-xl border border-border/80 bg-gradient-to-br from-card via-card to-primary/5 p-3.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Penyimpanan Lokal Aktif
            </div>
            <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
              Semua perubahan data langsung tersinkronisasi dan tampil di portofolio publik.
            </p>
          </div>
        )}
        <Link
          href="/"
          title={collapsed ? "Kembali ke situs portofolio" : undefined}
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            collapsed && "justify-center px-0"
          )}
        >
          <ArrowLeft className="size-4 shrink-0 transition-transform hover:-translate-x-0.5" aria-hidden />
          {!collapsed && "Kembali ke situs"}
        </Link>
      </div>
    </>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const title =
    TITLES[pathname ?? ""] ??
    Object.entries(TITLES).find(([h]) => h !== "/dashboard" && pathname?.startsWith(h))?.[1] ??
    "Panel Admin";

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem("janfporto-sidebar-collapsed") === "1");
    } catch {
      // Abaikan: preferensi tersimpan opsional
    }

    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((v) => {
      try {
        localStorage.setItem("janfporto-sidebar-collapsed", v ? "0" : "1");
      } catch {
        // Abaikan
      }
      return !v;
    });
  };

  return (
    <div
      data-theme="dashboard"
      className="dashboard-theme flex min-h-screen w-full bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary"
    >
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      <aside
        className={cn(
          "sticky top-0 flex h-screen shrink-0 flex-col overflow-y-auto border-r border-sidebar-border bg-sidebar p-4 transition-all duration-200",
          collapsed ? "w-16 p-3" : "w-64"
        )}
      >
        <SidebarBody collapsed={collapsed} />
      </aside>

      <div className="min-w-0 flex-1 flex flex-col">
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center border-b border-border/80 bg-background/85 backdrop-blur-md px-6">
          <div className="flex w-full items-center gap-3">
            <button
              type="button"
              onClick={toggleCollapsed}
              aria-expanded={!collapsed}
              aria-label={collapsed ? "Bentangkan sidebar" : "Ciutkan sidebar"}
              title={collapsed ? "Bentangkan sidebar" : "Ciutkan sidebar"}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            >
              <PanelLeft className="size-4.5" aria-hidden />
            </button>

            <Separator orientation="vertical" className="h-4 bg-border/80" />

            <Breadcrumb className="hidden sm:block">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard" className="text-muted-foreground hover:text-foreground">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {pathname !== "/dashboard" && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{title}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>

            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Pencarian cepat modul (⌘K)"
                className="hidden md:flex h-9 items-center gap-2 rounded-lg border border-border/80 bg-card/60 px-3 text-xs text-muted-foreground shadow-2xs transition-colors hover:border-border hover:bg-card hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Search className="size-3.5" />
                <span>Cari modul...</span>
                <kbd className="pointer-events-none ml-2 flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                  <Command className="size-2.5" />
                  K
                </kbd>
              </button>

              <Separator orientation="vertical" className="h-4 hidden md:block bg-border/80" />

              <ModeToggle />

              <Link
                href="/dashboard/profil"
                title="Buka pengaturan profil"
                className="ml-1 flex items-center gap-2 rounded-full p-0.5 transition-transform hover:scale-105 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Avatar className="size-8 ring-1 ring-border">
                  <AvatarFallback className="bg-primary/10 text-[11px] font-bold text-primary">
                    AD
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </header>

        <main className="min-h-0 min-w-0 flex-1 p-6 md:p-8">{children}</main>
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