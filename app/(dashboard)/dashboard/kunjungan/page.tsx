"use client";

import { useState } from "react";
import { Eye, FolderGit2, LayoutGrid } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";
import { useDashboard } from "../../../../lib/dashboard/store";
import { PageHeader } from "../_components/page-header";
import { ConfirmDialog } from "../_components/crud-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table";

export default function KunjunganPage() {
  const { state, dispatch } = useDashboard();
  const [reset, setReset] = useState(false);

  const byProject = state.projects.map((p) => ({
    project: p,
    views: state.projectViews.find((v) => v.projectId === p.id)?.views ?? 0,
  })).sort((a, b) => b.views - a.views);
  const projectClicks = state.visits.filter((v) => v.projectId).length;
  const uniquePages = new Set(state.visits.map((v) => v.path)).size;

  const stats = [
    {
      label: "Total kunjungan",
      value: state.visits.length,
      icon: Eye,
      ctx: state.visits.length === 0 ? "Belum ada kunjungan tercatat." : "Semua halaman yang tercatat lokal.",
    },
    {
      label: "Klik project",
      value: projectClicks,
      icon: FolderGit2,
      ctx: projectClicks === 0 ? "Belum ada klik ke project." : "Kunjungan yang membuka project.",
    },
    {
      label: "Halaman unik",
      value: uniquePages,
      icon: LayoutGrid,
      ctx: uniquePages === 0 ? "Belum ada halaman dikunjungi." : "Jalur berbeda yang dikunjungi.",
    },
  ];

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <PageHeader
        title="Kunjungan"
        desc="Statistik kunjungan situs yang tercatat lokal di perangkat ini."
        extra={
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={() => dispatch({ type: "record-visit", path: "/", projectId: state.projects[0]?.id })}
            >
              Simulasi kunjungan
            </Button>
            <Button size="sm" variant="outline" onClick={() => setReset(true)}>
              Reset data
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader>
              <CardTitle>
                <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                  <s.icon className="size-4" aria-hidden />
                </div>
              </CardTitle>
              <CardDescription>{s.label}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              <div className="text-3xl font-medium tabular-nums leading-none tracking-tight">{s.value}</div>
              <p className="text-sm text-muted-foreground">{s.ctx}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle>Kunjungan per project</CardTitle>
          <CardDescription>Project mana yang paling sering dibuka pengunjung.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {byProject.map(({ project, views }) => (
            <div key={project.id} className="flex items-center justify-between gap-2 text-sm">
              <span className="truncate">{project.title}</span>
              <Badge variant="secondary" className="tabular-nums">{views} klik</Badge>
            </div>
          ))}
          {byProject.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Belum ada project, jadi belum ada statistik per project.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="xl:col-span-3">
        <CardHeader>
          <CardTitle>Kunjungan terakhir</CardTitle>
          <CardDescription>15 kunjungan terbaru yang tercatat di perangkat ini.</CardDescription>
        </CardHeader>
        <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Waktu</TableHead>
              <TableHead>Halaman</TableHead>
              <TableHead>Project</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {state.visits.slice(0, 15).map((v) => (
              <TableRow key={v.id}>
                <TableCell className="whitespace-nowrap text-muted-foreground">
                  {v.createdAt ? new Date(v.createdAt).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "-"}
                </TableCell>
                <TableCell>{v.path}</TableCell>
                <TableCell>{state.projects.find((p) => p.id === v.projectId)?.title ?? "-"}</TableCell>
              </TableRow>
            ))}
            {state.visits.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="py-8 text-center">
                  <p className="text-sm font-medium">Belum ada kunjungan tercatat</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Buka situs atau tekan Simulasi kunjungan untuk mencatat yang pertama.
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </CardContent>
      </Card>
      </div>

      <ConfirmDialog
        open={reset}
        title="Reset data kunjungan?"
        message="Statistik kunjungan dikembalikan ke seed awal dan tidak bisa dikembalikan."
        onClose={() => setReset(false)}
        onConfirm={() => {
          dispatch({ type: "reset-visits" });
          setReset(false);
        }}
      />
    </div>
  );
}
