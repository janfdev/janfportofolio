"use client";

import { useState } from "react";
import Link from "next/link";
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
  const delRow = rows.find((c) => c.id === del);

  return (
    <div className="@container/main flex flex-col gap-6">
      <PageHeader title="Komentar" desc="Moderasi komentar pengunjung sebelum tampil di situs." />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pengirim</TableHead>
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
                  <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-destructive" onClick={() => setDel(c.id)}>
                    Hapus
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="py-8 text-center">
                <p className="text-sm font-medium">Belum ada komentar</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Komentar pengunjung yang masuk akan muncul di sini untuk dimoderasi.
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ConfirmDialog
        open={del !== null}
        title={`Hapus komentar dari ${delRow?.name ?? "pengunjung"}?`}
        message={`"${delRow?.message.slice(0, 80) ?? ""}" akan dihapus permanen dan tidak bisa dikembalikan.`}
        onClose={() => setDel(null)}
        onConfirm={() => {
          dispatch({ type: "remove", table: "comments", id: del! });
          setDel(null);
        }}
      />
      {rows.length > 0 && (
        <p className="mt-3 text-xs text-muted-foreground">
          Hanya komentar berstatus Disetujui yang tampil di situs. Kelola juga dari{" "}
          <Link href="/dashboard" className="underline underline-offset-2">Ringkasan</Link>.
        </p>
      )}
    </div>
  );
}
