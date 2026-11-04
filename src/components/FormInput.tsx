/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FormRPMInput } from '../types.ts';
import { School, GraduationCap, Target, Wand2, Loader2, PlayCircle, Sparkles } from 'lucide-react';

interface FormInputProps {
  form: FormRPMInput;
  onChange: (field: keyof FormRPMInput, value: string) => void;
  onGenerate: () => void;
  onSuggestCPTP: () => void;
  isGenerating: boolean;
  isSuggesting: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  form,
  onChange,
  onGenerate,
  onSuggestCPTP,
  isGenerating,
  isSuggesting,
}) => {
  // Dynamic kelas options based on selected jenjang
  const getKelasOptions = () => {
    switch (form.jenjang) {
      case 'SD':
        return ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'];
      case 'SMP':
        return ['Kelas 7', 'Kelas 8', 'Kelas 9'];
      case 'SMA':
      case 'SMK':
        return ['Kelas 10', 'Kelas 11', 'Kelas 12'];
      default:
        return ['Kelas 7', 'Kelas 8', 'Kelas 9'];
    }
  };

  const isFormValid =
    form.namaSekolah.trim() !== '' &&
    form.namaGuru.trim() !== '' &&
    form.mataPelajaran.trim() !== '' &&
    form.topikMateri.trim() !== '' &&
    form.capaianPembelajaran.trim() !== '' &&
    form.tujuanPembelajaran.trim() !== '';

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Form Header */}
      <div className="px-5 py-3.5 border-b border-slate-200/80 bg-slate-50/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">Form Input Data RPM</h2>
        </div>
        <span className="text-[11px] font-medium text-slate-500">*Wajib diisi semua</span>
      </div>

      <div className="p-5 space-y-5">
        {/* SECTION 1: INFORMASI SATUAN & PENGAJAR */}
        <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/25 space-y-3.5 transition-all">
          <div className="flex items-center gap-2 text-blue-900 font-semibold text-xs tracking-wide">
            <School className="w-4 h-4 text-blue-600" />
            <span>1. INFORMASI SATUAN & PENGAJAR</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Satuan Pendidikan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.namaSekolah}
              onChange={(e) => onChange('namaSekolah', e.target.value)}
              placeholder="Contoh: SMP Negeri 1 Yogyakarta"
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Guru <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.namaGuru}
                onChange={(e) => onChange('namaGuru', e.target.value)}
                placeholder="Contoh: Achmad Wahyono, S.T., M.Pd."
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                NIP Guru <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.nipGuru}
                onChange={(e) => onChange('nipGuru', e.target.value)}
                placeholder="197707112001121001"
                className="w-full px-3 py-2 text-xs font-mono bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Kepala Sekolah <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.namaKepalaSekolah}
                onChange={(e) => onChange('namaKepalaSekolah', e.target.value)}
                placeholder="Contoh: Dr. Mohammad Adi Hartono, M.Pd."
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                NIP Kepala Sekolah <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.nipKepalaSekolah}
                onChange={(e) => onChange('nipKepalaSekolah', e.target.value)}
                placeholder="197805142001121001"
                className="w-full px-3 py-2 text-xs font-mono bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: KELAS & MATA PELAJARAN */}
        <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/25 space-y-3.5 transition-all">
          <div className="flex items-center gap-2 text-indigo-900 font-semibold text-xs tracking-wide">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>2. KELAS & MATA PELAJARAN</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Jenjang <span className="text-red-500">*</span>
              </label>
              <select
                value={form.jenjang}
                onChange={(e) => {
                  const newJenjang = e.target.value as FormRPMInput['jenjang'];
                  onChange('jenjang', newJenjang);
                  // Update default kelas for that jenjang
                  if (newJenjang === 'SD') onChange('kelas', 'Kelas 4');
                  if (newJenjang === 'SMP') onChange('kelas', 'Kelas 7');
                  if (newJenjang === 'SMA' || newJenjang === 'SMK') onChange('kelas', 'Kelas 10');
                }}
                className="w-full px-2.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              >
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA">SMA</option>
                <option value="SMK">SMK</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kelas <span className="text-red-500">*</span>
              </label>
              <select
                value={form.kelas}
                onChange={(e) => onChange('kelas', e.target.value)}
                className="w-full px-2.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              >
                {getKelasOptions().map((kls) => (
                  <option key={kls} value={kls}>
                    {kls}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Semester <span className="text-red-500">*</span>
              </label>
              <select
                value={form.semester}
                onChange={(e) => onChange('semester', e.target.value)}
                className="w-full px-2.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              >
                <option value="1 (Ganjil)">1 (Ganjil)</option>
                <option value="2 (Genap)">2 (Genap)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mata Pelajaran (Mapel) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.mataPelajaran}
                onChange={(e) => onChange('mataPelajaran', e.target.value)}
                placeholder="Contoh: IPA / Biologi / Matematika"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Alokasi Waktu
              </label>
              <input
                type="text"
                value={form.alokasiWaktu}
                onChange={(e) => onChange('alokasiWaktu', e.target.value)}
                placeholder="Contoh: 2 x 40 menit (1 Pertemuan)"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Topik / Materi Pokok <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.topikMateri}
              onChange={(e) => onChange('topikMateri', e.target.value)}
              placeholder="Contoh: Fotosintesis & Rantai Makanan"
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* SECTION 3: CP, TP, & MATERI */}
        <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/25 space-y-3.5 transition-all">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-emerald-900 font-semibold text-xs tracking-wide">
              <Target className="w-4 h-4 text-emerald-600" />
              <span>3. CP, TP, & MATERI</span>
            </div>

            {/* AI Suggest Button */}
            <button
              type="button"
              onClick={onSuggestCPTP}
              disabled={isSuggesting || !form.mataPelajaran}
              title="Gunakan AI untuk merekomendasikan CP & TP otomatis sesuai Jenjang dan Mapel"
              className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200/90 rounded-md border border-emerald-300/60 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSuggesting ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Menganalisis...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>Rekomendasikan CP & TP (AI)</span>
                </>
              )}
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Capaian Pembelajaran (CP) <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={form.capaianPembelajaran}
              onChange={(e) => onChange('capaianPembelajaran', e.target.value)}
              placeholder="Masukkan deskripsi Capaian Pembelajaran sesuai fase Kurikulum Merdeka..."
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors resize-y"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tujuan Pembelajaran (TP) <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={form.tujuanPembelajaran}
              onChange={(e) => onChange('tujuanPembelajaran', e.target.value)}
              placeholder="Masukkan 2-4 Tujuan Pembelajaran yang ingin dicapai..."
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors resize-y"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Pendekatan / Model Pembelajaran
            </label>
            <select
              value={form.pendekatan}
              onChange={(e) => onChange('pendekatan', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
            >
              <option value="Problem-Based Learning terintegrasi Deep Learning">
                Problem-Based Learning (PBL) + Deep Learning
              </option>
              <option value="Project-Based Learning terintegrasi Deep Learning">
                Project-Based Learning (PjBL) + Deep Learning
              </option>
              <option value="Inquiry-Based Learning & Penyelidikan Terpadu">
                Inquiry-Based Learning (Inkuiri Mandiri & Kolaboratif)
              </option>
              <option value="Discovery Learning terarah">
                Discovery Learning (Penemuan Konsep Bermakna)
              </option>
              <option value="Pembelajaran Berdiferensiasi (Konten, Proses, Produk)">
                Pembelajaran Berdiferensiasi (Differentiated Instruction)
              </option>
            </select>
          </div>
        </div>

        {/* Generate Primary CTA Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onGenerate}
            disabled={isGenerating || !isFormValid}
            className={`w-full py-3 px-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer ${
              isGenerating || !isFormValid
                ? 'bg-slate-400 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 active:scale-[0.99] shadow-blue-500/25 hover:shadow-blue-500/40'
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Merumuskan Rencana Pembelajaran Mendalam...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 text-amber-300" />
                <span>Generate Rencana Pembelajaran Mendalam</span>
              </>
            )}
          </button>
          {!isFormValid && (
            <p className="text-[11px] text-amber-600 text-center mt-1.5">
              Mohon lengkapi kolom yang bertanda bintang (*) sebelum men-generate.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
