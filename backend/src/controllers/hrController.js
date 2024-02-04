const hrService = require("../services/hrService");

module.exports = {
  signup: async (req, res) => {
    try {
      const hr = req.body;
      const result = await hrService.signup(hr);
      res.status(201).json(result);
    } catch (error) {
      console.error("Error creating HR representative:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const result = await hrService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error logging in HR representative:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
