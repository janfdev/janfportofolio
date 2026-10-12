"use client";

// Header halaman modul: judul + deskripsi + tombol tambah + slot aksi ekstra.

import type { ReactNode } from "react";
import { Plus } from "lucide-react";
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
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {extra}
        {addLabel && onAdd && (
          <Button size="sm" onClick={onAdd}>
            <Plus className="size-4" />
            {addLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

// Tombol aksi baris (ubah/hapus) agar konsisten di semua modul.
export function RowActions({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex justify-end gap-1.5 whitespace-nowrap">
      <Button size="sm" variant="outline" onClick={onEdit}>
        Ubah
      </Button>
      <Button size="sm" variant="destructive" onClick={onDelete}>
        Hapus
      </Button>
    </div>
  );
}
