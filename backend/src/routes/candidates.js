const express = require("express");
const router = express.Router();
const candidatesController = require("../controllers/candidatesController");

router.post("/signup", candidatesController.signup);
router.post("/login", candidatesController.login);
router.get("/", candidatesController.getAllCandidates);
router.get("/:email", candidatesController.getCandidateByEmail);
router.put("/:email", candidatesController.updateCandidate);
router.delete("/:email", candidatesController.deleteCandidate);

module.exports = router;
