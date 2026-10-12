"use client";

import { useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
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

  return (
    <div className="space-y-4">
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

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <Card className="py-4"><CardHeader className="px-4"><CardTitle className="text-xs font-medium text-muted-foreground">Total kunjungan</CardTitle></CardHeader><CardContent className="px-4"><p className="text-2xl font-bold tabular-nums">{state.visits.length}</p></CardContent></Card>
        <Card className="py-4"><CardHeader className="px-4"><CardTitle className="text-xs font-medium text-muted-foreground">Klik project</CardTitle></CardHeader><CardContent className="px-4"><p className="text-2xl font-bold tabular-nums">{state.visits.filter((v) => v.projectId).length}</p></CardContent></Card>
        <Card className="py-4"><CardHeader className="px-4"><CardTitle className="text-xs font-medium text-muted-foreground">Halaman unik</CardTitle></CardHeader><CardContent className="px-4"><p className="text-2xl font-bold tabular-nums">{new Set(state.visits.map((v) => v.path)).size}</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-sm">Kunjungan per project</CardTitle></CardHeader>
        <CardContent className="space-y-2">
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

      <div>
        <h2 className="mb-2 font-semibold">Kunjungan terakhir</h2>
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
