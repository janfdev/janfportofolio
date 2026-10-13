"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, MessageSquare, Trash2, X } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../../../../components/ui/empty";
import { useDashboard } from "../../../../lib/dashboard/store";
import { PageHeader } from "../_components/page-header";
import { ConfirmDialog } from "../_components/crud-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

const VARIANT: Record<string, "success" | "warning" | "destructive"> = {
  approved: "success",
  pending: "warning",
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
      <PageHeader
        title="Komentar"
        desc="Tinjau, setujui, atau tolak komentar dari pengunjung sebelum dipublikasikan di situs."
        count={rows.length}
      />

      <Card className="overflow-hidden border-border/80 shadow-xs">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-[20%]">Pengirim</TableHead>
                <TableHead className="w-[45%]">Isi Komentar</TableHead>
                <TableHead className="w-[15%]">Status</TableHead>
                <TableHead className="text-right">Aksi Moderasi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((c) => (
                <TableRow key={c.id} className="transition-colors hover:bg-muted/30">
                  <TableCell className="font-semibold text-foreground whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {c.name.slice(0, 1).toUpperCase()}
                      </div>
                      <span>{c.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="line-clamp-2 text-sm text-foreground leading-relaxed">&ldquo;{c.message}&rdquo;</p>
                    <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1.5">
                      <span className="font-medium text-foreground/80">
                        {state.projects.find((p) => p.id === c.projectId)?.title ?? "Halaman Umum"}
                      </span>
                      <span>·</span>
                      <span className="tabular-nums">
                        {c.createdAt ? new Date(c.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "-"}
                      </span>
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge variant={VARIANT[c.status ?? "pending"] ?? "warning"}>
                      {LABEL[c.status ?? "pending"] ?? "Menunggu"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1.5 whitespace-nowrap">
                      {c.status !== "approved" && (
                        <Button
                          size="sm"
                          className="h-8 gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                          onClick={() => dispatch({ type: "set-comment-status", id: c.id, status: "approved" })}
                        >
                          <Check className="size-3.5" />
                          Setujui
                        </Button>
                      )}
                      {c.status !== "rejected" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-1 text-xs hover:bg-rose-500/10 hover:text-rose-600 hover:border-rose-500/30"
                          onClick={() => dispatch({ type: "set-comment-status", id: c.id, status: "rejected" })}
                        >
                          <X className="size-3.5" />
                          Tolak
                        </Button>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-8 text-muted-foreground hover:bg-destructive/15 hover:text-destructive"
                        title="Hapus komentar"
                        onClick={() => setDel(c.id)}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {rows.length === 0 && (
            <div className="p-8">
              <Empty>
                <EmptyMedia variant="icon">
                  <MessageSquare className="size-5" />
                </EmptyMedia>
                <EmptyHeader>
                  <EmptyTitle>Belum ada komentar masuk</EmptyTitle>
                  <EmptyDescription>
                    Komentar dari pengunjung situs akan muncul di sini untuk proses moderasi.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </div>
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        open={del !== null}
        title={`Hapus komentar dari ${delRow?.name ?? "pengunjung"}?`}
        message={`"${delRow?.message.slice(0, 80) ?? ""}" akan dihapus permanen dan tidak dapat dipulihkan.`}
        onClose={() => setDel(null)}
        onConfirm={() => {
          dispatch({ type: "remove", table: "comments", id: del! });
          setDel(null);
        }}
      />
      {rows.length > 0 && (
        <p className="text-xs text-muted-foreground">
          Catatan: Hanya komentar berstatus <span className="font-semibold text-emerald-600 dark:text-emerald-400">Disetujui</span> yang akan tampil di portofolio publik. Anda juga dapat memantau antrean dari{" "}
          <Link href="/dashboard" className="font-semibold text-primary underline underline-offset-2">
            Ringkasan
          </Link>.
        </p>
      )}
    </div>
  );
}