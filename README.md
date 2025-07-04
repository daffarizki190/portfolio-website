# Portfolio Daffa

## Deskripsi Proyek

Portfolio website untuk menampilkan profil, keterampilan, dan pengalaman profesional. Dibangun dengan React dan Tailwind CSS untuk tampilan yang modern dan responsif.

## Teknologi yang Digunakan

- **React**: Library JavaScript untuk membangun antarmuka pengguna
- **Tailwind CSS**: Framework CSS untuk styling yang cepat dan konsisten
- **Vite**: Build tool yang cepat untuk pengembangan modern
- **AnimeJS**: Library animasi JavaScript

## Struktur Proyek

```
├── public/              # Aset statis
├── src/                 # Kode sumber
│   ├── assets/          # Gambar, video, dan aset lainnya
│   ├── components/      # Komponen React
│   ├── data/            # Data statis (tema, pengalaman, dll)
│   ├── hooks/           # Custom React hooks
│   ├── App.jsx          # Komponen utama
│   ├── main.jsx         # Entry point
│   └── index.css        # Styling global
├── .eslintrc.js         # Konfigurasi ESLint
├── jsconfig.json        # Konfigurasi JavaScript
├── tailwind.config.js   # Konfigurasi Tailwind CSS
└── vite.config.js       # Konfigurasi Vite
```

## Custom Hooks

Proyek ini menggunakan beberapa custom hooks untuk memisahkan logika dari komponen:

- **useActiveSection**: Mengelola bagian aktif berdasarkan scrolling
- **useAnimation**: Mengelola animasi dengan AnimeJS
- **useMenu**: Mengelola state menu navigasi
- **useTheme**: Mengelola tema aplikasi
- **useScrollPosition**: Melacak posisi scroll
- **useMediaQuery**: Mendeteksi ukuran layar
- **useForm**: Mengelola state dan validasi form

Lihat dokumentasi lengkap di `src/hooks/README.md`.

## Praktik Terbaik yang Diterapkan

1. **Pemisahan Komponen**: Memecah UI menjadi komponen yang dapat digunakan kembali
2. **Custom Hooks**: Memisahkan logika dari komponen untuk meningkatkan keterbacaan
3. **JSDoc**: Dokumentasi kode untuk meningkatkan pemahaman
4. **Struktur Folder**: Organisasi file yang jelas dan terstruktur
5. **Error Handling**: Penanganan kesalahan dengan ErrorBoundary
6. **Responsive Design**: Tampilan yang responsif untuk berbagai ukuran layar
7. **Aksesibilitas**: Memperhatikan aspek aksesibilitas dengan ESLint plugin jsx-a11y

## Cara Menjalankan

1. Clone repositori
2. Install dependensi: `npm install`
3. Jalankan server pengembangan: `npm run dev`
4. Buka browser di `http://localhost:5173`

## Build untuk Produksi

```bash
npm run build
```

File hasil build akan tersedia di folder `dist/`.

## Linting

```bash
npm run lint
```

## Preview Build

```bash
npm run preview
```
