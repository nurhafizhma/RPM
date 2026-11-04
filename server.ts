/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;

// Initialize Google Gen AI client with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper to determine Fase Kurikulum Merdeka
function getFase(jenjang: string, kelas: string): string {
  if (jenjang === 'SD') {
    if (kelas.includes('1') || kelas.includes('2')) return 'Fase A (Kelas 1-2)';
    if (kelas.includes('3') || kelas.includes('4')) return 'Fase B (Kelas 3-4)';
    return 'Fase C (Kelas 5-6)';
  }
  if (jenjang === 'SMP') {
    return 'Fase D (Kelas 7-9)';
  }
  if (jenjang === 'SMA' || jenjang === 'SMK') {
    if (kelas.includes('10')) return 'Fase E (Kelas 10)';
    return 'Fase F (Kelas 11-12)';
  }
  return 'Fase D';
}

// 1. API: Rekomendasi Capaian Pembelajaran (CP) dan Tujuan Pembelajaran (TP)
app.post('/api/suggest-cp-tp', async (req, res) => {
  try {
    const { jenjang, kelas, mataPelajaran, topikMateri } = req.body;
    const fase = getFase(jenjang, kelas);

    const prompt = `Anda adalah pakar kurikulum pendidikan di Indonesia untuk Kurikulum Merdeka Kemendikbudristek.
Bantu rekomendasikan Capaian Pembelajaran (CP) resmi dan Tujuan Pembelajaran (TP) operasional dengan pendekatan Pembelajaran Mendalam (Deep Learning).

Informasi Pembelajaran:
- Jenjang: ${jenjang}
- Kelas: ${kelas} (${fase})
- Mata Pelajaran: ${mataPelajaran || 'Umum'}
- Topik / Materi Pokok: ${topikMateri || 'Materi Pokok'}

Buatkan rekomendasi dalam format JSON dengan key:
1. "capaianPembelajaran": Deskripsi CP resmi yang relevan dengan fase tersebut (1-2 paragraf padat).
2. "tujuanPembelajaran": 3-4 butir Tujuan Pembelajaran (TP) terukur menggunakan kata kerja operasional taksonomi Bloom revisi yang mencakup dimensi kognitif, afektif, dan psikomotorik.
3. "saranTopik": Topik yang disempurnakan (jika topik kosong atau singkat).
4. "alokasiWaktu": Rekomendasi alokasi waktu standar (misal: "2 x 40 menit" untuk SMP atau "2 x 35 menit" untuk SD).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            capaianPembelajaran: { type: Type.STRING },
            tujuanPembelajaran: { type: Type.STRING },
            saranTopik: { type: Type.STRING },
            alokasiWaktu: { type: Type.STRING },
          },
          required: ['capaianPembelajaran', 'tujuanPembelajaran'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({
      success: true,
      data: parsed,
    });
  } catch (error: any) {
    console.error('Error suggesting CP & TP:', error);
    return res.status(500).json({
      success: false,
      message: error?.message || 'Gagal menghasilkan saran CP & TP.',
    });
  }
});

// 2. API: Generate Rencana Pembelajaran Mendalam (RPM) 5 Bagian Terstruktur
app.post('/api/generate-rpm', async (req, res) => {
  try {
    const input = req.body;
    const fase = getFase(input.jenjang, input.kelas);
    const currentDate = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const prompt = `Anda adalah konsultan ahli pengembangan kurikulum dan pedagogi "Pembelajaran Mendalam" (Deep Learning) Kurikulum Merdeka Kemendikbudristek.
Tugas Anda adalah merumuskan dokumen lengkap "Rencana Pembelajaran Mendalam (RPM) 5 Bagian Terstruktur" yang komprehensif, siap pakai oleh guru, mendalam, dan kontekstual.

DATA MASUKAN:
- Nama Satuan Pendidikan: ${input.namaSekolah || 'Sekolah Penggerak'}
- Nama Guru: ${input.namaGuru || 'Guru Pengampu, S.Pd.'} (NIP: ${input.nipGuru || '-'})
- Nama Kepala Sekolah: ${input.namaKepalaSekolah || 'Kepala Sekolah, M.Pd.'} (NIP: ${input.nipKepalaSekolah || '-'})
- Jenjang: ${input.jenjang} | Kelas: ${input.kelas} (${fase}) | Semester: ${input.semester}
- Mata Pelajaran: ${input.mataPelajaran}
- Alokasi Waktu: ${input.alokasiWaktu || '2 x 45 menit (1 Pertemuan)'}
- Topik / Materi: ${input.topikMateri || 'Topik Esensial'}
- Capaian Pembelajaran (CP): ${input.capaianPembelajaran}
- Tujuan Pembelajaran (TP): ${input.tujuanPembelajaran}
- Pendekatan / Model: ${input.pendekatan || 'Problem-Based Learning'}

PEDOMAN INTEGRASI 3 PILAR DEEP LEARNING:
1. Mindful Learning: Kehadiran penuh siswa, kesadaran awal (mindful breathing / apersepsi emosi), keterfokusan tanpa distraksi.
2. Meaningful Learning: Pemahaman bermakna, koneksi nyata dengan masalah kehidupan sehari-hari siswa, bukan sekadar hafalan.
3. Joyful Learning: Pengalaman belajar yang menyenangkan, apresiatif, interaktif, menantang tanpa intimidasi.

Langkah Inti harus memuat 3 tahapan: Memahami (Understanding), Mengalami (Experiencing), Mengaplikasikan (Applying/Reflecting).

Keluarkan hasil dalam format JSON persis sesuai struktur berikut:
{
  "bagian1_identitas": {
    "namaSekolah": "${input.namaSekolah || 'Sekolah'}",
    "namaGuru": "${input.namaGuru || 'Guru'}",
    "nipGuru": "${input.nipGuru || '-'}",
    "namaKepalaSekolah": "${input.namaKepalaSekolah || 'Kepala Sekolah'}",
    "nipKepalaSekolah": "${input.nipKepalaSekolah || '-'}",
    "jenjang": "${input.jenjang}",
    "kelas": "${input.kelas}",
    "fase": "${fase}",
    "semester": "${input.semester}",
    "mataPelajaran": "${input.mataPelajaran}",
    "alokasiWaktu": "${input.alokasiWaktu || '2 JP'}",
    "modaPembelajaran": "Tatap Muka (Luring)",
    "tanggalDokumen": "${currentDate}"
  },
  "bagian2_desainDeepLearning": {
    "pilarMindful": ["langkah konkret mindful", "..."],
    "pilarMeaningful": ["langkah kontekstual meaningful", "..."],
    "pilarJoyful": ["aktivitas menggembirakan joyful", "..."],
    "pertanyaanPemantik": ["pertanyaan mendalam 1", "pertanyaan mendalam 2"],
    "profilPelajarPancasila": ["Bernalar Kritis", "Gotong Royong", "Kreatif"],
    "saranaPrasarana": ["media 1", "media 2", "lingkungan belajar"],
    "pemahamanBermakna": "Intisari pelajaran berharga seumur hidup yang didapat siswa"
  },
  "bagian3_langkahPembelajaran": {
    "pendahuluan": {
      "waktu": "10-15 menit",
      "kegiatan": ["Salam, doa, dan latihan mindful breathing / kehadiran utuh", "Apersepsi kontekstual dan pertanyaan pemantik", "Penyampaian tujuan dan alur kegiatan pembelajaran"]
    },
    "kegiatanInti": {
      "tahapMemahami": {
        "fokusPilar": "Mindful & Meaningful Learning",
        "waktu": "20-25 menit",
        "kegiatan": ["eksplorasi konsep awal", "analisis fenomena nyata"]
      },
      "tahapMengalami": {
        "fokusPilar": "Joyful & Collaborative Learning",
        "waktu": "30-35 menit",
        "kegiatan": ["investigasi kelompok / eksperimen", "diskusi interaktif pemecahan masalah"]
      },
      "tahapMengaplikasikan": {
        "fokusPilar": "Deep Understanding & Authentic Reflection",
        "waktu": "15-20 menit",
        "kegiatan": ["presentasi karya solutif", "refleksi mendalam tentang manfaat materi"]
      }
    },
    "penutup": {
      "waktu": "10-15 menit",
      "kegiatan": ["Kesimpulan bermakna bersama siswa", "Apresiasi kinerja dan refleksi perasaan (joyful)", "Doa dan penugasan tindak lanjut"]
    }
  },
  "bagian4_asesmen": {
    "asesmenDiagnostik": "Teknik dan instrumen asesmen diagnostik non-kognitif & kognitif awal",
    "asesmenFormatif": "Pengamatan keaktifan, lembar observasi partisipasi kelompok, dan umpan balik berkala",
    "asesmenSumatif": "Tugas akhir / unjuk kerja / tes pemahaman konsep",
    "instrumenPenilaian": ["Rubrik Penilaian Proses", "Lembar Observasi Sikap", "Tes Uraian Pemecahan Masalah"],
    "tindakLanjut": "Program remedial bagi siswa belum tuntas dan pengayaan proyek riil bagi yang mahir"
  },
  "bagian5_lampiran": {
    "ringkasanMateri": "Ulasan materi esensial 2-3 paragraf padat sebagai pegangan guru dan siswa",
    "lembarKerjaPesertaDidik": {
      "judul": "Lembar Kerja Siswa (LKPD) Pembelajaran Mendalam",
      "petunjuk": ["Bacalah dengan saksama...", "Bekerjasamalah secara aktif..."],
      "tugasAktivitas": ["Studi Kasus 1...", "Pertanyaan Reflektif 2...", "Tindakan Nyata 3..."]
    },
    "rubrikPenilaian": [
      {
        "kriteria": "Pemahaman Konsep Esensial",
        "berkembang": "Menunjukkan pemahaman dasar dengan bimbingan pendidik",
        "cakap": "Memahami konsep secara mandiri dan mampu menjelaskan logikanya",
        "mahir": "Mampu mengaitkan konsep dengan fenomena baru serta memberi solusi orisinal"
      },
      {
        "kriteria": "Keterlibatan Kolaboratif & Empati",
        "berkembang": "Pasif dalam kelompok namun menyelesaikan tugas sendiri",
        "cakap": "Aktif berpendapat dan saling menghargai gagasan rekan",
        "mahir": "Menginisiasi solusi bersama dan mendengarkan rekan secara penuh (mindful)"
      }
    ],
    "glosarium": [
      { "istilah": "Mindful Learning", "arti": "Pembelajaran dengan kesadaran penuh, fokus, dan keterbukaan terhadap hal baru" },
      { "istilah": "Meaningful Learning", "arti": "Pembelajaran bermakna yang mengaitkan pengetahuan baru dengan struktur kognitif siswa" }
    ]
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(rawText);
    } catch (parseErr) {
      // Clean up markdown block if present
      const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleaned);
    }

    return res.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error('Error generating RPM:', error);
    return res.status(500).json({
      success: false,
      message: error?.message || 'Gagal menghasilkan Rencana Pembelajaran Mendalam.',
    });
  }
});

// Production vs Development Setup
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    // Serve static files from Vite build output
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    // Development mode with Vite middlewares
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Generator RPM running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
