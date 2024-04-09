import "./Index.scss";

import Header from "../components/header_footer/header/Header";
import { Link } from "react-router-dom";
import bunnylogo from ".././IMG/bunnylogo.jpg";
import catlogo from ".././IMG/catlogo.jpg";
import doglogo from ".././IMG/doglogo.png";
import fishlogo from ".././IMG/fishlogo.jpg";

// import firstpuppy from "./Assets/firstpuppy.png";
// import secondpuppy from "./Assets/secondpuppy.png";






const Index = () => {
  return (
    <>
      <Header />
      {/* <img
        src={firstpuppy}
        alt="firstpuppy"
        className="puppy-image" // Removed width and height props
      ></img> */}
      <div className="container">
        <div className="text-wrapper mt-5">
          {/* <p className="line">
            <span className="league-spartan">Snag a furball,</span>
          </p>
          <p className="line">
            <span className="league-spartan">strut with style,</span>
          </p>
          <p className="line">
            <span className="league-spartan">and watch the</span>
          </p>
          <p className="line">
            <span className="league-spartan">world go wild!</span>
          </p> */}
          <p className="line">
            <span className="league-spartan">Kokio gyvūnėlio norėtumėte?</span>
          </p>
        </div>
        <div className="d-flex gap-3">
          <Link to={"/allposts/?species=Šuo"}>
            <img src={doglogo} className="animal-logo" alt="Dog" />
          </Link>
          <Link to={"/allposts/?species=Katinas"}>
            <img src={catlogo} className="animal-logo" alt="Cat" />
          </Link>
          <Link to={"/allposts/?species=Žuvytės"}>
            <img src={fishlogo} className="animal-logo" alt="Fish" />
          </Link>
          <Link to={"/allposts/?species=Triušiai"}>
            <img src={bunnylogo} className="animal-logo" alt="Bunny" />
          </Link>
        </div>
        {/* <img
          src={secondpuppy}
          alt="secondpuppy"
          className="puppy-images" // Removed width and height props
        ></img> */}
      </div>
    </>
  );
};

export default Index;
