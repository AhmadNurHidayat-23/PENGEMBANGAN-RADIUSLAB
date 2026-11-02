# PENGEMBANGAN RADIUSLAB

RadiusLab adalah aplikasi web untuk mengatur lengkungan sudut elemen secara visual dan menghasilkan deklarasi CSS `border-radius`. Tujuannya membantu pengembang, desainer, dan pelajar mencoba bentuk dengan cepat tanpa menulis ulang nilai CSS secara manual. Seluruh antarmuka menggunakan bahasa Indonesia.

Desain mengikuti Swiss Editorial Minimalist dengan tiga warna utama: lavender `#F3F0FF`, indigo `#4B36D1`, dan lime `#D8F27A`. Tipografi memakai Helvetica Neue jika tersedia, dengan alternatif Inter atau Arial. Tidak ada font komersial yang diunduh. Pengaturan dan pratinjau berdampingan pada desktop serta tersusun vertikal pada mobile.

## Fitur utama

- Empat slider sudut: kiri atas, kanan atas, kanan bawah, dan kiri bawah.
- Rentang 0–200 piksel dengan langkah satu piksel.
- Pratinjau dan kode CSS yang berubah langsung.
- Sinkronisasi untuk mengatur semua sudut sekaligus.
- Validasi nilai sebelum diterapkan ke elemen dan kode.
- Salin CSS ke papan klip serta reset pengaturan.
- Dukungan pengoperasian slider melalui tombol panah.

## Cara menggunakan

Geser slider untuk membentuk sudut yang diinginkan. Nilai di sebelah label menunjukkan ukuran sudut saat ini. Aktifkan **Sinkronkan semua sudut** untuk menyamakan keempatnya dengan nilai kiri atas. Selama sinkronisasi aktif, perubahan slider mana pun berlaku untuk seluruh sudut. Menonaktifkannya mempertahankan nilai saat ini dan memungkinkan pengaturan terpisah.

Tekan **Salin CSS** lalu tempel deklarasi pada aturan CSS elemen Anda. Urutan nilai adalah kiri atas, kanan atas, kanan bawah, kemudian kiri bawah. Radius besar mengikuti penyesuaian otomatis browser ketika lengkungan saling bertemu. Tombol **Reset** mengembalikan nilai awal 64, 128, 32, dan 128 piksel dengan sinkronisasi nonaktif. Pengaturan tidak disimpan permanen.

## Teknologi dan instalasi

Laravel 13, Blade, HTML5, CSS3, Vanilla JavaScript, dan Vite. Logika radius dipisahkan dari interaksi UI. Aplikasi tidak membutuhkan database, login, atau API eksternal. Session dan cache memakai file.

Siapkan PHP 8.3.30+, Composer, serta Node.js 22.12+ yang kompatibel dengan Vite 8.

```sh
composer install
cp .env.example .env
php artisan key:generate
npm ci
npm run build
php artisan serve
```

Buka alamat dari Artisan. Pada MAMP, arahkan document root khusus aplikasi ke folder `public`; migrasi database tidak diperlukan. Jalankan `npm run dev` untuk pengembangan aset. Pengujian tersedia melalui `php artisan test` dan `npm test`.
