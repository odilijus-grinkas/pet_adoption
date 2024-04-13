import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import logo from "./assets/logo.png";
import ErrorMessage from "./ErrorMessage";
import { ValidationRecovery } from "../../components/Inputs/Validation";
const Recovery = () => {
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({});
  const [formData, setFormData] = useState({
    email: "",
  });
  const [notification, setNotification] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = ValidationRecovery(formData);
    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors);
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:3001/api/user/forgotpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const parsedResponse = await response.json();
        console.log(parsedResponse);
        setErrorMessage({});
        setNotification(true);
      } else {
        const errorData = await response.json();
        setErrorMessage({ general: errorData.message });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage({
        general: "An error occurred. Please try again later.",
      });
    }
  };

  return (
    <article className="recovery_article">
      {notification && (
        <div
          className="alert alert-light alert-dismissible fade show"
          role="alert"
        >
          <strong>Vartotojas rastas</strong> Instrukcijas aip pakeisti savo
          slaptožodį rasite savo elektroniniame pašto adreso.
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setNotification(false)}
          ></button>
        </div>
      )}
      <div className="card">
        <div className="text-center intro">
          <img src={logo} alt="Logo" width="100" height="100" />
        </div>
        <form onSubmit={handleSubmit}>
          <h4 className="text-center p-2">Slaptažodžio priminimas</h4>
          <div className="form-outline mb-4 d-flex align-items-center">
            <FontAwesomeIcon icon={faEnvelope} className="icon  me-2" />
            <input
              placeholder="El. Paštas"
              className="form-control pl-5"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="text-start">
            {errorMessage.email && (
              <ErrorMessage message={errorMessage.email} />
            )}
          </div>
          <div className="text-center">
            <Link className="forgot" to="/Register">
              Neturi paskyros? Registruokis
            </Link>
          </div>
          <div className="mt-2 text-center">
            <button type="submit" className="btn btn-primary btn-block">
              Priminti
            </button>
          </div>
        </form>
        <div className="d-flex justify-content-between"></div>
      </div>
    </article>
  );
};

export default Recovery;
