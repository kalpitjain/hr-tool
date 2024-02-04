import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://backend-rose-tau.vercel.app/hr/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        onLogin(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="form-container">
        <div className="form-header">
          <h1 className="font-bold">Login</h1>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <div className="form-button">
          <button
            className="bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..."
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Login..." : "Login"}
          </button>
        </div>
        <div className="form-link">
          <p>
            Don't have an account? <Link to="/hr/signup">Sign up here</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
