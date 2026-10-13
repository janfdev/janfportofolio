"use client";

import { useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Dialog } from "../../../../components/ui/dialog";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";
import { useDashboard, tagsOf } from "../../../../lib/dashboard/store";
import { PageHeader, RowActions } from "./page-header";
import { ConfirmDialog } from "./crud-dialog";

interface FormState {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  github: string;
  tags: string;
}

const EMPTY: FormState = { title: "", description: "", imageUrl: "", url: "", github: "", tags: "" };

export function ProjectDialog({
  open,
  title,
  initial,
  onClose,
  onSave,
}: {
  open: boolean;
  title: string;
  initial: Partial<FormState>;
  onClose: () => void;
  onSave: (v: FormState) => void;
}) {
  const [v, setV] = useState<FormState>({ ...EMPTY, ...initial });
  const [touched, setTouched] = useState(false);
  if (!open) return null;
  const set = (k: keyof FormState) => (e: { target: { value: string } }) => {
    setV((p) => ({ ...p, [k]: e.target.value }));
    setTouched(true);
  };
  const titleErr = !v.title.trim() ? 'Kolom "Judul" wajib diisi.' : "";
  const descErr = !v.description.trim() ? 'Kolom "Deskripsi" wajib diisi.' : "";
  const invalid = !!titleErr || !!descErr;
  const submit = () => {
    setTouched(true);
    if (invalid) return;
    onSave({ ...v, title: v.title.trim(), description: v.description.trim() });
  };
  const fld = (
    id: string,
    label: string,
    node: React.ReactNode,
    err?: string
  ) => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {node}
      {touched && err && <p className="mt-1 text-xs text-destructive">{err}</p>}
    </div>
  );
  return (
    <Dialog open={open} onClose={onClose} title={title}>
      <div className="flex flex-col gap-3">
        {fld("p-title", "Judul *", <Input id="p-title" value={v.title} placeholder="cth: Aplikasi Kasir" onChange={set("title")} aria-invalid={touched && !!titleErr} />, titleErr)}
        {fld("p-desc", "Deskripsi *", <Textarea id="p-desc" value={v.description} rows={3} placeholder="Fungsi utama project dan hasil yang dicapai…" onChange={set("description")} aria-invalid={touched && !!descErr} />, descErr)}
        <div><Label htmlFor="p-img">Gambar (URL/path)</Label><Input id="p-img" value={v.imageUrl} placeholder="/proyek.png" onChange={set("imageUrl")} /></div>
        <div><Label htmlFor="p-url">Tautan live</Label><Input id="p-url" value={v.url} placeholder="https://..." onChange={set("url")} /></div>
        <div><Label htmlFor="p-gh">Tautan GitHub</Label><Input id="p-gh" value={v.github} placeholder="https://github.com/..." onChange={set("github")} /></div>
        <div>
          <Label htmlFor="p-tags">Tag (pisah koma, ikon opsional setelah |)</Label>
          <Input id="p-tags" value={v.tags} placeholder="React, NextJS | /icon.svg" onChange={set("tags")} />
          <p className="mt-1 text-xs text-muted-foreground">cth: React, NextJS | /icon.svg, Neon</p>
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="outline" onClick={onClose}>Batal</Button>
          <Button type="button" onClick={submit} disabled={touched && invalid}>Simpan</Button>
        </div>
      </div>
    </Dialog>
  );
}

// "NextJS | /icon.svg" -> { tag, icon }
export function parseTags(raw: string): { tag: string; icon: string }[] {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      const [tag, icon] = s.split("|").map((x) => x.trim());
      return { tag, icon: icon ?? "" };
    });
}

export function ProjectModule() {
  const { state, dispatch } = useDashboard();
  const [form, setForm] = useState<{ open: boolean; id?: number }>({ open: false });
  const [del, setDel] = useState<number | null>(null);
  const rows = [...state.projects].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  const editing = rows.find((p) => p.id === form.id);
  const initial: Partial<FormState> = editing
    ? {
        title: editing.title,
        description: editing.description ?? "",
        imageUrl: editing.imageUrl ?? "",
        url: editing.url ?? "",
        github: editing.github ?? "",
        tags: tagsOf(state, editing.id).map((t) => (t.icon ? `${t.tag} | ${t.icon}` : t.tag)).join(", "),
      }
    : EMPTY;

  const save = (v: FormState) => {
    dispatch({ type: "save-project", project: form.id ? { ...v, id: form.id } : v, tags: parseTags(v.tags) });
    setForm({ open: false });
  };

  return (
    <div className="@container/main flex flex-col gap-6">
      <PageHeader title="Projects" desc="Proyek yang tampil di halaman utama portofolio." addLabel="Tambah project" onAdd={() => setForm({ open: true })} />
      <div className="grid grid-cols-2 gap-3">
        {rows.map((p) => {
          const tags = tagsOf(state, p.id);
          return (
            <div key={p.id} className="rounded-xl border p-4">
              <p className="font-semibold">{p.title}</p>
              <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <Badge key={t.id} variant="outline">{t.tag}</Badge>
                ))}
              </div>
              <div className="mt-3 flex justify-end">
                <RowActions
                  item={p.title}
                  onEdit={() => setForm({ open: true, id: p.id })}
                  onDelete={() => setDel(p.id)}
                />
              </div>
            </div>
          );
        })}
        {rows.length === 0 && (
          <div className="col-span-2 rounded-lg border border-dashed p-6 text-center">
            <p className="text-sm font-medium">Belum ada project</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Data belum diisi, jadi halaman utama situs masih kosong.
            </p>
            <Button size="sm" className="mt-3" onClick={() => setForm({ open: true })}>
              Tambah project pertama
            </Button>
          </div>
        )}
      </div>
      {form.open && (
        <ProjectDialog
          key={form.id ?? "new"}
          open
          title={form.id ? "Ubah project" : "Tambah project"}
          initial={initial}
          onClose={() => setForm({ open: false })}
          onSave={save}
        />
      )}
      <ConfirmDialog
        open={del !== null}
        title={`Hapus ${rows.find((p) => p.id === del)?.title ?? "project"}?`}
        message="Project, tag, dan statistik view-nya ikut terhapus dan langsung hilang dari situs."
        onClose={() => setDel(null)}
        onConfirm={() => {
          dispatch({ type: "remove", table: "projects", id: del! });
          setDel(null);
        }}
      />
    </div>
  );
}
