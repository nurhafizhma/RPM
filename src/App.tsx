/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { FormInput } from './components/FormInput.tsx';
import { DocumentPreview } from './components/DocumentPreview.tsx';
import { FormRPMInput, RPMData } from './types.ts';
import { sampleFormInput, sampleRPMOutput } from './sampleData.ts';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const initialForm: FormRPMInput = {
  namaSekolah: '',
  namaGuru: '',
  nipGuru: '',
  namaKepalaSekolah: '',
  nipKepalaSekolah: '',
  jenjang: 'SMP',
  kelas: 'Kelas 7',
  semester: '1 (Ganjil)',
  mataPelajaran: '',
  alokasiWaktu: '2 x 40 menit (1 Pertemuan)',
  topikMateri: '',
  capaianPembelajaran: '',
  tujuanPembelajaran: '',
  pendekatan: 'Problem-Based Learning terintegrasi Deep Learning',
};

export default function App() {
  const [form, setForm] = useState<FormRPMInput>(initialForm);
  const [rpm, setRpm] = useState<RPMData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleFieldChange = (field: keyof FormRPMInput, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLoadSample = () => {
    setForm(sampleFormInput);
    setRpm(sampleRPMOutput);
    setErrorMessage(null);
    setSuccessNotice('Data contoh resmi (IPA Kelas 7 - Fotosintesis) berhasil dimuat!');
    setTimeout(() => setSuccessNotice(null), 4000);
  };

  const handleReset = () => {
    setForm(initialForm);
    setRpm(null);
    setErrorMessage(null);
    setSuccessNotice(null);
  };

  const handleSuggestCPTP = async () => {
    if (!form.mataPelajaran.trim()) {
      setErrorMessage('Mohon isi Mata Pelajaran terlebih dahulu sebelum meminta rekomendasi CP & TP.');
      return;
    }

    setIsSuggesting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/suggest-cp-tp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jenjang: form.jenjang,
          kelas: form.kelas,
          mataPelajaran: form.mataPelajaran,
          topikMateri: form.topikMateri,
        }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || 'Gagal memperoleh saran CP & TP dari server.');
      }

      const { capaianPembelajaran, tujuanPembelajaran, saranTopik, alokasiWaktu } = result.data;

      setForm((prev) => ({
        ...prev,
        capaianPembelajaran: capaianPembelajaran || prev.capaianPembelajaran,
        tujuanPembelajaran: tujuanPembelajaran || prev.tujuanPembelajaran,
        topikMateri: prev.topikMateri ? prev.topikMateri : saranTopik || prev.topikMateri,
        alokasiWaktu: alokasiWaktu || prev.alokasiWaktu,
      }));

      setSuccessNotice('Rekomendasi CP & TP dari AI berhasil diterapkan ke formulir!');
      setTimeout(() => setSuccessNotice(null), 4000);
    } catch (err: any) {
      console.error('Suggest CP & TP error:', err);
      setErrorMessage(
        err?.message || 'Terjadi kendala saat meminta saran AI. Anda tetap dapat mengisi CP & TP secara manual.'
      );
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setErrorMessage(null);
    setSuccessNotice(null);

    try {
      const res = await fetch('/api/generate-rpm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || 'Gagal membuat dokumen RPM dari AI.');
      }

      setRpm(result.data);
      setSuccessNotice('Rencana Pembelajaran Mendalam (RPM) 5 Bagian Terstruktur berhasil digenerate!');
      setTimeout(() => setSuccessNotice(null), 4000);

      // Scroll preview smoothly to top on mobile
      window.scrollTo({ top: 300, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Generate RPM error:', err);
      setErrorMessage(
        err?.message || 'Gagal menghasilkan RPM. Pastikan koneksi stabil dan coba kembali.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navigation */}
      <Header
        onLoadSample={handleLoadSample}
        onReset={handleReset}
        isGenerating={isGenerating}
      />

      {/* Notifications Bar */}
      <div className="no-print max-w-[1600px] w-full mx-auto px-4 sm:px-6 pt-3">
        {errorMessage && (
          <div className="p-3 mb-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between text-xs text-red-800 shadow-sm animate-fadeIn">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-700 hover:text-red-900 font-bold ml-2 cursor-pointer"
            >
              ×
            </button>
          </div>
        )}

        {successNotice && (
          <div className="p-3 mb-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800 shadow-sm animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successNotice}</span>
            </div>
            <button
              onClick={() => setSuccessNotice(null)}
              className="text-emerald-700 hover:text-emerald-900 font-bold ml-2 cursor-pointer"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* Main Workspace Split View */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Kolom Kiri: Form Input Data RPM */}
          <div className="no-print lg:col-span-5 xl:col-span-4">
            <FormInput
              form={form}
              onChange={handleFieldChange}
              onGenerate={handleGenerate}
              onSuggestCPTP={handleSuggestCPTP}
              isGenerating={isGenerating}
              isSuggesting={isSuggesting}
            />
          </div>

          {/* Kolom Kanan: Pratinjau Dokumen RPM */}
          <div className="lg:col-span-7 xl:col-span-8">
            <DocumentPreview
              rpm={rpm}
              isGenerating={isGenerating}
              onUseSample={handleLoadSample}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="no-print bg-white border-t border-slate-200/80 py-4 mt-8">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>
            Generator RPM • Kurikulum Merdeka Pendekatan Pembelajaran Mendalam (Deep Learning)
          </p>
          <p className="text-[11px] text-slate-400">
            Terstruktur 5 Bagian: Identitas • Desain Deep Learning • Sintaks • Asesmen • Lampiran & LKPD
          </p>
        </div>
      </footer>
    </div>
  );
}
