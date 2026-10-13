"use client";

import { useState } from "react";
import { Eye, FolderGit2, LayoutGrid, Play, RotateCcw } from "lucide-react";
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
  const maxProjectViews = Math.max(1, ...byProject.map((x) => x.views));
  const projectClicks = state.visits.filter((v) => v.projectId).length;
  const uniquePages = new Set(state.visits.map((v) => v.path)).size;

  const stats = [
    {
      label: "Total Kunjungan",
      value: state.visits.length,
      icon: Eye,
      color: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",
      ctx: state.visits.length === 0 ? "Belum ada kunjungan tercatat." : "Akumulasi sesi yang tersimpan di perangkat.",
    },
    {
      label: "Klik Proyek",
      value: projectClicks,
      icon: FolderGit2,
      color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
      ctx: projectClicks === 0 ? "Belum ada klik ke proyek." : "Interaksi pengunjung membuka detail karya.",
    },
    {
      label: "Halaman Unik",
      value: uniquePages,
      icon: LayoutGrid,
      color: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
      ctx: uniquePages === 0 ? "Belum ada rute dikunjungi." : "Jumlah variasi URL yang diakses pengunjung.",
    },
  ];

  return (
    <div className="@container/main flex flex-col gap-6">
      <PageHeader
        title="Kunjungan"
        desc="Statistik analitik dan log aktivitas pengunjung portofolio yang tersimpan secara lokal."
        extra={
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5"
              onClick={() => dispatch({ type: "record-visit", path: "/", projectId: state.projects[0]?.id })}
            >
              <Play className="size-3.5" />
              Simulasi Kunjungan
            </Button>
            <Button size="sm" variant="outline" className="gap-1.5" onClick={() => setReset(true)}>
              <RotateCcw className="size-3.5" />
              Reset Data
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="border border-border/80 bg-gradient-to-br from-card via-card to-primary/5 shadow-xs">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {s.label}
              </CardDescription>
              <div className={`flex size-9 items-center justify-center rounded-xl ${s.color} shadow-2xs`}>
                <s.icon className="size-4.5" aria-hidden />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              <div className="text-3xl font-extrabold tabular-nums tracking-tight text-foreground">
                {s.value}
              </div>
              <p className="text-xs text-muted-foreground">{s.ctx}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Kunjungan per Proyek */}
        <Card className="lg:col-span-2 border border-border/80 shadow-xs">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">Kunjungan per Proyek</CardTitle>
            <CardDescription className="text-xs">
              Distribusi pembaca dan klik karya portofolio.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {byProject.map(({ project, views }) => (
              <div key={project.id} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground truncate max-w-[200px]">{project.title}</span>
                  <span className="font-medium text-muted-foreground tabular-nums">{views} view</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-300"
                    style={{ width: `${Math.max(4, (views / maxProjectViews) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
            {byProject.length === 0 && (
              <p className="text-xs text-muted-foreground py-4 text-center">
                Belum ada data proyek tersimpan.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Log Kunjungan Terakhir */}
        <Card className="lg:col-span-3 border border-border/80 shadow-xs overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">Log Kunjungan Terbaru</CardTitle>
            <CardDescription className="text-xs">
              15 sesi kunjungan paling baru yang terekam pada aplikasi.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="w-[30%]">Waktu</TableHead>
                  <TableHead className="w-[30%]">Rute Halaman</TableHead>
                  <TableHead>Proyek Terkait</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {state.visits.slice(0, 15).map((v) => (
                  <TableRow key={v.id} className="transition-colors hover:bg-muted/30">
                    <TableCell className="whitespace-nowrap text-xs text-muted-foreground tabular-nums">
                      {v.createdAt ? new Date(v.createdAt).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono text-[11px] font-normal">
                        {v.path}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs font-medium text-foreground">
                      {state.projects.find((p) => p.id === v.projectId)?.title ?? "-"}
                    </TableCell>
                  </TableRow>
                ))}
                {state.visits.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="py-8 text-center">
                      <p className="text-sm font-medium">Belum ada kunjungan tercatat</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Buka situs publik atau klik tombol Simulasi Kunjungan di atas.
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
        title="Reset Data Kunjungan?"
        message="Seluruh riwayat kunjungan akan dikembalikan ke data awal (seed) dan tidak dapat dibatalkan."
        onClose={() => setReset(false)}
        onConfirm={() => {
          dispatch({ type: "reset-visits" });
          setReset(false);
        }}
      />
    </div>
  );
}