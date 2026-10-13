"use client";

import { useState } from "react";
import { Briefcase, Building2, MapPin, Plus } from "lucide-react";
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
  { name: "company", label: "Perusahaan", required: true, placeholder: "cth: Library UMC" },
  { name: "title", label: "Jabatan", required: true, placeholder: "cth: Fullstack Developer" },
  { name: "location", label: "Lokasi kerja", placeholder: "cth: Remote / Cirebon" },
  { name: "href", label: "Tautan perusahaan", placeholder: "https://perusahaan.com" },
  { name: "logoUrl", label: "Logo (URL/path)", placeholder: "/logo-perusahaan.png" },
  { name: "start", label: "Mulai", required: true, placeholder: "cth: Jan 2025" },
  { name: "end", label: "Selesai", required: true, placeholder: "cth: Present / Des 2025" },
  { name: "description", label: "Deskripsi", type: "textarea", required: true, placeholder: "Tugas utama dan pencapaian..." },
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
        desc="Riwayat pengalaman kerja dan rekam jejak karier yang tampil di portofolio."
        count={rows.length}
        addLabel="Tambah Pengalaman"
        onAdd={() => setForm({ open: true })}
      />

      <Card className="overflow-hidden border-border/80 shadow-xs">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-[30%]">Jabatan & Peran</TableHead>
                <TableHead className="w-[28%]">Perusahaan & Lokasi</TableHead>
                <TableHead className="w-[24%]">Periode Waktu</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id} className="transition-colors hover:bg-muted/30">
                  <TableCell className="font-semibold text-foreground">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Briefcase className="size-4" />
                      </div>
                      <span className="truncate">{r.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-foreground flex items-center gap-1.5">
                        <Building2 className="size-3.5 text-muted-foreground" />
                        {r.company}
                      </span>
                      {r.location && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="size-3 text-muted-foreground/70" />
                          {r.location}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-medium text-xs tabular-nums">
                      {r.start} – {r.end}
                    </Badge>
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
            </TableBody>
          </Table>

          {rows.length === 0 && (
            <div className="p-8">
              <Empty>
                <EmptyMedia variant="icon">
                  <Briefcase className="size-5" />
                </EmptyMedia>
                <EmptyHeader>
                  <EmptyTitle>Belum ada data pengalaman</EmptyTitle>
                  <EmptyDescription>
                    Tambahkan riwayat pekerjaan profesional Anda untuk memperkuat portofolio.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button size="sm" onClick={() => setForm({ open: true })}>
                    <Plus className="size-4 mr-1.5" />
                    Tambah Pengalaman Pertama
                  </Button>
                </EmptyContent>
              </Empty>
            </div>
          )}
        </CardContent>
      </Card>

      <CrudDialog
        open={form.open}
        title={form.id ? "Ubah Pengalaman Kerja" : "Tambah Pengalaman Kerja"}
        fields={FIELDS}
        initial={(rows.find((r) => r.id === form.id) ?? {}) as Record<string, unknown>}
        onClose={() => setForm({ open: false })}
        onSave={save}
      />
      <ConfirmDialog
        open={del !== null}
        title={`Hapus ${delRow ? `${delRow.title} di ${delRow.company}` : "pengalaman"}?`}
        message="Data pengalaman ini akan dihapus permanen dan tidak lagi tampil di situs."
        onClose={() => setDel(null)}
        onConfirm={() => {
          dispatch({ type: "remove", table: "experiences", id: del! });
          setDel(null);
        }}
      />
    </div>
  );
}