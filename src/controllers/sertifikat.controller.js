const sertifikatModel = require("../models/sertifikat");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// Helper function untuk memvalidasi file gambar
const isValidImageFile = (file) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  const maxFileSize = 5 * 1024 * 1024; // 5MB
  
  return allowedMimeTypes.includes(file.mimetype) && file.size <= maxFileSize;
};

// Helper function untuk mendapatkan path absolut file
const getAbsolutePath = (relativePath) => {
  return path.join(__dirname, "..", relativePath);
};

const getTemplateByID = async (req, res) => {
  const { id } = req.params; // Menggunakan params, bukan dari JWT
  
  try {
    const [data] = await sertifikatModel.getTemplateByID(id);
    if (data.length > 0) {
      return res.json({ 
        message: "Menampilkan data template", 
        success: true,
        data: data[0] 
      });
    } else {
      return res.status(404).json({ 
        message: "Template tidak ditemukan", 
        success: false,
        data: null 
      });
    }
  } catch (error) {
    console.error("Error saat mengambil template by ID:", error);
    res.status(500).json({ 
      message: "Error saat mengambil data template", 
      success: false,
      error: error.message 
    });
  }
};

const addTemplate = async (req, res) => {
  const { kategori } = req.body;
  const id = uuidv4();

  try {
    // Validasi input
    if (!req.file) {
      return res.status(400).json({ 
        message: "Harap upload template!", 
        success: false 
      });
    }

    if (!kategori) {
      return res.status(400).json({ 
        message: "Kategori wajib diisi!", 
        success: false 
      });
    }

    // Validasi file
    if (!isValidImageFile(req.file)) {
      // Hapus file yang sudah ter-upload jika tidak valid
      if (req.file.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ 
        message: "File harus berupa gambar (JPEG, JPG, PNG) dengan ukuran maksimal 5MB", 
        success: false 
      });
    }

    const idUser = req.id;
    // Path relatif untuk disimpan di database
    const templatePath = `/uploads/templates/${req.file.filename}`;

    await sertifikatModel.uploadTemplate(id, idUser, templatePath, kategori);
    
    return res.status(201).json({
      message: "Berhasil mengupload template",
      success: true,
      data: {
        id: id,
        fileUrl: templatePath,
        kategori: kategori,
        filename: req.file.filename
      }
    });
  } catch (error) {
    // Hapus file jika terjadi error saat menyimpan ke database
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
        console.log("File berhasil dihapus karena error database");
      } catch (unlinkError) {
        console.error("Error menghapus file:", unlinkError);
      }
    }
    
    console.error("Error saat menambah template:", error);
    return res.status(500).json({ 
      message: "Gagal mengupload template", 
      success: false,
      error: error.message 
    });
  }
};



const getAllTemplate = async (req, res) => {
  try {
    const [data] = await sertifikatModel.getAllTemplate();
    if (data.length > 0) {
      res.json({
        message: "Menampilkan semua template",
        success: true,
        data: data,
      });
    } else {
      res.json({
        message: "Tidak ada template yang tersedia",
        success: true,
        data: []
      });
    }
  } catch (error) {
    console.error("Error saat mengambil template:", error);
    res.status(500).json({
      message: "Error saat mengambil data template",
      success: false,
      error: error.message,
    });
  }
};

const deleteTemplate = async (req, res) => {
  const { id } = req.params;

  try {
    // Cek apakah template exists
    const [templateData] = await sertifikatModel.getTemplateByID(id);
    console.log(templateData)
    const found = templateData[0];

    if (!found) {
      return res.status(404).json({ 
        message: "Template tidak ditemukan", 
        success: false 
      });
    }

    const { img_path } = found;

    // Hapus file dari sistem file lokal
    const fullFilePath = getAbsolutePath(img_path);
    
    if (fs.existsSync(fullFilePath)) {
      try {
        fs.unlinkSync(fullFilePath);
        console.log(`File berhasil dihapus: ${fullFilePath}`);
      } catch (fileError) {
        console.error("Error menghapus file:", fileError);
        // Lanjutkan menghapus dari database meskipun file tidak bisa dihapus
      }
    } else {
      console.log(`File tidak ditemukan: ${fullFilePath}`);
    }

    // Hapus data dari database
    await sertifikatModel.deleteTemplate(id);
    
    res.status(200).json({
      message: "Template berhasil dihapus",
      success: true,
      data: {
        deletedId: id
      }
    });
  } catch (error) {
    console.error("Error saat menghapus template:", error);
    res.status(500).json({ 
      message: "Gagal menghapus template", 
      success: false,
      error: error.message 
    });
  }
};

module.exports = {
  getTemplateByID,
  addTemplate,
  getAllTemplate,
  deleteTemplate,
};
