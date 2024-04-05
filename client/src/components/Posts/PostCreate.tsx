import "./assets/postCreation.scss";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  token: string;
  role: string;
}

interface Post {
  pet_name: string;
  city_id: string;
  species_id: string;
  description: string;
  status: string;
}

const PostCreate: React.FC = () => {
  const [post, setPost] = useState<Post>({
    pet_name: "",
    city_id: "",
    species_id: "",
    description: "",
    status: "",
  });

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

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

  const handleCreatePost = async (e: FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (
      !post.pet_name ||
      !post.city_id ||
      !post.species_id ||
      !post.description
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const authToken = user ? user.token : "";
      const role = user ? user.role : "";
      const endpoint =
        role === "regular" ? "/post/create/regular" : "/post/create/plus";

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
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      navigate("/"); // Redirect to the index page
    } catch (error) {
      console.error("Error creating post:", error);
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
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={post.description}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default PostCreate;
