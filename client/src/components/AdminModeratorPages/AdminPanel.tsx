import "./assets/AdMod.scss";

import AdminModerator from "./AdminModerator";
import City from "./City";
import UserList from "./UserList";

export default function AdminPanel() {
  return (
    <div className="admin-panel-container">
      <div className="user-list-container">
        <UserList />
      </div>
      <div >
        <City />
      </div>
      <div className="admin-moderator-container">
        <AdminModerator />
      </div>
    </div>
  );
}