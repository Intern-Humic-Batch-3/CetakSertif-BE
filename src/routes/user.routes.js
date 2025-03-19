const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyJWT = require("../middleware/verifyJWT");

router.get("/get/allUser", userController.getAllUser);
router.delete("/delete/:idUser", verifyJWT, userController.deleteUser);

module.exports = router;
