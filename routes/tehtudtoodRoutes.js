const express = require("express");
const router = express.Router();
const tehtudtoodController = require("../controllers/tehtudtoodController");

router.get("/", tehtudtoodController.tehtudtood);

module.exports = router;