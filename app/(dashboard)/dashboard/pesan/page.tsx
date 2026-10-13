"use client";

import { useState } from "react";
import { Check, Inbox, Mail, MailOpen, Trash2 } from "lucide-react";
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

export default function PesanPage() {
  const { state, dispatch } = useDashboard();
  const [del, setDel] = useState<number | null>(null);
  const rows = [...state.messages].sort(
    (a, b) => (b.createdAt ? new Date(b.createdAt).getTime() : 0) - (a.createdAt ? new Date(a.createdAt).getTime() : 0)
  );
  const delRow = rows.find((m) => m.id === del);

  return (
    <div className="@container/main flex flex-col gap-6">
      <PageHeader
        title="Pesan Masuk"
        desc="Daftar pertanyaan, tawaran kerja, dan pesan dari formulir kontak portofolio."
        count={rows.length}
      />

      <div className="flex flex-col gap-3.5">
        {rows.map((m) => (
          <Card
            key={m.id}
            className={`transition-all ${
              !m.read
                ? "border-rose-500/40 bg-gradient-to-r from-card via-card to-rose-500/5 shadow-xs ring-1 ring-rose-500/20"
                : "border-border/80 bg-card/60"
            }`}
          >
            <CardContent className="p-4 sm:p-5 flex flex-col gap-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className={`flex size-8 items-center justify-center rounded-lg ${!m.read ? "bg-rose-500/15 text-rose-600 dark:text-rose-400" : "bg-muted text-muted-foreground"}`}>
                    {!m.read ? <Mail className="size-4" /> : <MailOpen className="size-4" />}
                  </div>
                  <div>
                    <span className="font-bold text-foreground text-sm">{m.name}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{m.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!m.read ? (
                    <Badge variant="destructive" className="text-[10px] h-5">
                      Belum Dibaca
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-[10px] h-5">
                      Sudah Dibaca
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {m.createdAt ? new Date(m.createdAt).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "-"}
                  </span>
                </div>
              </div>

              <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line py-1">
                {m.message}
              </p>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 gap-1.5 text-xs"
                  onClick={() => dispatch({ type: "set-message-read", id: m.id, read: !m.read })}
                >
                  <Check className="size-3.5" />
                  {m.read ? "Tandai belum dibaca" : "Tandai sudah dibaca"}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-8 text-muted-foreground hover:bg-destructive/15 hover:text-destructive"
                  title="Hapus pesan"
                  onClick={() => setDel(m.id)}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {rows.length === 0 && (
          <Empty>
            <EmptyMedia variant="icon">
              <Inbox className="size-5" />
            </EmptyMedia>
            <EmptyHeader>
              <EmptyTitle>Kotak masuk pesan kosong</EmptyTitle>
              <EmptyDescription>
                Pesan atau pertanyaan dari formulir kontak situs akan otomatis masuk ke sini.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </div>

      <ConfirmDialog
        open={del !== null}
        title={`Hapus pesan dari ${delRow?.name ?? "pengirim"}?`}
        message={`Pesan "${delRow?.message.slice(0, 80) ?? ""}" akan dihapus permanen dan tidak dapat dipulihkan.`}
        onClose={() => setDel(null)}
        onConfirm={() => {
          dispatch({ type: "remove", table: "messages", id: del! });
          setDel(null);
        }}
      />
    </div>
  );
}