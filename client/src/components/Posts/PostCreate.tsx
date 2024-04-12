import "./assets/postCreation.scss";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message
  const [options, setOptions] = useState<string[]>([]);
  const navigate = useNavigate();

  const fetchOptions = async (species) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/post/test/${species}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch options");
      }
      const data = await response.json();
      console.log(data);
      const allOpions = data.data;
      setOptions(allOpions);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Fetch options only when species is selected
    if (post.species_id !== "") {
      if (post.species_id === "1") {
        fetchOptions("Šuo");
      } else if (post.species_id === "2") {
        fetchOptions("Katinas");
      } else if (post.species_id === "3") {
        fetchOptions("Triušiai");
      } else if (post.species_id === "4") {
        fetchOptions("Žuvytės");
      }
    }
  }, [post.species_id]);

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
          <select
            name="city_id"
            value={post.city_id}
            onChange={handleInputChange}
          >
            <option value="">Select City</option>
            <option value="1">Klaipėda</option>
            <option value="2">Vilnius</option>
            <option value="3">Klaipeda</option>
            <option value="4">Trakai</option>
          </select>
        </div>
        <div>
          <label>Species ID:</label>
          <select
            name="species_id"
            value={post.species_id}
            onChange={handleInputChange}
          >
            <option value="">Select Species</option>
            <option value="1">Šuo</option>
            <option value="2">Katinas</option>
            <option value="3">Triušis</option>
            <option value="4">Žuvytė</option>
          </select>
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
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default PostCreate;
