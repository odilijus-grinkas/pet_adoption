import '../auth.scss'
import logo from '../assets/logo.png';
import './Footer.scss';

function DeinoroFooter() {
  return (
<footer className="footerbackground py-3">
    <p className="text-center text-body-secondary"><img className="logo" src={logo} alt="Logo" /></p>
      <div className='FooterlinkNav'>
<a className= "FooterLink" href="#">Galimybes</a>
<a className= "FooterLink" href="#">Klausimai ir Atsakos</a>
<a className= "FooterLink" href="#">Apie Puslapi</a>
    </div>
  </footer>
  )
}
export default DeinoroFooter