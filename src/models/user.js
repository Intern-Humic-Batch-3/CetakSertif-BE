const conn = require("../config/db_connection");
const bcrypt = require("bcrypt");

const getAllUser = () => {
  const SQLQuery = "SELECT * FROM user";
  return conn.execute(SQLQuery);
};

const searchByEmail = async (email) => {
  const SQLQuery = "SELECT * FROM user WHERE email = ? ";
  return conn.execute(SQLQuery, [email]);
};

const addUser = async (
  nama_depan,
  nama_belakang,
  email,
  plainpassword,
  role
) => {
  const saltRounds = 10;
  const hashedPass = await bcrypt.hash(plainpassword, saltRounds);
  const SQLQuery =
    "INSERT INTO user (nama_depan, nama_belakang, email, password, role, created_at) VALUES (? ,?, ?, ?, ?, NOW())";
  return conn.execute(SQLQuery, [
    nama_depan,
    nama_belakang,
    email,
    hashedPass,
    role,
  ]);
};

const searchByID = async (id) => {
  const SQLQuery = "SELECT * FROM user WHERE id = ?";
  return conn.execute(SQLQuery, [id]);
};

const deleteUser = async (id) => {
  const SQLQuery = "DELETE FROM user WHERE id = ?";
  return conn.execute(SQLQuery, [id]);
};

module.exports = {
  getAllUser,
  searchByEmail,
  addUser,
  searchByID,
  deleteUser,
};
