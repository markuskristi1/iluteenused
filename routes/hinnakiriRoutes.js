const express = require("express");
const router = express.Router();
const hinnakiriController = require("../controllers/hinnakiriController");

router.get("/", hinnakiriController.hinnakiri);

module.exports = router;