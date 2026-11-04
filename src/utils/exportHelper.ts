/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RPMData } from '../types.ts';

/**
 * Generates clean HTML representation of RPMData for Google Docs & Word paste
 */
export function generateRPMHtml(data: RPMData): string {
  const { bagian1_identitas, bagian2_desainDeepLearning, bagian3_langkahPembelajaran, bagian4_asesmen, bagian5_lampiran } = data;

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; color: #111827; line-height: 1.4; }
  h1 { font-size: 14pt; text-align: center; margin-bottom: 2px; text-transform: uppercase; font-weight: bold; }
  h2 { font-size: 12pt; text-align: center; margin-top: 0; margin-bottom: 16px; color: #1e3a8a; }
  h3 { font-size: 11pt; margin-top: 14px; margin-bottom: 6px; color: #1e40af; border-bottom: 1px solid #94a3b8; padding-bottom: 2px; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
  th, td { border: 1px solid #334155; padding: 6px 8px; vertical-align: top; font-size: 10pt; }
  th { background-color: #f1f5f9; font-weight: bold; text-align: left; }
  .table-header-blue { background-color: #e0e7ff; color: #1e3a8a; font-weight: bold; }
  ul, ol { margin: 4px 0; padding-left: 20px; }
  li { margin-bottom: 3px; }
  .signature-table td { border: none !important; padding: 12px 6px; }
</style>
</head>
<body>

<h1>RENCANA PEMBELAJARAN MENDALAM (RPM)</h1>
<h2>KURIKULUM MERDEKA — PENDEKATAN DEEP LEARNING</h2>

<h3>BAGIAN I: IDENTITAS & INFORMASI UMUM</h3>
<table>
  <tr>
    <th width="28%">Nama Satuan Pendidikan</th>
    <td>${bagian1_identitas.namaSekolah}</td>
  </tr>
  <tr>
    <th>Nama Guru / NIP</th>
    <td>${bagian1_identitas.namaGuru} (NIP: ${bagian1_identitas.nipGuru || '-'})</td>
  </tr>
  <tr>
    <th>Kepala Sekolah / NIP</th>
    <td>${bagian1_identitas.namaKepalaSekolah} (NIP: ${bagian1_identitas.nipKepalaSekolah || '-'})</td>
  </tr>
  <tr>
    <th>Jenjang / Kelas / Fase</th>
    <td>${bagian1_identitas.jenjang} / ${bagian1_identitas.kelas} (${bagian1_identitas.fase})</td>
  </tr>
  <tr>
    <th>Mata Pelajaran</th>
    <td><strong>${bagian1_identitas.mataPelajaran}</strong></td>
  </tr>
  <tr>
    <th>Semester / Alokasi Waktu</th>
    <td>Semester ${bagian1_identitas.semester} | ${bagian1_identitas.alokasiWaktu}</td>
  </tr>
  <tr>
    <th>Moda Pembelajaran</th>
    <td>${bagian1_identitas.modaPembelajaran}</td>
  </tr>
</table>

<h3>BAGIAN II: DESAIN PEMBELAJARAN MENDALAM (DEEP LEARNING)</h3>
<table>
  <tr class="table-header-blue">
    <th width="33%">1. Mindful Learning (Fokus & Kehadiran Utuh)</th>
    <th width="33%">2. Meaningful Learning (Kebermaknaan Nyata)</th>
    <th width="34%">3. Joyful Learning (Pengalaman Menyenangkan)</th>
  </tr>
  <tr>
    <td>
      <ul>
        ${bagian2_desainDeepLearning.pilarMindful.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </td>
    <td>
      <ul>
        ${bagian2_desainDeepLearning.pilarMeaningful.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </td>
    <td>
      <ul>
        ${bagian2_desainDeepLearning.pilarJoyful.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </td>
  </tr>
  <tr>
    <th>Pemahaman Bermakna</th>
    <td colspan="2"><em>${bagian2_desainDeepLearning.pemahamanBermakna}</em></td>
  </tr>
  <tr>
    <th>Pertanyaan Pemantik</th>
    <td colspan="2">
      <ul>
        ${bagian2_desainDeepLearning.pertanyaanPemantik.map(p => `<li>${p}</li>`).join('')}
      </ul>
    </td>
  </tr>
  <tr>
    <th>Profil Pelajar Pancasila</th>
    <td colspan="2">${bagian2_desainDeepLearning.profilPelajarPancasila.join(' • ')}</td>
  </tr>
  <tr>
    <th>Sarana & Prasarana</th>
    <td colspan="2">${bagian2_desainDeepLearning.saranaPrasarana.join(', ')}</td>
  </tr>
</table>

<h3>BAGIAN III: LANGKAH-LANGKAH PEMBELAJARAN</h3>
<table>
  <thead>
    <tr class="table-header-blue">
      <th width="20%">Tahapan Sintaks</th>
      <th width="15%">Alokasi Waktu</th>
      <th>Rangkaian Aktivitas Pembelajaran Mendalam</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Pendahuluan</strong></td>
      <td>${bagian3_langkahPembelajaran.pendahuluan.waktu}</td>
      <td>
        <ul>
          ${bagian3_langkahPembelajaran.pendahuluan.kegiatan.map(k => `<li>${k}</li>`).join('')}
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>Kegiatan Inti 1: Memahami (Understanding)</strong><br><small>(${bagian3_langkahPembelajaran.kegiatanInti.tahapMemahami.fokusPilar})</small></td>
      <td>${bagian3_langkahPembelajaran.kegiatanInti.tahapMemahami.waktu}</td>
      <td>
        <ul>
          ${bagian3_langkahPembelajaran.kegiatanInti.tahapMemahami.kegiatan.map(k => `<li>${k}</li>`).join('')}
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>Kegiatan Inti 2: Mengalami (Experiencing)</strong><br><small>(${bagian3_langkahPembelajaran.kegiatanInti.tahapMengalami.fokusPilar})</small></td>
      <td>${bagian3_langkahPembelajaran.kegiatanInti.tahapMengalami.waktu}</td>
      <td>
        <ul>
          ${bagian3_langkahPembelajaran.kegiatanInti.tahapMengalami.kegiatan.map(k => `<li>${k}</li>`).join('')}
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>Kegiatan Inti 3: Mengaplikasikan (Applying)</strong><br><small>(${bagian3_langkahPembelajaran.kegiatanInti.tahapMengaplikasikan.fokusPilar})</small></td>
      <td>${bagian3_langkahPembelajaran.kegiatanInti.tahapMengaplikasikan.waktu}</td>
      <td>
        <ul>
          ${bagian3_langkahPembelajaran.kegiatanInti.tahapMengaplikasikan.kegiatan.map(k => `<li>${k}</li>`).join('')}
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>Penutup & Refleksi</strong></td>
      <td>${bagian3_langkahPembelajaran.penutup.waktu}</td>
      <td>
        <ul>
          ${bagian3_langkahPembelajaran.penutup.kegiatan.map(k => `<li>${k}</li>`).join('')}
        </ul>
      </td>
    </tr>
  </tbody>
</table>

<h3>BAGIAN IV: ASESMEN & EVALUASI</h3>
<table>
  <tr>
    <th width="28%">Asesmen Diagnostik (Awal)</th>
    <td>${bagian4_asesmen.asesmenDiagnostik}</td>
  </tr>
  <tr>
    <th>Asesmen Formatif (Proses)</th>
    <td>${bagian4_asesmen.asesmenFormatif}</td>
  </tr>
  <tr>
    <th>Asesmen Sumatif (Akhir)</th>
    <td>${bagian4_asesmen.asesmenSumatif}</td>
  </tr>
  <tr>
    <th>Instrumen Penilaian</th>
    <td>${bagian4_asesmen.instrumenPenilaian.join(', ')}</td>
  </tr>
  <tr>
    <th>Tindak Lanjut (Remedial & Pengayaan)</th>
    <td>${bagian4_asesmen.tindakLanjut}</td>
  </tr>
</table>

<h3>BAGIAN V: LAMPIRAN & LEMBAR KERJA SISWA (LKPD)</h3>
<table>
  <tr>
    <th>Ringkasan Materi Esensial</th>
    <td>${bagian5_lampiran.ringkasanMateri}</td>
  </tr>
  <tr>
    <th>Lembar Kerja Peserta Didik (LKPD)</th>
    <td>
      <strong>${bagian5_lampiran.lembarKerjaPesertaDidik.judul}</strong>
      <p style="margin: 4px 0 2px 0;"><em>Petunjuk Pengerjaan:</em></p>
      <ul>
        ${bagian5_lampiran.lembarKerjaPesertaDidik.petunjuk.map(p => `<li>${p}</li>`).join('')}
      </ul>
      <p style="margin: 4px 0 2px 0;"><em>Tugas & Pertanyaan Penyelidikan:</em></p>
      <ol>
        ${bagian5_lampiran.lembarKerjaPesertaDidik.tugasAktivitas.map(t => `<li>${t}</li>`).join('')}
      </ol>
    </td>
  </tr>
</table>

<h4>Rubrik Penilaian Analitik</h4>
<table>
  <tr class="table-header-blue">
    <th width="30%">Kriteria Penilaian</th>
    <th width="23%">Berkembang</th>
    <th width="23%">Cakap</th>
    <th width="24%">Mahir</th>
  </tr>
  ${bagian5_lampiran.rubrikPenilaian.map(r => `
    <tr>
      <td><strong>${r.kriteria}</strong></td>
      <td>${r.berkembang}</td>
      <td>${r.cakap}</td>
      <td>${r.mahir}</td>
    </tr>
  `).join('')}
</table>

<h4>Glosarium Istilah Kunci</h4>
<table>
  <tr class="table-header-blue">
    <th width="30%">Istilah</th>
    <th>Makna / Definisi</th>
  </tr>
  ${bagian5_lampiran.glosarium.map(g => `
    <tr>
      <td><strong>${g.istilah}</strong></td>
      <td>${g.arti}</td>
    </tr>
  `).join('')}
</table>

<br>
<table class="signature-table" style="width: 100%; margin-top: 20px;">
  <tr>
    <td style="width: 50%; text-align: center;">
      Mengetahui,<br>
      Kepala Sekolah ${bagian1_identitas.namaSekolah}<br><br><br><br><br>
      <strong>${bagian1_identitas.namaKepalaSekolah}</strong><br>
      NIP. ${bagian1_identitas.nipKepalaSekolah || '-'}
    </td>
    <td style="width: 50%; text-align: center;">
      Yogyakarta, ${bagian1_identitas.tanggalDokumen}<br>
      Guru Mata Pelajaran,<br><br><br><br><br>
      <strong>${bagian1_identitas.namaGuru}</strong><br>
      NIP. ${bagian1_identitas.nipGuru || '-'}
    </td>
  </tr>
</table>

</body>
</html>
  `.trim();
}

/**
 * Copies formatted HTML and plain text to user clipboard
 */
export async function copyRPMToClipboard(data: RPMData): Promise<boolean> {
  const htmlContent = generateRPMHtml(data);
  const plainText = `RENCANA PEMBELAJARAN MENDALAM (RPM) - KURIKULUM MERDEKA\n` +
    `Sekolah: ${data.bagian1_identitas.namaSekolah}\n` +
    `Mata Pelajaran: ${data.bagian1_identitas.mataPelajaran}\n` +
    `Kelas: ${data.bagian1_identitas.kelas} (${data.bagian1_identitas.fase})\n` +
    `Guru: ${data.bagian1_identitas.namaGuru}\n\n` +
    `Dokumen lengkap tabel 5 bagian telah disalin dalam format rich text. Silakan paste (Ctrl+V) langsung di Google Docs atau Microsoft Word.`;

  try {
    if (navigator.clipboard && window.ClipboardItem) {
      const blobHtml = new Blob([htmlContent], { type: 'text/html' });
      const blobText = new Blob([plainText], { type: 'text/plain' });
      const item = new ClipboardItem({
        'text/html': blobHtml,
        'text/plain': blobText,
      });
      await navigator.clipboard.write([item]);
      return true;
    } else {
      await navigator.clipboard.writeText(plainText);
      return true;
    }
  } catch (err) {
    console.warn('Clipboard write failed, trying fallback textarea:', err);
    try {
      const tempEl = document.createElement('div');
      tempEl.innerHTML = htmlContent;
      tempEl.style.position = 'fixed';
      tempEl.style.pointerEvents = 'none';
      tempEl.style.opacity = '0';
      document.body.appendChild(tempEl);

      const range = document.createRange();
      range.selectNode(tempEl);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      document.execCommand('copy');
      selection?.removeAllRanges();
      document.body.removeChild(tempEl);
      return true;
    } catch (fallbackErr) {
      console.error('Fallback copy failed:', fallbackErr);
      return false;
    }
  }
}
