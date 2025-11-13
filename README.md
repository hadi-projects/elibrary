# Elibrary

Ini adalah aplikasi Elibrary React modern untuk platform perpustakaan digital, yang disebut "Elibrary". Aplikasi ini dibangun sebagai aplikasi halaman tunggal (Single Page Application) dengan beberapa komponen interaktif dan alur navigasi.

[DEMO](https://drive.google.com/file/d/1K-_g2rQjLzlrG9j9AQym-uov2DZpEw5H/view?usp=sharing)
[Postman Collection](./Elibrary.postman_collection.json)

Fitur Utama
Aplikasi ini mencakup beberapa fitur inti yang dibangun dalam satu file React:
- Navigasi Halaman (Routing Sederhana):
    - Home: Halaman arahan utama (HomePage) yang menampilkan bagian Hero, pratinjau katalog, dan testimoni.
    - Login: Halaman (LoginPage) dengan formulir untuk masuk.
    - Register: Halaman (RegisterPage) dengan formulir untuk pendaftaran akun baru.
    - Profile: Halaman (ProfilePage) di mana pengguna (secara simulasi) dapat memperbarui info mereka dan logout.

- Komponen Interaktif (Modal):
    - Modal Tambah Buku: Dipicu dari header, memungkinkan pengguna (secara simulasi) menambahkan buku baru. Ini termasuk:
    - Input formulir untuk Judul, Penulis, Deskripsi.
    - Dropdown (select) untuk Kategori.
    - Input upload file untuk sampul buku.
    - Fitur pratinjau gambar sampul sebelum diunggah.
    - Modal Detail Buku: Muncul ketika sebuah kartu buku di katalog diklik, menampilkan informasi lebih rinci tentang buku tersebut (sampul, judul, penulis, deskripsi).

- Fungsionalitas Katalog:
    - Menampilkan daftar buku dalam format kartu (card).
    - Tombol Favorit (ikon hati) pada setiap kartu yang dapat di-toggle (status terisi/kosong) untuk menandai buku favorit (simulasi).

- Desain Responsif:
    - Header (navbar) yang dapat diciutkan (collapsible) untuk perangkat mobile.
    - Layout grid yang beradaptasi dengan ukuran layar.
    - Komponen-komponen dibangun menggunakan Tailwind CSS untuk utilitas responsif.

Teknologi yang Digunakan
- React: (v18+) Menggunakan Functional Components dan React Hooks (useState, useEffect).
- Tailwind CSS: Digunakan untuk semua styling. Aplikasi ini mengasumsikan Tailwind CSS tersedia di lingkungan proyek.
- SVG In-line: Ikon (Pencarian, Menu, Hati, Tutup) disematkan langsung sebagai komponen JSX untuk mengurangi dependensi eksternal.



----

## How to run

This is a simple e-library api using expressjs for backend library and using react for frontend. Dilengkapi dengan autentikasi sederhana dengan JWT.

### Prerequisites
- Nodesjs (LTS preferred)
- Mysql Database

### Start Backend Api
1. Clone repository
    ```sh
    git clone https://github.com/hadi-projects/elibrary.git
    cd elibrary
    ```
2. Install depedendcy
    ```sh
    npm install
    ```
3. Configure .env file
    ```sh
    cp .env.example .env
    # update .env with your database and jwt setup
    ```
4. Run Database Migration
    ```sh
    npm run db:migrate
    ```
4. Run Database Seed (Optional)
    ```sh
    npm run db:seed
    ```
5. Run Server
    ```sh
    npm run start
    ```

### Start Frontend
After you clone and setup backend api, continue setup frontend, from another terminal
1. Move to frontend diractory
    ```sh
    cd frontend
    ```
2. Install depedendcy
    ```sh
    npm install
    ```
3. Run development mode
    ```sh
    npm run dev
    ```
And then open `http://localhost:5173/`

### Default Account
```sh
# Admin
email: admin@mail.com
password: Admin1234

# User
email: hadi@mail.com
password: Hadi1234
```


### Build Frontend
1. Build frontend for production
    ```sh
    npm run build
    ```