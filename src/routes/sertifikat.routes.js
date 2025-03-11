const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const multer = require("../middleware/multer");
const sertifikatController = require("../controllers/sertifikat.controller");

router.get('/get/templateByID', verifyJWT, sertifikatController.getTemplateByID);

module.exports = router
