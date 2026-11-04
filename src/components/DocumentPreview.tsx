/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RPMData } from '../types.ts';
import { copyRPMToClipboard } from '../utils/exportHelper.ts';
import {
  FileText,
  Printer,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  Brain,
  Sparkles,
  HeartHandshake,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

interface DocumentPreviewProps {
  rpm: RPMData | null;
  isGenerating: boolean;
  onUseSample: () => void;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  rpm,
  isGenerating,
  onUseSample,
}) => {
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopyAndOpenGoogleDocs = async () => {
    if (!rpm) return;
    const success = await copyRPMToClipboard(rpm);
    if (success) {
      setCopied(true);
      setToastMessage('Dokumen RPM berhasil disalin! Format tabel siap di-paste (Ctrl+V) ke Google Docs.');
      setTimeout(() => setCopied(false), 4000);
      setTimeout(() => setToastMessage(null), 6000);

      // Open docs.new in new window/tab safely via anchor
      const link = document.createElement('a');
      link.href = 'https://docs.new';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Header Toolbar */}
      <div className="no-print px-5 py-3.5 border-b border-slate-200/80 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800 tracking-tight leading-none">
              Pratinjau Dokumen RPM
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">Tampilan Tabel Rapi 5 Bagian Utama</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyAndOpenGoogleDocs}
            disabled={!rpm || isGenerating}
            title="Salin tabel rapi dan buka dokumen baru di Google Docs"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-lg shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Tersalin!' : 'Salin & Buka di Google Dokumen'}</span>
            <ExternalLink className="w-3 h-3 opacity-75 ml-0.5" />
          </button>

          <button
            type="button"
            onClick={handlePrint}
            disabled={!rpm || isGenerating}
            title="Cetak langsung atau simpan dokumen ke file PDF"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-sm transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>CETAK / PDF</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="no-print bg-emerald-50 border-b border-emerald-200 px-4 py-2.5 flex items-center justify-between text-xs text-emerald-800 transition-all">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-emerald-700 hover:text-emerald-900 font-bold ml-2"
          >
            ×
          </button>
        </div>
      )}

      {/* Main Preview Container */}
      <div className="p-4 sm:p-6 flex-1 overflow-y-auto bg-slate-100/50 min-h-[500px]">
        {/* State 1: Generating Loading Screen */}
        {isGenerating && (
          <div className="h-full min-h-[460px] flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-dashed border-blue-200">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4 animate-pulse">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">
              Merumuskan Rencana Pembelajaran Mendalam
            </h3>
            <p className="text-xs text-slate-500 max-w-md leading-relaxed mb-4">
              AI sedang menyusun sintaks 5 bagian, mengintegrasikan 3 pilar Deep Learning (Mindful,
              Meaningful, Joyful), indikator asesmen, serta LKPD operasional...
            </p>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5 text-blue-600">
                <Brain className="w-3.5 h-3.5" /> Mindful
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-emerald-600">
                <Sparkles className="w-3.5 h-3.5" /> Meaningful
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-amber-600">
                <HeartHandshake className="w-3.5 h-3.5" /> Joyful
              </span>
            </div>
          </div>
        )}

        {/* State 2: Zero State (No document yet) */}
        {!rpm && !isGenerating && (
          <div className="h-full min-h-[460px] flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-slate-200/90 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-4 ring-8 ring-blue-50/50">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">
              Belum Ada Dokumen Ditampilkan
            </h3>
            <p className="text-xs text-slate-500 max-w-md leading-relaxed mb-5">
              Isi formulir input di sebelah kiri lalu klik tombol{' '}
              <strong className="text-slate-700">"Generate Rencana Pembelajaran Mendalam"</strong>{' '}
              untuk membuat tabel 5 bagian secara otomatis.
            </p>
            <button
              type="button"
              onClick={onUseSample}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100/90 border border-blue-200 rounded-lg transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Gunakan Data Contoh (IPA Kelas 7)</span>
            </button>
          </div>
        )}

        {/* State 3: Generated Structured RPM Document */}
        {rpm && !isGenerating && (
          <div className="print-container bg-white rounded-xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6 text-slate-800">
            {/* Kop Dokumen */}
            <div className="text-center pb-4 border-b-2 border-slate-900 space-y-1">
              <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-slate-900">
                Rencana Pembelajaran Mendalam (RPM)
              </h2>
              <p className="text-xs sm:text-sm font-semibold uppercase text-blue-900 tracking-wide">
                Kurikulum Merdeka — Pendekatan Deep Learning
              </p>
              <p className="text-xs text-slate-600 font-medium">
                {rpm.bagian1_identitas.namaSekolah} • Tahun Ajaran 2026/2027 • Semester{' '}
                {rpm.bagian1_identitas.semester}
              </p>
            </div>

            {/* BAGIAN 1: IDENTITAS & INFORMASI UMUM */}
            <div className="page-break-avoid">
              <div className="bg-slate-800 text-white px-3.5 py-1.5 rounded-t-lg font-bold text-xs uppercase tracking-wide flex items-center justify-between">
                <span>1. Identitas & Informasi Umum</span>
                <span className="text-[10px] font-normal opacity-80">{rpm.bagian1_identitas.fase}</span>
              </div>
              <div className="border border-t-0 border-slate-300 rounded-b-lg overflow-hidden">
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="border-b border-slate-200 bg-slate-50/50">
                      <td className="w-1/3 py-2 px-3 font-semibold text-slate-700">Satuan Pendidikan</td>
                      <td className="w-2/3 py-2 px-3 text-slate-900 font-medium">{rpm.bagian1_identitas.namaSekolah}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 px-3 font-semibold text-slate-700">Guru Pengampu / NIP</td>
                      <td className="py-2 px-3 text-slate-900">
                        {rpm.bagian1_identitas.namaGuru}{' '}
                        <span className="text-slate-500 font-mono text-[11px]">(NIP: {rpm.bagian1_identitas.nipGuru || '-'})</span>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200 bg-slate-50/50">
                      <td className="py-2 px-3 font-semibold text-slate-700">Kepala Sekolah / NIP</td>
                      <td className="py-2 px-3 text-slate-900">
                        {rpm.bagian1_identitas.namaKepalaSekolah}{' '}
                        <span className="text-slate-500 font-mono text-[11px]">(NIP: {rpm.bagian1_identitas.nipKepalaSekolah || '-'})</span>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 px-3 font-semibold text-slate-700">Jenjang / Kelas / Fase</td>
                      <td className="py-2 px-3 text-slate-900 font-medium">
                        {rpm.bagian1_identitas.jenjang} • {rpm.bagian1_identitas.kelas} ({rpm.bagian1_identitas.fase})
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200 bg-slate-50/50">
                      <td className="py-2 px-3 font-semibold text-slate-700">Mata Pelajaran</td>
                      <td className="py-2 px-3 text-blue-900 font-bold">{rpm.bagian1_identitas.mataPelajaran}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 px-3 font-semibold text-slate-700">Alokasi Waktu / Moda</td>
                      <td className="py-2 px-3 text-slate-900">
                        {rpm.bagian1_identitas.alokasiWaktu} • {rpm.bagian1_identitas.modaPembelajaran}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* BAGIAN 2: DESAIN PEMBELAJARAN MENDALAM */}
            <div className="page-break-avoid">
              <div className="bg-blue-900 text-white px-3.5 py-1.5 rounded-t-lg font-bold text-xs uppercase tracking-wide flex items-center gap-2">
                <Brain className="w-3.5 h-3.5 text-amber-300" />
                <span>2. Desain Pembelajaran Mendalam (Deep Learning)</span>
              </div>
              <div className="border border-t-0 border-slate-300 rounded-b-lg p-3.5 space-y-3.5 bg-slate-50/30">
                {/* 3 Pilar Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Pilar Mindful */}
                  <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs mb-2">
                      <Brain className="w-3.5 h-3.5 text-blue-600" />
                      <span>1. Mindful Learning</span>
                    </div>
                    <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                      {rpm.bagian2_desainDeepLearning.pilarMindful.map((m, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pilar Meaningful */}
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg">
                    <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>2. Meaningful Learning</span>
                    </div>
                    <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                      {rpm.bagian2_desainDeepLearning.pilarMeaningful.map((m, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pilar Joyful */}
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg">
                    <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs mb-2">
                      <HeartHandshake className="w-3.5 h-3.5 text-amber-600" />
                      <span>3. Joyful Learning</span>
                    </div>
                    <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                      {rpm.bagian2_desainDeepLearning.pilarJoyful.map((j, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {j}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pemahaman Bermakna & Pertanyaan Pemantik */}
                <div className="border-t border-slate-200 pt-3 space-y-2.5 text-xs">
                  <div>
                    <span className="font-bold text-slate-800">Pemahaman Bermakna:</span>
                    <p className="italic text-slate-700 bg-white p-2.5 rounded border border-slate-200 mt-1">
                      "{rpm.bagian2_desainDeepLearning.pemahamanBermakna}"
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800">Pertanyaan Pemantik:</span>
                    <ul className="list-disc pl-4 text-slate-700 mt-1 space-y-1">
                      {rpm.bagian2_desainDeepLearning.pertanyaanPemantik.map((q, idx) => (
                        <li key={idx}>{q}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="font-bold text-slate-800">Profil Pelajar Pancasila:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {rpm.bagian2_desainDeepLearning.profilPelajarPancasila.map((p, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-medium text-[11px]"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800">Sarana & Prasarana: </span>
                    <span className="text-slate-700">
                      {rpm.bagian2_desainDeepLearning.saranaPrasarana.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* BAGIAN 3: LANGKAH-LANGKAH PEMBELAJARAN */}
            <div className="page-break-avoid">
              <div className="bg-slate-800 text-white px-3.5 py-1.5 rounded-t-lg font-bold text-xs uppercase tracking-wide flex items-center justify-between">
                <span>3. Langkah-Langkah Pembelajaran Terstruktur</span>
                <span className="text-[10px] opacity-80">Sintaks Deep Learning</span>
              </div>
              <div className="border border-t-0 border-slate-300 rounded-b-lg overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300 text-slate-800 font-bold">
                      <th className="py-2 px-3 text-left w-1/4">Tahapan Sintaks</th>
                      <th className="py-2 px-3 text-left w-20">Waktu</th>
                      <th className="py-2 px-3 text-left">Aktivitas Pembelajaran Mendalam</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {/* Pendahuluan */}
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 font-semibold text-slate-800 align-top">
                        Tahap Pendahuluan
                        <span className="block text-[10px] text-blue-600 font-normal">Mindful Opening & Apersepsi</span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px] align-top">
                        {rpm.bagian3_langkahPembelajaran.pendahuluan.waktu}
                      </td>
                      <td className="py-2.5 px-3 text-slate-700">
                        <ul className="list-disc pl-4 space-y-1">
                          {rpm.bagian3_langkahPembelajaran.pendahuluan.kegiatan.map((k, idx) => (
                            <li key={idx} className="leading-relaxed">{k}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>

                    {/* Inti: Memahami */}
                    <tr className="hover:bg-slate-50/50 bg-blue-50/20">
                      <td className="py-2.5 px-3 font-semibold text-blue-900 align-top">
                        Kegiatan Inti 1: Memahami
                        <span className="block text-[10px] text-slate-500 font-normal">
                          {rpm.bagian3_langkahPembelajaran.kegiatanInti.tahapMemahami.fokusPilar}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px] align-top">
                        {rpm.bagian3_langkahPembelajaran.kegiatanInti.tahapMemahami.waktu}
                      </td>
                      <td className="py-2.5 px-3 text-slate-700">
                        <ul className="list-disc pl-4 space-y-1">
                          {rpm.bagian3_langkahPembelajaran.kegiatanInti.tahapMemahami.kegiatan.map((k, idx) => (
                            <li key={idx} className="leading-relaxed">{k}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>

                    {/* Inti: Mengalami */}
                    <tr className="hover:bg-slate-50/50 bg-emerald-50/20">
                      <td className="py-2.5 px-3 font-semibold text-emerald-900 align-top">
                        Kegiatan Inti 2: Mengalami
                        <span className="block text-[10px] text-slate-500 font-normal">
                          {rpm.bagian3_langkahPembelajaran.kegiatanInti.tahapMengalami.fokusPilar}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px] align-top">
                        {rpm.bagian3_langkahPembelajaran.kegiatanInti.tahapMengalami.waktu}
                      </td>
                      <td className="py-2.5 px-3 text-slate-700">
                        <ul className="list-disc pl-4 space-y-1">
                          {rpm.bagian3_langkahPembelajaran.kegiatanInti.tahapMengalami.kegiatan.map((k, idx) => (
                            <li key={idx} className="leading-relaxed">{k}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>

                    {/* Inti: Mengaplikasikan */}
                    <tr className="hover:bg-slate-50/50 bg-indigo-50/20">
                      <td className="py-2.5 px-3 font-semibold text-indigo-900 align-top">
                        Kegiatan Inti 3: Mengaplikasikan
                        <span className="block text-[10px] text-slate-500 font-normal">
                          {rpm.bagian3_langkahPembelajaran.kegiatanInti.tahapMengaplikasikan.fokusPilar}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px] align-top">
                        {rpm.bagian3_langkahPembelajaran.kegiatanInti.tahapMengaplikasikan.waktu}
                      </td>
                      <td className="py-2.5 px-3 text-slate-700">
                        <ul className="list-disc pl-4 space-y-1">
                          {rpm.bagian3_langkahPembelajaran.kegiatanInti.tahapMengaplikasikan.kegiatan.map((k, idx) => (
                            <li key={idx} className="leading-relaxed">{k}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>

                    {/* Penutup */}
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 font-semibold text-slate-800 align-top">
                        Tahap Penutup & Refleksi
                        <span className="block text-[10px] text-amber-600 font-normal">Joyful Celebration</span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px] align-top">
                        {rpm.bagian3_langkahPembelajaran.penutup.waktu}
                      </td>
                      <td className="py-2.5 px-3 text-slate-700">
                        <ul className="list-disc pl-4 space-y-1">
                          {rpm.bagian3_langkahPembelajaran.penutup.kegiatan.map((k, idx) => (
                            <li key={idx} className="leading-relaxed">{k}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* BAGIAN 4: ASESMEN & EVALUASI */}
            <div className="page-break-avoid">
              <div className="bg-slate-800 text-white px-3.5 py-1.5 rounded-t-lg font-bold text-xs uppercase tracking-wide">
                <span>4. Asesmen & Evaluasi Pembelajaran</span>
              </div>
              <div className="border border-t-0 border-slate-300 rounded-b-lg overflow-hidden">
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="border-b border-slate-200 bg-slate-50/50">
                      <td className="w-1/3 py-2 px-3 font-semibold text-slate-700">Asesmen Diagnostik (Awal)</td>
                      <td className="w-2/3 py-2 px-3 text-slate-800">{rpm.bagian4_asesmen.asesmenDiagnostik}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 px-3 font-semibold text-slate-700">Asesmen Formatif (Proses)</td>
                      <td className="py-2 px-3 text-slate-800">{rpm.bagian4_asesmen.asesmenFormatif}</td>
                    </tr>
                    <tr className="border-b border-slate-200 bg-slate-50/50">
                      <td className="py-2 px-3 font-semibold text-slate-700">Asesmen Sumatif (Akhir)</td>
                      <td className="py-2 px-3 text-slate-800">{rpm.bagian4_asesmen.asesmenSumatif}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 px-3 font-semibold text-slate-700">Instrumen Penilaian</td>
                      <td className="py-2 px-3 text-slate-800">{rpm.bagian4_asesmen.instrumenPenilaian.join(', ')}</td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <td className="py-2 px-3 font-semibold text-slate-700">Tindak Lanjut</td>
                      <td className="py-2 px-3 text-slate-800">{rpm.bagian4_asesmen.tindakLanjut}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* BAGIAN 5: LAMPIRAN & LKPD */}
            <div className="page-break-avoid space-y-4">
              <div>
                <div className="bg-slate-800 text-white px-3.5 py-1.5 rounded-t-lg font-bold text-xs uppercase tracking-wide">
                  <span>5. Lampiran: Materi & Lembar Kerja Siswa (LKPD)</span>
                </div>
                <div className="border border-t-0 border-slate-300 rounded-b-lg p-4 space-y-3.5 text-xs bg-slate-50/30">
                  {/* Ringkasan Materi */}
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">A. Ringkasan Materi Esensial</h4>
                    <p className="text-slate-700 leading-relaxed bg-white p-3 rounded border border-slate-200">
                      {rpm.bagian5_lampiran.ringkasanMateri}
                    </p>
                  </div>

                  {/* LKPD */}
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">
                      B. {rpm.bagian5_lampiran.lembarKerjaPesertaDidik.judul}
                    </h4>
                    <div className="bg-white p-3 rounded border border-slate-200 space-y-2">
                      <div>
                        <span className="font-semibold text-slate-700">Petunjuk Pengerjaan:</span>
                        <ul className="list-disc pl-4 text-slate-600 mt-0.5 space-y-0.5">
                          {rpm.bagian5_lampiran.lembarKerjaPesertaDidik.petunjuk.map((p, idx) => (
                            <li key={idx}>{p}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">Tugas & Aktivitas Penyelidikan:</span>
                        <ol className="list-decimal pl-4 text-slate-700 mt-0.5 space-y-1">
                          {rpm.bagian5_lampiran.lembarKerjaPesertaDidik.tugasAktivitas.map((t, idx) => (
                            <li key={idx} className="leading-relaxed font-medium">{t}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rubrik Penilaian */}
              <div>
                <h4 className="font-bold text-xs text-slate-800 mb-1">C. Rubrik Penilaian Analitik</h4>
                <div className="border border-slate-300 rounded-lg overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-300 text-slate-800 font-bold">
                        <th className="py-2 px-3 text-left w-1/4">Kriteria Penilaian</th>
                        <th className="py-2 px-3 text-left w-1/4 text-amber-800">Berkembang</th>
                        <th className="py-2 px-3 text-left w-1/4 text-blue-800">Cakap</th>
                        <th className="py-2 px-3 text-left w-1/4 text-emerald-800">Mahir</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {rpm.bagian5_lampiran.rubrikPenilaian.map((r, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-2 px-3 font-semibold text-slate-800 align-top">{r.kriteria}</td>
                          <td className="py-2 px-3 text-slate-600 align-top">{r.berkembang}</td>
                          <td className="py-2 px-3 text-slate-700 align-top">{r.cakap}</td>
                          <td className="py-2 px-3 text-slate-800 font-medium align-top">{r.mahir}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Glosarium */}
              <div>
                <h4 className="font-bold text-xs text-slate-800 mb-1">D. Glosarium</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {rpm.bagian5_lampiran.glosarium.map((g, idx) => (
                    <div key={idx} className="p-2 bg-slate-50 rounded border border-slate-200">
                      <strong className="text-slate-900">{g.istilah}:</strong>{' '}
                      <span className="text-slate-600">{g.arti}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Lembar Tanda Tangan Resmi */}
            <div className="page-break-avoid pt-8 border-t border-slate-300">
              <table className="w-full text-xs text-center">
                <tbody>
                  <tr>
                    <td className="w-1/2 align-top py-2">
                      <p className="text-slate-700">Mengetahui,</p>
                      <p className="font-semibold text-slate-900">
                        Kepala Sekolah {rpm.bagian1_identitas.namaSekolah}
                      </p>
                      <div className="h-16"></div>
                      <p className="font-bold text-slate-900 underline">
                        {rpm.bagian1_identitas.namaKepalaSekolah}
                      </p>
                      <p className="text-slate-600 font-mono text-[11px]">
                        NIP. {rpm.bagian1_identitas.nipKepalaSekolah || '-'}
                      </p>
                    </td>
                    <td className="w-1/2 align-top py-2">
                      <p className="text-slate-700">
                        Yogyakarta, {rpm.bagian1_identitas.tanggalDokumen}
                      </p>
                      <p className="font-semibold text-slate-900">Guru Mata Pelajaran,</p>
                      <div className="h-16"></div>
                      <p className="font-bold text-slate-900 underline">
                        {rpm.bagian1_identitas.namaGuru}
                      </p>
                      <p className="text-slate-600 font-mono text-[11px]">
                        NIP. {rpm.bagian1_identitas.nipGuru || '-'}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
