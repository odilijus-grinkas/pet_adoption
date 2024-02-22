import { User, permission_id } from "databasescript1_pet_adoption.sqlapi";

import React from "react";

// import sass
// TO-DO: export ir design

// Interface defines the structure of an object
interface UserListProps {
  users: User[];
}

// FC - Function Component is a generic type provided by React
// to define the type of functional components.
// Generic type comes from TypeScript
const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="user-list-container">
      {/* Display users */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

interface CreatingRolesProps {
  handleCreateUser: (permission_id: number) => void;
  // Void - doesn't return
}

const CreatingRoles: React.FC<CreatingRolesProps> = ({ handleCreateUser }) => {
  return (
    <div className="user-list-container">
      {/* Button to create admin user */}
      <button onClick={() => handleCreateUser(permission_id.Admin)}>
        Admin
      </button>
      {/* Button to create moderator user */}
      <button onClick={() => handleCreateUser(permission_id.Moderator)}>
        Moderator
      </button>
    </div>
  );
};

module.exports = function allComps() {
  return {
    UserList,
    CreatingRoles,
  };
};

// const AdMod = { UserList, CreatingRoles };

// export default AdMod;
