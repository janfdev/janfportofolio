"use client";

import { useState } from "react";
import { GraduationCap, School, Plus } from "lucide-react";
import { useDashboard } from "../../../../lib/dashboard/store";
import { PageHeader, RowActions } from "../_components/page-header";
import { CrudDialog, ConfirmDialog, type FieldDef } from "../_components/crud-dialog";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../../../../components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

const FIELDS: FieldDef[] = [
  { name: "school", label: "Institusi / Kampus", required: true, placeholder: "cth: Universitas Muhammadiyah Cirebon" },
  { name: "degree", label: "Gelar / Jurusan", required: true, placeholder: "cth: S1 Teknik Informatika" },
  { name: "href", label: "Tautan Kampus", placeholder: "https://kampus.ac.id" },
  { name: "logoUrl", label: "Logo (URL/path)", placeholder: "/logo-kampus.png" },
  { name: "start", label: "Tahun Mulai", required: true, placeholder: "cth: 2023" },
  { name: "end", label: "Tahun Selesai", required: true, placeholder: "cth: Present / 2027" },
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
        desc="Riwayat latar belakang pendidikan formal dan sertifikasi pada portofolio."
        count={rows.length}
        addLabel="Tambah Pendidikan"
        onAdd={() => setForm({ open: true })}
      />

      <Card className="overflow-hidden border-border/80 shadow-xs">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-[38%]">Institusi / Kampus</TableHead>
                <TableHead className="w-[32%]">Program Studi & Gelar</TableHead>
                <TableHead className="w-[18%]">Periode</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id} className="transition-colors hover:bg-muted/30">
                  <TableCell className="font-semibold text-foreground">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                        <GraduationCap className="size-4" />
                      </div>
                      <span className="truncate">{r.school}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <School className="size-3.5 text-muted-foreground" />
                      {r.degree}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-medium text-xs tabular-nums">
                      {r.start} – {r.end}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <RowActions
                      item={`${r.degree} di ${r.school}`}
                      onEdit={() => setForm({ open: true, id: r.id })}
                      onDelete={() => setDel(r.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {rows.length === 0 && (
            <div className="p-8">
              <Empty>
                <EmptyMedia variant="icon">
                  <GraduationCap className="size-5" />
                </EmptyMedia>
                <EmptyHeader>
                  <EmptyTitle>Belum ada data pendidikan</EmptyTitle>
                  <EmptyDescription>
                    Tambahkan informasi sekolah atau universitas untuk melengkapi profil akademis.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button size="sm" onClick={() => setForm({ open: true })}>
                    <Plus className="size-4 mr-1.5" />
                    Tambah Pendidikan Pertama
                  </Button>
                </EmptyContent>
              </Empty>
            </div>
          )}
        </CardContent>
      </Card>

      <CrudDialog
        open={form.open}
        title={form.id ? "Ubah Data Pendidikan" : "Tambah Data Pendidikan"}
        fields={FIELDS}
        initial={(rows.find((r) => r.id === form.id) ?? {}) as Record<string, unknown>}
        onClose={() => setForm({ open: false })}
        onSave={save}
      />
      <ConfirmDialog
        open={del !== null}
        title={`Hapus ${delRow ? `${delRow.degree} di ${delRow.school}` : "pendidikan"}?`}
        message="Data riwayat pendidikan ini akan dihapus permanen dari portofolio."
        onClose={() => setDel(null)}
        onConfirm={() => {
          dispatch({ type: "remove", table: "educations", id: del! });
          setDel(null);
        }}
      />
    </div>
  );
}