import "./Header.scss";

import { Link } from "react-router-dom";
import logo from "../../../primary_comps/Auth/assets/logo.png";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faCogs,
  faPlus,
  faSignInAlt,
  faSignOutAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

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
            <Link to="/">
              {" "}
              <i>
                <FontAwesomeIcon icon={faHome} />{" "}
              </i>{" "}
              Titulinis
            </Link>
          </li>
          {user && (
            <li className="btn btn-primary">
              <Link to="/Post/Create">
                {" "}
                <i>
                  <FontAwesomeIcon icon={faPlus} />{" "}
                </i>{" "}
                  Sukurti Skelbimą
                  </Link>
              </li>
                )}

          {user && (
            <li className="btn btn-primary">
              <Link to="/Chat">
              {" "}
              <i>
                <FontAwesomeIcon icon={faEnvelope} />{" "}
              </i>{" "}
              Susirašinėjimai
            </Link>
          </li>
                )}    

          {user ? ( // Profile button
            <li className="btn btn-primary">
              <Link to="/profile">
                {" "}
                <i>
                  <FontAwesomeIcon icon={faUser} />{" "}
                </i>{" "}
                Profilis
              </Link>
            </li>
          ) : null}

          {user ? ( // Admin Panel button (if admin/mod logged in)
            JSON.parse(user).role > 2 ? (
              <li className="btn btn-primary">
                <Link to="/AdminPanel">
                  {" "}
                  <i>
                    <FontAwesomeIcon icon={faCogs} />{" "}
                  </i>{" "}
                  Admino Panelė
                </Link>
              </li>
            ) : null
          ) : null}

          {user ? ( // Login/Logout button
            <Link
              className="btn btn-danger"
              to={"/login"}
              onClick={() => localStorage.removeItem("user")}
            >
              <i>
                <FontAwesomeIcon icon={faSignOutAlt} />{" "}
              </i>{" "}
              Atsijungti
            </Link>
          ) : (
            <li className="btn btn-warning">
              <Link to="/Login">
                {" "}
                <i>
                  <FontAwesomeIcon icon={faSignInAlt} />{" "}
                </i>{" "}
                Prisijungti
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
