# Generator RPM - Rencana Pembelajaran Mendalam (Kurikulum Merdeka)

Aplikasi web full-stack untuk guru dan pendidik di Indonesia guna menghasilkan dokumen **Modul Ajar / Rencana Pembelajaran Mendalam (RPM)** Kurikulum Merdeka secara otomatis berbasis AI (Google Gemini 3.8 Flash). Dokumen yang dihasilkan terstruktur dalam format tabel 5 bagian baku lengkap dengan pilar *Mindful, Meaningful, dan Joyful Learning*, siap cetak PDF rapi, dan mudah disalin ke Google Docs.

## User Review & Critical Decisions

> [!IMPORTANT]
> Ringkasan keputusan produk berdasarkan preferensi yang telah dikonfirmasi pada tahap klarifikasi:

- **Pilar Pembelajaran Mendalam**: Terintegrasi secara eksplisit dengan 3 pilar standar: **Mindful Learning** (kesadaran penuh & fokus peserta didik), **Meaningful Learning** (keterkaitan bermakna dengan kehidupan nyata), dan **Joyful Learning** (pengalaman belajar yang menyenangkan & menantang).
- **Asistensi CP & TP dengan AI**: Disediakan tombol cerdas bagi guru untuk otomatis merekomendasikan draf **Capaian Pembelajaran (CP)** dan **Tujuan Pembelajaran (TP)** sesuai kombinasi Jenjang (SD, SMP, SMA, SMK), Kelas, dan Mata Pelajaran yang dipilih, disamping fleksibilitas untuk mengetik/mengedit mandiri.
- **Multi-Format Output & Ekspor**:
  1. Pratinjau tabel interaktif (Live Preview) dengan tata letak dokumen resmi Kurikulum Merdeka.
  2. Tombol **Cetak / PDF** dengan CSS print media query yang diformat presisi untuk kertas standar (A4/Folio) lengkap dengan kop dan tanda tangan kepala sekolah/guru.
  3. Tombol **Salin & Buka di Google Dokumen** yang menyalin dokumen dalam format HTML table ke clipboard dan langsung membuka `docs.new` di tab baru.
- **Preset Data Contoh (One-Click Demo)**: Disediakan tombol *"Contoh Data"* (seperti pada screenshot) untuk menguji langsung dengan studi kasus nyata (misal: IPA Kelas 7 / Fotosintesis atau Matematika Kelas 8).

---

## 1. Overview & Core Concept

- **Apa Fungsinya**: Platform pembuatan modul pembelajaran mendalam terstruktur yang menghemat waktu administrasi guru dari berjam-jam menjadi beberapa detik, dengan mutu pedagogis tinggi sesuai standar Kurikulum Merdeka terbaru.
- **Target Pengguna**: Guru SD, SMP, SMA, SMK, Kepala Sekolah, dan Mahasiswa PPG / FKIP di Indonesia.
- **Format 5 Bagian Utama Terstruktur (RPM Table)**:
  1. **Bagian I: Identitas & Informasi Umum** (Satuan Pendidikan, Nama Guru, NIP, Kepala Sekolah, Fase/Kelas, Alokasi Waktu, Moda Pembelajaran).
  2. **Bagian II: Desain Pembelajaran Mendalam** (Pilar Mindful, Meaningful, Joyful Learning, Pertanyaan Pemantik, Profil Pelajar Pancasila, Pemahaman Bermakna).
  3. **Bagian III: Langkah-Langkah Pembelajaran** (Sintaks operasional: Tahap Pendahuluan, Kegiatan Inti [Memahami, Mengalami, Mengaplikasikan / Refleksi], dan Tahap Penutup).
  4. **Bagian IV: Asesmen & Evaluasi** (Asesmen Diagnostik / Awal, Formatif Berkelanjutan, dan Sumatif Akhir beserta instrumennya).
  5. **Bagian V: Lampiran & Lembar Kerja Siswa (LKPD)** (Bahan bacaan guru/siswa, LKPD terstruktur, Rubrik Penilaian analitik, dan Glosarium).

---

## 2. User Experience & Visual Design

Mengacu pada tata letak antarmuka yang dilampirkan oleh pengguna (*Two-Zone Balanced Workspace*):

### Tata Letak Antarmuka (Two-Zone Split Layout)
- **Top Navigation Bar**:
  - Logo lingkaran khas instansi pendidikan + Brand Title: **Generator RPM** dengan badge *Kurikulum Merdeka*.
  - Subtitle: *Rencana Pembelajaran Mendalam (Deep Learning) 5 Bagian Terstruktur*.
  - Zona aksi kanan: Tombol `✨ Contoh Data` (auto-fill demo data) dan `🔄 Reset`.
- **Kolom Kiri (Formulir Input Data RPM - 38% width di Desktop)**:
  - Kartu formulir berundak dengan nomor seksi editorial yang rapi:
    - **1. INFORMASI SATUAN & PENGAJAR**: Nama Satuan Pendidikan, Nama Guru, NIP Guru, Nama Kepala Sekolah, NIP Kepala Sekolah.
    - **2. KELAS & MATA PELAJARAN**: Jenjang (SD, SMP, SMA, SMK), Kelas, Semester (Ganjil/Genap), Mata Pelajaran (Mapel), dan Alokasi Waktu.
    - **3. CP, TP, & MATERI**: Capaian Pembelajaran (CP), Tujuan Pembelajaran (TP), Topik/Materi Pokok, disertai tombol aksi AI: *"✨ Rekomendasikan CP & TP"*.
    - **4. PREFERENSI METODE**: Pendekatan (PBL, PjBL, Inquiry, Diferensiasi) & Karakteristik Kelas (Opsional).
  - Tombol Utama Sticky di bawah formulir: **"⚡ Generate Rencana Pembelajaran Mendalam"** dengan animasi loading interaktif.
- **Kolom Kanan (Pratinjau Dokumen RPM - 62% width di Desktop)**:
  - Header Toolbar: Title *"Pratinjau Dokumen RPM (Tampilan Tabel Rapi 5 Bagian Utama)"* + Tombol Aksi:
    - `📋 Salin & Buka di Google Dokumen` (dengan toast notifikasi tersalin sukses).
    - `🖨️ CETAK / PDF` (membuka print dialog browser dengan format print stylesheet khusus).
  - **Zero State**: Ilustrasi ikon dokumen pensil, teks panduan informatif (*"Belum Ada Dokumen Ditampilkan"*).
  - **Generated State**: Dokumen formal dengan styling lembar kerja dinas:
    - Kop tabel identitas rapi bersudut halus.
    - Tabel 5 bagian dengan header biru/navy formal, border rapi, font teks berjarak nyaman dibaca.
    - Blok tanda tangan resmi Kepala Sekolah dan Guru Pengampu di bagian paling bawah.

### Tipografi & Palet Warna
- **Font Utama**: `Plus Jakarta Sans` untuk judul dan teks tubuh yang modern dan sangat terbaca.
- **Palet Warna**:
  - Dominan Kanvas: Cool slate off-white (`#F8FAFC`).
  - Kartu & Kontainer: Pure white (`#FFFFFF`) dengan border halus (`#E2E8F0`).
  - Aksen Primer: Royal Navy / Indigo (`#1E40AF` & `#2563EB`) melambangkan profesionalitas pendidikan.
  - Aksen Sukses (Salin/Google Docs): Emerald Green (`#059669`).
  - Aksen Badge Deep Learning: Cerulean / Sky Blue.

---

## 3. Key Product Decisions & Trade-Offs

- **Model AI**: Menggunakan `gemini-3.8-flash` via `@google/genai` di server-side Express (`server.ts`). Model ini menawarkan kecepatan generasi sub-detik untuk teks panjang berstruktur, pemahaman Bahasa Indonesia kurikulum pendidikan yang sangat baik, dan bebas risiko timeout.
- **Format Respons Terstruktur (JSON Schema)**: Memanfaatkan `responseSchema` dari `@google/genai` agar model menghasilkan struktur data pasti (5 bagian RPM) tanpa risiko markdown acak atau kolom tabel terpotong.
- **Export Google Docs Tanpa Kerumitan OAuth**: Menggunakan API Clipboard ClipboardItem `text/html` + `text/plain` yang memformat tabel secara native. Ketika pengguna mengklik *"Salin & Buka di Google Dokumen"*, dokumen berformat tabel lengkap langsung tersalin ke clipboard dan halaman baru `https://docs.new` terbuka otomatis. Guru cukup menekan `Ctrl+V` (atau `Cmd+V`) di Google Docs dan seluruh format tabel terisi sempurna!
- **Print to PDF Native**: Disediakan CSS `@media print` yang menyembunyikan header navigasi dan formulir kiri, mengatur ukuran halaman ke standar A4 (margin 15mm), mencegah pemutusan tabel janggal (`page-break-inside: avoid`), sehingga hasil "Simpan sebagai PDF" terlihat seperti dokumen Word / PDF resmi dari dinas pendidikan.

---

## 4. Technical Architecture & Data Strategy

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            FRONTEND (React + Vite)                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  TopNav (Header + Demo Data + Reset)                                        │
│  ┌───────────────────────────────┐  ┌────────────────────────────────────┐  │
│  │ Left: InputForm               │  │ Right: DocumentPreview             │  │
│  │ - Info Satuan & Pengajar      │  │ - Top Action Bar (Copy Docs, Print)│  │
│  │ - Kelas & Mata Pelajaran      │  │ - Zero State / Loading State       │  │
│  │ - CP, TP & AI Assist Trigger  │  │ - 5-Part Structured RPM Table View │  │
│  │ - Generate Button             │  │ - Signature Section & Print Layout │  │
│  └──────────────┬────────────────┘  └──────────────────▲─────────────────┘  │
│                 │                                      │                    │
│                 │ POST /api/generate-rpm               │ State Update       │
│                 ▼                                      │                    │
├────────────────────────────────────────────────────────┼────────────────────┤
│                       BACKEND (server.ts / Express)    │                    │
├────────────────────────────────────────────────────────┼────────────────────┤
│  - POST /api/suggest-cp-tp: Memberikan rekomendasi     │                    │
│    CP & TP berdasar jenjang, kelas, dan mapel          │                    │
│  - POST /api/generate-rpm: Menghasilkan dokumen lengkap│                    │
│    dengan model 'gemini-3.8-flash' berformat JSON      │                    │
│  - Vite Middleware untuk HMR & asset dev server        │                    │
└────────────────────────────────────────────────────────┴────────────────────┘
```

### Data Schema (Struktur 5 Bagian RPM)

```typescript
export interface RPMData {
  bagian1_identitas: {
    namaSekolah: string;
    namaGuru: string;
    nipGuru: string;
    namaKepalaSekolah: string;
    nipKepalaSekolah: string;
    jenjang: string;
    kelas: string;
    fase: string;
    semester: string;
    mataPelajaran: string;
    alokasiWaktu: string;
    modaPembelajaran: string;
  };
  bagian2_desainDeepLearning: {
    pilarMindful: string[];     // Fokus, kesadaran, mindfulness pembuka
    pilarMeaningful: string[];  // Makna nyata, pemahaman bermakna, kontekstual
    pilarJoyful: string[];      // Aktivitas interaktif, apresiatif, menyenangkan
    pertanyaanPemantik: string[];
    profilPelajarPancasila: string[];
    saranaPrasarana: string[];
  };
  bagian3_langkahPembelajaran: {
    pendahuluan: { waktu: string; kegiatan: string[] };
    kegiatanInti: {
      tahapMemahami: { waktu: string; kegiatan: string[] };
      tahapMengalami: { waktu: string; kegiatan: string[] };
      tahapMengaplikasikan: { waktu: string; kegiatan: string[] };
    };
    penutup: { waktu: string; kegiatan: string[] };
  };
  bagian4_asesmen: {
    asesmenDiagnostik: string;
    asesmenFormatif: string;
    asesmenSumatif: string;
    instrumenPenilaian: string[];
  };
  bagian5_lampiran: {
    materiSingkat: string;
    lkpdRingkasan: string[];
    rubrikPenilaian: Array<{ kriteria: string; berkembang: string; mahir: string }>;
    glosarium: Array<{ istilah: string; arti: string }>;
  };
}
```

---

## 5. Tahapan Eksekusi Setelah Persetujuan

1. **Konfigurasi Full-Stack Server & API (`server.ts`)**:
   - Pasang rute `/api/suggest-cp-tp` dan `/api/generate-rpm` menggunakan `@google/genai` dengan model `gemini-3.8-flash`.
   - Update `package.json` dev script: `"dev": "tsx server.ts"`.
2. **Komponen Frontend**:
   - `Navbar`: Header identitas RPM Kurikulum Merdeka + tombol contoh data & reset.
   - `FormInput`: Formulir lengkap 3-4 seksi dengan validasi & tombol rekomendasi CP/TP dari AI.
   - `DocumentPreview`: Tampilan dokumen tabel 5 bagian berstandar dinas pendidikan + lembar tanda tangan.
   - `PrintStyles`: Format cetak dokumen kertas A4 rapi tanpa elemen navigasi.
   - `ClipboardHelper`: Utilitas penyalin format tabel HTML + membuka Google Docs.
3. **Verifikasi & Linting**:
   - Jalankan `compile_applet` untuk memastikan seluruh tipe data, API, dan komponen bekerja 100% tanpa error.
