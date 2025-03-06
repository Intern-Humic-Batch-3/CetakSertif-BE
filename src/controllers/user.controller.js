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

module.exports = {
    getAllUser,
}