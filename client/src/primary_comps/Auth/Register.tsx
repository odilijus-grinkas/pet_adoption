import "./auth.scss"
import { Link } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import logo from "./assets/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  return (
    <section>
      <div className="card">
      <div className='text-start'>
         <Link className="forgot small" to="/"> <FontAwesomeIcon className='icon small me-2' icon={faArrowLeft}/> Titulinis</Link>
        </div>
        <div className="text-center intro">
          <img src={logo} alt="Logo" width="100" height="100" />
        </div>
        <RegisterForm />
        <div className="d-flex justify-content-between"></div>
      </div>
    </section>
  );
};

export default Register;
