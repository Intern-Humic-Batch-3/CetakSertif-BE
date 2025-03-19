const userModel = require("../models/user");

const getAllUser = async (req, res) => {
  try {
    const [data] = await userModel.getAllUser();

    if (data.length > 0) {
      res.json({
        massage: "menampilkan semua akun",
        data: data,
      });
    } else {
      res.json({
        massage: "Tidak ada akun terdaftar",
      });
    }
  } catch (error) {
    res.status(500).json({
      massage: "error",
      serverMassage: error.massage,
    });
  }
};

const deleteUser = async (req, res) => {
  const { idUser } = req.params;
  const role = req.role;

  try {
    if (role == "admin") {
      const result = await userModel.deleteUser(idUser);
      if (result[0].affectedRows === 0) {
        return res.status(404).json({ message: "user tidak ditemukan" });
      }
      res.status(200).json({ message: "user berhasil dihapus" });
    } else {
      res.status(500).json({ message: "Anda tidak bisa menghapus user" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Terjadi kesalahan saat menghapus user", data: error });
  }
};

module.exports = {
  getAllUser,
  deleteUser,
};
