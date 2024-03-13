import './auth.scss';
import logo from './assets/logo.png';
import { Link } from 'react-router-dom';
import DeinoroHeader from './header/DeinoroHeader'
import DeinoroFooter from './header/DeinoroFooter'
import { useState } from "react";
import { ValidationRegister } from '../Inputs/Validation'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [errorMessage, setErrorMessage] = useState({});
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const errors = ValidationRegister(formData);
  
    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors); 
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3001/api/user/create/regular", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const parsedResponse = await response.json();
        setUserData(parsedResponse);
        setErrorMessage({}); 
      } else {
        const errorData = await response.json();
        setErrorMessage({ general: errorData.message });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage({ general: "An error occurred. Please try again later." });
    }
  };



  return (
    <section>
      <DeinoroHeader/>
      <div className="card">
        <div className="text-center intro">
          <img src={logo} alt="Logo" width="100" height="100" />
        </div>
        <form onSubmit={handleSubmit}>
          <h4 className="text-center">Registracija</h4>
          <div className="mt-3 text-center">
            <div className="form-outline mb-4 d-flex align-items-center">
              <FontAwesomeIcon icon={faEnvelope} className="icon  me-2" />
              <input placeholder="El. Paštas" className="form-control pl-5" name="email" onChange={handleChange} /> 
            </div>
            <div className="form-outline mb-4 d-flex align-items-center">
            <FontAwesomeIcon icon={faUser} className='icon  me-2' />
              <input placeholder="Naudotojo Vardas" className="form-control" name="username" onChange={handleChange} />
            </div>
            <div className="form-outline mb-4 d-flex align-items-center">
            <FontAwesomeIcon icon={faLock} className='icon  me-2' />
              <input placeholder="Slaptažodis" className="form-control" name="password" type="password" onChange={handleChange} />
            </div>
            <div className="form-outline mb-4 d-flex align-items-center">
            <FontAwesomeIcon icon={faLock} className='icon  me-2' />
              <input type="password" placeholder="Pakartokite Slaptažodį" className="form-control" name="confirmPassword" onChange={handleChange} />
            </div>
            {errorMessage && <div className='errorMessage'>{errorMessage.email}</div>} 
            {errorMessage && <div className='errorMessage'>{errorMessage.username}</div>}
            {errorMessage && <div className='errorMessage'>{errorMessage.password}</div>} 
            {errorMessage && <div className='errorMessage'>{errorMessage.confirmPassword}</div>} 
            {errorMessage.general && <div className='errorMessage text-center'>{errorMessage.general}</div>} 
            <div className="text-center p-1">
              <Link className="forgot" to="/Login">Jau turi Paskyra? Prisijungti</Link>
            </div>
            <div className="mt-2 text-center">
              <button className="btn btn-primary btn-block">Registruotis</button>
            </div>
          </div>
        </form>
        <div className="d-flex justify-content-between"></div>
      </div>
      <DeinoroFooter/>
    </section>
  );
};  

export default Register;
