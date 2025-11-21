# Dokumentasi Arsitektur

## Ringkasan
Prototipe ini mendemonstrasikan aplikasi e-commerce multi-tenant menggunakan Next.js App Router. Aplikasi ini mendukung isolasi data yang ketat antar tenant dan menangani skenario checkout dengan konkurensi tinggi.

## Multi-tenancy & Isolasi Data
- **Routing**: Tenant diidentifikasi melalui path URL `/:tenant/...`.
- **Middleware**: `middleware.ts` memvalidasi tenant terhadap daftar tenant yang diizinkan (`brand-a`, `brand-b`). Tenant yang tidak valid akan dialihkan atau diblokir.
- **Akses Data**: Semua akses data melalui `lib/store.ts`. Fungsi `getTenantData` memerlukan `tenantId` dan secara ketat hanya mengembalikan data untuk kunci tenant tersebut. Ini memastikan bahwa Tenant A tidak dapat mengakses data Tenant B.
- **Tema**: Tema spesifik tenant (misalnya, warna utama) disimpan di data store dan diterapkan melalui `app/[tenant]/layout.tsx`.

## Caching & ISR
- **Halaman Katalog**: Menggunakan Incremental Static Regeneration (ISR) dengan `revalidate = 60`. Ini berarti halaman katalog bersifat statis tetapi diperbarui setiap 60 detik, menyeimbangkan performa dan kesegaran data.
- **Halaman Produk**: Dynamic rendering (default) untuk memastikan pengecekan stok secara real-time, atau bisa juga menggunakan ISR dengan pengambilan stok di sisi klien. Dalam prototipe ini, saya mengambil data di server untuk kesederhanaan, tetapi checkout akan memperbarui stok.

## Penanganan Race Condition
- **Masalah**: Ketika beberapa pengguna mencoba membeli item terakhir secara bersamaan, logika read-then-write standar bisa gagal (overselling).
- **Simulasi**: Fungsi `decrementStock` di `lib/store.ts` menyertakan `delay(100)` antara membaca stok dan menulis stok baru. Ini secara artifisial memperlebar jendela race condition.
- **Reproduksi**: Skrip `reproduce_race.sh` mengirimkan 15 permintaan bersamaan untuk item dengan stok 10. Tanpa penguncian yang tepat, stok bisa turun di bawah 0.
- **Solusi (Tidak sepenuhnya diimplementasikan dalam prototipe)**: Dalam sistem nyata, saya akan menggunakan transaksi database dengan `SELECT FOR UPDATE` atau optimistic locking (versioning). Dalam prototipe in-memory ini, Node.js bersifat single-threaded sehingga "race" disimulasikan melalui penundaan async. Untuk memperbaikinya di sini, saya akan membutuhkan mutex atau antrian untuk bagian kritis tersebut.

## Trade-offs
- **In-Memory Store**: Cepat tetapi tidak persisten. Bagus untuk prototyping.
- **Path-based Tenancy**: Mudah diimplementasikan tetapi kurang "white-label" dibandingkan berbasis subdomain.
- **Client-side Tabs**: UX yang lebih baik daripada memuat ulang halaman untuk konten sederhana.
