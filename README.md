# Aplikasi Prototype E-Commerce kecil dengan Isolasi Data (multi-tenant) dan SSR Incremental
Pilih salah satu :

1. (Tenggat waktu 3-4 hari) Bangun prototype toko online multi-tenant (brand A dan brand B) yang memakai Next.js App Router.
1.  **Install Dependencies**: `bun install`
2.  **Run Dev Server**: `bun dev`
Tiap tenant punya katalog, tema sederhana, dan halaman checkout mock.
2. (Tenggat waktu 2-3 hari) Bangun prototype toko online single-tenant (brand A) yang memakai Next.js App Router. Punya katalog produk, tema sederhana, dan halaman checkout mock.

Syarat Minimal:

- SSR untuk halaman katalog dengan incremental rendering.
- Implementasi penggunaan tabs di halaman produk untuk setiap produk yang diklik.
- (Khusus untuk multi-tenant) Isolasi data tenant: tidak boleh ada kemungkinan satu tenant membaca data tenant lain pada runtime.
- Checkout fake: API route membuat “order” ke mock persisted store; simulasikan race condition ketika 2 request memesan stok terakhir.

Teknis:

- Jelaskan arsitektur isolasi data dan bagaimana Anda mencegah cross-tenant leakage (khusus untuk multi-tenant).
- Tunjukkan mekanisme cache dan skenario invalidasi.
- Tangani race condition dengan strategi yang bisa diuji secara manual.
- Sertakan diagram arsitektur singkat dan trade-offs keputusan Anda.

Deliverable:

- Repo dengan README, script run, tenant demo, langkah reproduksi race condition, dan file arsitektur.
- Invite github @dev-insoftasia ke repo tersebut.

