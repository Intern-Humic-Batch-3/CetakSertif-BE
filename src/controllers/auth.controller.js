const userModel = require("../models/user");

const addAdmin = async (req, res) => {
  const { nama_depan, nama_belakang, email, password } = req.body;
  const role = "admin";

  try {
    const [found] = await userModel.searchByEmail(email);
    if (found.length > 0) {
      return res.status(400).json({
        message: "email sudah terdaftar",
        success: false,
      });
    } else {
      await userModel.addUser(nama_depan, nama_belakang, email, password, role);
      res.status(200).json({ message: "User registered successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const addSuperAdmin = async (req, res) => {
  const { nama_depan, nama_belakang, email, password } = req.body;
  const role = "super admin";

  try {
    const [found] = await userModel.searchByEmail(email);
    if (found.length > 0) {
      return res.status(400).json({
        message: "email sudah terdaftar",
        success: false,
      });
    } else {
      await userModel.addUser(nama_depan, nama_belakang, email, password, role);
      res.status(200).json({ message: "User registered successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addAdmin,
  addSuperAdmin,
};
