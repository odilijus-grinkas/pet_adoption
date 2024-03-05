import '../auth.scss'
import logo from '../assets/logo.png';
import './header.scss';

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
            <a className="nav" href="#">Profilis</a>
            <a className="nav" href="#">Prisijungti</a>
        </div>
    </div>
  </header>

    )
}
export default Header;