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
// Admin fetch model
// Define User interface
interface User {
  id: string;
  username: string;
  email: string;
}

export function AdminModerator() {
  // State for Admin role
  const [adminRole, setAdminRole] = useState<User[]>([]);
  // State for Moderator role
  const [moderatorRole, setModeratorRole] = useState<User[]>([]);

  // Function to fetch Admin data
  const adminFetch = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/user/create/admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const setting = await response.json();
        // Log the data received from the API
        console.log("Fetched data:", setting.data);
        // Check if the data is an array or an object
        if (Array.isArray(setting.data)) {
          // If it's an array, set it directly
          setAdminRole(setting.data as User[]);
        } else if (typeof setting.data === "object") {
          // If it's an object, convert it to an array of one element
          setAdminRole([setting.data as User]);
        } else {
          console.error("Data is not in a valid format:", setting.data);
        }
      } else {
        // Handle non-OK responses
        setAdminRole([]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to fetch Moderator data
  const moderatorFetch = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/user/create/moderator",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const setting = await response.json();
        // Log the data received from the API
        console.log("Fetched data:", setting.data);
        // Check if the data is an array or an object
        if (Array.isArray(setting.data)) {
          // If it's an array, set it directly
          setModeratorRole(setting.data as User[]);
        } else if (typeof setting.data === "object") {
          // If it's an object, convert it to an array of one element
          setModeratorRole([setting.data as User]);
        } else {
          console.error("Data is not in a valid format:", setting.data);
        }
      } else {
        // Handle non-OK responses
        setModeratorRole([]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // useEffect hook to fetch user data when the component mounts - excludes repetition
  useEffect(() => {
    adminFetch();
    moderatorFetch();
  }, []);

  return (
    <>
      <div className="user-list-container">
        {/* Button to fetch Admin user */}
        <button onClick={adminFetch}>Admin</button>
        {/* Button to fetch Moderator user */}
        <button onClick={moderatorFetch}>Moderator</button>
      </div>
    </>
  );
}
