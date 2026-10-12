"use client";

// Formulir dialog generik: error per-field, tombol Simpan disabled bila invalid.
// Tanpa dependensi form tambahan (RHF/Zod baru ditambah bila aturan kompleks).

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
  const [touched, setTouched] = useState(false);

  if (!open) return null;

  const errors: Record<string, string> = {};
  for (const f of fields) {
    if (f.required && !values[f.name]?.trim()) errors[f.name] = `Kolom "${f.label}" wajib diisi.`;
  }
  const invalid = Object.keys(errors).length > 0;

  const submit = () => {
    setTouched(true);
    if (invalid) return;
    onSave(Object.fromEntries(fields.map((f) => [f.name, values[f.name]?.trim() ?? ""])));
  };

  return (
    <Dialog open={open} onClose={onClose} title={title}>
      <div className="flex flex-col gap-3">
        {fields.map((f) => (
          <div key={f.name} className="flex flex-col gap-1.5">
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
                aria-invalid={touched && !!errors[f.name]}
                onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
              />
            ) : (
              <Input
                id={`f-${f.name}`}
                value={values[f.name]}
                placeholder={f.placeholder}
                aria-invalid={touched && !!errors[f.name]}
                onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
              />
            )}
            {touched && errors[f.name] && (
              <p className="mt-1 text-xs text-destructive">{errors[f.name]}</p>
            )}
          </div>
        ))}
        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button type="button" onClick={submit} disabled={touched && invalid}>
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
