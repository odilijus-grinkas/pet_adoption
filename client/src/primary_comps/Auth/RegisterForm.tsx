// RegisterForm.jsx
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import FormInput from './FormInput';
import ErrorMessage from './ErrorMessage';
import { ValidationRegister } from '../../components/Inputs/Validation';
import { faLock, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<ErrorMessage>({});
    const [formData, setFormData] = useState({
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
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
            console.log(parsedResponse); 
            setErrorMessage({}); 
            navigate("/login");
            localStorage.setItem('registrationSucess', 'Sėkmingai užsiregistravote!'); 
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
    <form onSubmit={handleSubmit}>
      <h4 className="text-center">Registracija</h4>
      <div className="mt-3 text-center">
        <FormInput placeholder="El. Paštas" name="email" type="text" handleChange={handleChange} icon={faEnvelope} />
        <FormInput placeholder="Naudotojo Vardas" name="username" type="text" handleChange={handleChange} icon={faUser} />
        <FormInput placeholder="Slaptažodis" name="password" type="password" handleChange={handleChange} icon={faLock} />
        <FormInput placeholder="Pakartokite Slaptažodį" name="confirmPassword" type="password" handleChange={handleChange} icon={faLock} />
        <div className='text-start'>
        {errorMessage.email && <ErrorMessage message={errorMessage.email} />}
        {errorMessage.username && <ErrorMessage message={errorMessage.username} />}
        {errorMessage.password && <ErrorMessage message={errorMessage.password} />}
        {errorMessage.confirmPassword && <ErrorMessage message={errorMessage.confirmPassword} />}
        {errorMessage.general && <ErrorMessage message={errorMessage.general} />}
        </div>
        <div className="text-center p-1">
          <Link className="forgot" to="/Login">Jau turi Paskyra? Prisijungti</Link> <br />
          <Link className="forgot" to="/">Index Page</Link>
        </div>
        <div className="mt-2 text-center">
          <button className="btn btn-primary btn-block">Registruotis</button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
