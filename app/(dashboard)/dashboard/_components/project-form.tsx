"use client";

import { useState } from "react";
import { ExternalLink, FolderGit2, Github, Plus } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Dialog } from "../../../../components/ui/dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../../../../components/ui/empty";
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
      <Label htmlFor={id} className="text-xs font-semibold">{label}</Label>
      {node}
      {touched && err && <p className="mt-1 text-xs text-destructive">{err}</p>}
    </div>
  );
  return (
    <Dialog open={open} onClose={onClose} title={title}>
      <div className="flex flex-col gap-3.5">
        {fld("p-title", "Judul Proyek *", <Input id="p-title" value={v.title} placeholder="cth: Platform SaaS Analytics" onChange={set("title")} aria-invalid={touched && !!titleErr} />, titleErr)}
        {fld("p-desc", "Deskripsi Ringkas *", <Textarea id="p-desc" value={v.description} rows={3} placeholder="Jelaskan peran teknologi, dampak, dan fungsionalitas utama proyek..." onChange={set("description")} aria-invalid={touched && !!descErr} />, descErr)}
        <div>
          <Label htmlFor="p-img" className="text-xs font-semibold">URL Thumbnail / Screenshot</Label>
          <Input id="p-img" value={v.imageUrl} placeholder="https://... atau /proyek.png" onChange={set("imageUrl")} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="p-url" className="text-xs font-semibold">Tautan Live Demo</Label>
            <Input id="p-url" value={v.url} placeholder="https://..." onChange={set("url")} />
          </div>
          <div>
            <Label htmlFor="p-gh" className="text-xs font-semibold">Repositori GitHub</Label>
            <Input id="p-gh" value={v.github} placeholder="https://github.com/..." onChange={set("github")} />
          </div>
        </div>
        <div>
          <Label htmlFor="p-tags" className="text-xs font-semibold">Daftar Tag (pisahkan koma)</Label>
          <Input id="p-tags" value={v.tags} placeholder="Next.js, TypeScript, PostgreSQL, Tailwind" onChange={set("tags")} />
          <p className="mt-1 text-[11px] text-muted-foreground">Contoh format: React, TypeScript, Node.js</p>
        </div>
        <div className="flex justify-end gap-2 pt-2 border-t border-border/60">
          <Button type="button" variant="outline" onClick={onClose}>Batal</Button>
          <Button type="button" onClick={submit} disabled={touched && invalid}>Simpan Proyek</Button>
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
      <PageHeader
        title="Projects"
        desc="Kelola karya portofolio yang ditampilkan di halaman utama situs."
        count={rows.length}
        addLabel="Tambah Project"
        onAdd={() => setForm({ open: true })}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rows.map((p) => {
          const tags = tagsOf(state, p.id);
          const views = state.projectViews.find((v) => v.projectId === p.id)?.views ?? 0;

          return (
            <Card key={p.id} className="group relative flex flex-col justify-between overflow-hidden border-border/80 transition-all hover:border-primary/40 hover:shadow-md">
              <CardContent className="p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-2xs">
                      <FolderGit2 className="size-4.5" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-foreground leading-snug">{p.title}</h2>
                      <span className="text-[11px] text-muted-foreground tabular-nums">
                        {views} total views
                      </span>
                    </div>
                  </div>
                  <RowActions
                    item={p.title}
                    onEdit={() => setForm({ open: true, id: p.id })}
                    onDelete={() => setDel(p.id)}
                  />
                </div>

                <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tags.map((t) => (
                    <Badge key={t.id} variant="secondary" className="text-[11px] font-medium bg-muted/80">
                      {t.tag}
                    </Badge>
                  ))}
                </div>

                {(p.url || p.github) && (
                  <div className="flex items-center gap-2 pt-2 border-t border-border/50 text-xs">
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
                      >
                        <ExternalLink className="size-3" />
                        Demo
                      </a>
                    )}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground font-medium"
                      >
                        <Github className="size-3" />
                        Kode
                      </a>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}

        {rows.length === 0 && (
          <div className="col-span-full">
            <Empty>
              <EmptyMedia variant="icon">
                <FolderGit2 className="size-5" />
              </EmptyMedia>
              <EmptyHeader>
                <EmptyTitle>Belum ada proyek tersimpan</EmptyTitle>
                <EmptyDescription>
                  Tambahkan portofolio karya Anda untuk langsung ditampilkan di halaman utama situs.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button size="sm" onClick={() => setForm({ open: true })}>
                  <Plus className="size-4 mr-1.5" />
                  Tambah Proyek Pertama
                </Button>
              </EmptyContent>
            </Empty>
          </div>
        )}
      </div>

      {form.open && (
        <ProjectDialog
          key={form.id ?? "new"}
          open
          title={form.id ? "Ubah Data Proyek" : "Tambah Proyek Baru"}
          initial={initial}
          onClose={() => setForm({ open: false })}
          onSave={save}
        />
      )}
      <ConfirmDialog
        open={del !== null}
        title={`Hapus proyek ${rows.find((p) => p.id === del)?.title ?? ""}?`}
        message="Proyek, tag yang bersangkutan, dan statistik view-nya akan dihapus permanen dari portofolio."
        onClose={() => setDel(null)}
        onConfirm={() => {
          dispatch({ type: "remove", table: "projects", id: del! });
          setDel(null);
        }}
      />
    </div>
  );
}