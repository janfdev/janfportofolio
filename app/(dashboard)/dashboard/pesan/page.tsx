"use client";

import { useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { useDashboard } from "../../../../lib/dashboard/store";
import { PageHeader } from "../_components/page-header";
import { ConfirmDialog } from "../_components/crud-dialog";

export default function PesanPage() {
  const { state, dispatch } = useDashboard();
  const [del, setDel] = useState<number | null>(null);
  const rows = [...state.messages].sort(
    (a, b) => (b.createdAt ? new Date(b.createdAt).getTime() : 0) - (a.createdAt ? new Date(a.createdAt).getTime() : 0)
  );
  const delRow = rows.find((m) => m.id === del);

  return (
    <div className="@container/main flex flex-col gap-6">
      <PageHeader title="Pesan" desc="Kotak masuk dari formulir kontak situs." />
      <div className="flex flex-col gap-3">
        {rows.map((m) => (
          <Card key={m.id} className={!m.read ? "border-primary/50" : undefined}>
            <CardContent className="px-4 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold">{m.name}</p>
                {!m.read && <Badge>Baru</Badge>}
                <span className="ml-auto text-xs text-muted-foreground">
                  {m.createdAt ? new Date(m.createdAt).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "-"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{m.email}</p>
              <p className="mt-1.5 text-sm">{m.message}</p>
              <div className="mt-2.5 flex gap-1.5">
                <Button size="sm" variant="outline" onClick={() => dispatch({ type: "set-message-read", id: m.id, read: !m.read })}>
                  {m.read ? "Tandai belum dibaca" : "Tandai dibaca"}
                </Button>
                <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-destructive" onClick={() => setDel(m.id)}>Hapus</Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {rows.length === 0 && (
          <div className="rounded-lg border border-dashed p-6 text-center">
            <p className="text-sm font-medium">Kotak masuk kosong</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Pesan dari formulir kontak situs akan muncul di sini.
            </p>
          </div>
        )}
      </div>
      <ConfirmDialog
        open={del !== null}
        title={`Hapus pesan dari ${delRow?.name ?? "pengirim"}?`}
        message={`Pesan "${delRow?.message.slice(0, 80) ?? ""}" akan dihapus permanen dan tidak bisa dikembalikan.`}
        onClose={() => setDel(null)}
        onConfirm={() => {
          dispatch({ type: "remove", table: "messages", id: del! });
          setDel(null);
        }}
      />
    </div>
  );
}
