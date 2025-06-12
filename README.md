# Buku Resep

Website **Buku Resep** adalah aplikasi penyimpanan resep yang menyediakan fitur login, registrasi, dan penambahan resep. Untuk menjaga kualitas dan kecepatan pengembangan, kami menerapkan pendekatan **DevOps** menggunakan **CI/CD Pipeline** dan berbagai alat bantu otomatisasi.

## Anggota Kelompok

- Agnes Juliana (5026221006)
- Dewi Maharani (5026221046)
- Mufidhatul Nafisa (5026221035)
- Jasmine Saimarantha Br Ginting (5026221107)

## Bagaimana dengan Backendnya?

Backend untuk aplikasi ini berada pada server terpisah yang telah tersedia.

## Apa saja yang dibutuhkan
1. Node js versi > 18

## Cara menjalankan project
### 1. Clone repository
```git clone https://github.com/jasmrntha/pso-fp.git```

### 2. Masuk ke repository yang sudah di clone
```cd pso-fp```

### 3. Install dependencies yang diperlukan
```yarn install```

### 4. Nonaktifkan CI/CD
Tidak perlu konfigurasi tambahan untuk menjalankan secara lokal. CI/CD hanya berjalan otomatis saat push ke repository dan membtuhkan secret keys.

### 5. Jalankan script build

```yarn build```

### 6. Jalankan script start

```yarn start```

### Alternatif lain: Jalankan script dev
Apabila menjalankan dev tidak perlu melakukan build terlebih dahulu
```yarn dev```

## Cara kerja CI/CD

Proses otomatisasi deployment menggunakan GitHub Actions.
Pastikan seluruh secret key yang diperlukan sudah diatur di GitHub Secrets sebelum pipeline berjalan.

### CI

- install dependencies
- jalankan script lint untuk trigger eslint (apakah kode sudah sesuai standar)
- jalankan script test untuk trigger test coverage jest
- list file hasil coverage untuk memastikan test berhasil
- panggil sonarqube untuk melakukan scan dari hasil coverage
- build aplikasi

### CD

- pastikan CI sudah sukses
- install dependencies
- build aplikasi
### Apabila deploy ke vercel
- set usernme untuk vercel agar dapat bypass fitur vercel
- deploy ke vercel pakai curl
### Apabila deploy ke VPS
  masuk ke folder website di VPS
  stash update
  fetch update
  pull rebase dari main
  install di VPS
  build di VPS
  restart pm2
  restart nginx
