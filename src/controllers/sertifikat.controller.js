const sertifikatModel = require("../models/sertifikat");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const firebaseConfig = require("../config/firebase.config");
const path = require("path");

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
  let templateIMG = null;

  try {
    if (req.file) {
      templateIMG = req.file;
    } else {
      return res.status(400).json({ message: "Harap upload template!" });
    }

    const id = req.id;
    const templatePath = await uploadTamplateIMG(templateIMG);

    await sertifikatModel.uploadTemplate(id, templatePath);
    return res.json({
      message: "Berhasil mengupload template",
      fileUrl: templatePath,
    });
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

const uploadTamplateIMG = async (TamplateIMG) => {
  try {
    if (!TamplateIMG) {
      throw new Error("File tidak valid");
    }

    const TamplateIMGExtension = path.extname(TamplateIMG.originalname);
    const TamplateIMGOriginalName = path.basename(
      TamplateIMG.originalname,
      TamplateIMGExtension
    );
    const newTamplateIMGName = `${Date.now()}_${TamplateIMGOriginalName}${TamplateIMGExtension}`;

    const { firebaseStorage } = await firebaseConfig();
    const storageRef = ref(
      firebaseStorage,
      `intern-humic/template-sertifikat/${newTamplateIMGName}`
    );

    const TamplateIMGBuffer = TamplateIMG.buffer;

    const resultTamplateIMG = await uploadBytes(storageRef, TamplateIMGBuffer, {
      contentType: TamplateIMG.mimetype,
    });

    return await getDownloadURL(resultTamplateIMG.ref);
  } catch (error) {
    console.error("Error saat mengunggah tamplate sertifikat:", error.message);
    throw new Error("Gagal mengunggah tamplate sertifikat.");
  }
};

const deleteTamplate = async (req, res) => {
  const { id } = req.params;

  try {
    const [templateData] = await sertifikatModel.getTemplateByID(id);
    const found = templateData[0];

    if (!found) {
      return res
        .status(404)
        .json({ message: "Data tamplate atau gambar tidak ditemukan." });
    }

    const { img_path } = found;

    const filePath = img_path.split("/o/")[1].split("?")[0];
    const decodedPath = decodeURIComponent(filePath);

    const { firebaseStorage } = await firebaseConfig();
    const fileRef = ref(firebaseStorage, decodedPath);

    await deleteObject(fileRef);
    await sertifikatModel.deleteTemplate(id);
    res.status(200).json({
      message: "Data template berhasil dihapus",
      status: true,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getTemplateByID,
  addTemplate,
  getAllTemplate,
  deleteTamplate,
};
