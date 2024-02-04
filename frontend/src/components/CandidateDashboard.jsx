import React, { useState, useEffect } from "react";
import axios from "axios";

const CandidateDashboard = ({ email }) => {
  const [candidate, setCandidate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    qualifications: "",
    skills: "",
    expectedsalary: 0,
    nodejsexperience: 0,
    reactjsexperience: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://backend-rose-tau.vercel.app/candidates/${email}`
        );
        setCandidate(response.data);

        setFormData({
          name: response.data.name,
          phone: response.data.phone,
          qualifications: response.data.qualifications,
          skills: response.data.skills,
          expectedsalary: response.data.expectedsalary,
          nodejsexperience: response.data.nodejsexperience,
          reactjsexperience: response.data.reactjsexperience,
        });
      } catch (error) {
        console.error("Error fetching candidate data:", error);
      }
    };

    fetchData();
  }, [email, setCandidate]);

  const handleUpdate = async () => {
    try {
      const updatedCandidate = {
        ...candidate,
        ...formData,
      };

      console.log(updatedCandidate);

      const response = await axios.put(
        `https://backend-rose-tau.vercel.app/candidates/${email}`,
        updatedCandidate
      );

      setCandidate(response.data);
      setIsEditing(false);
      console.log("Candidate updated successfully");
    } catch (error) {
      console.error("Error updating candidate data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://backend-rose-tau.vercel.app/candidates/${email}`
      );
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    const parsedValue = type === "number" ? parseInt(value) : value;

    if (type === "number" && parsedValue < 0) {
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: parsedValue,
    }));
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  if (!candidate) {
    return <div>Loading...</div>;
  }

  return (
    <div className="candidate-container">
      <div className="header">
        <h1>Candidate Dashboard</h1>
      </div>
      <div className="info-details">
        {Object.keys(formData).map((field) => (
          <div key={field} className="info-field">
            {field === "email" ||
            field === "total_score" ||
            field === "password" ? null : (
              <>
                {isEditing ? (
                  <>
                    <label htmlFor={field}>{field}:</label>
                    {field === "status" ? (
                      <p>{formData[field]}</p>
                    ) : (
                      <>
                        {
                          <input
                            type={
                              field === "expectedsalary" ||
                              field === "nodejsexperience" ||
                              field === "reactjsexperience"
                                ? "number"
                                : "text"
                            }
                            id={field}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                          />
                        }
                      </>
                    )}
                  </>
                ) : (
                  <p>
                    {field.charAt(0).toUpperCase() + field.slice(1)}:{" "}
                    {field === "status" && candidate[field] === null
                      ? "Pending"
                      : candidate[field]}
                  </p>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <div className="action-buttons">
        {isEditing ? (
          <button className="update-btn" onClick={handleUpdate}>
            Update
          </button>
        ) : (
          <button className="edit-btn" onClick={toggleEditing}>
            Edit
          </button>
        )}
        <button className="delete-btn" onClick={handleDelete}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default CandidateDashboard;
