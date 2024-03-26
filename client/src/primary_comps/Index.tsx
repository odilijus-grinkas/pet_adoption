/* eslint-disable @typescript-eslint/no-unused-vars */

import "./Index.scss"; // Add this import statement

import React, { useEffect, useState } from "react";

import Header from "../components/header_footer/header/Header";
import { Link } from "react-router-dom";
import firstpuppy from "./Assets/firstpuppy.png";
import secondpuppy from "./Assets/secondpuppy.png";

const Index = () => {
  const [data, setData] = useState([]); // Initialize data as an empty array
  const [userData, setUserData] = useState(null); // Initialize userData as null
  const [formData, setFormData] = useState({});

  const fetchAndSetData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/post/all`);
      if (response.ok) {
        const parsed = await response.json();
        setData(parsed.data);
      } else {
        setData([]); // Reset data to an empty array if response is not OK
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: { target: { name: unknown; value: unknown } }) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((old) => ({ ...old, ["name"]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
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

  useEffect(() => {
    fetchAndSetData();
  }, [formData, userData]);

  return (
    <>
      <Header />
      <img
        src={firstpuppy}
        alt="firstpuppy"
        className="puppy-image" // Removed width and height props
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
          className="puppy-images" // Removed width and height props
        ></img>
      </div>
      <div className="container">
        <div className="row">
          {data.map((post) => (
            <div key={post.id} className="col-md-4 mb-4">
              <Link to={`/post/${post.id}`} className="card-link">
                <div className="card">
                  <img
                    src={`https://via.placeholder.com/800x400?text=${post.pet_name}`}
                    className="card-img-top"
                    alt={post.pet_name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{post.pet_name}</h5>
                    <p className="card-text">{post.description}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        Posted on: {post.created.split("T")[0]}
                      </small>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
