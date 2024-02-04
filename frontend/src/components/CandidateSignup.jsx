import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    qualifications: "",
    skills: "",
    status: "",
    expectedsalary: 0,
    nodejsexperience: 0,
    reactjsexperience: 0,
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const parsedValue = e.target.type === "number" ? parseFloat(value) : value;

    if (e.target.type === "number" && parsedValue < 0) {
      setErrors({ ...errors, [name]: `${name} cannot be negative` });
      return;
    }

    setFormData({ ...formData, [name]: parsedValue });
    setErrors({ ...errors, [name]: undefined });
  };

  const handleSignup = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://backend-rose-tau.vercel.app/candidates/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData.errors || { _error: "Signup failed" });
        return;
      }

      const data = await response.json();

      if (data && data.role === "candidate") {
        onSignup(data);
        setFormData({
          email: "",
          name: "",
          phone: "",
          qualifications: "",
          skills: "",
          status: "",
          expectedsalary: 0,
          nodejsexperience: 0,
          reactjsexperience: 0,
          password: "",
        });
        setErrors({});
      } else {
        setErrors({ _error: "Unknown error" });
        console.error("Signup failed:", data.error || "Unknown error");
      }
    } catch (error) {
      setErrors({ _error: "An unexpected error occurred" });
      console.error("Error during signup:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="form-container">
        <div className="form-header">
          <h1 className="font-bold">Sign Up</h1>
        </div>

        <div className="form-input">
          <label className="font-mono" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="input border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ..."
            placeholder="Your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            pattern="^\S+@\S+\.\S+$"
            required
          />
        </div>

        <div className="form-input">
          <label className="font-mono" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="input border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ..."
            placeholder="Your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-input">
          <label className="font-mono" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="input border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ..."
            placeholder="Your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-input">
          <label className="font-mono" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            className="input border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ..."
            placeholder="Your phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-input">
          <label className="font-mono" htmlFor="qualifications">
            Qualifications
          </label>
          <input
            type="text"
            id="qualifications"
            className="input border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ..."
            placeholder="Your qualifications"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-input">
          <label className="font-mono" htmlFor="skills">
            Skills
          </label>
          <input
            type="text"
            id="skills"
            className="input border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ..."
            placeholder="Your skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-input">
          <label className="font-mono" htmlFor="expectedsalary">
            Expected Salary
          </label>
          <input
            type="number"
            id="expectedsalary"
            className="input border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ..."
            placeholder="Your expected salary"
            name="expectedsalary"
            value={formData.expectedsalary}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-input">
          <label className="font-mono" htmlFor="nodejsexperience">
            Node.js Experience
          </label>
          <input
            type="number"
            id="nodejsexperience"
            className="input border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ..."
            placeholder="Your Node.js experience"
            name="nodejsexperience"
            value={formData.nodejsexperience}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-input">
          <label className="font-mono" htmlFor="reactjsexperience">
            React.js Experience
          </label>
          <input
            type="number"
            id="reactjsexperience"
            className="input border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ..."
            placeholder="Your React.js experience"
            name="reactjsexperience"
            value={formData.reactjsexperience}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-button">
          <button
            className="bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..."
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
        <div className="form-link">
          <p>
            Already have an account?{" "}
            <Link to="/candidate/login">Login here</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
