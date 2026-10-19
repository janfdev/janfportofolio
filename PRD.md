# Product Requirements Document (PRD)
## Portfolio Experience Revamp: Flow, Navigation, Motion & Case-Study Cards

**Target Codebase**: `C:/My_Project/my-porto` (`janfdev/janfportofolio`)  
**Version**: 1.0.0 (Draft)  
**Status**: Ready for Review & Execution  

---

### 1. Problem Statement

Portofolio saat ini (`my-porto`) telah memiliki fondasi Next.js 15, React 19, dan Tailwind CSS v4 yang stabil. Namun, dari segi *user journey*, *storytelling*, dan *visual craftsmanship*, masih terdapat beberapa kesenjangan dibandingkan dengan standar portofolio engineer kelas dunia (seperti pada referensi *fachri-ak-portfolio*):

1. **Struktur Konten Proyek Terlalu Dangkal**:
   Kartu proyek saat ini hanya memuat judul, satu kalimat deskripsi singkat, dan deretan ikon teknologi. Calon perekrut atau klien teknis tidak dapat memahami *masalah apa yang diselesaikan*, *arsitektur sistem apa yang digunakan*, atau *dampak/metrik nyata yang dihasilkan*.
2. **Scroll & Motion Belum Terintegrasi Halus**:
   Pergerakan halaman masih mengandalkan scroll native peramban yang kaku. Belum ada *inertia momentum smooth scrolling* (seperti Lenis) dan efek *staggered blur-fade reveal* yang terkoordinasi antar-bagian.
3. **Alur Navigasi & Storytelling Terputus**:
   Alur navigasi antar-seksi belum memiliki *scroll-spy indicator* yang memperjelas di seksi mana pengunjung berada. Tautan antara kartu proyek menuju studi kasus teknis mendalam belum terstruktur.
4. **Kekhawatiran Regresi Fungsional**:
   Pembaruan harus tetap mempertahankan semua fitur yang sudah berjalan dengan baik (Dynamic Island mobile audio player, integrasi YouTube headless, dashboard lokal, dan halaman `/contact`), tanpa menghapus kode yang ada, serta diawali dengan pengayaan **data statis** terlebih dahulu.

---

### 2. Solution

Mentransformasikan portofolio menjadi sebuah **Engineering Showcase** interaktif yang memadukan keunggulan estetika desain (Awwwards-level polish) dengan kedalaman teknis seorang Fullstack Engineer:

1. **Lenis Smooth Scroll Engine**:
   Mengintegrasikan Lenis (`lenis/react` atau `@studio-freight/lenis`) untuk menghadirkan pengalaman navigasi inertial scroll yang elegan di desktop dan tetap native di perangkat mobile, lengkap dengan *fallback* untuk pengguna dengan preferensi `prefers-reduced-motion`.
2. **Staggered Blur-Fade Reveal & Parallax Motion**:
   Menyempurnakan transisi masuknya elemen saat di-scroll dengan kurva *cubic-bezier* responsif (`cubic-bezier(0.16, 1, 0.3, 1)`), efek blur halus yang menajam, serta *subtle zoom parallax* pada thumbnail gambar.
3. **Card Projek Berstruktur Studi Kasus (Problem-Solution-Tech-Impact)**:
   Meningkatkan struktur komponen kartu proyek agar menyajikan:
   - **Kategori & Peran**: Misal *Fullstack SaaS*, *Distributed API*, *AI Agent Orchestration*.
   - **Problem Snapshot**: Masalah teknis atau bisnis yang dihadapi.
   - **Solution & Architecture**: Keputusan arsitektur sistem dan teknologi yang diterapkan.
   - **Tech Stack Chips**: Tag teknologi dengan tooltip penjelasan.
   - **Key Engineering Highlights**: Poin keunggulan (misal: *ACID compliance*, *Multi-tenant RBAC*, *Sub-100ms response*).
   - **Dual Action**: Tombol langsung ke *Live Demo*, *Source Code*, dan opsi drawer/modal *Read Architecture Brief*.
4. **Harmonisasi Navigasi & Flow Halaman**:
   Menyelaraskan *Desktop Floating Pill Header* (dengan active scroll-spy), *Mobile Bottom Dock*, dan *Mobile Top Dynamic Island Music Player*.

---

### 3. User Stories

1. Sebagai calon perekrut / tech lead, saya ingin membaca ringkasan masalah dan arsitektur di setiap kartu proyek, sehingga saya dapat menilai kemampuan problem solving dan engineering maturity pengembang secara cepat.
2. Sebagai pengunjung website, saya ingin merasakan pergerakan scroll yang halus dan berbobot (*smooth inertia scrolling*), sehingga navigasi di situs terasa nyaman, modern, dan tidak melelahkan mata.
3. Sebagai pengunjung, saya ingin elemen visual seperti kartu proyek dan riwayat pengalaman muncul berurutan dengan transisi blur-fade yang anggun, sehingga situs terasa dinamis dan tidak kaku.
4. Sebagai pengguna dengan preferensi *reduced motion*, saya ingin animasi berat dan inertia scrolling dinonaktifkan secara otomatis, sehingga situs tetap aksesibel dan nyaman digunakan tanpa memicu disorientasi vestibular.
5. Sebagai calon klien, saya ingin dapat memfilter proyek berdasarkan kategori disiplin (misal: *Fullstack*, *Backend & API*, *Tools & AI*), sehingga saya dapat langsung melihat karya yang relevan dengan kebutuhan saya.
6. Sebagai pengunjung, saya ingin melihat indikator navigasi di header berubah otomatis mengikuti posisi seksi yang sedang saya baca (*scroll-spy*), sehingga saya selalu mengetahui lokasi saya di dalam halaman.
7. Sebagai pengguna desktop, saya ingin tombol *Contact* di header mengarahkan langsung ke halaman kontak tanpa memuat ulang halaman (*client-side routing*), sehingga saya dapat langsung mengirim pesan.
8. Sebagai pengguna mobile, saya ingin Dynamic Island musik di atas layar dan Dock navigasi di bawah layar bekerja berdampingan tanpa saling bertabrakan, sehingga area baca konten tetap luas.
9. Sebagai perekrut, saya ingin melihat tautan demo langsung (*live URL*) dan repositori GitHub di setiap proyek dengan status akses yang jelas, sehingga saya dapat langsung menguji kode dan produknya.
10. Sebagai pengembang (pemilik portofolio), saya ingin semua data proyek, masalah, solusi, dan highlight arsitektur tersimpan dalam struktur data statis yang rapi dan modular (`lib/data/resume.tsx` atau file data khusus), sehingga mudah diperbarui di masa mendatang tanpa menyentuh JSX komponen.

---

### 4. Implementation Decisions

#### A. Arsitektur Smooth Scroll & Motion (Lenis)
- **Library**: `lenis/react` (atau `lenis` resmi dari `@studio-freight/lenis` / `darkroomengineering`).
- **Scope**: Dibungkus pada level `app/(site)/layout.tsx` menggunakan provider client-side `SmoothScrollProvider`.
- **Konfigurasi Default**:
  - `lerp: 0.1` (keseimbangan responsivitas dan kelembutan).
  - `wheelMultiplier: 0.9`.
  - `touchMultiplier: 1.0` (tetap mempertahankan sentuhan asli pada perangkat mobile).
  - Pengecekan otomatis `window.matchMedia('(prefers-reduced-motion: reduce)')`.

#### B. Redesain & Struktur Data Kartu Proyek (Project Card V2)
- **Struktur Data Statis Baru (Tambahan tanpa merusak properti lama)**:
  Setiap item proyek dalam data statis akan diperkaya dengan atribut:
  ```ts
  export interface ProjectItem {
    // Properti existing (backward-compatible)
    title: string;
    description: string;
    tags: string[];
    tagsIcon: string[];
    imageUrl: string;
    url?: string;
    github?: string;

    // Properti baru (studi kasus & slug routing)
    slug: string;                  // URL-friendly identifier (contoh: "smartseum", "quavity")
    category: "Fullstack" | "Backend & API" | "AI & Systems" | "Frontend";
    role: string;                  // Contoh: "Sole Fullstack Engineer"
    problem: string;               // 1-2 kalimat masalah nyata
    solution: string;              // 1-2 kalimat solusi teknis
    architectureHighlights: string[]; // 2-3 poin teknis utama
    featured?: boolean;
    year?: string;
    metrics?: { label: string; value: string }[];
  }
  ```
- **Komponen Kartu Proyek (`components/project.tsx`)**:
  - Tampilan *two-tier*:
    1. Header Visual: Thumbnail gambar dengan rasio 16:9, rounded border, hover scale `1.03`, dan badge kategori di pojok. Klik pada gambar atau judul akan mengarahkan ke halaman detail `/projects/[slug]`.
    2. Body Spesifikasi: Judul proyek, peran & tahun, Problem vs Solution block dengan tipografi kontras bersih, deretan tag teknologi interaktif, dan action bar (Live Demo, Source Code, dan link "Detail Studi Kasus ->" ke `/projects/[slug]`).
  - Tidak menghapus komponen lama; komponen lama di-upgrade secara proporsional.

#### C. Halaman Detail Projek Berbasis Slug (`app/(site)/projects/[slug]/page.tsx`)
- Menggunakan dynamic route Next.js App Router dengan `generateStaticParams()` sehingga seluruh halaman detail ter-render secara statis (SSG) pada saat build tanpa runtime server overhead.
- Struktur Halaman Detail:
  1. **Breadcrumb & Header**: Tombol kembali ke `#projects` di beranda, badge status, tahun, kategori, dan peran.
  2. **Hero Preview**: Banner media / mockup UI layar penuh dengan aspect ratio proporsional.
  3. **Latar Belakang & Masalah (Problem Statement)**: Konteks bisnis dan tantangan teknis yang dihadapi pengguna/organisasi.
  4. **Arsitektur Sistem & Solusi (System Architecture)**: Penjelasan alur data, diagram alur (Flow ASCII/Mermaid), dan alasan pemilihan teknologi.
  5. **Tantangan Rekayasa & Resolusi**: Bottleneck teknis dan cara penyelesaiannya (misal: penanganan cold-start AI, optimasi query database, multi-tenant RBAC).
  6. **Hasil & Dampak (Key Metrics)**: Kartu metrik kuantitatif (*latency*, *concurrency*, *penghematan waktu*).
  7. **Action Bar & Navigasi Proyek**: Tombol *Live Demo*, *GitHub*, serta navigasi *Next Project* / *Previous Project* di bagian bawah.

#### D. Navigasi & Scroll-Spy
- Pada `Header11`, tambahkan pendeteksi seksi aktif berbasis `IntersectionObserver` untuk tautan `#about`, `#work`, `#skills`, dan `#projects`.
- Tautan aktif diberi indikator pill lembut beraksen emerald atau warna teks foreground kontras tinggi.
- Navigasi `/contact` tetap menjadi tombol CTA utama di sisi kanan header.

#### D. Penataan Flow Halaman Beranda (`app/(site)/page.tsx`)
1. **Hero Section**: Personal branding, tagline arsitek sistem, aksen emerald, tombol CTA Proyek & Kontak.
2. **Featured Projects (ProjectSection V2)**: Tab filter kategori (*All*, *Fullstack*, *Backend & API*, *AI*) + Grid kartu proyek studi kasus baru.
3. **Experience Timeline (WorkSection)**: Riwayat karier profesional dengan badge peran dan pencapaian.
4. **Ecosystem & Skills (SkillsSection)**: Pengelompokan teknologi dan keahlian teknis.
5. **Call To Action**: Banner penutup yang mengarahkan ke halaman `/contact`.

---

### 5. Testing Decisions

1. **Build & Type Safety**:
   - `npx tsc --noEmit` wajib keluar dengan exit code `0` (nol error TypeScript).
   - `npm run build` wajib sukses merender 100% halaman statis tanpa hydration mismatch.
2. **Behavior & Scroll Testing**:
   - Memastikan Lenis smooth scroll berjalan mulus pada wheel scroll desktop dan tidak merusak native touch scrolling di mobile.
   - Memastikan tombol anchor `#projects`, `#about`, dll. meluncur ke koordinat yang tepat dengan offset navbar yang sesuai (`scroll-mt-28`).
3. **Responsive & Contrast Integrity (Anti-Slop)**:
   - Tidak ada horizontal overflow pada viewport `375px`, `390px`, `768px`, dan `1200px`.
   - Rasio kontras teks minimum 4.5:1 untuk teks normal dan 3:1 untuk teks besar (WCAG AA).
   - Tidak ada karakter em dash (`—`) dalam seluruh teks baru.
   - Semua tombol dan tautan memiliki fungsi nyata dan label aksesibel.

---

### 6. Out of Scope

- Pembuatan backend CMS dinamis untuk CRUD proyek (seluruh data dikelola via data statis terstruktur di TypeScript terlebih dahulu).
- Pembuatan halaman blog artikel penuh (difokuskan pada halaman showcase utama dan halaman kontak).
- Penambahan backend otentikasi baru di luar dashboard lokal yang sudah ada.

---

### 7. Milestones & Execution Steps

- **Milestone 1**: Pengayaan data statis proyek di `lib/data/resume.tsx` dengan informasi kategori, masalah, solusi, dan arsitektur.
- **Milestone 2**: Instalasi dan konfigurasi `lenis` untuk smooth scroll di `app/(site)/layout.tsx`.
- **Milestone 3**: Refactor komponen `components/project.tsx` & `components/section/projects-section.tsx` dengan struktur kartu studi kasus baru dan filter kategori.
- **Milestone 4**: Sinkronisasi scroll-spy pada header desktop dan verifikasi anti-slop delivery gate.

---

### 8. Visual Previews & Page Layout Architecture (Preview Tiap Halaman)

Bagian ini memetakan tata letak (wireframe visual), hierarki informasi, dan komponen interaktif untuk setiap halaman dalam portofolio:

```
================================================================================
PREVIEW 1: HALAMAN BERANDA (/) - MAIN SHOWCASE
================================================================================
[DESKTOP HEADER]: Fixed Pill Header
+------------------------------------------------------------------------------+
| [Logo: JANF]         About   Experience   Ecosystem   Projects   | [Contact] |
+------------------------------------------------------------------------------+
[MOBILE ONLY]: Top Dynamic Island Player (Floating Pill top-3)
+------------------------------------------------------------------------------+
|                 [ (o) In Another Life - The One That Got Away |||| ]         |
+------------------------------------------------------------------------------+

[1. HERO SECTION]
+------------------------------------------------------------------------------+
|                                                                              |
|                          [ Avatar Foto Profil ]                              |
|                                                                              |
|                       RIZQI NOOR FAUZAN (JANF)                               |
|              Fullstack Software Engineer & System Architect                  |
|                                                                              |
|      "Architecting scalable fullstack web applications, distributed APIs,    |
|      and high-performance digital products with precision and craftsmanship" |
|                                                                              |
|               [ View Projects -> ]     [ Get in Touch ]                      |
|                                                                              |
|                     ( GitHub )   ( LinkedIn )   ( Email )                    |
+------------------------------------------------------------------------------+

[2. ABOUT & CORE PILLARS]
+------------------------------------------------------------------------------+
|  [ ABOUT ME ]                                                                |
|  Ringkasan keahlian teknis: Next.js, TypeScript, NestJS, Node.js, Prisma,    |
|  PostgreSQL, Docker, Cloud Storage, dan Anti-Slop UI Craftsmanship.         |
+------------------------------------------------------------------------------+

[3. WORK EXPERIENCE TIMELINE]
+------------------------------------------------------------------------------+
|  [ CAREER JOURNEY ]                                                          |
|                                                                              |
|  o-- 2024 - Present: Software Engineer Orchestrator                          |
|  |   Enterprise Banking & CRM Platforms (Multi-tenant, Maker-Checker)        |
|  |                                                                           |
|  o-- 2023 - 2024: Fullstack Web Developer                                    |
|  |   B2B SaaS, Realtime Automation, and Production Next.js Systems           |
+------------------------------------------------------------------------------+

[4. FEATURED PROJECTS V2 (STUDI KASUS SHOWCASE)]
+------------------------------------------------------------------------------+
|  [ PORTFOLIO ]                                                               |
|  Featured Projects & Architecture Showcase                                   |
|                                                                              |
|  Filter: [ All (5) ]  [ Fullstack SaaS ]  [ Backend & API ]  [ AI Systems ]  |
|                                                                              |
|  +---------------------------+ +---------------------------+                 |
|  | [Thumbnail Preview: 16:9] | | [Thumbnail Preview: 16:9] |                 |
|  | [Badge: Fullstack SaaS]   | | [Badge: Distributed API]  |                 |
|  | Smartseum                 | | API PUBLIC                |                 |
|  | Role: Sole Architect      | | Role: Backend Engineer    |                 |
|  | Problem: ...              | | Problem: ...              |                 |
|  | Solution: ...             | | Solution: ...             |                 |
|  | Tech: Next.js Prisma PG   | | Tech: Express Node Supa   |                 |
|  | [ Live Demo ] [ GitHub ]  | | [ Live Demo ] [ GitHub ]  |                 |
|  +---------------------------+ +---------------------------+                 |
+------------------------------------------------------------------------------+

[5. ECOSYSTEM & TECH STACK]
+------------------------------------------------------------------------------+
|  [ TECH STACK ]                                                              |
|  * Frontend : Next.js 15, React 19, Tailwind CSS v4, Framer Motion           |
|  * Backend  : Node.js, Express, NestJS, Prisma ORM, Drizzle ORM              |
|  * Database : PostgreSQL, Neon, Supabase, MongoDB, Redis                     |
|  * DevOps   : Docker, Git, Vercel, Linux VPS, GitHub Actions                 |
+------------------------------------------------------------------------------+

[6. CALL TO ACTION & FOOTER]
+------------------------------------------------------------------------------+
|  Tertarik Berkolaborasi atau Merekrut?                                       |
|  Mari diskusikan arsitektur sistem atau kebutuhan produk digital Anda.       |
|  [ Buka Halaman Kontak -> ]                                                  |
|                                                                              |
|  (c) 2026 Rizqi Noor Fauzan. Built with Next.js 15, React 19 & Lenis.        |
+------------------------------------------------------------------------------+
[MOBILE ONLY]: Bottom Floating Dock (Home | Projects | Contact | Theme)
```

```
================================================================================
PREVIEW 2: BLUEPRINT DETAIL STRUKTUR CARD PROJEK V2
================================================================================
+------------------------------------------------------------------------------+
| [ THUMBNAIL GAMBAR (Rasio 16:9) ]                       [ Fullstack SaaS ]   |
| (Hover effect: scale 1.03, subtle dark gradient overlay, border emerald)     |
+------------------------------------------------------------------------------+
| SMARTSEUM                                                      Year: 2024    |
| AI-Powered Smart Museum Experience Platform                                  |
| Role: Lead Fullstack Developer                                               |
+------------------------------------------------------------------------------+
| * PROBLEM:                                                                   |
|   Pengunjung museum kesulitan mendapatkan informasi kurasi mendalam secara   |
|   real-time dan interaktif saat berada di galeri fisik.                      |
|                                                                              |
| * SOLUTION & ARSITEKTUR:                                                     |
|   Platform web cerdas dengan integrasi Google Gemini AI, QR-code scanner,    |
|   sistem autentikasi Better-Auth, dan cache PostgreSQL Neon via Drizzle.     |
|                                                                              |
| * KEY HIGHLIGHTS:                                                            |
|   - Multi-tenant role: Admin, Kurator, Pengunjung                            |
|   - AI context retrieval response di bawah 400ms                             |
+------------------------------------------------------------------------------+
| TECH STACK:                                                                  |
| [Next.js] [React 19] [Drizzle ORM] [Neon Postgres] [Better-Auth] [Gemini AI] |
+------------------------------------------------------------------------------+
| [ Live Demo -> ]                   [ Source Code (GitHub) ]                  |
+------------------------------------------------------------------------------+
```

```
================================================================================
PREVIEW 3: HALAMAN KONTAK (/contact)
================================================================================
+------------------------------------------------------------------------------+
| <- Kembali ke Beranda                                                        |
|                                                                              |
| HUBUNGI SAYA                                                                 |
| Mari Diskusikan Ide, Proyek, atau Tawaran Karier Rekayasa Perangkat Lunak    |
| [ Status Badge: Terbuka untuk Peluang Kerja & Kolaborasi ]                  |
+------------------------------------------------------------------------------+
| KOLOM KIRI: Direct Channels         | KOLOM KANAN: Interactive Form          |
|                                     |                                        |
| [ Kartu Email ]                     | Nama Lengkap                           |
| janf.dev@gmail.com                  | [ Masukkan nama Anda...              ] |
| [ Salin Email ]  [ Kirim Email ]    |                                        |
|                                     | Alamat Email                           |
| [ Kartu Lokasi ]                    | [ email@domain.com                  ]  |
| Losari, Indonesia (Remote Ready)    |                                        |
|                                     | Topik / Subjek                         |
| [ Waktu Respons ]                   | [ Kolaborasi Proyek / Rekrutmen...  ]  |
| Rata-rata 1x24 jam                  |                                        |
|                                     | Pesan                                  |
| [ Jejaring Profesional ]            | [ Tuliskan kebutuhan atau detail...  ] |
| * GitHub   : github.com/janfdev     | [                                    ] |
| * LinkedIn : in/rizqinoorfauzan     |                                        |
|                                     | [ Kirim Pesan Sekarang -> ]            |
+------------------------------------------------------------------------------+
```

```
================================================================================
PREVIEW 4: HALAMAN DETAIL PROJEK BERBASIS SLUG (/projects/[slug])
================================================================================
+------------------------------------------------------------------------------+
| [ <- Kembali ke Showcase ]                       Tahun: 2024 | Status: Live  |
|                                                                              |
| SMARTSEUM: ARSITEKTUR PLATFORM MUSEUM CERDAS BERBASIS AI                     |
| Kategori: Fullstack Enterprise SaaS | Peran: System Architect & Fullstack    |
+------------------------------------------------------------------------------+
| [ HERO PREVIEW: Interactive UI Mockup / Video Demo ]                         |
+------------------------------------------------------------------------------+
| 1. LATAR BELAKANG & MASALAH BISNIS                                           |
|    - Rendahnya keterlibatan pengunjung terhadap koleksi sejarah museum.      |
|    - Ketiadaan katalog digital terintegrasi yang mudah diakses dari ponsel.  |
|                                                                              |
| 2. KEPUTUSAN ARSITEKTUR & DESAIN SISTEM                                      |
|    +-------------+      +-------------------+      +----------------------+  |
|    | Next.js 15  | ---> | Edge Route API    | ---> | Better-Auth + Drizzle|  |
|    | Frontend    |      | (Streaming)       |      | Neon PostgreSQL      |  |
|    +-------------+      +-------------------+      +----------------------+  |
|                                   |                                          |
|                                   v                                          |
|                         Google Gemini AI Engine                              |
|                                                                              |
| 3. TANTANGAN TEKNIS & SOLUSI                                                 |
|    - Optimasi latency query AI dengan pre-fetching context koleksi.          |
|    - Idempotency seeding data koleksi dan penanganan aset gambar via CDN.    |
|                                                                              |
| 4. HASIL & DAMPAK                                                            |
|    - Peningkatan waktu interaksi pengguna sebesar 65% dalam uji coba.        |
|    - Waktu muat halaman statis sub-second (< 0.8s) berkat SSG Next.js.       |
|                                                                              |
| 5. TAUTAN PRODUK                                                             |
|    [ Kunjungi Platform Live ]         [ Buka Repositori GitHub ]             |
+------------------------------------------------------------------------------+
```

```
================================================================================
PREVIEW 5: DASHBOARD PESAN MASUK (/dashboard/pesan)
================================================================================
+------------------------------------------------------------------------------+
| DASHBOARD PORTOFOLIO                       Status: Online | User: Local Host |
+------------------------------------------------------------------------------+
| KARTU RINGKASAN:                                                             |
| [ Total Kunjungan: 1.2K ] [ Pesan Masuk: 8 ] [ Proyek Aktif: 5 ]             |
+------------------------------------------------------------------------------+
| INBOX PESAN KONTAK                                                           |
| ---------------------------------------------------------------------------- |
| Dari: Sarah Tech Recruiter (sarah@company.com)               19 Okt 2026     |
| Subjek: Tawaran Fullstack Software Engineer                                  |
| Pesan: "Halo Rizqi, kami sangat tertarik dengan arsitektur proyek Smartseum  |
| yang Anda bangun. Apakah ada waktu untuk jadwal diskusi teknis minggu ini?"  |
| [ Balas via Email ]  [ Tandai Sudah Dibaca ]                                 |
| ---------------------------------------------------------------------------- |
| Dari: Budi Santoso (budi@startup.id)                         18 Okt 2026     |
| Subjek: Kolaborasi Sistem API CRM                                            |
| [ Balas via Email ]  [ Tandai Sudah Dibaca ]                                 |
+------------------------------------------------------------------------------+
```

