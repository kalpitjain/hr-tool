const bcrypt = require("bcrypt");
const db = require("../db");

module.exports = {
  signup: async (hr) => {
    const insertHRSQL = `
      INSERT INTO hr (hr_email, hr_name, hr_phone, hr_company, hr_password) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING hr_email, 'hr' AS role
    `;

    try {
      const hashedPassword = await bcrypt.hash(hr.hr_password, 10);

      const result = await db.query(insertHRSQL, [
        hr.hr_email,
        hr.hr_name,
        hr.hr_phone,
        hr.hr_company,
        hashedPassword,
      ]);

      return result.rows[0];
    } catch (error) {
      console.error("Error signing up HR representative", error);
      throw new Error("Error signing up HR representative");
    }
  },

  login: async (hr_email, hr_password) => {
    const getHRSQL = "SELECT * FROM hr WHERE hr_email = $1";

    try {
      const result = await db.query(getHRSQL, [hr_email]);

      if (result.rows.length === 0) {
        throw new Error("HR representative not found");
      }

      const hashedPassword = result.rows[0].hr_password;

      const passwordMatch = await bcrypt.compare(hr_password, hashedPassword);

      if (passwordMatch) {
        return { hr_email, role: "hr" };
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in HR representative", error);
      throw new Error("Error logging in HR representative");
    }
  },
};
