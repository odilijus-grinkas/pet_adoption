import { Link } from "react-router-dom";
import "./Header.scss";
import { useState } from "react";
import logo from '../../auth/assets/logo.png';

export default function Header() {
  const [user] = useState(localStorage.getItem("user"));
  return (
    <header className="header">
        <a href="/" className="logo-nav">
            <img className="logo" src={logo} alt="Logo" />
        </a>
      <nav className="header-nav">
        <ul className="header-nav-ul">
          <li className="btn btn-primary">
            <Link to="/">Home</Link>
          </li>
          {user ? ( // Profile button
            <li className="btn btn-primary">
              <Link to="/profile">Profile</Link>
            </li>
          ) : null}

          {user ? ( // Admin Panel button (if admin/mod logged in)
            JSON.parse(user).role > 2 ? (
              <li className="btn btn-primary">
                <Link to="/AdminPanel">Admin Panel</Link>
              </li>
            ) : null
          ) : null}

          {user ? ( // Login/Logout button
            <Link
              className="btn btn-danger"
              to={"/login"}
              onClick={() => localStorage.removeItem("user")}
            >
              Logout
            </Link>
          ) : (
            <li className="btn btn-warning">
              <Link to="/Login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
