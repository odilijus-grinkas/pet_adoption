import { useEffect, useState } from "react";
// panaudoti naujus user filtravimui is maino
export default function UserList() {
  const [users, setUsers] = useState([]);

  // User fetch function
  const userFetch = async () => {
    try {
      // Uses get method on this specific link
      const response = await fetch("http://localhost:3001/api/user/:id/");
      if (response.ok) {
        const setting = await response.json();
        // Set data in useState so it can be rendered in div
        setUsers(setting.data);
      } else {
        // Clear if error
        setUsers("");
      }
    } catch (error) {
      console.error("Error:", error);
      // Basic use
      // throw new Error(`Harbinger of misfortune, our requests are thwarted: ${response.statusText}`);
    }
  };
  
  useEffect(() => {
    // Re-renders page every time setUsers changes the data variable in useState.
    userFetch();
  }, []);

 // Delete fetch function
 const deleteFetch = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/user/delete/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // If the response is successful
    if (response.ok) {
      // Parse the response body as JSON
      const setting = await response.json();
      // Update the data with the retrieved setting
      setUsers(setting.data);
    }
  } catch (error) {
    // Handle any errors that occur during the fetch or processing
    console.error("Error:", error);
  }
};

  // Delete confirmation handler
  const handleDelete = (users.id, users.username) => {
    // Prompt the user to confirm deletion
    if (
      window.confirm(`Are you sure you want to delete the user ${users.username}?`)
    ) {
      // If user confirms, call deleteFetch to delete the user
      deleteFetch(users.id)
        .then(() => {
          // Update the user list after successful deletion
          setUsers((users) =>
            users.filter((users) => user.id !== users.id)
          );
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          // Handle error if necessary
        });
    }
  };

  // user by id display username + delete func
  return (
    <>
      <div>
        <h2>User List</h2>
        <ul>
          {users.map((users.id) => (
            <li key={users.id}>
              {users.username}
              <button onClick={() => handleDelete(users.id, users.username)}>
                Delete
              </button>
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
