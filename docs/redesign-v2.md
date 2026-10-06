# Redesign v2 — todo list sampai deploy

Inspirasi: [Dribbble — Personal Portfolio Website (Baskara)](https://dribbble.com/shots/26370209-Personal-Portfolio-Website). Diadaptasi, bukan disalin: konten, aksesibilitas, dan sistem motion yang ada tetap dipertahankan.

Prinsip:
- Data di `src/lib/` tidak diubah strukturnya; yang berubah lapisan visual.
- Tanpa dependensi animasi baru (CSS, Web Animations API, scroll-driven animations, View Transitions).
- Tidak ada testimonial, angka, atau klaim yang tidak bisa dibuktikan.
- Setiap tahap lolos `pnpm lint`, `pnpm exec tsc --noEmit`, dan `pnpm build` sebelum lanjut.

---

## Tahap 0 — Keputusan (wajib sebelum mulai)

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

- [ ] Buat branch `redesign/v2` dari `master`
- [ ] Ambil screenshot "before" (320 / 390 / 1440px) sebagai pembanding
- [ ] Catat class yang dipakai `scripts/verify-motion.mjs` dan `scripts/verify-sliders.mjs` (`hero-enter`, `data-reveal`, `nav-indicator`, `timeline-entry`, dll.) agar tidak rusak tanpa sengaja
- [ ] Siapkan aset `public/images/profile-cutout.webp` (WebP transparan, tinggi ±1100px, tepi rambut bersih)

## Tahap 2 — Fondasi (`globals.css`, `layout.tsx`)

- [ ] Ganti token warna: background `#ffffff`, surface `#f4f4f4`, ink `#0b0b0b`, muted `#5c5c5c`, line `#e5e5e5`, accent sesuai keputusan
- [ ] Hapus `--color-primary` (rust); ganti semua pemakaiannya (kicker, tombol, selection, hover link)
- [ ] Font judul: Sora → Inter Tight (700/800) lewat `next/font`; body tetap Inter
- [ ] Skala tipe: wordmark `clamp(5rem, 21vw, 19rem)`, judul panel `clamp(3rem, 8vw, 6.5rem)`, h2 `clamp(2.25rem, 5vw, 3.5rem)`, body 16–17px, minimum 15px
- [ ] `.section-kicker` → gaya `(Label)`: huruf kecil, dalam kurung, 14px, muted
- [ ] Tombol jadi pil: primary hitam/putih, secondary outline hitam
- [ ] Radius: kartu 16px, panel 28px; container 1160 → 1240px; padding section 112px desktop / 64px mobile
- [ ] Token motion: easing `cubic-bezier(.22, 1, .36, 1)`, durasi 180 / 280 / 500–700ms
- [ ] Perbarui warna `::selection` dan `:focus-visible` (outline tetap kontras)
- [ ] Cek halaman case study dan writing masih terbaca dengan token baru

## Tahap 3 — Navigation pill (`Navigation.tsx`)

- [ ] Desktop: pil hitam sticky di tengah atas (`top: 16px`): Home (ikon), Work, Experience, Writing, Contact/Get in touch
- [ ] Indikator aktif jadi pil putih + teks hitam (logika `activeSection` dan `--indicator-x` tetap)
- [ ] Hapus logo, border bawah, dan latar header penuh
- [ ] State setelah melewati hero: bayangan halus + `scale(.96)`
- [ ] Mobile: pil kecil berisi tombol menu; panel tetap dengan `inert`, Escape, klik luar, target 44px, fallback `<noscript>`
- [ ] Pindahkan `view-transition-name` dari `site-header` ke pil
- [ ] Animasi masuk: turun dari −12px + fade, 500ms

## Tahap 4 — Hero (`Hero.tsx`)

- [ ] Glow radial warna aksen dari atas, pudar ke putih ±60%; tinggi `min(100svh, 860px)`
- [ ] Wordmark selebar penuh; `<h1>` dengan wordmark `aria-hidden` + `sr-only` "Ridho Wahyu Nugroho, Frontend & Mobile Engineer"
- [ ] Foto cutout absolut di bawah tengah, menimpa bagian bawah wordmark, ±75% tinggi hero, `next/image` `priority`
- [ ] Teks kiri (maks 280px) dan teks kanan (rata kanan)
- [ ] Baris bawah: `© Ridho 2026` · `Download CV ↓ · GitHub ↗ · LinkedIn ↗` · `(Scroll down)` → `#projects`
- [ ] Mobile: wordmark ±20vw, foto ±360px, teks digabung di bawah foto, link bisa wrap, tanpa scroll horizontal di 320px
- [ ] Motion: huruf naik dari mask (mulai 80ms, stagger 50ms, 650ms); foto `translateY(32px)` + `clip-path` (200ms, 700ms, **tanpa** opacity 0 demi LCP); teks fade (450ms); baris bawah (550ms); total < 1 detik
- [ ] Parallax scroll (`animation-timeline: scroll()` dalam `@supports`): wordmark naik lambat + pudar ke 0.3, foto turun ±6%
- [ ] Panah "(Scroll down)" bergerak hanya saat hover/fokus
- [ ] **Checkpoint review** — tampilkan hero di 320 / 390 / 1440px sebelum lanjut

## Tahap 5 — Projects dark panel (`Projects.tsx`, `ProjectCard.tsx`)

- [ ] Panel `#0b0b0b`, radius 28px, di dalam container, padding 56px / 24px
- [ ] Header: h2 raksasa "Selected Work", deskripsi `#a3a3a3`, tombol pil outline putih ke GitHub
- [ ] Grid sesuai keputusan (usulan 9 proyek, featured duluan): 3 kolom desktop, 2 tablet, `MobileSlider` < 768px
- [ ] Kartu: frame 4:3 `#1a1a1a` radius 12px; `cover` untuk web, `contain` untuk screenshot ponsel (RavaCollect, ERP-POS, PKT, Kerjaloka)
- [ ] Judul putih 16px semibold + meta "Role · Platform"
- [ ] Badge akses: `Public source` / `Demo APK` / `Private`
- [ ] Baris link terpisah (tanpa nested link): Case study ↗, Demo ↗, Source ↗, APK ↓
- [ ] Hapus pembagian "More product work"
- [ ] Motion: panel `scale(.96)` → 1 via `animation-timeline: view()`; judul naik dari mask; kartu stagger `index % 3 × 80ms`; hover gambar 1.03× (500ms), panah 4px, border lebih terang
- [ ] Pastikan shared-image View Transition ke case study tetap jalan

## Tahap 6 — About + Experience (`Experience.tsx`, `About.tsx` baru)

- [ ] Dua kolom: label "(About me)", judul, 2 paragraf | foto asli berlatar teal radius 20px
- [ ] Experience sebagai baris `periode | role | perusahaan` dengan garis tipis, data dari `experience.ts`
- [ ] Timeline progress tetap jalan dengan warna baru
- [ ] Motion: foto `clip-path: inset(100% 0 0 0)` → `inset(0)` 700ms; baris stagger 60ms
- [ ] Tambahkan "About" ke nav jika jadi section terpisah

## Tahap 7 — Capabilities (`Skills.tsx`)

- [ ] Header: "(What I do)" + "How I contribute" di kiri, deskripsi di kanan
- [ ] Kartu `#f4f4f4` tanpa border, ikon 32px warna aksen, judul, deskripsi, tools
- [ ] Tetap 3 kartu (tanpa kategori karangan)
- [ ] Motion: stagger 80ms; hover naik 4px, latar sedikit gelap, ikon rotasi 8°

## Tahap 8 — Writing (`Writing.tsx`)

- [ ] Baris kartu horizontal dengan tombol ← → di kanan atas (juga di desktop)
- [ ] Kartu: tanggal, judul, ringkasan 2 baris, waktu baca (6 artikel)
- [ ] Hover: garis bawah judul tumbuh dari kiri
- [ ] Jalankan `verify-sliders.mjs` setelah slider aktif di desktop

## Tahap 9 — FAQ (`FAQ.tsx`, `src/lib/faq.ts` baru)

- [ ] Data FAQ di `src/lib/faq.ts` (isi dari Tahap 0)
- [ ] Native `<details>/<summary>`; layout judul kiri, accordion kanan
- [ ] Item terbuka: latar hitam, teks putih (transisi 200ms), chevron rotasi 180°
- [ ] Buka/tutup dengan `::details-content` + `interpolate-size: allow-keywords` (280ms); browser lama tanpa animasi
- [ ] Tambahkan ke `page.tsx` sesuai urutan

## Tahap 10 — Contact + Footer (`Contact.tsx`, `Footer.tsx`)

- [ ] Gaya disesuaikan: heading besar, tombol email pil putih
- [ ] Perbaiki URL LinkedIn agar sama di semua tempat (Hero, Contact, Footer, CV)
- [ ] Motion: heading per baris dari mask; hover tombol tukar warna + panah bergeser
- [ ] Footer selaras gaya baru (© tahun, link sosial)

## Tahap 11 — Halaman lain dan aset

- [ ] Case study (`src/app/case-studies/[slug]/page.tsx`): header, gallery RavaCollect, tombol download sesuai gaya baru
- [ ] Writing list dan artikel (`src/app/writing/`)
- [ ] `not-found.tsx`
- [ ] `scripts/generate_og.py`: warna/font baru → regenerasi `og-image.png` dan favicon
- [ ] `scripts/generate_cv.py`: cek URL LinkedIn → regenerasi `public/Ridho-CV.pdf` bila perlu
- [ ] Perbarui `metadata` di `layout.tsx` bila copy berubah
- [ ] `sitemap.ts` dan `robots.ts` masih benar

## Tahap 12 — Aksesibilitas dan motion

- [ ] `prefers-reduced-motion`: matikan entrance, reveal, parallax (`animation-timeline`), view transition, gerak hover; accordion instan
- [ ] Tanpa JS: hero tampil (CSS), semua konten tampil, menu `<noscript>` jalan, FAQ jalan
- [ ] Elemen yang difokus tidak pernah tersembunyi animasi
- [ ] Kontras: body ≥ 4,5:1, teks besar ≥ 3:1 (termasuk di panel gelap dan glow)
- [ ] Urutan heading valid (satu `h1`, h2 per section)
- [ ] Navigasi keyboard penuh: nav, slider (Arrow/Home/End), FAQ, link kartu
- [ ] Alt text foto dan screenshot tetap deskriptif

## Tahap 13 — QA dan verifikasi

- [ ] Perbarui `scripts/verify-motion.mjs`: hero < 1 detik, wordmark utuh di akhir, parallax/panel nonaktif saat reduced motion, FAQ via keyboard, nav pill
- [ ] `pnpm lint`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm build` (static export ke `out/`)
- [ ] Serve `out/` lalu jalankan `node scripts/verify-motion.mjs` dan `node scripts/verify-sliders.mjs`
- [ ] Tidak ada scroll horizontal di 320 / 390 / 768 / 1024 / 1440px
- [ ] Cek browser: Chrome, Edge, Safari (iOS), Firefox (fallback tanpa scroll-driven animation)
- [ ] Lighthouse (mobile): Performance, Accessibility, Best Practices, SEO; LCP hero tidak memburuk dibanding "before"
- [ ] Klik semua link: case study, demo, source, download APK, CV, email, LinkedIn, GitHub
- [ ] Bandingkan screenshot "after" dengan "before"
- [ ] Update README (bagian motion dan sliders) sesuai perilaku baru
- [ ] Hapus file sementara / screenshot preview dari working tree (sudah di-ignore, tapi jangan sampai ikut ter-commit)

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
