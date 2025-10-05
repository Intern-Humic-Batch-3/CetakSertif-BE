# Testing API Template Sertifikat

## File untuk Testing
Siapkan file gambar (JPEG/JPG/PNG) dengan ukuran maksimal 5MB untuk testing.

## 1. Menambah Template Baru
```bash
curl -X POST http://localhost:3000/api-sertifikat/template \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "template=@path/to/your/image.jpg" \
  -F "kategori=Sertifikat Kelulusan"
```

**Contoh Response:**
```json
{
  "message": "Berhasil mengupload template",
  "success": true,
  "data": {
    "id": "uuid-generated-id",
    "fileUrl": "/uploads/templates/1728123456789_template.jpg",
    "kategori": "Sertifikat Kelulusan",
    "filename": "1728123456789_template.jpg"
  }
}
```

## 2. Mendapatkan Semua Template
```bash
curl -X GET http://localhost:3000/api-sertifikat/templates
```

## 3. Mendapatkan Template Berdasarkan ID
```bash
curl -X GET http://localhost:3000/api-sertifikat/template/{template-id}
```

## 4. Mendapatkan Template User yang Login
```bash
curl -X GET http://localhost:3000/api-sertifikat/template/user/my-templates \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 5. Mengupdate Template
### Update hanya kategori:
```bash
curl -X PUT http://localhost:3000/api-sertifikat/template/{template-id} \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "kategori=Sertifikat Baru"
```

### Update gambar dan kategori:
```bash
curl -X PUT http://localhost:3000/api-sertifikat/template/{template-id} \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "template=@path/to/new/image.jpg" \
  -F "kategori=Sertifikat Updated"
```

## 6. Menghapus Template
```bash
curl -X DELETE http://localhost:3000/api-sertifikat/template/{template-id} \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 7. Mengakses File Template
Setelah template berhasil diupload, file dapat diakses melalui URL:
```
http://localhost:3000/uploads/templates/{filename}
```

## Testing dengan Frontend (JavaScript)

### Upload Template
```javascript
const uploadTemplate = async (file, kategori, token) => {
  const formData = new FormData();
  formData.append('template', file);
  formData.append('kategori', kategori);

  try {
    const response = await fetch('http://localhost:3000/api-sertifikat/template', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    const result = await response.json();
    console.log('Upload result:', result);
    return result;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};
```

### Get All Templates
```javascript
const getAllTemplates = async () => {
  try {
    const response = await fetch('http://localhost:3000/api-sertifikat/templates');
    const result = await response.json();
    console.log('Templates:', result);
    return result;
  } catch (error) {
    console.error('Get templates error:', error);
    throw error;
  }
};
```

### Update Template
```javascript
const updateTemplate = async (templateId, file, kategori, token) => {
  const formData = new FormData();
  if (file) formData.append('template', file);
  if (kategori) formData.append('kategori', kategori);

  try {
    const response = await fetch(`http://localhost:3000/api-sertifikat/template/${templateId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    const result = await response.json();
    console.log('Update result:', result);
    return result;
  } catch (error) {
    console.error('Update error:', error);
    throw error;
  }
};
```

### Delete Template
```javascript
const deleteTemplate = async (templateId, token) => {
  try {
    const response = await fetch(`http://localhost:3000/api-sertifikat/template/${templateId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const result = await response.json();
    console.log('Delete result:', result);
    return result;
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};
```

## Error Handling
Beberapa error yang mungkin terjadi:

### File tidak valid
```json
{
  "message": "File harus berupa gambar (JPEG, JPG, PNG) dengan ukuran maksimal 5MB",
  "success": false
}
```

### Template tidak ditemukan
```json
{
  "message": "Template tidak ditemukan",
  "success": false
}
```

### Tidak ada file yang diupload
```json
{
  "message": "Harap upload template!",
  "success": false
}
```

### Kategori tidak diisi
```json
{
  "message": "Kategori wajib diisi!",
  "success": false
}
```

## Checklist Testing
- [ ] Upload file JPEG berhasil
- [ ] Upload file PNG berhasil  
- [ ] Upload file JPG berhasil
- [ ] Reject file dengan format tidak didukung (PDF, DOCX, dll)
- [ ] Reject file dengan ukuran > 5MB
- [ ] Get all templates berhasil
- [ ] Get template by ID berhasil
- [ ] Get template by user ID berhasil
- [ ] Update template (hanya kategori) berhasil
- [ ] Update template (gambar + kategori) berhasil
- [ ] Delete template berhasil
- [ ] File dapat diakses via URL
- [ ] File lama dihapus saat update
- [ ] File dihapus saat delete template
- [ ] Error handling berfungsi dengan baik