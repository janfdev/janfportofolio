"use client";

import { useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { useDashboard } from "../../../../lib/dashboard/store";
import { PageHeader, RowActions } from "../_components/page-header";
import { CrudDialog, ConfirmDialog, type FieldDef } from "../_components/crud-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table";

const FIELDS: FieldDef[] = [
  { name: "name", label: "Nama kontak", required: true, placeholder: "cth: GitHub" },
  { name: "url", label: "Tautan", required: true, placeholder: "https://github.com/username" },
  { name: "navbar", label: "Tampil di navbar (true/false)", placeholder: "true" },
];

export default function KontakPage() {
  const { state, dispatch } = useDashboard();
  const [editEmail, setEditEmail] = useState(false);
  // Sosial disimpan lokal turunan profile:
  // ponytail: tambah tabel socials bila perlu CRUD penuh + tampil di situs.
  const [socials, setSocials] = useState([
    { id: 1, name: "GitHub", url: "https://github.com/janfdev", navbar: "true" },
    { id: 2, name: "LinkedIn", url: "https://www.linkedin.com/in/rizqinoorfauzan", navbar: "true" },
    { id: 3, name: "Email", url: "#", navbar: "false" },
  ]);
  const [form, setForm] = useState<{ open: boolean; id?: number }>({ open: false });
  const [del, setDel] = useState<number | null>(null);
  const [email, setEmail] = useState(state.profile.email);
  const [tel, setTel] = useState(state.profile.tel);
  const delRow = socials.find((s) => s.id === del);

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
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <PageHeader title="Kontak" desc="Email, telepon, dan tautan sosial pengunjung." />
      <Card>
        <CardHeader>
          <CardTitle>Kontak utama</CardTitle>
          <CardDescription>Email dan telepon yang tampil di situs.</CardDescription>
        </CardHeader>
        <CardContent>
        <div className="grid max-w-xl gap-2">
          <p className="text-sm"><span className="text-muted-foreground">Email: </span>{editEmail ? null : state.profile.email}</p>
          {editEmail ? (
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex-1">
                <Label htmlFor="ct-email">Email</Label>
                <Input id="ct-email" className="h-9" value={email} placeholder="nama@email.com" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="flex-1">
                <Label htmlFor="ct-tel">Telepon</Label>
                <Input id="ct-tel" className="h-9" value={tel} placeholder="+62…" onChange={(e) => setTel(e.target.value)} />
              </div>
              <div className="flex items-end gap-2">
                <Button size="sm" onClick={saveContact}>Simpan</Button>
                <Button size="sm" variant="outline" onClick={() => setEditEmail(false)}>Batal</Button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm"><span className="text-muted-foreground">Telepon: </span>{state.profile.tel}</p>
              <div><Button size="sm" variant="outline" onClick={() => setEditEmail(true)}>Ubah email/telepon</Button></div>
            </>
          )}
        </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex min-w-0 flex-col gap-1">
              <CardTitle>Tautan sosial</CardTitle>
              <CardDescription>Akun yang tampil sebagai ikon di situs.</CardDescription>
            </div>
            <Button size="sm" onClick={() => setForm({ open: true })}>Tambah</Button>
          </div>
        </CardHeader>
        <CardContent>
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
                  <RowActions
                    item={s.name}
                    onEdit={() => setForm({ open: true, id: s.id })}
                    onDelete={() => setDel(s.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </CardContent>
      </Card>

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
        title={`Hapus tautan ${delRow?.name ?? "kontak"}?`}
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
