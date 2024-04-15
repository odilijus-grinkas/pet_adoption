import "./Index.scss";

import Header from "../components/header_footer/header/Header";
import { Link } from "react-router-dom";
import bunnylogo from ".././IMG/bunnylogo.jpg";
import catlogo from ".././IMG/catlogo.jpg";
import doglogo from ".././IMG/doglogo.png";
import fishlogo from ".././IMG/fishlogo.jpg";



const Index = () => {
  return (
    <>
      <Header />

      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-auto">
            <div className="text-wrapper">
              <p className="line">
                <span className="league-spartan">Kokio gyvūnėlio norėtumėte?</span>
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-auto">
            <div className="row">
              <div className="col-sm-3">
                <Link to={"/allposts/?species=Šuo"}>
                  <img src={doglogo} className="animal-logo img-fluid" alt="Dog" />
                </Link>
              </div>
              <div className="col-sm-3">
                <Link to={"/allposts/?species=Katinas"}>
                  <img src={catlogo} className="animal-logo img-fluid" alt="Cat" />
                </Link>
              </div>
              <div className="col-sm-3">
                <Link to={"/allposts/?species=Žuvytės"}>
                  <img src={fishlogo} className="animal-logo img-fluid" alt="Fish" />
                </Link>
              </div>
              <div className="col-sm-3">
                <Link to={"/allposts/?species=Triušiai"}>
                  <img src={bunnylogo} className="animal-logo img-fluid" alt="Bunny" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



export default Index;
