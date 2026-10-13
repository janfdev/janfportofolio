"use client";

import { useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
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
      <PageHeader title="Skills" desc="Daftar keahlian yang tampil sebagai badge di portofolio." />
      <div className="mb-2 flex gap-2">
        <Input
          value={name}
          placeholder="cth: TypeScript"
          aria-label="Nama skill baru"
          onChange={(e) => {
            setName(e.target.value);
            setDup(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") add();
          }}
        />
        <Button size="sm" onClick={add} disabled={invalid} className="h-9 shrink-0">
          Tambah
        </Button>
      </div>
      {dup && <p className="mb-2 text-xs text-destructive">Skill tersebut sudah ada di daftar.</p>}
      <div className="flex flex-wrap gap-2">
        {rows.map((s) => (
          <Badge key={s.id} variant="secondary" className="gap-1.5 py-1 pl-3 pr-1.5 text-sm">
            {s.name}
            <button
              type="button"
              aria-label={`Hapus skill ${s.name}`}
              className="rounded-md px-1 text-muted-foreground hover:text-destructive"
              onClick={() => dispatch({ type: "remove", table: "skills", id: s.id })}
            >
              ×
            </button>
          </Badge>
        ))}
        {rows.length === 0 && (
          <div className="w-full rounded-lg border border-dashed p-6 text-center">
            <p className="text-sm font-medium">Belum ada skill</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Tambahkan skill pertama lewat kolom di atas, misal TypeScript.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
