# Dokumentasi Ekstraksi Tema & Komponen Admin Dashboard

Dokumen ini merangkum arsitektur token warna, komponen yang diekstrak dari template referensi (`next-shadcn-admin-dashboard`), serta panduan replikasi untuk integrasi template admin di masa mendatang pada proyek Next.js / Tailwind CSS v4.

---

## 1. Arsitektur Token & Skema Scoping Warna

### Masalah Isolasi Desain
Landing page publik (`/` dan `/blog`) memiliki gaya desain editorial minimalis/monokromatis (oklch hitam-putih murni). Panel admin (`/dashboard`) membutuhkan hierarki visual yang hidup, aksen warna berkarakter (Royal Indigo, Emerald, Amber, Rose), dan visual status indikator dengan kontras WCAG AA yang lolos uji.

### Solusi Scoped Theme
Seluruh token dashboard diisolasi menggunakan selektor atribut `[data-theme="dashboard"]` dan kelas `.dashboard-theme` pada root wrapper `app/(dashboard)/layout.tsx`:

```tsx
// app/(dashboard)/layout.tsx
<div
  data-theme="dashboard"
  className="dashboard-theme flex min-h-screen w-full bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary"
>
  {/* Header, Sidebar, Main Content */}
</div>
```

Dengan teknik ini:
1. Elemen di luar dashboard (seperti landing page di `app/(site)`) tetap menggunakan `:root` dan `.dark` bawaan tanpa terpengaruh warna dashboard.
2. Di dalam wrapper dashboard, seluruh variabel shadcn CSS seperti `--primary`, `--secondary`, `--accent`, `--sidebar-*`, `--chart-*`, dan status indikator (`--success`, `--warning`, `--info`) tertimpa secara cascading tanpa intervensi JavaScript tambahan.

### Palet Warna Terpasang (OKLCH)

| Token | Light Mode | Dark Mode | Fungsi & Karakter |
|---|---|---|---|
| `--primary` | `oklch(0.55 0.22 265)` | `oklch(0.68 0.20 265)` | Royal Indigo: Aksen utama, tombol aksi, active nav |
| `--secondary` | `oklch(0.95 0.025 265)` | `oklch(0.26 0.035 265)` | Soft Indigo tint untuk elemen pendukung |
| `--accent` | `oklch(0.94 0.03 265)` | `oklch(0.28 0.05 265)` | Hover state interaktif & pills |
| `--sidebar` | `oklch(0.985 0.006 255)` | `oklch(0.135 0.025 265)` | Rail background kontras profesional |
| `--sidebar-primary` | `oklch(0.55 0.22 265)` | `oklch(0.68 0.20 265)` | Indikator menu aktif sidebar |
| `--chart-1` | `oklch(0.55 0.22 265)` | `oklch(0.68 0.20 265)` | Indigo (Metrik Utama / Kunjungan) |
| `--chart-2` | `oklch(0.64 0.17 36.44)` | `oklch(0.68 0.18 36.44)` | Tangerine (Aktivitas Proyek) |
| `--chart-3` | `oklch(0.62 0.17 145)` | `oklch(0.68 0.17 145)` | Emerald (Sukses / Disetujui) |
| `--chart-4` | `oklch(0.72 0.16 70)` | `oklch(0.75 0.16 70)` | Amber (Peringatan / Menunggu) |
| `--chart-5` | `oklch(0.62 0.21 330)` | `oklch(0.68 0.21 330)` | Rose (Bahaya / Belum Dibaca) |
| `--success` | `oklch(0.62 0.17 145)` | `oklch(0.68 0.17 145)` | Indikator Disetujui & Status Aman |
| `--warning` | `oklch(0.72 0.16 65)` | `oklch(0.75 0.16 65)` | Indikator Pending & Moderasi |

---

## 2. Komponen UI Shadcn yang Diekstrak & Ditingkatkan

1. **`components/ui/breadcrumb.tsx`**
   - Diadaptasi dari template referensi menggunakan `@radix-ui/react-slot` dan Lucide icons (`ChevronRight`, `MoreHorizontal`).
   - Menyediakan navigasi hierarkis `Dashboard > [Modul]` pada header admin.

2. **`components/ui/empty.tsx`**
   - Komponen empty-state modular dengan subkomponen: `Empty`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`, `EmptyDescription`, `EmptyContent`.
   - Menggunakan SVG Icon Lucide dengan background gradient lingkaran/persegi membulat yang elegan saat data tabel/kartu masih kosong (zero-state).

3. **`components/ui/badge.tsx` (Varian Status Diperkaya)**
   - Ditambahkan varian:
     - `success`: Aksen Emerald lembut dengan teks emerald tajam (`bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30`).
     - `warning`: Aksen Amber untuk antrean moderasi (`bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30`).
     - `info`: Aksen Indigo untuk status informasi umum (`bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30`).
     - `destructive`: Aksen Rose untuk pesan belum dibaca atau status ditolak.

4. **`components/ui/dialog.tsx`**
   - Ditingkatkan dengan overlay backdrop blur (`backdrop-blur-sm`), animasi fade-in halus, kartu rounded-2xl dengan ring kontras, serta aksesibilitas keyboard (tutup otomatis via tombol `Escape`).

---

## 3. Redesign Halaman & Komponen Dashboard

### Shell & Header (`app/(dashboard)/layout.tsx`)
- **Header**:
  - Tombol toggle sidebar (`PanelLeft`) dengan tooltip.
  - Breadcrumb dinamis berdasarkan rute aktif.
  - Bar/trigger visual Quick Search (`⌘K` / `Ctrl+K`) interaktif untuk melompat langsung ke modul mana pun.
  - `ModeToggle` (Dark/Light switcher) yang langsung tersinkronisasi.
  - Profil avatar button dengan status online aktif.
- **Sidebar**:
  - Profil header dengan avatar, nama, dan pill badge "Admin Studio".
  - Navigasi terkategori ("Utama", "Konten", "Moderasi").
  - Active pill dengan latar `bg-primary text-primary-foreground shadow-xs`.
  - Lively notification badges pada item moderasi (badge angka oranye untuk Komentar pending, badge merah untuk Pesan baru; dot indikator saat sidebar diciutkan).
  - Kartu status "Penyimpanan Lokal Aktif" di bagian bawah.

### Ringkasan (`app/(dashboard)/dashboard/page.tsx`)
- **Metric Cards (4 Kartu Utama)**:
  - Gradient halus ke warna kartu, icon berlatar warna spesifik (Indigo, Emerald, Amber, Rose).
  - Angka tabular besar (`text-3xl font-extrabold tabular-nums`).
  - Badge status dinamis ("+X minggu ini", "Perlu tinjauan", "Semua bersih").
- **Statistik Cepat (3 Kartu Sekunder)**:
  - Experience, Education, dan Skills dengan ikon beraksen dan panah navigasi.
- **Visual Chart (7 Hari Terakhir)**:
  - Bar chart berbasis SVG/HTML responsif dengan gradasi warna `from-primary/70 via-primary/90 to-primary`.
  - Label hari (`Sen`, `Sel`, dst.) dan tanggal numerik, hover state, serta tooltip nilai.
- **Perlu Tindakan**:
  - Menampilkan antrean komentar pending dan pesan unread dengan tombol aksi cepat langsung dari dashboard ("Setujui", "Tandai dibaca", "Tinjau").
  - Menampilkan empty-state "Semua Beres!" ketika tidak ada tugas tersisa.

### Modul CRUD
- **Projects**: Tampilan kartu proyek dengan badge tag, link demo/GitHub, statistik klik, dialog modal tambah/ubah, dan empty state.
- **Experience**: Tabel rapi dalam container card dengan header kolom, badge periode, dan aksi inline.
- **Education**: Tabel rapi dengan institusi, gelar, periode, dan aksi inline.
- **Skills**: Form penambahan instan (dukungan tombol Enter), badge pills interaktif dengan tombol hapus cepat, dan badge counter.
- **Profil**: Pengaturan multi-seksi (Avatar preview, Identitas utama, Lokasi & kontak publik) dengan indikator konfirmasi simpan.
- **Kontak**: Kartu kontak email/telepon dengan toggle edit cepat serta tabel tautan jejaring sosial.
- **Kunjungan**: Kartu metrik analitik, visual progress bar per proyek, dan tabel log 15 sesi terakhir dengan filter rute badge.
- **Komentar**: Tabel moderasi komentar dengan status badge berwarna (Disetujui, Menunggu, Ditolak) dan tombol aksi cepat.
- **Pesan**: Kartu pesan masuk dengan highlight border dan badge "Belum Dibaca" / "Sudah Dibaca".

---

## 4. Panduan Mereplikasi Ekstraksi Template Baru

Jika di masa depan Anda ingin mengadopsi tema atau komponen dari template admin lain (misal preset warna baru seperti Tangerine, Brutalist, Emerald, atau Rose):

1. **Inspeksi Variabel CSS Template**:
   - Cari file CSS preset atau `globals.css` di template referensi.
   - Ambil definisi variabel warna (`--primary`, `--sidebar-*`, `--chart-*`, dsb.).
2. **Tambahkan ke Scope Dashboard**:
   - Buka `app/globals.css`.
   - Masukkan variabel baru ke dalam blok `[data-theme="dashboard"], .dashboard-theme` untuk mode terang dan `.dark [data-theme="dashboard"], [data-theme="dashboard"].dark` untuk mode gelap.
   - Jangan menyentuh `:root` atau `.dark` tingkat teratas agar landing page publik tetap tidak terpengaruh.
3. **Ekstraksi Komponen UI**:
   - Tempatkan komponen baru di `components/ui/[nama-komponen].tsx`.
   - Pastikan impor menggunakan dependensi lokal yang sudah ada (misal `@radix-ui/react-slot`, `clsx`, `tailwind-merge`, `lucide-react`) untuk menghindari dependensi berlebih yang tidak diperlukan.
4. **Verifikasi Tipe & Build**:
   - Jalankan `npx tsc --noEmit` untuk memastikan tidak ada kesalahan tipe TypeScript.
   - Jalankan `npm run build` untuk memverifikasi proses build produksi, routing Next.js, dan optimasi static rendering 100% hijau.
