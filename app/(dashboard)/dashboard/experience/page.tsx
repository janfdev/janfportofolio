"use client";

import { useState } from "react";
import { useDashboard } from "../../../../lib/dashboard/store";
import { PageHeader, RowActions } from "../_components/page-header";
import { CrudDialog, ConfirmDialog, type FieldDef } from "../_components/crud-dialog";
import { Button } from "../../../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table";

const FIELDS: FieldDef[] = [
  { name: "company", label: "Perusahaan", required: true, placeholder: "cth: Library UMC" },
  { name: "title", label: "Jabatan", required: true, placeholder: "cth: Fullstack Developer" },
  { name: "location", label: "Lokasi kerja", placeholder: "cth: Remote / Cirebon" },
  { name: "href", label: "Tautan perusahaan", placeholder: "https://perusahaan.com" },
  { name: "logoUrl", label: "Logo (URL/path)", placeholder: "/logo-perusahaan.png" },
  { name: "start", label: "Mulai", required: true, placeholder: "cth: Jan 2025" },
  { name: "end", label: "Selesai", required: true, placeholder: "cth: Present / Des 2025" },
  { name: "description", label: "Deskripsi", type: "textarea", required: true, placeholder: "Tugas utama dan hasil yang dicapai…" },
];

export default function ExperiencePage() {
  const { state, dispatch } = useDashboard();
  const [form, setForm] = useState<{ open: boolean; id?: number }>({ open: false });
  const [del, setDel] = useState<number | null>(null);
  const rows = [...state.experiences].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  const delRow = rows.find((r) => r.id === del);

  const save = (v: Record<string, string>) => {
    if (form.id) dispatch({ type: "update", table: "experiences", id: form.id, patch: v });
    else dispatch({ type: "insert", table: "experiences", row: { ...v, sortOrder: rows.length } });
    setForm({ open: false });
  };

  return (
    <div className="@container/main flex flex-col gap-6">
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
                <RowActions
                  item={`${r.title} di ${r.company}`}
                  onEdit={() => setForm({ open: true, id: r.id })}
                  onDelete={() => setDel(r.id)}
                />
              </TableCell>
            </TableRow>
          ))}
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="py-8 text-center">
                <p className="text-sm font-medium">Belum ada pengalaman</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Data belum diisi, jadi bagian experience di situs masih kosong.
                </p>
                <Button size="sm" className="mt-3" onClick={() => setForm({ open: true })}>
                  Tambah pengalaman pertama
                </Button>
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
        title={`Hapus ${delRow ? `${delRow.title} di ${delRow.company}` : "pengalaman"}?`}
        message="Data yang dihapus tidak bisa dikembalikan dan langsung hilang dari situs."
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
