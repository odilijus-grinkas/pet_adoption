import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  username: string;
  role_id: number;
}

export default function UserList() {
  // Regular user navigation to Index page
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();
  // State to hold the list of users
  const [users, setUsers] = useState<User[]>([]);
  const [authToken, setAuthToken] = useState(``);
  // Function to fetch user data from the API
  const userFetch = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/user/all", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
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

  useEffect(() => {
    const user = localStorage.getItem("user") ?? "";
    const parsedUser = JSON.parse(user);
    parsedUser.id; // duos ID pvz 1
    parsedUser.token; // duos token, pvz: "asuidsaiu.aisdjiasd.asidjasid"
    setAuthToken(parsedUser.token);
  }, []);

  useEffect(() => {
    if (authToken) {
      userFetch();
    }
  }, [authToken]);

  // Function to delete a user by ID
  const deleteFetch = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/user/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.ok) {
        const setting = await response.json();
        // Update users state after successful deletion
        setUsers(setting.data as User[]);
        userFetch();
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
      {authToken ? (
        <section className="section">
          <div className="card">
            <h2 className="account">User List</h2>
            <ul>
              {/* Render user list */}
              {users.map((user) => (
                <li key={user.id}>
                  <p>
                    {user.username}
                    {user.role_id}
                  </p>
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
      ) : (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </>
  );
}