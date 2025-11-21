## Cara Menjalankan

1.  **Install Dependencies**: `bun install`
2.  **Jalankan Dev Server**: `bun dev`
3.  **Kunjungi**: `http://localhost:3000/brand-a` atau `http://localhost:3000/brand-b`

## Reproduksi Race Condition

Jalankan `./reproduce_race.sh` saat server sedang berjalan. Ini mensimulasikan 15 pesanan bersamaan untuk 10 item.

## Arsitektur

Lihat [ARCHITECTURE_ID.md](./ARCHITECTURE_ID.md) untuk detail tentang isolasi dan desain.
