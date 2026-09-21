# Obersai AI Gateway Docs

Website dokumentasi untuk gateway berbasis [New API](https://github.com/QuantumNous/new-api).

## Tech stack

- React 19
- Vite
- TypeScript
- Tailwind CSS 4
- shadcn/ui dengan Radix UI

## Jalankan lokal

```powershell
npm install
npm run dev
```

Buka alamat lokal yang ditampilkan Vite.

## Build produksi

```powershell
npm run build
npm run preview
```

## Deploy ke Vercel

### Upload manual

1. Jalankan `npm install` lalu `npm run build`.
2. Buka [Vercel Drop](https://vercel.com/drop).
3. Seret folder `dist` atau file ZIP dari isi folder `dist`.
4. Pilih nama proyek, lalu deploy.

### Import repository

1. Push folder ini ke repository Git dan import di Vercel.
2. Pilih **Framework Preset: Vite**.
3. Gunakan Build Command `npm run build`.
4. Gunakan Output Directory `dist`.
5. Deploy.

Tidak ada environment variable atau request daftar model.

## Mengubah tampilan

- Konten dan interaksi: `src/App.tsx`
- Tema dan Tailwind: `src/index.css`
- Komponen shadcn: `src/components/ui`
- Konfigurasi shadcn: `components.json`
