"use client";

import { useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { useDashboard } from "../../../../lib/dashboard/store";
import { PageHeader, RowActions } from "../_components/page-header";
import { CrudDialog, ConfirmDialog, type FieldDef } from "../_components/crud-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table";

const FIELDS: FieldDef[] = [
  { name: "name", label: "Nama kontak", required: true, placeholder: "GitHub" },
  { name: "url", label: "Tautan", required: true, placeholder: "https://github.com/..." },
  { name: "navbar", label: "Tampil di navbar (true/false)", placeholder: "true" },
];

export default function KontakPage() {
  const { state, dispatch } = useDashboard();
  const [editEmail, setEditEmail] = useState(false);
  // Sosial disimpan di profile? Belum ada tabelnya — kelola sebagai daftar lokal
  // turunan profile: ponytail: tambah tabel socials bila perlu CRUD penuh.
  const [socials, setSocials] = useState([
    { id: 1, name: "GitHub", url: "https://github.com/janfdev", navbar: "true" },
    { id: 2, name: "LinkedIn", url: "https://www.linkedin.com/in/rizqinoorfauzan", navbar: "true" },
    { id: 3, name: "Email", url: "#", navbar: "false" },
  ]);
  const [form, setForm] = useState<{ open: boolean; id?: number }>({ open: false });
  const [del, setDel] = useState<number | null>(null);
  const [email, setEmail] = useState(state.profile.email);
  const [tel, setTel] = useState(state.profile.tel);

  const save = (v: Record<string, string>) => {
    if (form.id) setSocials((s) => s.map((x) => (x.id === form.id ? { ...x, ...v } : x)));
    else setSocials((s) => [...s, { id: Math.max(...s.map((x) => x.id), 0) + 1, ...v } as (typeof s)[number]]);
    setForm({ open: false });
  };

  const saveContact = () => {
    dispatch({ type: "update-profile", patch: { email, tel } });
    setEditEmail(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <PageHeader title="Kontak" desc="Email, telepon, dan tautan sosial." />
        <div className="grid max-w-xl gap-2 rounded-xl border p-4">
          <p className="text-sm"><span className="text-muted-foreground">Email: </span>{editEmail ? null : state.profile.email}</p>
          {editEmail ? (
            <div className="flex gap-2">
              <input className="h-9 w-full rounded-md border bg-transparent px-3 text-sm" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
              <input className="h-9 w-full rounded-md border bg-transparent px-3 text-sm" value={tel} onChange={(e) => setTel(e.target.value)} aria-label="Telepon" />
              <Button size="sm" onClick={saveContact}>Simpan</Button>
            </div>
          ) : (
            <>
              <p className="text-sm"><span className="text-muted-foreground">Telepon: </span>{state.profile.tel}</p>
              <div><Button size="sm" variant="outline" onClick={() => setEditEmail(true)}>Ubah email/telepon</Button></div>
            </>
          )}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold">Tautan sosial</h2>
          <Button size="sm" onClick={() => setForm({ open: true })}>Tambah</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Tautan</TableHead>
              <TableHead>Navbar</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {socials.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell className="max-w-50 truncate text-muted-foreground">{s.url}</TableCell>
                <TableCell><Badge variant={s.navbar === "true" ? "default" : "outline"}>{s.navbar === "true" ? "Ya" : "Tidak"}</Badge></TableCell>
                <TableCell>
                  <RowActions onEdit={() => setForm({ open: true, id: s.id })} onDelete={() => setDel(s.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CrudDialog
        open={form.open}
        title={form.id ? "Ubah kontak" : "Tambah kontak"}
        fields={FIELDS}
        initial={(socials.find((s) => s.id === form.id) ?? {}) as unknown as Record<string, unknown>}
        onClose={() => setForm({ open: false })}
        onSave={save}
      />
      <ConfirmDialog
        open={del !== null}
        title="Hapus kontak?"
        message="Tautan sosial ini akan dihapus dari daftar."
        onClose={() => setDel(null)}
        onConfirm={() => {
          setSocials((s) => s.filter((x) => x.id !== del));
          setDel(null);
        }}
      />
    </div>
  );
}
