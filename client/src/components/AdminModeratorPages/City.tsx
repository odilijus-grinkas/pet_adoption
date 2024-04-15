import "./assets/AdMod.scss"; // Import AdMod.scss stylesheet

import { useState } from "react";

export default function City() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const user = localStorage.getItem("user") ?? "";
  const parsedUser = JSON.parse(user);
  const token = parsedUser.token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);

    try {
      const response = await fetch(
        "http://localhost:3001/api/post/createCity",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: name }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create city");
      }

      const data = await response.json();
      console.log("City created:", data);
      // Reset form fields
      setName("");
      setError(null); // Clear any previous errors
      setSuccess(true);
    } catch (error) {
      console.error("Error creating city:", error);
      setError("Failed to create city. Please try again later.");
    }
  };

  return (
    <div className="section">
      <div className="card">
        <h2>Create City</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control smaller-input"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          {error && <p className="errorMessage">{error}</p>}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      {success && <p className="successMessage">City created successfully!</p>}
    </div>
  );
}
