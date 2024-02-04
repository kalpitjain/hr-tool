const bcrypt = require("bcrypt");
const db = require("../db");

module.exports = {
  signup: async (candidate) => {
    const insertCandidateSQL = `
      INSERT INTO candidates (email, name, phone, qualifications, skills, status, expectedsalary, nodejsexperience, reactjsexperience, total_score, password)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING email, 'candidate' AS role
    `;

    try {
      const hashedPassword = await bcrypt.hash(candidate.password, 10);
      const totalScore =
        calculateExperienceScore(candidate.nodejsexperience) +
        calculateExperienceScore(candidate.reactjsexperience);

      const result = await db.query(insertCandidateSQL, [
        candidate.email,
        candidate.name,
        candidate.phone,
        candidate.qualifications,
        candidate.skills,
        candidate.status || null,
        candidate.expectedsalary,
        candidate.nodejsexperience,
        candidate.reactjsexperience,
        totalScore,
        hashedPassword,
      ]);

      return result.rows[0];
    } catch (error) {
      console.error("Error signing up candidate", error);
      throw new Error("Error signing up candidate");
    }
  },

  login: async (email, password) => {
    const getCandidateSQL = "SELECT * FROM candidates WHERE email = $1";

    try {
      const result = await db.query(getCandidateSQL, [email]);

      if (result.rows.length === 0) {
        throw new Error("Candidate not found");
      }

      const hashedPassword = result.rows[0].password;

      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {
        return { email, role: "candidate" };
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in candidate", error);
      throw new Error("Error logging in candidate");
    }
  },

  getAllCandidates: async () => {
    const sql = "SELECT * FROM candidates";

    try {
      const candidates = await db.query(sql);
      return candidates.rows;
    } catch (error) {
      console.error("Error getting all candidates", error);
      throw new Error("Error getting all candidates");
    }
  },

  getCandidateByEmail: async (email) => {
    const sql = "SELECT * FROM candidates WHERE email = $1";

    try {
      const result = await db.query(sql, [email]);

      if (result.rows.length === 0) {
        throw new Error("Candidate not found");
      }

      return result.rows[0];
    } catch (error) {
      console.error("Error getting candidate by email", error);
      throw new Error("Error getting candidate by email");
    }
  },

  updateCandidate: async (email, updatedCandidate) => {
    const sql = `
      UPDATE candidates
      SET name = $1, phone = $2, qualifications = $3, skills = $4, status = $5,
          expectedsalary = $6, nodejsexperience = $7, reactjsexperience = $8, total_score = $9
      WHERE email = $10
      RETURNING email, name, phone, qualifications, skills, status, expectedsalary,
                nodejsexperience, reactjsexperience, total_score
    `;

    try {
      const totalScore =
        calculateExperienceScore(updatedCandidate.nodejsexperience) +
        calculateExperienceScore(updatedCandidate.reactjsexperience);

      const result = await db.query(sql, [
        updatedCandidate.name,
        updatedCandidate.phone,
        updatedCandidate.qualifications,
        updatedCandidate.skills,
        updatedCandidate.status,
        updatedCandidate.expectedsalary,
        updatedCandidate.nodejsexperience,
        updatedCandidate.reactjsexperience,
        totalScore,
        email,
      ]);

      if (result.rows.length === 0) {
        throw new Error("Candidate not found");
      }

      return result.rows[0];
    } catch (error) {
      console.error("Error updating candidate", error);
      throw new Error("Error updating candidate");
    }
  },

  deleteCandidate: async (email) => {
    const sql = "DELETE FROM candidates WHERE email = $1";

    try {
      const result = await db.query(sql, [email]);

      if (result.rowCount === 0) {
        throw new Error("Candidate not found");
      }
    } catch (error) {
      console.error("Error deleting candidate", error);
      throw new Error("Error deleting candidate");
    }
  },
};

function calculateExperienceScore(experience) {
  if (experience < 1) {
    return 1;
  } else if (experience >= 1 && experience <= 2) {
    return 2;
  } else {
    return 3;
  }
}
