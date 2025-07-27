# Form Link Penggajian Daily Worker TDP

Aplikasi formulir pendaftaran untuk Daily Worker dengan integrasi Google Sheets.

## Fitur

- Formulir pendaftaran lengkap untuk Daily Worker
- Validasi data real-time
- Upload dokumen (KTP, KK, Buku Tabungan, Foto)
- Integrasi langsung dengan Google Sheets
- Responsive design dengan Tailwind CSS
- Pencegahan duplikasi NIK

## Setup Google Sheets Integration

### 1. Setup Google Cloud Project

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat proyek baru atau pilih proyek yang sudah ada
3. Aktifkan Google Sheets API:
   - Buka "APIs & Services" > "Library"
   - Cari "Google Sheets API"
   - Klik "Enable"

### 2. Buat Service Account

1. Buka "APIs & Services" > "Credentials"
2. Klik "Create Credentials" > "Service Account"
3. Isi nama service account (contoh: "payroll-form-service")
4. Klik "Create and Continue"
5. Skip role assignment (klik "Continue")
6. Klik "Done"

### 3. Generate Service Account Key

1. Klik pada service account yang baru dibuat
2. Buka tab "Keys"
3. Klik "Add Key" > "Create New Key"
4. Pilih "JSON" dan klik "Create"
5. File JSON akan terdownload - simpan dengan aman

### 4. Share Google Sheet

1. Buka Google Sheet Anda: https://docs.google.com/spreadsheets/d/1BNhyJfE2ejqAAXes1gz6HaBd2KijtG86xkGA1AbxXDY/edit
2. Klik tombol "Share" di pojok kanan atas
3. Masukkan email service account (dari file JSON: `client_email`)
4. Berikan akses "Editor"
5. Klik "Send"

### 5. Setup Supabase

1. Klik tombol "Connect to Supabase" di pojok kanan atas Bolt
2. Ikuti instruksi untuk setup proyek Supabase
3. Setelah setup selesai, tambahkan secret baru:
   - Nama: `GOOGLE_SERVICE_ACCOUNT_KEY`
   - Value: Seluruh isi file JSON service account (copy-paste)

### 6. Format Google Sheet

Pastikan Google Sheet memiliki header di baris pertama dengan kolom:

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z | AA | AB | AC | AD |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|----|----|----|----|
| Timestamp | OPS ID | Nama | NIK | No HP | Alamat KTP | Alamat Domisili | RT/RW | No Rumah | Kelurahan | Kecamatan | Kota | Kode Pos | Tempat Lahir | Tanggal Lahir | Umur | Jenis Kelamin | NPWP | Nama Ayah | Nama Ibu | No WA Kontak Darurat | Nama Kontak Darurat | Hubungan Kontak Darurat | No Rekening | Nama Penerima | Jenis Bank | Posisi | Contract Type | Departement | Lokasi |

## Teknologi

- React 18 dengan TypeScript
- Tailwind CSS untuk styling
- Lucide React untuk ikon
- Supabase Edge Functions untuk backend
- Google Sheets API untuk penyimpanan data

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```