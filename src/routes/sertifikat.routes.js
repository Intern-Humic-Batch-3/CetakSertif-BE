const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const multer = require("../middleware/multer");
const sertifikatController = require("../controllers/sertifikat.controller");

// Routes untuk template
router.get('/get/template/:id', verifyJWT,sertifikatController.getTemplateByID);
router.get('/get/templates', verifyJWT, sertifikatController.getAllTemplate);
router.post('/post/template', verifyJWT, multer.single('template'), sertifikatController.addTemplate);
router.delete('/delete/template/:id', verifyJWT, sertifikatController.deleteTemplate);

module.exports = router
