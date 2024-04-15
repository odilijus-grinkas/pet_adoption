import "./assets/AdMod.scss"; // Import the CSS file

import React, { useState } from "react";

import { ValidationRegister } from "../Inputs/Validation";
import { Navigate } from "react-router-dom";

interface FormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  error?: string;
}

export default function AdminModerator() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const user = localStorage.getItem("user") ?? "";
  const parsedUser = JSON.parse(user);
  const token = parsedUser.token;
  const role = parsedUser.role;
  console.log(role);

  if (role == 1 || role == 2) {
    return <Navigate to="/" />;
  }
  const createUser = async (role: string) => {
    const validationErrors = ValidationRegister(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const endpointUrls: { [key: string]: string } = {
        plus: "http://localhost:3001/api/user/create/plus",
        mod: "http://localhost:3001/api/user/create/mod",
        admin: "http://localhost:3001/api/user/create/admin",
      };

      if (!endpointUrls[role]) {
        throw new Error("Invalid role");
      }

      const url = endpointUrls[role];
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const responseData = await response.json();
        if (
          response.status === 403 &&
          responseData.message ===
            "Only admins can create another mod or admin."
        ) {
          throw new Error(responseData.message);
        } else {
          throw new Error("Only admins can create another mod or admin.");
        }
      }
      // window.location.reload();
      setSuccessMessage(true);
    } catch (error: any) {
      // console.error("Error:", error);
      setErrors({ error: error.message });
    }
  };

  const handleFormSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    formType: string
  ) => {
    e.preventDefault();
    if (formType === "createUser") {
      if (!selectedRole) {
        console.error("Please select a role");
        return;
      }
      setErrors({});
      createUser(selectedRole);
    }
  };

  const roles = ["plus", "mod", "admin"];

  return (
    <div className="admin-moderator-container">
      <h2 className="admin-moderator-heading">Sukurkite Spec. Paskyrą</h2>
      <div className="admin-moderator-buttons">
        {roles.map((role) => (
          <button
            key={role}
            className={`admin-moderator-button ${
              selectedRole === role ? "selected" : ""
            }`}
            onClick={() => setSelectedRole(role)}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>
      <form onSubmit={(e) => handleFormSubmit(e, "createUser")}>
        <input
          type="text"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          placeholder="Susikurkite vartotojo vardą"
          className="admin-moderator-input form-control"
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Įrašykite savo el.pašto adresą"
          className="admin-moderator-input form-control"
        />
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Susikurkite slaptažodį"
          className="admin-moderator-input form-control"
        />
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          placeholder="Patvirtinkite slaptažodį"
          className="admin-moderator-input form-control"
        />
        <button type="submit" className="btn btn-primary">
          Pateikti
        </button>
      </form>
      {Object.keys(errors).length > 0 && (
        <div className="admin-moderator-error">
          {Object.values(errors).map((error, index) => (
            <p key={index} className="error-message">
              {error}
            </p>
          ))}
        </div>
      )}
      {successMessage && (
        <p className="success-message">Vartotojas sėkmingai sukurta</p>
      )}
    </div>
  );
}
