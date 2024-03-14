import './auth.scss';
import logo from './assets/logo.png';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { ValidationLogin } from '../../components/Inputs/Validation'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';



const Login = () => {
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [formData, setFormData] = useState({
      username: "",
      password: ""
    });
  
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
          setIsLoggedIn(true); // Update login status to true
          localStorage.setItem('user', JSON.stringify(parsedResponse)); //token
        } else {
          const errorData = await response.json();
          setUsernameError(errorData.username || "");
          setPasswordError(errorData.password || "");
        }
      } catch (error) {
        console.error("Error:", error);
        setUsernameError("An error occurred. Please try again later.");
        setPasswordError("An error occurred. Please try again later.");
      }
    };

    return (
        <section>
        <div className="card">
          <div className="text-center intro">
            <img src={logo} alt="Logo" width="100" height="100" />
          </div>
          <form onSubmit={handleSubmit}>
            <h4 className="text-center p-2">Prisijungti</h4>
            <div className="form-outline mb-4 d-flex align-items-center">
            <FontAwesomeIcon icon={faUser} className='icon  me-2' />
              <input placeholder="Naudotojo Vardas" className="form-control" name="username" onChange={handleChange} />
            </div>
            
            <div className="form-outline mb-4 d-flex align-items-center">
            <FontAwesomeIcon icon={faLock} className='icon  me-2' />
              <input placeholder="Slaptažodis" className="form-control" name="password" type="password" onChange={handleChange} />
            </div>
            {usernameError && <div className='errorMessage'>{usernameError}</div>}
            {passwordError && <div className='errorMessage'>{passwordError}</div>}
            {isLoggedIn && <div className='successMessage'>Sėkmingai prisijungta!</div>} 
            <div className="text-center p-1">
              <Link className="forgot" to="/Register">Neturi paskyros? Registruokis</Link> <br />

              <Link className="forgot" to="/Recovery">Priminti slaptažodį</Link>
            </div>
            <div className="mt-2 text-center">
              <button className="btn btn-primary btn-block">Prisijungti</button>
            </div>
          </form>
          <div className="d-flex justify-content-between">
          </div>
        </div>
      </section>
    );
};

export default Login;
