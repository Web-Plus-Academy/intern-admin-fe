import React, { useState } from "react";
import axios from "../../axiosConfig";
import Swal from "sweetalert2";
import "./SemProjAllocation.css"; // Link to the CSS file

const SemProjAllocation = () => {
  const [sem, setSem] = useState("");
  const [batchnumber, setBatchnumber] = useState("");
  const [link, setLink] = useState("");
  const [allocDate, setAllocDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [domain, setDomain] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      sem: parseInt(sem),
      batchnumber: parseInt(batchnumber),
      link,
      allocDate,
      endDate,
      domain,
    };

    try {
      const response = await axios.post("/api/admin/sem-proj", data);
      console.log("Response:", response.data);

      Swal.fire({
        title: "Success!",
        text: "Sem Project allocated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset sem Fields
      setSem("");
      setBatchnumber("");
      setLink("");
      setAllocDate("");
      setEndDate("");
      setDomain("");

    } catch (error) {
      console.error("Error submitting task:", error);

      Swal.fire({
        title: "Error!",
        text: "Failed to submit the task. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="sem-container">
      <h2 className="sem-heading">Final Project Allocation</h2>
      <form onSubmit={handleSubmit} className="sem">
        <div className="sem-group">
          <label className="sem-label">Batch Number:</label>
          <input
            type="number"
            className="sem-input"
            value={batchnumber}
            onChange={(e) => setBatchnumber(e.target.value)}
            required
          />
        </div>
        <div className="sem-group">
          <label className="sem-label">Link:</label>
          <input
            type="url"
            className="sem-input"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>
        <div className="sem-group">
          <label className="sem-label">Domain:</label>
          <select
            className="sem-input"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
          >
            <option value="">Select Domain</option>
            <option value="SWPAFE">Frontend Developer</option>
            <option value="SWPABE">Backend Developer</option>
            <option value="SWPAAM">AI / ML</option>
            <option value="SWPADS">Data Science</option>
            <option value="SWPACS">Cybersecurity</option>
            <option value="SWPAUI">UI/UX Design</option>
            <option value="SWPADB">Database Management</option>
            <option value="SWPARJ">React JS</option>
          </select>
        </div>


        <div className="sem-group">
          <label className="sem-label">Allocation Date:</label>
          <input
            type="datetime-local"
            className="sem-input"
            value={allocDate}
            onChange={(e) => setAllocDate(e.target.value)}
            required
          />
        </div>
        <div className="sem-group">
          <label className="sem-label">End Date:</label>
          <input
            type="datetime-local"
            className="sem-input"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="sem-button">
          Allocate Project
        </button>
      </form>
    </div>
  );
};

export default SemProjAllocation;
