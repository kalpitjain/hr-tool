import React, { useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import CandidateLogin from "./components/CandidateLogin";
import CandidateSignup from "./components/CandidateSignup";
import HRLogin from "./components/HRLogin";
import HRSignup from "./components/HRSignup";
import CandidateDashboard from "./components/CandidateDashboard";
import HRDashboard from "./components/HRDashboard";
import Home from "./components/Home";

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setUser(userData);
    if (userData && userData.role === "candidate") {
      navigate(`/candidate/dashboard/${userData.email}`);
    } else if (userData && userData.role === "hr") {
      navigate(`/hr/dashboard/${userData.hr_email || ""}`);
    }
  };

  const handleSignup = (userData) => {
    setUser(userData);
    if (userData && userData.role === "candidate") {
      navigate(`/candidate/dashboard/${userData.email}`);
    } else if (userData && userData.role === "hr") {
      navigate(`/hr/dashboard/${userData.hr_email || ""}`);
    }
  };

  const ProtectedRoute = ({ element, allowedRoles }) => {
    if (!user || !allowedRoles.includes(user.role)) {
      return <Navigate to="/" />;
    }
    return React.cloneElement(element, { email: user.email });
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/candidate/login"
        element={<CandidateLogin onLogin={handleLogin} />}
      />
      <Route
        path="/candidate/signup"
        element={<CandidateSignup onSignup={handleSignup} />}
      />
      <Route path="/hr/login" element={<HRLogin onLogin={handleLogin} />} />
      <Route path="/hr/signup" element={<HRSignup onSignup={handleSignup} />} />

      <Route
        path="/candidate/dashboard/:email"
        element={
          <ProtectedRoute
            element={<CandidateDashboard />}
            allowedRoles={["candidate"]}
          />
        }
      />
      <Route
        path="/hr/dashboard/:email"
        element={
          <ProtectedRoute element={<HRDashboard />} allowedRoles={["hr"]} />
        }
      />
    </Routes>
  );
};

export default App;
