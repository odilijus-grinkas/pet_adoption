import "./assets/postCreation.scss";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ValidationCreate } from "../Inputs/Validation";
import ErrorMessage from "../../primary_comps/Auth/ErrorMessage";

interface User {
  id: string;
  token: string;
  role: string; // Ensure role is defined as a string
}

interface Post {
  pet_name: string;
  city_id: string;
  species_id: string;
  description: string;
  status: string;
  post_option: number[];
}

const PostCreate: React.FC = () => {
  const [post, setPost] = useState<Post>({
    pet_name: "",
    city_id: "",
    species_id: "",
    description: "",
    status: "",
    post_option: [],
  });

  console.log(post.post_option);

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [errors, setErrors] = useState<Partial<Post>>({}); // State for errors
  const [errorMessage, setErrorMessage] = useState<object | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [species, setSpecies] = useState<string[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<string>("");
  console.log(selectedSpecies);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        if (!selectedSpecies) {
          // If no species is selected, set options to an empty array
          setOptions([]);
          return;
        }

        const response = await fetch(
          `http://localhost:3001/api/post/test/${selectedSpecies}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch options");
        }
        const data = await response.json();
        console.log(data);
        const allOptions = data.data;
        setOptions(allOptions);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOptions();
  }, [selectedSpecies]);

  useEffect(() => {
    const fetchSpeciesAndCities = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/post/species");
        const response2 = await fetch("http://localhost:3001/api/post/cities");
        if (!response.ok && !response2.ok) {
          throw new Error("Failed to fetch species or cities");
        }
        const species = await response.json();
        const cities = await response2.json();
        const allSpecies = species.data;
        const allCities = cities.data;
        setCities(allCities);
        setSpecies(allSpecies);
        console.log(allCities);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchSpeciesAndCities();
  }, []);

  // useEffect(() => {
  //   // Fetch options only when species is selected
  //   if (post.species_id !== "") {
  //     // if (post.species_id === "1") {
  //     //   fetchOptions("Šuo");
  //     // } else if (post.species_id === "2") {
  //     //   fetchOptions("Katinas");
  //     // } else if (post.species_id === "3") {
  //     //   fetchOptions("Triušiai");
  //     // } else if (post.species_id === "4") {
  //     //   fetchOptions("Žuvytės");
  //     // }
  //     const selectedSpecies = species.find(
  //       (species) => species.id === post.species_id
  //     );
  //     console.log(selectedSpecies);
  //     if (selectedSpecies) {
  //       fetchOptions(selectedSpecies.name);
  //     }
  //   } else {
  //     setOptions([]);
  //   }
  // }, [post.species_id]);

  useEffect(() => {
    // Check if user is logged in
    const userString = localStorage.getItem("user");
    const loggedInUser = userString ? JSON.parse(userString) : null;
    if (loggedInUser) {
      setUser(loggedInUser);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      navigate("/Login");
    }
  }, [navigate]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "species_id") {
      // Find the species object with the selected ID
      const selectedSpeciesId = parseInt(value, 10);

      const selectedSpeciesObj = species.find(
        (species) => species.id === selectedSpeciesId
      );

      if (selectedSpeciesObj) {
        // If the species object is found, set the name as the selected species
        setSelectedSpecies(selectedSpeciesObj.name);
      } else {
        // If species object not found, reset selectedSpecies
        setSelectedSpecies("");
      }
    }

    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOptionChange = (
    e: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const { value } = e.target;
    const selectedOptionId = parseInt(value);
    setPost((prevState) => {
      const updatedOptionIds = [...prevState.post_option];
      updatedOptionIds[index] = selectedOptionId;
      return { ...prevState, post_option: updatedOptionIds };
    });
  };

  const handleCreatePost = async (e: FormEvent) => {
    e.preventDefault();

    const errors = ValidationCreate(post);
    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
      return;
    }

    const userString = localStorage.getItem("user");
    const loggedInUser = userString ? JSON.parse(userString) : null;
    const isPlus =
      loggedInUser &&
      (loggedInUser.role === 2 ||
        loggedInUser.role === 3 ||
        loggedInUser.role === 4);

    let endpoint = "";
    if (isPlus) {
      endpoint = "/post/create/plus";
    } else {
      endpoint = "/post/create/regular";
    }

    try {
      const authToken = user ? user.token : "";

      const response = await fetch(`http://localhost:3001/api${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          ...post,
          user_id: user ? user.id : "",
          species_id: parseInt(post.species_id),
          city_id: parseInt(post.city_id),
          created: new Date(),
          valid_until: new Date(),
          post_option: post.post_option,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      navigate("/Profile"); // Redirect to the index page
    } catch (error) {
      console.error("Error creating post:", error);
      // Set the error message state
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="PostCreate">
      <h2>Create Post</h2>
      <form onSubmit={handleCreatePost}>
        <div>
          <label>Pet Name:</label>
          <input
            type="text"
            name="pet_name"
            value={post.pet_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>City ID:</label>
          {/* <select
            name="city_id"
            value={post.city_id}
            onChange={handleInputChange}
          >
            <option value="">Select City</option>
            <option value="1">Klaipėda</option>
            <option value="2">Vilnius</option>
            <option value="3">Klaipeda</option>
            <option value="4">Trakai</option>
          </select> */}
          {cities && (
            <select
              name="city_id"
              value={post.city_id}
              onChange={handleInputChange}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div>
          <label>Species ID:</label>
          {/* <select
            name="species_id"
            value={post.species_id}
            onChange={handleInputChange}
          >
            <option value="">Select Species</option>
            <option value="1">Šuo</option>
            <option value="2">Katinas</option>
            <option value="3">Triušis</option>
            <option value="4">Žuvytė</option>
          </select> */}
          {species && (
            <select
              name="species_id"
              value={post.species_id}
              onChange={handleInputChange}
            >
              <option value="">Select Species</option>
              {species.map((species) => (
                <option key={species.id} value={species.id}>
                  {species.name}
                </option>
              ))}
            </select>
          )}
        </div>
        {options.map((option, index) => (
          <div key={index}>
            <label>{option.characteristic.name}:</label>
            <select
              name="option_id"
              value={post.post_option[index] || ""}
              onChange={(e) => handleOptionChange(e, index)}
            >
              <option value="">Select {option.characteristic.name} </option>
              {option.characteristic.option.map((option) => (
                <option value={option.id}>{option.value}</option>
              ))}
            </select>
          </div>
        ))}
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={post.description}
            onChange={handleInputChange}
          />
        </div>
        {errorMessage && <div className="error">{errorMessage}</div>}
        {errors.city_id && <ErrorMessage message={errors.city_id} />}
        {errors.description && <ErrorMessage message={errors.description} />}
        {errors.species_id && <ErrorMessage message={errors.species_id} />}
        {errors.pet_name && <ErrorMessage message={errors.pet_name} />}
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default PostCreate;
