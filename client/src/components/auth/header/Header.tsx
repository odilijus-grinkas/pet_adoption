import '../auth.scss'
import logo from '../assets/logo.png';
import './header.scss';
import { Link } from 'react-router-dom';

const Header = () => {
    return (

            <header className="p-3  border-bottom">
    <div className="container">
        <div className="navbar">
        <a href="/" className="logo-nav">
            <img className="logo" src={logo} alt="Logo" />
        </a>
          <a  className="nav" href="#">Gyvuneliai</a>
          <a className="nav" href="#">Naujas Gyvunas</a>
            <a className="nav" href="#">Nustatymai</a>
            <Link to="/login" className="nav">Prisijungti</Link>
        </div>
    </div>
  </header>

    )
}
export default Header;