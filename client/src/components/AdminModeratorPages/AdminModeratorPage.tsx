import { useEffect, useState } from "react";

export default function UserList() {
  const [data, setData] = useState();

  // User fetch function
  const userFetch = async () => {
    try {
      // Uses get method on this specific link
      const response = await fetch("http://localhost:3001/api/user/:id/");
      if (response.ok) {
        const setting = await response.json();
        // Set data in useState so it can be rendered in div
        setData(setting.data);
      } else {
        // Clear if error
        setData("");
        // Basic use
        // throw new Error(`Harbinger of misfortune, our requests are thwarted: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Delete fetch function
  const deleteFetch = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/user/delete/");
      if (response.ok) {
        const setting = await response.json();
        setData(setting.data);
      } else {
        setData("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Re-renders page every time setUsers changes the data variable in useState.
    userFetch();
  }, []);

  // question if they really wanna delete
  // refresh after deleting

  // Delete confirmation handler
  const handleDelete = (users.id) => {
    // Prompt the user to confirm deletion
    // ar su message?
    if (window.confirm("Are you sure you want to delete this user?")) {
      // If user confirms, call deleteFetch to delete the user
      deleteFetch(users.id);
    }
  };
  
  // user by id display username + delete func
  return (
    <>
      <div>
        <h2>User List</h2>
        <ul>
          {users.map((user) => (
            <li key={users.id}>
              {users.username}
              <button onClick={() => handleDelete(users.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

// Admin | Moderator
// interface CreatingRolesProps {
//   handleCreateUser: (permission_id: number) => void;
//   // Void - doesn't return
// }

// const CreatingRoles: React.FC<CreatingRolesProps> = ({ handleCreateUser }) => {
//   return (
//     <div className="user-list-container">
//       {/* Button to create admin user */}
//       <button onClick={() => handleCreateUser(permission_id.Admin)}>
//         Admin
//       </button>
//       {/* Button to create moderator user */}
//       <button onClick={() => handleCreateUser(permission_id.Moderator)}>
//         Moderator
//       </button>
//     </div>
//   );
// };
