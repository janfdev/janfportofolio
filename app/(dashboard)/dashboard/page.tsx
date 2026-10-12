"use client";

import Link from "next/link";
import {
  Briefcase,
  FolderGit2,
  Inbox,
  MessageSquare,
  MousePointerClick,
  Wrench,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { useDashboard } from "../../../lib/dashboard/store";

const DAY = 86_400_000;

function startOfDay(t: number) {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export default function DashboardPage() {
  const { state } = useDashboard();
  const now = Date.now();
  const pending = state.comments.filter((c) => c.status === "pending").length;
  const unread = state.messages.filter((m) => !m.read).length;

  // Kunjungan 7 hari terakhir (urutan kronologis untuk batang CSS).
  const days = Array.from({ length: 7 }, (_, i) => {
    const dayStart = startOfDay(now - (6 - i) * DAY);
    const count = state.visits.filter((v) => {
      const t = v.createdAt ? new Date(v.createdAt).getTime() : 0;
      return t >= dayStart && t < dayStart + DAY;
    }).length;
    return { label: new Date(dayStart).toLocaleDateString("id-ID", { weekday: "short" }), count };
  });
  const max = Math.max(1, ...days.map((d) => d.count));

  const activity = [
    ...state.comments.map((c) => ({
      at: c.createdAt ? new Date(c.createdAt).getTime() : 0,
      text: `Komentar ${c.status} dari ${c.name}`,
      href: "/dashboard/komentar",
    })),
    ...state.messages.map((m) => ({
      at: m.createdAt ? new Date(m.createdAt).getTime() : 0,
      text: `Pesan ${m.read ? "" : "baru "}dari ${m.name}`,
      href: "/dashboard/pesan",
    })),
    ...state.visits.slice(0, 5).map((v) => ({
      at: v.createdAt ? new Date(v.createdAt).getTime() : 0,
      text: `Kunjungan ${v.path}`,
      href: "/dashboard/kunjungan",
    })),
  ]
    .sort((a, b) => b.at - a.at)
    .slice(0, 6);

  const cards = [
    { label: "Projects", value: state.projects.length, icon: FolderGit2, href: "/dashboard/projects" },
    { label: "Experience", value: state.experiences.length, icon: Briefcase, href: "/dashboard/experience" },
    { label: "Skills", value: state.skills.length, icon: Wrench, href: "/dashboard/skills" },
    { label: "Kunjungan", value: state.visits.length, icon: MousePointerClick, href: "/dashboard/kunjungan" },
    { label: "Komentar pending", value: pending, icon: MessageSquare, href: "/dashboard/komentar" },
    { label: "Pesan belum dibaca", value: unread, icon: Inbox, href: "/dashboard/pesan" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Ringkasan</h1>
        <p className="text-sm text-muted-foreground">
          Halo, {state.profile.name}. Pantau dan kelola isi portofolio dari sini.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} href={c.href}>
            <Card className="gap-2 py-4 transition-colors hover:border-foreground/30">
              <CardHeader className="px-4">
                <CardTitle className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <c.icon className="size-4" />
                  {c.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4">
                <p className="text-2xl font-bold">{c.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Kunjungan 7 hari terakhir</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-32 items-end gap-2">
            {days.map((d) => (
              <div key={d.label} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="text-xs font-medium tabular-nums">{d.count}</span>
                <div
                  className="w-full rounded-t bg-primary/80"
                  style={{ height: `${Math.max(4, (d.count / max) * 96)}px` }}
                  title={`${d.count} kunjungan`}
                />
                <span className="text-[11px] text-muted-foreground">{d.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Aktivitas terakhir</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {activity.length === 0 && (
            <p className="text-sm text-muted-foreground">Belum ada aktivitas.</p>
          )}
          {activity.map((a, i) => (
            <Link
              key={i}
              href={a.href}
              className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
            >
              <span className="truncate">{a.text}</span>
              <Badge variant="outline" className="shrink-0">
                {a.at ? new Date(a.at).toLocaleDateString("id-ID", { day: "numeric", month: "short" }) : "-"}
              </Badge>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
