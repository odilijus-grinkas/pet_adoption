import { useEffect, useState } from "react";

// import sass
// su fetch api

export default function userList() {
  const [data, setData] = useState();

  // Fetch function
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

  useEffect(() => {
    // Re-renders page every time setData changes the data variable in useState.
    userFetch();
  }, []);
}

// FC - Function Component is a generic type provided by React
// to define the type of functional components.
// Generic type comes from TypeScript
// const UserList: React.FC<UserListProps> = ({ users }) => {
//   return (
//     <div className="user-list-container">
//       {/* Display users */}
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>{user.username}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

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
