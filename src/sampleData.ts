/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FormRPMInput, RPMData } from './types.ts';

export const sampleFormInput: FormRPMInput = {
  namaSekolah: 'SMP Negeri 1 Yogyakarta',
  namaGuru: 'Achmad Wahyono, S.T., M.Pd.',
  nipGuru: '197707112001121001',
  namaKepalaSekolah: 'Dr. Mohammad Adi Hartono, M.Pd.',
  nipKepalaSekolah: '197805142001121001',
  jenjang: 'SMP',
  kelas: 'Kelas 7',
  semester: '1 (Ganjil)',
  mataPelajaran: 'Ilmu Pengetahuan Alam (IPA)',
  alokasiWaktu: '2 x 40 menit (1 Pertemuan)',
  topikMateri: 'Fotosintesis dan Peran Tumbuhan Hijau dalam Ekosistem',
  capaianPembelajaran: 'Peserta didik mampu mengidentifikasi proses fotosintesis pada tumbuhan hijau, menganalisis faktor-faktor yang memengaruhinya, serta mengaitkan peranan tumbuhan sebagai produsen utama dalam menjaga keseimbangan oksigen dan rantai makanan di lingkungan sekitar.',
  tujuanPembelajaran: '1. Melalui pengamatan spesimen daun segar, peserta didik mampu mengidentifikasi kebutuhan fotosintesis secara mandiri dengan teliti.\n2. Melalui simulasi uji iodium sederhana, peserta didik mampu membuktikan terbentuknya karbohidrat (amilum) hasil fotosintesis secara kolaboratif.\n3. Melalui diskusi reflektif, peserta didik mampu merumuskan aksi nyata pelestarian tanaman di lingkungan sekolah/rumah sebagai wujud rasa syukur.',
  pendekatan: 'Problem-Based Learning terintegrasi Deep Learning',
};

export const sampleRPMOutput: RPMData = {
  bagian1_identitas: {
    namaSekolah: 'SMP Negeri 1 Yogyakarta',
    namaGuru: 'Achmad Wahyono, S.T., M.Pd.',
    nipGuru: '197707112001121001',
    namaKepalaSekolah: 'Dr. Mohammad Adi Hartono, M.Pd.',
    nipKepalaSekolah: '197805142001121001',
    jenjang: 'SMP',
    kelas: 'Kelas 7',
    fase: 'Fase D (Kelas 7-9)',
    semester: '1 (Ganjil)',
    mataPelajaran: 'Ilmu Pengetahuan Alam (IPA)',
    alokasiWaktu: '2 x 40 menit (1 Pertemuan)',
    modaPembelajaran: 'Tatap Muka (Luring Berdiferensiasi)',
    tanggalDokumen: '4 November 2026',
  },
  bagian2_desainDeepLearning: {
    pilarMindful: [
      'Mindful Breathing 2 menit di awal sesi untuk memusatkan fokus dan relaksasi otak sebelum memulai materi.',
      'Sesi hening eksplorasi taktil: Menyentuh tekstur permukaan daun segar dan mencermati stomata dengan kaca pembesar penuh rasa ingin tahu.',
      'Pemberian jeda "Stop and Think" saat mengamati perubahan warna larutan uji tanpa distraksi gawai.',
    ],
    pilarMeaningful: [
      'Mengaitkan konsep fotosintesis dengan kualitas udara perkotaan Yogyakarta dan pentingnya ruang terbuka hijau (RTH).',
      'Membahas krisis ketersediaan pangan dunia dan bagaimana fotosintesis menjadi pondasi seluruh kalori makanan manusia.',
      'Siswa menemukan jawaban nyata: "Mengapa kita merasa sejuk dan segar saat berteduh di bawah pohon rindang di siang terik?".',
    ],
    pilarJoyful: [
      'Tantangan mini "Investigator Daun Hijau": Game kolaboratif mencari daun dengan spektrum warna berbeda di halaman sekolah.',
      'Eksperimen visual interaktif perubahan warna tetesan lugol/iodium yang memicu rasa takjub (wonder & awe).',
      'Apresiasi "Bintang Refleksi" antar kelompok untuk saling memuji kerja sama tim yang kompak.',
    ],
    pertanyaanPemantik: [
      'Dari mana sebatang pohon beringin raksasa mendapatkan massanya jika mereka hanya menancap di tanah kecil?',
      'Apa yang akan terjadi pada napas kita andai seluruh tumbuhan hijau di muka bumi berhenti memproduksi makanan selama satu minggu?',
    ],
    profilPelajarPancasila: [
      'Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia (menghargai ciptaan alam)',
      'Bernalar Kritis (menganalisis variabel uji fotosintesis)',
      'Gotong Royong (bekerja sama dalam tim laboratorium mini)',
    ],
    saranaPrasarana: [
      'Daun singkong/bayam segar, pipet tetes, larutan iodium/betadine, gelas beker, air hangat.',
      'Lembar Kerja Peserta Didik (LKPD) cetak warna, infografis fotosintesis, LCD Proyektor.',
    ],
    pemahamanBermakna: 'Tumbuhan adalah pabrik kehidupan di bumi; dengan menjaga kelestarian pohon, kita secara langsung menjaga napas dan keberlanjutan hidup generasi mendatang.',
  },
  bagian3_langkahPembelajaran: {
    pendahuluan: {
      waktu: '10 Menit',
      kegiatan: [
        'Pendidik menyapa siswa dengan senyum hangat, mengecek kesiapan fisik dan psikis kelas, dilanjutkan doa pembuka.',
        'Mindful Breathing: Pendidik memandu tarikan napas dalam 4 detik, tahan 4 detik, dan hembuskan perlahan sambil mengamati sensasi udara segar yang dihirup.',
        'Apersepsi Menyenangkan: Guru memperlihatkan sepotong roti dan sebuah daun hijau, menanyakan: "Apakah roti ini punya kaitan erat dengan daun hijau?".',
        'Penyampaian tujuan pembelajaran, kriteria ketercapaian, dan alur eksperimen seru yang akan dijalankan.',
      ],
    },
    kegiatanInti: {
      tahapMemahami: {
        fokusPilar: 'Mindful Inquiry & Eksplorasi Konsep',
        waktu: '20 Menit',
        kegiatan: [
          'Siswa mengamati video mikro pergerakan kloroplas pada sel daun Elodea di bawah mikroskop.',
          'Pendidik mengajukan pertanyaan pemantik mengenai bahan baku fotosintesis (CO2, H2O, cahaya matahari, dan klorofil).',
          'Siswa mencatat kata kunci penting dalam diagram alir fotosintesis di lembar kerja masing-masing dengan penuh ketelitian.',
        ],
      },
      tahapMengalami: {
        fokusPilar: 'Joyful Collaboration & Hands-on Experiment',
        waktu: '35 Menit',
        kegiatan: [
          'Siswa berkelompok (4-5 orang) melakukan pengujian sederhana amilum menggunakan tetesan cairan iodium pada daun tertutup vs terbuka.',
          'Siswa mencatat gradasi perubahan warna biru kehitaman yang muncul dengan antusiasme tinggi.',
          'Guru berkeliling memberikan bimbingan diferensiasi bagi kelompok yang membutuhkan scaffolding teknis.',
          'Kelompok mendiskusikan hasil temuan dan merumuskan kesimpulan logis mengapa bagian daun yang terkena sinar matahari menghasilkan amilum.',
        ],
      },
      tahapMengaplikasikan: {
        fokusPilar: 'Meaningful Synthesis & Authentic Reflection',
        waktu: '15 Menit',
        kegiatan: [
          'Setiap kelompok mempresentasikan temuan menarik mereka dalam durasi 2 menit menggunakan papan mini pameran karya.',
          'Kelompok lain memberikan tanggapan apresiatif menggunakan rubrik rekan sejawat.',
          'Siswa menghubungkan hasil praktikum dengan fenomena deforestasi dan menyusun komitmen pribadi merawat 1 tanaman di rumah.',
        ],
      },
    },
    penutup: {
      waktu: '10 Menit',
      kegiatan: [
        'Pendidik bersama peserta didik menyimpulkan hikmah penting fotosintesis sebagai anugerah penopang kehidupan.',
        'Refleksi Joyful: Siswa menuliskan satu kalimat kesan belajar di "Pohon Refleksi" (stiker tempel).',
        'Pendidik memberikan apresiasi bintang kerja sama bagi semua kelompok.',
        'Doa bersama dan penutup pembelajaran.',
      ],
    },
  },
  bagian4_asesmen: {
    asesmenDiagnostik: 'Kuis interaktif 3 pertanyaan cepat di awal untuk memetakan pemahaman prasyarat tentang bagian-bagian tumbuhan dan ekosistem.',
    asesmenFormatif: 'Lembar observasi keterampilan praktikum (keterlibatan tim, ketepatan meneteskan larutan, dan pencatatan data) serta keaktifan tanya jawab.',
    asesmenSumatif: 'Penyelesaian lembar analisis hasil uji fotosintesis dan penyusunan poster mini edukasi konservasi pohon (rubrik terlampir).',
    instrumenPenilaian: [
      'Lembar Observasi Sikap Profil Pelajar Pancasila',
      'Rubrik Unjuk Kerja Praktikum Sains',
      'Tes Tertulis Pemahaman Konseptual Bermakna',
    ],
    tindakLanjut: 'Remedial: Pendampingan sebaya untuk mengulang diagram fotosintesis. Pengayaan: Proyek mini menganalisis pengaruh warna cahaya mika (merah/biru) pada laju fotosintesis tanaman air Hydrilla.',
  },
  bagian5_lampiran: {
    ringkasanMateri: 'Fotosintesis adalah reaksi biokimia pembentukan karbohidrat (glukosa) dari karbon dioksida dan air oleh tumbuhan berklorofil dengan bantuan energi cahaya matahari. Reaksi ini menghasilkan produk samping berupa gas oksigen yang sangat esensial bagi pernapasan makhluk hidup di bumi. Persamaan kimia umum: 6CO2 + 6H2O + Energi Cahaya -> C6H12O6 + 6O2.',
    lembarKerjaPesertaDidik: {
      judul: 'LKPD Pembelajaran Mendalam: Menyingkap Rahasia Pabrik Kehidupan Daun Hijau',
      petunjuk: [
        'Bekerjasamalah secara harmonis dan saling menghargai pendapat rekan kelompok.',
        'Gunakan kacamata pelindung dan tangani peralatan praktikum dengan hati-hati.',
        'Catat setiap perubahan warna dan fenomena yang terlihat apa adanya.',
      ],
      tugasAktivitas: [
        'Aktivitas 1: Amati dua daun (daun A yang ditutup kertas timah vs daun B yang terbuka terkena sinar matahari). Teteskan 2 tetes cairan uji iodium.',
        'Aktivitas 2: Catat perbedaan warna yang terjadi pada tabel pengamatan dan diskusikan faktor pemicunya.',
        'Aktivitas 3 (Refleksi): Jelaskan apa yang akan terjadi pada ketersediaan oksigen kotamu jika pepohonan terus ditebang tanpa penanaman kembali.',
      ],
    },
    rubrikPenilaian: [
      {
        kriteria: 'Penguasaan Konsep Fotosintesis',
        berkembang: 'Menyebutkan bahan dan hasil fotosintesis dengan bantuan bimbingan guru.',
        cakap: 'Mampu menjelaskan alur proses fotosintesis dan peranan cahaya matahari secara mandiri.',
        mahir: 'Menganalisis hubungan sebab-akibat faktor pembatas fotosintesis dan mengaitkannya dengan fenomena perubahan iklim global.',
      },
      {
        kriteria: 'Keterampilan Menyelidiki & Praktikum',
        berkembang: 'Mengikuti instruksi praktikum namun masih membutuhkan supervisi ketat.',
        cakap: 'Melakukan langkah pengujian amilum secara tepat, tertib, dan mencatat data pengamatan akurat.',
        mahir: 'Melakukan pengujian secara presisi, cermat dalam menjaga variabel kontrol, dan mampu menganalisis sumber galat eksperimen.',
      },
      {
        kriteria: 'Sikap Mindful & Kolaborasi Positif',
        berkembang: 'Cenderung bekerja sendiri dalam kelompok.',
        cakap: 'Berpartisipasi aktif dalam pembagian tugas dan mendengarkan instruksi dengan saksama.',
        mahir: 'Menunjukkan kehadiran penuh (mindful), saling memotivasi rekan satu tim, dan mengapresiasi keberagaman ide kelompok.',
      },
    ],
    glosarium: [
      { istilah: 'Klorofil', arti: 'Zat hijau daun yang berfungsi menangkap energi cahaya matahari untuk fotosintesis.' },
      { istilah: 'Amilum', arti: 'Bentuk karbohidrat kompleks hasil penyimpanan cadangan makanan pada tumbuhan.' },
      { istilah: 'Stomata', arti: 'Mulut daun tempat pertukaran gas karbon dioksida dan oksigen.' },
      { istilah: 'Mindful Learning', arti: 'Pendekatan belajar dengan kesadaran penuh, fokus hadir pada saat ini, dan reflektif.' },
    ],
  },
};
