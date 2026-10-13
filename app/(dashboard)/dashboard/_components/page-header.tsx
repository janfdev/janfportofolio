"use client";

// Header halaman modul: judul + deskripsi + tombol tambah + slot aksi ekstra.

import type { ReactNode } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "../../../../components/ui/button";

export function PageHeader({
  title,
  desc,
  addLabel,
  onAdd,
  count,
  extra,
}: {
  title: string;
  desc: string;
  addLabel?: string;
  onAdd?: () => void;
  count?: number;
  extra?: ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
          {count !== undefined && (
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary tabular-nums">
              {count}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        {extra}
        {addLabel && onAdd && (
          <Button size="sm" onClick={onAdd} className="shadow-xs shadow-primary/20">
            <Plus className="size-4" aria-hidden />
            {addLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

// Tombol aksi baris: 2 tombol ghost icon agar tabel ringkas dan konsisten.
export function RowActions({
  item,
  onEdit,
  onDelete,
}: {
  item: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex justify-end gap-1 whitespace-nowrap">
      <Button
        size="icon"
        variant="ghost"
        onClick={onEdit}
        aria-label={`Ubah ${item}`}
        title={`Ubah ${item}`}
        className="size-8 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
      >
        <Pencil className="size-3.5" aria-hidden />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={onDelete}
        aria-label={`Hapus ${item}`}
        title={`Hapus ${item}`}
        className="size-8 rounded-lg text-muted-foreground hover:bg-destructive/15 hover:text-destructive"
      >
        <Trash2 className="size-3.5" aria-hidden />
      </Button>
    </div>
  );
}