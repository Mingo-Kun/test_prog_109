# Panduan - Prototipe E-Commerce Multi-tenant

Saya telah membangun prototipe e-commerce multi-tenant menggunakan Next.js App Router.

## Fitur yang Diimplementasikan
- **Multi-tenancy**: Dukungan untuk `brand-a` dan `brand-b` dengan isolasi data.
- **Halaman Katalog**: Katalog dengan dukungan ISR di `/[tenant]`.
- **Halaman Produk**: Detail produk dinamis dengan komponen Tabs di `/[tenant]/product/[id]`.
- **Checkout**: Rute API yang mensimulasikan pemrosesan pesanan dan race condition.
- **Arsitektur**: Didokumentasikan di `ARCHITECTURE_ID.md`.

## Cara Menjalankan

1.  **Install Dependencies**:
    ```bash
    bun install
    ```

2.  **Jalankan Server Pengembangan**:
    ```bash
    bun dev
    ```

3.  **Akses Aplikasi**:
    - Brand A: [http://localhost:3000/brand-a](http://localhost:3000/brand-a)
    - Brand B: [http://localhost:3000/brand-b](http://localhost:3000/brand-b)

## Memverifikasi Race Condition

1.  Pastikan server sedang berjalan.
2.  Jalankan skrip reproduksi:
    ```bash
    ./reproduce_race.sh
    ```
3.  Skrip mengirimkan 15 permintaan bersamaan untuk produk dengan stok 10.
4.  Periksa log server atau refresh halaman produk untuk melihat apakah stok turun di bawah 0 (menandakan race condition).
