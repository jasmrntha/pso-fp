# Buku Resep
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/c088798d-0757-4b80-8205-0b8e1f49f913" />

Website **Buku Resep** adalah aplikasi penyimpanan resep yang menyediakan fitur login, registrasi, dan penambahan resep. Untuk menjaga kualitas dan kecepatan pengembangan, kami menerapkan pendekatan **DevOps** menggunakan **CI/CD Pipeline** dan berbagai alat bantu otomatisasi.

## Anggota Kelompok

- Agnes Juliana (5026221006)
- Dewi Maharani (5026221046)
- Mufidhatul Nafisa (5026221035)
- Jasmine Saimarantha Br Ginting (5026221107)

## ✨ Fitur Website
- **Landing Page**: Melihat resep dari semua pengguna.
- **Detail Resep**: Melihat detail resep, bahan beserta ukurannya dan langkah-langkah. 
- **Login & Register**: Membuat dan masuk ke dalam akun pengguna. 
- **Dashboard Pengguna**: Melihat resep yang pernah dibuat.
- **Manajemen Resep**: Menambahkan, mengedit dan menghapus resep milik pengguna. 

## 📚 Technology Stack
#### Frontend
- **Next.js** – Framework React modern untuk membuat aplikasi web dengan rendering sisi server (SSR) dan static site generation (SSG).
- **TypeScript** – Superset JavaScript yang menambahkan pengetikan statis untuk meningkatkan keandalan dan skalabilitas kode.
- **Tailwind** – Utility-first CSS framework untuk membangun UI yang responsif dan konsisten secara efisien.
- **NextUI** – Komponen UI modern dan stylish yang terintegrasi dengan baik dalam proyek Next.js.

#### Backend
Backend untuk aplikasi ini berada pada server terpisah yang telah tersedia (https://recipe-api.betau.asia/api)

#### Infrastruktur Server
- **VPS** – Server virtual untuk hosting aplikasi dengan kontrol penuh.
- **PM2** – Process manager Node.js untuk menjaga aplikasi tetap aktif.
- **Nginx** – Reverse proxy untuk routing trafik dan handle HTTPS.

#### Development & Testing
- **Yarn** – Manajer paket JavaScript cepat dan efisien.
- **ESLint** – Alat untuk cek kualitas dan konsistensi kode.
- **Jest** – Framework untuk unit testing JavaScript.
- **SonarQube** – Analisis kode untuk deteksi bug dan kualitas.

## 🦋 Getting Started
### Prerequisites
- Node js versi > 18
- Yarn (atau package manager lain)

### Local Development

1. **Clone repository**

   ```bash
   git clone https://github.com/jasmrntha/pso-fp.git
   ```

2. **Masuk ke repository**

   ```bash
   cd pso-fp
   ```

3. **Install dependencies**

   ```bash
   yarn install
   ```

4. **Buat file `.env`**
Duplikat `.env.example` lalu ubah `NEXT_PUBLIC_API_URL=` ke URL API yang digunakan, misalnya:

   ```
   NEXT_PUBLIC_API_URL=https://recipe-api.betau.asia/api
   ```

5. **Build project**

   ```bash
   yarn build
   ```

6. **Start project**

   ```bash
   yarn start
   ```
7. **Akses aplikasi**

    ```bash
    http://localhost:3000/
    ```

## 📊 CI/CD Pipeline
<img width="925" alt="image" src="https://github.com/user-attachments/assets/74452d54-b8f6-4070-ab24-2b8548254c4f" />

Berikut adalah versi yang telah dirapikan baik dari segi **kalimat** maupun **Markdown**:

### 🧪 Step 1: Continuous Integration (CI)

#### 📄 File: `ci.yml`

#### 🔁 Trigger: Push ke semua branch

#### ⚙️ Workflow:

```
1. Install dependencies
2. Jalankan script lint untuk memastikan kode sesuai standar (ESLint)
3. Jalankan script test untuk menjalankan unit test (Jest)
4. Daftar file hasil coverage untuk memastikan test berhasil
5. Jalankan SonarQube untuk menganalisis kualitas kode dan coverage
```

### 🚀 Step 2: Continuous Deployment (CD)

#### 📄 File: `cd-prod.yml`

#### 🔁 Trigger: Setelah pipeline CI berhasil

#### ⚙️ Workflow:

```
1. Login ke server menggunakan SSH credentials dari GitHub Secrets
2. Export path Node.js dari NVM
3. Simpan perubahan lokal dengan git stash
4. Checkout ke branch production
5. Pull kode terbaru dengan git pull --rebase
6. Jalankan yarn install untuk memastikan semua dependensi terpasang
7. Jalankan yarn build untuk membuild aplikasi Next.js
8. Restart aplikasi menggunakan PM2 dengan nama proses yang telah ditentukan
9. Restart Nginx untuk menerapkan perubahan server
```

## 🔥 Live Preview
#### Website https://recipe.betau.asia/

#### Sonar Result
<img width="758" alt="image" src="https://github.com/user-attachments/assets/f7832649-8a0a-4a72-b428-ea7312892363" />


### 🛠️ Challenge Encountered
#### Tingginya Threshold Coverage di SonarCloud Free Tier
SonarCloud secara default menetapkan ambang coverage kualitas minimal sebesar 80%, tanpa opsi untuk menyesuaikan threshold pada akun gratis. Hal ini menjadi tantangan karena codebase memiliki lebih dari 90.000 baris kode, namun yang dites hanya 3 file. Akibatnya, project langsung gagal dalam quality gate karena coverage secara keseluruhan menjadi sangat rendah.

#### Kendala Akses VPS Menggunakan SSH
Proses integrasi dan pengujian melalui server VPS menghadapi kendala karena perlu mencoba berbagai kombinasi konfigurasi SSH agar berhasil terhubung. Ini memakan waktu dan menyulitkan automasi, terutama saat testing pipeline dari CI/CD lokal.

#### Codebase dari Repository Clone Tidak Siap Jalan
Repository yang dikloning mengandung berbagai error dan dependensi rusak. Sebagian file belum berfungsi karena konfigurasi environment yang belum lengkap atau perbedaan versi dependensi, sehingga memerlukan debugging tambahan untuk bisa menjalankan dan menguji secara lokal maupun di CI.


