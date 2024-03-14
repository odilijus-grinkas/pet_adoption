import "./auth.scss";

import { Link, useNavigate } from "react-router-dom";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ValdiationLogin } from "../Inputs/Validation";
import logo from "./assets/logo.png";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {}
  );
  const [formDataLogin, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = ValdiationLogin(formDataLogin);

    if (Object.keys(errors).length > 0) {
      setErrorMessage(errorMessage);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataLogin),
      });

      if (response.ok) {
        const parsedResponse = await response.json();
        setErrorMessage({}); // Clearing errors
        navigate("/AdminPanel");
        localStorage.setItem("user", JSON.stringify(parsedResponse));
      } else {
        const errorData = await response.json();
        setErrorMessage({ message: errorData.message });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage({
        message: "An error occurred. Please try again later.",
      });
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
            <FontAwesomeIcon icon={faUser} className="icon  me-2" />
            <input
              placeholder="Naudotojo Vardas"
              className="form-control"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="form-outline mb-4 d-flex align-items-center">
            <FontAwesomeIcon icon={faLock} className="icon  me-2" />
            <input
              placeholder="Slaptažodis"
              className="form-control"
              name="password"
              type="password"
              onChange={handleChange}
            />
          </div>
          {errorMessage.message && (
            <div className="errorMessage">{errorMessage.message}</div>
          )}
          <div className="text-center p-1">
            <Link className="forgot" to="/Register">
              Neturi paskyros? Registruokis
            </Link>{" "}
            <br />
            <Link className="forgot" to="/Recovery">
              Priminti slaptažodį
            </Link>
          </div>
          <div className="mt-2 text-center">
            <button className="btn btn-primary btn-block">Prisijungti</button>
          </div>
        </form>
        <div className="d-flex justify-content-between"></div>
      </div>
    </section>
  );
};

export default Login;
