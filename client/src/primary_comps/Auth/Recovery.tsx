import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import logo from './assets/logo.png';
const Recovery = () => {

    return (
        <article>
            <div className="card">
                <div className="text-center intro">
                    <img src={logo} alt="Logo" width="100" height="100" />
                </div>
                <form >
                    <h4 className="text-center p-2">Slaptažodžio priminimas</h4>
                    <div className="form-outline mb-4 d-flex align-items-center">
                        <FontAwesomeIcon icon={faEnvelope} className="icon  me-2" />
                        <input placeholder="El. Paštas" className="form-control pl-5" name="email" />
                    </div>
                    <div className="text-center">
                        <Link className="forgot" to="/Register">Neturi paskyros? Registruokis</Link>
                    </div>
                    <div className="mt-2 text-center">
                        <button type="submit" className="btn btn-primary btn-block">Priminti</button>
                    </div>
                </form>
                <div className="d-flex justify-content-between">
                </div>
            </div>
        </article>
    );
};

export default Recovery;
