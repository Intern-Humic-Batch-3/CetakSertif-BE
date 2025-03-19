const conn = require("../config/db_connection");

const getTemplateByID = async (id) => {
  const SQLQuery = "SELECT * FROM foto_tamplate_sertifikat WHERE id_user = ?";
  return conn.execute(SQLQuery, [id]);
};

const uploadTemplate = async (id_user, img_path) => {
  const SQLQuery =
    "INSERT INTO foto_tamplate_sertifikat (id_user, img_path, created_at) VALUES (?, ?, NOW())";
  return conn.execute(SQLQuery, [id_user, img_path]);
};

const getAllTemplate = () => {
  const SQLQuery = "SELECT * FROM foto_tamplate_sertifikat";
  return conn.execute(SQLQuery);
};

module.exports = {
  getTemplateByID,
  uploadTemplate,
  getAllTemplate,
};
