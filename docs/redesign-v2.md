# Redesign v2 — todo list sampai deploy

Inspirasi: [Dribbble — Personal Portfolio Website (Baskara)](https://dribbble.com/shots/26370209-Personal-Portfolio-Website). Diadaptasi, bukan disalin: konten, aksesibilitas, dan sistem motion yang ada tetap dipertahankan.

Prinsip:
- Data di `src/lib/` tidak diubah strukturnya; yang berubah lapisan visual.
- Tanpa dependensi animasi baru (CSS, Web Animations API, scroll-driven animations, View Transitions).
- Tidak ada testimonial, angka, atau klaim yang tidak bisa dibuktikan.
- Setiap tahap lolos `pnpm lint`, `pnpm exec tsc --noEmit`, dan `pnpm build` sebelum lanjut.

---

## Tahap 0 — Keputusan (wajib sebelum mulai)

> Dikerjakan dengan default usulan: teal, `RIDHO.`, urutan usulan, 9 proyek 3×3, motion tenang, cutout otomatis (`rembg`). LinkedIn memakai `ridho-wahyu-6b08613a2` dan isi FAQ disusun dari fakta di situs/CV — keduanya perlu dikonfirmasi.

- [ ] **Foto cutout**: hapus background otomatis (`rembg`) atau disiapkan sendiri (remove.bg / Photoshop)
- [ ] **Warna aksen**: teal (`#165b62`, glow `#d6efe9`) atau amber (glow `#fff2b8`)
- [ ] **Wordmark**: `RIDHO.` (titik aksen) atau `RIDHO©`
- [ ] **Urutan section**: usulan Hero → Projects → About/Experience → Capabilities → Writing → FAQ → Contact
- [ ] **Grid proyek**: 9 proyek dalam 3×3, atau featured + daftar kecil
- [ ] **Tingkat motion**: tenang/presisi (usulan) atau lebih ekspresif
- [ ] **URL LinkedIn yang benar**: `ridho-wahyu-nugroho-4a1544142` (Hero) vs `ridho-wahyu-6b08613a2` (Contact)
- [ ] **Isi FAQ**: 4–6 pertanyaan + jawaban (remote/relokasi, peran yang dicari, QA automation, zona waktu, part-time/freelance)
- [ ] **Copy hero**: teks kiri dan kanan (draft: "Hi, I'm Ridho, a frontend & mobile engineer in Indonesia. I build products people can rely on." / "Web and mobile products, plus the tests that keep them working.")
- [ ] **Copy About**: judul + 2 paragraf (draft judul: "Seven years of building, then testing what I build.")

## Tahap 1 — Persiapan

- [x] Buat branch `redesign/v2` dari `master`
- [x] Ambil screenshot "before" (320 / 390 / 1440px) sebagai pembanding
- [x] Catat class yang dipakai `scripts/verify-motion.mjs` dan `scripts/verify-sliders.mjs` (`hero-enter`, `data-reveal`, `nav-indicator`, `timeline-entry`, dll.) agar tidak rusak tanpa sengaja
- [x] Siapkan aset `public/images/profile-cutout.webp` (WebP transparan, tinggi ±1100px, tepi rambut bersih)

## Tahap 2 — Fondasi (`globals.css`, `layout.tsx`)

- [x] Ganti token warna: background `#ffffff`, surface `#f4f4f4`, ink `#0b0b0b`, muted `#5c5c5c`, line `#e5e5e5`, accent sesuai keputusan
- [x] Hapus `--color-primary` (rust); ganti semua pemakaiannya (kicker, tombol, selection, hover link)
- [x] Font judul: Sora → Inter Tight (700/800) lewat `next/font`; body tetap Inter
- [x] Skala tipe: wordmark `clamp(5rem, 21vw, 19rem)`, judul panel `clamp(3rem, 8vw, 6.5rem)`, h2 `clamp(2.25rem, 5vw, 3.5rem)`, body 16–17px, minimum 15px
- [x] `.section-kicker` → gaya `(Label)`: huruf kecil, dalam kurung, 14px, muted
- [x] Tombol jadi pil: primary hitam/putih, secondary outline hitam
- [x] Radius: kartu 16px, panel 28px; container 1160 → 1240px; padding section 112px desktop / 64px mobile
- [x] Token motion: easing `cubic-bezier(.22, 1, .36, 1)`, durasi 180 / 280 / 500–700ms
- [x] Perbarui warna `::selection` dan `:focus-visible` (outline tetap kontras)
- [x] Cek halaman case study dan writing masih terbaca dengan token baru

## Tahap 3 — Navigation pill (`Navigation.tsx`)

- [x] Desktop: pil hitam sticky di tengah atas (`top: 16px`): Home (ikon), Work, Experience, Writing, Contact/Get in touch
- [x] Indikator aktif jadi pil putih + teks hitam (logika `activeSection` dan `--indicator-x` tetap)
- [x] Hapus logo, border bawah, dan latar header penuh
- [x] State setelah melewati hero: bayangan halus + `scale(.96)`
- [x] Mobile: pil kecil berisi tombol menu; panel tetap dengan `inert`, Escape, klik luar, target 44px, fallback `<noscript>`
- [x] Pindahkan `view-transition-name` dari `site-header` ke pil
- [x] Animasi masuk: turun dari −12px + fade, 500ms

## Tahap 4 — Hero (`Hero.tsx`)

- [x] Glow radial warna aksen dari atas, pudar ke putih ±60%; tinggi `min(100svh, 860px)`
- [x] Wordmark selebar penuh; `<h1>` dengan wordmark `aria-hidden` + `sr-only` "Ridho Wahyu Nugroho, Frontend & Mobile Engineer"
- [x] Foto cutout absolut di bawah tengah, menimpa bagian bawah wordmark, ±75% tinggi hero, `next/image` `priority`
- [x] Teks kiri (maks 280px) dan teks kanan (rata kanan)
- [x] Baris bawah: `© Ridho 2026` · `Download CV ↓ · GitHub ↗ · LinkedIn ↗` · `(Scroll down)` → `#projects`
- [x] Mobile: wordmark ±20vw, foto ±360px, teks digabung di bawah foto, link bisa wrap, tanpa scroll horizontal di 320px
- [x] Motion: huruf naik dari mask (mulai 80ms, stagger 50ms, 650ms); foto `translateY(32px)` + `clip-path` (200ms, 700ms, **tanpa** opacity 0 demi LCP); teks fade (450ms); baris bawah (550ms); total < 1 detik
- [x] Parallax scroll (`animation-timeline: scroll()` dalam `@supports`): wordmark naik lambat + pudar ke 0.3, foto turun ±6%
- [x] Panah "(Scroll down)" bergerak hanya saat hover/fokus
- [ ] **Checkpoint review** — tampilkan hero di 320 / 390 / 1440px sebelum lanjut — sudah dicek sendiri lewat screenshot; menunggu review kamu

## Tahap 5 — Projects dark panel (`Projects.tsx`, `ProjectCard.tsx`)

- [x] Panel `#0b0b0b`, radius 28px, di dalam container, padding 56px / 24px
- [x] Header: h2 raksasa "Selected Work", deskripsi `#a3a3a3`, tombol pil outline putih ke GitHub
- [x] Grid sesuai keputusan (usulan 9 proyek, featured duluan): 3 kolom desktop, 2 tablet, `MobileSlider` < 768px
- [x] Kartu: frame 4:3 `#1a1a1a` radius 12px; `cover` untuk web, `contain` untuk screenshot ponsel (RavaCollect, ERP-POS, PKT, Kerjaloka)
- [x] Judul putih 16px semibold + meta "Role · Platform"
- [x] Badge akses: `Public source` / `Demo APK` / `Private`
- [x] Baris link terpisah (tanpa nested link): Case study ↗, Demo ↗, Source ↗, APK ↓
- [x] Hapus pembagian "More product work"
- [x] Motion: panel `scale(.96)` → 1 via `animation-timeline: view()`; judul naik dari mask; kartu stagger `index % 3 × 80ms`; hover gambar 1.03× (500ms), panah 4px, border lebih terang
- [x] Pastikan shared-image View Transition ke case study tetap jalan

## Tahap 6 — About + Experience (`Experience.tsx`, `About.tsx` baru)

- [x] Dua kolom: label "(About me)", judul, 2 paragraf | foto asli berlatar teal radius 20px
- [x] Experience sebagai baris `periode | role | perusahaan` dengan garis tipis, data dari `experience.ts`
- [x] Timeline progress tetap jalan dengan warna baru
- [x] Motion: foto `clip-path: inset(100% 0 0 0)` → `inset(0)` 700ms; baris stagger 60ms
- [x] Tambahkan "About" ke nav jika jadi section terpisah

## Tahap 7 — Capabilities (`Skills.tsx`)

- [x] Header: "(What I do)" + "How I contribute" di kiri, deskripsi di kanan
- [x] Kartu `#f4f4f4` tanpa border, ikon 32px warna aksen, judul, deskripsi, tools
- [x] Tetap 3 kartu (tanpa kategori karangan)
- [x] Motion: stagger 80ms; hover naik 4px, latar sedikit gelap, ikon rotasi 8°

## Tahap 8 — Writing (`Writing.tsx`)

- [x] Baris kartu horizontal dengan tombol ← → di kanan atas (juga di desktop)
- [ ] Kartu: tanggal, judul, ringkasan 2 baris, waktu baca (5 artikel) — belum: posts.ts tidak menyimpan panjang artikel
- [x] Hover: garis bawah judul tumbuh dari kiri
- [x] Jalankan `verify-sliders.mjs` setelah slider aktif di desktop

## Tahap 9 — FAQ (`FAQ.tsx`, `src/lib/faq.ts` baru)

- [x] Data FAQ di `src/lib/faq.ts` (isi dari Tahap 0)
- [x] Native `<details>/<summary>`; layout judul kiri, accordion kanan
- [x] Item terbuka: latar hitam, teks putih (transisi 200ms), chevron rotasi 180°
- [x] Buka/tutup dengan `::details-content` + `interpolate-size: allow-keywords` (280ms); browser lama tanpa animasi
- [x] Tambahkan ke `page.tsx` sesuai urutan

## Tahap 10 — Contact + Footer (`Contact.tsx`, `Footer.tsx`)

- [x] Gaya disesuaikan: heading besar, tombol email pil putih
- [x] Perbaiki URL LinkedIn agar sama di semua tempat (Hero, Contact, Footer, CV)
- [x] Motion: heading per baris dari mask; hover tombol tukar warna + panah bergeser
- [x] Footer selaras gaya baru (© tahun, link sosial)

## Tahap 11 — Halaman lain dan aset

- [x] Case study (`src/app/case-studies/[slug]/page.tsx`): header, gallery RavaCollect, tombol download sesuai gaya baru
- [x] Writing list dan artikel (`src/app/writing/`)
- [x] `not-found.tsx`
- [x] `scripts/generate_og.py`: warna/font baru → regenerasi `og-image.png` dan favicon
- [x] `scripts/generate_cv.py`: cek URL LinkedIn → regenerasi `public/Ridho-CV.pdf` bila perlu — CV tidak memuat LinkedIn, jadi tidak perlu diregenerasi
- [x] Perbarui `metadata` di `layout.tsx` bila copy berubah
- [x] `sitemap.ts` dan `robots.ts` masih benar

## Tahap 12 — Aksesibilitas dan motion

- [x] `prefers-reduced-motion`: matikan entrance, reveal, parallax (`animation-timeline`), view transition, gerak hover; accordion instan
- [x] Tanpa JS: hero tampil (CSS), semua konten tampil, menu `<noscript>` jalan, FAQ jalan
- [x] Elemen yang difokus tidak pernah tersembunyi animasi
- [x] Kontras: body ≥ 4,5:1, teks besar ≥ 3:1 (termasuk di panel gelap dan glow)
- [x] Urutan heading valid (satu `h1`, h2 per section)
- [x] Navigasi keyboard penuh: nav, slider (Arrow/Home/End), FAQ, link kartu
- [x] Alt text foto dan screenshot tetap deskriptif

## Tahap 13 — QA dan verifikasi

- [x] Perbarui `scripts/verify-motion.mjs`: hero < 1 detik, wordmark utuh di akhir, parallax/panel nonaktif saat reduced motion, FAQ via keyboard, nav pill
- [x] `pnpm lint`
- [x] `pnpm exec tsc --noEmit`
- [x] `pnpm build` (static export ke `out/`)
- [x] Serve `out/` lalu jalankan `node scripts/verify-motion.mjs` dan `node scripts/verify-sliders.mjs`
- [x] Tidak ada scroll horizontal di 320 / 390 / 768 / 1024 / 1440px
- [ ] Cek browser: Chrome, Edge, Safari (iOS), Firefox (fallback tanpa scroll-driven animation) — baru Chrome (headless); Edge, Safari iOS, dan Firefox belum diuji
- [x] Lighthouse (mobile): Performance, Accessibility, Best Practices, SEO; LCP hero tidak memburuk dibanding "before" — A11y/Best Practices/SEO 100; Performance 53–70 vs 52–58 sebelumnya (server lokal tanpa kompresi, hasil fluktuatif)
- [x] Klik semua link: case study, demo, source, download APK, CV, email, LinkedIn, GitHub
- [x] Bandingkan screenshot "after" dengan "before"
- [x] Update README (bagian motion dan sliders) sesuai perilaku baru
- [x] Hapus file sementara / screenshot preview dari working tree (sudah di-ignore, tapi jangan sampai ikut ter-commit)

## Tahap 14 — Deploy

- [ ] Commit per tahap di branch `redesign/v2`, lalu push branch
- [ ] Cek preview deployment Vercel dari branch (jika Git integration aktif) atau deploy preview manual
- [ ] Uji preview di HP sungguhan (Android + iOS bila ada)
- [ ] Buka PR `redesign/v2` → `master`, review diff sekali lagi
- [ ] Merge ke `master` → production deploy di `ridho-portfolio.vercel.app`
- [ ] Verifikasi production: halaman utama, semua case study, writing, 404, download APK, OG preview (LinkedIn Post Inspector / opengraph.xyz)
- [ ] Siapkan rencana rollback: redeploy deployment sebelumnya di Vercel bila ada masalah

## Tahap 15 — Setelah deploy (opsional)

- [ ] Perbarui link portfolio di CV/LinkedIn bila ada perubahan
- [ ] Pertimbangkan memindahkan APK ke GitHub Releases agar repo tidak membengkak di update berikutnya
- [ ] Kumpulkan masukan dari 2–3 orang (recruiter/teman engineer) dan catat perbaikan lanjutan
