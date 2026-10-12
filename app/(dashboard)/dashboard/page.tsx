"use client";

import Link from "next/link";
import {
  Briefcase,
  CheckCheck,
  FolderGit2,
  GraduationCap,
  Inbox,
  MessageSquare,
  MousePointerClick,
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
      badge: `${state.projectTags.length} tag`,
      ctx:
        state.projects.length === 0
          ? "Belum ada project yang tampil di situs."
          : `${state.projects.length} project tampil di halaman utama.`,
    },
    {
      label: "Kunjungan total",
      value: state.visits.length,
      icon: MousePointerClick,
      href: "/dashboard/kunjungan",
      badge: `${weekCount} minggu ini`,
      ctx:
        state.visits.length === 0
          ? "Belum ada kunjungan tercatat."
          : `${weekCount} kunjungan dalam 7 hari terakhir.`,
    },
    {
      label: "Komentar pending",
      value: pending.length,
      icon: MessageSquare,
      href: "/dashboard/komentar",
      badge: pending.length > 0 ? "Perlu moderasi" : "Aman",
      badgeVariant: (pending.length > 0 ? "destructive" : "secondary") as "destructive" | "secondary",
      ctx:
        pending.length === 0
          ? "Semua komentar sudah dimoderasi."
          : `${pending.length} komentar menunggu disetujui atau ditolak.`,
    },
    {
      label: "Pesan unread",
      value: unread.length,
      icon: Inbox,
      href: "/dashboard/pesan",
      badge: unread.length > 0 ? "Perlu dibaca" : "Aman",
      badgeVariant: (unread.length > 0 ? "destructive" : "secondary") as "destructive" | "secondary",
      ctx:
        unread.length === 0
          ? "Kotak masuk sudah dibaca semua."
          : `${unread.length} pesan belum dibaca.`,
    },
  ];

  const secondary = [
    { label: "Experience", value: state.experiences.length, icon: Briefcase, href: "/dashboard/experience" },
    { label: "Education", value: state.educations.length, icon: GraduationCap, href: "/dashboard/education" },
    { label: "Skills", value: state.skills.length, icon: Wrench, href: "/dashboard/skills" },
  ];

  const needAction = pending.length + unread.length > 0;

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div className="flex min-w-0 flex-col gap-1">
        <h2 className="text-2xl font-semibold tracking-tight">Ringkasan</h2>
        <p className="text-sm text-muted-foreground">
          Halo, {state.profile.name}. Pantau dan kelola isi portofolio dari sini.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
        {main.map((c) => (
          <Link key={c.label} href={c.href} className="min-w-0">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>
                  <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                    <c.icon className="size-4" aria-hidden />
                  </div>
                </CardTitle>
                <CardDescription>{c.label}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-3xl font-medium tabular-nums leading-none tracking-tight">
                    {c.value}
                  </div>
                  <Badge variant={c.badgeVariant ?? "secondary"}>{c.badge}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{c.ctx}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {secondary.map((c) => (
          <Link key={c.label} href={c.href} className="min-w-0">
            <Card className="gap-2 py-4 transition-colors hover:border-foreground/30">
              <CardContent className="flex items-center gap-3 px-4">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                  <c.icon className="size-4" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-muted-foreground">{c.label}</p>
                  <p className="text-xl font-bold tabular-nums leading-tight">{c.value}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
      <Card className="xl:col-span-3">
        <CardHeader>
          <CardTitle>Kunjungan per hari, 7 hari terakhir</CardTitle>
          <CardDescription>
            {weekCount === 0
              ? "Belum ada kunjungan minggu ini."
              : `${weekCount} kunjungan dari ${days[0].full} sampai ${days[6].full}.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-36 items-end gap-2" role="img" aria-label={`Kunjungan 7 hari terakhir, total ${weekCount}`}>
            {days.map((d) => (
              <div key={d.full} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
                <span className="text-xs font-medium tabular-nums">{d.count}</span>
                <div
                  className="w-full rounded-t bg-primary/80"
                  style={{ height: `${Math.max(4, (d.count / max) * 96)}px` }}
                  title={`${d.full}: ${d.count} kunjungan`}
                />
                <span className="text-[11px] text-muted-foreground">{d.weekday}</span>
                <span className="text-[10px] tabular-nums text-muted-foreground/80">{d.date}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle>Perlu tindakan</CardTitle>
          <CardDescription>
            {needAction
              ? `${pending.length} komentar pending dan ${unread.length} pesan unread.`
              : "Tidak ada yang menunggu, semua sudah beres."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {!needAction && (
            <div className="flex items-center gap-2 rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
              <CheckCheck className="size-4 shrink-0" aria-hidden />
              Kotak moderasi kosong. Komentar baru dan pesan masuk akan muncul di sini.
            </div>
          )}
          {pending.slice(0, 3).map((c) => (
            <div key={c.id} className="flex flex-wrap items-center gap-2 rounded-lg border p-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  Komentar dari {c.name}
                </p>
                <p className="line-clamp-1 text-xs text-muted-foreground">{c.message}</p>
              </div>
              <div className="flex gap-1.5">
                <Button size="sm" variant="outline" asChild>
                  <Link href="/dashboard/komentar">Tinjau</Link>
                </Button>
                <Button
                  size="sm"
                  onClick={() => dispatch({ type: "set-comment-status", id: c.id, status: "approved" })}
                >
                  Setujui
                </Button>
              </div>
            </div>
          ))}
          {unread.slice(0, 3).map((m) => (
            <div key={m.id} className="flex flex-wrap items-center gap-2 rounded-lg border p-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">Pesan dari {m.name}</p>
                <p className="line-clamp-1 text-xs text-muted-foreground">{m.message}</p>
              </div>
              <div className="flex gap-1.5">
                <Button size="sm" variant="outline" asChild>
                  <Link href="/dashboard/pesan">Buka</Link>
                </Button>
                <Button
                  size="sm"
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
