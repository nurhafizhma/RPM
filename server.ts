/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;

// Lazy client helper with graceful fallback
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

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

    const ai = getGeminiClient();

    if (!ai) {
      // High-fidelity pedagogical fallback if API Key is not yet configured
      return res.json({
        success: true,
        data: {
          capaianPembelajaran: `Peserta didik mampu memahami hakikat keilmuan dan konsep fundamental ${mataPelajaran || 'mata pelajaran'} dalam kehidupan sehari-hari, menganalisis hubungan sebab-akibat fenomena di lingkungan sekitar, serta mengaplikasikan keterampilan inkuiri dan pemecahan masalah secara kolaboratif sesuai tahap perkembangan usia peserta didik.`,
          tujuanPembelajaran: `1. Peserta didik mampu mengidentifikasi karakteristik esensial materi ${topikMateri || 'pokok'} dengan penuh rasa ingin tahu (Mindful).\n2. Peserta didik mampu menganalisis hubungan konsep ${topikMateri || 'pokok'} dengan fenomena kontekstual di lingkungan nyata secara kritis (Meaningful).\n3. Peserta didik mampu merumuskan gagasan solutif atau karya aplikatif melalui kolaborasi kelompok yang menyenangkan (Joyful).`,
          saranTopik: topikMateri || `Eksplorasi Konsep Esensial ${mataPelajaran}`,
          alokasiWaktu: jenjang === 'SD' ? '2 x 35 menit (1 Pertemuan)' : jenjang === 'SMP' ? '2 x 40 menit (1 Pertemuan)' : '2 x 45 menit (1 Pertemuan)',
        },
      });
    }

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

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback structured RPM template if API key is not yet set
      const defaultData = {
        bagian1_identitas: {
          namaSekolah: input.namaSekolah || 'Sekolah Penggerak',
          namaGuru: input.namaGuru || 'Guru Pengampu, S.Pd.',
          nipGuru: input.nipGuru || '-',
          namaKepalaSekolah: input.namaKepalaSekolah || 'Kepala Sekolah, M.Pd.',
          nipKepalaSekolah: input.nipKepalaSekolah || '-',
          jenjang: input.jenjang || 'SMP',
          kelas: input.kelas || 'Kelas 7',
          fase: fase,
          semester: input.semester || '1 (Ganjil)',
          mataPelajaran: input.mataPelajaran || 'Mata Pelajaran',
          alokasiWaktu: input.alokasiWaktu || '2 x 40 menit',
          modaPembelajaran: 'Tatap Muka (Luring Berdiferensiasi)',
          tanggalDokumen: currentDate,
        },
        bagian2_desainDeepLearning: {
          pilarMindful: [
            'Mindful Breathing 2 menit di awal sesi untuk memusatkan perhatian dan relaksasi otak.',
            'Sesi pengamatan hening terhadap fenomena/objek materi secara mendalam tanpa distraksi gawai.',
            'Pemberian jeda "Stop and Think" saat menganalisis studi kasus konseptual.',
          ],
          pilarMeaningful: [
            `Mengaitkan konsep ${input.topikMateri || input.mataPelajaran} dengan permasalahan nyata di lingkungan sekitar peserta didik.`,
            'Menemukan hikmah dan esensi manfaat materi untuk diterapkan dalam kehidupan bermasyarakat.',
            'Diskusi reflektif: "Mengapa pemahaman konsep ini penting bagi masa depan kita?".',
          ],
          pilarJoyful: [
            'Aktivitas mini games / tantangan investigasi kelompok yang interaktif dan dinamis.',
            'Apresiasi positif "Bintang Keberhasilan" antar rekan sejawat untuk membangun iklim kelas yang hangat.',
            'Penyajian hasil karya kelompok dengan metode gallery walk yang menyenangkan.',
          ],
          pertanyaanPemantik: [
            `Bagaimana konsep ${input.topikMateri || input.mataPelajaran} memengaruhi cara kita memandang fenomena di sekitar kita?`,
            'Apa dampak nyata yang akan kita rasakan jika konsep ini tidak diterapkan dengan baik dalam kehidupan?',
          ],
          profilPelajarPancasila: [
            'Bernalar Kritis (menganalisis masalah dan variabel)',
            'Gotong Royong (berkolaborasi aktif dalam tim)',
            'Kreatif (menghasilkan gagasan orisinal)',
          ],
          saranaPrasarana: [
            'Lembar Kerja Siswa (LKPD), Papan pameran mini, LCD Proyektor / media konkrit, Lingkungan sekolah.',
          ],
          pemahamanBermakna: `Pemahaman mendalam tentang ${input.topikMateri || input.mataPelajaran} melatih nalar kritis dan kepedulian peserta didik dalam menemukan solusi bijak terhadap tantangan dunia nyata.`,
        },
        bagian3_langkahPembelajaran: {
          pendahuluan: {
            waktu: '10-15 Menit',
            kegiatan: [
              'Pendidik memberi salam hangat, memimpin doa, dan mengecek kesiapan belajar peserta didik.',
              'Mindful Breathing: Pendidik memandu tarikan napas berirama untuk menghadirkan fokus penuh (mindful state).',
              'Apersepsi kontekstual: Menghadirkan fenomena pemantik yang menggelitik rasa ingin tahu peserta didik.',
              'Menyampaikan tujuan pembelajaran, kriteria keberhasilan, dan skema kegiatan mendalam yang akan dilalui.',
            ],
          },
          kegiatanInti: {
            tahapMemahami: {
              fokusPilar: 'Mindful Inquiry & Pemahaman Konseptual',
              waktu: '20-25 Menit',
              kegiatan: [
                'Peserta didik mencermati stimulus atau tayangan fenomena dengan saksama dan mencatat poin-poin kunci.',
                'Pendidik memfasilitasi tanya jawab pemantik untuk mengonstruksi pemahaman awal konsep esensial.',
                'Peserta didik menyusun peta pikiran (mind map) sederhana terkait hubungan antar konsep.',
              ],
            },
            tahapMengalami: {
              fokusPilar: 'Joyful & Collaborative Hands-on Experience',
              waktu: '30-35 Menit',
              kegiatan: [
                'Peserta didik dibagi menjadi kelompok heterogen (4-5 orang) untuk menyelesaikan misi studi kasus pada LKPD.',
                'Setiap anggota kelompok berbagi peran aktif (pencatat, pencari informasi, pembuat visualisasi).',
                'Pendidik berkeliling memberikan bimbingan diferensiasi bagi kelompok yang membutuhkan bimbingan bertahap.',
                'Kelompok merumuskan hipotesis dan kesimpulan bersama dalam suasana yang hangat dan penuh semangat.',
              ],
            },
            tahapMengaplikasikan: {
              fokusPilar: 'Meaningful Synthesis & Authentic Reflection',
              waktu: '15-20 Menit',
              kegiatan: [
                'Setiap kelompok membagikan solusi terbaik mereka melalui metode pameran karya ringkas (gallery walk).',
                'Kelompok lain memberikan umpan balik apresiatif menggunakan rubrik rekan sejawat.',
                'Peserta didik merumuskan refleksi komitmen pribadi mengenai penerapan nilai materi dalam kehidupan harian.',
              ],
            },
          },
          penutup: {
            waktu: '10 Menit',
            kegiatan: [
              'Pendidik bersama peserta didik menyimpulkan intisari pelajaran dan makna hidup yang diperoleh.',
              'Refleksi Joyful: Peserta didik mengutarakan satu kata atau ekspresi yang menggambarkan perasaan belajar hari ini.',
              'Pendidik memberikan apresiasi terhadap kerja keras seluruh peserta didik.',
              'Doa penutup dan salam perpisahan.',
            ],
          },
        },
        bagian4_asesmen: {
          asesmenDiagnostik: 'Pertanyaan pemantik non-kognitif (kesiapan belajar) dan kuis prasyarat 3 butir di awal pembelajaran.',
          asesmenFormatif: 'Lembar observasi keterlibatan kelompok, keaktifan berpendapat, dan rubrik unjuk kerja pemecahan masalah.',
          asesmenSumatif: 'Penilaian produk lembar kerja analitik dan tes pemahaman konsep berbasis situasi nyata (HOTS).',
          instrumenPenilaian: [
            'Lembar Observasi Sikap Profil Pelajar Pancasila',
            'Rubrik Unjuk Kerja Penyelidikan Kelompok',
            'Tes Pemahaman Konseptual Bermakna',
          ],
          tindakLanjut: 'Remedial: Pendampingan tutor sebaya pada bagian konsep yang belum dipahami. Pengayaan: Penugasan studi komparasi kasus lanjutan di lingkungan tempat tinggal peserta didik.',
        },
        bagian5_lampiran: {
          ringkasanMateri: `Materi ${input.topikMateri || input.mataPelajaran} berfokus pada penguasaan konsep esensial yang aplikatif. Peserta didik diajak tidak sekadar menghafal definisi, melainkan memahami prinsip kerja, hubungan sebab-akibat, dan implikasi praktisnya dalam konteks lokal maupun global.`,
          lembarKerjaPesertaDidik: {
            judul: `LKPD Pembelajaran Mendalam: Penyelidikan Masalah ${input.topikMateri || input.mataPelajaran}`,
            petunjuk: [
              'Bekerjasamalah secara harmonis dan hargai setiap gagasan anggota tim.',
              'Cermati permasalahan yang disajikan dengan pemikiran terbuka dan cermat.',
              'Tuliskan argumen dan solusi kelompok secara runtut dan jelas.',
            ],
            tugasAktivitas: [
              'Aktivitas 1: Analisis fenomena kasus yang diberikan pada penggalan teks materi.',
              'Aktivitas 2: Diskusikan 2 alternatif solusi paling efektif bersama tim kelompokmu.',
              'Aktivitas 3 (Refleksi): Tuliskan 1 langkah nyata yang bisa kamu lakukan mulai besok untuk menerapkan materi ini.',
            ],
          },
          rubrikPenilaian: [
            {
              kriteria: 'Penguasaan Konsep Esensial',
              berkembang: 'Memahami sebagian konsep dan membutuhkan bantuan untuk menjelaskan alurnya.',
              cakap: 'Mampu menjelaskan konsep secara mandiri dan runtut dengan contoh sederhana.',
              mahir: 'Menganalisis konsep secara komprehensif, mengaitkan dengan disiplin lain, dan menyajikan solusi orisinal.',
            },
            {
              kriteria: 'Kolaborasi & Kehadiran Penuh (Mindful)',
              berkembang: 'Pasif dalam diskusi dan perlu diingatkan untuk berbagi tugas.',
              cakap: 'Aktif mendengarkan rekan satu tim dan menyelesaikan tugas bagian secara tepat waktu.',
              mahir: 'Mendorong dinamika tim yang positif, saling mengapresiasi, dan fokus hadir secara utuh selama pembelajaran.',
            },
          ],
          glosarium: [
            { istilah: 'Mindful Learning', arti: 'Pembelajaran dengan kesadaran penuh, fokus, keterbukaan pada perspektif baru, dan refleksi mendalam.' },
            { istilah: 'Meaningful Learning', arti: 'Pembelajaran bermakna yang mengaitkan pengetahuan baru secara substantif dengan struktur kognitif peserta didik.' },
            { istilah: 'Joyful Learning', arti: 'Pengalaman pembelajaran yang menggugah antusiasme, rasa ingin tahu, dan kegembiraan eksplorasi.' },
          ],
        },
      };

      return res.json({
        success: true,
        data: defaultData,
      });
    }

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

Keluarkan hasil dalam format JSON terstruktur persis sesuai field:
bagian1_identitas, bagian2_desainDeepLearning, bagian3_langkahPembelajaran, bagian4_asesmen, dan bagian5_lampiran.`;

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
  const distPath = path.resolve(__dirname, 'dist');
  const hasDist = fs.existsSync(path.resolve(distPath, 'index.html'));

  // Always serve pre-built dist in production (Cloud Run, npm start, or NODE_ENV=production)
  const isProduction =
    process.env.NODE_ENV === 'production' ||
    Boolean(process.env.K_SERVICE) ||
    process.env.npm_lifecycle_event === 'start';

  if (isProduction && hasDist) {
    console.log(`[Production] Serving pre-built static assets from ${distPath}`);
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    console.log('[Development] Mounting Vite dev middleware...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Generator RPM running on http://0.0.0.0:${PORT} (PID: ${process.pid})`);
  });
}

startServer();
