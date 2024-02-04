const express = require("express");
const router = express.Router();
const hrController = require("../controllers/hrController");

router.post("/signup", hrController.signup);
router.post("/login", hrController.login);

module.exports = router;
