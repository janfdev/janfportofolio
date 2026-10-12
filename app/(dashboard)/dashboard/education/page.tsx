"use client";

import { useState } from "react";
import { useDashboard } from "../../../../lib/dashboard/store";
import { PageHeader, RowActions } from "../_components/page-header";
import { CrudDialog, ConfirmDialog, type FieldDef } from "../_components/crud-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table";

const FIELDS: FieldDef[] = [
  { name: "school", label: "Sekolah/Kampus", required: true },
  { name: "degree", label: "Gelar/Jurusan", required: true },
  { name: "href", label: "Tautan", placeholder: "https://..." },
  { name: "logoUrl", label: "Logo (URL/path)", placeholder: "/logo.png" },
  { name: "start", label: "Mulai", required: true, placeholder: "2023" },
  { name: "end", label: "Selesai", required: true, placeholder: "Present" },
];

export default function EducationPage() {
  const { state, dispatch } = useDashboard();
  const [form, setForm] = useState<{ open: boolean; id?: number }>({ open: false });
  const [del, setDel] = useState<number | null>(null);
  const rows = [...state.educations].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  const save = (v: Record<string, string>) => {
    if (form.id) dispatch({ type: "update", table: "educations", id: form.id, patch: v });
    else dispatch({ type: "insert", table: "educations", row: { ...v, sortOrder: rows.length } });
    setForm({ open: false });
  };

  return (
    <div>
      <PageHeader title="Education" desc="Riwayat pendidikan." addLabel="Tambah pendidikan" onAdd={() => setForm({ open: true })} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sekolah</TableHead>
            <TableHead>Gelar</TableHead>
            <TableHead>Periode</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-medium">{r.school}</TableCell>
              <TableCell>{r.degree}</TableCell>
              <TableCell className="whitespace-nowrap text-muted-foreground">{r.start} – {r.end}</TableCell>
              <TableCell>
                <RowActions onEdit={() => setForm({ open: true, id: r.id })} onDelete={() => setDel(r.id)} />
              </TableCell>
            </TableRow>
          ))}
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">Belum ada data.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <CrudDialog
        open={form.open}
        title={form.id ? "Ubah pendidikan" : "Tambah pendidikan"}
        fields={FIELDS}
        initial={(rows.find((r) => r.id === form.id) ?? {}) as Record<string, unknown>}
        onClose={() => setForm({ open: false })}
        onSave={save}
      />
      <ConfirmDialog
        open={del !== null}
        title="Hapus pendidikan?"
        message="Data yang dihapus tidak bisa dikembalikan."
        onClose={() => setDel(null)}
        onConfirm={() => {
          dispatch({ type: "remove", table: "educations", id: del! });
          setDel(null);
        }}
      />
    </div>
  );
}
