import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import logo from "./assets/logo.png";
import ErrorMessage from "./ErrorMessage";
import { ValidationPasswordReset } from "../../components/Inputs/Validation";
const Recovery = () => {
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({});
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [succeeded, setSucceeded] = useState(false);
  const [alert, setAlert] = useState(false);
  const [token, setToken] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.token) {
      setToken(params.token);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (succeeded === true) {
    setTimeout(function () {
      navigate("/login");
    }, 10000);
  }

  if (alert === true) {
    setTimeout(function () {
      navigate("/recovery");
    }, 7000);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = ValidationPasswordReset(formData);
    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors);
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:3001/api/user/resetpassword/" + token,
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
        setSucceeded(true);
      } else {
        const errorData = await response.json();
        setErrorMessage({ general: errorData.message });
        setAlert(true);
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
      {alert && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <strong>Token galiojimas baigėsi.</strong> Netrukus būsite redaguotas
          atgal į recovery puslapį
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setAlert(false)}
          ></button>
        </div>
      )}
      {succeeded && (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>Slaptažodis pakeistas</strong> Netrukus būsite redaguotas į
          login puslapį...
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <div className="card">
        <div className="text-center intro">
          <img src={logo} alt="Logo" width="100" height="100" />
        </div>
        <form onSubmit={handleSubmit}>
          <h4 className="text-center p-2">Įveskite naują slaptažodį</h4>
          <div className="form-outline mb-4 d-flex align-items-center">
            <FontAwesomeIcon icon={faLock} className="icon  me-2" />
            <input
              placeholder="Naujas slaptažodis"
              className="form-control pl-5"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
            />
          </div>
          <div className="form-outline mb-4 d-flex align-items-center">
            <FontAwesomeIcon icon={faLock} className="icon  me-2" />
            <input
              placeholder="Pakartokite slaptažodį"
              className="form-control pl-5"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              type="password"
            />
          </div>
          <div className="text-start">
            {errorMessage.password && (
              <ErrorMessage message={errorMessage.password} />
            )}
            {errorMessage.confirmPassword && (
              <ErrorMessage message={errorMessage.confirmPassword} />
            )}
          </div>
          <div className="mt-2 text-center">
            <button type="submit" className="btn btn-primary btn-block">
              Pakeisti
            </button>
          </div>
        </form>
        <div className="d-flex justify-content-between"></div>
      </div>
    </article>
  );
};

export default Recovery;
