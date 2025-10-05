const conn = require("../config/db_connection");

const getTemplateByID = async (id) => {
  const SQLQuery = "SELECT * FROM foto_tamplate_sertifikat WHERE id = ?";
  return conn.execute(SQLQuery, [id]);
};

const getTemplateByUserID = async (userId) => {
  const SQLQuery = "SELECT * FROM foto_tamplate_sertifikat WHERE id_user = ? ORDER BY created_at DESC";
  return conn.execute(SQLQuery, [userId]);
};

const uploadTemplate = async (id, id_user, img_path, kategori) => {
  const SQLQuery =
    "INSERT INTO foto_tamplate_sertifikat (id, id_user, img_path, kategori, created_at) VALUES (?, ?, ?, ?,NOW())";
  return conn.execute(SQLQuery, [id, id_user, img_path, kategori]);
};

const getAllTemplate = () => {
  const SQLQuery = "SELECT * FROM foto_tamplate_sertifikat";
  return conn.execute(SQLQuery);
};

const updateTemplate = async (id, img_path, kategori) => {
  const SQLQuery = 
    "UPDATE foto_tamplate_sertifikat SET img_path = ?, kategori = ?, updated_at = NOW() WHERE id = ?";
  return conn.execute(SQLQuery, [img_path, kategori, id]);
};

const deleteTemplate = (id) => {
  const SQLQuery = "DELETE FROM foto_tamplate_sertifikat WHERE id = ?";
  return conn.execute(SQLQuery, [id]);
};

module.exports = {
  getTemplateByID,
  getTemplateByUserID,
  uploadTemplate,
  getAllTemplate,
  updateTemplate,
  deleteTemplate,
};
