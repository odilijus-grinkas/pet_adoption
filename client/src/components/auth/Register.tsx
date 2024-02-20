import './auth.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import sidedog from './assets/loginpic.jpg';
import logo from './assets/logo.png';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const Register = () => {
    return (
    <section className="vh-100">
    <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
             <div className="col col-xl-10">
                 <div className="card ">
                      <div className="row g-0">
                      <div className="col-md-6 col-lg-5 d-none d-md-block">
                          <img src={sidedog} alt="Login Forma" className="sidedog img-fluid" />
                          </div>
                             <div className="col-md-6 col-lg-7 d-flex mb-5 align-items-center">
                             <div className="card-body p-4 p-lg-5 text-white">
                                <div className="d-flex align-items-center mb-3 pb-1">
                                 <span className="h1 fw-bold mb-0">
                                 <img src={logo} alt="Logo" width="100" height="100"/></span>
                                </div>
                                    
                                <div className="form-outline mb-4 d-flex align-items-center">
                                <FontAwesomeIcon icon={faEnvelope} className='text-black icon me-2' />
                                    <input type="text" placeholder="El. Paštas" className="form-control form-control-lg" />
                                </div>
                                <div className="form-outline mb-4 d-flex align-items-center">
                                <FontAwesomeIcon icon={faUser} className='text-black icon me-2' />
                                    <input type="text" placeholder="Naudotojo Vardas" className="form-control form-control-lg" />
                                </div>

                                <div className="form-outline mb-4 d-flex align-items-center">
                                <FontAwesomeIcon icon={faLock} className='text-black icon me-2' />
                                    <input className="form-control form-control-lg" placeholder="Slaptažodis" />
                                 </div>

                                 <div className="form-outline mb-4 d-flex align-items-center">
                                <FontAwesomeIcon icon={faLock} className='text-black icon me-2' />
                                    <input className="form-control form-control-lg" placeholder="Pakartokite Slaptažodį" />
                                 </div>

                                 <div className="pt-1 mb-4">
                                    <input type="submit" className="button" value="Registruotis"/>
                                 </div>
                                 <div className="container">
                                        <div className="row">
                                        <div className="col p-1">
                                        <Link className="link" to="/Login">Jau turi Paskyra? Prisijungti</Link>
                                    </div>
                                    </div>
                                    </div>
                             </div>
                             </div>
                             
                    </div>
                 </div>
            </div>
        </div>
    </div> 
</section>
    )
}
export default Register;

