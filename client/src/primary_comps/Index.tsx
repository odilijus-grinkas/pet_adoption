import "./index.scss";

import React, { useEffect, useState } from "react";

import Header from "../components/header_footer/header/Header";
import firstpuppy from "./assets/firstpuppy.png";
import secondpuppy from "./assets/secondpuppy.png";

export default function Index() {
  const [data, setData] = useState();
  const [userData, setUserData] = useState();
  const [formData, setFormData] = useState({});
  const [isWiggling, setIsWiggling] = useState(false);

  const fetchAndSetData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/post/all`);
      if (response.ok) {
        const parsed = await response.json();
        setData(parsed.data);
      } else {
        setData("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((old) => ({ ...old, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleWiggle = () => {
    setIsWiggling((prevState) => !prevState);
  };

  useEffect(() => {
    fetchAndSetData();
  }, [formData, userData]);

  return (
    <>
      <Header />
      <img
        src={firstpuppy}
        alt="firstpuppy"
        width=""
        height=""
        className="puppy-image"
      ></img>
      <div className="container">
        <div className="text-wrapper">
          <p className="line">
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
          </p>
        </div>
        <img
          src={secondpuppy}
          alt="secondpuppy"
          width=""
          height=""
          className="puppy-images"
        ></img>
      </div>
    </>
  );
}
