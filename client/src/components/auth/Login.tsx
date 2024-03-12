import './auth.scss';
import logo from './assets/logo.png';
import { Link } from 'react-router-dom';
import { useState } from "react";
import LoginHeader from './header/LoginHeader'
import LoginFooter from './header/LoginFooter'
import { ValdiationLogin } from '../Inputs/Validation'; 

const Login = () => {


    const [errorMessage, setErrorMessage] = useState("");
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
      username: "",
      password: ""
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
      
      const errors = ValdiationLogin(formData);
  
      if (Object.keys(errors).length > 0) {
        setErrorMessage(errors); 
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
          setUserData(parsedResponse);
          setErrorMessage(""); 
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message);
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage("An error occurred. Please try again later.");
      }
    };

    return (
      <section>
        <LoginHeader/>
      <section className='Loginsection'>
        <div className="card">
          <div className="text-center intro">
            <img src={logo} alt="Logo" width="100" height="100" />
          </div>
          <form onSubmit={handleSubmit}>
            <h4 className="text-center">Prisijungti</h4>
            <div className="mt-3 text-center">
              <input placeholder="Naudotojo Vardas" className="form-control" name="username" onChange={handleChange} />            
            </div>
            <div className="mt-3 text-center">
              <input placeholder="Slaptažodis" className="form-control" name="password" type="password" onChange={handleChange} />
            </div>
            <div>
            {userData ? Object.keys(userData).map((key, index) => ( <div key={index}>{key}: {userData[key]}</div>  )) : null}      
            {errorMessage && <div className='errorMessage'>{errorMessage.username}</div>}
            {errorMessage && <div className='errorMessage'>{errorMessage.password}</div>}
            </div>
            <div className="text-center">
              <Link className="forgot" to="/Register">Neturi paskyros? Registruokis</Link>
            </div>
            <div className="mt-2 text-center">
              <button className="btn btn-primary btn-block">Prisijungti</button>
            </div>
          </form>
          <div className="d-flex justify-content-between">
          </div>
        </div>
      </section>
      <LoginFooter/>
    </section>
    );    
};

export default Login;
