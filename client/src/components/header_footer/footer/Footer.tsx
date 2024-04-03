import "./Footer.scss";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="text-white text-center text-lg-start footer">
      <div className="container p-4">
        <div className="row mt-4">
          <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Apie svetainę</h5>

            <p>
              Mes stengiamės padėti vienišiems gyvūnėliams susirasti naujus,
              šiltus namus.
            </p>

            <p>
              Taip pat norime padėti žmonėms susirasti nauja draugą, kuris juos
              mylės daugiau už viską.
            </p>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4 pb-1">Kontaktai</h5>

            <ul className="fa-ul">
              <li className="mb-3">
                <span className="fa-li">
                  <i className="fas fa-home"></i>
                </span>
                <span className="ms-2">
                  {" "}
                  Puodžių g. 10, Klaipėda, 92127 Klaipėdos m. sav.
                </span>
              </li>
              <li className="mb-3">
                <span className="fa-li">
                  <i className="fas fa-envelope"></i>
                </span>
                <span className="ms-2">svelniejiBiciuliai@gmail.com</span>
              </li>
              <li className="mb-3">
                <span className="fa-li">
                  <i className="fas fa-phone"></i>
                </span>
                <span className="ms-2">+370 123 45678</span>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="footer_mygtukas text-uppercase mb-4">
              Naudingi Linkai
            </h5>

            <div className=" text-white">
              <p className="footer_mygtukas">
                <span className="me-4">Užsiregistruok </span>
                <button
                  type="button"
                  className="btn btn-danger mt-1 btn-rounded"
                >
                  <Link className="footer_linkas" to="/register">
                    Užsiregistruok
                  </Link>
                </button>
              </p>
              <p className="footer_mygtukas">
                <span className="me-4">Pagrindinis puslapis</span>
                <button
                  type="button"
                  className="btn btn-danger mt-1 btn-rounded"
                >
                  <Link className="footer_linkas" to="/">
                    Namo
                  </Link>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © svelnieji biciulai 2024
      </div>
    </footer>
  );
};

export default Footer;
