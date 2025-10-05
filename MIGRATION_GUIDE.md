# Migrasi dari Firebase Storage ke Local File Storage

## Perubahan yang Dilakukan

### 1. Middleware Multer (`src/middleware/multer.js`)
- **SEBELUM**: Menggunakan `memoryStorage` untuk menyimpan file di memory sebelum upload ke Firebase
- **SESUDAH**: Menggunakan `diskStorage` untuk menyimpan langsung ke folder lokal
- **Lokasi penyimpanan**: `src/uploads/templates/`
- **Format filename**: `{timestamp}_{originalName}.{extension}`
- **Validasi**: JPEG, JPG, PNG dengan maksimal 5MB

### 2. Controller Sertifikat (`src/controllers/sertifikat.controller.js`)
#### Fungsi yang Diubah:
- `addTemplate`: Menyimpan file ke local storage dengan error handling yang lebih baik
- `deleteTamplate`: Menghapus file dari local storage dan database
- `getTemplateByID`: Perbaikan response format dan error handling
- `getAllTemplate`: Perbaikan response format

#### Fungsi Baru:
- `updateTemplate`: Mengupdate template (gambar dan/atau kategori)
- `getTemplateByUserID`: Mendapatkan template berdasarkan user ID
- `isValidImageFile`: Helper function untuk validasi file
- `getAbsolutePath`: Helper function untuk mendapatkan path absolut

### 3. Model Sertifikat (`src/models/sertifikat.js`)
#### Fungsi Baru:
- `getTemplateByUserID`: Query untuk mendapatkan template berdasarkan user ID
- `updateTemplate`: Query untuk mengupdate template

### 4. Routes (`src/routes/sertifikat.routes.js`)
#### Endpoint Baru:
- `GET /api-sertifikat/template/:id` - Mendapatkan template berdasarkan ID
- `GET /api-sertifikat/template/user/my-templates` - Mendapatkan template user yang login
- `GET /api-sertifikat/templates` - Mendapatkan semua template
- `POST /api-sertifikat/template` - Menambah template baru
- `PUT /api-sertifikat/template/:id` - Mengupdate template
- `DELETE /api-sertifikat/template/:id` - Menghapus template

#### Endpoint Lama (Backward Compatibility):
- Routes lama tetap dipertahankan untuk kompatibilitas

### 5. File Helper (`src/utils/fileHelper.js`)
Utilitas baru untuk manajemen file:
- `initializeUploadDirectories`: Membuat direktori uploads saat startup
- `getFileInfo`: Mendapatkan informasi file
- `deleteFile`: Menghapus file dengan error handling
- `cleanupOldFiles`: Membersihkan file lama (optional)

### 6. Server Configuration (`src/index.js`)
- Menginisialisasi direktori uploads saat startup aplikasi
- Static file serving sudah dikonfigurasi untuk folder `/uploads`

## Struktur Folder Baru
```
src/
├── uploads/
│   └── templates/          # Folder untuk menyimpan template sertifikat
├── utils/
│   └── fileHelper.js       # Utilitas untuk manajemen file
├── controllers/
├── models/
├── routes/
└── middleware/
```

## API Endpoints

### Menambah Template
```http
POST /api-sertifikat/template
Content-Type: multipart/form-data
Authorization: Bearer {token}

Body:
- template: File (image/jpeg, image/jpg, image/png, max 5MB)
- kategori: String
```

### Mendapatkan Semua Template
```http
GET /api-sertifikat/templates
```

### Mendapatkan Template Berdasarkan ID
```http
GET /api-sertifikat/template/{id}
```

### Mendapatkan Template User yang Login
```http
GET /api-sertifikat/template/user/my-templates
Authorization: Bearer {token}
```

### Mengupdate Template
```http
PUT /api-sertifikat/template/{id}
Content-Type: multipart/form-data
Authorization: Bearer {token}

Body:
- template: File (optional - jika ingin ganti gambar)
- kategori: String (optional - jika ingin ganti kategori)
```

### Menghapus Template
```http
DELETE /api-sertifikat/template/{id}
Authorization: Bearer {token}
```

## Response Format

### Success Response
```json
{
  "message": "Success message",
  "success": true,
  "data": {
    // data object
  }
}
```

### Error Response
```json
{
  "message": "Error message",
  "success": false,
  "error": "Detailed error message"
}
```

## File URL Format
Template dapat diakses melalui URL:
```
http://localhost:{PORT}/uploads/templates/{filename}
```

## Keamanan dan Validasi
1. **File Type**: Hanya menerima JPEG, JPG, PNG
2. **File Size**: Maksimal 5MB
3. **Authentication**: Endpoint yang memerlukan auth menggunakan JWT
4. **File Naming**: Menggunakan timestamp untuk menghindari konflik nama
5. **Error Handling**: File akan dihapus jika terjadi error saat menyimpan ke database

## Backup dan Maintenance
- File lama dapat dibersihkan menggunakan `cleanupOldFiles` utility
- Direktori akan dibuat otomatis saat startup aplikasi
- File yang gagal upload akan dibersihkan otomatis

## Migration Notes
1. **Hapus Dependencies Firebase**: Setelah testing, bisa menghapus `firebase` dari package.json
2. **Environment Variables**: Firebase config tidak lagi diperlukan
3. **Database**: Struktur database tidak berubah, hanya cara penyimpanan file
4. **URL Format**: URL template berubah dari Firebase URL ke local URL

## Testing
Untuk testing, pastikan:
1. Folder `src/uploads/templates` dapat dibuat dan diakses
2. File dapat diupload, diupdate, dan dihapus
3. Static file serving berfungsi untuk mengakses gambar
4. Error handling berjalan dengan baik saat file tidak dapat diproses