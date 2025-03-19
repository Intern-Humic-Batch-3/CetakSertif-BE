const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const multer = require("../middleware/multer");
const sertifikatController = require("../controllers/sertifikat.controller");

router.get('/get/templateByID', verifyJWT, sertifikatController.getTemplateByID);
router.post('/post/template', verifyJWT, multer.single('template'), sertifikatController.addTemplate);
router.get('/get/allTemplate', sertifikatController.getAllTemplate);

module.exports = router
