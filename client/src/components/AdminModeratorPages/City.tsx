import "./assets/AdMod.scss"; // Import AdMod.scss stylesheet

import React, { useState } from "react";

export default function City() {
  const [regionId, setRegionId] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/post/city", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // You might need to include an authorization header if required
        },
        body: JSON.stringify({ region_id: regionId, name: name }),
      });

      if (!response.ok) {
        throw new Error("Failed to create city");
      }

      const data = await response.json();
      console.log("City created:", data);
      // Reset form fields
      setRegionId("");
      setName("");
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error creating city:", error);
      setError("Failed to create city. Please try again later.");
    }
  };

  return (
    <div className="admin-moderator-container">
      <h2 className="admin-moderator-heading">Create City</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="admin-moderator-input"
          id="regionId"
          value={regionId}
          onChange={(e) => setRegionId(e.target.value)}
          placeholder="Region ID"
          required
        />
        <input
          type="text"
          className="admin-moderator-input"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        {error && (
          <div className="admin-moderator-error">
            <p className="error-message">{error}</p>
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
