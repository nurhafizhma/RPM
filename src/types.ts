/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FormRPMInput {
  namaSekolah: string;
  namaGuru: string;
  nipGuru: string;
  namaKepalaSekolah: string;
  nipKepalaSekolah: string;
  jenjang: 'SD' | 'SMP' | 'SMA' | 'SMK';
  kelas: string;
  semester: string;
  mataPelajaran: string;
  alokasiWaktu: string;
  topikMateri: string;
  capaianPembelajaran: string;
  tujuanPembelajaran: string;
  pendekatan: string;
}

export interface RubrikItem {
  kriteria: string;
  berkembang: string;
  cakap: string;
  mahir: string;
}

export interface GlosariumItem {
  istilah: string;
  arti: string;
}

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
    tanggalDokumen: string;
  };
  bagian2_desainDeepLearning: {
    pilarMindful: string[];
    pilarMeaningful: string[];
    pilarJoyful: string[];
    pertanyaanPemantik: string[];
    profilPelajarPancasila: string[];
    saranaPrasarana: string[];
    pemahamanBermakna: string;
  };
  bagian3_langkahPembelajaran: {
    pendahuluan: {
      waktu: string;
      kegiatan: string[];
    };
    kegiatanInti: {
      tahapMemahami: {
        fokusPilar: string;
        waktu: string;
        kegiatan: string[];
      };
      tahapMengalami: {
        fokusPilar: string;
        waktu: string;
        kegiatan: string[];
      };
      tahapMengaplikasikan: {
        fokusPilar: string;
        waktu: string;
        kegiatan: string[];
      };
    };
    penutup: {
      waktu: string;
      kegiatan: string[];
    };
  };
  bagian4_asesmen: {
    asesmenDiagnostik: string;
    asesmenFormatif: string;
    asesmenSumatif: string;
    instrumenPenilaian: string[];
    tindakLanjut: string;
  };
  bagian5_lampiran: {
    ringkasanMateri: string;
    lembarKerjaPesertaDidik: {
      judul: string;
      petunjuk: string[];
      tugasAktivitas: string[];
    };
    rubrikPenilaian: RubrikItem[];
    glosarium: GlosariumItem[];
  };
}
