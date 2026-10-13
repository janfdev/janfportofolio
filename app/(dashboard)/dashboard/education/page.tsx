"use client";

import { useState } from "react";
import { useDashboard } from "../../../../lib/dashboard/store";
import { PageHeader, RowActions } from "../_components/page-header";
import { CrudDialog, ConfirmDialog, type FieldDef } from "../_components/crud-dialog";
import { Button } from "../../../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table";

const FIELDS: FieldDef[] = [
  { name: "school", label: "Sekolah/Kampus", required: true, placeholder: "cth: Universitas Muhammadiyah Cirebon" },
  { name: "degree", label: "Gelar/Jurusan", required: true, placeholder: "cth: S1 Teknik Informatika" },
  { name: "href", label: "Tautan", placeholder: "https://kampus.ac.id" },
  { name: "logoUrl", label: "Logo (URL/path)", placeholder: "/logo-kampus.png" },
  { name: "start", label: "Mulai", required: true, placeholder: "cth: 2023" },
  { name: "end", label: "Selesai", required: true, placeholder: "cth: Present / 2027" },
];

export default function EducationPage() {
  const { state, dispatch } = useDashboard();
  const [form, setForm] = useState<{ open: boolean; id?: number }>({ open: false });
  const [del, setDel] = useState<number | null>(null);
  const rows = [...state.educations].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  const delRow = rows.find((r) => r.id === del);

  const save = (v: Record<string, string>) => {
    if (form.id) dispatch({ type: "update", table: "educations", id: form.id, patch: v });
    else dispatch({ type: "insert", table: "educations", row: { ...v, sortOrder: rows.length } });
    setForm({ open: false });
  };

  return (
    <div className="@container/main flex flex-col gap-6">
      <PageHeader
        title="Education"
        desc="Riwayat pendidikan yang tampil di portofolio."
        addLabel="Tambah pendidikan"
        onAdd={() => setForm({ open: true })}
      />
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
                <RowActions
                  item={`${r.degree} di ${r.school}`}
                  onEdit={() => setForm({ open: true, id: r.id })}
                  onDelete={() => setDel(r.id)}
                />
              </TableCell>
            </TableRow>
          ))}
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="py-8 text-center">
                <p className="text-sm font-medium">Belum ada pendidikan</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Data belum diisi, jadi bagian education di situs masih kosong.
                </p>
                <Button size="sm" className="mt-3" onClick={() => setForm({ open: true })}>
                  Tambah pendidikan pertama
                </Button>
              </TableCell>
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
        title={`Hapus ${delRow ? `${delRow.degree} di ${delRow.school}` : "pendidikan"}?`}
        message="Data yang dihapus tidak bisa dikembalikan dan langsung hilang dari situs."
        onClose={() => setDel(null)}
        onConfirm={() => {
          dispatch({ type: "remove", table: "educations", id: del! });
          setDel(null);
        }}
      />
    </div>
  );
}
