const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post('/addAdmin', authController.addAdmin);
router.post('/addSuperAdmin', authController.addSuperAdmin);

module.exports = router;