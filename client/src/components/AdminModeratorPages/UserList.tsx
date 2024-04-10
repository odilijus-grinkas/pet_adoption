import "./assets/AdMod.scss";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  username: string;
  role_id: number;
}

export default function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user") ?? "";
    const parsedUser = JSON.parse(user);
    setAuthToken(parsedUser.token || "");
  }, []);

  useEffect(() => {
    if (authToken) {
      userFetch();
    }
  }, [authToken]);

  const userFetch = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/user/all", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.ok) {
        const setting = await response.json();
        if (Array.isArray(setting.data)) {
          setUsers(setting.data as User[]);
        } else if (typeof setting.data === "object") {
          setUsers([setting.data as User]);
        } else {
          console.error("Data is not in a valid format:", setting.data);
        }
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteFetch = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/user/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.ok) {
        const setting = await response.json();
        setUsers(setting.data as User[]);
        userFetch();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = (id: string, username: string) => {
    if (
      window.confirm(`Are you sure you want to delete the user ${username}?`)
    ) {
      deleteFetch(id)
        .then(() => {
          setUsers(users.filter((user) => user.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  };

  return (
    <>
      {authToken ? (
        <div className="card">
          <h2 className="account">Vartotojų Sąrašas</h2>
          <ul className="list-group">
            {users.map((user) => (
              <li key={user.id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0">
                    {user.username}
                    {user.role_id}
                  </p>
                  <button
                    className="btn btn-custom-delete"
                    onClick={() => handleDelete(user.id, user.username)}
                  >
                    Trinti
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="section">
          <div className="card-container">
            <div className="card">
              <div role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
