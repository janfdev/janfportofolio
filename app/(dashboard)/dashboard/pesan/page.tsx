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

  return (
    <div>
      <PageHeader title="Pesan" desc="Kotak masuk pesan kontak." />
      <div className="space-y-3">
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
                <Button size="sm" variant="destructive" onClick={() => setDel(m.id)}>Hapus</Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {rows.length === 0 && <p className="text-sm text-muted-foreground">Kotak masuk kosong.</p>}
      </div>
      <ConfirmDialog
        open={del !== null}
        title="Hapus pesan?"
        message="Pesan yang dihapus tidak bisa dikembalikan."
        onClose={() => setDel(null)}
        onConfirm={() => {
          dispatch({ type: "remove", table: "messages", id: del! });
          setDel(null);
        }}
      />
    </div>
  );
}
