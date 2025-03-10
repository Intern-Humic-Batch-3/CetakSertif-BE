const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get('/get/allUser', userController.getAllUser);

module.exports = router;