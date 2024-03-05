import "./assets/AdMod.scss";

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
      const response = await fetch("http://localhost:3001/api/user/1");
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
                  Delete
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

export function AdminModerator() {
  const [formData, setFormData] = useState<User[]>([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = async (role: string, authToken: string) => {
    try {
      const endpointUrls: { [key: string]: string } = {
        regular: "http://localhost:3001/api/user/create/regular",
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
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const responseData = await response.json();
      const newUser = Array.isArray(responseData.data)
        ? responseData.data[0]
        : responseData.data;
      setFormData((prevState) => [...prevState, newUser]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Goes through auth process
  const handleCreateUser = (role: string) => {
    const authToken = "authorization";
    createUser(role, authToken);
  };

  return (
    <div className="user-list-container">
      <style>
        {`
          body {
            font-family: "BioRhyme", serif;
          }
          section {
            background-color: #eea990;
          }
          .card {
            border: 3px solid #ece4d3;
            border-radius: 2em;
            background-color: #ece4d3;
            box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.4),
              0 8px 20px 0 rgba(0, 0, 0, 0.4), 0 12px 40px 0 rgba(0, 0, 0, 0.38);
          }
          .side {
            border-radius: 1.8em 0% 0% 1.8em;
          }
          .form-control:focus {
            border-color: rgba(238, 169, 144, 1);
            box-shadow: 0 0 0 0.25rem rgba(238, 169, 144, 0.4);
          }
          .button {
            border-radius: 2em;
            border: 0px;
            background-color: rgba(238, 169, 144, 0.4);
            box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.4), 0 3px 5px 0 rgba(0, 0, 0, 0.38);
          }
          .button:hover {
            background-color: rgba(238, 169, 144, 1);
          }
          .link:hover {
            color: rgba(238, 169, 144, 1);
          }
          .link {
            color: black;
          }
        `}
      </style>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Create a username"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Create a password"
      />
      <button className="button" onClick={() => handleCreateUser("regular")}>
        Regular User
      </button>
      <button className="button" onClick={() => handleCreateUser("plus")}>
        Plus User
      </button>
      <button className="button" onClick={() => handleCreateUser("mod")}>
        Moderator
      </button>
      <button className="button" onClick={() => handleCreateUser("admin")}>
        Admin
      </button>
    </div>
  );
}
