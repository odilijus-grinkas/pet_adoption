import "./auth.scss"
import RegisterForm from './RegisterForm';
import logo from "./assets/logo.png";

const Register = () => {
  return (
    <section>
      <div className="card">
        <div className="text-center intro">
          <img src={logo} alt="Logo" width="100" height="100" />
        </div>
        <RegisterForm />
        <div className="d-flex justify-content-between"></div>
      </div>
    </section>
  );
};

export default Register;
