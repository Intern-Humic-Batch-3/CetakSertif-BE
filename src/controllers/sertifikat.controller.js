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

module.exports = {
    getTemplateByID,
}
