const conn = require("../config/db_connection");

const getTemplateByID = async (id) => {
  const SQLQuery = "SELECT * FROM foto_tamplate_sertifikat WHERE id_user = ?";
  return conn.execute(SQLQuery, [id]);
};

module.exports = {
  getTemplateByID,
};
