"use client";

import { useState } from "react";
import { Plus, Wrench, X } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../../components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../../../../components/ui/empty";
import { Input } from "../../../../components/ui/input";
import { useDashboard } from "../../../../lib/dashboard/store";
import { PageHeader } from "../_components/page-header";

export default function SkillsPage() {
  const { state, dispatch } = useDashboard();
  const [name, setName] = useState("");
  const [dup, setDup] = useState(false);
  const rows = [...state.skills].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  const invalid = !name.trim() || rows.some((s) => s.name.toLowerCase() === name.trim().toLowerCase());

  const add = () => {
    const v = name.trim();
    if (!v) return;
    if (rows.some((s) => s.name.toLowerCase() === v.toLowerCase())) {
      setDup(true);
      return;
    }
    dispatch({ type: "insert", table: "skills", row: { name: v, sortOrder: rows.length } });
    setName("");
    setDup(false);
  };

  return (
    <div className="@container/main flex flex-col gap-6">
      <PageHeader
        title="Skills"
        desc="Kelola daftar keahlian teknologi, bahasa pemrograman, dan tools yang tampil di portofolio."
        count={rows.length}
      />

      <Card className="border-border/80 shadow-xs">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold">Tambah Keahlian Baru</CardTitle>
          <CardDescription className="text-xs">
            Ketik nama teknologi lalu tekan Enter atau klik tombol Tambah.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 max-w-md">
            <Input
              value={name}
              placeholder="cth: TypeScript, Next.js, Docker..."
              aria-label="Nama skill baru"
              className="h-9"
              onChange={(e) => {
                setName(e.target.value);
                setDup(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") add();
              }}
            />
            <Button size="sm" onClick={add} disabled={invalid} className="h-9 shrink-0 gap-1.5 shadow-xs shadow-primary/20">
              <Plus className="size-4" />
              Tambah
            </Button>
          </div>
          {dup && <p className="mt-2 text-xs text-destructive">Skill tersebut sudah ada di daftar.</p>}
        </CardContent>
      </Card>

      <Card className="border-border/80 shadow-xs">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold">Daftar Keahlian Aktif</CardTitle>
            <span className="text-xs text-muted-foreground tabular-nums">
              {rows.length} keahlian terdaftar
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2.5">
            {rows.map((s) => (
              <Badge
                key={s.id}
                variant="secondary"
                className="group flex items-center gap-1.5 py-1.5 pl-3 pr-2 text-xs font-medium bg-muted/80 hover:bg-muted border border-border/60 transition-colors"
              >
                <span>{s.name}</span>
                <button
                  type="button"
                  aria-label={`Hapus skill ${s.name}`}
                  className="rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive"
                  onClick={() => dispatch({ type: "remove", table: "skills", id: s.id })}
                >
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
            {rows.length === 0 && (
              <div className="w-full py-6">
                <Empty>
                  <EmptyMedia variant="icon">
                    <Wrench className="size-5" />
                  </EmptyMedia>
                  <EmptyHeader>
                    <EmptyTitle>Belum ada skill yang ditambahkan</EmptyTitle>
                    <EmptyDescription>
                      Masukkan teknologi pertama seperti React atau TypeScript pada form di atas.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}