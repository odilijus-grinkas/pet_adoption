import { Link } from "react-router-dom";
import "./Header.scss";
import { useState } from "react";
import logo from '../../../primary_comps/Auth/assets/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faCogs, faPlus, faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

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
            <Link to="/"><FontAwesomeIcon icon={faHome} /> Titulinis</Link>
          </li>
          {user ? ( // Profile button
            <li className="btn btn-primary">
              <Link to="/profile"><FontAwesomeIcon icon={faUser} /> Profilis</Link>
            </li>
          ) : null}

          {user ? ( // Admin Panel button (if admin/mod logged in)
            JSON.parse(user).role > 2 ? (
              <li className="btn btn-primary">
                <Link to="/AdminPanel"><FontAwesomeIcon icon={faCogs} /> Admino Panelė</Link>
              </li>
            ) : null
          ) : null}

          {user ? ( // Create Post button
            <li className="btn btn-primary">
              <Link to="/Post/Create"><FontAwesomeIcon icon={faPlus} /> Įkelti Skelbimą</Link>
            </li>
          ) : null}

          {user ? ( // Logout button
            <li className="btn btn-danger">
              <Link to={"/login"} onClick={() => localStorage.removeItem("user")}><FontAwesomeIcon icon={faSignOutAlt} /> Atsijungti</Link>
            </li>
          ) : (
            <li className="btn btn-warning">
              <Link to="/Login"><FontAwesomeIcon icon={faSignInAlt} /> Prisijungti</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
