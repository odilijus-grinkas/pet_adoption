import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from './FormInput';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';
import { ValidationLogin } from '../../components/Inputs/Validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import logo from './assets/logo.png';

const LoginForm = () => {
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const registrationSucess = localStorage.getItem('registrationSucess');
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  useEffect(() => {
    // Remove registrationSuccessMessage from localStorage after 5 seconds
    if (registrationSucess) {
      const timeoutId = setTimeout(() => {
        localStorage.removeItem('registrationSucess');
      }, 5000); // 5 seconds
      return () => clearTimeout(timeoutId);
    }
  }, [registrationSucess]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = ValidationLogin(formData);
    if (Object.keys(errors).length > 0) {
      setUsernameError(errors.username || "");
      setPasswordError(errors.password || "");
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const parsedResponse = await response.json();
        setUsernameError("");
        setPasswordError("");
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(parsedResponse));
        navigate("/");
      }  else {
        const errorData = await response.json();
        if (response.status === 403) {
          setUsernameError("Neteisingas vartotojo vardas arba slaptažodis.");
        } else {
          setUsernameError(errorData.message || "An error occurred.");
        }
        setPasswordError("");
      }
    } catch (error) {
      console.error("Error:", error);
      setUsernameError("An error occurred. Please try again later.");
      setPasswordError("An error occurred. Please try again later.");
    }
  };

  return (
    <article>
      <div className="card">
        <div className='text-start'>
          <Link className="forgot small" to="/"> <FontAwesomeIcon className='icon small me-2' icon={faArrowLeft} /> Titulinis</Link>
        </div>
        <div className="text-center intro">
          <img src={logo} alt="Logo" width="100" height="100" />
        </div>
        <form onSubmit={handleSubmit}>
          <h4 className="text-center p-2">Prisijungti</h4>
          <FormInput placeholder="Naudotojo Vardas" name="username" type="text" handleChange={handleChange} icon={faUser} />
          <FormInput placeholder="Slaptažodis" name="password" type="password" handleChange={handleChange} icon={faLock} />
          {usernameError && <ErrorMessage message={usernameError} />}
          {passwordError && <ErrorMessage message={passwordError} />}
          {registrationSucess && <SuccessMessage message={registrationSucess} />}
          {isLoggedIn && <SuccessMessage message="Sėkmingai prisijungta!" />}
          <div className="text-center p-1">
            <Link className="forgot" to="/Register">Neturi paskyros? Registruokis</Link> <br />
            <Link className="forgot" to="/Recovery">Priminti slaptažodį</Link>
          </div>
          <div className="mt-2 text-center">
            <button className="btn btn-primary btn-block">Prisijungti</button>
          </div>
        </form>
        <div className="d-flex justify-content-between"></div>
      </div>
    </article>
  );
};

export default LoginForm;
