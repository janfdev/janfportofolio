"use client";

// Formulir dialog generik: schema field sederhana, validasi required ringan,
// tanpa dependensi form tambahan (RHF/Zod baru ditambah bila aturan kompleks).

import { useState, type ReactNode } from "react";
import { Button } from "../../../../components/ui/button";
import { Dialog } from "../../../../components/ui/dialog";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";

export interface FieldDef {
  name: string;
  label: string;
  type?: "text" | "textarea";
  required?: boolean;
  placeholder?: string;
}

export function CrudDialog({
  open,
  title,
  fields,
  initial,
  onClose,
  onSave,
}: {
  open: boolean;
  title: string;
  fields: FieldDef[];
  initial: Record<string, unknown>;
  onClose: () => void;
  onSave: (values: Record<string, string>) => void;
}) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      fields.map((f) => [f.name, String(initial[f.name] ?? "")])
    )
  );
  const [err, setErr] = useState("");

  if (!open) return null;

  const submit = () => {
    const missing = fields.find(
      (f) => f.required && !values[f.name]?.trim()
    );
    if (missing) {
      setErr(`Kolom "${missing.label}" wajib diisi.`);
      return;
    }
    onSave(Object.fromEntries(fields.map((f) => [f.name, values[f.name]?.trim() ?? ""])));
  };

  return (
    <Dialog open={open} onClose={onClose} title={title}>
      <div className="space-y-3">
        {fields.map((f) => (
          <div key={f.name}>
            <Label htmlFor={`f-${f.name}`}>
              {f.label}
              {f.required ? " *" : ""}
            </Label>
            {f.type === "textarea" ? (
              <Textarea
                id={`f-${f.name}`}
                value={values[f.name]}
                placeholder={f.placeholder}
                rows={4}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [f.name]: e.target.value }))
                }
              />
            ) : (
              <Input
                id={`f-${f.name}`}
                value={values[f.name]}
                placeholder={f.placeholder}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [f.name]: e.target.value }))
                }
              />
            )}
          </div>
        ))}
        {err && <p className="text-sm text-destructive">{err}</p>}
        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button type="button" onClick={submit}>
            Simpan
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export function ConfirmDialog({
  open,
  title,
  message,
  onClose,
  onConfirm,
}: {
  open: boolean;
  title: string;
  message: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;
  return (
    <Dialog open={open} onClose={onClose} title={title} className="max-w-sm">
      <p className="text-sm text-muted-foreground">{message}</p>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Batal
        </Button>
        <Button type="button" variant="destructive" onClick={onConfirm}>
          Hapus
        </Button>
      </div>
    </Dialog>
  );
}
