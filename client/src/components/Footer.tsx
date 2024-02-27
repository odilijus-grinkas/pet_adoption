import './auth/auth.scss'
import logo from './auth/assets/logo.png';

function Footer() {
  return (
<footer className="py-3 mt-4">
    <ul className="nav justify-content-center border-bottom">
      <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Home</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Features</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Pricing</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">FAQs</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">About</a></li>
    </ul>
    <p className="text-center text-body-secondary"><img className="logo" src={logo} alt="Logo" /></p>
  </footer>
  )
}
export default Footer