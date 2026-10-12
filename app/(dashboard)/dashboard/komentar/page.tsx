"use client";

import { useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { useDashboard } from "../../../../lib/dashboard/store";
import { PageHeader } from "../_components/page-header";
import { ConfirmDialog } from "../_components/crud-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table";

const VARIANT: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  approved: "default",
  pending: "secondary",
  rejected: "destructive",
};
const LABEL: Record<string, string> = { approved: "Disetujui", pending: "Menunggu", rejected: "Ditolak" };

export default function KomentarPage() {
  const { state, dispatch } = useDashboard();
  const [del, setDel] = useState<number | null>(null);
  const rows = [...state.comments].sort(
    (a, b) => (b.createdAt ? new Date(b.createdAt).getTime() : 0) - (a.createdAt ? new Date(a.createdAt).getTime() : 0)
  );

  return (
    <div>
      <PageHeader title="Komentar" desc="Moderasi komentar pengunjung." />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Komentar</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((c) => (
            <TableRow key={c.id}>
              <TableCell className="font-medium whitespace-nowrap">{c.name}</TableCell>
              <TableCell className="max-w-70">
                <p className="line-clamp-2 text-sm">{c.message}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {state.projects.find((p) => p.id === c.projectId)?.title ?? "Umum"} ·{" "}
                  {c.createdAt ? new Date(c.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short" }) : "-"}
                </p>
              </TableCell>
              <TableCell><Badge variant={VARIANT[c.status ?? "pending"]}>{LABEL[c.status ?? "pending"]}</Badge></TableCell>
              <TableCell>
                <div className="flex justify-end gap-1.5 whitespace-nowrap">
                  {c.status !== "approved" && (
                    <Button size="sm" variant="outline" onClick={() => dispatch({ type: "set-comment-status", id: c.id, status: "approved" })}>
                      Setujui
                    </Button>
                  )}
                  {c.status !== "rejected" && (
                    <Button size="sm" variant="outline" onClick={() => dispatch({ type: "set-comment-status", id: c.id, status: "rejected" })}>
                      Tolak
                    </Button>
                  )}
                  <Button size="sm" variant="destructive" onClick={() => setDel(c.id)}>Hapus</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {rows.length === 0 && (
            <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground">Belum ada komentar.</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
      <ConfirmDialog
        open={del !== null}
        title="Hapus komentar?"
        message="Komentar yang dihapus tidak bisa dikembalikan."
        onClose={() => setDel(null)}
        onConfirm={() => {
          dispatch({ type: "remove", table: "comments", id: del! });
          setDel(null);
        }}
      />
    </div>
  );
}
