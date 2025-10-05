const fs = require('fs');
const path = require('path');

/**
 * Membuat direktori jika belum ada
 * @param {string} dirPath - Path direktori yang akan dibuat
 */
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Direktori berhasil dibuat: ${dirPath}`);
  }
};

/**
 * Inisialisasi direktori uploads yang diperlukan
 */
const initializeUploadDirectories = () => {
  const uploadsDir = path.join(__dirname, '../uploads');
  const templatesDir = path.join(uploadsDir, 'templates');
  
  ensureDirectoryExists(uploadsDir);
  ensureDirectoryExists(templatesDir);
};

/**
 * Mendapatkan informasi file (size, type, dll)
 * @param {string} filePath - Path file yang akan dicek
 * @returns {Object|null} - Informasi file atau null jika file tidak ada
 */
const getFileInfo = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const stats = fs.statSync(filePath);
    const fileExtension = path.extname(filePath);
    
    return {
      exists: true,
      size: stats.size,
      extension: fileExtension,
      isFile: stats.isFile(),
      createdAt: stats.birthtime,
      modifiedAt: stats.mtime
    };
  } catch (error) {
    console.error('Error getting file info:', error);
    return null;
  }
};

/**
 * Menghapus file dengan error handling
 * @param {string} filePath - Path file yang akan dihapus
 * @returns {boolean} - True jika berhasil, false jika gagal
 */
const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`File berhasil dihapus: ${filePath}`);
      return true;
    } else {
      console.log(`File tidak ditemukan: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`Error menghapus file ${filePath}:`, error);
    return false;
  }
};

/**
 * Membersihkan file lama berdasarkan umur
 * @param {string} directory - Direktori yang akan dibersihkan
 * @param {number} maxAgeInDays - Umur maksimal file dalam hari
 */
const cleanupOldFiles = (directory, maxAgeInDays = 30) => {
  try {
    if (!fs.existsSync(directory)) {
      return;
    }

    const files = fs.readdirSync(directory);
    const maxAge = maxAgeInDays * 24 * 60 * 60 * 1000; // Convert to milliseconds
    const now = Date.now();

    files.forEach(file => {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isFile() && (now - stats.mtime.getTime()) > maxAge) {
        deleteFile(filePath);
      }
    });
  } catch (error) {
    console.error('Error cleaning up old files:', error);
  }
};

module.exports = {
  ensureDirectoryExists,
  initializeUploadDirectories,
  getFileInfo,
  deleteFile,
  cleanupOldFiles
};