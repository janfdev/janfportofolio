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
  extra,
}: {
  title: string;
  desc: string;
  addLabel?: string;
  onAdd?: () => void;
  extra?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {extra}
        {addLabel && onAdd && (
          <Button size="sm" onClick={onAdd}>
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
        className="size-8 rounded-md"
      >
        <Pencil className="size-4" aria-hidden />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={onDelete}
        aria-label={`Hapus ${item}`}
        title={`Hapus ${item}`}
        className="size-8 rounded-md text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="size-4" aria-hidden />
      </Button>
    </div>
  );
}
