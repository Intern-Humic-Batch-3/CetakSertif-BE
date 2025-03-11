const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
  const { nama_depan, nama_belakang, email, password } = req.body;
  const role = "user";
  const key = req.role;

  try {
    if (key == "admin") {
      const [found] = await userModel.searchByEmail(email);
      if (found.length > 0) {
        return res.status(400).json({
          message: "email sudah terdaftar",
          success: false,
        });
      } else {
        await userModel.addUser(
          nama_depan,
          nama_belakang,
          email,
          password,
          role
        );
        res.status(200).json({ message: "User registered successfully" });
      }
    } else {
      return res.status(400).json({
        message: "Anda tidak bisa menambahkan admin",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

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

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [found] = await userModel.searchByEmail(email);
    if (found.length > 0) {
      const user = found[0];
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          { id: user.id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "2h",
          }
        );
        return res.status(200).json({
          massage: "Login succesful",
          token,
        });
      }
    } else {
      return res.status(400).json({
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserLogin = async (req, res) => {
  const id = req.id;

  try {
    const [response] = await userModel.searchByID(id);
    if (response.length > 0) {
      return res.json({ message: "user found", data: response });
    }
    return res.status(404).json({ message: "User not found" });
    // res.status(200).json({ message: "User found", data: response });
  } catch (error) {
    res.status(500).json({ message: error.message, data: null });
  }
};

module.exports = {
  addUser,
  addAdmin,
  login,
  getUserLogin,
};
