"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  CheckCheck,
  FolderGit2,
  GraduationCap,
  Inbox,
  MessageSquare,
  MousePointerClick,
  Sparkles,
  TrendingUp,
  Wrench,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { useDashboard } from "../../../lib/dashboard/store";

const DAY = 86_400_000;

function startOfDay(t: number) {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export default function DashboardPage() {
  const { state, dispatch } = useDashboard();
  const now = Date.now();
  const pending = state.comments.filter((c) => c.status === "pending");
  const unread = state.messages.filter((m) => !m.read);
  const weekStart = startOfDay(now - 6 * DAY);
  const weekCount = state.visits.filter((v) => {
    const t = v.createdAt ? new Date(v.createdAt).getTime() : 0;
    return t >= weekStart;
  }).length;

  const days = Array.from({ length: 7 }, (_, i) => {
    const dayStart = startOfDay(now - (6 - i) * DAY);
    const count = state.visits.filter((v) => {
      const t = v.createdAt ? new Date(v.createdAt).getTime() : 0;
      return t >= dayStart && t < dayStart + DAY;
    }).length;
    const d = new Date(dayStart);
    return {
      weekday: d.toLocaleDateString("id-ID", { weekday: "short" }),
      date: d.toLocaleDateString("id-ID", { day: "numeric", month: "numeric" }),
      full: d.toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
      count,
    };
  });
  const max = Math.max(1, ...days.map((d) => d.count));

  const main = [
    {
      label: "Projects",
      value: state.projects.length,
      icon: FolderGit2,
      href: "/dashboard/projects",
      badge: `${state.projectTags.length} tag aktif`,
      badgeVariant: "info" as const,
      color: "from-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400 bg-indigo-500/15",
      ctx:
        state.projects.length === 0
          ? "Belum ada project yang tampil di situs."
          : `${state.projects.length} project aktif di halaman utama.`,
    },
    {
      label: "Kunjungan total",
      value: state.visits.length,
      icon: MousePointerClick,
      href: "/dashboard/kunjungan",
      badge: `+${weekCount} minggu ini`,
      badgeVariant: "success" as const,
      color: "from-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/15",
      ctx:
        state.visits.length === 0
          ? "Belum ada kunjungan tercatat."
          : `${weekCount} sesi tercatat dalam 7 hari terakhir.`,
    },
    {
      label: "Komentar pending",
      value: pending.length,
      icon: MessageSquare,
      href: "/dashboard/komentar",
      badge: pending.length > 0 ? "Perlu tinjauan" : "Semua bersih",
      badgeVariant: (pending.length > 0 ? "warning" : "success") as "warning" | "success",
      color: "from-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400 bg-amber-500/15",
      ctx:
        pending.length === 0
          ? "Semua komentar sudah dimoderasi."
          : `${pending.length} komentar menunggu persetujuan.`,
    },
    {
      label: "Pesan unread",
      value: unread.length,
      icon: Inbox,
      href: "/dashboard/pesan",
      badge: unread.length > 0 ? "Perlu dibaca" : "Kotak bersih",
      badgeVariant: (unread.length > 0 ? "destructive" : "success") as "destructive" | "success",
      color: "from-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400 bg-rose-500/15",
      ctx:
        unread.length === 0
          ? "Semua pesan masuk telah dibaca."
          : `${unread.length} pesan belum dibuka.`,
    },
  ];

  const secondary = [
    {
      label: "Experience",
      value: state.experiences.length,
      icon: Briefcase,
      href: "/dashboard/experience",
      color: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
    },
    {
      label: "Education",
      value: state.educations.length,
      icon: GraduationCap,
      href: "/dashboard/education",
      color: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
    },
    {
      label: "Skills",
      value: state.skills.length,
      icon: Wrench,
      href: "/dashboard/skills",
      color: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    },
  ];

  const needAction = pending.length + unread.length > 0;

  return (
    <div className="@container/main flex flex-col gap-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-border/80 bg-gradient-to-r from-card via-card to-primary/5 p-6 shadow-xs">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Ringkasan Portofolio
            </h2>
            <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              <Sparkles className="size-3" />
              Live Sync
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Selamat datang kembali, <span className="font-semibold text-foreground">{state.profile.name}</span>. Pantau statistik dan kelola data portofolio Anda secara real-time.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" asChild>
            <Link href="/" target="_blank" className="gap-1.5">
              <span>Lihat Situs</span>
              <ArrowUpRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Main 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {main.map((c) => (
          <Link key={c.label} href={c.href} className="group min-w-0 transition-transform duration-150 hover:-translate-y-0.5">
            <Card className="h-full border border-border/80 bg-gradient-to-br from-card via-card to-primary/5 shadow-xs transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {c.label}
                </CardDescription>
                <div className={`flex size-9 items-center justify-center rounded-xl ${c.color} shadow-2xs`}>
                  <c.icon className="size-4.5" aria-hidden />
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-3xl font-extrabold tabular-nums tracking-tight text-foreground">
                    {c.value}
                  </span>
                  <Badge variant={c.badgeVariant}>{c.badge}</Badge>
                </div>
                <p className="line-clamp-1 text-xs text-muted-foreground">{c.ctx}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Secondary 3 Quick Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {secondary.map((c) => (
          <Link key={c.label} href={c.href} className="min-w-0 group">
            <Card className="py-3.5 transition-all hover:border-primary/40 hover:bg-card/90 shadow-2xs">
              <CardContent className="flex items-center gap-3.5 px-4">
                <div className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${c.color} shadow-2xs`}>
                  <c.icon className="size-4.5" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-muted-foreground">{c.label}</p>
                  <p className="text-xl font-bold tabular-nums text-foreground">{c.value}</p>
                </div>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Chart & Action Items Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Visual Chart Card */}
        <Card className="lg:col-span-3 border border-border/80 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-base font-bold">
                <TrendingUp className="size-4 text-primary" />
                Tren Kunjungan Harian
              </CardTitle>
              <CardDescription className="text-xs">
                {weekCount === 0
                  ? "Belum ada catatan lalu lintas minggu ini."
                  : `Total ${weekCount} kunjungan dari tanggal ${days[0].full} sampai ${days[6].full}.`}
              </CardDescription>
            </div>
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary tabular-nums">
              7 Hari Terakhir
            </span>
          </CardHeader>
          <CardContent>
            <div
              className="flex h-44 items-end gap-3 pt-4 border-b border-border/40 pb-2"
              role="img"
              aria-label={`Grafik kunjungan 7 hari terakhir: total ${weekCount}`}
            >
              {days.map((d) => (
                <div key={d.full} className="group relative flex min-w-0 flex-1 flex-col items-center gap-2">
                  <span className="text-xs font-semibold tabular-nums text-muted-foreground group-hover:text-primary transition-colors">
                    {d.count}
                  </span>
                  <div className="relative w-full flex items-end justify-center h-28 bg-muted/30 rounded-t-lg overflow-hidden">
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-primary/70 via-primary/90 to-primary transition-all duration-200 group-hover:brightness-110 shadow-xs shadow-primary/30"
                      style={{ height: `${Math.max(6, (d.count / max) * 110)}px` }}
                      title={`${d.full}: ${d.count} kunjungan`}
                    />
                  </div>
                  <span className="text-xs font-medium text-foreground">{d.weekday}</span>
                  <span className="text-[10px] tabular-nums text-muted-foreground">{d.date}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>Sesi pengunjung tercatat lokal</span>
              <Link href="/dashboard/kunjungan" className="font-semibold text-primary hover:underline">
                Lihat rincian kunjungan &rarr;
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Perlu Tindakan Card */}
        <Card className="lg:col-span-2 border border-border/80 shadow-xs">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold">Perlu Tindakan</CardTitle>
              {needAction && (
                <Badge variant="warning">
                  {pending.length + unread.length} tertunda
                </Badge>
              )}
            </div>
            <CardDescription className="text-xs">
              {needAction
                ? `${pending.length} komentar pending dan ${unread.length} pesan baru.`
                : "Semua moderasi dan pesan dalam kondisi aman."}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2.5">
            {!needAction && (
              <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/80 bg-muted/20 py-8 px-4 text-center">
                <div className="flex size-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <CheckCheck className="size-5" />
                </div>
                <p className="text-sm font-semibold text-foreground">Semua Beres!</p>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Tidak ada komentar yang menunggu moderasi atau pesan baru yang belum dibaca.
                </p>
              </div>
            )}
            {pending.slice(0, 2).map((c) => (
              <div
                key={c.id}
                className="flex flex-col gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-xs font-bold text-foreground">
                        {c.name}
                      </span>
                      <Badge variant="warning" className="text-[10px] h-4 px-1.5">
                        Komentar
                      </Badge>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
                      &ldquo;{c.message}&rdquo;
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-1 border-t border-amber-500/15">
                  <Button size="sm" variant="outline" className="h-7 text-xs" asChild>
                    <Link href="/dashboard/komentar">Tinjau</Link>
                  </Button>
                  <Button
                    size="sm"
                    className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => dispatch({ type: "set-comment-status", id: c.id, status: "approved" })}
                  >
                    Setujui
                  </Button>
                </div>
              </div>
            ))}
            {unread.slice(0, 2).map((m) => (
              <div
                key={m.id}
                className="flex flex-col gap-2 rounded-xl border border-rose-500/20 bg-rose-500/5 p-3.5 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-xs font-bold text-foreground">
                        {m.name}
                      </span>
                      <Badge variant="destructive" className="text-[10px] h-4 px-1.5">
                        Pesan
                      </Badge>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
                      &ldquo;{m.message}&rdquo;
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-1 border-t border-rose-500/15">
                  <Button size="sm" variant="outline" className="h-7 text-xs" asChild>
                    <Link href="/dashboard/pesan">Buka</Link>
                  </Button>
                  <Button
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => dispatch({ type: "set-message-read", id: m.id, read: true })}
                  >
                    Tandai dibaca
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}