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

  const save = () => {
    const { id: _omitId, updatedAt: _omitAt, ...patch } = v;
    void _omitId;
    void _omitAt;
    dispatch({ type: "update-profile", patch });
    setSaved(true);
  };

  const field = (k: keyof typeof v, label: string, textarea = false) => (
    <div>
      <Label htmlFor={`pf-${k}`}>{label}</Label>
      {textarea ? (
        <Textarea id={`pf-${k}`} value={String(v[k] ?? "")} rows={5} onChange={set(k)} />
      ) : (
        <Input id={`pf-${k}`} value={String(v[k] ?? "")} onChange={set(k)} />
      )}
    </div>
  );

  return (
    <div>
      <PageHeader title="Profil" desc="Identitas dan ringkasan yang tampil di halaman utama." />
      <div className="grid max-w-2xl gap-3">
        {field("name", "Nama")}
        {field("initials", "Inisial")}
        {field("url", "URL situs")}
        {field("location", "Lokasi")}
        {field("locationLink", "Tautan lokasi")}
        {field("description", "Deskripsi singkat")}
        {field("summary", "Ringkasan", true)}
        {field("avatarUrl", "Avatar (URL/path)")}
        {field("email", "Email")}
        {field("tel", "Telepon")}
        <div className="flex items-center gap-3 pt-1">
          <Button size="sm" onClick={save}>Simpan profil</Button>
          {saved && <span className="text-sm text-muted-foreground">Tersimpan.</span>}
        </div>
      </div>
    </div>
  );
}
