import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    hr_email: "",
    hr_name: "",
    hr_phone: "",
    hr_company: "",
    hr_password: "",
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
        "https://backend-rose-tau.vercel.app/hr/signup",
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

      if (data && data.role === "hr") {
        onSignup(data);
        setFormData({
          hr_email: "",
          hr_name: "",
          hr_phone: "",
          hr_company: "",
          hr_password: "",
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
            id="hr_email"
            className="input border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ..."
            placeholder="Your email"
            name="hr_email"
            value={formData.hr_email}
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
            id="hr_password"
            className="input border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ..."
            placeholder="Your password"
            name="hr_password"
            value={formData.hr_password}
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
            id="hr_name"
            className="input border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ..."
            placeholder="Your name"
            name="hr_name"
            value={formData.hr_name}
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
            id="hr_phone"
            className="input border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ..."
            placeholder="Your phone"
            name="hr_phone"
            value={formData.hr_phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-input">
          <label className="font-mono" htmlFor="Company">
            Company
          </label>
          <input
            type="text"
            id="hr_company"
            className="input border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ..."
            placeholder="Your Company"
            name="hr_company"
            value={formData.hr_company}
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
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </div>
        <div className="form-link">
          <p>
            Already have an account? <Link to="/hr/login">Login here</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
