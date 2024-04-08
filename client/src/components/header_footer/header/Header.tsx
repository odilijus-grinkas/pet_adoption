import { Link } from "react-router-dom";
import "./Header.scss";
import { useState } from "react";
import logo from '../../../primary_comps/Auth/assets/logo.png';

export default function Header() {
  const [user] = useState(localStorage.getItem("user"));
  return (
    <header className="header">
        <a href="/" className="logo-nav">
            <img className="logo" src={logo} alt="Logo" />
        </a>
      <nav className="header-nav p-2">
        <ul className="header-nav-ul">
          <li className="btn btn-primary">
            <Link to="/">Titulinis</Link>
          </li>
          {user ? ( // Profile button
            <li className="btn btn-primary">
              <Link to="/profile">Profilis</Link>
            </li>
          ) : null}

          {user ? ( // Admin Panel button (if admin/mod logged in)
            JSON.parse(user).role > 2 ? (
              <li className="btn btn-primary">
                <Link to="/AdminPanel">Admino Panelė</Link>
              </li>
            ) : null
          ) : null}

          {user ? ( // Login/Logout button
            <Link
              className="btn btn-danger"
              to={"/login"}
              onClick={() => localStorage.removeItem("user")}
            >
              Atsijungti
            </Link>
          ) : (
            <li className="btn btn-warning">
              <Link to="/Login">Prisijungti</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}