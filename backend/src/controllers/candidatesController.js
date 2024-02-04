const candidateService = require("../services/candidateService");

module.exports = {
  signup: async (req, res) => {
    try {
      const candidate = req.body;
      const result = await candidateService.signup(candidate);
      res.status(201).json(result);
    } catch (error) {
      console.error("Error creating candidate:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const result = await candidateService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error logging in candidate:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  getAllCandidates: async (req, res) => {
    try {
      const result = await candidateService.getAllCandidates();
      res.status(200).json(result);
    } catch (error) {
      console.error("Error retrieving candidates:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  getCandidateByEmail: async (req, res) => {
    try {
      const { email } = req.params;
      const result = await candidateService.getCandidateByEmail(email);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error retrieving candidate:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  updateCandidate: async (req, res) => {
    try {
      const { email } = req.params;
      const updatedCandidate = req.body;
      const result = await candidateService.updateCandidate(
        email,
        updatedCandidate
      );
      res.status(200).json(result);
    } catch (error) {
      console.error("Error updating candidate:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  deleteCandidate: async (req, res) => {
    try {
      const { email } = req.params;
      await candidateService.deleteCandidate(email);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting candidate:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
