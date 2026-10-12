"use client";

import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";
import { useDashboard } from "../../../../lib/dashboard/store";
import { PageHeader } from "../_components/page-header";

export default function ProfilPage() {
  const { state, dispatch } = useDashboard();
  const p = state.profile;
  const [v, setV] = useState({ ...p });
  const [saved, setSaved] = useState(false);

  const set = (k: string) => (e: { target: { value: string } }) => {
    setV((prev) => ({ ...prev, [k]: e.target.value }));
    setSaved(false);
  };

  const invalid = !String(v.name ?? "").trim();
  const save = () => {
    if (invalid) return;
    const { id: _omitId, updatedAt: _omitAt, ...patch } = v;
    void _omitId;
    void _omitAt;
    dispatch({ type: "update-profile", patch });
    setSaved(true);
  };

  const field = (
    k: keyof typeof v,
    label: string,
    placeholder: string,
    textarea = false,
    required = false
  ) => (
    <div>
      <Label htmlFor={`pf-${k}`}>
        {label}
        {required ? " *" : ""}
      </Label>
      {textarea ? (
        <Textarea
          id={`pf-${k}`}
          value={String(v[k] ?? "")}
          rows={5}
          placeholder={placeholder}
          aria-invalid={required && !String(v[k] ?? "").trim()}
          onChange={set(k)}
        />
      ) : (
        <Input
          id={`pf-${k}`}
          value={String(v[k] ?? "")}
          placeholder={placeholder}
          aria-invalid={required && !String(v[k] ?? "").trim()}
          onChange={set(k)}
        />
      )}
      {required && !String(v[k] ?? "").trim() && (
        <p className="mt-1 text-xs text-destructive">Kolom &quot;{label}&quot; wajib diisi.</p>
      )}
    </div>
  );

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <PageHeader title="Profil" desc="Identitas dan ringkasan yang tampil di halaman utama situs." />
      <div className="grid max-w-2xl gap-3">
        {field("name", "Nama", "cth: Rizqi Noor Fauzan", false, true)}
        {field("initials", "Inisial", "cth: RF")}
        {field("url", "URL situs", "https://namamu.dev")}
        {field("location", "Lokasi", "cth: Cirebon, Indonesia")}
        {field("locationLink", "Tautan lokasi", "https://maps.google.com/?q=Cirebon")}
        {field("description", "Deskripsi singkat", "cth: Fullstack developer…")}
        {field("summary", "Ringkasan", "Cerita singkat tentang pengalaman dan fokus…", true)}
        {field("avatarUrl", "Avatar (URL/path)", "/avatar.png")}
        {field("email", "Email", "nama@email.com")}
        {field("tel", "Telepon", "+62…")}
        <div className="flex items-center gap-3 pt-1">
          <Button size="sm" onClick={save} disabled={invalid}>
            Simpan profil
          </Button>
          {saved && <span className="text-sm text-muted-foreground">Tersimpan dan langsung tampil di situs.</span>}
        </div>
      </div>
    </div>
  );
}
