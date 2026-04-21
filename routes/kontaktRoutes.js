const express = require("express");
const router = express.Router();
const kontaktController = require("../controllers/kontaktController");

router.get("/", kontaktController.showKontakt);

module.exports = router;