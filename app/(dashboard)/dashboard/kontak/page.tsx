"use client";

import { useState } from "react";
import { Mail, Phone, Plus, Share2 } from "lucide-react";
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
  { name: "name", label: "Nama Kontak / Platform", required: true, placeholder: "cth: GitHub" },
  { name: "url", label: "Tautan URL", required: true, placeholder: "https://github.com/username" },
  { name: "navbar", label: "Tampil di navbar (true/false)", placeholder: "true" },
];

export default function KontakPage() {
  const { state, dispatch } = useDashboard();
  const [editEmail, setEditEmail] = useState(false);
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
    <div className="@container/main flex flex-col gap-6">
      <PageHeader
        title="Kontak"
        desc="Kelola alamat email, nomor telepon, dan tautan jejaring sosial profesional."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Kontak Utama Card */}
        <Card className="border-border/80 shadow-xs">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                Kontak Utama
              </CardTitle>
              {!editEmail && (
                <Button size="sm" variant="outline" onClick={() => setEditEmail(true)}>
                  Ubah Kontak
                </Button>
              )}
            </div>
            <CardDescription className="text-xs">
              Alamat surel dan nomor kontak yang ditampilkan pada header/footer situs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {editEmail ? (
              <div className="flex flex-col gap-3 pt-1">
                <div>
                  <Label htmlFor="ct-email" className="text-xs font-semibold">Alamat Email</Label>
                  <Input
                    id="ct-email"
                    className="mt-1"
                    value={email}
                    placeholder="nama@email.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="ct-tel" className="text-xs font-semibold">Nomor Telepon</Label>
                  <Input
                    id="ct-tel"
                    className="mt-1"
                    value={tel}
                    placeholder="+62 812..."
                    onChange={(e) => setTel(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
                  <Button size="sm" variant="outline" onClick={() => setEditEmail(false)}>
                    Batal
                  </Button>
                  <Button size="sm" onClick={saveContact}>
                    Simpan Perubahan
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/20 p-3">
                  <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Mail className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground">Email Publik</p>
                    <p className="text-sm font-semibold text-foreground truncate">{state.profile.email || "-"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/20 p-3">
                  <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Phone className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground">Telepon / WhatsApp</p>
                    <p className="text-sm font-semibold text-foreground truncate">{state.profile.tel || "-"}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tautan Sosial Card */}
        <Card className="border-border/80 shadow-xs">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Share2 className="size-4 text-primary" />
                Tautan Sosial
              </CardTitle>
              <Button size="sm" onClick={() => setForm({ open: true })} className="gap-1.5 shadow-xs shadow-primary/20">
                <Plus className="size-3.5" />
                Tambah
              </Button>
            </div>
            <CardDescription className="text-xs">
              Jejaring sosial yang dapat diakses langsung oleh pengunjung portofolio.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead>Platform</TableHead>
                  <TableHead>Tautan</TableHead>
                  <TableHead>Navbar</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {socials.map((s) => (
                  <TableRow key={s.id} className="transition-colors hover:bg-muted/30">
                    <TableCell className="font-semibold text-foreground">{s.name}</TableCell>
                    <TableCell className="max-w-[140px] truncate text-xs text-muted-foreground">{s.url}</TableCell>
                    <TableCell>
                      <Badge variant={s.navbar === "true" ? "success" : "secondary"} className="text-[10px]">
                        {s.navbar === "true" ? "Tampil" : "Sembunyi"}
                      </Badge>
                    </TableCell>
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
      </div>

      <CrudDialog
        open={form.open}
        title={form.id ? "Ubah Tautan Sosial" : "Tambah Tautan Sosial"}
        fields={FIELDS}
        initial={(socials.find((s) => s.id === form.id) ?? {}) as unknown as Record<string, unknown>}
        onClose={() => setForm({ open: false })}
        onSave={save}
      />
      <ConfirmDialog
        open={del !== null}
        title={`Hapus tautan ${delRow?.name ?? "kontak"}?`}
        message="Tautan sosial ini akan dihapus dari daftar kontak."
        onClose={() => setDel(null)}
        onConfirm={() => {
          setSocials((s) => s.filter((x) => x.id !== del));
          setDel(null);
        }}
      />
    </div>
  );
}