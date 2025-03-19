const sertifikatModel = require("../models/sertifikat");

const getTemplateByID = async (req, res) => {
  const id = req.id;
  try {
    const [data] = await sertifikatModel.getTemplateByID(id);
    if (data.length > 0) {
      return res.json({ message: "menampilkan data tempalte", data: data });
    } else {
      return res
        .status(404)
        .json({ message: "anda belum mengupload template" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, data: null });
  }
};

const addTemplate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Harap upload template!" });
    }

    const id = req.id;
    const file = `/uploads/${req.file.filename}`;

    await sertifikatModel.uploadTemplate(id, file);
    return res.json({ message: "Berhasil mengupload template", fileUrl: file });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Gagal mengupload template", error });
  }
};

const getAllTemplate = async (req, res) => {
  try {
    const [data] = await sertifikatModel.getAllTemplate();
    if (data.length > 0) {
      res.json({
        massage: "menampilkan semua template",
        data: data,
      });
    } else {
      res.json({
        massage: "Tidak ada template yang tersedia",
      });
    }
  } catch (error) {
    res.status(500).json({
      massage: "error",
      serverMassage: error.massage,
    });
  }
};

module.exports = {
  getTemplateByID,
  addTemplate,
  getAllTemplate,
};
