import React, { useState, useEffect } from "react";
import axios from "axios";

const HRDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    status: "",
    skills: "",
    qualifications: "",
    totalScore: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://backend-rose-tau.vercel.app/candidates"
        );
        if (Array.isArray(response.data)) {
          setCandidates(response.data);
        } else {
          console.error("Invalid data format received from the server.");
        }
      } catch (error) {
        console.error("Error fetching candidates data:", error);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (candidate, newStatus) => {
    try {
      const email = candidate.email;
      await axios.put(
        `https://backend-rose-tau.vercel.app/candidates/${email}`,
        {
          ...candidate,
          status: newStatus,
        }
      );

      const updatedCandidates = candidates.map((candidate) => {
        if (candidate.email === email) {
          return { ...candidate, status: newStatus };
        }
        return candidate;
      });
      setCandidates(updatedCandidates);
    } catch (error) {
      console.error("Error updating candidate status:", error);
    }
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const candidateStatus = candidate.status || "Pending";

    return (
      (!filter.name ||
        (candidate.name &&
          candidate.name.toLowerCase().includes(filter.name.toLowerCase()))) &&
      (!filter.status ||
        candidateStatus.toLowerCase().includes(filter.status.toLowerCase())) &&
      (!filter.skills ||
        (candidate.skills &&
          candidate.skills
            .toLowerCase()
            .includes(filter.skills.toLowerCase()))) &&
      (!filter.qualifications ||
        (candidate.qualifications &&
          candidate.qualifications
            .toLowerCase()
            .includes(filter.qualifications.toLowerCase()))) &&
      (!filter.totalScore ||
        !candidate.total_score ||
        candidate.total_score >= filter.totalScore)
    );
  });

  return (
    <div className="hr-container">
      <h1 className="hr-header">HR Dashboard</h1>
      <div className="filter-section">
        <input
          type="text"
          placeholder="Filter by Name"
          value={filter.name}
          onChange={(e) => setFilter({ ...filter, name: e.target.value })}
        />
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        >
          <option value="">Filter by Status</option>
          <option value="Contacted">Contacted</option>
          <option value="Interview Scheduled">Interview Scheduled</option>
          <option value="Offer Extended">Offer Extended</option>
          <option value="Hired">Hired</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          type="text"
          placeholder="Filter by Skills"
          value={filter.skills}
          onChange={(e) => setFilter({ ...filter, skills: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by Qualifications"
          value={filter.qualifications}
          onChange={(e) =>
            setFilter({ ...filter, qualifications: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Filter by Total Score"
          value={filter.totalScore}
          onChange={(e) => setFilter({ ...filter, totalScore: e.target.value })}
        />
      </div>
      <div className="candidate-list">
        {filteredCandidates.map((candidate) => (
          <div key={candidate.email} className="candidate-card">
            <h1>{candidate.name}</h1>
            <div className="details">
              <p>Email: {candidate.email}</p>
              <p>Phone: {candidate.phone}</p>
              <p>Qualifications: {candidate.qualifications}</p>
              <p>Skills: {candidate.skills}</p>
              <div className="status-section">
                <p
                  className="status-label"
                  style={{ display: "inline", marginRight: "0.5rem" }}
                >
                  Status:
                </p>
                <select
                  value={candidate.status || ""}
                  onChange={(e) =>
                    handleStatusChange(candidate, e.target.value)
                  }
                >
                  <option value="">Select Status</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Interview Scheduled">
                    Interview Scheduled
                  </option>
                  <option value="Offer Extended">Offer Extended</option>
                  <option value="Hired">Hired</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <p>Expected Salary: {candidate.expectedsalary}</p>
              <p>Node.js Experience: {candidate.nodejsexperience}</p>
              <p>React.js Experience: {candidate.reactjsexperience}</p>
              <p>Total Score: {candidate.total_score}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HRDashboard;
