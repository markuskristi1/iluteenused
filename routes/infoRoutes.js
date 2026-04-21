const express = require("express");
const router = express.Router();
const infoController = require("../controllers/infoController");

router.get("/", infoController.info);

module.exports = router;