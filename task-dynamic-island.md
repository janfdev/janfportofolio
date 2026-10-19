# Task Specification & Design: Mobile Dynamic Island Music Player

## 1. Executive Summary & Intent
Mengubah interaksi pemutar musik (`FloatingMusicPlayer`) pada tampilan **mobile (`< md`)** dari tombol mengambang di pojok kanan bawah menjadi **Dynamic Island** interaktif di bagian atas layar (*top center*). Dynamic Island ini mengadopsi estetika pill iOS dengan liquid-glass dark emerald, beranimasi halus menggunakan `motion` (Framer Motion), dan memiliki mode interaksi adaptif:
- **Compact State (Pill)**: Menempel di atas layar, menampilkan piringan hitam mini/audio visualizer wave yang berdenyut saat musik menyala, judul lagu aktif, dan tombol play/pause cepat.
- **Expanded State (Modal/Card)**: Muncul saat di-*hover* (cursor) atau di-*tap* (touch screen), membesar secara elastis (*spring layout morphing*) menampilkan kontrol audio lengkap (`NowPlaying` / liquid glass card).
- **Desktop Separation**: Pada viewport desktop (`md:` ke atas), kontrol tetap berada di posisi pojok kanan bawah atau terintegrasi rapi tanpa bentrok dengan layout utama.

---

## 2. Problem Statement & Root Cause
1. **Bentrok Komponen Mobile**:
   - Di mobile, `Navbar` (dock bawah) berada pada `fixed inset-x-0 bottom-5 z-50`.
   - `FloatingMusicPlayer` sebelumnya berada di `fixed bottom-6 right-6 z-50`.
   - Hal ini menyebabkan overlap spasial dan membebani area jempol bawah (*thumb zone clutter*).
2. **Keterbatasan UX Mobile**:
   - Popover music card lama berukuran `320px - 350px` yang muncul dari sudut kanan bawah sering terpotong atau menutupi menu navigasi.
   - Dynamic Island di posisi atas (`top-3` / `top-4`) memanfaatkan area status bar layar yang bersih dan memberikan kesan premium (*high-tech dynamic UI*).

---

## 3. Design Architecture & Visual States

### A. Compact State (Collapsed Pill)
- **Dimensi**: Height `38px`, Width `~180px - 220px` (auto-fit konten).
- **Styling**: `bg-zinc-950/90 dark:bg-zinc-950/90 backdrop-blur-xl border border-white/10 text-white rounded-full px-3 py-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.4)]`.
- **Elemen Visual**:
  - **Kiri**: Mini vinyl disc berputar (atau 3-bar emerald frequency equalizer animasi CSS) ketika audio `isPlaying`.
  - **Tengah**: Scrolling / marquee single-line track title (`text-xs font-medium text-zinc-200 truncate`).
  - **Kanan**: Mini indicator status atau Play/Pause icon mini (`size-3.5 text-emerald-400`).

### B. Expanded State (Expanded Island)
- **Dimensi**: Width `min(92vw, 360px)`, Height `auto`, Border radius `28px` (`rounded-3xl`).
- **Styling**: `bg-zinc-950/95 backdrop-blur-2xl border border-emerald-500/20 shadow-2xl p-4`.
- **Elemen Visual**:
  - Header: Album art thumbnail mini + Nama Lagu + Artis + Tombol Minimize/Close.
  - Body: Progress bar / timeline YouTube stream.
  - Controls: Previous, Play/Pause (emerald accent), Next, dan selector 3 lagu statis (`In Another Life`, `Negoro Angin`, `Separuh Aku`).

### C. Motion & Transition Specs
- Menggunakan library `motion` (`motion/react` v12) yang sudah terinstall di `package.json`.
- Layout morphing menggunakan `layoutId="dynamic-island"` dengan spring curve:
  ```ts
  transition={{
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 0.8
  }}
  ```
- **Interaksi Dual-Trigger**:
  - **Hover (Desktop / Mouse)**: `onMouseEnter` membuka expanded island, `onMouseLeave` melipat kembali ke pill (dengan delay 300ms debounce agar tidak langsung hilang saat kursor bergerak).
  - **Tap / Click (Mobile Touch)**: Klik pada pill memicu `isExpanded = !isExpanded`, dengan listener klik luar (`useOnClickOutside`) untuk auto-collapse.

---

## 4. Technical Implementation Plan

### Step 1: Ekstraksi Sub-Komponen Dynamic Island
- Buat komponen `components/music/dynamic-island-player.tsx` yang membungkus:
  - State: `isExpanded`, `isHovered`, `isPlaying`, `currentTrackIndex`.
  - Animasi Framer Motion: container `motion.div` dengan spring transition.
  - Mini Equalizer SVG: 3 baris bar bouncing (`animate-pulse` / CSS keyframe scaleY).

### Step 2: Integrasi Responsif pada `FloatingMusicPlayer`
- Refactor `components/floating-music-player.tsx`:
  - **Mobile (`block md:hidden`)**: Render `DynamicIslandPlayer` yang menempel di `fixed top-3 left-1/2 -translate-x-1/2 z-50`.
  - **Desktop (`hidden md:flex`)**: Tetap gunakan floating button vinyl di `fixed bottom-6 right-6 z-50` agar layout desktop tetap stabil dan konsisten.
  - Shared state engine: Keduanya menggunakan satu instance YouTube Player API headless yang sama (tidak ada duplikasi iframe/audio stream).

### Step 3: Polish & Anti-Slop Delivery Gate
- Tidak ada button mati, tidak ada teks overflow/clipping di layar iPhone SE (`375px`).
- Dark mode & light mode contrast compliance (island selalu dark high-contrast pill seperti Apple Dynamic Island asli).
- Safe area inset handling (`top-[max(0.75rem,env(safe-area-inset-top))]`).

---

## 5. Verification Checklist & Testing
- [ ] Build test: `npm run build` sukses tanpa hydration mismatch dan tanpa TypeScript error.
- [ ] Mobile responsive test: Simulasi viewport 375px, 390px, 412px, 768px.
- [ ] Hover & Tap test:
  - Hover masuk -> island membesar secara halus.
  - Hover keluar -> island menyusut kembali menjadi pill.
  - Tap di mobile -> toggle buka dan tutup dengan mulus.
- [ ] Playback test: Lagu tetap berputar tanpa henti saat transisi expand/collapse.
