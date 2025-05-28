const conn = require("../config/db_connection");

const getTemplateByID = async (id) => {
  const SQLQuery = "SELECT * FROM foto_tamplate_sertifikat WHERE id = ?";
  return conn.execute(SQLQuery, [id]);
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

const deleteTemplate = (id) => {
  const SQLQuery = "DELETE FROM foto_tamplate_sertifikat WHERE id = ?";
  return conn.execute(SQLQuery, [id]);
};

module.exports = {
  getTemplateByID,
  uploadTemplate,
  getAllTemplate,
  deleteTemplate,
};
