# Buku Resep

Website **Buku Resep** adalah aplikasi penyimpanan resep yang menyediakan fitur login, registrasi, dan penambahan resep. Untuk menjaga kualitas dan kecepatan pengembangan, kami menerapkan pendekatan **DevOps** menggunakan **CI/CD Pipeline** dan berbagai alat bantu otomatisasi.

## Anggota Kelompok

- Agnes Juliana (5026221006)
- Dewi Maharani (5026221046)
- Mufidhatul Nafisa (5026221035)
- Jasmine Saimarantha Br Ginting (5026221107)

## Bagaimana dengan Backendnya?
intinya backend ada di server lain, anggep aja ambil dari yang sudah ada

## Cara menjalankan project
deskripsi?

### Install dependencies yang diperlukan

### Nonaktifkan CI/CD

### Jalankan script build

### Jalankan script start

### Alternatif lain: Jalankan script dev 
tanpa build juga bisa jalan

## Cara kerja CI/CD
deskripsi
pastikan sudah set secret key yang diperlukan

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
- apabila deploy ke vercel
set usernme untuk vercel agar dapat bypass fitur vercel
deploy ke vercel pakai curl
- apabila deploy ke VPS
masuk ke folder website di VPS
stash update
fetch update
pull rebase dari main
install di VPS
build di VPS
restart pm2 
restart nginx

