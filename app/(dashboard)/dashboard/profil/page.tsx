"use client";

import { useState } from "react";
import { Check, Save } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";
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
    setV((prev: typeof v) => ({ ...prev, [k]: e.target.value }));
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
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="@container/main flex flex-col gap-6 max-w-4xl">
      <PageHeader
        title="Profil"
        desc="Kelola identitas utama, foto avatar, biografi, dan informasi kontak publik."
        extra={
          <div className="flex items-center gap-3">
            {saved && (
              <Badge variant="success" className="gap-1.5 py-1 px-2.5">
                <Check className="size-3.5" />
                Perubahan tersimpan!
              </Badge>
            )}
            <Button size="sm" onClick={save} disabled={invalid} className="gap-1.5 shadow-xs shadow-primary/20">
              <Save className="size-4" />
              Simpan Profil
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Quick Info */}
        <Card className="border-border/80 shadow-xs md:col-span-1 h-fit">
          <CardHeader className="pb-3 text-center">
            <CardTitle className="text-base font-bold">Foto Profil</CardTitle>
            <CardDescription className="text-xs">Pratinjau avatar Anda di situs</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="size-24 ring-4 ring-primary/20 shadow-md">
              {v.avatarUrl ? <AvatarImage src={v.avatarUrl} alt={v.name} /> : null}
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                {v.initials || v.name?.slice(0, 2).toUpperCase() || "RF"}
              </AvatarFallback>
            </Avatar>
            <div className="w-full">
              <Label htmlFor="pf-avatarUrl" className="text-xs font-semibold">URL Foto Avatar</Label>
              <Input
                id="pf-avatarUrl"
                value={String(v.avatarUrl ?? "")}
                placeholder="/avatar.png atau URL"
                className="mt-1.5 text-xs"
                onChange={set("avatarUrl")}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="pf-initials" className="text-xs font-semibold">Inisial Avatar</Label>
              <Input
                id="pf-initials"
                value={String(v.initials ?? "")}
                placeholder="cth: RF"
                className="mt-1.5 text-xs"
                onChange={set("initials")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Bio & Form Details */}
        <div className="md:col-span-2 flex flex-col gap-5">
          <Card className="border-border/80 shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">Informasi Utama</CardTitle>
              <CardDescription className="text-xs">Nama lengkap dan headline profesional</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3.5">
              <div>
                <Label htmlFor="pf-name" className="text-xs font-semibold">Nama Lengkap *</Label>
                <Input
                  id="pf-name"
                  value={String(v.name ?? "")}
                  placeholder="cth: Rizqi Noor Fauzan"
                  className="mt-1.5"
                  aria-invalid={!String(v.name ?? "").trim()}
                  onChange={set("name")}
                />
                {!String(v.name ?? "").trim() && (
                  <p className="mt-1 text-xs text-destructive">Nama lengkap wajib diisi.</p>
                )}
              </div>
              <div>
                <Label htmlFor="pf-description" className="text-xs font-semibold">Headline Singkat</Label>
                <Input
                  id="pf-description"
                  value={String(v.description ?? "")}
                  placeholder="cth: Fullstack Developer & Open Source Enthusiast"
                  className="mt-1.5"
                  onChange={set("description")}
                />
              </div>
              <div>
                <Label htmlFor="pf-summary" className="text-xs font-semibold">Ringkasan / Tentang Saya</Label>
                <Textarea
                  id="pf-summary"
                  value={String(v.summary ?? "")}
                  rows={4}
                  placeholder="Ceritakan perjalanan karier, keahlian utama, dan fokus proyek Anda..."
                  className="mt-1.5 text-sm leading-relaxed"
                  onChange={set("summary")}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/80 shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">Lokasi & Tautan Kontak</CardTitle>
              <CardDescription className="text-xs">Informasi domisili dan kontak cepat</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <Label htmlFor="pf-location" className="text-xs font-semibold">Lokasi Domisili</Label>
                <Input
                  id="pf-location"
                  value={String(v.location ?? "")}
                  placeholder="cth: Cirebon, Indonesia"
                  className="mt-1.5"
                  onChange={set("location")}
                />
              </div>
              <div>
                <Label htmlFor="pf-locationLink" className="text-xs font-semibold">Tautan Google Maps</Label>
                <Input
                  id="pf-locationLink"
                  value={String(v.locationLink ?? "")}
                  placeholder="https://maps.google.com/?q=..."
                  className="mt-1.5"
                  onChange={set("locationLink")}
                />
              </div>
              <div>
                <Label htmlFor="pf-email" className="text-xs font-semibold">Alamat Email</Label>
                <Input
                  id="pf-email"
                  value={String(v.email ?? "")}
                  placeholder="nama@email.com"
                  className="mt-1.5"
                  onChange={set("email")}
                />
              </div>
              <div>
                <Label htmlFor="pf-tel" className="text-xs font-semibold">Nomor Telepon / WhatsApp</Label>
                <Input
                  id="pf-tel"
                  value={String(v.tel ?? "")}
                  placeholder="+62 812..."
                  className="mt-1.5"
                  onChange={set("tel")}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}