const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const verifyJWT = require("../middleware/verifyJWT");

router.post("/post/admin", verifyJWT, authController.addAdmin);
router.post("/post/SuperAdmin", authController.addSuperAdmin);
router.post("/post/login", authController.login);
router.get("/get/me", verifyJWT, authController.getUserLogin);

module.exports = router;
