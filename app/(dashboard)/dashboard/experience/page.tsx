"use client";

import { useState } from "react";
import { useDashboard } from "../../../../lib/dashboard/store";
import { PageHeader, RowActions } from "../_components/page-header";
import { CrudDialog, ConfirmDialog, type FieldDef } from "../_components/crud-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table";

const FIELDS: FieldDef[] = [
  { name: "company", label: "Perusahaan", required: true, placeholder: "Library UMC" },
  { name: "title", label: "Jabatan", required: true, placeholder: "Fullstack Developer" },
  { name: "location", label: "Lokasi kerja", placeholder: "Remote / On-site" },
  { name: "href", label: "Tautan perusahaan", placeholder: "https://..." },
  { name: "logoUrl", label: "Logo (URL/path)", placeholder: "/logo.png" },
  { name: "start", label: "Mulai", required: true, placeholder: "Jan 2025" },
  { name: "end", label: "Selesai", required: true, placeholder: "Present" },
  { name: "description", label: "Deskripsi", type: "textarea", required: true },
];

export default function ExperiencePage() {
  const { state, dispatch } = useDashboard();
  const [form, setForm] = useState<{ open: boolean; id?: number }>({ open: false });
  const [del, setDel] = useState<number | null>(null);
  const rows = [...state.experiences].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  const save = (v: Record<string, string>) => {
    if (form.id) dispatch({ type: "update", table: "experiences", id: form.id, patch: v });
    else dispatch({ type: "insert", table: "experiences", row: { ...v, sortOrder: rows.length } });
    setForm({ open: false });
  };

  return (
    <div>
      <PageHeader
        title="Experience"
        desc="Riwayat pekerjaan yang tampil di portofolio."
        addLabel="Tambah pengalaman"
        onAdd={() => setForm({ open: true })}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Jabatan</TableHead>
            <TableHead>Perusahaan</TableHead>
            <TableHead>Periode</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-medium">{r.title}</TableCell>
              <TableCell>{r.company}</TableCell>
              <TableCell className="whitespace-nowrap text-muted-foreground">
                {r.start} – {r.end}
              </TableCell>
              <TableCell>
                <RowActions onEdit={() => setForm({ open: true, id: r.id })} onDelete={() => setDel(r.id)} />
              </TableCell>
            </TableRow>
          ))}
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                Belum ada data.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <CrudDialog
        open={form.open}
        title={form.id ? "Ubah pengalaman" : "Tambah pengalaman"}
        fields={FIELDS}
        initial={(rows.find((r) => r.id === form.id) ?? {}) as Record<string, unknown>}
        onClose={() => setForm({ open: false })}
        onSave={save}
      />
      <ConfirmDialog
        open={del !== null}
        title="Hapus pengalaman?"
        message="Data yang dihapus tidak bisa dikembalikan."
        onClose={() => setDel(null)}
        onConfirm={() => {
          dispatch({ type: "remove", table: "experiences", id: del! });
          setDel(null);
        }}
      />
      <p className="mt-4 text-xs text-muted-foreground">
        ponytail: belum ada drag-reorder; urutan via sortOrder, tambah saat dibutuhkan.
      </p>
    </div>
  );
}

