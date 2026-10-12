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
  const rows = [...state.skills].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  const add = () => {
    const v = name.trim();
    if (!v) return;
    if (rows.some((s) => s.name.toLowerCase() === v.toLowerCase())) return;
    dispatch({ type: "insert", table: "skills", row: { name: v, sortOrder: rows.length } });
    setName("");
  };

  return (
    <div>
      <PageHeader title="Skills" desc="Daftar keahlian (badge di portofolio)." />
      <div className="mb-4 flex gap-2">
        <Input
          value={name}
          placeholder="cth: Go"
          aria-label="Nama skill baru"
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") add();
          }}
        />
        <Button size="sm" onClick={add} className="h-9 shrink-0">
          Tambah
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {rows.map((s) => (
          <Badge key={s.id} variant="secondary" className="gap-1.5 py-1 pl-3 pr-1.5 text-sm">
            {s.name}
            <button
              type="button"
              aria-label={`Hapus skill ${s.name}`}
              className="rounded-full px-1 text-muted-foreground hover:text-destructive"
              onClick={() => dispatch({ type: "remove", table: "skills", id: s.id })}
            >
              ×
            </button>
          </Badge>
        ))}
        {rows.length === 0 && <p className="text-sm text-muted-foreground">Belum ada skill.</p>}
      </div>
    </div>
  );
}
