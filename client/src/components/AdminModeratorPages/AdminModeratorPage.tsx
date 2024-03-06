import "./assets/AdMod.scss";

import { ValdiationLogin, ValidationRegister } from "../Inputs/Validation";
import { useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
}

export default function UserList() {
  // State to hold the list of users
  const [users, setUsers] = useState<User[]>([]);

  // Function to fetch user data from the API
  const userFetch = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/user/all");
      if (response.ok) {
        const setting = await response.json();
        // Log the data received from the API for debugging
        console.log("Fetched data:", setting.data);
        // Check if the data is an array or an object
        if (Array.isArray(setting.data)) {
          // If it's an array, set it directly
          setUsers(setting.data as User[]);
        } else if (typeof setting.data === "object") {
          // If it's an object, convert it to an array of one element
          setUsers([setting.data as User]);
        } else {
          console.error("Data is not in a valid format:", setting.data);
        }
      } else {
        // Handle non-OK responses
        setUsers([]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // useEffect hook to fetch user data when the component mounts - excludes repetition
  useEffect(() => {
    userFetch();
  }, []);

  // Function to delete a user by ID
  const deleteFetch = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/user/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const setting = await response.json();
        // Update users state after successful deletion
        setUsers(setting.data as User[]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Event handler for delete button click
  const handleDelete = (id: string, username: string) => {
    if (
      window.confirm(`Are you sure you want to delete the user ${username}?`)
    ) {
      deleteFetch(id)
        .then(() => {
          // Filter out the deleted user from the users array
          setUsers(users.filter((user) => user.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  };

  // Render the component
  return (
    <>
      <section>
        <div className="card">
          <h2>User List</h2>
          <ul>
            {/* Render user list */}
            {users.map((user) => (
              <li key={user.id}>
                <p>{user.username}</p>
                <button
                  className="button"
                  onClick={() => handleDelete(user.id, user.username)}
                >
                  Delete | Trinti
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

// Admin | Moderator
interface User {
  id: string;
  username: string;
  email: string;
}

interface FormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

// To handle each error
interface Errors {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

export function AdminModerator() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const createUser = async (role: string, authToken: string) => {
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
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const responseData = await response.json();
      const newUser = Array.isArray(responseData.data)
        ? responseData.data[0]
        : responseData.data;
      setFormData((prevState) => ({ ...prevState, newUser }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCreateUser = (role: string) => {
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZV9pZCI6NCwiaWF0IjoxNzA5MjE0MTQyLCJleHAiOjE3MzUxMzQxNDJ9.Y0NFpP090iZgLDf4mTZ4SesH8Ogj9aKUS7V1xRTKl7A";
    createUser(role, authToken);
  };

  const handleFormSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    formType: string
  ) => {
    e.preventDefault();
    if (formType === "createUser") {
      setErrors({});
      handleCreateUser("plus"); // Example role
    } else if (formType === "login") {
      const validationErrors = ValdiationLogin(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      setLoginUsername("");
      setLoginPassword("");
    }
  };

  const roles = ["plus", "mod", "admin"];

  return (
    <div className="user-list-container">
      <h2>Create special user</h2>
      {roles.map((role) => (
        <button
          key={role}
          className="button"
          onClick={() => handleCreateUser(role)}
        >
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </button>
      ))}
      <form onSubmit={(e) => handleFormSubmit(e, "createUser")}>
        <input
          type="text"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          placeholder="Create a username | Susikurkite vartotojo vardą"
          className="form-control"
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter your email address | Įrašykite savo el.pašto adresą"
          className="form-control"
        />
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Create a password | Susikurkite slaptažodį"
          className="form-control"
        />
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          placeholder="Confirm password | Patvirtinkite slaptažodį"
          className="form-control"
        />
        <button type="submit" className="submit-button">
          Submit | Pateikti
        </button>
      </form>
      <form onSubmit={(e) => handleFormSubmit(e, "login")}>
        <input
          type="text"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
          placeholder="Enter your username"
          className="form-control"
        />
        <input
          type="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          placeholder="Enter your password"
          className="form-control"
        />
        <button type="submit" className="submit-button">
          Log In | Prisijungti
        </button>
      </form>
      {Object.keys(errors).length > 0 && (
        <div className="error-messages">
          {Object.values(errors).map((error, index) => (
            <p key={index} className="error-message">
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

// Admin
// function adminRole = (handleCreateUser("mod")) => {
// Redaguoti postus
// Pasalinti vartotojus
// User plus pridejimas
// }

// Moderator
