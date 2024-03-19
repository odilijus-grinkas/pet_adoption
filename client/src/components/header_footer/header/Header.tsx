import { Link } from "react-router-dom";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <div>Logo</div>
      <nav className="header-nav">
        <ul className="header-nav-ul">
          <li className="btn btn-primary">
            <Link to="/">Home</Link>
          </li>
          <li className="btn btn-primary">
            <Link to="/AdminPanel">Admin Panel</Link>
          </li>
          <li className="btn btn-primary">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="btn btn-warning">
            <Link to="/Login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}